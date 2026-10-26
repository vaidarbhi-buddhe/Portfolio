/**
 * Interactive Chemical Synthesis Laboratory & Reactor Preloader
 * Allows interactive reagent injection, catalytic stirring, and kinetic observation
 */

(function() {
  const loader = document.getElementById('chemical-reaction-loader');
  if (!loader) return;

  const pipeFill = document.getElementById('rxn-pipe-fill');
  const pctText = document.getElementById('rxn-pct-val');
  const tempText = document.getElementById('gauge-temp-val');
  const pressText = document.getElementById('gauge-press-val');
  const statusText = document.getElementById('rxn-status-text');
  const fluidPath = document.getElementById('rxn-fluid-surface');
  const skipBtn = document.getElementById('rxn-skip-btn');
  const igniteBtn = document.getElementById('rxn-ignite-btn');
  const canvas = document.getElementById('rxn-click-canvas');
  const flaskWrapper = document.getElementById('rxn-flask-wrapper');

  // Reagent buttons
  const btnSyngas = document.getElementById('reagent-syngas');
  const btnHeat = document.getElementById('reagent-heat');
  const btnCatalyst = document.getElementById('reagent-catalyst');

  let currentPct = 0;
  let targetPct = 100;
  let currentTemp = 25;
  let currentPress = 1.0;
  let isDone = false;
  let speedMultiplier = 1;

  // Slower baseline pacing (~4.5s) to let users interact, but clicking reagents speeds it up
  const BASE_DURATION = 4200; 
  let elapsed = 0;
  let lastTime = performance.now();

  const STAGES = [
    { threshold: 0,  text: "Phase 1: Charging Syngas Reactor Feed (H₂/CO = 2.0)...", color: "#06b6d4", temp: 45, press: 8 },
    { threshold: 22, text: "Phase 2: Preheating Quaternary CZZA Catalyst to 260°C @ 40 bar...", color: "#0ea5e9", temp: 160, press: 24 },
    { threshold: 50, text: "Phase 3: Catalytic Conversion: CO + 2H₂ ⇄ CH₃OH ➔ DME...", color: "#14b8a6", temp: 245, press: 38 },
    { threshold: 75, text: "Phase 4: Selective Dehydration to LPG (C₃H₈ + C₄H₁₀) • GC 71.8%...", color: "#2dd4bf", temp: 260, press: 40 },
    { threshold: 92, text: "Phase 5: Thermodynamic Equilibrium Verified (27 Steps) • Entering Portfolio...", color: "#f59e0b", temp: 260, press: 40 }
  ];

  /* ------------------------------------------------------------------------
     1. Interactive Spark & Bubble Particle Canvas
     ------------------------------------------------------------------------ */
  let sparks = [];
  let ctx = null;
  if (canvas) {
    ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  function spawnSparks(x, y, color = '#2dd4bf', count = 14) {
    if (!ctx) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      sparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        radius: 2 + Math.random() * 3.5,
        color: color,
        alpha: 1,
        life: 0.95
      });
    }
  }

  function updateSparks() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // subtle gravity / drag
      p.alpha *= p.life;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (p.alpha < 0.04) {
        sparks.splice(i, 1);
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ------------------------------------------------------------------------
     2. Stage & Telemetry Updates
     ------------------------------------------------------------------------ */
  function updateTelemetry(pct) {
    if (pipeFill) pipeFill.style.width = `${pct}%`;
    if (pctText) pctText.textContent = `${pct}%`;

    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (pct >= STAGES[i].threshold) {
        if (statusText && statusText.textContent !== STAGES[i].text) {
          statusText.textContent = STAGES[i].text;
        }
        if (fluidPath && STAGES[i].color) {
          fluidPath.setAttribute('fill', STAGES[i].color);
        }

        // Interpolate Temp & Pressure toward stage targets
        const targetTemp = STAGES[i].temp;
        const targetPress = STAGES[i].press;
        currentTemp += (targetTemp - currentTemp) * 0.12;
        currentPress += (targetPress - currentPress) * 0.12;
        break;
      }
    }

    if (tempText) tempText.textContent = `${Math.round(currentTemp)} °C`;
    if (pressText) pressText.textContent = `${currentPress.toFixed(1)} bar`;
  }

  /* ------------------------------------------------------------------------
     3. Animation Frame Loop
     ------------------------------------------------------------------------ */
  function frame(now) {
    if (isDone) return;
    const dt = now - lastTime;
    lastTime = now;

    elapsed += dt * speedMultiplier;
    const progress = Math.min(1, elapsed / BASE_DURATION);

    // Smooth easeInOutQuad progress
    const eased = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    currentPct = Math.round(eased * targetPct);
    updateTelemetry(currentPct);
    updateSparks();

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      finishLoading();
    }
  }

  function finishLoading() {
    if (isDone) return;
    isDone = true;

    updateTelemetry(100);
    if (statusText) statusText.textContent = 'Catalytic Equilibrium Verified (100%) • Entering Portfolio!';
    if (tempText) tempText.textContent = '260 °C';
    if (pressText) pressText.textContent = '40.0 bar';

    setTimeout(() => {
      loader.classList.add('loader-hidden');
      document.body.classList.remove('loading-lock');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 800);
    }, 500);
  }

  /* ------------------------------------------------------------------------
     4. User Interactivity: Click Reagents, Click Flask, Click Anywhere
     ------------------------------------------------------------------------ */
  function addInteractiveBoost(boostPct, sparkColor, x, y) {
    elapsed += (boostPct / 100) * BASE_DURATION;
    spawnSparks(x || window.innerWidth / 2, y || window.innerHeight / 2, sparkColor, 20);
  }

  if (btnSyngas) {
    btnSyngas.addEventListener('click', (e) => {
      e.stopPropagation();
      btnSyngas.classList.add('btn-active');
      setTimeout(() => btnSyngas.classList.remove('btn-active'), 400);
      addInteractiveBoost(16, '#38bdf8', e.clientX, e.clientY);
      if (statusText) statusText.textContent = '⚡ Syngas Reagents Injected! [CO + 2H₂ Active]';
    });
  }

  if (btnHeat) {
    btnHeat.addEventListener('click', (e) => {
      e.stopPropagation();
      btnHeat.classList.add('btn-active');
      setTimeout(() => btnHeat.classList.remove('btn-active'), 400);
      currentTemp = Math.min(260, currentTemp + 45);
      currentPress = Math.min(40, currentPress + 7.5);
      addInteractiveBoost(18, '#fbbf24', e.clientX, e.clientY);
      if (statusText) statusText.textContent = '🔥 Reactor Heated to Synthesis Window (260°C, 40 bar)!';
    });
  }

  if (btnCatalyst) {
    btnCatalyst.addEventListener('click', (e) => {
      e.stopPropagation();
      btnCatalyst.classList.add('btn-active');
      setTimeout(() => btnCatalyst.classList.remove('btn-active'), 400);
      addInteractiveBoost(22, '#2dd4bf', e.clientX, e.clientY);
      if (statusText) statusText.textContent = '✨ CZZA Quaternary Catalytic Sites Activated!';
    });
  }

  if (flaskWrapper) {
    flaskWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      addInteractiveBoost(12, '#34d399', e.clientX, e.clientY);
    });
  }

  // Clicking anywhere on the backdrop spawns reaction bubbles/sparks and advances reaction
  loader.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    addInteractiveBoost(8, '#2dd4bf', e.clientX, e.clientY);
  });

  if (igniteBtn) {
    igniteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      speedMultiplier = 4;
      spawnSparks(window.innerWidth / 2, window.innerHeight / 2, '#fbbf24', 35);
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      finishLoading();
    });
  }

  // Safety failsafe
  setTimeout(finishLoading, 6000);

  // Start animation loop
  requestAnimationFrame(frame);
})();
