import { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  User, 
  MessageSquare, 
  Send, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Terminal,
  Zap
} from "lucide-react";

// TypeScript declaration for grecaptcha
declare global {
  interface Window {
    grecaptcha?: any;
    emailjs?: any;
  }
}

export default function ContactSection() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  // État du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // États de soumission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null); // 'success' | 'error' | null
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  // Ref pour reCAPTCHA
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const EMAILJS_SERVICE_ID = "service_6oq0y6s";
  const EMAILJS_TEMPLATE_ID = "template_w2fxfh8";
  const EMAILJS_PUBLIC_KEY = "3kZ4Hi3V6-58FEFKJ";

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const newIsDark = document.documentElement.classList.contains('dark');
          setIsDark(newIsDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Charger le script reCAPTCHA
    loadRecaptchaScript();

    return () => {
      observer.disconnect();
    };
  }, []);

  // Charger le script Google reCAPTCHA
  const loadRecaptchaScript = () => {
    if (window.grecaptcha) {
      renderRecaptcha();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      renderRecaptcha();
    };
    document.head.appendChild(script);
  };

  // Rendre le widget reCAPTCHA
  const renderRecaptcha = () => {
    if (window.grecaptcha && recaptchaRef.current) {
      // Nettoyer le widget existant
      recaptchaRef.current.innerHTML = '';
      
    interface RecaptchaRenderOptions {
        sitekey: string;
        theme: 'light' | 'dark';
        callback: (token: string) => void;
        'expired-callback': () => void;
    }

    window.grecaptcha.render(
        recaptchaRef.current as HTMLDivElement,
        {
            sitekey: "6Lcs2rArAAAAANf_zT7Lq4YGmLQsta1fLl6-ngJj",
            theme: isDark ? 'dark' : 'light',
            callback: (token: string) => {
                setRecaptchaToken(token);
                // Effacer l'erreur reCAPTCHA si elle existe
                if (errors.recaptcha) {
                    setErrors((prev: Record<string, string>) => ({
                        ...prev,
                        recaptcha: ''
                    }));
                }
            },
            'expired-callback': () => {
                setRecaptchaToken(null);
            }
        } as RecaptchaRenderOptions
    );
    }
  };

  // Re-rendre reCAPTCHA quand le thème change
  useEffect(() => {
    if (window.grecaptcha && recaptchaRef.current) {
      setTimeout(() => renderRecaptcha(), 100);
    }
  }, [isDark]);

  // Gérer les changements du formulaire
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer les erreurs lors de la saisie
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = isDark ? "// Name is required" : "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = isDark ? "// Email is required" : "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isDark ? "// Invalid email format" : "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = isDark ? "// Message is required" : "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = isDark ? "// Too short (min 10 chars)" : "Message is too short (minimum 10 characters)";
    }

    if (!recaptchaToken) {
      newErrors.recaptcha = isDark ? "// Captcha is required" : "Complete reCAPTCHA";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumettre le formulaire avec EmailJS
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Charger EmailJS si pas encore fait
      if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        await new Promise((resolve) => {
          script.onload = resolve;
          document.head.appendChild(script);
        });
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
      }

      // Préparer les données du template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: isDark ? 'Scorpi777' : 'Salem GNANDI',
        'g-recaptcha-response': recaptchaToken
      };

      // Envoyer l'email via EmailJS
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setRecaptchaToken(null);
      
      // Reset reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Styles CSS pour les animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* Styles pour reCAPTCHA en mode sombre */
        .recaptcha-container {
          display: flex;
          justify-content: center;
        }
      `}</style>

      <section id="contact" className={`py-20 transition-all duration-1000 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="container mx-auto px-8 max-w-4xl">
          
          {/* Titre principal */}
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 transition-all duration-1000 ${
              isDark 
                ? 'font-mono text-green-400' 
                : 'font-serif text-gray-800'
            }`}>
              {isDark ? (
                <span className="flex items-center justify-center gap-4">
                  <Terminal className="animate-pulse" />
                  // Secure Channel
                  <Shield className="text-yellow-400" />
                </span>
              ) : (
                <span>Get In Touch</span>
              )}
            </h2>
            
            <p className={`text-xl max-w-2xl mx-auto transition-all duration-1000 ${
              isDark 
                ? 'font-mono text-gray-300' 
                : 'font-serif text-gray-600'
            }`}>
              {isDark ? (
                <>
                  <span className="text-green-400">[ENCRYPTED]</span> Establish secure communication channel
                  <br />
                  <span className="text-yellow-400">[INFO]</span> All transmissions are monitored and logged
                </>
              ) : (
                "Ready to collaborate? Let's discuss your next project and bring your ideas to life."
              )}
            </p>
          </div>

          {/* Formulaire */}
          <div className={`rounded-xl border-2 p-8 transition-all duration-1000 ${
            isDark 
              ? 'bg-gray-800/50 border-green-400/30' 
              : 'bg-white border-blue-200 shadow-xl'
          }`}>
            
            {/* Status Messages */}
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg border-2 ${
                submitStatus === 'success'
                  ? isDark 
                    ? 'bg-green-400/10 border-green-400/50 text-green-400'
                    : 'bg-green-50 border-green-200 text-green-700'
                  : isDark
                    ? 'bg-red-400/10 border-red-400/50 text-red-400'
                    : 'bg-red-50 border-red-200 text-red-700'
              }`} style={{ animation: 'fadeInUp 0.5s ease-out' }}>
                <div className="flex items-center gap-3">
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      <span className={isDark ? 'font-mono' : 'font-medium'}>
                        {isDark ? '[SUCCESS] Message transmis avec succès!' : 'Message envoyé avec succès!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} />
                      <span className={isDark ? 'font-mono' : 'font-medium'}>
                        {isDark ? '[ERROR] Échec de la transmission' : 'Erreur lors de l\'envoi'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-6">
              
              {/* Nom */}
              <div>
                <label className={`block mb-2 font-medium ${
                  isDark ? 'font-mono text-green-400' : 'font-serif text-gray-700'
                }`}>
                  {isDark ? '// Nom d\'utilisateur' : 'Nom complet'}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-3 ${
                    isDark ? 'text-green-400' : 'text-gray-400'
                  }`} size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-green-400 placeholder-gray-500 focus:border-green-400 font-mono'
                        : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:border-blue-500'
                    } ${errors.name ? 'border-red-400' : ''}`}
                    placeholder={isDark ? 'user@localhost' : 'Votre nom complet'}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-red-400 text-sm font-mono" style={{ animation: 'shake 0.5s ease-out' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={`block mb-2 font-medium ${
                  isDark ? 'font-mono text-green-400' : 'font-serif text-gray-700'
                }`}>
                  {isDark ? '// Adresse email' : 'Adresse email'}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-3 ${
                    isDark ? 'text-green-400' : 'text-gray-400'
                  }`} size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-green-400 placeholder-gray-500 focus:border-green-400 font-mono'
                        : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:border-blue-500'
                    } ${errors.email ? 'border-red-400' : ''}`}
                    placeholder={isDark ? 'contact@domain.tld' : 'votre@email.com'}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-red-400 text-sm font-mono" style={{ animation: 'shake 0.5s ease-out' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className={`block mb-2 font-medium ${
                  isDark ? 'font-mono text-green-400' : 'font-serif text-gray-700'
                }`}>
                  {isDark ? '// Payload' : 'Message'}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className={`absolute left-3 top-3 ${
                    isDark ? 'text-green-400' : 'text-gray-400'
                  }`} size={20} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-vertical ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-green-400 placeholder-gray-500 focus:border-green-400 font-mono'
                        : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:border-blue-500'
                    } ${errors.message ? 'border-red-400' : ''}`}
                    placeholder={isDark ? 
                      'echo "Votre message ici..."' : 
                      'Décrivez votre projet ou posez votre question...'
                    }
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 text-red-400 text-sm font-mono" style={{ animation: 'shake 0.5s ease-out' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Google reCAPTCHA */}
              <div>
                <label className={`block mb-3 font-medium ${
                  isDark ? 'font-mono text-green-400' : 'font-serif text-gray-700'
                }`}>
                  {isDark ? '// Vérification de sécurité' : 'Vérification de sécurité'}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                
                <div className="recaptcha-container">
                  <div ref={recaptchaRef}></div>
                </div>
                
                {errors.recaptcha && (
                  <p className="mt-2 text-red-400 text-sm font-mono text-center" style={{ animation: 'shake 0.5s ease-out' }}>
                    {errors.recaptcha}
                  </p>
                )}
              </div>

              {/* Bouton de soumission */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !recaptchaToken}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-3 ${
                  isDark
                    ? 'bg-green-400/10 text-green-400 border-2 border-green-400 hover:bg-green-400 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin">
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"></div>
                    </div>
                    <span className={isDark ? 'font-mono' : 'font-serif'}>
                      {isDark ? '// Transmission en cours...' : 'Envoi en cours...'}
                    </span>
                  </>
                ) : (
                  <>
                    {isDark ? <Zap size={20} /> : <Send size={20} />}
                    <span className={isDark ? 'font-mono' : 'font-serif'}>
                      {isDark ? '// Deliver the payload' : 'Send the message'}
                    </span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}