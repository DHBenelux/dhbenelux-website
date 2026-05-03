# Adding Content to the DH Benelux Website

This guide walks you through adding a new event (conference, news post, journal volume, or milestone) to the website. No coding experience needed — you just copy a template, fill it in, and save.

---

## How It Works

Every event on the website is a single text file in the `content/events/` folder. The file has two parts:

1. **The header** — structured info between `---` lines (title, date, etc.)
2. **The body** (optional) — free-form text below the header, for news posts or announcements

That's it. The website reads these files and builds the pages automatically.

---

## Step-by-Step: Adding an Event

### 1. Go to the right folder

On GitHub, navigate to: **`content/events/`**

Direct link: `https://github.com/jonaschlegel/dhbenelux/tree/main/content/events`

### 2. Create a new file

Click **"Add file" → "Create new file"** in the top-right corner.

### 3. Name your file

Type the filename in the name field. Use lowercase, separate words with hyphens, and end with `.mdx`:

| What you're adding | Name it like this                  | Example                                     |
| ------------------ | ---------------------------------- | ------------------------------------------- |
| A conference       | `YYYY-conference-city.mdx`         | `2027-conference-brussels.mdx`              |
| A news post        | `YYYY-MM-DD-short-title.mdx`       | `2026-03-15-call-for-papers-maastricht.mdx` |
| A journal volume   | `journal-volume-N-short-theme.mdx` | `journal-volume-8-open-data.mdx`            |
| A milestone        | `YYYY-short-description.mdx`       | `2026-new-partnership.mdx`                  |

### 4. Copy a template and fill it in

Pick the template that matches your event type below. Copy the entire block, paste it into the file, and replace the placeholder values (everything in `CAPS` or between quotes) with your actual information.

### 5. Save

Scroll down, write a short description of what you added (e.g. "Add 2027 Brussels conference"), and click **"Commit changes"**.

The website will update automatically after the next deploy.

---

## Templates

### Conference

Copy this, replace the values in CAPS:

```
---
id: 'conference-YYYY'
title: 'DH Benelux YYYY — VENUE NAME'
date: 'YYYY-MM-DD'
kind: conference
year: 'YYYY'
location: 'VENUE NAME, CITY, COUNTRY'
dates: 'MONTH D–D, YYYY'
theme: 'THEME OR LEAVE EMPTY'
description: 'One or two sentences about this conference.'
website: 'https://YYYY.dhbenelux.org/'
---
```

**Filled-in example** (2027 Brussels):

```
---
id: 'conference-2027'
title: 'DH Benelux 2027 — Université libre de Bruxelles'
date: '2027-06-01'
kind: conference
year: '2027'
location: 'Université libre de Bruxelles, Brussels, Belgium'
dates: 'June 1–4, 2027'
theme: 'Digital Heritage'
description: 'The 2027 DH Benelux conference, hosted by ULB in Brussels.'
website: 'https://2027.dhbenelux.org/'
---
```

Nothing else needed — the website builds the conference page from these fields.

> **After the conference**, you can add statistics and Zenodo links. See any past conference file (e.g. `2024-conference-leuven.mdx`) for the format.

---

### News Post / Announcement

Copy this, replace the values in CAPS:

```
---
id: 'SHORT-DESCRIPTION-YYYY'
title: 'YOUR TITLE'
date: 'YYYY-MM-DD'
kind: news
author: 'YOUR NAME'
description: 'One or two sentences shown in listings and search results.'
---

Write your post here. You can use **bold**, *italic*, and [links](https://example.com).

Use a blank line to start a new paragraph.
```

**Filled-in example:**

```
---
id: 'cfp-maastricht-2026'
title: 'Call for Papers: DH Benelux 2026 Maastricht'
date: '2026-03-15'
kind: news
author: 'Jonas'
description: 'The call for papers for DH Benelux 2026 in Maastricht is now open.'
---

We are pleased to announce that the Call for Papers for DH Benelux 2026
is now open! The conference will take place in Maastricht from June 2–5.

Submit your proposal at [2026.dhbenelux.org](https://2026.dhbenelux.org/)
before **April 30, 2026**.
```

> **Note for maintainers:** For a news post to appear on the `/news` page, its filename (without `.mdx`) must be added to the `liveNewsSlugs` list in `lib/content.ts`. Ask a developer if you're unsure.

---

### Journal Volume

Copy this, replace the values in CAPS:

```
---
id: 'volume-N-SHORT-THEME'
title: 'Volume N | THEME TITLE'
date: 'YYYY-MM-DD'
kind: journal
year: 'YYYY'
journalVolume: 'Volume N | THEME TITLE'
volumeTheme: 'THEME TITLE'
description: 'Volume N of the DH Benelux Journal, themed "THEME TITLE".'
website: 'https://journal.dhbenelux.org/volume-N/'
issn: '2666-6952'
license:
  name: 'CC BY 4.0'
  url: 'https://creativecommons.org/licenses/by/4.0/'
articles:
  - title: 'ARTICLE TITLE'
    link: 'https://journal.dhbenelux.org/.../article.pdf'
    authors: 'AUTHOR NAME (UNIVERSITY); SECOND AUTHOR (UNIVERSITY)'
  - title: 'ANOTHER ARTICLE'
    link: 'https://journal.dhbenelux.org/.../another.pdf'
    authors: 'AUTHOR NAME (UNIVERSITY)'
---
```

Add one `- title: / link: / authors:` block per article. Look at an existing volume file (e.g. `journal-volume-7-breaking-silos.mdx`) for reference.

---

### Milestone / Founding / Partnership

Copy this, replace the values in CAPS:

```
---
id: 'SHORT-DESCRIPTION-YYYY'
title: 'WHAT HAPPENED'
date: 'YYYY-MM-DD'
kind: milestone
description: 'One sentence about the milestone.'
---
```

Change `kind` to `founding` or `partnership` if that fits better.

---

## Tips

- **Dates** must be in `YYYY-MM-DD` format (e.g. `2026-06-01`), even if the text description says "June 1–4, 2026"
- **Quotes** in text values must use straight quotes (`'like this'`), not curly/smart quotes
- **Don't change** the `kind` values — they must be exactly: `conference`, `news`, `journal`, `milestone`, `founding`, or `partnership`
- **Look at existing files** if you're unsure — the `content/events/` folder has plenty of examples
- **The `---` lines** at the top and bottom of the header block are required — don't remove them

## Need Help?

If something isn't working or you're unsure about any step, open an issue on GitHub or ask a team member. It's better to ask than to guess!
