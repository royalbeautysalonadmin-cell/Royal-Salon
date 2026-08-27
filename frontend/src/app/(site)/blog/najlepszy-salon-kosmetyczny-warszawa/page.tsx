import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqJsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const slug = "najlepszy-salon-kosmetyczny-warszawa";

export const metadata: Metadata = {
  title: "Najlepszy Salon Kosmetyczny w Warszawie — Ranking 2026",
  description:
    "Odkryj najlepszy salon kosmetyczny w Warszawie 2026. Porównanie usług, cen, lokalizacji i opinii. Royal Beauty Salon — centrum urody na Alei Stanów Zjednoczonych.",
  keywords: [
    "najlepszy salon kosmetyczny Warszawa",
    "salon kosmetyczny Warszawa ranking",
    "salon urody Warszawa polecany",
    "gdzie iść do kosmetyczki Warszawa",
    "najlepsza kosmetyczka w Warszawie",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/${slug}`,
  },
  openGraph: {
    type: "article",
    url: `${siteConfig.url}/blog/${slug}`,
    title: "Najlepszy Salon Kosmetyczny w Warszawie — Ranking 2026",
    description:
      "Porównanie najlepszych salonów kosmetycznych w Warszawie — usługi, ceny, lokalizacja i opinie klientów.",
  },
};

const faqs = [
  {
    q: "Jaki jest najlepszy salon kosmetyczny w Warszawie?",
    a: "Wybór najlepszego salonu zależy od Twoich potrzeb. Royal Beauty Salon wyróżnia się szerokim zakresem usług (55+ zabiegów), lokalizacją w centrum Warszawy, doświadczonym zespołem i oceną 4.9/5 na podstawie 1280 opinii.",
  },
  {
    q: "Ile kosztuje wizyta w salonie kosmetycznym w Warszawie?",
    a: "Ceny wahają się od 50 zł za podstawowe zabiegi (cleanup, henna) do 700+ zł za zaawansowane zabiegi (keratyna, nanoplastia). Royal Beauty Salon oferuje konkurencyjne ceny przy premium jakości usług.",
  },
  {
    q: "Jak znaleźć dobry salon kosmetyczny w Warszawie?",
    a: "Sprawdź opinie Google, portfolio na Instagramie, zakres usług, higienę salonu i doświadczenie personelu. Warto też umówić się na konsultację przed pierwszym zabiegiem.",
  },
  {
    q: "Czy warto jechać do salonu kosmetycznego w centrum Warszawy?",
    a: "Tak — salony w centrum oferują lepszy dojazd komunikacją miejską, szerszy zakres usług i często wyższy standard. Royal Beauty Salon na Alei Stanów Zjednoczonych ma bezpłatny parking i łatwy dojazd z każdej dzielnicy.",
  },
];

const comparisonData = [
  { criterion: "Zakres usług", royal: "55+ zabiegów", avg: "15-25 zabiegów" },
  { criterion: "Lokalizacja", royal: "Centrum Warszawy", avg: "Różne dzielnice" },
  { criterion: "Parking", royal: "Bezpłatny", avg: "Brak lub płatny" },
  { criterion: "Ocena Google", royal: "4.9/5 (1280 opinii)", avg: "4.5-4.8/5" },
  { criterion: "Godziny otwarcia", royal: "Pon-Nd 11-18", avg: "Pon-Pt 9-19" },
  { criterion: "Języki", royal: "PL, EN, Hindi", avg: "PL" },
];

export default function BlogPost() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: metadata.title as string,
          description: metadata.description as string,
          slug,
          image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=80",
          date: "2026-08-27",
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Strona główna", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: "Najlepszy salon kosmetyczny", path: `/blog/${slug}` },
        ])}
      />

      <article className="mx-auto max-w-4xl px-4 py-16">
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-luxury-black">Strona główna</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-luxury-black">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-luxury-black">Najlepszy salon kosmetyczny</span>
        </nav>

        <header className="mb-12">
          <span className="mb-4 inline-block rounded-full bg-luxury-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-luxury-gold">
            Ranking • Warszawa 2026
          </span>
          <h1 className="mb-4 font-playfair text-4xl font-bold leading-tight md:text-5xl">
            Najlepszy Salon Kosmetyczny w Warszawie — Ranking 2026
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            Porównanie najlepszych salonów kosmetycznych w Warszawie — usługi, ceny, lokalizacja i opinie klientów.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Aktualizacja: 27 sierpień 2026</span>
            <span>•</span>
            <span>Czas czytania: 10 min</span>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 font-playfair text-2xl font-bold">Co wyróżnia dobry salon kosmetyczny?</h2>
          <p className="mb-4 text-gray-600">
            Wybierając salon kosmetyczny w Warszawie, warto zwrócić uwagę na kilka kluczowych czynników: zakres usług,
            doświadczenie personelu, higienę, lokalizację i opinie klientów. Nie wystarczy piękne wnętrze — liczy się
            jakość zabiegów i indywidualne podejście.
          </p>
          <ul className="mb-6 space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="mt-1 text-luxury-gold">✓</span> Szeroki zakres usług pod jednym dachem</li>
            <li className="flex items-start gap-2"><span className="mt-1 text-luxury-gold">✓</span> Doświadczeni, certyfikowani specjaliści</li>
            <li className="flex items-start gap-2"><span className="mt-1 text-luxury-gold">✓</span> Sterylne warunki i certyfikowane produkty</li>
            <li className="flex items-start gap-2"><span className="mt-1 text-luxury-gold">✓</span> Dogodna lokalizacja i dojazd</li>
            <li className="flex items-start gap-2"><span className="mt-1 text-luxury-gold">✓</span> Wysokie opinie Google (4.8+)</li>
            <li className="flex items-start gap-2"><span className="mt-1 text-luxury-gold">✓</span> Elastyczne godziny otwarcia</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-playfair text-2xl font-bold">Porównanie salonów — Royal Beauty Salon vs średnia rynkowa</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl border border-gray-200 text-sm">
              <thead className="bg-luxury-gold/10">
                <tr>
                  <th className="p-4 text-left font-semibold">Kryterium</th>
                  <th className="p-4 text-left font-semibold">Royal Beauty Salon</th>
                  <th className="p-4 text-left font-semibold">Średnia w Warszawie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 font-medium">{row.criterion}</td>
                    <td className="p-4 text-luxury-gold">{row.royal}</td>
                    <td className="p-4 text-gray-500">{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-playfair text-2xl font-bold">Dlaczego Royal Beauty Salon?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="mb-2 font-playfair text-lg font-bold">55+ zabiegów w jednym miejscu</h3>
              <p className="text-sm text-gray-600">Od koloryzacji i keratyny, przez manicure i pedicure, po makijaż ślubny i depilację — wszystko pod jednym dachem.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="mb-2 font-playfair text-lg font-bold">Centrum Warszawy</h3>
              <p className="text-sm text-gray-600">Aleja Stanów Zjednoczonych 67/D7 — łatwy dojazd metro, autobusem lub samochodem. Bezpłatny parking.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="mb-2 font-playfair text-lg font-bold">4.9/5 ocena Google</h3>
              <p className="text-sm text-gray-600">1280+ opinii od zadowolonych klientów. Najwyżej oceniany salon w okolicy.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="mb-2 font-playfair text-lg font-bold">Otwarty codziennie</h3>
              <p className="text-sm text-gray-600">Poniedziałek–Niedziela 11:00–18:00. Elastyczne terminy, w tym weekendy.</p>
            </div>
          </div>
        </section>

        <div className="mb-12 rounded-2xl bg-luxury-black p-8 text-center text-white">
          <h2 className="mb-3 font-playfair text-2xl font-bold">Umów wizytę w najlepszym salonie</h2>
          <p className="mb-6 text-gray-300">Royal Beauty Salon, Aleja Stanów Zjednoczonych 67/D7, Warszawa</p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-luxury-gold px-8 py-3 font-semibold text-luxury-black transition hover:bg-luxury-gold/90"
          >
            Skontaktuj się z nami
          </Link>
        </div>

        <section id="faq" className="mb-12">
          <h2 className="mb-6 font-playfair text-2xl font-bold">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-gray-200 p-4">
                <summary className="cursor-pointer font-semibold">{faq.q}</summary>
                <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
