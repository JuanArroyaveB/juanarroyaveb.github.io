const languageConfiguration = window.siteLanguages || {
  default: "en",
  available: [{ code: "en", html_lang: "en" }],
};

const languages = languageConfiguration.available.map((language) => language.code);
const defaultLanguage = languages.includes(languageConfiguration.default)
  ? languageConfiguration.default
  : languages[0];
const languageButtons = document.querySelectorAll("[data-language]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let currentLanguage = localStorage.getItem("juan-language");
if (!languages.includes(currentLanguage)) currentLanguage = defaultLanguage;

function unique(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

const portraitLayers = [...document.querySelectorAll(".portrait-layer")];
const photos = shuffle(unique(window.siteMedia?.photos));
let photoIndex = 0;
let activeLayer = 0;

if (portraitLayers.length > 0 && photos.length > 0) {
  portraitLayers[0].src = photos[0];
  portraitLayers[0].classList.add("is-active");

  if (portraitLayers.length > 1 && photos.length > 1 && !reducedMotion.matches) {
    window.setInterval(() => {
      photoIndex = (photoIndex + 1) % photos.length;
      const nextLayer = activeLayer === 0 ? 1 : 0;
      portraitLayers[nextLayer].src = photos[photoIndex];
      portraitLayers[nextLayer].classList.add("is-active");
      portraitLayers[activeLayer].classList.remove("is-active");
      activeLayer = nextLayer;
    }, 6000);
  }
}

function setLanguage(language) {
  currentLanguage = languages.includes(language) ? language : defaultLanguage;
  const languageDetails = languageConfiguration.available.find(
    (item) => item.code === currentLanguage,
  );

  document.documentElement.lang = languageDetails?.html_lang || currentLanguage;
  const translatedTitle = document.body?.getAttribute(`data-title-${currentLanguage}`);
  if (translatedTitle) document.title = translatedTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translated = element.dataset[currentLanguage] ?? element.dataset[defaultLanguage];
    if (translated !== undefined) element.textContent = translated;
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  });

  localStorage.setItem("juan-language", currentLanguage);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const currentYear = document.getElementById("current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();
setLanguage(currentLanguage);
