// Menú del restaurante. Para cambiar un precio o un plato, edita solo este archivo.
// name: [inglés, español]
export type Dish = { img?: string; name: [string, string]; price: string };
export type Section = { id: string; title: [string, string]; dishes: Dish[] };

export const MENU: Section[] = [
  {
    id: "starters",
    title: ["Starters & salads", "Entradas y ensaladas"],
    dishes: [
      { img: "m-bruschetta", name: ["Bruschetta", "Bruschetta"], price: "13.99" },
      { img: "m-caprese", name: ["Caprese Salad", "Ensalada Caprese"], price: "14.99" },
      { img: "m-mediterranean", name: ["Mediterranean Salad", "Ensalada Mediterránea"], price: "13.99" },
      { img: "m-caesar", name: ["Caesar Salad", "Ensalada César"], price: "12.99" },
      { img: "m-octopus-grill", name: ["Octopus on the Grill", "Pulpo a la parrilla"], price: "23.95" },
      { img: "m-calamaretti", name: ["Calamaretti Fritti", "Calamaretti Fritti"], price: "15.95" },
      { img: "m-burrata", name: ["Burrata & Prosciutto Salad", "Ensalada de Burrata y Prosciutto"], price: "22.95" },
      { img: "m-meatballs", name: ["Meatballs Pomodoro", "Albóndigas Pomodoro"], price: "14.95" },
      { img: "m-garlic-shrimp", name: ["Garlic Shrimp", "Camarones al ajillo"], price: "15.95" },
    ],
  },
  {
    id: "mains",
    title: ["Main course", "Platos fuertes"],
    dishes: [
      { img: "m-bolognese", name: ["Pasta Bolognese", "Pasta Boloñesa"], price: "19.95" },
      { img: "m-pasta-meatballs", name: ["Pasta with Meatballs", "Pasta con albóndigas"], price: "21.95" },
      { img: "m-gnocchi", name: ["Gnocchi", "Gnocchi"], price: "17.95" },
      { img: "m-lasagna-pastinos", name: ["Lasagna Pastinos", "Lasaña Pastinos"], price: "23.95" },
      { img: "m-lasagna-bolognese", name: ["Lasagna Bolognese", "Lasaña Boloñesa"], price: "21.95" },
      { img: "m-chicken-parm", name: ["Chicken Parmigiana", "Pollo a la Parmigiana"], price: "24.95" },
      { img: "m-ny-steak", name: ["New York Steak", "New York Steak"], price: "32.95" },
      { img: "m-verne-octopus", name: ["Verne Octopus Spaghetti", "Espagueti con pulpo Verne"], price: "27.95" },
      { img: "m-salmon", name: ["Salmon a la Florentina", "Salmón a la Florentina"], price: "27.95" },
    ],
  },
  {
    id: "desserts",
    title: ["Desserts", "Postres"],
    dishes: [
      { img: "d-chocolate-mousse", name: ["Chocolate Mousse", "Mousse de chocolate"], price: "10.95" },
      { img: "d-tiramisu", name: ["Tiramisu", "Tiramisú"], price: "10.95" },
      { img: "d-pistachio-cake", name: ["Pistachio Cake", "Torta de pistacho"], price: "11.95" },
      { img: "d-coconut-flan", name: ["Coconut Flan", "Flan de coco"], price: "10.95" },
    ],
  },
];

export const DRINKS: Dish[] = [
  { name: ["Sodas", "Refrescos"], price: "3.95" },
  { name: ["Sparkling Water", "Agua con gas"], price: "4.95" },
  { name: ["Bottled Water", "Agua embotellada"], price: "2.50" },
  { name: ["Nespresso", "Nespresso"], price: "3.00" },
  { name: ["Cappuccino", "Capuchino"], price: "4.50" },
];

// "Pasta for you": arma tu pasta
export const BUILD = {
  price: "16.95",
  pasta: ["Spaghetti", "Penne", "Fettuccine", "Rigatoni"],
  sauce: [
    ["Pomodoro", "Pomodoro"],
    ["Alfredo", "Alfredo"],
    ["Pesto", "Pesto"],
    ["Pastinos (pink)", "Pastinos (rosada)"],
  ] as [string, string][],
  ingredients: [
    ["Tomatoes", "Tomate"],
    ["Mushrooms", "Champiñones"],
    ["Spinach", "Espinaca"],
    ["Olives", "Aceitunas"],
    ["Onions", "Cebolla"],
    ["Broccoli", "Brócoli"],
  ] as [string, string][],
  extraIngredient: "1.95",
  proteins: [
    { name: ["Chicken", "Pollo"] as [string, string], price: "4.95" },
    { name: ["Shrimp", "Camarones"] as [string, string], price: "5.95" },
  ],
};
