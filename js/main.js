/* =========================================================
   GLOBAL STATE
   ========================================================= */
window.currentTranslations = {};
window.TRANSLATIONS = window.TRANSLATIONS || {};

/* =========================================================
   LANGUAGE APPLICATION
   Replaces text nodes and placeholders using the selected locale.
   ========================================================= */
function applyLanguage(lang) {
  const dict = window.TRANSLATIONS[lang] || window.TRANSLATIONS.en || {};
  window.currentTranslations = dict;

  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "es" ? "es" : "en";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (dict[key]) node.textContent = dict[key];
  });

  document.querySelectorAll("[data-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-placeholder");
    if (dict[key]) node.placeholder = dict[key];
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

/* =========================================================
   MOBILE MENU
   ========================================================= */
function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navWrap = document.getElementById("navWrap");

  if (!menuToggle || !navWrap) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navWrap.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrap.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================================
   LANGUAGE SWITCHER
   ========================================================= */
function setupLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
}

/* =========================================================
   FAQ ACCORDION
   ========================================================= */
function setupFaqAccordion() {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      item.classList.toggle("active");
    });
  });
}

/* =========================================================
   CONTACT FORM
   Prototype only
   ========================================================= */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = window.currentTranslations.formSuccess || "Thanks!";
    alert(message);
  });
}

/* =========================================================
   INITIALIZATION
   English is the default language.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupLanguageButtons();
  setupFaqAccordion();
  setupContactForm();
  applyLanguage("en");
});
