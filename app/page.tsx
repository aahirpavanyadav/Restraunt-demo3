import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Menu } from "@/components/sections/Menu";
import { Reservation } from "@/components/sections/Reservation";
import { Specialities } from "@/components/sections/Specialities";
import { Testimonials } from "@/components/sections/Testimonials";
import { site } from "@/lib/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurelia-mayfair.example.com";

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
    opens: "12:00",
    closes: "14:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
    opens: "17:30",
    closes: "22:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Friday", "Saturday"],
    opens: "12:00",
    closes: "15:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Friday", "Saturday"],
    opens: "17:30",
    closes: "23:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Sunday",
    opens: "12:00",
    closes: "16:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Sunday",
    opens: "17:30",
    closes: "21:00",
  },
];

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: site.name,
  description:
    "Seasonal European cooking over open fire, grower-led wine and a warm welcome in Mayfair, London.",
  url: siteUrl,
  telephone: site.phone,
  email: site.email,
  image: [`${siteUrl}/images/hero.jpg`, `${siteUrl}/images/interior-warm.jpg`],
  priceRange: "£££",
  servesCuisine: ["Modern European", "Seasonal", "British"],
  acceptsReservations: "True",
  menu: `${siteUrl}/#menu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "London",
    addressRegion: "Mayfair",
    postalCode: "W1K 4QF",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.5092,
    longitude: -0.1476,
  },
  openingHoursSpecification: openingHours,
  sameAs: [site.instagram, site.facebook],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Specialities />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
    </>
  );
}
