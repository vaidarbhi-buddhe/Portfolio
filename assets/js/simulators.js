/**
 * Vaidarbhi Buddhe - Chemical Process Simulators Engine
 * 1. Aspen Plus RGibbs Syngas-to-LPG Reactor Simulation (CSIR-IIP Dehradun)
 * 2. Industrial Heat Loss & Insulation Upgrade Calculator (Indorama Synthetics)
 */

const ChemicalSimulators = {
  // State for Aspen Syngas Simulator
  aspenState: {
    temp: 260,       // °C
    pressure: 40,    // bar
    ratio: 1.8,      // H2/CO feed ratio
    viewMode: 'yield' // 'yield' | 'breakdown' | 'stream'
  },

  // State for Heat Loss Calculator
  heatLossState: {
    material: 'calcium-silicate', // 'bare' | 'mineral-wool' | 'calcium-silicate'
    pipeLength: 120,              // meters
    pipeDiameter: 150,            // mm
    fluidTemp: 285,               // °C (CF-HTM thermal oil)
    ambientTemp: 30               // °C
  },

  init() {
    this.setupTabs();
    this.initAspenControls();
    this.initHeatLossControls();
    this.renderAspenSimulation();
    this.renderHeatLossCalculation();
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
     1. Aspen Plus RGibbs Syngas-to-LPG Simulation
     ------------------------------------------------------------------------ */
  initAspenControls() {
    const tempSlider = document.getElementById('aspen-temp');
    const pressSlider = document.getElementById('aspen-press');
    const ratioSlider = document.getElementById('aspen-ratio');

    const tempVal = document.getElementById('aspen-temp-val');
    const pressVal = document.getElementById('aspen-press-val');
    const ratioVal = document.getElementById('aspen-ratio-val');

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
        ratioVal.textContent = `${this.aspenState.ratio.toFixed(1)} : 1`;
        this.renderAspenSimulation();
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

  calculateAspenThermodynamics() {
    const { temp, pressure, ratio } = this.aspenState;

    // Thermodynamic Modeling of Syngas to LPG over CZZA Catalyst
    // Peak LPG selectivity occurs around T=260-275°C, P=35-50 bar, H2/CO = 1.5-2.0
    const tOpt = 265;
    const tDiff = temp - tOpt;
    const tempSelectivityFactor = Math.exp(-(tDiff * tDiff) / 2200);

    const pressFactor = Math.min(1.0, 0.45 + (pressure / 60) * 0.55);
    const ratioFactor = Math.exp(-Math.pow(ratio - 1.8, 2) / 1.8);

    // CO Conversion (%)
    const baseConversion = 45 + (temp - 200) * 0.32 + (pressure - 20) * 0.45 + (ratio - 0.5) * 6;
    const coConversion = Math.min(96.5, Math.max(38.0, baseConversion));

    // LPG Selectivity (C3 + C4 %)
    const lpgSelectivity = Math.min(84.5, Math.max(18.0, (68 * tempSelectivityFactor * pressFactor * ratioFactor) + 12));

    // Byproduct distribution
    const ch4Selectivity = Math.min(45, Math.max(4.0, (temp > 280 ? (temp - 280) * 0.4 : 6) + (ratio > 2.0 ? (ratio - 2.0) * 8 : 0)));
    const dmeMethanolSelectivity = Math.max(2.0, 100 - lpgSelectivity - ch4Selectivity - 14);
    const co2Selectivity = Math.max(8.0, 100 - lpgSelectivity - ch4Selectivity - dmeMethanolSelectivity);

    // LPG Yield = (CO Conversion * LPG Selectivity) / 100
    const lpgYield = (coConversion * lpgSelectivity) / 100;
    const propaneFraction = 0.58;
    const butaneFraction = 0.42;

    return {
      coConversion: coConversion.toFixed(1),
      lpgSelectivity: lpgSelectivity.toFixed(1),
      lpgYield: lpgYield.toFixed(1),
      propaneYield: (lpgYield * propaneFraction).toFixed(1),
      butaneYield: (lpgYield * butaneFraction).toFixed(1),
      ch4Yield: ((coConversion * ch4Selectivity) / 100).toFixed(1),
      dmeYield: ((coConversion * dmeMethanolSelectivity) / 100).toFixed(1),
      co2Yield: ((coConversion * co2Selectivity) / 100).toFixed(1)
    };
  },

  renderAspenSimulation() {
    const results = this.calculateAspenThermodynamics();

    // Update Telemetry Displays
    const telemConv = document.getElementById('telem-conversion');
    const telemSelect = document.getElementById('telem-selectivity');
    const telemYield = document.getElementById('telem-yield');
    const telemPhase = document.getElementById('telem-phase');

    if (telemConv) telemConv.textContent = `${results.coConversion}%`;
    if (telemSelect) telemSelect.textContent = `${results.lpgSelectivity}%`;
    if (telemYield) telemYield.textContent = `${results.lpgYield}%`;
    if (telemPhase) telemPhase.textContent = this.aspenState.temp < 240 ? 'Gas-Liquid Mix' : 'Vapor Phase';

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

    if (this.aspenState.viewMode === 'yield') {
      this.drawYieldCurve(ctx, w, h, results);
    } else if (this.aspenState.viewMode === 'breakdown') {
      this.drawProductBreakdown(ctx, w, h, results);
    } else {
      this.drawStreamTable(ctx, w, h, results);
    }
  },

  drawYieldCurve(ctx, w, h, results) {
    const padL = 55, padR = 25, padT = 30, padB = 45;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    // Grid lines & Axis
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const y = padT + (chartH / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${100 - i * 20}%`, padL - 10, y + 3);
    }

    // X Axis Labels (Temp 200 to 350°C)
    const temps = [200, 230, 260, 290, 320, 350];
    temps.forEach((t, i) => {
      const x = padL + (chartW / (temps.length - 1)) * i;
      ctx.fillText(`${t}°C`, x, h - padB + 18);
    });

    // Draw Thermodynamic Curve (LPG Selectivity vs Temperature)
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#14b8a6';

    const pFact = Math.min(1.0, 0.45 + (this.aspenState.pressure / 60) * 0.55);
    const rFact = Math.exp(-Math.pow(this.aspenState.ratio - 1.8, 2) / 1.8);

    for (let xPix = 0; xPix <= chartW; xPix += 2) {
      const tempVal = 200 + (xPix / chartW) * 150;
      const tDiff = tempVal - 265;
      const selectVal = Math.min(84.5, (68 * Math.exp(-(tDiff * tDiff) / 2200) * pFact * rFact) + 12);
      const yPix = padT + chartH - (selectVal / 100) * chartH;

      if (xPix === 0) ctx.moveTo(padL + xPix, yPix);
      else ctx.lineTo(padL + xPix, yPix);
    }
    ctx.stroke();

    // Fill gradient under curve
    ctx.lineTo(padL + chartW, padT + chartH);
    ctx.lineTo(padL, padT + chartH);
    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, 'rgba(20, 184, 166, 0.25)');
    grad.addColorStop(1, 'rgba(20, 184, 166, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Current State Operating Point Indicator
    const currX = padL + ((this.aspenState.temp - 200) / 150) * chartW;
    const currY = padT + chartH - (parseFloat(results.lpgSelectivity) / 100) * chartH;

    // Glowing Pulse Dot at current operating coordinate
    ctx.beginPath();
    ctx.arc(currX, currY, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Annotation
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`LPG ${results.lpgSelectivity}% @ ${this.aspenState.temp}°C`, currX, currY - 14);
  },

  drawProductBreakdown(ctx, w, h, results) {
    const padL = 60, padR = 30, padT = 35, padB = 40;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    const products = [
      { name: 'C3H8 (Propane)', val: parseFloat(results.propaneYield), color: '#14b8a6' },
      { name: 'C4H10 (Butane)', val: parseFloat(results.butaneYield), color: '#06b6d4' },
      { name: 'CH4 (Methane)', val: parseFloat(results.ch4Yield), color: '#f43f5e' },
      { name: 'DME / MeOH', val: parseFloat(results.dmeYield), color: '#fbbf24' },
      { name: 'CO2 (WGS)', val: parseFloat(results.co2Yield), color: '#a855f7' }
    ];

    const barWidth = chartW / (products.length * 1.8);
    const gap = (chartW - (barWidth * products.length)) / (products.length + 1);

    products.forEach((p, idx) => {
      const x = padL + gap + idx * (barWidth + gap);
      const barH = (p.val / 60) * chartH;
      const y = padT + chartH - barH;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
      ctx.fill();

      // Value label on top
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${p.val}%`, x + barWidth / 2, y - 6);

      // Name label on bottom
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText(p.name.split(' ')[0], x + barWidth / 2, h - padB + 16);
    });
  },

  drawStreamTable(ctx, w, h, results) {
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 12px "Space Grotesk", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Aspen Plus (RGibbs) 27-Reaction Stream Synthesis Balance', 25, 30);

    const rows = [
      ['Stream Name', 'FEED-SYNGAS', 'REACTOR-OUT', 'LPG-FRACTION'],
      ['Temperature (°C)', '25.0', `${this.aspenState.temp}.0`, '42.5'],
      ['Pressure (bar)', `${this.aspenState.pressure}.0`, `${(this.aspenState.pressure - 0.8).toFixed(1)}`, '12.0'],
      ['H2 / CO Ratio', `${this.aspenState.ratio.toFixed(2)}`, '0.34 (Consumed)', '0.00'],
      ['CO Conversion', '0.0%', `${results.coConversion}%`, '100% Recycled'],
      ['Total LPG Yield', '0.0 kmol/h', `${results.lpgYield} mol%`, `${(parseFloat(results.lpgYield) * 1.42).toFixed(2)} MT/day`]
    ];

    const startY = 65;
    const rowH = 34;
    const colW = (w - 50) / 4;

    rows.forEach((row, rIdx) => {
      const y = startY + rIdx * rowH;
      ctx.fillStyle = rIdx === 0 ? 'rgba(20, 184, 166, 0.15)' : (rIdx % 2 === 0 ? 'rgba(255, 255, 255, 0.03)' : 'transparent');
      ctx.fillRect(20, y - 20, w - 40, rowH);

      row.forEach((cell, cIdx) => {
        ctx.fillStyle = rIdx === 0 ? '#14b8a6' : (cIdx === 0 ? '#cbd5e1' : '#f8fafc');
        ctx.font = rIdx === 0 ? 'bold 11px "JetBrains Mono", monospace' : '10px "JetBrains Mono", monospace';
        ctx.fillText(cell, 30 + cIdx * colW, y);
      });
    });
  },

  /* ------------------------------------------------------------------------
     2. Indorama Synthetics CF-HTM Heat Loss Calculator
     ------------------------------------------------------------------------ */
  initHeatLossControls() {
    const matBtns = document.querySelectorAll('.mat-option-btn');
    matBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        matBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.heatLossState.material = btn.dataset.material;
        this.renderHeatLossCalculation();
      });
    });

    const lengthInput = document.getElementById('calc-length');
    const tempInput = document.getElementById('calc-fluid-temp');

    if (lengthInput) {
      lengthInput.addEventListener('input', (e) => {
        this.heatLossState.pipeLength = parseFloat(e.target.value) || 100;
        this.renderHeatLossCalculation();
      });
    }

    if (tempInput) {
      tempInput.addEventListener('input', (e) => {
        this.heatLossState.fluidTemp = parseFloat(e.target.value) || 280;
        this.renderHeatLossCalculation();
      });
    }
  },

  renderHeatLossCalculation() {
    const { material, pipeLength, fluidTemp, ambientTemp } = this.heatLossState;

    // Thermal properties & heat loss simulation (CF-HTM piping)
    let k_ins = 0.045; // W/m.K
    let deltaSurface = 6.2; // °C above ambient
    let heatLossPerMeter = 42; // W/m
    let label = 'Mineral Wool Baseline';

    if (material === 'bare') {
      k_ins = 50.0;
      deltaSurface = fluidTemp - ambientTemp - 15;
      heatLossPerMeter = 480;
      label = 'Uninsulated Bare Pipe';
    } else if (material === 'calcium-silicate') {
      // Indorama Synthetics Upgrade: Reduced surface temp to 3°C above ambient, 50% heat loss reduction
      k_ins = 0.038;
      deltaSurface = 3.1; // 3°C above ambient
      heatLossPerMeter = 21; // 50% reduction vs Mineral wool
      label = 'Calcium Silicate Upgrade';
    }

    const totalHeatLossKW = (heatLossPerMeter * pipeLength) / 1000;
    const baselineMineralWoolKW = (42 * pipeLength) / 1000;

    // Savings relative to mineral wool baseline
    const powerSavedKW = Math.max(0, baselineMineralWoolKW - totalHeatLossKW);
    const annualHours = 8400; // Plant operating hours
    const energySavedMWh = (powerSavedKW * annualHours) / 1000;
    const co2ReductionTons = energySavedMWh * 0.72; // MT CO2e avoided
    const costSavedINR = energySavedMWh * 6800; // INR @ approx industrial rate

    // DOM Updates
    const pctDropEl = document.getElementById('calc-pct-drop');
    const surfaceTempEl = document.getElementById('calc-surface-temp');
    const totalLossEl = document.getElementById('calc-total-loss');
    const co2SavedEl = document.getElementById('calc-co2-saved');
    const annualSavingsEl = document.getElementById('calc-annual-savings');

    if (pctDropEl) {
      pctDropEl.textContent = material === 'calcium-silicate' ? '50% Loss Cut' : (material === 'bare' ? '+1140% High Loss' : 'Baseline Reference');
    }
    if (surfaceTempEl) {
      surfaceTempEl.textContent = `${(ambientTemp + deltaSurface).toFixed(1)} °C (${deltaSurface.toFixed(1)}°C Δ)`;
    }
    if (totalLossEl) {
      totalLossEl.textContent = `${totalHeatLossKW.toFixed(1)} kW`;
    }
    if (co2SavedEl) {
      co2SavedEl.textContent = material === 'calcium-silicate' ? `${co2ReductionTons.toFixed(1)} MT / yr` : '0.0 MT';
    }
    if (annualSavingsEl) {
      annualSavingsEl.textContent = material === 'calcium-silicate' ? `₹ ${(costSavedINR / 100000).toFixed(2)} Lakhs` : '₹ 0.0';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ChemicalSimulators.init();
});
