# Canvas

Canvas is a static web profile template. This README is a usage guide for people who want to reuse the template with their own profile, project descriptions, images, and links.

Korean documentation is available in [README.ko.md](./README.ko.md).

## What You Edit

For normal template use, edit `data.js` first. The HTML structure is already wired to read content from that file.

- `ui`: shared labels, accessibility labels, placeholders, section titles, and action text
- `profile`: profile-card content, contact info, profile image path, front badge, and back-side copy
- `projects`: project-card content, detail content, placeholder settings, image paths, and external links

Edit `styles.css` only when you want to change the visual design. Edit `index.html` only when you need a different page structure.

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

Use `assets/profile/` for profile images. Use `assets/projects/` for project thumbnails and detail screenshots. Empty asset folders are kept in git with `.gitkeep`.

## Image Guidelines

- Profile image: use a `4:5` portrait image for the cleanest fit.
- Project thumbnail: use a `4:5` portrait image, or let the template crop it into that area.
- Project detail images: use one or more screenshots in the `images` array. The detail preview area also keeps the `4:5` portrait ratio.

## Quick Start

1. Replace the `profile` object in `data.js` with your own public profile information.
2. Replace the objects in the `projects` array with your own projects.
3. Put image files in `assets/profile/` or `assets/projects/`.
4. Set each image `src` to a relative path such as `./assets/projects/project-01.png`.
5. Add external project destinations to `links`, with the main destination first.
6. Open `index.html` in a browser and check the result.

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

If `photo.src` is empty, the template shows `ui.placeholders.profilePhoto` instead.

## Project Data

```js
{
  id: "project-id",
  theme: "blue",
  placeholder: {
    type: "cards",
  },
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
    src: "./assets/projects/project-thumbnail.png",
    alt: "Project thumbnail",
  },

  images: [
    {
      src: "./assets/projects/project-screen-01.png",
      alt: "Project screen 1",
    },
    {
      src: "./assets/projects/project-screen-02.png",
      alt: "Project screen 2",
    },
  ],

  links: [
    {
      href: "https://example.com",
      label: "Live Site",
    },
    {
      href: "https://github.com/example/project",
      label: "GitHub",
    },
  ],
}
```

`image` is the primary card thumbnail and single-image fallback. `images` is the full-screen detail gallery. If `images` has multiple entries, previous/next controls and a counter are shown automatically.

If both `images` and `image.src` are empty, the template shows a generated placeholder preview. `links` is the list of external buttons shown in the project detail view. If `links` is empty, the detail action area is hidden. Existing single `link` objects are still supported as a fallback.

Put the primary destination first in `links`. The button area is right-aligned, so secondary links are rendered first and the first `links` item is rendered as the rightmost primary button.

## Placeholder Options

`placeholder.type` controls the generated preview shape.

- `cards`: card/tile layout
- `bar-chart`: vertical bar chart layout
- `line-chart`: line chart layout
- `dashboard`: dashboard-style layout
- `list`: row/list layout

`theme` controls the project color set. It is used for generated placeholder previews and project-detail accent colors such as the eyebrow, metadata labels, feature bullets, tech chips, and link button.

- `blue`
- `green`
- `yellow`
- `red`

If `theme` is empty or unknown, the template falls back to `blue`.

## Deployment

This project uses static files only. Any static hosting service can serve it. For GitHub Pages, publish these files:

- `index.html`
- `styles.css`
- `data.js`
- `script.js`
- `assets/`
