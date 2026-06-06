import React from 'react';

export const WhatsAppButton: React.FC = () => {
  // WhatsApp business number for Exotic Interior (format: +countrycode phonenumber)
  const phoneNumber = '+918919445788';
  const message = 'Hello! I\'m interested in your interior design services. Can you tell me more about your offerings?';
  
  // Create WhatsApp link
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] group"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      {/* Main Button */}
      <div className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full shadow-xl ring-2 ring-white/90 transition-all duration-300 hover:scale-110 cursor-pointer">
        {/* WhatsApp Logo */}
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12.04 2.003C6.521 2.003 2.05 6.475 2.05 11.994c0 1.76.46 3.479 1.333 4.996L2 22l5.178-1.36a9.94 9.94 0 0 0 4.862 1.251h.004c5.517 0 9.989-4.472 9.989-9.991 0-2.674-1.041-5.188-2.934-7.08a9.94 9.94 0 0 0-7.06-2.817zm0 18.205h-.003a8.29 8.29 0 0 1-4.22-1.152l-.302-.18-3.074.806.822-2.995-.197-.309a8.31 8.31 0 0 1-1.282-4.384c0-4.6 3.658-8.34 8.255-8.34 2.203 0 4.275.86 5.833 2.418a8.2 8.2 0 0 1 2.42 5.923c0 4.6-3.742 8.213-8.252 8.213zm4.53-6.185c-.248-.124-1.468-.725-1.695-.807-.227-.083-.393-.124-.558.124-.165.248-.64.806-.785.972-.145.165-.29.186-.537.062-.248-.124-1.046-.385-1.992-1.229-.736-.655-1.233-1.465-1.377-1.713-.145-.248-.016-.382.108-.505.112-.112.248-.29.372-.434.124-.145.165-.248.248-.413.082-.165.041-.31-.021-.434-.062-.124-.558-1.344-.764-1.84-.202-.484-.407-.418-.558-.426l-.475-.009c-.165 0-.434.062-.661.31-.227.248-.868.848-.868 2.068 0 1.22.889 2.398 1.013 2.563.124.165 1.748 2.67 4.234 3.745.591.255 1.052.407 1.411.52.593.189 1.132.163 1.559.099.476-.071 1.468-.6 1.675-1.179.206-.579.206-1.075.145-1.178-.062-.104-.227-.166-.475-.29z" />
        </svg>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-20 right-0 bg-[#1C1C1C] text-[#FBFBFA] px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none">
        Chat with us
        <div className="absolute bottom-0 right-6 transform translate-y-full">
          <div className="border-8 border-transparent border-t-[#1C1C1C]"></div>
        </div>
      </div>
    </a>
  );
};
