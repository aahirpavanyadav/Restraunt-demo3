export const site = {
  name: "Aurelia",
  tagline: "Modern European dining · Mayfair",
  description:
    "Seasonal European cooking over open fire, grower-led wine and a warm welcome in the heart of Mayfair.",
  address: {
    line1: "18 Marlowe Lane",
    line2: "Mayfair, London W1K 4QF",
    full: "18 Marlowe Lane, Mayfair, London W1K 4QF",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=18+Marlowe+Lane+Mayfair+London+W1K+4QF",
  },
  phone: "+44 20 7946 0812",
  phoneHref: "tel:+442079460812",
  email: "hello@aurelia-mayfair.com",
  emailHref: "mailto:hello@aurelia-mayfair.com",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  hours: [
    { days: "Monday", time: "Closed" },
    { days: "Tuesday – Thursday", time: "12:00 – 14:30 · 17:30 – 22:30" },
    { days: "Friday – Saturday", time: "12:00 – 15:00 · 17:30 – 23:00" },
    { days: "Sunday", time: "12:00 – 16:00 · 17:30 – 21:00" },
  ],
  shortHours: [
    { days: "Tue – Sat", time: "12pm – 11pm" },
    { days: "Sunday", time: "12pm – 9pm" },
    { days: "Monday", time: "Closed" },
  ],
  seats: "54 covers · chef's counter · private dining room",
} as const;

export const navLinks = [
  { href: "#about", label: "About", id: "about" },
  { href: "#menu", label: "Menu", id: "menu" },
  { href: "#gallery", label: "Gallery", id: "gallery" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

export const openingTimes = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
] as const;

export const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;
