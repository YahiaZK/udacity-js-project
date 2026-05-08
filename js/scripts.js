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







