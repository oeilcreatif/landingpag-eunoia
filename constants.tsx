import React from 'react';
import { Shield, Heart, Zap, Users, Globe, MessageCircle, ArrowRight } from 'lucide-react';

/**
 * ------------------------------------------------------------------
 * FICHIER DE CONFIGURATION
 * Modifiez les textes et les liens ci-dessous pour personnaliser la page.
 * ------------------------------------------------------------------
 */

export const LINKS = {
  // L'URL de votre logo fournie
  logoUrl: "https://fal.media/files/koala/d9G8_tY4uY3fT6xK2-rV7_image.png",
  
  // Vos liens de formulaires Google
  googleForm1: "https://forms.gle/DB2kB3BpgUehGqhn7",
  googleForm2: "https://forms.gle/GZVSrqargQ9m3tnn8",
  
  // Placeholder pour le bouton principal
  mainCta: "#participer",
  
  // L'image principale (Nouvelle URL fournie)
  heroImage: "https://voeuxtkepiujbqgnugtt.supabase.co/storage/v1/object/sign/eunoialogo/logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMjdlMDAwNy04ZmQ3LTRiN2ItOTZmMC02YTVmYzc0OWFiYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJldW5vaWFsb2dvL2xvZ28ucG5nIiwiaWF0IjoxNzY5NDUwNjMzLCJleHAiOjE4MDA5ODY2MzN9._5qfI9W6J62isQ1crwekd-Hapd6QW8ThSDLOiPT4x0k",

  // CONFIGURATION CHATBOT VOICEFLOW
  // L'ID du projet Voiceflow (extrait du snippet que vous aviez fourni)
  voiceflowId: "6979fe8e6ec8e10f2850a05d",

  // Liens Réseaux Sociaux (Modifiez les liens ci-dessous)
  socials: {
    linkedin: "https://www.linkedin.com/in/paul-debande-%F0%9F%95%8A%EF%B8%8Feunoia-34b216393/",
    instagram: "https://www.instagram.com/eunoia_betterworld/"
  }
};

export const CONTENT = {
  hero: {
    title: "Eunoia – Un nouveau type de réseau social",
    subtitle: "Changer ce qu’un réseau valorise, c’est changer ce que les humains deviennent.",
    description: "Aujourd’hui, les réseaux sociaux récompensent surtout le bruit, la polémique et l’attention à tout prix. Eunoia propose une autre logique : un réseau social pensé pour valoriser les comportements positifs, réduire la toxicité et redonner du sens à nos échanges grâce à l’intelligence artificielle.",
    cta: "Rejoindre le projet"
  },
  problem: {
    title: "Le problème des réseaux sociaux actuels",
    text: "Les réseaux sociaux sont devenus des espaces où la haine, la comparaison et la recherche d’attention prennent souvent le dessus sur le dialogue et la création de valeur. Les algorithmes favorisent ce qui choque ou divise, ce qui pousse à consommer du contenu sans réel impact positif sur les individus ou la société."
  },
  solution: {
    title: "La solution : Eunoia",
    intro: "Eunoia n’est pas un réseau social de plus. C’est un nouveau type de réseau social qui change la logique de ce qui est mis en avant.",
    points: [
      { text: "Limiter la malveillance et les comportements toxiques", icon: <Shield className="w-6 h-6 text-teal-500" /> },
      { text: "Sécuriser les échanges", icon: <MessageCircle className="w-6 h-6 text-teal-500" /> },
      { text: "Valoriser les contenus et les actions positives", icon: <Heart className="w-6 h-6 text-teal-500" /> },
      { text: "Encourager des interactions utiles et respectueuses", icon: <Users className="w-6 h-6 text-teal-500" /> }
    ]
  },
  concept: {
    title: "Une nouvelle logique sociale",
    quote: "Changer ce qu’un réseau valorise, c’est changer ce que les humains deviennent.",
    explanation: "Sur Eunoia, l’objectif n’est pas de capter l’attention à tout prix, mais de créer un environnement où les comportements positifs sont mis en avant et deviennent la norme."
  },
  howItWorks: {
    title: "Comment fonctionne Eunoia ?",
    blocks: [
      { title: "Filtrage intelligent", desc: "Filtrage intelligent des contenus grâce à l’IA", icon: <Zap className="w-8 h-8 text-emerald-600" /> },
      { title: "Espaces constructifs", desc: "Espaces dédiés à l’échange constructif", icon: <MessageCircle className="w-8 h-8 text-emerald-600" /> },
      { title: "Valorisation positive", desc: "Système de valorisation des comportements positifs", icon: <Heart className="w-8 h-8 text-emerald-600" /> },
      { title: "Sécurité & Modération", desc: "Environnement sécurisé et modéré", icon: <Shield className="w-8 h-8 text-emerald-600" /> },
      { title: "Utilité avant tout", desc: "Logique centrée sur l’utilité et la qualité plutôt que sur la viralité", icon: <Globe className="w-8 h-8 text-emerald-600" /> }
    ]
  },
  target: {
    title: "À qui s’adresse Eunoia ?",
    list: [
      "Particuliers souhaitant utiliser un réseau social plus sain",
      "Créateurs de contenu voulant partager du contenu utile",
      "Associations",
      "Marques et entreprises responsables",
      "Projets à impact social ou environnemental"
    ]
  },
  impact: {
    title: "L’impact d’Eunoia",
    sections: [
      { title: "Impact humain", text: "Créer des interactions plus respectueuses et utiles." },
      { title: "Impact social", text: "Réduire la banalisation de la haine et encourager des comportements positifs." },
      { title: "Impact économique", text: "Créer un modèle où la valeur générée bénéficie à des projets et des causes utiles." }
    ]
  },
  form: {
    title: "Participez à la construction d’Eunoia",
    text: "Votre avis est essentiel pour construire un réseau social plus utile et plus sain. Prenez quelques minutes pour répondre au questionnaire et participer au projet."
  },
  socials: {
    title: "Suivez l'aventure",
    text: "Retrouvez-nous sur les réseaux sociaux pour suivre l'avancement du projet Eunoia."
  },
  finalCta: {
    title: "Rejoignez l’aventure Eunoia",
    text: "Eunoia est en cours de construction. Vous pouvez dès maintenant contribuer à son développement et faire partie des premières personnes à soutenir ce nouveau type de réseau social.",
    button: "Participer au projet"
  }
};