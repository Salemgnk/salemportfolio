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

import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";

export default function ContactSection() {
  // Synchronisation avec le système de thème global (comme dans les autres composants)
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
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  // Ref pour reCAPTCHA
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const EMAILJS_SERVICE_ID = "service_6oq0y6s";
  const EMAILJS_TEMPLATE_ID = "template_w2fxfh8";
  const EMAILJS_PUBLIC_KEY = "3kZ4Hi3V6-58FEFKJ";

  useEffect(() => {
    // Initialiser EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Observer les changements de thème global (comme dans les autres composants)
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

    return () => {
      observer.disconnect();
    };
  }, []);

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

  // Gérer le reCAPTCHA
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token && errors.recaptcha) {
      setErrors(prev => ({
        ...prev,
        recaptcha: ''
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
      // Préparer les données du template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: isDark ? 'Scorpi777' : 'Salem GNANDI',
        'g-recaptcha-response': recaptchaToken
      };

      // Envoyer l'email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setRecaptchaToken(null);
      
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
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

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Styles pour reCAPTCHA */
        .recaptcha-container {
          display: flex;
          justify-content: center;
          min-height: 78px;
          align-items: center;
        }

        /* Amélioration visuelle du reCAPTCHA container */
        .recaptcha-wrapper {
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 8px;
          transition: all 0.3s ease;
        }

        .recaptcha-wrapper.dark {
          background: rgba(31, 41, 55, 0.5);
          border-color: rgba(34, 197, 94, 0.2);
        }

        .recaptcha-wrapper.light {
          background: rgba(248, 250, 252, 0.8);
          border-color: rgba(59, 130, 246, 0.2);
        }
      `}</style>

      {/* Suppression du bouton toggle et de la div avec background fixe */}
      <section id="contact" className={`py-20 min-h-screen transition-all duration-1000 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-blue-50'
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
                  <div className={`recaptcha-wrapper ${isDark ? 'dark' : 'light'}`}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Lcs2rArAAAAANf_zT7Lq4YGmLQsta1fLl6-ngJj"
                      theme={isDark ? 'dark' : 'light'}
                      onChange={handleRecaptchaChange}
                    />
                  </div>
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