import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqJsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const slug = "keratynowe-prostowanie-cennik-warszawa";

export const metadata: Metadata = {
  title: "Ile Kosztuje Keratynowe Prostowanie Włosów w Warszawie? Cennik 2026",
  description:
    "Sprawdź cennik keratynowego prostowania włosów w Warszawie 2026. Ile kosztuje keratyna, nanoplastia i silk botox? Royal Beauty Salon — Aleja Stanów Zjednoczonych.",
  keywords: [
    "keratynowe prostowanie włosów cena Warszawa",
    "ile kosztuje keratyna Warszawa",
    "cennik keratynowego prostowania 2026",
    "nanoplastia cena Warszawa",
    "keratyna do włosów Warszawa cennik",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/${slug}`,
  },
  openGraph: {
    type: "article",
    url: `${siteConfig.url}/blog/${slug}`,
    title: "Ile Kosztuje Keratynowe Prostowanie Włosów w Warszawie? Cennik 2026",
    description:
      "Kompletny cennik keratynowego prostowania włosów w Warszawie — od 350 zł. Porównanie cen, zabiegów i metod.",
  },
};

const faqs = [
  {
    q: "Ile kosztuje keratynowe prostowanie włosów w Warszawie?",
    a: "Ceny keratynowego prostowania w Warszawie zaczynają się od 350 zł za włosy krótkie, od 500 zł za średnie i od 700 zł za długie. Dokładna cena zależy od długości, gęstości i stanu włosów.",
  },
  {
    q: "Czym różni się keratyna od nanoplastii?",
    a: "Keratyna zawiera formaldehyd i silniej wygładza. Nanoplastia jest bezformaldehydowa, łagodniejsza dla włosów, a efekty utrzymują się równie długo (3-5 miesięcy). Nanoplastia jest droższa o 10-20%.",
  },
  {
    q: "Jak długo trwa zabieg keratynowego prostowania?",
    a: "Zabieg trwa od 3 do 5 godzin, w zależności od długości i gęstości włosów. W tym czasie: mycie, aplikacja keratynowa, suszenie i prostowanie.",
  },
  {
    q: "Jak często należy powtarzać keratynowe prostowanie?",
    a: "Efekt keratynowego prostowania utrzymuje się 3-5 miesięcy. Zalecamy powtarzanie zabiegu co 3-4 miesiące dla utrzymania optymalnych rezultatów.",
  },
  {
    q: "Czy keratynowe prostowanie niszczy włosy?",
    a: "Nie — profesjonalnie wykonany zabieg jest bezpieczny i może nawet poprawić kondycję włosów dzięki wypełnieniu ubytków keratyną. Ważne, aby wybrać doświadczony salon.",
  },
];

const steps = [
  { name: "Konsultacja i diagnoza", text: "Stylista ocenia stan włosów, porowatość i historię zabiegów. Dobiera odpowiedni produkt (keratyna, nanoplastia lub silk botox)." },
  { name: "Mycie oczyszczające", text: "Włosy są myte specjalnym szamponem głęboko oczyszczającym, który otwiera łuski włosów do absorpcji keratyny." },
  { name: "Aplikacja keratyny", text: "Keratyna jest nakładana pasmo po paśmie na wilgotne włosy, od nasady po same końce." },
  { name: "Suszenie i prostowanie", text: "Włosy są suszone, a następnie prostowane prostownicą ceramiczną w temperaturze 230°C, aby zamknąć keratynę we wnętrzu włosa." },
  { name: "Pielęgnacja domowa", text: "Stylista doradza pielęgnację: szampony bez siarczanów, odżywki nawilżające i unikanie soli/chloru przez pierwsze 72 godziny." },
];

export default function BlogPost() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: metadata.title as string,
          description: metadata.description as string,
          slug,
          image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
          date: "2026-08-27",
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Strona główna", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: "Keratynowe prostowanie cennik", path: `/blog/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Ile kosztuje keratynowe prostowanie włosów w Warszawie",
          description: "Kompletny przewodnik po cenach keratynowego prostowania włosów w Warszawie w 2026 roku.",
          step: steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        }}
      />

      <article className="mx-auto max-w-4xl px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-luxury-black">Strona główna</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-luxury-black">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-luxury-black">Keratynowe prostowanie cennik</span>
        </nav>

        {/* Hero */}
        <header className="mb-12">
          <span className="mb-4 inline-block rounded-full bg-luxury-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-luxury-gold">
            Poradnik cenowy • Warszawa 2026
          </span>
          <h1 className="mb-4 font-playfair text-4xl font-bold leading-tight md:text-5xl">
            Ile Kosztuje Keratynowe Prostowanie Włosów w Warszawie?
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            Kompletny cennik keratynowego prostowania, nanoplastii i silk botox w Warszawie 2026.
            Porównanie cen, zabiegów i metod — od 350 zł.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Aktualizacja: 27 sierpień 2026</span>
            <span>•</span>
            <span>Czas czytania: 8 min</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
            alt="Keratynowe prostowanie włosów w salonie fryzjerskim Warszawa"
            fill
            className="object-cover"
          />
        </div>

        {/* Table of Contents */}
        <div className="mb-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-3 font-playfair text-lg font-bold">Spis treści</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#cennik" className="text-luxury-gold hover:underline">Cennik keratynowego prostowania 2026</a></li>
            <li><a href="#roznice" className="text-luxury-gold hover:underline">Keratyna vs nanoplastia vs silk botox</a></li>
            <li><a href="#przebieg" className="text-luxury-gold hover:underline">Jak przebiega zabieg krok po kroku</a></li>
            <li><a href="#pielegnacja" className="text-luxury-gold hover:underline">Pielęgnacja po zabiegu</a></li>
            <li><a href="#faq" className="text-luxury-gold hover:underline">Najczęściej zadawane pytania</a></li>
          </ul>
        </div>

        {/* Content Section: Cennik */}
        <section id="cennik" className="mb-12">
          <h2 className="mb-4 font-playfair text-2xl font-bold">Cennik keratynowego prostowania w Warszawie 2026</h2>
          <p className="mb-6 text-gray-600">
            Ceny keratynowego prostowania włosów w Warszawie zależą od długości włosów, gęstości i rodzaju użytego produktu.
            Poniżej przedstawiamy orientacyjny cennik obowiązujący w 2026 roku.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl border border-gray-200 text-sm">
              <thead className="bg-luxury-gold/10">
                <tr>
                  <th className="p-4 text-left font-semibold">Zabieg</th>
                  <th className="p-4 text-left font-semibold">Krótkie włosy</th>
                  <th className="p-4 text-left font-semibold">Średnie włosy</th>
                  <th className="p-4 text-left font-semibold">Długie włosy</th>
                  <th className="p-4 text-left font-semibold">Czas trwania</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 font-medium">Keratynowe prostowanie</td>
                  <td className="p-4">od 350 zł</td>
                  <td className="p-4">od 500 zł</td>
                  <td className="p-4">od 700 zł</td>
                  <td className="p-4">3-5h</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Nanoplastia</td>
                  <td className="p-4">od 450 zł</td>
                  <td className="p-4">od 600 zł</td>
                  <td className="p-4">od 800 zł</td>
                  <td className="p-4">4-5h</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Silk Botox</td>
                  <td className="p-4">od 500 zł</td>
                  <td className="p-4">od 600 zł</td>
                  <td className="p-4">od 650 zł</td>
                  <td className="p-4">4-6h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Content Section: Różnice */}
        <section id="roznice" className="mb-12">
          <h2 className="mb-4 font-playfair text-2xl font-bold">Keratyna vs Nanoplastia vs Silk Botox — różnice</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="mb-2 font-playfair text-lg font-bold">Keratyna</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Zawiera formaldehyd</li>
                <li>Najsilniejsze wygładzenie</li>
                <li>Efekt: 3-5 miesięcy</li>
                <li>Cena: od 350 zł</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="mb-2 font-playfair text-lg font-bold">Nanoplastia</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Bez formaldehydu</li>
                <li>Łagodniejsza dla włosów</li>
                <li>Efekt: 3-5 miesięcy</li>
                <li>Cena: od 450 zł</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="mb-2 font-playfair text-lg font-bold">Silk Botox</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Nawilżanie + wygładzanie</li>
                <li>Idealny dla suchych włosów</li>
                <li>Efekt: 3-4 miesiące</li>
                <li>Cena: od 500 zł</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Content Section: Przebieg */}
        <section id="przebieg" className="mb-12">
          <h2 className="mb-4 font-playfair text-2xl font-bold">Jak przebiega zabieg krok po kroku</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-gray-200 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-luxury-gold text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{step.name}</h3>
                  <p className="text-sm text-gray-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mb-12 rounded-2xl bg-luxury-black p-8 text-center text-white">
          <h2 className="mb-3 font-playfair text-2xl font-bold">Umów się na keratynowe prostowanie</h2>
          <p className="mb-6 text-gray-300">Royal Beauty Salon, Aleja Stanów Zjednoczonych 67/D7, Warszawa</p>
          <a
            href={`https://wa.me/48573377659?text=${encodeURIComponent("Dzień dobry, chciałabym umówić się na keratynowe prostowanie włosów.")}`}
            className="inline-block rounded-full bg-luxury-gold px-8 py-3 font-semibold text-luxury-black transition hover:bg-luxury-gold/90"
          >
            Umów wizytę przez WhatsApp
          </a>
        </div>

        {/* FAQ */}
        <section id="faq" className="mb-12">
          <h2 className="mb-6 font-playfair text-2xl font-bold">Najczęściej zadawane pytania</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-gray-200 p-4">
                <summary className="cursor-pointer font-semibold">{faq.q}</summary>
                <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 className="mb-4 font-playfair text-xl font-bold">Powiązane artykuły</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/blog/balayaz-czy-pasemka" className="rounded-xl border border-gray-200 p-4 transition hover:shadow-md">
              <h3 className="font-semibold">Baleaż czy pasemka — co wybrać?</h3>
              <p className="text-sm text-gray-500">Porównanie technik koloryzacji włosów</p>
            </Link>
            <Link href="/blog/jak-dbac-wlosy-po-keratynie" className="rounded-xl border border-gray-200 p-4 transition hover:shadow-md">
              <h3 className="font-semibold">Jak dbać o włosy po keratynowym prostowaniu?</h3>
              <p className="text-sm text-gray-500">Kompletny poradnik pielęgnacji po zabiegu</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
