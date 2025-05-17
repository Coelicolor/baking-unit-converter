// script.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM loaded!');

  // 1) Your data object
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

  // 2) Get your elements
  const ingSel   = document.getElementById('ingredient');
  const unitSel  = document.getElementById('unit');
  const volIn    = document.getElementById('volInput');
  const wtIn     = document.getElementById('wtInput');
  const volRes   = document.getElementById('volResult');
  const wtRes    = document.getElementById('wtResult');

  // 3) Sanity check
  if (!ingSel || !unitSel || !volIn || !wtIn || !volRes || !wtRes) {
    console.error('❌ One of your elements was not found!');
    return;
  }

  console.log('✅ All elements found, populating ingredients…');

  // 4) Populate ingredient dropdown
  Object.keys(data).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    ingSel.append(opt);
  });

  // 5) Fraction helper for cup units
    function toCupFraction(x) {
    const whole = Math.floor(x);
    const rem   = x - whole;

    // Snap really-close values to whole numbers
    if (rem > 0.9) {
      return `${whole + 1}`;      // e.g. 0.92 → "1"
    }
    if (rem < 0.1) {
      return `${whole}`;          // e.g. 1.03 → "1", 0.08 → "0"
    }

    const fracs = [
      { val: .75,   sym: '¾' },
      { val: .6667, sym: '⅔' },
      { val: .5,    sym: '½' },
      { val: .3333, sym: '⅓' },
      { val: .25,   sym: '¼' }
    ];

    // find closest standard fraction
    const match = fracs.find(f => Math.abs(rem - f.val) < 0.08);
    if (match) {
      const s = match.sym;
      if (whole > 0) return `${whole}${s}`;  // e.g. 1 + "½" → "1½"
      return `${s}`;                        // e.g. ⅓
    }

    // fallback (unlikely now)
    return x.toFixed(2);
  }


  // 6) Volume → Weight
  function updateFromVolume() {
    const perUnit = data[ingSel.value]?.[unitSel.value] || 0;
    const volNum  = parseFloat(volIn.value) || 0;
    const grams   = (volNum * perUnit).toFixed(2);

    // Format volume
    const isCup = unitSel.value.includes('_cup');
    const dispV = isCup ? toCupFraction(volNum) : volNum.toFixed(2);

    volRes.textContent = `${dispV} ${unitSel.selectedOptions[0].text}`;
    wtRes.textContent  = `${grams} g`;

    wtIn.value = grams;
  }

  // 7) Weight → Volume
  function updateFromWeight() {
    const perUnit = data[ingSel.value]?.[unitSel.value] || 0;
    const wtNum   = parseFloat(wtIn.value) || 0;
    const rawVol  = perUnit ? (wtNum / perUnit) : 0;

    const isCup = unitSel.value.includes('_cup');
    const dispV = isCup ? toCupFraction(rawVol) : rawVol.toFixed(2);
    const grams = wtNum.toFixed(2);

    volRes.textContent = `${dispV} ${unitSel.selectedOptions[0].text}`;
    wtRes.textContent  = `${grams} g`;

    volIn.value = dispV;
  }

  // 8) Wire up events
  ingSel.addEventListener('change', updateFromVolume);
  unitSel.addEventListener('change', updateFromVolume);
  volIn.addEventListener('input', updateFromVolume);
  wtIn.addEventListener('input', updateFromWeight);

  // 9) Kick it off
  ingSel.selectedIndex = 0;
  unitSel.value       = '1_cup';
  volIn.value         = 1;
  updateFromVolume();
});
