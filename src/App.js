import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Users, Search, CheckCircle, Globe, TrendingUp, ChevronDown, GraduationCap, Building2, ArrowRight, Mail, Menu, X } from 'lucide-react';
import './App.css';
import demoImage from './assets/prisma-ej.png';

// Custom hook for scroll animations
const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
};

// Component wrapper for sections with scroll animation
const SectionWithAnimation = ({ children, className = '', id, ...props }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-section ${isVisible ? 'scroll-section-visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

const PrismaLanding = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    type: 'estudiante'
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detectar si el formulario se envió exitosamente
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setShowSuccess(true);
      // Limpiar el parámetro de la URL después de 3 segundos
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 3000);
    }
  }, []);

  const handleSubmit = (e) => {
    // FormSubmit se encarga del envío
    console.log('Formulario enviado a contacto@tuprisma.com');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Popup Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in">
            {/* Icono de éxito */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce-once">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            
            {/* Contenido */}
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                ¡Registro Exitoso! 🎉
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Gracias por unirte a la lista de espera de <span className="font-semibold text-purple-600">Prisma</span>.
              </p>
              <p className="text-gray-600 mt-3">
                Te contactaremos pronto con novedades sobre el lanzamiento de la beta.
              </p>
            </div>

            {/* Botón de cerrar */}
            <button
              onClick={() => {
                setShowSuccess(false);
                window.history.replaceState({}, document.title, window.location.pathname);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ¡Entendido!
            </button>

            {/* Badge decorativo */}
            <div className="mt-6 text-center">
              <span className="inline-flex items-center text-sm text-gray-500">
                <span className="mr-2">✨</span>
                Bienvenido a la comunidad Prisma
                <span className="ml-2">✨</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Prisma</h1>
                <p className="text-xs text-gray-500">Donde el talento encuentra su luz</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#estudiantes" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
                Estudiantes
              </a>
              <a href="#universidades" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Universidades
              </a>
              <a href="#empresas" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
                Empresas
              </a>
              <a 
                href="#waitlist" 
                className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Únete
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
              <a 
                href="#estudiantes" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-center font-medium text-gray-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors border border-purple-200"
              >
                🎓 Estudiantes
              </a>
              <a 
                href="#universidades" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-center font-medium text-gray-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
              >
                🏛️ Universidades
              </a>
              <a 
                href="#empresas" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-center font-medium text-gray-700 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-200"
              >
                💼 Empresas
              </a>
              <a 
                href="#waitlist" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-center font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl transition-all shadow-md"
              >
                Únete a la Waitlist
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 py-24 lg:py-40 overflow-hidden hero-fade-in">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              Tu talento universitario merece más que un CV de una página
            </h1>
            <p className="text-xl lg:text-2xl text-purple-50 mb-10 leading-relaxed max-w-3xl mx-auto">
              Prisma es la plataforma donde estudiantes universitarios construyen perfiles profesionales integrales, conectan con oportunidades reales, y encuentran colaboradores para crear juntos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <a 
                href="#waitlist"
                className="group px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center justify-center"
              >
                Únete a la Lista de Espera
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#demo"
                className="px-8 py-4 bg-purple-500/90 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform border-2 border-white/20"
              >
                Ver Cómo Funciona
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-purple-50 text-sm">
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                Sin costo para early adopters
              </span>
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                Acceso exclusivo a beta
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* El Problema */}
      <SectionWithAnimation className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              El talento se pierde cuando solo importan las notas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hay talento increíble en universidades, pero se pierde porque no existe una forma estructurada de mostrarlo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white rounded-2xl p-8 shadow-md border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Estudiantes</h3>
              <p className="text-gray-600 leading-relaxed">
                "Hice 6 proyectos increíbles pero solo tengo un CV genérico que no muestra mi trabajo real"
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Universidades</h3>
              <p className="text-gray-600 leading-relaxed">
                "Queremos que nuestros egresados destaquen, pero no tenemos forma de mostrar su talento"
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Empresas</h3>
              <p className="text-gray-600 leading-relaxed">
                "Buscamos talento joven pero los CVs no nos dicen quiénes son realmente ni qué saben hacer"
              </p>
            </div>
          </div>
        </div>
      </SectionWithAnimation>

      {/* Para Estudiantes */}
      <SectionWithAnimation id="estudiantes" className="py-24 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Para Estudiantes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Construye tu identidad profesional desde el primer día universitario
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Tu Portfolio Vivo</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Cada proyecto, trabajo o experiencia queda documentada con contexto real. No más CVs genéricos que no muestran tu verdadero talento.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Sube proyectos con imágenes, videos y descripción detallada</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Muestra tu proceso de trabajo, no solo el resultado final</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Valida tus habilidades con certificaciones y proyectos reales</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🤝 Conecta y Colabora</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Encuentra compañeros para ese proyecto que tienes en mente, conecta con alumni que ya están donde quieres estar, y construye tu red profesional desde la universidad.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Busca colaboradores por habilidades específicas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Conecta con mentores alumni de tu universidad</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Arma equipos para proyectos emprendedores</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Destaca Ante Empresas</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Cuando llegue el momento de buscar oportunidades laborales, tu perfil en Prisma habla por ti. Las empresas ven tu trabajo real, no solo palabras en un CV.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Empresas te descubren por tu portafolio completo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Tu universidad valida tu perfil, generando confianza</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Recibe oportunidades alineadas con tu talento real</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-4">💡 ¿Por qué ahora?</h3>
              <p className="mb-4 text-purple-50 leading-relaxed">
                Mientras más temprano empieces a construir tu perfil, más completo estará cuando lo necesites.
              </p>
              <div className="space-y-3 text-purple-50">
                <p className="flex items-start">
                  <span className="text-2xl mr-3">📚</span>
                  <span>En 1er año: Documenta tus primeros proyectos académicos</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">🎓</span>
                  <span>En 3er año: Tienes un portafolio completo y red de contactos</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">💼</span>
                  <span>Al graduarte: Destacas inmediatamente ante empleadores</span>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="#waitlist" 
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Únete a la Waitlist de Estudiantes
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </SectionWithAnimation>

      {/* Para Universidades */}
      <SectionWithAnimation id="universidades" className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
              <Building2 className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Para Universidades
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Potencia la empleabilidad de tu institución y destaca el talento de tus estudiantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Visibilidad de Resultados</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Muestra al mundo el verdadero impacto de tu educación a través de los perfiles de tus estudiantes.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Showcase institucional con proyectos destacados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Métricas de empleabilidad en tiempo real</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Historias de éxito de egresados documentadas</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🤝 Red Alumni Activa</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Crea una comunidad donde egresados exitosos mentorean a estudiantes actuales, fortaleciendo tu red institucional.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Conecta estudiantes con alumni por carrera e industria</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Programas de mentoría integrados en la plataforma</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Engagement continuo con tu comunidad egresada</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💼 Conexión con Empleadores</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Las empresas buscan talento directamente en tu institución, aumentando las oportunidades para tus estudiantes.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Empresas acceden a perfiles validados por tu institución</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Tracking de colocación laboral de egresados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Ferias de empleo virtuales integradas</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-4">🎯 Diferenciación Competitiva</h3>
              <p className="mb-4 text-blue-50 leading-relaxed">
                En un mercado educativo competitivo, la empleabilidad de tus egresados es tu mejor carta de presentación.
              </p>
              <div className="space-y-3 text-blue-50">
                <p className="flex items-start">
                  <span className="text-2xl mr-3">📈</span>
                  <span>Mejora tus rankings de empleabilidad</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">🌟</span>
                  <span>Atrae mejores estudiantes con casos de éxito reales</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">🔗</span>
                  <span>Fortalece vínculos con el sector empresarial</span>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="#waitlist" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Agenda una Demo para tu Universidad
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </SectionWithAnimation>

      {/* Para Empresas */}
      <SectionWithAnimation id="empresas" className="py-24 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-lg">
              <Briefcase className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Para Empresas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre y recluta talento joven validado institucionalmente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Reclutamiento Inteligente</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Busca candidatos por proyectos reales, habilidades demostradas y fit cultural, no solo por palabras clave en un CV.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Filtros por proyectos específicos y habilidades validadas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Perfiles verificados por instituciones educativas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Ve el trabajo real antes de la entrevista</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">⚡ Acceso Anticipado</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                No esperes a que se gradúen. Identifica talento prometedor desde etapas tempranas y conviértete en su primera opción.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Programa de pasantías con estudiantes destacados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Marca empleadora visible para nuevas generaciones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Pipeline de talento continuo</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💰 Reducción de Costos</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Menos tiempo y recursos invertidos en procesos de selección. Mejor calidad de candidatos desde el primer filtro.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Reduce tiempo de screening en 70%</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Mayor retención por mejor fit inicial</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Elimina intermediarios costosos</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-4">🚀 El futuro del reclutamiento</h3>
              <p className="mb-4 text-green-50 leading-relaxed">
                Las nuevas generaciones buscan empresas que valoren su trabajo real, no solo títulos y notas.
              </p>
              <div className="space-y-3 text-green-50">
                <p className="flex items-start">
                  <span className="text-2xl mr-3">🎓</span>
                  <span>Acceso directo a las mejores universidades</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">✨</span>
                  <span>Candidatos pre-validados institucionalmente</span>
                </p>
                <p className="flex items-start">
                  <span className="text-2xl mr-3">🤝</span>
                  <span>Construye relaciones de largo plazo con el talento</span>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="#waitlist" 
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Solicita Acceso Empresarial
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </SectionWithAnimation>

      {/* La Solución / Demo */}
      <SectionWithAnimation id="demo" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
              Prisma: Tu perfil profesional que evoluciona contigo
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Prisma es más que un portfolio. Es tu identidad profesional completa: tus proyectos, habilidades, experiencias, intereses y conexiones, todo en un solo lugar.
              </p>
              <p>
                Desde tu primer año universitario hasta tu primer empleo, Prisma crece contigo. Muestra tu trabajo real, no solo tus notas. Conecta con compañeros para colaborar. Encuentra mentores alumni. Y cuando llegue el momento, destaca ante empresas que buscan exactamente lo que tú tienes.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <a 
              href="https://sled-pixel-99459018.figma.site/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer overflow-hidden"
            >
              <img 
                src={demoImage} 
                alt="Demo Interactivo de Prisma" 
                className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
            </a>
            <p className="text-center text-gray-600 mt-4 text-sm font-medium">
              Haz click en la imagen para ver cómo funciona
            </p>
              </div>
            </div>
      </SectionWithAnimation>

      {/* Características */}
      <SectionWithAnimation className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-16 tracking-tight">
            Todo lo que necesitas para destacar
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Portfolio Multimedia',
                desc: 'Proyectos, trabajos y casos con contexto real, no solo títulos en un CV'
              },
              {
                icon: Users,
                title: 'Networking Alumni',
                desc: 'Conecta con mentores y descubre oportunidades a través de tu red universitaria'
              },
              {
                icon: Search,
                title: 'Búsqueda Inteligente',
                desc: 'Encuentra colaboradores para proyectos o arma tu equipo emprendedor'
              },
              {
                icon: CheckCircle,
                title: 'Validación Institucional',
                desc: 'Tu trabajo respaldado por tu universidad genera confianza real'
              },
              {
                icon: Globe,
                title: 'Visibilidad Empresarial',
                desc: 'Empresas te descubren por tu trabajo real, no solo por palabras clave'
              },
              {
                icon: TrendingUp,
                title: 'Crecimiento Continuo',
                desc: 'Tu perfil evoluciona desde primer año hasta tu carrera profesional'
              }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWithAnimation>

      {/* Cómo Funciona - El Efecto de Red */}
      <SectionWithAnimation className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              El Poder del Efecto de Red de 3 Lados
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Prisma crea valor para todos conectando a los actores clave del ecosistema universitario-laboral
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Flujo visual del efecto de red */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Estudiantes */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200 transform transition-all hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <GraduationCap className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-3">Estudiantes</h3>
                <p className="text-center text-gray-600 text-sm mb-4">
                  Construyen perfiles profesionales completos y validados
                </p>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-purple-600 mr-2" />
                    <span>Documentan proyectos</span>
                </div>
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-purple-600 mr-2" />
                    <span>Conectan con alumni</span>
              </div>
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-purple-600 mr-2" />
                    <span>Acceden a oportunidades</span>
          </div>
        </div>
              </div>

              {/* Universidades */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200 transform transition-all hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Building2 className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-3">Universidades</h3>
                <p className="text-center text-gray-600 text-sm mb-4">
                  Potencian empleabilidad y visibilizan su impacto
                </p>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-blue-600 mr-2" />
                    <span>Validan estudiantes</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-blue-600 mr-2" />
                    <span>Activan red alumni</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-blue-600 mr-2" />
                    <span>Mejoran rankings</span>
                  </div>
                </div>
              </div>

              {/* Empresas */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200 transform transition-all hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Briefcase className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-3">Empresas</h3>
                <p className="text-center text-gray-600 text-sm mb-4">
                  Descubren talento validado y reducen costos
                </p>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-green-600 mr-2" />
                    <span>Acceden a perfiles reales</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-green-600 mr-2" />
                    <span>Reducen tiempo screening</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-green-600 mr-2" />
                    <span>Mejoran contratación</span>
                  </div>
                </div>
              </div>
            </div>

            {/* El ciclo virtuoso */}
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold text-center mb-6">El Ciclo Virtuoso de Prisma</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <p className="leading-relaxed">
                    <strong>Más estudiantes</strong> crean perfiles → más valor para universidades (showcase de talento)
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <p className="leading-relaxed">
                    <strong>Más universidades</strong> validan → más confianza para empresas (perfiles verificados)
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <p className="leading-relaxed">
                    <strong>Más empresas</strong> buscan talento → más oportunidades para estudiantes
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-lg font-semibold text-white/90">
                  ↻ Y el ciclo se fortalece continuamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWithAnimation>

      {/* Valor para Stakeholders */}
      <SectionWithAnimation className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-16 tracking-tight">
            Todos ganan con Prisma
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-5">Para Estudiantes</h3>
              <ul className="space-y-3">
                {[
                  'Portfolio desde día 1',
                  'Conexiones reales con alumni',
                  'Visibilidad ante empresas',
                  'Encuentra colaboradores'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-5">Para Universidades</h3>
              <ul className="space-y-3">
                {[
                  'Showcase de talento institucional',
                  'Alumni engagement activo',
                  'Métricas de empleabilidad',
                  'Diferenciación competitiva'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-5">Para Empresas</h3>
              <ul className="space-y-3">
                {[
                  'Acceso a talento curado',
                  'Ves trabajo real, no solo CVs',
                  'Conecta con talento temprano',
                  'Filtros por skills reales'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionWithAnimation>

      {/* Casos de Uso */}
      <SectionWithAnimation className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-6 tracking-tight">
            Historias que queremos hacer realidad
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto text-lg leading-relaxed">
            Prisma está comenzando. Estas son las historias que queremos hacer posibles. ¿Quieres ser uno de los primeros?
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">👩‍💻</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">María, Ing. Informática</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Durante 4 años construyó un portfolio con 8 proyectos. Cuando se graduó, una startup la contactó porque vio su trabajo en Prisma. Hoy es su primera developer.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100">
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Carlos & Ana, Co-founders</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Se conocieron en Prisma buscando colaboradores para un proyecto. Hoy tienen una startup financiada que nació de esa conexión.
              </p>
            </div>
          </div>
        </div>
      </SectionWithAnimation>

      {/* Waitlist */}
      <SectionWithAnimation id="waitlist" className="py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Únete al Futuro del Talento Universitario
            </h2>
            <p className="text-xl text-purple-50 leading-relaxed mb-6">
              Estamos lanzando pronto. Sé parte de la comunidad que conecta estudiantes, universidades y empresas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/90">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                ✨ Early adopters sin costo
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🚀 Acceso exclusivo a beta
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🤝 Co-crea con nosotros
              </span>
            </div>
          </div>

          {showSuccess && (
            <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-xl p-6 animate-fade-in">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <div>
                  <h3 className="font-bold text-green-900 text-lg">¡Registro exitoso!</h3>
                  <p className="text-green-700">Gracias por unirte a la lista de espera. Te contactaremos pronto.</p>
                </div>
              </div>
            </div>
          )}

          <form 
            action="https://formsubmit.co/contacto@tuprisma.com" 
            method="POST"
            onSubmit={handleSubmit} 
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            {/* Configuración de FormSubmit */}
            <input type="hidden" name="_subject" value="Nuevo registro en Prisma Waitlist" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={`${window.location.origin}${window.location.pathname}?success=true`} />
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Universidad / Organización
                  <span className="text-gray-500 font-normal text-sm ml-2">(opcional)</span>
                </label>
                <input
                  type="text"
                  name="universidad"
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
                  placeholder="Universidad de Chile, Nombre de tu empresa, etc."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Soy:</label>
                <select
                  name="tipo"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 bg-white"
                >
                  <option value="estudiante">Estudiante</option>
                  <option value="alumni">Alumni</option>
                  <option value="universidad">Universidad</option>
                  <option value="empresa">Empresa</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Únete a la Waitlist
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Al registrarte, aceptas que nos comuniquemos contigo sobre Prisma.</p>
              <p className="mt-2">Respetamos tu privacidad. No spam, lo prometemos. 💜</p>
            </div>
          </form>
        </div>
      </SectionWithAnimation>

      {/* FAQ */}
      <SectionWithAnimation className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-16 tracking-tight">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-4">
            {[
              {
                q: '¿Qué es exactamente Prisma?',
                a: 'Prisma es una plataforma donde estudiantes universitarios construyen perfiles profesionales completos que van más allá del CV tradicional. Incluye proyectos, habilidades, experiencias, y conexiones con alumni y empresas.',
                category: 'general'
              },
              {
                q: '¿Es solo para carreras técnicas?',
                a: 'No. Prisma funciona para TODAS las carreras: ingeniería, diseño, derecho, medicina, negocios, artes, etc. El concepto es universal: mostrar tu trabajo más allá de las notas.',
                category: 'estudiantes'
              },
              {
                q: '¿Cuándo estará disponible?',
                a: 'Estamos en desarrollo activo y lanzaremos una beta en los próximos meses. Los que se unan a la lista de espera tendrán acceso prioritario.',
                category: 'general'
              },
              {
                q: '¿Tiene algún costo?',
                a: 'Los early adopters tendrán acceso gratuito. Posteriormente, habrá un tier gratuito con funciones básicas y opciones premium para features avanzados.',
                category: 'general'
              },
              {
                q: 'Para Universidades: ¿Cómo funciona la integración institucional?',
                a: 'Trabajamos contigo para integrar Prisma con tus sistemas. Los estudiantes crean perfiles que tu universidad puede validar, creando un showcase institucional de talento. Incluye dashboard de métricas de empleabilidad y herramientas de gestión alumni.',
                category: 'universidades'
              },
              {
                q: 'Para Empresas: ¿Cómo accedo a los perfiles de talento?',
                a: 'Las empresas obtienen acceso a nuestra plataforma de búsqueda inteligente. Pueden filtrar candidatos por proyectos reales, habilidades validadas, universidad, y más. También pueden publicar oportunidades que llegan directamente a estudiantes que cumplen el perfil.',
                category: 'empresas'
              },
              {
                q: '¿Cómo se diferencia de LinkedIn?',
                a: 'LinkedIn es genérico para todos los profesionales. Prisma está diseñado específicamente para estudiantes y early-career, con enfoque en proyectos académicos, validación institucional, y conexión con tu comunidad universitaria.',
                category: 'general'
              },
              {
                q: '¿Puedo usarlo si ya me gradué?',
                a: 'Sí! Los alumni pueden mantener su perfil activo, convertirse en mentores de estudiantes actuales, y seguir conectados con su comunidad universitaria.',
                category: 'estudiantes'
              },
              {
                q: 'Para Universidades: ¿Qué datos y métricas obtendré?',
                a: 'Tendrás acceso a métricas de empleabilidad de tus egresados, engagement de la red alumni, proyectos destacados por carrera, y más. Todo en tiempo real y con visualizaciones intuitivas.',
                category: 'universidades'
              },
              {
                q: '¿Mi universidad necesita estar asociada?',
                a: 'No necesariamente. Estamos comenzando con universidades partner, pero cualquier estudiante puede crear su perfil. La asociación institucional solo añade validación adicional.',
                category: 'estudiantes'
              },
              {
                q: '¿Cómo protegen mis datos?',
                a: 'Cumplimos con todas las leyes de protección de datos. Tú controlas qué información es pública o privada. Tus datos nunca se venden a terceros.',
                category: 'general'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 rounded-xl"
                >
                  <span className="font-semibold text-gray-900 pr-8">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openFaq === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWithAnimation>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="font-bold text-xl">Prisma</span>
              </div>
              <p className="text-gray-400 text-sm">
                Donde el talento encuentra su luz
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Para</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#estudiantes" className="hover:text-white transition">Estudiantes</a></li>
                <li><a href="#universidades" className="hover:text-white transition">Universidades</a></li>
                <li><a href="#empresas" className="hover:text-white transition">Empresas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><span className="hover:text-white transition cursor-default">Blog (próximamente)</span></li>
                <li><a href="#waitlist" className="hover:text-white transition">Ayuda</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  contacto@tuprisma.com
                </li>
                <li>📍 Santiago, Chile</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Prisma. Todos los derechos reservados.</p>
            <p className="mt-2">Construido con ❤️ por alumni universitarios para la próxima generación</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrismaLanding;