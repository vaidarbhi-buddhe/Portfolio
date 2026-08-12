/**
 * Vaidarbhi Buddhe - Chemical Process Simulators Engine
 * Aspen Plus RGibbs Syngas-to-LPG Reactor Simulation (CSIR-IIP Dehradun)
 */

const ChemicalSimulators = {
  aspenState: {
    temp: 260,       // °C
    pressure: 40,    // bar
    ratio: 1.8,      // H2/CO feed ratio
    viewMode: 'yield' // 'yield' | 'breakdown' | 'stream'
  },

  init() {
    this.setupTabs();
    this.initAspenControls();
    this.renderAspenSimulation();
    window.addEventListener('resize', () => this.renderAspenSimulation());
  },

  setupTabs() {
    const tabBtns = document.querySelectorAll('.sim-tab-btn');
    const panes = document.querySelectorAll('.sim-content-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePane = document.getElementById(target);
        if (activePane) activePane.classList.add('active');

        if (target === 'aspen-sim-pane') {
          setTimeout(() => this.renderAspenSimulation(), 50);
        }
      });
    });
  },

  /* ------------------------------------------------------------------------
     Aspen Plus RGibbs Syngas-to-LPG Simulation
     ------------------------------------------------------------------------ */
  initAspenControls() {
    const tempSlider = document.getElementById('aspen-temp');
    const pressSlider = document.getElementById('aspen-press');
    const ratioSlider = document.getElementById('aspen-ratio');
    const ghsvSlider = document.getElementById('aspen-ghsv');

    const tempVal = document.getElementById('aspen-temp-val');
    const pressVal = document.getElementById('aspen-press-val');
    const ratioVal = document.getElementById('aspen-ratio-val');
    const ghsvVal = document.getElementById('aspen-ghsv-val');

    if (tempSlider && tempVal) {
      tempSlider.addEventListener('input', (e) => {
        this.aspenState.temp = parseFloat(e.target.value);
        tempVal.textContent = `${this.aspenState.temp} °C`;
        this.renderAspenSimulation();
      });
    }

    if (pressSlider && pressVal) {
      pressSlider.addEventListener('input', (e) => {
        this.aspenState.pressure = parseFloat(e.target.value);
        pressVal.textContent = `${this.aspenState.pressure} bar`;
        this.renderAspenSimulation();
      });
    }

    if (ratioSlider && ratioVal) {
      ratioSlider.addEventListener('input', (e) => {
        this.aspenState.ratio = parseFloat(e.target.value);
        ratioVal.textContent = `${this.aspenState.ratio.toFixed(2)} : 1`;
        this.renderAspenSimulation();
      });
    }

    if (ghsvSlider && ghsvVal) {
      ghsvSlider.addEventListener('input', (e) => {
        ghsvVal.textContent = `${parseInt(e.target.value).toLocaleString()} h⁻¹`;
      });
    }

    const viewToggles = document.querySelectorAll('.vis-toggle-btn');
    viewToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        viewToggles.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.aspenState.viewMode = btn.dataset.view;
        this.renderAspenSimulation();
      });
    });
  },

  calculateKinetics(T, P, R) {
    // T: 200 - 350 C, P: 20 - 60 bar, R: 1.0 - 3.5 (H2/CO)
    // Gibbs equilibrium model approximation for Syngas -> DME -> LPG (C3H8 + C4H10)
    const T_K = T + 273.15;
    
    // CO Conversion: Higher at higher P, lower at excessive T due to exothermicity
    let coConversion = (1 - Math.exp(-0.04 * (P - 10))) * (1 / (1 + Math.exp(0.03 * (T - 280)))) * 100;
    coConversion = Math.min(96, Math.max(35, coConversion * (0.8 + 0.12 * R)));

    // LPG Selectivity: Peaks in the optimum window around 260°C and 40 bar with CZZA catalyst
    const tempOptimum = Math.exp(-Math.pow(T - 262, 2) / (2 * 28 * 28));
    const pressFactor = Math.log10(P / 15) * 1.15;
    const ratioFactor = Math.exp(-Math.pow(R - 2.0, 2) / (2 * 0.8 * 0.8));

    let lpgSelectivity = (62 + 20 * tempOptimum * pressFactor * ratioFactor);
    lpgSelectivity = Math.min(84, Math.max(30, lpgSelectivity));

    // Methane (CH4) byproduct selectivity: Increases significantly at high T
    let ch4Selectivity = 6 + 28 * (1 / (1 + Math.exp(-0.05 * (T - 290))));
    
    // CO2 formation (Water-gas shift active over Cu-ZnO sites)
    let co2Selectivity = 10 + 6 * (R > 2 ? 1 : 0.6);

    // Other hydrocarbons (C2, C5+) and DME intermediate residuals
    let dmeSelectivity = Math.max(2, 100 - (lpgSelectivity + ch4Selectivity + co2Selectivity));

    const netLpgYield = (coConversion * lpgSelectivity) / 100;

    return {
      coConversion: coConversion.toFixed(1),
      lpgSelectivity: lpgSelectivity.toFixed(1),
      ch4Selectivity: ch4Selectivity.toFixed(1),
      co2Selectivity: co2Selectivity.toFixed(1),
      dmeSelectivity: dmeSelectivity.toFixed(1),
      netLpgYield: netLpgYield.toFixed(1),
      propaneFraction: (lpgSelectivity * 0.58).toFixed(1),
      butaneFraction: (lpgSelectivity * 0.42).toFixed(1)
    };
  },

  renderAspenSimulation() {
    const { temp, pressure, ratio, viewMode } = this.aspenState;
    const kinetics = this.calculateKinetics(temp, pressure, ratio);

    // Update Telemetry Displays
    const coConvEl = document.getElementById('telem-co-conv') || document.getElementById('telem-conversion');
    const lpgSelEl = document.getElementById('telem-selectivity');
    const lpgYieldEl = document.getElementById('telem-yield');

    if (coConvEl) coConvEl.textContent = `${kinetics.coConversion}%`;
    if (lpgSelEl) lpgSelEl.textContent = `${kinetics.lpgSelectivity}%`;
    if (lpgYieldEl) lpgYieldEl.textContent = `${kinetics.netLpgYield}%`;

    // Draw Visual Canvas
    const canvas = document.getElementById('aspen-chart-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    if (viewMode === 'yield') {
      this.drawYieldCurve(ctx, w, h, temp, pressure, ratio);
    } else if (viewMode === 'breakdown') {
      this.drawProductBreakdown(ctx, w, h, kinetics);
    } else if (viewMode === 'stream') {
      this.drawStreamTable(ctx, w, h, kinetics, temp, pressure);
    }
  },

  drawYieldCurve(ctx, w, h, curT, P, R) {
    const padL = 50, padR = 25, padT = 30, padB = 40;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1;

    for (let yPct = 0; yPct <= 100; yPct += 25) {
      const y = padT + chartH - (yPct / 100) * chartH;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + chartW, y);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`${yPct}%`, 10, y + 3);
    }

    // X Axis (Temperature 200 to 350 °C)
    for (let t = 200; t <= 350; t += 30) {
      const x = padL + ((t - 200) / 150) * chartW;
      ctx.fillText(`${t}°C`, x - 12, h - 12);
    }

    // Curve 1: LPG Selectivity vs Temperature
    ctx.beginPath();
    ctx.lineWidth = 2.8;
    ctx.strokeStyle = '#2dd4bf'; // Teal

    for (let px = 0; px <= chartW; px += 3) {
      const t = 200 + (px / chartW) * 150;
      const k = this.calculateKinetics(t, P, R);
      const y = padT + chartH - (parseFloat(k.lpgSelectivity) / 100) * chartH;

      if (px === 0) ctx.moveTo(padL + px, y);
      else ctx.lineTo(padL + px, y);
    }
    ctx.stroke();

    // Curve 2: Net LPG Yield
    ctx.beginPath();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#fbbf24'; // Amber
    ctx.setLineDash([4, 4]);

    for (let px = 0; px <= chartW; px += 3) {
      const t = 200 + (px / chartW) * 150;
      const k = this.calculateKinetics(t, P, R);
      const y = padT + chartH - (parseFloat(k.netLpgYield) / 100) * chartH;

      if (px === 0) ctx.moveTo(padL + px, y);
      else ctx.lineTo(padL + px, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Curve 3: CH4 (Methane) Formation
    ctx.beginPath();
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = '#f87171'; // Rose

    for (let px = 0; px <= chartW; px += 3) {
      const t = 200 + (px / chartW) * 150;
      const k = this.calculateKinetics(t, P, R);
      const y = padT + chartH - (parseFloat(k.ch4Selectivity) / 100) * chartH;

      if (px === 0) ctx.moveTo(padL + px, y);
      else ctx.lineTo(padL + px, y);
    }
    ctx.stroke();

    // Current Operating Point Indicator
    const curX = padL + ((curT - 200) / 150) * chartW;
    const curK = this.calculateKinetics(curT, P, R);
    const curY = padT + chartH - (parseFloat(curK.lpgSelectivity) / 100) * chartH;

    ctx.beginPath();
    ctx.arc(curX, curY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#2dd4bf';
    ctx.shadowColor = '#2dd4bf';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Label on pointer
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 10.5px "JetBrains Mono", monospace';
    ctx.fillText(`${curK.lpgSelectivity}% Selectivity`, curX - 45, curY - 14);
  },

  drawProductBreakdown(ctx, w, h, k) {
    const fractions = [
      { name: 'C3H8 (Propane)', pct: parseFloat(k.propaneFraction), color: '#2dd4bf' },
      { name: 'C4H10 (Butane)', pct: parseFloat(k.butaneFraction), color: '#38bdf8' },
      { name: 'CH4 (Methane)', pct: parseFloat(k.ch4Selectivity), color: '#f87171' },
      { name: 'CO2 (WGS)', pct: parseFloat(k.co2Selectivity), color: '#fbbf24' },
      { name: 'DME / Intermediates', pct: parseFloat(k.dmeSelectivity), color: '#c084fc' }
    ];

    const barH = 26;
    const startY = 35;
    const padL = 160;
    const maxBarW = w - padL - 60;

    fractions.forEach((item, idx) => {
      const y = startY + idx * (barH + 16);
      const barW = Math.max(4, (item.pct / 100) * maxBarW);

      // Label
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px "Inter", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(item.name, padL - 15, y + 17);

      // Bar Track
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(padL, y, maxBarW, barH);

      // Bar Fill
      ctx.fillStyle = item.color;
      ctx.fillRect(padL, y, barW, barH);

      // Value text
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10.5px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`${item.pct.toFixed(1)}%`, padL + barW + 10, y + 17);
    });
    ctx.textAlign = 'left';
  },

  drawStreamTable(ctx, w, h, k, T, P) {
    const rows = [
      ['Stream ID', 'Temp (°C)', 'Pres (bar)', 'Phase', 'Key Fraction'],
      ['S-101 (Syngas In)', '25.0', P.toFixed(1), 'Vapor', 'H2 + CO (2:1)'],
      ['S-102 (Reactor Out)', T.toFixed(1), P.toFixed(1), 'Vap + Liq', 'LPG + CH4 + CO2'],
      ['S-103 (LPG Product)', '45.0', '18.0', 'Liquid (C3/C4)', `${k.lpgSelectivity}% Selectivity`],
      ['S-104 (Offgas Recycle)', '35.0', (P - 2).toFixed(1), 'Vapor', 'Unreacted Syngas']
    ];

    const colW = (w - 60) / 5;
    const rowH = 34;

    rows.forEach((row, rIdx) => {
      const y = 40 + rIdx * rowH;

      ctx.fillStyle = rIdx === 0 ? 'rgba(45, 212, 191, 0.12)' : (rIdx % 2 === 0 ? 'rgba(255, 255, 255, 0.03)' : 'transparent');
      ctx.fillRect(20, y - 20, w - 40, rowH);

      row.forEach((cell, cIdx) => {
        ctx.fillStyle = rIdx === 0 ? '#2dd4bf' : (cIdx === 0 ? '#cbd5e1' : '#f8fafc');
        ctx.font = rIdx === 0 ? 'bold 11px "JetBrains Mono", monospace' : '10px "JetBrains Mono", monospace';
        ctx.fillText(cell, 30 + cIdx * colW, y);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ChemicalSimulators.init();
});
