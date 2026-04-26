const data = window.PORTFOLIO_DATA || {};
const ui = data.ui || {};
const profileData = data.profile || {};
const projectData = Array.isArray(data.projects) ? data.projects : [];

const businessCard = document.getElementById("business-card");
const projectsGrid = document.getElementById("projects-grid");
const profilePhoto = document.getElementById("profile-photo");
const projectOverlay = document.getElementById("project-overlay");
const projectPanel = projectOverlay?.querySelector(".project-panel");
const closeButtons = document.querySelectorAll("[data-project-close]");
const projectEyebrow = document.getElementById("project-detail-eyebrow");
const projectTitle = document.getElementById("project-detail-title");
const projectSummary = document.getElementById("project-detail-summary");
const projectRole = document.getElementById("project-detail-role");
const projectResult = document.getElementById("project-detail-result");
const projectFeatures = document.getElementById("project-detail-features");
const projectTech = document.getElementById("project-detail-tech");
const projectLink = document.getElementById("project-detail-link");
const projectActions = document.getElementById("project-actions");
const projectPreview = document.getElementById("project-detail-preview");

let activeProjectTrigger = null;
let activeProject = null;
let activeImageIndex = 0;

function getValue(source, path) {
  return path.split(".").reduce((current, key) => current?.[key], source);
}

function setTextFields(attributeName, source) {
  document.querySelectorAll(`[${attributeName}]`).forEach((element) => {
    const path = element.getAttribute(attributeName);
    element.textContent = getValue(source, path) || "";
  });
}

function setAriaLabels(source) {
  document.querySelectorAll("[data-ui-aria]").forEach((element) => {
    const path = element.getAttribute("data-ui-aria");
    element.setAttribute("aria-label", getValue(source, path) || "");
  });
}

function renderUiLabels(labels) {
  setTextFields("data-ui", labels);
  setAriaLabels(labels);
}

function renderProfile(profile) {
  if (profile.pageTitle) {
    document.title = profile.pageTitle;
  }

  setTextFields("data-profile", profile);

  if (!profilePhoto) {
    return;
  }

  const photo = profile.photo || {};
  if (photo.src) {
    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.alt || "";
    profilePhoto.replaceChildren(image);
    profilePhoto.setAttribute("aria-hidden", "false");
  } else {
    const placeholder = document.createElement("span");
    placeholder.textContent = ui.placeholders?.profilePhoto || "";
    profilePhoto.replaceChildren(placeholder);
    profilePhoto.setAttribute("aria-hidden", "true");
  }
}

const PLACEHOLDER_TYPES = {
  cards: { cardItems: 3, detailItems: 4 },
  "bar-chart": { cardItems: 5, detailItems: 7 },
  "line-chart": { cardItems: 5, detailItems: 6 },
  dashboard: { cardItems: 4, detailItems: 5 },
  list: { cardItems: 4, detailItems: 6 },
};
const PROJECT_THEMES = new Set(["blue", "green", "yellow", "red"]);

function getProjectPlaceholderType(project) {
  const preferredType = project.placeholder?.type || "cards";
  return PLACEHOLDER_TYPES[preferredType] ? preferredType : "cards";
}

function getProjectTheme(project) {
  return PROJECT_THEMES.has(project.theme) ? project.theme : "blue";
}

function createPlaceholderVisual(baseClass, type, itemCount) {
  const visual = document.createElement("span");
  visual.className = `${baseClass} ${baseClass}--${type}`;

  for (let index = 0; index < itemCount; index += 1) {
    visual.append(document.createElement("span"));
  }

  return visual;
}

function createMockPreview(project, mode) {
  const type = getProjectPlaceholderType(project);
  const settings = PLACEHOLDER_TYPES[type];
  const preview = document.createElement("span");
  preview.className = mode === "card" ? "thumb-window" : "preview-browser";

  const topLine = document.createElement("span");
  topLine.className = mode === "card" ? "thumb-topline" : "preview-bar";
  preview.append(topLine);

  if (mode === "card") {
    const content = createPlaceholderVisual("thumb-visual", type, settings.cardItems);
    const summary = document.createElement("span");
    summary.className = "thumb-summary";
    summary.append(document.createElement("span"), document.createElement("span"));

    preview.append(content, summary);
    return preview;
  }

  preview.append(createPlaceholderVisual("preview-visual", type, settings.detailItems));
  return preview;
}

function getProjectImages(project) {
  const galleryImages = Array.isArray(project.images)
    ? project.images.filter((image) => image?.src)
    : [];

  if (galleryImages.length > 0) {
    return galleryImages;
  }

  const image = project.image || {};
  return image.src ? [image] : [];
}

function getProjectThumbnail(project) {
  const image = project.image || {};
  return image.src ? image : getProjectImages(project)[0] || {};
}

function createProjectVisual(project, mode) {
  const theme = getProjectTheme(project);
  const wrapper = document.createElement("span");
  wrapper.className =
    mode === "card"
      ? `project-thumb project-thumb--${theme}`
      : "project-detail-preview-inner";
  wrapper.setAttribute("aria-hidden", "true");

  const imageData = mode === "card" ? getProjectThumbnail(project) : project.image || {};
  if (imageData.src) {
    const image = document.createElement("img");
    image.src = imageData.src;
    image.alt = imageData.alt || project.title || "";
    image.className = mode === "card" ? "project-thumb-image" : "project-detail-image";
    wrapper.replaceChildren(image);
    wrapper.setAttribute("aria-hidden", "false");
    return wrapper;
  }

  wrapper.append(createMockPreview(project, mode));
  return wrapper;
}

