// script.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Data…
  const data = {
    "Cake Flour":       { "1_cup":90,  "3_4_cup":67.5, "2_3_cup":60,  "1_2_cup":45,  "1_3_cup":30,   "1_4_cup":22.5, "1_tbsp":5.6 },
    "All-Purpose Flour":{ "1_cup":95,  "3_4_cup":71.3, "2_3_cup":63.3,"1_2_cup":47.5,"1_3_cup":31.6, "1_4_cup":23.8, "1_tbsp":5.9 },
    "Bread Flour":      { "1_cup":110, "3_4_cup":82.5, "2_3_cup":73.3,"1_2_cup":55,  "1_3_cup":36.6, "1_4_cup":27.5, "1_tbsp":6.8 },
    "Cornstarch":       { "1_cup":100, "3_4_cup":75,   "2_3_cup":66.6,"1_2_cup":50,  "1_3_cup":33.3, "1_4_cup":25,   "1_tbsp":6.2 },
    "Tapioca Starch":   { "1_cup":75,  "3_4_cup":59.3, "2_3_cup":50,  "1_2_cup":37.5,"1_3_cup":25,   "1_4_cup":18.8, "1_tbsp":4.6 },

    "White Sugar":      { "1_cup":185, "3_4_cup":138.8,"2_3_cup":123.3,"1_2_cup":92.5,"1_3_cup":61.6, "1_4_cup":46.3, "1_tbsp":11.5 },
    "Brown Sugar":      { "1_cup":180, "3_4_cup":135,  "2_3_cup":120,  "1_2_cup":90,  "1_3_cup":60,   "1_4_cup":45,   "1_tbsp":11.3 },
    "Icing Sugar":      { "1_cup":100, "3_4_cup":75,   "2_3_cup":66.6, "1_2_cup":50,  "1_3_cup":33.3, "1_4_cup":25,   "1_tbsp":6.5 },
    "Honey":            { "1_cup":300, "3_4_cup":225,  "2_3_cup":200,  "1_2_cup":150, "1_3_cup":100,  "1_4_cup":75,   "1_tbsp":18.8 },
    "Corn Syrup":       { "1_cup":300, "3_4_cup":225,  "2_3_cup":200,  "1_2_cup":150, "1_3_cup":100,  "1_4_cup":75,   "1_tbsp":18.8 },

    "Butter":           { "1_cup":200, "3_4_cup":150, "2_3_cup":133.3,"1_2_cup":100,"1_3_cup":66.7, "1_4_cup":50   },
    "Peanut Butter":    { "1_cup":240, "3_4_cup":180, "2_3_cup":160,  "1_2_cup":120,"1_3_cup":80,   "1_4_cup":60   },
    "Evaporated Milk":  { "1_cup":240, "3_4_cup":180, "2_3_cup":160,  "1_2_cup":120,"1_3_cup":80,   "1_4_cup":60   },
    "Cocoa Powder":     { "1_cup":65,  "3_4_cup":48.7,"2_3_cup":43.4,"1_2_cup":32.5,"1_3_cup":21.7,"1_4_cup":16.2 },

    "Dry Yeast":        { "1_tbsp":7 },
    "Baking Soda":      { "1_tbsp":10 },
    "Baking Powder":    { "1_tbsp":8 },
    "Cream of Tartar":  { "1_tbsp":7 },
    "Ammonia":          { "1_tbsp":10 }
  };

  // 2) Element refs
  const ingSel  = document.getElementById('ingredient');
  const unitSel = document.getElementById('unit');
  const volIn   = document.getElementById('volInput');
  const wtIn    = document.getElementById('wtInput');
  const volRes  = document.getElementById('volResult');
  const wtRes   = document.getElementById('wtResult');

  // 3) Populate ingredients
  Object.keys(data).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    ingSel.append(opt);
  });

  // 4) GCD for fraction reduction
  function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }

  // 5) Decimal→mixed-number fraction (max denom 12)
  function toCupFraction(x) {
    const whole = Math.floor(x);
    let rem = x - whole;
    if (rem < 1e-6) return `${whole}`; // exact whole

    // find best n/d for d ≤ 12
    let best = { err: 1, n: 0, d: 1 };
    for (let d = 1; d <= 12; d++) {
      const n = Math.round(rem * d);
      const err = Math.abs(rem - n/d);
      if (err < best.err) best = { err, n, d };
    }
    // if too large error, snap to nearest half
    if (best.err > 0.1) {
      if (rem > 0.5) { best = { n:1, d:2 }; }
      else { best = { n:0, d:1 }; }
    }
    // reduce
    const g = gcd(best.n, best.d);
    const n = best.n / g, d = best.d / g;
    if (n === 0) return `${whole}`;

    const sym = (d===2&&n===1)?'½':
                (d===3&&n===1)?'⅓':
                (d===3&&n===2)?'⅔':
                (d===4&&n===1)?'¼':
                (d===4&&n===3)?'¾': null;

    const fracText = sym || `${n}/${d}`;
    return whole ? `${whole}${fracText}` : `${fracText}`;
  }

  // 6) V→W and display
  function updateFromVolume() {
    const per = data[ingSel.value]?.[unitSel.value]||0;
    const v   = parseFloat(volIn.value)||0;
    const g   = (v*per).toFixed(2);
    const isCup = unitSel.value.includes('_cup');
    const dv  = isCup ? toCupFraction(v) : v.toFixed(2);

    volRes.textContent = `${dv} ${unitSel.selectedOptions[0].text}`;
    wtRes.textContent  = `${g} g`;
    wtIn.value = g;
  }

  // 7) W→V and display
  function updateFromWeight() {
    const per = data[ingSel.value]?.[unitSel.value]||0;
    const w   = parseFloat(wtIn.value)||0;
    const vRaw= per ? w/per : 0;
    const isCup = unitSel.value.includes('_cup');
    const dv  = isCup ? toCupFraction(vRaw) : vRaw.toFixed(2);
    const g   = w.toFixed(2);

    volRes.textContent = `${dv} ${unitSel.selectedOptions[0].text}`;
    wtRes.textContent  = `${g} g`;
    volIn.value = dv;
  }

  // 8) Events
  ingSel.addEventListener('change', updateFromVolume);
  unitSel.addEventListener('change', updateFromVolume);
  volIn.addEventListener('input', updateFromVolume);
  wtIn.addEventListener('input', updateFromWeight);

  // 9) Init
  ingSel.selectedIndex = 0;
  unitSel.value       = '1_cup';
  volIn.value         = 1;
  updateFromVolume();
});
