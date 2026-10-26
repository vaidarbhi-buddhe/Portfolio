/**
 * Chemical Reaction Preloader Engine
 * Simulates Syngas-to-LPG Catalytic Conversion Kinetics on Portfolio Launch
 * Measured pacing for authentic process reaction observation
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
    { threshold: 0,  text: "Phase 1: Charging Syngas Reactor Feed (H₂/CO = 2.0)...", color: "#06b6d4" },
    { threshold: 22, text: "Phase 2: Preheating Quaternary CZZA Catalyst to 260°C @ 40 bar...", color: "#0ea5e9" },
    { threshold: 48, text: "Phase 3: Catalytic Conversion: CO + 2H₂ ⇄ CH₃OH ➔ DME...", color: "#14b8a6" },
    { threshold: 72, text: "Phase 4: Selective Dehydration to LPG (C₃H₈ + C₄H₁₀) • GC 71.8%...", color: "#2dd4bf" },
    { threshold: 92, text: "Phase 5: Thermodynamic Equilibrium Verified (27 Steps) • Entering Portfolio...", color: "#f59e0b" }
  ];

  let currentPct = 0;
  let targetPct = 100;
  let isDone = false;
  // Slower, measured pacing (~3.4 seconds) to let visitors comfortably read and observe
  const DURATION = 3400; 
  const startTime = performance.now();

  function updateStageText(pct) {
    if (!statusText) return;
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (pct >= STAGES[i].threshold) {
        if (statusText.textContent !== STAGES[i].text) {
          statusText.textContent = STAGES[i].text;
        }
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

    // Smooth easeInOutQuad easing for continuous natural reaction speed
    const eased = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

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
    if (statusText) statusText.textContent = 'Catalytic Equilibrium Verified (100%) • Welcome to Portfolio!';

    // Hold at 100% for 450ms so user clearly registers the completion
    setTimeout(() => {
      loader.classList.add('loader-hidden');
      document.body.classList.remove('loading-lock');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 800);
    }, 450);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      finishLoading();
    });
  }

  // Safety failsafe: never block page longer than 4.5s
  setTimeout(finishLoading, 4500);

  // Start animation loop
  requestAnimationFrame(frame);
})();
