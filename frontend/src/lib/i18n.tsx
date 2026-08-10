"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

type Lang = "en" | "pl";

interface LanguageCtx {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home": { en: "Home", pl: "Strona Główna" },
  "nav.about": { en: "About", pl: "O Nas" },
  "nav.services": { en: "Services", pl: "Usługi" },
  "nav.packages": { en: "Packages", pl: "Pakiety" },
  "nav.blog": { en: "Blog", pl: "Blog" },
  "nav.contact": { en: "Contact", pl: "Kontakt" },

  // Hero
  "hero.badge": { en: "Warsaw's Premier Luxury Beauty Destination", pl: "Premierowy Luksusowy Salon Piękności w Warszawie" },
  "hero.h1": { en: "Luxury Beauty Salon", pl: "Luksusowy Salon Piękności" },
  "hero.h1.city": { en: "in", pl: "w" },
  "hero.h1.cityName": { en: "Warsaw", pl: "Warszawie" },
  "hero.desc": { en: "Experience luxury beauty treatments, bridal makeovers, premium skincare, and professional artistry — crafted by award-winning specialists in the heart of Warsaw.", pl: "Doświadcz luksusowych zabiegów pielęgnacyjnych, makijażu ślubnego, premium skincare i profesjonalnej sztuki — tworzonych przez nagradzanych specjalistów w sercu Warszawy." },
  "hero.book": { en: "Book Appointment", pl: "Umów Wizytę" },
  "hero.explore": { en: "Explore Services", pl: "Zobacz Usługi" },
  "hero.rating": { en: "from 1,280+ happy clients", pl: "od ponad 1280 zadowolonych klientek" },
  "hero.scroll": { en: "Scroll", pl: "Przewiń" },

  // Services
  "services.heading": { en: "Our Services", pl: "Nasze Usługi" },
  "services.subtitle": { en: "Discover our full menu of luxury beauty treatments in Warsaw", pl: "Odkryj nasz pełen menu luksusowych zabiegów pielęgnacyjnych w Warszawie" },
  "services.all": { en: "All Services", pl: "Wszystkie Usługi" },
  "services.bookNow": { en: "Book Now", pl: "Rezerwuj" },
  "services.from": { en: "from", pl: "od" },
  "services.popular": { en: "Popular", pl: "Popularne" },
  "services.details": { en: "Details", pl: "Szczegóły" },
  "services.unavailable": { en: "Unavailable", pl: "Niedostępne" },
  "services.search": { en: "Search services (e.g. keratin, facial, waxing...)", pl: "Szukaj usług (np. keratyna, facial, woskowanie...)" },
  "services.filters": { en: "Filters", pl: "Filtry" },
  "services.clearAll": { en: "Clear all", pl: "Wyczyść wszystko" },
  "services.sortBy": { en: "Sort by", pl: "Sortuj wg" },
  "services.mostPopular": { en: "Most Popular", pl: "Najpopularniejsze" },
  "services.priceLow": { en: "Price: Low to High", pl: "Cena: od najniższej" },
  "services.priceHigh": { en: "Price: High to Low", pl: "Cena: od najwyższej" },
  "services.shortest": { en: "Shortest First", pl: "Najkrótsze" },
  "services.showing": { en: "Showing", pl: "Wyświetlanie" },
  "services.noResults": { en: "No services found", pl: "Nie znaleziono usług" },
  "services.tryAdjusting": { en: "Try adjusting your search or filters", pl: "Spróbuj zmienić wyszukiwanie lub filtry" },
  "services.clearFilters": { en: "Clear all filters", pl: "Wyczyść wszystkie filtry" },
  "services.count": { en: "service", pl: "usługa" },

  // Contact
  "contact.heading": { en: "Get in Touch", pl: "Skontaktuj Się" },
  "contact.subtitle": { en: "Visit us or send a message — we'd love to hear from you", pl: "Odwiedź nas lub napisz — chętnie usłyszymy od Ciebie" },
  "contact.name": { en: "Your Name", pl: "Twoje Imię" },
  "contact.email": { en: "Email", pl: "Email" },
  "contact.phone": { en: "Phone (optional)", pl: "Telefon (opcjonalnie)" },
  "contact.message": { en: "Message", pl: "Wiadomość" },
  "contact.send": { en: "Send Message", pl: "Wyślij Wiadomość" },
  "contact.sending": { en: "Sending...", pl: "Wysyłanie..." },
  "contact.visit": { en: "Visit our salon", pl: "Odwiedź nasz salon" },
  "contact.whatsapp": { en: "Chat on WhatsApp", pl: "Napisz na WhatsApp" },

  // Footer
  "footer.explore": { en: "Explore", pl: "Odkrywaj" },
  "footer.services": { en: "Services", pl: "Usługi" },
  "footer.inWarsaw": { en: "In Warsaw", pl: "W Warszawie" },
  "footer.contact": { en: "Contact", pl: "Kontakt" },
  "footer.tagline": { en: "Warsaw's destination for luxury beauty treatments, bridal artistry and professional beauty training.", pl: "Warszawski adres dla luksusowych zabiegów pielęgnacyjnych, sztuki ślubnej i profesjonalnego szkolenia beauty." },

