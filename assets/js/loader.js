/**
 * Chemical Reaction Preloader Engine
 * Simulates Syngas-to-LPG Catalytic Conversion Kinetics on Portfolio Launch
 */

(function() {
  const loader = document.getElementById('chemical-reaction-loader');
  if (!loader) return;

  const pipeFill = document.getElementById('rxn-pipe-fill');
  const pctText = document.getElementById('rxn-pct-val');
  const statusText = document.getElementById('rxn-status-text');
  const fluidPath = document.getElementById('rxn-fluid-surface');
  const skipBtn = document.getElementById('rxn-skip-btn');

  const STAGES = [
    { threshold: 0,  text: "Initializing Syngas Reactor Feed (H₂/CO = 2.0)...", color: "#06b6d4" },
    { threshold: 22, text: "Preheating CZZA Catalytic Bed to 260°C @ 40 bar...", color: "#0ea5e9" },
    { threshold: 48, text: "Exothermic Synthesis: CO + 2H₂ ⇄ CH₃OH ➔ DME...", color: "#14b8a6" },
    { threshold: 74, text: "Catalytic Dehydration to LPG (C₃H₈ + C₄H₁₀) • GC 71.8%...", color: "#2dd4bf" },
    { threshold: 92, text: "Thermodynamic Equilibrium Reached • Launching Portfolio...", color: "#f59e0b" }
  ];

  let currentPct = 0;
  let targetPct = 100;
  let isDone = false;
  const DURATION = 1650; // Total duration in ms
  const startTime = performance.now();

  function updateStageText(pct) {
    if (!statusText) return;
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (pct >= STAGES[i].threshold) {
        statusText.textContent = STAGES[i].text;
        if (fluidPath && STAGES[i].color) {
          fluidPath.setAttribute('fill', STAGES[i].color);
        }
        break;
      }
    }
  }

  function frame(now) {
    if (isDone) return;
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / DURATION);

    // Smooth cubic easing
    const eased = progress < 0.5 
      ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    currentPct = Math.round(eased * targetPct);

    if (pipeFill) pipeFill.style.width = `${currentPct}%`;
    if (pctText) pctText.textContent = `${currentPct}%`;
    updateStageText(currentPct);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      finishLoading();
    }
  }

  function finishLoading() {
    if (isDone) return;
    isDone = true;

    if (pipeFill) pipeFill.style.width = '100%';
    if (pctText) pctText.textContent = '100%';
    if (statusText) statusText.textContent = 'Catalytic Equilibrium Verified • Welcome to Portfolio!';

    setTimeout(() => {
      loader.classList.add('loader-hidden');
      document.body.classList.remove('loading-lock');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 700);
    }, 280);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      finishLoading();
    });
  }

  // Safety failsafe: never block page longer than 2.8s
  setTimeout(finishLoading, 2800);

  // Start animation loop
  requestAnimationFrame(frame);
})();
