import React, { useEffect, useState, useRef } from 'react';
import { LINKS, CONTENT } from './constants';
import { ArrowRight, CheckCircle2, ExternalLink, Users, FileText, ChevronUp, Globe, Linkedin, Instagram } from 'lucide-react';

declare global {
  interface Window {
    voiceflow: any;
  }
}

// --- Helper Components ---

const Section = ({ children, className = "", id = "" }: { children?: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Button = ({ href, children, variant = "primary", className = "" }: { href: string, children?: React.ReactNode, variant?: "primary" | "secondary" | "outline", className?: string }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg hover:shadow-emerald-500/30 focus:ring-emerald-500",
    secondary: "bg-white text-emerald-800 shadow-md hover:bg-slate-50 focus:ring-slate-200 border border-slate-100",
    outline: "bg-transparent border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500"
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
};

// --- Functional Components (New) ---

// Header supprimé

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          aria-label="Retour en haut"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

// --- Chatbot Component ---

interface VoiceflowWidgetProps {
  onToggle: (isOpen: boolean) => void;
}

const VoiceflowWidget = ({ onToggle }: VoiceflowWidgetProps) => {
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    const vID = typeof LINKS.voiceflowId === 'string' ? LINKS.voiceflowId : "";
    if (!vID || vID.includes("SCRIPT")) return;

    const initVoiceflow = () => {
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: vID },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        }).then((chat: any) => {
            isLoaded.current = true;
            
            // Fonction pour attacher les écouteurs
            const attachListeners = (api: any) => {
                if (api && typeof api.on === 'function') {
                    api.on('open', () => onToggle(true));
                    api.on('close', () => onToggle(false));
                    return true;
                }
                return false;
            };

            // Essayer d'attacher immédiatement
            let attached = attachListeners(chat) || attachListeners(window.voiceflow.chat);
            
            // Si échoué, réessayer périodiquement pendant 30 secondes
            if (!attached) {
                let attempts = 0;
                const maxAttempts = 120; // 30 secondes
                const interval = setInterval(() => {
                    attempts++;
                    attached = attachListeners(window.voiceflow.chat);
                    if (attached || attempts >= maxAttempts) {
                        clearInterval(interval);
                    }
                }, 250);
            }
        });
      }
    };

    if (document.getElementById('voiceflow-widget-script')) {
       if (window.voiceflow) initVoiceflow();
       return;
    }

    const script = document.createElement("script");
    script.id = 'voiceflow-widget-script';
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.onload = () => setTimeout(initVoiceflow, 200);
    document.body.appendChild(script);
  }, [onToggle]);

  return null;
};

// --- Main Page Components ---