function setProjectImageIndex(nextIndex) {
  if (!activeProject) {
    return;
  }

  const images = getProjectImages(activeProject);
  if (images.length < 2) {
    return;
  }

  activeImageIndex = (nextIndex + images.length) % images.length;
  renderProjectPreview(activeProject);
}

function createGalleryButton(direction) {
  const button = document.createElement("button");
  const isPrevious = direction === "previous";
  button.className = `project-gallery-button project-gallery-button--${direction}`;
  button.type = "button";

  const label = isPrevious
    ? ui.aria?.galleryPrevious || "Previous project image"
    : ui.aria?.galleryNext || "Next project image";
  button.setAttribute("aria-label", label);

  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = isPrevious ? "‹" : "›";
  button.append(icon);

  button.addEventListener("click", () => {
    setProjectImageIndex(activeImageIndex + (isPrevious ? -1 : 1));
  });

  return button;
}

function renderProjectPreview(project) {
  const images = getProjectImages(project);
  const theme = getProjectTheme(project);

  projectPreview.className = `project-detail-preview is-${theme}`;

  if (images.length === 0) {
    projectPreview.setAttribute("aria-hidden", "true");
    projectPreview.replaceChildren(createProjectVisual(project, "detail"));
    return;
  }

  activeImageIndex = Math.min(activeImageIndex, images.length - 1);
  const imageData = images[activeImageIndex];
  const gallery = document.createElement("div");
  gallery.className = "project-gallery";

  const frame = document.createElement("div");
  frame.className = "project-gallery-frame";

  const image = document.createElement("img");
  image.src = imageData.src;
  image.alt = imageData.alt || project.title || "";
  image.className = "project-gallery-image";
  frame.append(image);
  gallery.append(frame);

  if (images.length > 1) {
    const counter = document.createElement("span");
    counter.className = "project-gallery-counter";
    counter.textContent = `${activeImageIndex + 1} / ${images.length}`;

    gallery.append(createGalleryButton("previous"), createGalleryButton("next"), counter);
  }

  projectPreview.setAttribute("aria-hidden", "false");
  projectPreview.replaceChildren(gallery);
}

function createProjectCard(project) {
  const theme = getProjectTheme(project);
  const card = document.createElement("button");
  card.className = `project-card project-card--${theme}`;
  card.type = "button";
  card.dataset.projectId = project.id;
  card.setAttribute("aria-haspopup", "dialog");

  const body = document.createElement("span");
  body.className = "project-body";

  const title = document.createElement("span");
  title.className = "project-title";
  title.textContent = project.title || "";

  const description = document.createElement("span");
  description.className = "project-description";
  description.textContent = project.card?.description || "";

  body.append(title, description);
  card.append(createProjectVisual(project, "card"), body);

  card.addEventListener("click", () => {
    openProject(project.id, card);
  });

  return card;
}

function renderProjectCards(projects) {
  if (!projectsGrid) {
    return;
  }

  projectsGrid.replaceChildren(...projects.map(createProjectCard));
}

function renderProject(project) {
  const detail = project.detail || {};
  const theme = getProjectTheme(project);

  projectPanel.className = `project-panel is-${theme}`;
  projectEyebrow.textContent = project.eyebrow || "";
  projectTitle.textContent = project.title || "";
  projectSummary.textContent = detail.summary || "";
  projectRole.textContent = detail.role || "";
  projectResult.textContent = detail.result || "";

  projectFeatures.replaceChildren(
    ...(detail.features || []).map((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      return item;
    }),
  );

  projectTech.replaceChildren(
    ...(detail.tech || []).map((tech) => {
      const item = document.createElement("span");
      item.textContent = tech;
      return item;
    }),
  );

  renderProjectPreview(project);

  const link = project.link || {};
  if (link.href) {
    projectActions.hidden = false;
    projectLink.hidden = false;
    projectLink.href = link.href;
    projectLink.textContent = link.label || ui.actions?.projectLink || "";
  } else {
    projectActions.hidden = true;
    projectLink.hidden = true;
    projectLink.removeAttribute("href");
  }
}

function openProject(projectId, trigger) {
  const project = projectData.find((item) => item.id === projectId);

  if (!project || !projectOverlay || !projectPanel) {
    return;
  }

  activeProjectTrigger = trigger;
  activeProject = project;
  activeImageIndex = 0;
  renderProject(project);
  projectPanel.scrollTop = 0;
  document.body.classList.add("is-project-open");
  projectOverlay.classList.add("is-open");
  projectOverlay.setAttribute("aria-hidden", "false");
  projectPanel.focus({ preventScroll: true });
}

function closeProject() {
  if (!projectOverlay) {
    return;
  }

  projectOverlay.classList.remove("is-open");
  projectOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-project-open");

  if (activeProjectTrigger) {
    activeProjectTrigger.focus();
  }

  activeProject = null;
  activeImageIndex = 0;
}

if (businessCard) {
  businessCard.addEventListener("click", () => {
    const isFlipped = businessCard.classList.toggle("is-flipped");
    businessCard.setAttribute("aria-pressed", String(isFlipped));
  });
}

closeButtons.forEach((button) => {
  button.addEventListener("click", closeProject);
});

projectOverlay?.addEventListener("click", (event) => {
  if (event.target === projectOverlay) {
    closeProject();
  }
});

document.addEventListener("keydown", (event) => {
  if (!projectOverlay?.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeProject();
    return;
  }

  if (event.key === "ArrowLeft") {
    setProjectImageIndex(activeImageIndex - 1);
    return;
  }

  if (event.key === "ArrowRight") {
    setProjectImageIndex(activeImageIndex + 1);
  }
});

renderUiLabels(ui);
renderProfile(profileData);
renderProjectCards(projectData);
