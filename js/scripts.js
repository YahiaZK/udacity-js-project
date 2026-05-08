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

  const projectList = document.querySelector("#projectList");

  for (const project of projectsData) {
    const projectCard = document.createElement("div");
    projectCard.classList.add("projectCard");

    const projectName = document.createElement("h4");
    projectName.textContent = project.project_name ?? "New Project";

    const shortDescription = document.createElement("p");
    shortDescription.textContent =
      project.short_description ?? "!!Description is missing";

    const cardImg = document.createElement("img");
    cardImg.setAttribute(
      "src",
      project.card_image ?? "../images/card_placeholder_bg.webp",
    );

    cardImg.style.position = "absolute";
    cardImg.style.top = "0";
    cardImg.style.left = "0";
    cardImg.style.width = "100%";
    cardImg.style.height = "100%";
    cardImg.style.objectFit = "cover";
    cardImg.style.zIndex = "0";

    projectName.style.position = "relative";
    projectName.style.zIndex = "1";

    shortDescription.style.position = "relative";
    shortDescription.style.zIndex = "1";

    projectCard.append(projectName);
    projectCard.append(shortDescription);
    projectCard.append(cardImg);
    projectList.append(projectCard);
  }
};

createProjects();
