/**
 * VERDANT Table & Garden - Data Store
 * Aesthetic, Clean, Optimized Farm-to-Table & Mediterranean Hearth
 */

const RESTAURANT_DATA = {
  info: {
    name: "VERDANT",
    subtitle: "Table, Hearth & Olive Garden",
    tagline: "Sunlit Mediterranean hospitality, wood-fired seasonal harvests, and biodynamic natural wines.",
    address: "742 Cypress Avenue, Garden District, CA 94107",
    phone: "+1 (415) 890-4210",
    email: "bonjour@verdanttable.com",
    hours: [
      { days: "Wednesday – Friday", lunch: "11:30 AM – 2:30 PM", dinner: "5:00 PM – 10:00 PM" },
      { days: "Saturday – Sunday", brunch: "10:30 AM – 3:00 PM", dinner: "5:00 PM – 10:30 PM" },
      { days: "Monday – Tuesday", note: "Reserved for Private Gatherings & Garden Harvest" }
    ],
    stats: [
      { value: "100%", label: "Organic & Regenerative" },
      { value: "48+", label: "Regional Farm Partners" },
      { value: "Zero", label: "Single-Use Kitchen Waste" },
      { value: "4.9 ★", label: "Over 950+ Verified Diners" }
    ]
  },

  menuCategories: [
    { id: "all", name: "All Offerings" },
    { id: "garden", name: "Garden & Earth" },
    { id: "hearth", name: "Wood-Fired Mains" },
    { id: "sea", name: "Coastal & Crudo" },
    { id: "dolce", name: "Artisanal Dolce" },
    { id: "spritz", name: "Spritz & Botanical Wine" }
  ],

  menuItems: [
    {
      id: "v-item-1",
      name: "Heirloom Burrata & Sun-Ripened Fig",
      category: "garden",
      price: 22,
      description: "Creamy artisanal burrata, wood-roasted black mission figs, wild honey glaze, Sicilian pistachios, fresh torn mint, grilled levain sourdough.",
      tags: ["Vegetarian", "Guest Favorite"],
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80",
      calories: "380 kcal",
      allergens: ["Dairy", "Nuts", "Gluten"],
      pairing: "Vermentino di Sardegna 2023",
      prepTime: "10 mins"
    },
    {
      id: "v-item-2",
      name: "Charred Roman Artichokes & Citrus Aioli",
      category: "garden",
      price: 19,
      description: "Braised baby artichokes finished over live embers, Meyer lemon garlic emulsion, crispy capers, fresh dill pollen, sea salt flakes.",
      tags: ["Vegan", "Gluten Free"],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      calories: "240 kcal",
      allergens: [],
      pairing: "Etna Bianco DOC 2022",
      prepTime: "12 mins"
    },
    {
      id: "v-item-3",
      name: "Wild Foraged Chanterelle Flatbread",
      category: "garden",
      price: 24,
      description: "Naturally fermented sourdough crust, crème fraîche, caramelized leeks, Oregon chanterelles, taleggio cheese, thyme oil.",
      tags: ["Vegetarian", "Chef Camille's Pick"],
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      calories: "480 kcal",
      allergens: ["Gluten", "Dairy"],
      pairing: "Gamay Noir Domaine de la Combe 2022",
      prepTime: "14 mins"
    },
    {
      id: "v-item-4",
      name: "Wood-Fired Mediterranean Sea Bream",
      category: "sea",
      price: 44,
      description: "Whole butterflied sea bream roasted over white olive wood, preserved Meyer lemon salsa verde, shaved fennel salad, crispy rosemary potatoes.",
      tags: ["Gluten Free", "Signature"],
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      calories: "510 kcal",
      allergens: ["Fish"],
      pairing: "Assyrtiko Santorini Domaine Sigalas 2022",
      prepTime: "20 mins"
    },
    {
      id: "v-item-5",
      name: "Pacific Hamachi Crudo & Blood Orange",
      category: "sea",
      price: 26,
      description: "Sashimi-grade yellowtail, Moro blood orange ponzu, compressed Persian cucumber, serrano chile rounds, cold-pressed olive oil.",
      tags: ["Gluten Free", "Raw Bar"],
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
      calories: "260 kcal",
      allergens: ["Fish"],
      pairing: "Provence Rosé Château Miraval 2023",
      prepTime: "8 mins"
    },
    {
      id: "v-item-6",
      name: "Oak-Roasted Heritage Lamb Chops",
      category: "hearth",
      price: 52,
      description: "Pasture-raised California lamb chops, pomegranate molasses reduction, crushed mint pea purée, charred cipollini onions.",
      tags: ["Gluten Free", "Chef Camille's Pick"],
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      calories: "680 kcal",
      allergens: [],
      pairing: "Châteauneuf-du-Pape 2020",
      prepTime: "22 mins"
    },
    {
      id: "v-item-7",
      name: "Black Truffle Hand-Cut Tagliolini",
      category: "hearth",
      price: 38,
      description: "Egg-yolk pasta extruded fresh daily, cultured Normandy butter, 30-month Parmigiano-Reggiano, fresh Umbrian black truffle shaved tableside.",
      tags: ["Vegetarian", "Guest Favorite"],
      image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281720?auto=format&fit=crop&w=800&q=80",
      calories: "560 kcal",
      allergens: ["Gluten", "Dairy", "Eggs"],
      pairing: "Barbaresco Produttori del Barbaresco 2019",
      prepTime: "15 mins"
    },
    {
      id: "v-item-8",
      name: "Prime Wood-Grilled Ribeye (12oz)",
      category: "hearth",
      price: 64,
      description: "Grass-fed, grain-finished prime ribeye steak, roasted bone marrow butter, blistered Padron peppers, rosemary sea salt.",
      tags: ["Gluten Free"],
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      calories: "780 kcal",
      allergens: ["Dairy"],
      pairing: "Sonoma Mountain Cabernet Sauvignon 2021",
      prepTime: "20 mins"
    },
    {
      id: "v-item-9",
      name: "Olive Oil & Citrus Rosemary Cake",
      category: "dolce",
      price: 15,
      description: "Single-origin Tuscan olive oil sponge, candied bergamot, whipped mascarpone cream, crushed pistachios, orange blossom syrup.",
      tags: ["Vegetarian"],
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
      calories: "390 kcal",
      allergens: ["Dairy", "Gluten", "Eggs", "Nuts"],
      pairing: "Moscato d'Asti DOCG 2023",
      prepTime: "8 mins"
    },
    {
      id: "v-item-10",
      name: "Valrhona Warm Chocolate Budino",
      category: "dolce",
      price: 16,
      description: "Rich 70% dark chocolate soft pudding cake, sea-salted caramel drizzle, hazelnut praline crisp, Madagascar vanilla bean gelato.",
      tags: ["Vegetarian"],
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      calories: "460 kcal",
      allergens: ["Dairy", "Eggs", "Gluten", "Nuts"],
      pairing: "Taylor Fladgate 10 Year Tawny Port",
      prepTime: "12 mins"
    },
    {
      id: "v-item-11",
      name: "Verdant Garden Spritz",
      category: "spritz",
      price: 17,
      description: "Italicus Bergamot Rosolio, house-pressed cucumber juice, fresh mint, elderflower tonic, prosecco, lime zest ribbon.",
      tags: ["Signature Spritz", "Low ABV"],
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      calories: "140 kcal",
      allergens: [],
      pairing: "Appetizer & Crudo Pairing",
      prepTime: "4 mins"
    },
    {
      id: "v-item-12",
      name: "Smoked Rosemary & Blood Orange Negroni",
      category: "spritz",
      price: 19,
      description: "Botanical dry gin, Campari infused with dried blood orange, Carpano Antica vermouth, flamed rosemary sprig.",
      tags: ["Classic Reimagined"],
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      calories: "190 kcal",
      allergens: [],
      pairing: "Wood-Fired Hearth Pairing",
      prepTime: "3 mins"
    }
  ],

  seatingZones: [
    {
      id: "greenhouse",
      name: "The Sunlit Atrium Greenhouse",
      desc: "Vaulted glass ceilings, hanging jasmine flora, and gentle natural radiance.",
      vibe: "Intimate & Romantic"
    },
    {
      id: "courtyard",
      name: "The Century Olive Courtyard",
      desc: "Open-air alfresco dining beneath illuminated ancient olive branches.",
      vibe: "Lively & Atmospheric"
    },
    {
      id: "kitchen",
      name: "The Hearth Counter",
      desc: "Front-row interactive seating watching Chef Camille and team stoke the fires.",
      vibe: "Experiential & Dynamic"
    },
    {
      id: "dining",
      name: "The Library Main Hall",
      desc: "Warm travertine walls, linen-draped tables, and comfortable leather seating.",
      vibe: "Elegant & Relaxed"
    }
  ],

  press: [
    {
      quote: "VERDANT redefines modern California-Mediterranean dining. Camille Laurent’s fire-roasted whole sea bream and house tagliolini are poetry on the palate.",
      critic: "San Francisco Chronicle",
      author: "Julian Chen, Lead Food Critic",
      stars: 5
    },
    {
      quote: "One of the most aesthetically soothing and culinary precise dining rooms on the West Coast. The wine list is a masterpiece of biodynamic integrity.",
      critic: "Vogue Living & Table",
      author: "Sophia Sterling",
      stars: 5
    },
    {
      quote: "A benchmark for genuine sustainability. From the zero-waste kitchen cocktails to the line-caught catches, every detail sings with conscious luxury.",
      critic: "Michelin Guide Review",
      author: "Inspectors' Choice 2025",
      stars: 5
    }
  ]
};
