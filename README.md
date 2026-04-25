# Canvas

Canvas is a static web profile template. Edit `data.js` to publish a profile card, profile/about summary, project cards, and full-screen project details without changing the HTML structure.

Korean documentation is available in [README.ko.md](./README.ko.md).

## File Structure

```text
Canvas/
  index.html
  styles.css
  data.js
  script.js
  assets/
    profile/
    projects/
```

Use `assets/profile/` for profile images and `assets/projects/` for project screenshots or thumbnails. The folders include `.gitkeep` files so the empty directories stay in git.

## Quick Start

1. Edit `profile` in `data.js`.
2. Add or update objects in the `projects` array.
3. Put images in `assets/profile/` or `assets/projects/`, then set the matching `src` path.
4. Open `index.html` in a browser to check the result.

## Data Layout

`data.js` is split by editing purpose:

- `ui`: shared labels, accessibility labels, placeholders, section titles, and action text
- `profile`: profile-card content, contact info, image, front badge, and back-side copy
- `projects`: project-card and project-detail content, screenshots, and external links

## UI Data

```js
ui: {
  aria: {
    cardStage: "Business card area",
    cardFlip: "Flip business card",
    projectClose: "Close project details",
  },
  labels: {
    email: "Email",
    phone: "Phone",
    role: "Role",
    result: "Result",
  },
  placeholders: {
    profilePhoto: "PHOTO",
  },
  sections: {
    projectsEyebrow: "Project Cards",
    projectsTitle: "Selected Works",
    featuresTitle: "Key Features",
    techTitle: "Tech Stack",
  },
  actions: {
    projectLink: "Open Link",
  },
}
```

## Profile Data

```js
profile: {
  pageTitle: "Your Name | Web Profile",
  eyebrow: "Personal Business Card",
  name: "Your Name",
  englishName: "Your English Name",
  subtitle: "Short profile subtitle",
  frontBadge: "Profile",

  contact: {
    email: "you@example.com",
    phone: "000-0000-0000",
  },

  photo: {
    src: "./assets/profile/profile.png",
    alt: "Profile photo",
  },

  back: {
    title: "About Me",
    description: "Short introduction line 1\nShort introduction line 2",
    badge: "About",
  },
}
```

If `photo.src` is empty, `ui.placeholders.profilePhoto` is shown instead.

## Badge Meaning

The badge is used as a short summary of the visible card side.

- Front side: `Profile` works well because the front side shows profile identity and contact information.
- Back side: `About` works well because the back side explains the person, page, or template purpose.

This is different from an interaction hint such as `Flip`. The rotate icon already communicates the card interaction, so the badge can focus on summarizing the current side.

## Project Data

```js
{
  id: "project-id",
  theme: "default",
  eyebrow: "Project Type",
  title: "Project Name",

  card: {
    description: "Short card description.",
  },

  detail: {
    summary: "Longer detail-page summary.",
    role: "Your role",
    result: "Main outcome",
    features: ["Feature 1", "Feature 2"],
    tech: ["HTML", "CSS", "JavaScript"],
  },

  image: {
    src: "./assets/projects/project-name.png",
    alt: "Project screenshot",
  },

  link: {
    href: "https://example.com",
    label: "Open Link",
  },
}
```

If `image.src` is empty, the template preview graphic is shown. If `link.href` is empty, the project detail link button is hidden.

## Add A Project

Add one object to the `projects` array in `data.js`. The card is generated automatically, so you do not need to copy project-card HTML.

## Deployment

This project uses static files only. For GitHub Pages, publish:

- `index.html`
- `styles.css`
- `data.js`
- `script.js`
- `assets/`