  // Stats
  "stats.years": { en: "Years Experience", pl: "Lat Doświadczenia" },
  "stats.clients": { en: "Happy Clients", pl: "Zadowolonych Klientek" },
  "stats.services": { en: "Services", pl: "Usług" },
  "stats.rating": { en: "Average Rating", pl: "Średnia Ocena" },

  // Booking
  "booking.title": { en: "Book Appointment", pl: "Umów Wizytę" },
  "booking.name": { en: "Full Name", pl: "Imię i Nazwisko" },
  "booking.email": { en: "Email", pl: "Email" },
  "booking.phone": { en: "Phone", pl: "Telefon" },
  "booking.service": { en: "Service", pl: "Usługa" },
  "booking.date": { en: "Preferred Date", pl: "Preferowana Data" },
  "booking.time": { en: "Preferred Time", pl: "Preferowana Godzina" },
  "booking.notes": { en: "Notes (optional)", pl: "Notatki (opcjonalnie)" },
  "booking.submit": { en: "Confirm Booking", pl: "Potwierdź Rezerwację" },
  "booking.creating": { en: "Booking...", pl: "Rezerwowanie..." },

  // Why Choose Us
  "why.heading": { en: "Why Choose Us", pl: "Dlaczego My" },
  "why.title": { en: "The Royal Difference", pl: "Królewskia Różnica" },
  "why.description": { en: "Every detail is designed to deliver an unmatched luxury beauty experience you can trust.", pl: "Każdy detal jest zaprojektowany, aby zapewnić niezrównane luksusowe doświadczenie kosmetyczne." },

  // Testimonials
  "testimonials.heading": { en: "What Our Clients Say", pl: "Co Mówią Nasi Klienci" },
  "testimonials.title": { en: "Loved by Thousands", pl: "Pokochani przez Tysiące" },
  "testimonials.description": { en: "Real words from the clients and graduates who trust us with their beauty in Warsaw.", pl: "Prawdziwe słowa od klientów i absolwentów, którzy powierzają nam swoją urodę w Warszawie." },

  // Packages
  "packages.heading": { en: "Beauty Packages", pl: "Pakiety Urodowe" },
  "packages.title": { en: "Curated Luxury Packages", pl: "Kurowane Pakiety Luksusowe" },
  "packages.description": { en: "Thoughtfully bundled experiences offering exceptional value for brides, members and seasonal pampering in Warsaw.", pl: "Starannie dobrane pakiety oferujące wyjątkową wartość dla panien młodych, członków i sezonowych zabiegów w Warszawie." },
  "packages.includes": { en: "Includes", pl: "Zawiera" },
  "packages.select": { en: "Select Package", pl: "Wybierz Pakiet" },
  "packages.book": { en: "Book This Package", pl: "Zarezerwuj Ten Pakiet" },

  // Gallery
  "gallery.heading": { en: "Our Gallery", pl: "Nasza Galeria" },
  "gallery.title": { en: "Moments of Royal Beauty", pl: "Momenty Królewskiego Piękna" },
  "gallery.description": { en: "A glimpse into our artistry — from breathtaking bridals to flawless everyday glamour in Warsaw.", pl: "Wgląd w naszą sztukę — od oszałamiających ślubów po nieskazitelny codzienny blask w Warszawie." },

  // Amenities
  "amenities.heading": { en: "Salon Amenities", pl: "Udogodnienia Salonu" },
  "amenities.title": { en: "Everything You Need", pl: "Wszystko, Czego Potrzebujesz" },
  "amenities.description": { en: "We've thought of every detail to make your visit to our Warsaw salon comfortable, convenient and truly luxurious.", pl: "Pomyśleliśmy o każdym detalu, aby wizyta w naszym warszawskim salonie była komfortowa, wygodna i prawdziwie luksusowa." },

  // CTA
  "cta.title": { en: "Ready to book your appointment?", pl: "Gotowa na umówienie wizyty?" },
  "cta.description": { en: "Reserve your spot at Royal Beauty Salon in central Warsaw. Walk-ins welcome, but booking ahead guarantees your preferred time.", pl: "Zarezerwuj termin w Royal Beauty Salon w centrum Warszawy. Klienci bez wcześniejszej rezerwacji są mile widziani, ale rezerwacja z wyprzedzeniem gwarantuje dogodny termin." },
  "cta.book": { en: "Book Now", pl: "Rezerwuj" },
  "cta.whatsapp": { en: "WhatsApp Us", pl: "Napisz na WhatsApp" },
  "cta.contact": { en: "Contact Us", pl: "Kontakt" },
  "cta.message": { en: "Ready to transform your look? Book your appointment today!", pl: "Gotowa na metamorfozę? Umów wizytę już dziś!" },

  // Generic
  "learnMore": { en: "Learn more", pl: "Dowiedz się więcej" },
  "viewAll": { en: "View all", pl: "Zobacz wszystkie" },
  "loading": { en: "Loading...", pl: "Ładowanie..." },
  "close": { en: "Close", pl: "Zamknij" },
  "exploreOther": { en: "Explore other services", pl: "Zobacz inne usługi" },
  "viewAllServices": { en: "View all services", pl: "Zobacz wszystkie usługi" },
};

const LanguageContext = createContext<LanguageCtx>({
  lang: "en",
  toggle: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "en" ? "pl" : "en"));
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, toggle, t }), [lang, toggle, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
