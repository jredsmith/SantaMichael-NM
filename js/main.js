/* =============================================================
   main.js — site interactivity
   - current year in footer
   - scroll-reveal animations
   - AJAX form submission (Web3Forms)
   - photo gallery: "Show all" button + tap-to-enlarge viewer
   - decorative snow canvas
   ============================================================= */

(function () {
  "use strict";

  /* ---- Footer year -------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Scroll reveal ------------------------------------------------ */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    // Reveal as soon as any part of the element is a little way (8%) above the
    // bottom of the screen. A "share of the element visible" threshold would
    // never be met by something much taller than the screen — the photo
    // gallery on a phone, for one — and it would stay hidden.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Mobile menu (hamburger) -------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const navEl = document.querySelector("nav");
  if (navToggle && navEl) {
    const setOpen = (open) => {
      navEl.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    navToggle.addEventListener("click", () => setOpen(!navEl.classList.contains("open")));
    // close after tapping a link
    navEl.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
    // close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---- Back-to-top button ------------------------------------------- */
  const toTop = document.getElementById("to-top");
  if (toTop) {
    const onScroll = () => toTop.classList.toggle("show", window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  /* ---- Form submission (Web3Forms AJAX) ----------------------------- */
  function wireForm(formId, msgId, successText) {
    const form = document.getElementById(formId);
    const msg = document.getElementById(msgId);
    if (!form || !msg) return;

    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const orig = btn.textContent;
      btn.textContent = "Sending…";
      btn.disabled = true;
      msg.className = "form-msg";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
          msg.textContent = successText;
          msg.className = "form-msg ok";
          form.reset();
        } else {
          msg.textContent = data.message || "Something went wrong. Please email Santa Michael directly.";
          msg.className = "form-msg err";
        }
      } catch (e) {
        msg.textContent = "Network error. Please email Santa Michael directly.";
        msg.className = "form-msg err";
      } finally {
        btn.textContent = orig;
        btn.disabled = false;
      }
    });
  }

  wireForm(
    "contact-form",
    "contact-msg",
    "🎅 Ho ho ho! Your message is on its way. Santa Michael will be in touch soon."
  );
  wireForm(
    "visit-form",
    "visit-msg",
    "🎅 Report received — transmitted securely to the North Pole. Santa Michael will confirm your visit soon."
  );

  /* ---- Photo gallery: "Show all" + tap to enlarge ------------------- */
  const gallery = document.getElementById("gallery");
  if (gallery) {
    const photos = Array.from(gallery.querySelectorAll("a.photo"));
    // How many photos show before "Show all" is pressed. The hiding itself is
    // done in css/components.css (.photo:nth-child(n+7)) — keep the two in step.
    const SHORT = 6;

    const more = document.getElementById("gallery-more");
    const moreBtn = more && more.querySelector("button");
    if (moreBtn && photos.length > SHORT) {
      moreBtn.textContent = "Show all " + photos.length + " photos";
      moreBtn.addEventListener("click", () => {
        gallery.classList.add("is-open");
        more.remove();
        // carry on from the first photo that has just appeared
        photos[SHORT].focus({ preventScroll: true });
      });
    } else {
      // nothing to hold back (or no button to bring it back with)
      gallery.classList.add("is-open");
      if (more) more.remove();
    }

    // Tap to enlarge. Each photo is a link to its picture file; where the
    // browser has <dialog>, open that file in the viewer instead. Where it
    // doesn't, the link simply opens the picture.
    const box = document.getElementById("lightbox");
    if (box && typeof box.showModal === "function") {
      const img = box.querySelector(".lightbox-img");
      const count = box.querySelector(".lightbox-count");
      let shown = [];   // the photos on show when the viewer was opened
      let at = 0;       // which of them is up

      // step past either end and it wraps round
      const show = (i) => {
        at = (i + shown.length) % shown.length;
        const thumb = shown[at].querySelector("img");
        img.src = shown[at].href;
        img.alt = thumb ? thumb.alt : "";
        count.textContent = at + 1 + " / " + shown.length;
      };

      gallery.addEventListener("click", (e) => {
        const link = e.target.closest("a.photo");
        if (!link) return;
        // leave "open in a new tab" clicks to the browser
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        shown = gallery.classList.contains("is-open") ? photos : photos.slice(0, SHORT);
        show(Math.max(0, shown.indexOf(link)));
        box.showModal();
        document.documentElement.classList.add("lightbox-open");
      });

      box.querySelector(".lightbox-close").addEventListener("click", () => box.close());
      box.querySelector(".lightbox-prev").addEventListener("click", () => show(at - 1));
      box.querySelector(".lightbox-next").addEventListener("click", () => show(at + 1));
      // a tap on the dark surround (not the photo or a button) closes it
      box.addEventListener("click", (e) => {
        if (e.target === box) box.close();
      });
      // Escape closes a <dialog> on its own; the arrow keys step through
      box.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") show(at - 1);
        else if (e.key === "ArrowRight") show(at + 1);
      });
      box.addEventListener("close", () => {
        document.documentElement.classList.remove("lightbox-open");
        img.removeAttribute("src");
      });

      // swipe left / right to step through (same feel as the calendar)
      let startX = null, startY = 0;
      box.addEventListener("touchstart", (e) => {
        // one finger only, and not while pinched in to look closer
        const zoomed = window.visualViewport && window.visualViewport.scale > 1.01;
        if (e.touches.length !== 1 || zoomed) { startX = null; return; }
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });
      box.addEventListener("touchend", (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;
        startX = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(dx < 0 ? at + 1 : at - 1);
      }, { passive: true });
    }
  }

  /* ---- Decorative snow ---------------------------------------------- */
  const canvas = document.getElementById("snow");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let flakes = [];
    let W, H;

    function size() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const n = Math.min(90, Math.floor(W / 16));
      flakes = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.2 + 0.6,
        s: Math.random() * 0.7 + 0.25,
        d: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(244,236,224,.7)";
      flakes.forEach((f) => {
        ctx.beginPath();
        ctx.globalAlpha = 0.4 + f.r / 3;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        f.y += f.s;
        f.x += Math.sin((f.d += 0.01)) * 0.4;
        if (f.y > H) {
          f.y = -5;
          f.x = Math.random() * W;
        }
      });
      requestAnimationFrame(draw);
    }

    size();
    draw();
    window.addEventListener("resize", size);
  }
})();
