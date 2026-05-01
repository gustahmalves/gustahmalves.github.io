window.TRANSLATIONS = window.TRANSLATIONS || {};
window.currentTranslations = {};


function applyLanguage(languageCode) {
  const selectedTranslations = window.TRANSLATIONS[languageCode] || window.TRANSLATIONS.en || {};
  window.currentTranslations = selectedTranslations;
  document.documentElement.lang = languageCode === "pt" ? "pt-BR" : languageCode;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");
    if (selectedTranslations[translationKey]) {
      element.innerHTML = selectedTranslations[translationKey];
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const duration = 800;
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, start + (end - start) * ease);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
});
