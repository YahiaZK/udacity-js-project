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

const handleSpotlight = async (event) => {
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

const createDefualtSpotlight = async () => {
  const projectsData = await fetchProjects();
  const spotlightProject = projectsData[0];
  createSpotlight(spotlightProject);
};
createDefualtSpotlight();

const navArrows = () => {
  const projectList = document.querySelector("#projectList");
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");

  const handleArrowLeft = () => {
    if (isDesktop()) {
      projectList.scrollBy({ top: -220 });
    } else {
      projectList.scrollBy({ left: -220 });
    }
  };
  const handlearrowRight = () => {
    if (isDesktop()) {
      projectList.scrollBy({ top: 220 });
    } else {
      projectList.scrollBy({ left: 220 });
    }
  };

  arrowLeft.addEventListener("pointerdown", handleArrowLeft);
  arrowRight.addEventListener("pointerdown", handlearrowRight);
};

navArrows();

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const illegalCharRegex = /[^a-zA-Z0-9@._-]/;

const emailValidation = (emailField) => {
  const emailError = document.querySelector("#emailError");
  if (emailField === "") {
    emailError.textContent = "Email is required.";
    return false;
  }
  if (illegalCharRegex.test(emailField)) {
    emailError.textContent = "Email contains illegal characters.";
    return false;
  }
  if (!emailRegex.test(emailField)) {
    emailError.textContent = "Please enter a valid email address.";
    return false;
  }

  emailError.textContent = "";
  return true;
};
const textValidation = (textField) => {
  const messageError = document.querySelector("#messageError");

  if (textField === "") {
    messageError.textContent = "Message is required.";
    return false;
  }
  if (illegalCharRegex.test(textField)) {
    messageError.textContent = "Message contains illegal characters.";
    return false;
  }
  if (textField.length > 300) {
    messageError.textContent = "Message must be 300 characters or fewer.";
    return false;
  }

  messageError.textContent = "";
  return true;
};

const formValidation = () => {
  const formSection = document.querySelector("#formSection");

  const handleForm = (event) => {
    event.preventDefault();

    const emailField = document.querySelector("#contactEmail").value;
    const textField = document.querySelector("#contactMessage").value;

    const emailValid = emailValidation(emailField);
    const textValid = textValidation(textField);

    if (emailValid && textValid) {
      alert("Form submitted successfully!");
      formSection.reset();
      // charactersLeft.textContent = "Characters: 0/300";
    }
  };

  formSection.addEventListener("submit", handleForm);
};

formValidation();

const liveCount = () => {
  const contactMessage = document.querySelector("#contactMessage");
  const charactersLeft = document.querySelector("#charactersLeft");

  contactMessage.addEventListener("input", () => {
    const count = contactMessage.value.length;
    charactersLeft.textContent = `Characters: ${count}/300`;
  });
};

liveCount();
