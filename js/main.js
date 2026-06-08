/* =============================================================
   main.js — site interactivity
   - current year in footer
   - scroll-reveal animations
   - AJAX form submission (Web3Forms)
   - decorative snow canvas
   ============================================================= */

(function () {
  "use strict";

  /* ---- Footer year -------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Scroll reveal ------------------------------------------------ */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

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
