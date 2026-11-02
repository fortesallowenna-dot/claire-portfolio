/* ==========================================================================
   Allowenna Claire Luarez — UI/UX Portfolio
   Interactions: mobile nav, scroll-spy, scroll reveal, contact form, footer year
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Sticky header shadow ---------- */
  const header = document.getElementById("site-header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Mobile navigation ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    // Close the menu when a nav link is clicked (mobile)
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close the menu when clicking outside of it
    document.addEventListener("click", function (event) {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close the menu on Escape
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- Scroll-spy: active nav link ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    let currentId = "home";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("active", isActive);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger siblings slightly for a refined cascade effect
            const siblings = entry.target.parentElement
              ? entry.target.parentElement.querySelectorAll(".reveal")
              : [entry.target];
            siblings.forEach(function (el, index) {
              el.style.setProperty("--reveal-delay", Math.min(index * 90, 450) + "ms");
            });
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }


  /* ---------- Contact form validation ---------- */
  const form = document.getElementById("contact-form");

  if (form) {
    const nameInput = document.getElementById("cf-name");
    const emailInput = document.getElementById("cf-email");
    const subjectInput = document.getElementById("cf-subject");
    const messageInput = document.getElementById("cf-message");
    const feedback = document.getElementById("cf-feedback");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setFieldError(input, errorEl, message) {
      const group = input.closest(".form-group");
      if (group) {
        group.classList.toggle("invalid", Boolean(message));
      }
      if (errorEl) {
        errorEl.textContent = message;
      }
      return !message;
    }

    function validateField(input, errorEl, isValid, message) {
      return setFieldError(input, errorEl, isValid ? "" : message);
    }

    function validateForm() {
      let valid = true;

      valid =
        validateField(
          nameInput,
          document.getElementById("cf-name-error"),
          nameInput.value.trim().length >= 2,
          nameInput.value.trim().length === 0
            ? "Please enter your name."
            : "Please enter at least 2 characters."
        ) && valid;

      const emailValue = emailInput.value.trim();
      valid =
        validateField(
          emailInput,
          document.getElementById("cf-email-error"),
          emailPattern.test(emailValue),
          emailValue.length === 0
            ? "Please enter your email address."
            : "Please enter a valid email address (e.g., you@example.com)."
        ) && valid;

      valid =
        validateField(
          subjectInput,
          document.getElementById("cf-subject-error"),
          subjectInput.value.trim().length >= 3,
          subjectInput.value.trim().length === 0
            ? "Please add a subject."
            : "Subject should be at least 3 characters."
        ) && valid;

      valid =
        validateField(
          messageInput,
          document.getElementById("cf-message-error"),
          messageInput.value.trim().length >= 10,
          messageInput.value.trim().length === 0
            ? "Please write a message."
            : "Message should be at least 10 characters."
        ) && valid;

      return valid;
    }

    // Live re-validation after the first attempt
    form.querySelectorAll("input, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        if (field.closest(".form-group").classList.contains("invalid")) {
          validateForm();
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      feedback.className = "";
      feedback.textContent = "";

      if (!validateForm()) {
        feedback.classList.add("error");
        feedback.textContent = "Please fix the highlighted fields above.";
        const firstInvalid = form.querySelector(".form-group.invalid input, .form-group.invalid textarea");
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Simulate sending (no backend is attached to this static site).
      feedback.classList.add("success");
      feedback.textContent =
        "Thank you, " +
        nameInput.value.trim().split(" ")[0] +
        "! Your message looks good, but this form doesn't send emails yet. Please reach me directly through the email or phone number on this page.";
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

