"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react";

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
  "nav.tools": { en: "Tools", pl: "Narzędzia" },
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
  "services.title": { en: "Premium Beauty Treatments", pl: "Premium Zabiegi Piękności" },
  "services.description": { en: "From hair artistry to advanced skincare, every service is delivered with luxury, precision and care. Browse our complete menu of treatments.", pl: "Od sztuki fryzjerskiej po zaawansowaną pielęgnację skóry, każdy zabieg jest wykonywany z luksusem, precyzją i troską. Przeglądaj nasze pełne menu zabiegów." },
  "services.subtitle": { en: "Discover our full menu of luxury beauty treatments in Warsaw", pl: "Odkryj nasz pełen menu luksusowych zabiegów pielęgnacyjnych w Warszawie" },
  "services.all": { en: "All Services", pl: "Wszystkie Usługi" },
  "services.bookNow": { en: "Book Now", pl: "Rezerwuj" },
  "services.from": { en: "from", pl: "od" },
  "services.popular": { en: "Popular", pl: "Popularne" },
  "services.details": { en: "Details", pl: "Szczegóły" },
  "services.unavailable": { en: "Unavailable", pl: "Niedostępne" },
  "services.unavailableMsg": { en: "This service is currently unavailable. Please check back later or contact us for details.", pl: "Ta usługa jest obecnie niedostępna. Sprawdź ponownie później lub skontaktuj się z nami." },
  "services.search": { en: "Search services (e.g. keratin, facial, waxing...)", pl: "Szukaj usług (np. keratyna, facial, woskowanie...)" },
  "services.filters": { en: "Filters", pl: "Filtry" },
  "services.clearAll": { en: "Clear all", pl: "Wyczyść wszystko" },
  "services.sortBy": { en: "Sort by", pl: "Sortuj wg" },
  "services.mostPopular": { en: "Most Popular", pl: "Najpopularniejsze" },
  "services.priceLow": { en: "Price: Low to High", pl: "Cena: od najniższej" },
  "services.priceHigh": { en: "Price: High to Low", pl: "Cena: od najwyższej" },
  "services.shortest": { en: "Shortest First", pl: "Najkrótsze" },
  "services.showing": { en: "Showing", pl: "Wyświetlanie" },
  "services.count": { en: "service", pl: "usługa" },
  "services.noResults": { en: "No services found", pl: "Nie znaleziono usług" },
  "services.tryAdjusting": { en: "Try adjusting your search or filters", pl: "Spróbuj zmienić wyszukiwanie lub filtry" },
  "services.clearFilters": { en: "Clear all filters", pl: "Wyczyść wszystkie filtry" },
  "services.quickView": { en: "Quick View", pl: "Szybki Podgląd" },
  "services.signature": { en: "Signature", pl: "Sygnatura" },
  "services.save": { en: "Save", pl: "Oszczędź" },
  "services.addedFav": { en: "Added to favorites", pl: "Dodano do ulubionych" },
  "services.removedFav": { en: "Removed from favorites", pl: "Usunięto z ulubionych" },
  "services.category": {
    en: "Category",
    pl: "Kategoria",
  },
  "services.cat.hair": { en: "Hair", pl: "Włosy" },
  "services.cat.makeup": { en: "Makeup & Styling", pl: "Makijaż & Stylizacja" },
  "services.cat.threading": { en: "Threading", pl: "Nitkowanie" },
  "services.cat.waxing": { en: "Waxing", pl: "Woskowanie" },
  "services.cat.facial": { en: "Facial & Skin Care", pl: "Twarz & Pielęgnacja Skóry" },
  "services.cat.nails": { en: "Manicure & Pedicure", pl: "Manicure & Pedicure" },
  "services.tagline.hair": { en: "Styling, colouring, treatments & more", pl: "Stylizacja, koloryzacja, zabiegi i więcej" },
  "services.tagline.makeup": { en: "Party, bridal & HD makeup artistry", pl: "Makijaż imprezowy, ślubny i HD" },
  "services.tagline.threading": { en: "Precision shaping for brows & face", pl: "Precyzyjne modelowanie brwi i twarzy" },
  "services.tagline.waxing": { en: "Smooth, hair-free skin all year", pl: "Gładka skóra bez włosów przez cały rok" },
  "services.tagline.facial": { en: "Glow with our signature facials", pl: "Błyszcz dzięki naszym sygnałowym zabiegom na twarz" },
  "services.tagline.nails": { en: "Nail care & pampering for hands & feet", pl: "Pielęgnacja paznokci i rozpieszczanie dłoni i stóp" },

  // Contact
  "contact.heading": { en: "Get in Touch", pl: "Skontaktuj Się" },
  "contact.subtitle": { en: "Visit us or send a message — we'd love to hear from you", pl: "Odwiedź nas lub napisz — chętnie usłyszymy od Ciebie" },
  "contact.title": { en: "Visit Our Luxury Salon", pl: "Odwiedź Nasz Luksusowy Salon" },
  "contact.titleDesc": { en: "We'd love to welcome you. Reach out, book a visit, or simply say hello.", pl: "Chętnie Cię powitamy. Skontaktuj się, umów wizytę lub po prostu powiedz cześć." },
  "contact.name": { en: "Your Name", pl: "Twoje Imię" },
  "contact.email": { en: "Email", pl: "Email" },
  "contact.phone": { en: "Phone (optional)", pl: "Telefon (opcjonalnie)" },
  "contact.message": { en: "Message", pl: "Wiadomość" },
  "contact.send": { en: "Send Message", pl: "Wyślij Wiadomość" },
  "contact.sending": { en: "Sending...", pl: "Wysyłanie..." },
  "contact.visit": { en: "Visit our salon", pl: "Odwiedź nasz salon" },
  "contact.whatsapp": { en: "Chat on WhatsApp", pl: "Napisz na WhatsApp" },
  "contact.callUs": { en: "Call Us", pl: "Zadzwoń" },
  "contact.emailUs": { en: "Email Us", pl: "Napisz Email" },
  "contact.openMaps": { en: "Open in Google Maps", pl: "Otwórz w Google Maps" },
  "contact.openingHours": { en: "Opening Hours", pl: "Godziny Otwarcia" },
  "contact.sendMessage": { en: "Send Us a Message", pl: "Wyślij Wiadomość" },
  "contact.namePlaceholder": { en: "Your name", pl: "Twoje imię" },
  "contact.phonePlaceholder": { en: "+48 ...", pl: "+48 ..." },
  "contact.emailPlaceholder": { en: "you@email.com", pl: "ty@email.com" },
  "contact.helpPlaceholder": { en: "How can we help you?", pl: "Jak możemy Ci pomóc?" },
  "contact.faq": { en: "Frequently Asked", pl: "Najczęściej Zadawane" },
  "contact.successMsg": { en: "Message sent! We'll be in touch shortly.", pl: "Wiadomość wysłana! Wkrótce się odezwiemy." },
  "contact.errorMsg": { en: "Something went wrong. Please try again or WhatsApp us.", pl: "Coś poszło nie tak. Spróbuj ponownie lub napisz na WhatsApp." },

  // Footer
  "footer.explore": { en: "Explore", pl: "Odkrywaj" },
  "footer.services": { en: "Services", pl: "Usługi" },
  "footer.inWarsaw": { en: "In Warsaw", pl: "W Warszawie" },
  "footer.contact": { en: "Contact", pl: "Kontakt" },
  "footer.tagline": { en: "Warsaw's destination for luxury beauty treatments, bridal artistry and professional beauty training.", pl: "Warszawski adres dla luksusowych zabiegów pielęgnacyjnych, sztuki ślubnej i profesjonalnego szkolenia beauty." },
  "footer.popular": { en: "Popular in Warsaw", pl: "Popularne w Warszawie" },
  "footer.rights": { en: "All rights reserved.", pl: "Wszelkie prawa zastrzeżone." },
  "footer.privacy": { en: "Privacy Policy", pl: "Polityka Prywatności" },
  "footer.terms": { en: "Terms of Service", pl: "Regulamin" },
  "footer.admin": { en: "Admin", pl: "Admin" },

  // Stats
  "stats.years": { en: "Years Experience", pl: "Lat Doświadczenia" },
  "stats.clients": { en: "Happy Clients", pl: "Zadowolonych Klientek" },
  "stats.services": { en: "Services", pl: "Usług" },
  "stats.rating": { en: "Average Rating", pl: "Średnia Ocena" },

  // Booking
  "booking.title": { en: "Book Appointment", pl: "Umów Wizytę" },
  "booking.dialogTitle": { en: "Book Your Appointment", pl: "Umów Swoją Wizytę" },
  "booking.srTitle": { en: "Book an Appointment", pl: "Umów Wizytę" },
  "booking.name": { en: "Full Name", pl: "Imię i Nazwisko" },
  "booking.email": { en: "Email", pl: "Email" },
  "booking.phone": { en: "Phone", pl: "Telefon" },
  "booking.service": { en: "Service", pl: "Usługa" },
  "booking.date": { en: "Preferred Date", pl: "Preferowana Data" },
  "booking.time": { en: "Preferred Time", pl: "Preferowana Godzina" },
  "booking.notes": { en: "Notes (optional)", pl: "Notatki (opcjonalnie)" },
  "booking.submit": { en: "Confirm Booking", pl: "Potwierdź Rezerwację" },
  "booking.creating": { en: "Booking...", pl: "Rezerwowanie..." },
  "booking.stepService": { en: "Service", pl: "Usługa" },
  "booking.stepDate": { en: "Date", pl: "Data" },
  "booking.stepTime": { en: "Time", pl: "Godzina" },
  "booking.stepDetails": { en: "Details", pl: "Szczegóły" },
  "booking.stepConfirm": { en: "Confirm", pl: "Potwierdź" },
  "booking.chooseTreatment": { en: "Choose your treatment", pl: "Wybierz zabieg" },
  "booking.loadingServices": { en: "Loading services...", pl: "Ładowanie usług..." },
  "booking.noServices": { en: "No services are available to book right now. Please call or WhatsApp us directly.", pl: "Brak dostępnych usług do rezerwacji. Zadzwoń lub napisz na WhatsApp." },
  "booking.searchServices": { en: "Search services...", pl: "Szukaj usług..." },
  "booking.selectDate": { en: "Select a date", pl: "Wybierz datę" },
  "booking.chooseTime": { en: "Choose a time", pl: "Wybierz godzinę" },
  "booking.checkingAvail": { en: "Checking availability...", pl: "Sprawdzanie dostępności..." },
  "booking.closedDay": { en: "We're closed on this date. Please go back and pick another day.", pl: "Jesteśmy zamknięci w tym dniu. Wróć i wybierz inny dzień." },
  "booking.greyedHint": { en: "Greyed-out times are already booked or unavailable.", pl: "Przygaszone godziny są już zarezerwowane lub niedostępne." },
  "booking.fullName": { en: "Full Name *", pl: "Imię i Nazwisko *" },
  "booking.yourName": { en: "Your name", pl: "Twoje imię" },
  "booking.phoneLabel": { en: "Phone *", pl: "Telefon *" },
  "booking.phonePlaceholder": { en: "+48 ...", pl: "+48 ..." },
  "booking.emailLabel": { en: "Email *", pl: "Email *" },
  "booking.emailPlaceholder": { en: "you@email.com", pl: "ty@email.com" },
  "booking.notesLabel": { en: "Notes (optional)", pl: "Notatki (opcjonalnie)" },
  "booking.notesPlaceholder": { en: "Any preferences or requests...", pl: "Wszelkie preferencje lub prośby..." },
  "booking.confirmDetails": { en: "Please confirm your details", pl: "Potwierdź swoje dane" },
  "booking.labelService": { en: "Service", pl: "Usługa" },
  "booking.labelPrice": { en: "Price", pl: "Cena" },
  "booking.labelDate": { en: "Date", pl: "Data" },
  "booking.labelTime": { en: "Time", pl: "Godzina" },
  "booking.labelName": { en: "Name", pl: "Imię" },
  "booking.labelPhone": { en: "Phone", pl: "Telefon" },
  "booking.labelEmail": { en: "Email", pl: "Email" },
  "booking.labelNotes": { en: "Notes", pl: "Notatki" },
  "booking.cancel": { en: "Cancel", pl: "Anuluj" },
  "booking.back": { en: "Back", pl: "Wstecz" },
  "booking.continue": { en: "Continue", pl: "Dalej" },
  "booking.confirmed": { en: "Booking Confirmed!", pl: "Rezerwacja Potwierdzona!" },
  "booking.thankYou": { en: "Thank you for booking with Royal Beauty Salon. We've received your request and sent a confirmation to your email. Our team will contact you shortly.", pl: "Dziękujemy za rezerwację w Royal Beauty Salon. Otrzymaliśmy Twoje zgłoszenie i wysłaliśmy potwierdzenie na Twój email. Nasz team skontaktuje się wkrótce." },
  "booking.done": { en: "Done", pl: "Gotowe" },

  // Quick View Modal
  "quickView.viewDetails": { en: "View Full Details", pl: "Zobacz Pełne Szczegóły" },
  "quickView.bookNow": { en: "Book Now", pl: "Rezerwuj" },
  "quickView.unavailable": { en: "Currently Unavailable", pl: "Obecnie Niedostępne" },

  // Sticky Book Bar
  "stickyBar.desktop": { en: "Ready to book your beauty appointment?", pl: "Gotowa na rezerwację wizyty?" },
  "stickyBar.mobile": { en: "Book your appointment", pl: "Umów wizytę" },
  "stickyBar.bookNow": { en: "Book Now", pl: "Rezerwuj" },

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
  "packages.mostPopular": { en: "Most Popular", pl: "Najpopularniejszy" },

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

const STORAGE_KEY = "royal-lang";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "pl" || stored === "en") return stored;
  return "en";
}

const LanguageContext = createContext<LanguageCtx>({
  lang: "en",
  toggle: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

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
