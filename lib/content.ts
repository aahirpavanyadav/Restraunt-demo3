export type DietTag = "V" | "VE" | "GF";

export type MenuCategory = "starters" | "mains" | "desserts" | "drinks";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  image: string;
  imageAlt: string;
  tags: DietTag[];
  featured?: boolean;
}

export const menuCategories: { id: MenuCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "starters", label: "Small plates" },
  { id: "mains", label: "Mains" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export const dishes: Dish[] = [
  {
    id: "sourdough",
    name: "Charred sourdough",
    description:
      "Our daily loaf, cultured butter and smoked sea salt, finished over the embers.",
    price: "£6",
    category: "starters",
    image: "/images/dish-sourdough.jpg",
    imageAlt: "Rustic sourdough loaves with a wheat stem on a dark stone surface",
    tags: ["V"],
  },
  {
    id: "bruschetta",
    name: "Heirloom tomato bruschetta",
    description:
      "Late-summer tomatoes, basil oil and aged balsamic on grilled country bread.",
    price: "£11",
    category: "starters",
    image: "/images/dish-bruschetta.jpg",
    imageAlt: "Grilled bruschetta topped with colourful heirloom tomatoes and herbs",
    tags: ["VE"],
  },
  {
    id: "prawns",
    name: "Tiger prawns",
    description:
      "Chilli, garlic and lemon butter, with grilled sourdough for the juices.",
    price: "£14",
    category: "starters",
    image: "/images/dish-prawns.jpg",
    imageAlt: "Tiger prawns with lemon and herbs on a dark serving plate",
    tags: ["GF"],
  },
  {
    id: "salmon",
    name: "Wild salmon",
    description:
      "Fennel, brown butter and sea herbs. Day-boat salmon from the Cornish coast.",
    price: "£34",
    category: "mains",
    image: "/images/dish-salmon.jpg",
    imageAlt:
      "Pan-roasted salmon fillet with fennel and brown butter on a dark ceramic plate",
    tags: ["GF"],
    featured: true,
  },
  {
    id: "ribeye",
    name: "Dry-aged ribeye",
    description:
      "Ember-roasted bone marrow, watercress and beef-fat potatoes. Served for two or one.",
    price: "£38",
    category: "mains",
    image: "/images/dish-ribeye.jpg",
    imageAlt: "Sliced dry-aged ribeye steak with a charred, caramelised crust",
    tags: ["GF"],
    featured: true,
  },
  {
    id: "cavatelli",
    name: "Wood-fired cavatelli",
    description:
      "Wild mushrooms, aged parmesan and thyme, finished with a little lemon.",
    price: "£24",
    category: "mains",
    image: "/images/dish-pasta.jpg",
    imageAlt: "Hand-rolled cavatelli pasta with wild mushrooms and parmesan",
    tags: ["V"],
    featured: true,
  },
  {
    id: "pork",
    name: "Ember pork chop",
    description:
      "Burnt apple, sage and cider jus. Free-range pork from the Wye Valley.",
    price: "£29",
    category: "mains",
    image: "/images/dish-pork.jpg",
    imageAlt: "Chargrilled pork chop with golden potatoes and green herbs",
    tags: ["GF"],
  },
  {
    id: "pannacotta",
    name: "Vanilla panna cotta",
    description:
      "Macerated strawberries, basil sugar and a thin almond tuile.",
    price: "£10",
    category: "desserts",
    image: "/images/dish-pannacotta.jpg",
    imageAlt: "Vanilla panna cotta topped with fresh strawberries and cream",
    tags: ["V", "GF"],
  },
  {
    id: "chocolate",
    name: "Dark chocolate delice",
    description:
      "Olive oil, sea salt and crème fraîche. Dark, dense and quietly addictive.",
    price: "£11",
    category: "desserts",
    image: "/images/dish-chocolate.jpg",
    imageAlt: "Dark chocolate delice with olive oil and a scoop of ice cream",
    tags: ["V", "GF"],
  },
  {
    id: "goldenhour",
    name: "Golden Hour",
    description:
      "Apricot, amaro and lemon, lengthened with prosecco over a single clear ice cube.",
    price: "£13",
    category: "drinks",
    image: "/images/drink-gold.jpg",
    imageAlt: "Amber cocktail in a tumbler, garnished with citrus",
    tags: ["VE", "GF"],
  },
  {
    id: "negroni",
    name: "Aurelia Negroni",
    description:
      "Gin, Campari and sweet vermouth, stirred slowly and finished with orange.",
    price: "£12",
    category: "drinks",
    image: "/images/drink-negroni.jpg",
    imageAlt: "Deep red negroni cocktail with a dehydrated orange wheel",
    tags: ["VE", "GF"],
  },
  {
    id: "wine",
    name: "Sommelier's pour",
    description:
      "A rotating glass from our grower-led cellar. Ask what is open this evening.",
    price: "£9",
    category: "drinks",
    image: "/images/drink-wine.jpg",
    imageAlt: "Glasses of red wine being raised over a candlelit table",
    tags: ["VE", "GF"],
  },
];

export const dietLabels: Record<DietTag, string> = {
  V: "Vegetarian",
  VE: "Vegan",
  GF: "Gluten free",
};

export interface SignatureDish {
  dishId: string;
  index: string;
  label: string;
}

export const signatureDishes: SignatureDish[] = [
  { dishId: "salmon", index: "01", label: "From the open fire" },
  { dishId: "ribeye", index: "02", label: "Aged in house" },
  { dishId: "cavatelli", index: "03", label: "Made each morning" },
];

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  aspect: "wide" | "portrait" | "square";
}

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/interior-warm.jpg",
    alt: "Warmly lit dining room with leather banquettes and timber tables",
    caption: "The dining room, before service",
    aspect: "wide",
  },
  {
    src: "/images/chef.jpg",
    alt: "Chef plating a dish under warm pendant lights at the pass",
    caption: "At the pass, 6.40pm",
    aspect: "portrait",
  },
  {
    src: "/images/drink-negroni.jpg",
    alt: "A negroni in a short glass with a dehydrated orange wheel",
    caption: "The Aurelia Negroni",
    aspect: "square",
  },
  {
    src: "/images/gallery-dessert.jpg",
    alt: "Caramel ice cream with a glossy sauce being poured over it",
    caption: "Burnt honey ice cream",
    aspect: "square",
  },
  {
    src: "/images/gallery-carpaccio.jpg",
    alt: "Beef carpaccio with capers, herbs and mustard leaves",
    caption: "Carpaccio, capers, mustard leaf",
    aspect: "square",
  },
  {
    src: "/images/gallery-spread.jpg",
    alt: "A generous table of sharing plates, steak and seasonal salads",
    caption: "A table set for sharing",
    aspect: "wide",
  },
  {
    src: "/images/interior-bar.jpg",
    alt: "The bar at Aurelia with low light and a row of stools",
    caption: "The bar, late",
    aspect: "square",
  },
];

export const testimonials = [
  {
    quote:
      "The kind of room you plan to leave after one drink and stay for three. Everything on the plate felt considered.",
    context: "Sunday lunch · Mayfair",
  },
  {
    quote:
      "We came for an anniversary and left feeling like regulars. The salmon is still being talked about.",
    context: "Anniversary dinner · October",
  },
  {
    quote:
      "A rare balance: precise cooking without a hint of ceremony. And a wine list that rewards curiosity.",
    context: "Dinner at the chef's counter",
  },
];
