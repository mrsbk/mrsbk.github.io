/**
 * auth.js — Simple password gate for GitHub Pages
 *
 * HOW TO SET YOUR PASSWORD:
 *   Change the value of PASSWORD below to whatever you want.
 *   The password is stored as a plain string here.
 *   This protects against casual browsing — it is not
 *   cryptographic security, but it is appropriate for a
 *   family/school project that isn't broadcasting sensitive data.
 *
 * IMPORTANT: Do not put personal addresses or sensitive info
 * on the site regardless of the password protection.
 */

(function () {
  // ---- SET YOUR PASSWORD HERE ----
  const PASSWORD = "sunshine2024";
  // --------------------------------

  const SESSION_KEY = "wx_auth";
  const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

  function isAuthenticated() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const { expiry } = JSON.parse(raw);
      return Date.now() < expiry;
    } catch {
      return false;
    }
  }

  function setAuthenticated() {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ expiry: Date.now() + SESSION_TTL })
    );
  }

  function showGate() {
    const overlay = document.createElement("div");
    overlay.id = "auth-overlay";
    overlay.innerHTML = `
      <div id="auth-box">
        <h2>&#9729; Weather Station</h2>
        <p>This site is password protected.<br>Enter the password to continue.</p>
        <input type="password" id="auth-input" placeholder="Password" autocomplete="current-password" />
        <button id="auth-submit">Enter</button>
        <div id="auth-error">Incorrect password. Try again.</div>
      </div>
    `;
    document.body.prepend(overlay);

    const input = document.getElementById("auth-input");
    const btn = document.getElementById("auth-submit");
    const err = document.getElementById("auth-error");

    function attempt() {
      if (input.value === PASSWORD) {
        setAuthenticated();
        overlay.remove();
      } else {
        err.style.display = "block";
        input.value = "";
        input.focus();
      }
    }

    btn.addEventListener("click", attempt);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") attempt();
    });

    input.focus();
  }

  // Run on page load
  if (!isAuthenticated()) {
    showGate();
  }
})();
