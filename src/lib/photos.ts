import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import seriesData from '../data/series.json';

export type Photo = CollectionEntry<'photos'>;
export type Series = CollectionEntry<'series'>;

export function photoUrl(photo: Photo): string {
  return `/photography/photo/${photo.id}/`;
}

export function placeUrl(slug: string): string {
  return `/photography/place/${slug}/`;
}

export function yearUrl(year: number): string {
  return `/photography/year/${year}/`;
}

export function tagUrl(slug: string): string {
  return `/photography/tag/${slug}/`;
}

export function seriesUrl(series: Series): string {
  return `/photography/series/${series.id}/`;
}

export async function getPhotos(): Promise<Photo[]> {
  return getCollection('photos');
}

export async function getSeries(): Promise<Series[]> {
  // getCollection() warns "does not exist or is empty" on every call while
  // the collection has no entries; skip it until the first series is authored.
  if (seriesData.length === 0) return [];
  return getCollection('series');
}

export interface PlaceYearSelection {
  place: Photo['data']['place'];
  year: number;
  photos: Photo[];
}

// Selections are deterministic queries over photo metadata: regenerate the
// pages from the same metadata and they come out the same.
export function selectionsByPlaceYear(photos: Photo[]): PlaceYearSelection[] {
  const groups = new Map<string, PlaceYearSelection>();
  for (const photo of photos) {
    const key = `${photo.data.place.slug}/${photo.data.year}`;
    const group = groups.get(key) ?? {
      place: photo.data.place,
      year: photo.data.year,
      photos: [],
    };
    group.photos.push(photo);
    groups.set(key, group);
  }
  return [...groups.values()].sort(
    (a, b) => b.year - a.year || a.place.title.localeCompare(b.place.title),
  );
}

export function groupByPlace(photos: Photo[]): Map<string, Photo[]> {
  const groups = new Map<string, Photo[]>();
  for (const photo of photos) {
    const slug = photo.data.place.slug;
    groups.set(slug, [...(groups.get(slug) ?? []), photo]);
  }
  return groups;
}

export function groupByYear(photos: Photo[]): Map<number, Photo[]> {
  const groups = new Map<number, Photo[]>();
  for (const photo of photos) {
    groups.set(photo.data.year, [...(groups.get(photo.data.year) ?? []), photo]);
  }
  return groups;
}

export function groupByTag(photos: Photo[]): Map<string, Photo[]> {
  const groups = new Map<string, Photo[]>();
  for (const photo of photos) {
    for (const tag of photo.data.tags) {
      groups.set(tag, [...(groups.get(tag) ?? []), photo]);
    }
  }
  return groups;
}

// Resolves a series' ordered photo slugs into photos, preserving the
// authored order.
export async function getSeriesPhotos(series: Series): Promise<Photo[]> {
  const entries = await Promise.all(series.data.photos.map((ref) => getEntry(ref)));
  return entries.filter((photo): photo is Photo => Boolean(photo));
}
