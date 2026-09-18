const CLOUD = "yso1mqgu";

function videoUrl(videoId: string, transform = "q_auto,f_auto,w_800") {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${transform}/${videoId}`;
}

export interface WorkVideo {
  src: string;
  poster: string;
  title: string;
  titlePl: string;
  description: string;
  descriptionPl: string;
}

export const workVideos: WorkVideo[] = [
  {
    src: videoUrl("v1789726559/IMG_7287"),
    poster: `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,w_800,q_auto/IMG_7287`,
    title: "Hair Styling & Treatment",
    titlePl: "Stylizacja & Pielęgnacja Włosów",
    description: "Watch our expert stylists transform hair with precision cuts, colouring and luxurious keratin treatments.",
    descriptionPl: "Zobacz naszych ekspertów stylizujących włosy — precyzyjne cięcia, koloryzacja i luksusowe zabiegi keratynowe.",
  },
  {
    src: videoUrl("v1789726563/IMG_7021"),
    poster: `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,w_800,q_auto/IMG_7021`,
    title: "Bridal Makeup",
    titlePl: "Makijaż Ślubny",
    description: "Every bride deserves to feel like royalty — see our bridal artistry come to life.",
    descriptionPl: "Każda panna młoda zasługuje na uczucie królowej — zobacz naszą sztukę ślubną.",
  },
  {
    src: videoUrl("v1789726555/IMG_6254_1"),
    poster: `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,w_800,q_auto/IMG_6254_1`,
    title: "Premium Skincare",
    titlePl: "Premium Pielęgnacja Skóry",
    description: "Glow up with our signature facials, skin treatments and advanced dermatological care.",
    descriptionPl: "Błyszcz dzięki naszym sygnaturowym zabiegom na twarz, pielęgnacji skóry i zaawansowanej opiece dermatologicznej.",
  },
  {
    src: videoUrl("v1789726547/IMG_3014_1"),
    poster: `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,w_800,q_auto/IMG_3014_1`,
    title: "Complete Makeover",
    titlePl: "Kompletna Metamorfoza",
    description: "From head to toe — witness a full royal beauty transformation at our Warsaw salon.",
    descriptionPl: "Od głowy do stóp — zobacz pełną królewską metamorfozę piękna w naszym warszawskim salonie.",
  },
];
