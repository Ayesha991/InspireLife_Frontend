import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContact = () => {
  // Use the WhatsApp link format
  const whatsappNumber = "971503578282";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <AnimatePresence>
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 end-6 z-50 flex items-center justify-center w-14 h-14 rounded-full transition-transform duration-300 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/WhatsApp.svg" alt="WhatsApp" className="w-full h-full object-contain drop-shadow-lg" />

        {/* Tooltip */}
        <span className="absolute end-16 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-gray-700">
          Chat with us
        </span>

        {/* Pulse animation ring */}
        <span className="absolute w-full h-full rounded-full border-2 border-green-400 animate-ping opacity-75"></span>
      </motion.a>
    </AnimatePresence>
  );
};

export default FloatingContact;
