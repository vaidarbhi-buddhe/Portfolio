/**
 * Vaidarbhi Buddhe - Chemical Engineering Utilities & Calculations
 * 1. Multi-Unit Converter for Chemical Engineers
 * 2. Reynolds Number (Re) & Hydrodynamic Regime Classifier
 */

const EngineeringCalc = {
  // Conversion factors relative to base SI units
  unitFactors: {
    pressure: {
      bar: 1e5,
      atm: 101325,
      psi: 6894.76,
      kpa: 1e3,
      mpa: 1e6,
      mmhg: 133.322
    },
    flowrate: {
      m3h: 1 / 3600,
      lmin: 1 / 60000,
      gpm: 0.00378541 / 60,
      cfm: 0.0283168 / 60
    },
    viscosity: {
      cp: 1e-3,
      pas: 1.0,
      p: 0.1,
      mpas: 1e-3
    },
    energy: {
      kw: 1e3,
      btuh: 0.293071,
      kcalh: 1.16222,
      hp: 745.7
    }
  },

  init() {
    this.initUnitConverter();
    this.initReynoldsCalculator();
  },

  /* ------------------------------------------------------------------------
     1. Unit Converter
     ------------------------------------------------------------------------ */
  initUnitConverter() {
    const typeSelect = document.getElementById('conv-type-select');
    const inputVal = document.getElementById('conv-input-val');
    const fromSelect = document.getElementById('conv-from-unit');
    const toSelect = document.getElementById('conv-to-unit');
    const resultDisplay = document.getElementById('conv-result-val');

    const updateUnitsDropdown = () => {
      const type = typeSelect ? typeSelect.value : 'pressure';
      if (type === 'temperature') {
        fromSelect.innerHTML = `
          <option value="C">Celsius (°C)</option>
          <option value="K">Kelvin (K)</option>
          <option value="F">Fahrenheit (°F)</option>
        `;
        toSelect.innerHTML = `
          <option value="K">Kelvin (K)</option>
          <option value="C">Celsius (°C)</option>
          <option value="F">Fahrenheit (°F)</option>
        `;
      } else {
        const units = Object.keys(this.unitFactors[type]);
        fromSelect.innerHTML = units.map(u => `<option value="${u}">${u.toUpperCase()}</option>`).join('');
        toSelect.innerHTML = units.map((u, i) => `<option value="${u}" ${i === 1 ? 'selected' : ''}>${u.toUpperCase()}</option>`).join('');
      }
      this.calculateConversion();
    };

    if (typeSelect) typeSelect.addEventListener('change', updateUnitsDropdown);
    if (inputVal) inputVal.addEventListener('input', () => this.calculateConversion());
    if (fromSelect) fromSelect.addEventListener('change', () => this.calculateConversion());
    if (toSelect) toSelect.addEventListener('change', () => this.calculateConversion());

    updateUnitsDropdown();
  },

  calculateConversion() {
    const typeSelect = document.getElementById('conv-type-select');
    const inputVal = document.getElementById('conv-input-val');
    const fromSelect = document.getElementById('conv-from-unit');
    const toSelect = document.getElementById('conv-to-unit');
    const resultDisplay = document.getElementById('conv-result-val');

    if (!typeSelect || !inputVal || !fromSelect || !toSelect || !resultDisplay) return;

    const val = parseFloat(inputVal.value);
    if (isNaN(val)) {
      resultDisplay.textContent = '0.00';
      return;
    }

    const type = typeSelect.value;
    const from = fromSelect.value;
    const to = toSelect.value;

    let result = 0;

    if (type === 'temperature') {
      // Temperature special handling
      let celsius = val;
      if (from === 'K') celsius = val - 273.15;
      else if (from === 'F') celsius = (val - 32) * (5 / 9);

      if (to === 'C') result = celsius;
      else if (to === 'K') result = celsius + 273.15;
      else if (to === 'F') result = (celsius * 9 / 5) + 32;
    } else {
      const baseSI = val * this.unitFactors[type][from];
      result = baseSI / this.unitFactors[type][to];
    }

    resultDisplay.textContent = result >= 10000 || (result < 0.01 && result > 0) 
      ? result.toExponential(4) 
      : result.toLocaleString(undefined, { maximumFractionDigits: 4 });
  },

  /* ------------------------------------------------------------------------
     2. Reynolds Number Calculator
     ------------------------------------------------------------------------ */
  initReynoldsCalculator() {
    const inputs = ['re-density', 're-velocity', 're-diameter', 're-viscosity'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.calculateReynolds());
      }
    });
    this.calculateReynolds();
  },

  calculateReynolds() {
    const rhoEl = document.getElementById('re-density');
    const vEl = document.getElementById('re-velocity');
    const dEl = document.getElementById('re-diameter');
    const muEl = document.getElementById('re-viscosity');

    const resultEl = document.getElementById('re-val-out');
    const regimeEl = document.getElementById('re-regime-out');

    if (!rhoEl || !vEl || !dEl || !muEl || !resultEl || !regimeEl) return;

    const rho = parseFloat(rhoEl.value) || 1000;   // kg/m3
    const v = parseFloat(vEl.value) || 1.5;         // m/s
    const dMm = parseFloat(dEl.value) || 50;        // mm
    const dM = dMm / 1000;                          // m
    const muCp = parseFloat(muEl.value) || 1.0;     // cP
    const muPaS = muCp * 1e-3;                      // Pa.s

    // Re = (rho * v * D) / mu
    const Re = (rho * v * dM) / muPaS;

    resultEl.textContent = Re.toLocaleString(undefined, { maximumFractionDigits: 0 });

    regimeEl.className = 'reynolds-regime-pill';
    if (Re < 2100) {
      regimeEl.classList.add('regime-laminar');
      regimeEl.textContent = `Laminar Flow (Re < 2,100) • Viscous Dominated`;
    } else if (Re <= 4000) {
      regimeEl.classList.add('regime-transition');
      regimeEl.textContent = `Transitional Flow (2,100 ≤ Re ≤ 4,000) • Critical Zone`;
    } else {
      regimeEl.classList.add('regime-turbulent');
      regimeEl.textContent = `Turbulent Flow (Re > 4,000) • Inertia Dominated`;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  EngineeringCalc.init();
});
