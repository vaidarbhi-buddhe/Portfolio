/**
 * Vaidarbhi Buddhe - Analytical Lab Explorer
 * 1. Gas Chromatography (GC) Chromatogram Simulator (CSIR-IIP & Petrochem)
 * 2. Karl Fischer Titration & Moisture Determination (Clarion Organics QA)
 */

const LabExplorer = {
  gcState: {
    running: false,
    progress: 0,
    carrierGas: 'Helium',
    columnType: 'HP-PLOT Q Capillary (30m x 0.32mm)'
  },

  kfState: {
    sampleWeight: 1.25, // grams
    titrantVolume: 3.42, // mL
    factor: 5.02, // mg H2O / mL KF Reagent
    titrating: false
  },

  init() {
    this.initGC();
    this.initKF();
  },

  /* ------------------------------------------------------------------------
     1. Gas Chromatography (GC) Simulator
     ------------------------------------------------------------------------ */
  initGC() {
    const injectBtn = document.getElementById('gc-inject-btn');
    if (injectBtn) {
      injectBtn.addEventListener('click', () => this.runGCSimulation());
    }
    this.drawGCChromatogram(1.0); // static initial draw
  },

  runGCSimulation() {
    if (this.gcState.running) return;
    this.gcState.running = true;
    this.gcState.progress = 0;

    const injectBtn = document.getElementById('gc-inject-btn');
    if (injectBtn) injectBtn.disabled = true;

    const startTime = performance.now();
    const duration = 2800; // ms

    const animateGC = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      this.gcState.progress = progress;
      this.drawGCChromatogram(progress);

      if (progress < 1.0) {
        requestAnimationFrame(animateGC);
      } else {
        this.gcState.running = false;
        if (injectBtn) injectBtn.disabled = false;
        if (window.showToast) window.showToast("GC Run Complete: Hydrocarbon peaks resolved with 99.4% precision.");
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
    const padL = 40, padR = 20, padT = 20, padB = 30;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    ctx.clearRect(0, 0, w, h);

    // Baseline & Axis
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + chartH);
    ctx.lineTo(padL + chartW, padT + chartH);
    ctx.stroke();

    // Time ticks (0 to 10 min)
    ctx.fillStyle = '#64748b';
    ctx.font = '9px "JetBrains Mono", monospace';
    for (let t = 0; t <= 10; t += 2) {
      const x = padL + (t / 10) * chartW;
      ctx.fillText(`${t}m`, x - 6, h - 10);
    }

    // GC Peaks definitions (Retention time in min, Height %, Peak Width)
    const peaks = [
      { name: 'CO / N2', rt: 1.2, height: 0.35, width: 0.18, color: '#94a3b8' },
      { name: 'CH4 (Methane)', rt: 2.4, height: 0.52, width: 0.22, color: '#f43f5e' },
      { name: 'C2H6 (Ethane)', rt: 3.8, height: 0.28, width: 0.25, color: '#fbbf24' },
      { name: 'C3H8 (Propane)', rt: 5.6, height: 0.88, width: 0.32, color: '#14b8a6' },
      { name: 'C4H10 (Iso/N-Butane)', rt: 7.4, height: 0.72, width: 0.38, color: '#06b6d4' },
      { name: 'DME / Intermediates', rt: 8.8, height: 0.22, width: 0.45, color: '#a855f7' }
    ];

    // Draw chromatogram line
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#14b8a6';

    const maxTime = 10 * progress;

    for (let px = 0; px <= chartW * progress; px += 2) {
      const t = (px / chartW) * 10;
      let signal = 0;

      peaks.forEach(p => {
        const dt = t - p.rt;
        signal += p.height * Math.exp(- (dt * dt) / (2 * p.width * p.width));
      });

      // Subtle detector noise
      const noise = (Math.sin(px * 1.5) + Math.cos(px * 0.8)) * 0.008;
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
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(p.name.split(' ')[0], px, py - 6);
      }
    });
  },

  /* ------------------------------------------------------------------------
     2. Karl Fischer (KF) Titration Simulator
     ------------------------------------------------------------------------ */
  initKF() {
    const kfBtn = document.getElementById('kf-titrate-btn');
    const sampleInput = document.getElementById('kf-sample-weight');

    if (kfBtn) {
      kfBtn.addEventListener('click', () => this.runKFTitration());
    }

    if (sampleInput) {
      sampleInput.addEventListener('input', (e) => {
        this.kfState.sampleWeight = parseFloat(e.target.value) || 1.0;
        this.updateKFOutputs();
      });
    }

    this.drawKFCurve(1.0);
    this.updateKFOutputs();
  },

  runKFTitration() {
    if (this.kfState.titrating) return;
    this.kfState.titrating = true;

    const btn = document.getElementById('kf-titrate-btn');
    if (btn) btn.disabled = true;

    const startTime = performance.now();
    const duration = 2400; // ms

    const animateKF = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      this.drawKFCurve(progress);

      if (progress < 1.0) {
        requestAnimationFrame(animateKF);
      } else {
        this.kfState.titrating = false;
        if (btn) btn.disabled = false;
        this.updateKFOutputs();
        if (window.showToast) window.showToast("Karl Fischer Endpoint Reached: Precise moisture factor determined.");
      }
    };

    requestAnimationFrame(animateKF);
  },

  updateKFOutputs() {
    const { sampleWeight, titrantVolume, factor } = this.kfState;
    // Formula: Moisture (%) = (V * F * 100) / (W_sample in mg)
    const waterWeightMg = titrantVolume * factor;
    const sampleWeightMg = sampleWeight * 1000;
    const moisturePct = (waterWeightMg / sampleWeightMg) * 100;
    const moisturePPM = moisturePct * 10000;

    const ppmEl = document.getElementById('kf-ppm-out');
    const pctEl = document.getElementById('kf-pct-out');
    const volEl = document.getElementById('kf-vol-out');

    if (ppmEl) ppmEl.textContent = `${moisturePPM.toFixed(0)} ppm`;
    if (pctEl) pctEl.textContent = `${moisturePct.toFixed(3)} %`;
    if (volEl) volEl.textContent = `${titrantVolume.toFixed(2)} mL`;
  },

  drawKFCurve(progress) {
    const canvas = document.getElementById('kf-chart-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padL = 45, padR = 20, padT = 20, padB = 30;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + chartH);
    ctx.lineTo(padL + chartW, padT + chartH);
    ctx.stroke();

    // Volume X Axis
    ctx.fillStyle = '#64748b';
    ctx.font = '9px "JetBrains Mono", monospace';
    for (let v = 0; v <= 5; v += 1) {
      const x = padL + (v / 5) * chartW;
      ctx.fillText(`${v}mL`, x - 8, h - 10);
    }

    // Sigmoidal Titration Potential Curve
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#fbbf24';

    const endPointVol = 3.42;

    for (let px = 0; px <= chartW * progress; px += 2) {
      const v = (px / chartW) * 5;
      // Sigmoid function for electrochemical potential drop at endpoint
      const sigmoid = 1 / (1 + Math.exp((v - endPointVol) * 4.5));
      const y = padT + 20 + sigmoid * (chartH - 40);

      if (px === 0) ctx.moveTo(padL + px, y);
      else ctx.lineTo(padL + px, y);
    }
    ctx.stroke();

    // Endpoint Marker
    if (progress >= 0.75) {
      const epX = padL + (endPointVol / 5) * chartW;
      const epY = padT + chartH / 2;

      ctx.beginPath();
      ctx.arc(epX, epY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillText('Endpoint (3.42 mL)', epX + 10, epY);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  LabExplorer.init();
});