const Hero = () => {
  const isGoogleForm = LINKS.heroImage.includes('forms.gle') || LINKS.heroImage.includes('docs.google.com/forms');
  const getDisplayImageUrl = (url: string) => {
    if (url.includes('drive.google.com') && url.includes('/file/d/')) {
      const idMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
      }
    }
    return url;
  };
  const imageUrl = getDisplayImageUrl(LINKS.heroImage);

  return (
    <Section className="pt-12 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-slide-up order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            {CONTENT.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-teal-700 font-medium">
            {CONTENT.hero.subtitle}
          </p>
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
            {CONTENT.hero.description}
          </p>
          
          <div className="pt-6 border-t border-slate-100">
             <h3 className="text-xl font-bold text-slate-900 mb-3">{CONTENT.form.title}</h3>
             <p className="text-slate-600 mb-6 max-w-lg">{CONTENT.form.text}</p>
             <div className="flex flex-col sm:flex-row gap-4">
                <Button href={LINKS.googleForm1} className="w-full sm:w-auto">
                  Formulaire Entreprise <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
                <Button href={LINKS.googleForm2} variant="outline" className="w-full sm:w-auto">
                  Formulaire Particulier <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
             </div>
          </div>

        </div>
        
        <div className="relative animate-fade-in-delayed group order-1 md:order-2 flex justify-center items-center">
          {isGoogleForm ? (
             <div className="w-full aspect-square md:aspect-auto md:h-[500px] bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 transform hover:-translate-y-1">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-8 ring-4 ring-teal-50">
                    <FileText className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Votre avis est précieux</h3>
                <p className="text-slate-600 mb-8 max-w-xs text-lg leading-relaxed">
                  Aidez-nous à construire le réseau social de demain en répondant à ce questionnaire.
                </p>
                <Button href={LINKS.heroImage} className="w-full md:w-auto shadow-xl">
                    Accéder au questionnaire
                </Button>
             </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
               <img 
                src={imageUrl} 
                alt="Eunoia Visual" 
                className="w-full h-auto object-contain transform transition-transform duration-700 hover:scale-105"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

const Problem = () => (
  <Section id="probleme" className="bg-slate-900 text-white relative overflow-hidden">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none"></div>
    <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-400">
        {CONTENT.problem.title}
      </h2>
      <p className="text-xl leading-relaxed text-slate-300">
        {CONTENT.problem.text}
      </p>
    </div>
  </Section>
);

const Solution = () => (
  <Section id="solution" className="bg-white">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div className="inline-block px-4 py-2 bg-teal-50 rounded-full text-teal-700 font-semibold text-sm tracking-wide uppercase">
          Innovation Sociale
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
          {CONTENT.solution.title}
        </h2>
        <p className="text-lg text-slate-600">
          {CONTENT.solution.intro}
        </p>
      </div>
      <div className="space-y-6">
        {CONTENT.solution.points.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex-shrink-0 mt-1">
              {item.icon}
            </div>
            <p className="text-lg font-medium text-slate-800">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Concept = () => (
  <Section className="bg-teal-50/50">
    <div className="max-w-5xl mx-auto text-center space-y-10">
      <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest">
        {CONTENT.concept.title}
      </h2>
      <blockquote className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight italic">
        "{CONTENT.concept.quote}"
      </blockquote>
      <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"></div>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto">
        {CONTENT.concept.explanation}
      </p>
    </div>
  </Section>
);

const HowItWorks = () => (
  <Section className="bg-white">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{CONTENT.howItWorks.title}</h2>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {CONTENT.howItWorks.blocks.map((block, idx) => (
        <div 
          key={idx} 
          className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 hover:bg-white hover:border-teal-100 transition-all duration-300 border border-slate-100 group"
        >
          <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md transition-all duration-300">
            {block.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">{block.title}</h3>
          <p className="text-slate-600">{block.desc}</p>
        </div>
      ))}
    </div>
  </Section>
);

const Audience = () => (
  <Section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl my-12 mx-4 md:mx-12 lg:mx-24 !max-w-none !w-auto">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{CONTENT.target.title}</h2>
        <div className="space-y-4">
          {CONTENT.target.list.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle2 className="text-teal-400 w-6 h-6 flex-shrink-0" />
              <span className="text-lg text-slate-200">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-full min-h-[300px] bg-slate-800/50 rounded-2xl p-8 flex items-center justify-center border border-slate-700/50">
         <div className="text-center">
            <Users className="w-16 h-16 text-teal-400 mx-auto mb-4 opacity-80" />
            <p className="text-slate-400 italic">"Une communauté construite sur des valeurs partagées."</p>
         </div>
      </div>
    </div>
  </Section>
);

const Impact = () => (
  <Section id="impact" className="bg-white">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{CONTENT.impact.title}</h2>
    </div>
    <div className="grid md:grid-cols-3 gap-8 text-center">
      {CONTENT.impact.sections.map((section, idx) => (
        <div key={idx} className="p-8 rounded-2xl bg-teal-50/30 border border-teal-100/50">
          <h3 className="text-xl font-bold text-teal-800 mb-4">{section.title}</h3>
          <p className="text-slate-700">{section.text}</p>
        </div>
      ))}
    </div>
  </Section>
);

// FormSection removed as per request (moved to Hero)

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-16">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="mb-12 border-b border-slate-800 pb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-6 max-w-2xl">
          <h3 className="text-2xl font-bold text-white">{CONTENT.finalCta.title}</h3>
          <p>{CONTENT.finalCta.text}</p>
        </div>
        
        {/* Social Icons integrated directly in Footer */}
        <div className="flex gap-4">
          <a 
            href={LINKS.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 rounded-full hover:bg-teal-600 hover:text-white transition-all duration-300 text-slate-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href={LINKS.socials.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 rounded-full hover:bg-teal-600 hover:text-white transition-all duration-300 text-slate-300"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} Eunoia. Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isChatOpen]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-teal-200 selection:text-teal-900 bg-slate-50">
      <div className="block">
        {/* Header removed */}
        <main>
            <Hero />
            <Problem />
            <Solution />
            <Concept />
            <HowItWorks />
            <Audience />
            <Impact />
            {/* FormSection removed */}
        </main>
        <Footer />
        <BackToTop />
      </div>

      <VoiceflowWidget onToggle={setIsChatOpen} />
    </div>
  );
}