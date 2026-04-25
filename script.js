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

function createMockPreview(project, mode) {
  const preview = document.createElement("span");
  preview.className = mode === "card" ? "thumb-window" : "preview-browser";

  const topLine = document.createElement("span");
  topLine.className = mode === "card" ? "thumb-topline" : "preview-bar";
  preview.append(topLine);

  if (mode === "card") {
    const content = document.createElement("span");
    content.className = project.theme === "stocking" ? "thumb-chart" : "thumb-tiles";

    const itemCount = project.theme === "stocking" ? 4 : 3;
    for (let index = 0; index < itemCount; index += 1) {
      content.append(document.createElement("span"));
    }

    const summary = document.createElement("span");
    summary.className = "thumb-summary";
    summary.append(document.createElement("span"), document.createElement("span"));

    preview.append(content, summary);
    return preview;
  }

  const dashboard = document.createElement("span");
  dashboard.className = "preview-dashboard";

  ["preview-kpi", "preview-kpi", "preview-line", "preview-table"].forEach((className) => {
    const item = document.createElement("span");
    item.className = className;
    dashboard.append(item);
  });

  preview.append(dashboard);
  return preview;
}

function createProjectVisual(project, mode) {
  const wrapper = document.createElement("span");
  wrapper.className =
    mode === "card"
      ? `project-thumb project-thumb--${project.theme || "default"}`
      : `project-detail-preview-inner project-detail-preview-inner--${project.theme || "default"}`;
  wrapper.setAttribute("aria-hidden", "true");

  const imageData = project.image || {};
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

function createProjectCard(project) {
  const card = document.createElement("button");
  card.className = "project-card";
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

  projectPreview.className = `project-detail-preview is-${project.theme || "default"}`;
  projectPreview.replaceChildren(createProjectVisual(project, "detail"));

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
  if (event.key === "Escape" && projectOverlay?.classList.contains("is-open")) {
    closeProject();
  }
});

renderUiLabels(ui);
renderProfile(profileData);
renderProjectCards(projectData);
