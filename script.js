document.addEventListener('DOMContentLoaded', () => {
  const data = {
    "Cake Flour":       { "1_cup":90,  "1_tbsp":5.6 },
    "All-Purpose Flour":{ "1_cup":95,  "1_tbsp":5.9 },
    "Bread Flour":      { "1_cup":110, "1_tbsp":6.8 },
    "Cornstarch":       { "1_cup":100, "1_tbsp":6.2 },
    "Tapioca Starch":   { "1_cup":75,  "1_tbsp":4.6 },
    "White Sugar":      { "1_cup":185, "1_tbsp":11.5 },
    "Brown Sugar":      { "1_cup":180, "1_tbsp":11.3 },
    "Icing Sugar":      { "1_cup":100, "1_tbsp":6.5 },
    "Honey":            { "1_cup":300, "1_tbsp":18.8 },
    "Butter":           { "1_cup":200, "1_tbsp":— }, // optional
    "Vegetable Oil":    { "1_cup":200, "1_tbsp":— },
    "Peanut Butter":    { "1_cup":240, "1_tbsp":— },
    // ... Add all others as needed
  };

  const ingSel = document.getElementById('ingredient');
  const cupInput = document.getElementById('cupInput');
  const gramInput = document.getElementById('gramInput');
  const cupRes = document.getElementById('cupResult');
  const gramRes = document.getElementById('gramResult');

  // Populate ingredient dropdown
  Object.keys(data).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    ingSel.appendChild(opt);
  });

  function toTbsp(cupValue) {
    return cupValue * 16;
  }

  function formatVolume(cupVal, ing) {
    if (cupVal >= 1 || !data[ing]['1_tbsp']) {
      return `${cupVal.toFixed(2)} cups`;
    } else {
      const tbsp = toTbsp(cupVal);
      return `${tbsp.toFixed(2)} tbsp`;
    }
  }

  function updateFromCups() {
    const ing = ingSel.value;
    const perCup = data[ing]?.["1_cup"] || 0;
    const cups = parseFloat(cupInput.value) || 0;
    const grams = perCup * cups;

    gramInput.value = grams.toFixed(2);
    cupRes.textContent = formatVolume(cups, ing);
    gramRes.textContent = `${grams.toFixed(2)} grams`;
  }

  function updateFromGrams() {
    const ing = ingSel.value;
    const perCup = data[ing]?.["1_cup"] || 0;
    const grams = parseFloat(gramInput.value) || 0;
    const cups = perCup ? grams / perCup : 0;

    cupInput.value = cups.toFixed(2);
    cupRes.textContent = formatVolume(cups, ing);
    gramRes.textContent = `${grams.toFixed(2)} grams`;
  }

  ingSel.addEventListener('change', updateFromCups);
  cupInput.addEventListener('input', updateFromCups);
  gramInput.addEventListener('input', updateFromGrams);

  // Initialize
  ingSel.selectedIndex = 0;
  cupInput.value = 1;
  updateFromCups();
});
