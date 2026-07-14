# AGENTS.md

Instructions for AI agents working on `linconvidal-site`.

## Site identity

This is Lincon Vidal's personal static site for photographs, software, games, and notes. It is not a generic portfolio template and should not sound like a pitch deck.

Preserve the existing public site structure unless Lincon explicitly asks to change it. Do not invent fallback routes, sections, or categories to make data fit.

Do not encode current item classifications as permanent policy in this file. The source of truth for work classification is `src/data/work.json`, plus Lincon's latest explicit instruction. If a classification, lineage relationship, or public page boundary is unclear, inspect the current data and ask before changing it.

## Voice and copy

Write in English for public site copy unless Lincon explicitly asks otherwise.

Prefer quiet, concrete, personal archive language over startup, indie-hacker, launch, or LinkedIn language.

Good direction: "things I made and want to keep in one place".

Bad direction: "selected professional achievements", "introducing", "revolutionary", "the definitive platform", or anything that sounds like a campaign.

Do not make unfinished work sound finished. Use status and caveats honestly.

## Text line breaks

Never hard-wrap prose manually.

When editing Markdown, JSON strings, Astro text nodes, HTML text, captions, descriptions, or public copy, keep each authored sentence or paragraph on a single logical source line unless the syntax itself requires a line break.

Do not split visible text at 80, 100, or 120 columns just because it looks long in the editor. Let CSS, Markdown rendering, and the browser wrap text visually.

Acceptable line breaks: list item boundaries, headings, tables, code blocks, imports, object properties, array items, frontmatter fields, and markup structure where a new line is semantic or improves source structure without splitting prose.

If you touch an already manually wrapped prose paragraph, prefer reflowing that edited paragraph to a single line when it is safe and does not create unrelated churn.

## Product semantics and defensive fallbacks

Do not change product semantics in the name of safety, portability, convenience, or testability.

A fallback is acceptable only when it preserves the same user-visible contract. If the fallback changes what the user asked the site or product to do, it is not a fallback. It is a different behavior and requires explicit approval from Lincon.

Good fallback examples:

- An image cannot be loaded, so the UI renders accurate alt text instead of crashing.
- A build-time optional collection is empty, and the page renders a truthful empty state.
- One implementation path fails, then another path performs the same operation with the same user-visible result.

Bad fallback examples:

- A route or collection is missing, so the site silently creates a different public IA.
- A work item has no real link, so the UI invents a generic `page` or fake external link.
- A product is not public yet, so the copy pretends it shipped.
- A missing screenshot is replaced with unrelated media that changes what the page claims.
- A category mismatch is hidden by moving work into a catch-all section such as `/projects`.

Rule of thumb:

> Fail closed and visibly. Do not invent a second product behavior.

## Work data rules

The work data source is `src/data/work.json`.

Use `kind: "software"` for software and `kind: "game"` for games. Do not add new public kinds without updating the IA deliberately.

External links should be real exits only. Do not add generic `page` links; the work title already links to the internal detail page.

Screenshots and work media belong in `public/work/` unless there is an existing better location.

## Engineering rules

Use the existing npm scripts.

Before reporting site work complete, run:

```bash
npm run check
npm run build
```

Do not commit, push, or deploy unless Lincon explicitly asks.
