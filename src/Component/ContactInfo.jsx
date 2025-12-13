import React, { useState } from 'react';
import { Phone, X, MessageSquare } from 'lucide-react';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/0 1711207445',
      icon: (
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5" 
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0c3.2.001 6.207 1.249 8.47 3.512 2.262 2.263 3.51 5.27 3.508 8.468-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
      bgColor: 'bg-[#25D366] hover:bg-[#128C7E]',
      delay: 'delay-[0ms]'
    },
    {
      name: 'Call Us',
      href: 'tel:+880 1711207445',
      icon: <Phone className="w-5 h-5" />,
      bgColor: 'bg-blue-500 hover:bg-blue-600',
      delay: 'delay-[100ms]'
    },
    {
      name: 'Messenger',
      href: 'https://www.facebook.com/lavogos',
      icon: (
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5" 
          fill="currentColor"
        >
          <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.37 3.11 7.04.2.16.32.41.32.67l.06 2.09c.02.27.3.44.55.35l2.34-.87c.19-.07.39-.06.57.03C10.16 21.62 11.06 22 12 22c5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm6 7.46l-2.93 4.67c-.47.75-1.47.93-2.17.37l-2.34-1.87c-.23-.18-.56-.18-.79 0l-3.16 2.4c-.46.35-1.09-.22-.79-.72l2.93-4.67c.47-.75 1.47-.93 2.17-.37l2.34 1.87c.23.18.56.18.79 0l3.16-2.4c.46-.35 1.09.22.79.72z"/>
        </svg>
      ),
      bgColor: 'bg-[#006AFF] hover:bg-[#0055CC]',
      delay: 'delay-[200ms]'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center shadow-lg
          transition-all duration-300 transform
          ${isOpen 
            ? 'bg-gray-800 rotate-[360deg]' 
            : 'bg-blue-600 hover:bg-blue-700'
          }
          hover:scale-110
        `}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Contact Options */}
      <div className="absolute bottom-20 right-0 space-y-4">
        {contactOptions.map((option) => (
          <a
            key={option.name}
            href={option.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group flex items-center transform transition-all duration-300
              ${option.delay}
              ${isOpen 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-12 opacity-0 pointer-events-none'
              }
            `}
          >
            {/* Tooltip */}
            <div className="
              absolute right-full mr-4 px-4 py-2 rounded-lg bg-white shadow-lg
              text-sm font-medium text-gray-700 whitespace-nowrap
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              transform -translate-x-2 group-hover:translate-x-0
            ">
              {option.name}
            </div>

            {/* Icon Button */}
            <button
              className={`
                w-12 h-12 rounded-full flex items-center justify-center
                text-white shadow-lg transform transition-all duration-200
                ${option.bgColor}
                hover:scale-110 hover:shadow-xl
              `}
            >
              {option.icon}
            </button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloatingContact;