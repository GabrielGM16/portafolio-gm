import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  X,
  CheckCircle,
  MessageSquare
} from 'lucide-react';

const Contact = ({ onClose }) => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'gmoficial16@gmail.com',
      href: 'mailto:gmoficial16@gmail.com',
      description: 'Escríbeme directamente'
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '[dato removido]',
      href: 'tel:[dato removido]',
      description: 'Llámame o envía WhatsApp'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Dolores Hidalgo, Guanajuato, México',
      href: null,
      description: 'Disponible para trabajo remoto'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/GabrielGM16',
      color: 'hover:bg-gray-700',
      description: '@GabrielGM16'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/martin-gabriel-godinez-morales-39a48327b',
      color: 'hover:bg-blue-600',
      description: 'martin-gabriel-godinez'
    },
    {
      icon: Twitter,
      label: 'Twitter / X',
      href: 'https://x.com/GabrielGM162',
      color: 'hover:bg-sky-500',
      description: '@GabrielGM162'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-bold mb-2">Contacto</h2>
          <p className="text-white/90">¡Hablemos sobre tu próximo proyecto!</p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Intro */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">¿Tienes un proyecto en mente?</h3>
            <p className="text-gray-500 text-sm">Contáctame directamente por cualquiera de estos medios</p>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-3 mb-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{info.description}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-purple-600 hover:text-purple-700 transition-colors font-semibold block truncate"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-700 font-semibold">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mb-8">
            <h4 className="text-base font-semibold text-gray-800 mb-3">Encuéntrame en redes</h4>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-center p-3 bg-gray-100 rounded-xl text-center transition-all ${social.color} hover:text-white group`}
                >
                  <social.icon className="w-6 h-6 text-gray-700 group-hover:text-white mb-1 transition-colors" />
                  <span className="font-medium text-gray-700 group-hover:text-white text-sm transition-colors">{social.label}</span>
                  <span className="text-xs text-gray-400 group-hover:text-white/80 transition-colors truncate w-full text-center">{social.description}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Why work with me */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100"
          >
            <h4 className="text-base font-semibold text-gray-800 mb-3">¿Por qué trabajar conmigo?</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">Respuesta rápida en menos de 24 horas</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">Consulta inicial gratuita</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">Soluciones personalizadas para tu negocio</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">Soporte post-entrega incluido</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
