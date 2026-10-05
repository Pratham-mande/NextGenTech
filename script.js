(() => {
  "use strict";

  /* =====================================================
     HEADER + SCROLL PROGRESS
  ===================================================== */

  const header = document.getElementById("header");
  const progressBar = document.getElementById("progressBar");

  function updateScrollUI() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      0;

    const documentHeight =
      document.documentElement.scrollHeight;

    const windowHeight =
      window.innerHeight;

    const maxScroll =
      documentHeight - windowHeight;

    /* Header */
    if (header) {
      if (scrollTop > 30) {
        header.classList.add(
          "bg-slate-950/95",
          "shadow-xl",
          "backdrop-blur-xl"
        );

        header.classList.remove(
          "bg-slate-950/70"
        );
      } else {
        header.classList.remove(
          "bg-slate-950/95",
          "shadow-xl",
          "backdrop-blur-xl"
        );

        header.classList.add(
          "bg-slate-950/70"
        );
      }
    }

    /* Progress bar */
    if (progressBar) {
      const percentage =
        maxScroll > 0
          ? (scrollTop / maxScroll) * 100
          : 0;

      progressBar.style.width =
        `${Math.min(100, Math.max(0, percentage))}%`;
    }
  }

  window.addEventListener(
    "scroll",
    updateScrollUI,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateScrollUI
  );

  updateScrollUI();


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    const menuIcon =
      menuToggle.querySelector("i");


    function openMenu() {

      navLinks.classList.remove("hidden");

      navLinks.classList.add("flex");

      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Close navigation"
      );

      if (menuIcon) {
        menuIcon.className =
          "fa-solid fa-xmark";
      }
    }


    function closeMenu() {

      if (window.innerWidth < 1024) {
        navLinks.classList.add("hidden");
        navLinks.classList.remove("flex");
      }

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

      if (menuIcon) {
        menuIcon.className =
          "fa-solid fa-bars";
      }
    }


    function toggleMenu() {

      const isOpen =
        menuToggle.getAttribute(
          "aria-expanded"
        ) === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }


    menuToggle.addEventListener(
      "click",
      toggleMenu
    );


    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {
            closeMenu();
          }
        );

      });


    document.addEventListener(
      "keydown",
      event => {

        if (event.key === "Escape") {
          closeMenu();
        }

      }
    );


    window.addEventListener(
      "resize",
      () => {

        if (window.innerWidth >= 1024) {

          navLinks.classList.remove(
            "hidden"
          );

          navLinks.classList.add(
            "flex"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          if (menuIcon) {
            menuIcon.className =
              "fa-solid fa-bars";
          }

        } else {

          closeMenu();

        }

      }
    );

  }


  /* =====================================================
     SCROLL REVEAL ANIMATION
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );


  function showAllAnimations() {

    revealElements.forEach(
      element => {
        element.classList.add(
          "is-visible"
        );
      }
    );

  }


  if (
    "IntersectionObserver" in window &&
    revealElements.length > 0
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "is-visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    revealElements.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    showAllAnimations();

  }


  /* =====================================================
     COUNTER ANIMATION
  ===================================================== */

  const counters =
    document.querySelectorAll(
      "[data-count]"
    );


  function animateCounter(element) {

    const target =
      Number(
        element.dataset.count || 0
      );

    const suffix =
      element.dataset.suffix || "";

    const duration = 1500;

    const startTime =
      performance.now();


    function updateCounter(
      currentTime
    ) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      /* Ease out */
      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      const currentValue =
        Math.round(
          target * eased
        );


      element.textContent =
        `${currentValue}${suffix}`;


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        element.textContent =
          `${target}${suffix}`;

      }

    }


    requestAnimationFrame(
      updateCounter
    );

  }


  if (
    "IntersectionObserver" in window &&
    counters.length > 0
  ) {

    const counterObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                animateCounter(
                  entry.target
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.5
        }
      );


    counters.forEach(
      counter => {

        counterObserver.observe(
          counter
        );

      }
    );

  } else {

    counters.forEach(
      counter => {

        animateCounter(
          counter
        );

      }
    );

  }


  /* =====================================================
     ACTIVE NAVIGATION
  ===================================================== */

  const navItems =
    document.querySelectorAll(
      ".nav-link"
    );

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  if (
    "IntersectionObserver" in window &&
    sections.length > 0
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                const currentId =
                  entry.target.id;


                navItems.forEach(
                  item => {

                    const href =
                      item.getAttribute(
                        "href"
                      );


                    if (
                      href ===
                      `#${currentId}`
                    ) {

                      item.classList.add(
                        "active",
                        "text-cyan-400"
                      );

                      item.classList.remove(
                        "text-white"
                      );

                    } else {

                      item.classList.remove(
                        "active",
                        "text-cyan-400"
                      );

                      item.classList.add(
                        "text-white"
                      );

                    }

                  }
                );

              }

            }
          );

        },
        {
          rootMargin:
            "-30% 0px -60% 0px",

          threshold: 0
        }
      );


    sections.forEach(
      section => {

        sectionObserver.observe(
          section
        );

      }
    );

  }


  /* =====================================================
     CONTACT FORM
  ===================================================== */

  const contactForm =
    document.getElementById(
      "contactForm"
    );

  const formMessage =
    document.getElementById(
      "formMessage"
    );


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        if (
          !contactForm.checkValidity()
        ) {

          contactForm.reportValidity();

          return;

        }


        if (formMessage) {

          formMessage.textContent =
            "Thanks! Your message has been received. Connect a backend or form service to receive real inquiries.";

          formMessage.classList.remove(
            "hidden"
          );

          formMessage.classList.remove(
            "text-red-400"
          );

          formMessage.classList.add(
            "text-emerald-400"
          );

        }


        contactForm.reset();

      }
    );

  }


  /* =====================================================
     CURRENT YEAR
  ===================================================== */

  const year =
    document.getElementById(
      "year"
    );

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     PAGE LOAD ANIMATION
  ===================================================== */

  window.addEventListener(
    "load",
    () => {

      document.body.classList.add(
        "page-loaded"
      );

    }
  );

})();