/**
 * Vaidarbhi Buddhe - Analytical Lab Explorer
 * Gas Chromatography (GC) Chromatogram Simulator (CSIR-IIP & Petrochemical Analytics)
 */

const LabExplorer = {
  gcState: {
    running: false,
    progress: 0,
    carrierGas: 'Helium (He)',
    columnType: 'HP-PLOT Q Capillary (30m x 0.32mm x 20µm)',
    detector: 'Flame Ionization Detector (FID) & TCD'
  },

  init() {
    this.initGC();
  },

  /* ------------------------------------------------------------------------
     Gas Chromatography (GC) Simulator
     ------------------------------------------------------------------------ */
  initGC() {
    const injectBtn = document.getElementById('gc-inject-btn');
    if (injectBtn) {
      injectBtn.addEventListener('click', () => this.runGCSimulation());
    }
    this.drawGCChromatogram(1.0);
  },

  runGCSimulation() {
    if (this.gcState.running) return;
    this.gcState.running = true;
    this.gcState.progress = 0;

    const injectBtn = document.getElementById('gc-inject-btn');
    if (injectBtn) {
      injectBtn.disabled = true;
      injectBtn.innerHTML = `<span>Analyzing Sample...</span>`;
    }

    const startTime = performance.now();
    const duration = 2600; // ms

    const animateGC = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      this.gcState.progress = progress;
      this.drawGCChromatogram(progress);

      if (progress < 1.0) {
        requestAnimationFrame(animateGC);
      } else {
        this.gcState.running = false;
        if (injectBtn) {
          injectBtn.disabled = false;
          injectBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>Inject Sample</span>
          `;
        }
        if (window.showToast) window.showToast("GC Run Complete: Hydrocarbon product distribution resolved.");
      }
    };

    requestAnimationFrame(animateGC);
  },

  drawGCChromatogram(progress) {
    const canvas = document.getElementById('gc-chart-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padL = 45, padR = 25, padT = 25, padB = 35;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    ctx.clearRect(0, 0, w, h);

    // Baseline & Axis
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + chartH);
    ctx.lineTo(padL + chartW, padT + chartH);
    ctx.stroke();

    // Time ticks (0 to 10 min)
    ctx.fillStyle = '#64748b';
    ctx.font = '10px "JetBrains Mono", monospace';
    for (let t = 0; t <= 10; t += 2) {
      const x = padL + (t / 10) * chartW;
      ctx.fillText(`${t} min`, x - 12, h - 12);
    }

    // GC Peaks definitions (Retention time in min, Height %, Peak Width)
    const peaks = [
      { name: 'CO / N2 (Unreacted)', rt: 1.2, height: 0.32, width: 0.16, color: '#94a3b8' },
      { name: 'CH4 (Methane)', rt: 2.4, height: 0.48, width: 0.20, color: '#f87171' },
      { name: 'C2H6 (Ethane)', rt: 3.8, height: 0.26, width: 0.22, color: '#fbbf24' },
      { name: 'C3H8 (Propane)', rt: 5.6, height: 0.88, width: 0.28, color: '#2dd4bf' },
      { name: 'C4H10 (Butane)', rt: 7.4, height: 0.74, width: 0.32, color: '#38bdf8' },
      { name: 'DME / Alcohols', rt: 8.8, height: 0.20, width: 0.38, color: '#c084fc' }
    ];

    // Draw chromatogram line
    ctx.beginPath();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#2dd4bf';

    const maxTime = 10 * progress;

    for (let px = 0; px <= chartW * progress; px += 2) {
      const t = (px / chartW) * 10;
      let signal = 0;

      peaks.forEach(p => {
        const dt = t - p.rt;
        signal += p.height * Math.exp(- (dt * dt) / (2 * p.width * p.width));
      });

      // Subtle baseline noise
      const noise = (Math.sin(px * 1.5) + Math.cos(px * 0.8)) * 0.005;
      const y = padT + chartH - (signal + noise) * chartH;

      if (px === 0) ctx.moveTo(padL + px, y);
      else ctx.lineTo(padL + px, y);
    }
    ctx.stroke();

    // Peak labels for fully eluted peaks
    peaks.forEach(p => {
      if (p.rt <= maxTime) {
        const px = padL + (p.rt / 10) * chartW;
        const py = padT + chartH - p.height * chartH;

        ctx.fillStyle = p.color;
        ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(p.name.split(' ')[0], px, py - 6);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  LabExplorer.init();
});
