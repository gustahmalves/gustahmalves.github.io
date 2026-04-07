window.TRANSLATIONS = window.TRANSLATIONS || {};
window.currentTranslations = {};

function applyLanguage(languageCode) {
  const selectedTranslations = window.TRANSLATIONS[languageCode] || window.TRANSLATIONS.en || {};
  window.currentTranslations = selectedTranslations;
  document.documentElement.lang = languageCode === "pt" ? "pt-BR" : languageCode;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");
    if (selectedTranslations[translationKey]) {
      element.textContent = selectedTranslations[translationKey];
    }
  });

  document.querySelectorAll("[data-placeholder]").forEach((element) => {
    const translationKey = element.getAttribute("data-placeholder");
    if (selectedTranslations[translationKey]) {
      element.placeholder = selectedTranslations[translationKey];
    }
  });

  document.querySelectorAll(".siteHeaderLanguageButton").forEach((button) => {
    button.classList.toggle("isActive", button.getAttribute("data-lang") === languageCode);
  });
}

function setupLanguageButtons() {
  document.querySelectorAll(".siteHeaderLanguageButton").forEach((button) => {
    button.addEventListener("click", function () {
      applyLanguage(button.getAttribute("data-lang"));
    });
  });
}

function setupMobileMenu() {
  const mobileButton = document.getElementById("siteHeaderToggle");
  const mobilePanel = document.getElementById("siteHeaderPanel");
  if (!mobileButton || !mobilePanel) return;

  mobileButton.addEventListener("click", function () {
    const isOpen = mobilePanel.classList.toggle("isOpen");
    mobileButton.setAttribute("aria-expanded", String(isOpen));
  });
}

function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert(window.currentTranslations.formSuccess || "Submitted");
  });
}

function setupRevealBlocks() {
  const revealBlocks = document.querySelectorAll(".revealBlock");
  if (!("IntersectionObserver" in window)) {
    revealBlocks.forEach((block) => block.classList.add("isVisible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("isVisible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealBlocks.forEach((block) => observer.observe(block));
}

document.addEventListener("DOMContentLoaded", function () {
  setupLanguageButtons();
  setupMobileMenu();
  setupContactForm();
  setupRevealBlocks();
  applyLanguage("en");
});
