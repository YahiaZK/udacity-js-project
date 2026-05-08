const fetchAboutMe = async () => {
  const aboutMeResponse = await fetch("../data/aboutMeData.json");
  return await aboutMeResponse.json();
};

const createAboutMe = async () => {
  const aboutMeData = await fetchAboutMe();

  const aboutMeDiv = document.querySelector("#aboutMe");

  const aboutMeBio = document.createElement("p");
  aboutMeBio.textContent = aboutMeData.aboutMe;
  aboutMeDiv.append(aboutMeBio);

  const aboutMeHeadshotContainer = document.createElement("div");
  aboutMeHeadshotContainer.classList.add("headshotContainer");
  aboutMeDiv.append(aboutMeHeadshotContainer);

  const aboutMeImg = document.createElement("img");
  aboutMeImg.setAttribute("src", aboutMeData.headshot);
  aboutMeHeadshotContainer.append(aboutMeImg);
};

createAboutMe();

const fetchProjects = async () => {
  const projectsResponse = await fetch("../data/projectsData.json");
  return await projectsResponse.json();
};

const createProjects = async () => {
  const projectsData = await fetchProjects();
  for (const project of projectsData) {
    createCard(project);
  }
};

const createCard = (project) => {
  const projectList = document.querySelector("#projectList");
  const projectCard = document.createElement("div");

  projectCard.classList.add("projectCard");
  projectCard.dataset.projectId = project.project_id;
  projectCard.style.backgroundImage = `url("${project.card_image ?? "../images/card_placeholder_bg.webp"}")`;

  const projectName = document.createElement("h4");
  projectName.textContent = project.project_name ?? "New Project";

  const shortDescription = document.createElement("p");
  shortDescription.textContent =
    project.short_description ?? "!!Description is missing";

  projectCard.append(projectName);
  projectCard.append(shortDescription);

  projectList.append(projectCard);
};

createProjects();

const cardListener = () => {
  const projectList = document.querySelector("#projectList");
  projectList.addEventListener("pointerdown", handleSpotlight);
};

const handleSpotlight = async () => {
  const clickedCard = event.target.closest(".projectCard");
  const projectId = clickedCard.dataset.projectId;
  const projectsData = await fetchProjects();
  const spotlightProject = projectsData.find(
    (project) => project.project_id === projectId,
  );
  createSpotlight(spotlightProject);
};

const createSpotlight = (spotlightProject) => {
  const spotlightTitles = document.querySelector("#spotlightTitles");
  const projectSpotlight = document.querySelector("#projectSpotlight");

  projectSpotlight.style.backgroundImage = `url("${spotlightProject.spotlight_image ?? "../images/spotlight_placeholder_bg.webp"}")`;

  const projectName = document.createElement("h3");
  projectName.textContent = spotlightProject.project_name ?? "New Project";

  const longDescription = document.createElement("p");
  longDescription.textContent =
    spotlightProject.long_description ?? "!!description is missing";

  const projectLink = document.createElement("a");
  projectLink.textContent = "Click here to see more...";
  projectLink.setAttribute("href", spotlightProject.url);

  spotlightTitles.replaceChildren(projectName, longDescription, projectLink);
};

cardListener();
