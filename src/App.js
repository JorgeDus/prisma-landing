import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Users, Search, CheckCircle, Globe, TrendingUp, ChevronDown, GraduationCap, Building2, ArrowRight, Mail } from 'lucide-react';
import './App.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Gracias ${formData.name}! Te contactaremos pronto a ${formData.email}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
            <a 
              href="#waitlist" 
              className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Únete
            </a>
          </div>
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

      {/* La Solución */}
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
              className="block aspect-video bg-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer"
            >
              <div className="text-center">
                <Briefcase className="w-20 h-20 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-gray-600 font-semibold text-lg group-hover:text-purple-600 transition-colors">Demo Interactivo</p>
                <p className="text-sm text-gray-500 mt-2">Haz clic para ver el demo →</p>
              </div>
            </a>
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

      {/* Cómo Funciona */}
      <SectionWithAnimation className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-16 tracking-tight">
            Tu perfil profesional en 4 pasos
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                num: '1',
                title: 'Crea tu Perfil',
                desc: 'Empieza con lo básico: quién eres, qué estudias, qué te apasiona'
              },
              {
                num: '2',
                title: 'Muestra tu Trabajo',
                desc: 'Sube proyectos, casos, trabajos con imágenes y contexto real'
              },
              {
                num: '3',
                title: 'Conecta y Crece',
                desc: 'Encuentra mentores, colaboradores y oportunidades'
              },
              {
                num: '4',
                title: 'Destaca',
                desc: 'Tu perfil completo te diferencia cuando más importa'
              }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
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
      <SectionWithAnimation id="waitlist" className="py-24 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Sé de los primeros en construir tu futuro profesional
            </h2>
            <p className="text-xl text-purple-50 leading-relaxed">
              Estamos lanzando pronto. Únete a la lista de espera y obtén acceso anticipado.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                <input
                  type="text"
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
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Universidad</label>
                <input
                  type="text"
                  required
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
                  placeholder="Universidad de Chile"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Soy:</label>
                <select
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
                Unirme a la Lista de Espera
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Sin costo para early adopters
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Acceso exclusivo a beta
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Ayúdanos a construir el producto
              </span>
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
                a: 'Prisma es una plataforma donde estudiantes universitarios construyen perfiles profesionales completos que van más allá del CV tradicional. Incluye proyectos, habilidades, experiencias, y conexiones con alumni y empresas.'
              },
              {
                q: '¿Es solo para carreras técnicas?',
                a: 'No. Prisma funciona para TODAS las carreras: ingeniería, diseño, derecho, medicina, negocios, artes, etc. El concepto es universal: mostrar tu trabajo más allá de las notas.'
              },
              {
                q: '¿Cuándo estará disponible?',
                a: 'Estamos en desarrollo activo y lanzaremos una beta en los próximos meses. Los que se unan a la lista de espera tendrán acceso prioritario.'
              },
              {
                q: '¿Tiene algún costo?',
                a: 'Los early adopters tendrán acceso gratuito. Posteriormente, habrá un tier gratuito con funciones básicas y opciones premium para features avanzados.'
              },
              {
                q: '¿Cómo se diferencia de LinkedIn?',
                a: 'LinkedIn es genérico para todos los profesionales. Prisma está diseñado específicamente para estudiantes y early-career, con enfoque en proyectos académicos, validación institucional, y conexión con tu comunidad universitaria.'
              },
              {
                q: '¿Puedo usarlo si ya me gradué?',
                a: 'Sí! Los alumni pueden mantener su perfil activo, convertirse en mentores de estudiantes actuales, y seguir conectados con su comunidad universitaria.'
              },
              {
                q: '¿Mi universidad necesita estar asociada?',
                a: 'No necesariamente. Estamos comenzando con universidades partner, pero cualquier estudiante puede crear su perfil. La asociación institucional solo añade validación adicional.'
              },
              {
                q: '¿Cómo protegen mis datos?',
                a: 'Cumplimos con todas las leyes de protección de datos. Tú controlas qué información es pública o privada. Tus datos nunca se venden a terceros.'
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
                <li><a href="#waitlist" className="hover:text-white transition">Estudiantes</a></li>
                <li><a href="#waitlist" className="hover:text-white transition">Universidades</a></li>
                <li><a href="#waitlist" className="hover:text-white transition">Empresas</a></li>
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
                  hola@prisma.cl
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