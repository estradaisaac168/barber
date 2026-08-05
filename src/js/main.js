(function () {
  "use strict";

  // --- Navbar: encoger + resaltar link activo al hacer scroll ---------
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav .nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const progressBar = document.querySelector(".scroll-progress");

  function onScroll() {
    const y = window.scrollY;

    // navbar compacto
    nav.classList.toggle("is-scrolled", y > 40);

    // barra de progreso de lectura
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";

    // link activo según sección visible
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (y >= top) current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Cerrar menú móvil al elegir un link ------------------------------
  const collapseEl = document.getElementById("navMain");
  if (collapseEl && window.bootstrap) {
    const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });
    navLinks.forEach((link) => {
      link.addEventListener("click", () => bsCollapse.hide());
    });
  }

  // --- Scroll reveal con IntersectionObserver --------------------------
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // --- Año dinámico en el footer ----------------------------------------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
