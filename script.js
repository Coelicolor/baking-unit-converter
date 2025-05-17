// data: ingredient → { unitKey: grams }
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
  "Invert Sugar":     { "1_cup":300, "3_4_cup":225,  "2_3_cup":200,  "1_2_cup":150, "1_3_cup":100,  "1_4_cup":75,   "1_tbsp":18.8 },
  "Fruit Cocktail Syrup": { "1_cup":240, "3_4_cup":180, "2_3_cup":160, "1_2_cup":120,"1_3_cup":80, "1_4_cup":60,   "1_tbsp":15 },
  "Canned Pineapple Syrup": { "1_cup":220, "3_4_cup":165, "2_3_cup":146.7,"1_2_cup":110,"1_3_cup":73.3,"1_4_cup":55,   "1_tbsp":13 },

  "Butter":           { "1_cup":200, "3_4_cup":150, "2_3_cup":133.3,"1_2_cup":100,"1_3_cup":66.7, "1_4_cup":50   },
  "Margarine":        { "1_cup":200, "3_4_cup":150, "2_3_cup":133.3,"1_2_cup":100,"1_3_cup":66.7, "1_4_cup":50   },
  "Shortening":       { "1_cup":185, "3_4_cup":138.7,"2_3_cup":123.3,"1_2_cup":92.5,"1_3_cup":61.7, "1_4_cup":46.3 },
  "Peanut Butter":    { "1_cup":240, "3_4_cup":180, "2_3_cup":160,  "1_2_cup":120,"1_3_cup":80,   "1_4_cup":60   },
  "Vegetable Oil":    { "1_cup":200, "3_4_cup":150, "2_3_cup":133.3,"1_2_cup":100,"1_3_cup":66.7, "1_4_cup":50   },

  "Evaporated Milk":  { "1_cup":240, "3_4_cup":180, "2_3_cup":160,  "1_2_cup":120,"1_3_cup":80,   "1_4_cup":60   },
  "Nonfat Dry Milk":  { "1_cup":120, "3_4_cup":90,  "2_3_cup":80,   "1_2_cup":60, "1_3_cup":40,   "1_4_cup":30   },
  "Cheddar Cheese":   { "1_cup":100, "3_4_cup":75,  "2_3_cup":66.7, "1_2_cup":50, "1_3_cup":33.3, "1_4_cup":25   },

  "Cocoa Powder":     { "1_cup":65,  "3_4_cup":48.7,"2_3_cup":43.4,"1_2_cup":32.5,"1_3_cup":21.7,"1_4_cup":16.2 },
  "Solid Chocolate":  { "1_cup":200, "3_4_cup":150, "2_3_cup":133.3,"1_2_cup":100,"1_3_cup":66.7, "1_4_cup":50   },
  "Decorating Chocolate": { "1_cup":120, "3_4_cup":90, "2_3_cup":80,   "1_2_cup":60, "1_3_cup":40,   "1_4_cup":30   },

  "Dry Yeast":        { "1_tbsp":7 },
  "Baking Soda":      { "1_tbsp":10 },
  "Baking Powder":    { "1_tbsp":8 },
  "Cream of Tartar":  { "1_tbsp":7 },
  "Ammonia":          { "1_tbsp":10 }
};

window.addEventListener('DOMContentLoaded', () => {
  const ingSelect = document.getElementById('ingredient');
  const unitSelect = document.getElementById('unit');
  const out = document.getElementById('grams');

  // populate ingredients dropdown
  for (let name of Object.keys(data)) {
    let opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    ingSelect.append(opt);
  }

  function update() {
    const ing = data[ingSelect.value];
    const grams = ing[unitSelect.value] ?? '—';
    out.textContent = grams;
  }

  ingSelect.addEventListener('change', update);
  unitSelect.addEventListener('change', update);

  update();
});
