/* =============================================================
   calendar.js — "Where to find Santa Michael" appearances calendar
   - month grid you flip through (only months that have events)
   - tap a highlighted date to list that day's appearances

   TO UPDATE THE SCHEDULE: edit VENUES and EVENTS below. Nothing
   else in this file needs to change.
   ============================================================= */

(function () {
  "use strict";

  /* ---- Hosts ---------------------------------------------------------
     One entry per host. `url` is where the host's name links to
     (Instagram unless noted). Leave `url` empty to show the name as
     plain text.                                                        */
  const IG = "https://www.instagram.com/";
  const VENUES = {
    danielle:    { name: "Danielle Ortiz Photography",   url: IG + "danielleortizphotography/" },
    sandia:      { name: "Sandia Resort & Casino",       url: IG + "sandiacasino/" },
    burning:     { name: "Burning Daylight Coffee",      url: IG + "burningdaylightcoffee/" },
    kate:        { name: "Kate Buckles Photography",     url: IG + "katebucklesphotography/" },
    taylor:      { name: "Taylor Rayne Photography",     url: IG + "tayloraynephotography/" },
    naomi:       { name: "Naomi Romero Photography",     url: IG + "naomi_romero_photography/" },
    jacqueline:  { name: "Jacqueline Vega Photography",  url: IG + "jaccquelinevegaphotography/" },
    littlegym:   { name: "The Little Gym of Rio Rancho", url: IG + "tlgrioranchonm/" },
    daysgoby:    { name: "Days Go By Photography",       url: "https://www.facebook.com/DaysGoByPhotography/" },
    winrock:     { name: "Winrock Town Center",          url: IG + "winrocktowncenter/" },
    livmimi:     { name: "Liv & Mimi’s Play Cafe",       url: IG + "livandmimisplaycafe/" },
    restoration: { name: "Restoration Pizza",            url: IG + "restorationpizza/" },
    sawmill:     { name: "Sawmill Market",               url: IG + "sawmillmarketabq/" },
    mfauto:      { name: "M&F Auto Sales",               url: IG + "mandfautosales/" },
    cabq:        { name: "City of Albuquerque",          url: "" },
    swingpickle: { name: "Swing-N-Pickle",               url: IG + "swingnpickle/" },
    ivy:         { name: "The Ivy Tearoom",              url: "https://theivytearoom.com/book/" },
  };

  /* ---- Appearances ---------------------------------------------------
     [ date (YYYY-MM-DD), time, host key from VENUES, type, note ]
     The note is optional: one extra line shown under the host (the
     event's name, where it is, and so on).
     Keep each day's rows in the order they happen.                     */
  const EVENTS = [
    ["2026-11-08", "11:00 AM – 3:00 PM",  "danielle",    "Photo Session"],
    ["2026-11-09", "5:30 – 8:00 PM",      "sandia",      "Santa Visit"],
    ["2026-11-13", "6:00 – 7:00 PM",      "cabq",        "Community Event",
      "Globitos Community Event & Pop-Up Market at North Domingo Baca Multigenerational Center. Free and open to the public; the event runs 5:00 – 8:00 PM."],
    ["2026-11-14", "10:00 AM – 2:00 PM",  "burning",     "Photo Session"],
    ["2026-11-15", "9:00 AM – 12:00 PM",  "taylor",      "Photo Session"],
    ["2026-11-15", "1:30 – 3:30 PM",      "kate",        "Photo Session"],
    ["2026-11-20", "4:00 – 6:00 PM",      "naomi",       "Photo Session"],
    ["2026-11-21", "10:00 AM – 12:00 PM", "jacqueline",  "Photo Session"],
    ["2026-11-21", "4:00 – 6:00 PM",      "littlegym",   "Photo Session"],
    ["2026-11-22", "10:00 AM – 2:00 PM",  "daysgoby",    "Photo Session"],
    ["2026-11-22", "3:00 – 5:00 PM",      "jacqueline",  "Photo Session"],
    ["2026-11-27", "2:00 – 6:00 PM",      "winrock",     "Photo Session"],
    ["2026-11-28", "11:00 AM – 5:00 PM",  "sandia",      "Santa Visit"],
    ["2026-11-29", "11:00 AM – 5:00 PM",  "sandia",      "Santa Visit"],
    ["2026-12-02", "9:00 – 9:30 AM",      "livmimi",     "Storytime"],
    ["2026-12-04", "5:00 – 8:00 PM",      "restoration", "Meet and Greet"],
    ["2026-12-05", "11:00 AM – 5:00 PM",  "sandia",      "Santa Visit"],
    ["2026-12-06", "11:00 AM – 5:00 PM",  "sandia",      "Santa Visit"],
    ["2026-12-07", "5:00 – 8:00 PM",      "restoration", "Meet and Greet"],
    ["2026-12-08", "5:00 – 8:00 PM",      "restoration", "Meet and Greet"],
    ["2026-12-09", "9:00 – 9:30 AM",      "livmimi",     "Storytime"],
    ["2026-12-09", "5:00 – 8:00 PM",      "restoration", "Meet and Greet"],
    ["2026-12-10", "5:30 – 7:30 PM",      "sawmill",     "Santa Visit"],
    ["2026-12-11", "10:30 – 11:45 AM",    "livmimi",     "Photo Session"],
    ["2026-12-11", "3:00 – 5:00 PM",      "mfauto",      "Photo Session"],
    ["2026-12-11", "6:00 – 8:00 PM",      "sawmill",     "Santa Visit"],
    ["2026-12-12", "9:15 – 10:30 AM",     "livmimi",     "Photo Session"],
    ["2026-12-12", "11:00 AM – 5:00 PM",  "sandia",      "Santa Visit"],
    ["2026-12-13", "11:00 AM – 5:00 PM",  "sandia",      "Santa Visit"],
    ["2026-12-13", "6:00 – 8:00 PM",      "ivy",         "Santa Visit"],
    ["2026-12-16", "9:00 – 9:30 AM",      "livmimi",     "Storytime"],
    ["2026-12-17", "5:30 – 7:30 PM",      "sawmill",     "Santa Visit"],
    ["2026-12-18", "4:30 – 7:30 PM",      "sawmill",     "Santa Visit"],
    ["2026-12-19", "11:00 AM – 5:00 PM",  "sandia",      "Santa Visit"],
    ["2026-12-19", "6:00 – 8:00 PM",      "sawmill",     "Santa Visit"],
    ["2026-12-20", "11:00 AM – 5:00 PM",  "sandia",      "Santa Visit"],
    ["2026-12-21", "7:15 – 9:15 PM",      "swingpickle", "Meet and Greet"],
    ["2026-12-23", "9:00 – 9:30 AM",      "livmimi",     "Storytime"],
  ];

  /* ---- Elements ------------------------------------------------------ */
  const root = document.getElementById("cal");
  if (!root) return;
  const monthEl = root.querySelector(".cal-month");
  const titleEl = document.getElementById("cal-title");
  const gridEl = document.getElementById("cal-grid");
  const dayEl = document.getElementById("cal-day");
  const prevBtn = document.getElementById("cal-prev");
  const nextBtn = document.getElementById("cal-next");

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];
  const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /* ---- Date helpers (local time, so days never shift by timezone) ---- */
  const pad = (n) => String(n).padStart(2, "0");
  const toKey = (y, m, d) => y + "-" + pad(m + 1) + "-" + pad(d);   // m is 0-based
  const parts = (key) => key.split("-").map(Number);                // [y, m (1-based), d]
  const longDate = (key) => {
    const [y, m, d] = parts(key);
    return WEEKDAYS[new Date(y, m - 1, d).getDay()] + ", " + MONTHS[m - 1] + " " + d;
  };

  const now = new Date();
  const todayKey = toKey(now.getFullYear(), now.getMonth(), now.getDate());

  /* ---- Index the events by date -------------------------------------- */
  const byDate = new Map();
  EVENTS.forEach(([date, time, venue, type, note]) => {
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date).push({ time, venue: VENUES[venue], type, note });
  });
  const dates = Array.from(byDate.keys()).sort();
  const months = Array.from(new Set(dates.map((d) => d.slice(0, 7))));   // e.g. "2026-11"
  if (!dates.length) return;

  // Next date on or after today, else the fallback (ISO keys sort as text).
  const upcomingOr = (list, fallback) => list.find((d) => d >= todayKey) || fallback;

  let selected = upcomingOr(dates, dates[dates.length - 1]);
  let monthIdx = months.indexOf(selected.slice(0, 7));

  /* ---- Month grid ---------------------------------------------------- */
  function renderMonth() {
    const [y, m] = parts(months[monthIdx] + "-01");
    titleEl.textContent = MONTHS[m - 1] + " " + y;
    prevBtn.disabled = monthIdx === 0;
    nextBtn.disabled = monthIdx === months.length - 1;

    gridEl.textContent = "";
    const lead = new Date(y, m - 1, 1).getDay();
    const count = new Date(y, m, 0).getDate();
    for (let i = 0; i < lead; i++) gridEl.appendChild(document.createElement("span"));

    for (let d = 1; d <= count; d++) {
      const key = toKey(y, m - 1, d);
      const events = byDate.get(key);
      const cell = document.createElement(events ? "button" : "span");
      cell.className = "cal-cell";
      cell.textContent = d;
      if (key === todayKey) cell.classList.add("is-today");
      if (key < todayKey) cell.classList.add("is-past");
      if (events) {
        cell.type = "button";
        cell.classList.add("has-events");
        cell.dataset.date = key;
        cell.setAttribute("aria-pressed", key === selected ? "true" : "false");
        cell.setAttribute("aria-label",
          longDate(key) + ", " + events.length + (events.length === 1 ? " appearance" : " appearances"));
      }
      gridEl.appendChild(cell);
    }
  }

  /* ---- Selected-day panel -------------------------------------------- */
  function renderDay() {
    dayEl.textContent = "";

    const label = document.createElement("div");
    label.className = "eyebrow";
    label.textContent = selected === todayKey ? "Today" : selected < todayKey ? "Earlier this season" : "Coming up";
    dayEl.appendChild(label);

    const heading = document.createElement("h3");
    heading.textContent = longDate(selected);
    dayEl.appendChild(heading);

    const list = document.createElement("ul");
    list.className = "cal-events";
    byDate.get(selected).forEach((ev) => {
      const li = document.createElement("li");
      li.className = "cal-event";

      const top = document.createElement("div");
      top.className = "cal-event-top";
      const time = document.createElement("span");
      time.className = "cal-time";
      time.textContent = ev.time;
      const pill = document.createElement("span");
      pill.className = "cal-pill";
      pill.textContent = ev.type;
      top.append(time, pill);

      const host = document.createElement(ev.venue.url ? "a" : "span");
      host.className = "cal-host";
      host.textContent = ev.venue.name;
      if (ev.venue.url) {
        // say where the link goes; a host's own website needs no label
        const site = ev.venue.url.includes("facebook.com") ? " on Facebook"
          : ev.venue.url.includes("instagram.com") ? " on Instagram" : "";
        host.href = ev.venue.url;
        host.target = "_blank";
        host.rel = "noopener";
        host.setAttribute("aria-label", ev.venue.name + site + " (opens in a new tab)");
        const arrow = document.createElement("span");
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = " ↗";
        host.appendChild(arrow);
      }

      li.append(top, host);
      if (ev.note) {
        const note = document.createElement("p");
        note.className = "cal-note";
        note.textContent = ev.note;
        li.appendChild(note);
      }
      list.appendChild(li);
    });
    dayEl.appendChild(list);
  }

  /* ---- Interaction --------------------------------------------------- */
  function select(key) {
    selected = key;
    gridEl.querySelectorAll("button[data-date]").forEach((b) =>
      b.setAttribute("aria-pressed", b.dataset.date === key ? "true" : "false")
    );
    renderDay();
  }

  function flip(delta) {
    const next = monthIdx + delta;
    if (next < 0 || next >= months.length) return;
    const pressed = delta < 0 ? prevBtn : nextBtn;
    const hadFocus = document.activeElement === pressed;
    monthIdx = next;
    const inMonth = dates.filter((d) => d.startsWith(months[monthIdx]));
    selected = upcomingOr(inMonth, inMonth[0]);
    renderMonth();
    renderDay();
    // keep keyboard focus when the arrow just pressed becomes disabled
    if (hadFocus && pressed.disabled) (pressed === prevBtn ? nextBtn : prevBtn).focus();
  }

  prevBtn.addEventListener("click", () => flip(-1));
  nextBtn.addEventListener("click", () => flip(1));
  gridEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-date]");
    if (btn) select(btn.dataset.date);
  });

  // swipe left / right on the month to flip
  let startX = 0, startY = 0;
  monthEl.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  monthEl.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) flip(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ---- Go ------------------------------------------------------------ */
  renderMonth();
  renderDay();
  root.hidden = false;
})();
