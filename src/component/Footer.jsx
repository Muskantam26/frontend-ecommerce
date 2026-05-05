import React, { useState, useEffect } from 'react';
import { ArrowUp, Plus, Minus } from 'lucide-react';
import { MainContent } from '../constant/MainContent';
import { footerData } from '../constant/footerData';
import { useNavigate } from 'react-router-dom';

const Footer = ({ data = footerData }) => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleSection = (section) => {
    if (!isMobile) return;
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-black  text-white pb-6 md:pb-8 font-sans">
      <div className="">
        <div className="lg:grid lg:grid-cols-12 flex flex-col md:gap-5 lg:gap-5">
          
          {/* Logo and Intro Section */}
          <div className="lg:col-span-4 flex flex-col gap-6 footer-img w-full justify-center px-4 py-10 md:px-10 md:py-10 relative">
            <div className="flex items-center gap-3">
             <img src={MainContent.appLogo} alt="Logo here" className="w-[150px] md:w-40" />
            </div>
            <p className="text-white text-[15px] md:text-sm leading-[1.8] max-w-sm font-medium md:font-normal mt-2">
              {data.aboutText}
            </p>
            <div className="flex gap-4 mt-4">
              {data.socialLinks.map((social, index) => (
                <span 
                  key={index} 
                  onClick={() => navigate(social.url)} 
                  className="w-[52px] h-[52px] md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                  aria-label={social.label}
                >
                  <span dangerouslySetInnerHTML={{ __html: social.iconSvg }} className="w-5 h-5 md:w-[18px] md:h-[18px]" />
                </span>
              ))}
            </div>
          </div>

          {/* Right Side Sections */}
          <div className="lg:col-span-8 px-4 pt-6 md:px-10 md:pt-10">
            {/* Newsletter Row */}
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 mb-12 lg:mb-16 lg:mt-4 items-start lg:items-center">
              <div className="lg:col-span-5 w-full">
                <h3 className="text-[17px] font-bold tracking-wider mb-2 uppercase">{data.newsletter.title}</h3>
                <p className="text-white text-[12px] md:text-[11px] mb-2 lg:mb-0 uppercase font-semibold tracking-wider font-sans">{data.newsletter.subtitle}</p>
              </div>
              <div className="lg:col-span-7 w-full mt-2 lg:mt-0">
                <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder={data.newsletter.placeholder} 
                    className="flex-1 bg-transparent border border-white text-white px-4 md:px-5 py-[14px] text-xs font-medium focus:outline-none focus:border-white transition-colors placeholder-white"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-white text-black px-4 md:px-4 py-[14px] text-xs font-bold tracking-widest hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    {data.newsletter.buttonText}
                  </button>
                </form>
              </div>
            </div>

            {/* Links Columns */}
            <div className="flex flex-col md:grid md:grid-cols-3 gap-0 md:gap-8 mt-4 md:mt-0">
              
              {/* Customer Care */}
              <div className="py-4 md:py-0 border-t border-[#222] md:border-none">
                <div 
                  className="flex justify-between items-center cursor-pointer md:cursor-auto"
                  onClick={() => toggleSection('customerCare')}
                >
                  <h3 className="text-[16px] md:text-[15px] font-bold tracking-wider uppercase m-0 md:mb-6">{data.links.customerCare.title}</h3>
                  <div className="md:hidden text-white">
                    {openSection === 'customerCare' ? <Minus size={22} strokeWidth={2} /> : <Plus size={22} strokeWidth={2} />}
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${isMobile ? (openSection === 'customerCare' ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0') : 'max-h-none opacity-100 mt-0'}`}>
                  <ul className="flex flex-col gap-5">
                    {data.links.customerCare.items.map((link, index) => (
                      <li key={index}>
                        <span onClick={() => navigate(link.url)} className="text-white font-medium hover:text-brand-text-hover text-[13px] md:text-xs uppercase tracking-wide transition-colors cursor-pointer block">
                          {link.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Help & Support */}
              <div className="py-4 md:py-0 border-t border-[#222] md:border-none">
                <div 
                  className="flex justify-between items-center cursor-pointer md:cursor-auto"
                  onClick={() => toggleSection('helpSupport')}
                >
                  <h3 className="text-[16px] md:text-[15px] font-bold tracking-wider uppercase m-0 md:mb-6">{data.links.helpSupport.title}</h3>
                  <div className="md:hidden text-white">
                    {openSection === 'helpSupport' ? <Minus size={22} strokeWidth={2} /> : <Plus size={22} strokeWidth={2} />}
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${isMobile ? (openSection === 'helpSupport' ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0') : 'max-h-none opacity-100 mt-0'}`}>
                  <ul className="flex flex-col gap-5">
                    {data.links.helpSupport.items.map((link, index) => (
                      <li key={index}>
                        <span onClick={() => navigate(link.url)} className="text-white font-medium hover:text-brand-text-hover text-[13px] md:text-xs uppercase tracking-wide transition-colors cursor-pointer block">
                          {link.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Company Info */}
              <div className="py-4 border-t border-[#222] md:border-none md:py-0">
                <div 
                  className="flex justify-between items-center cursor-pointer md:cursor-auto"
                  onClick={() => toggleSection('companyInfo')}
                >
                  <h3 className="text-[16px] md:text-[15px] font-bold tracking-wider uppercase m-0 md:mb-6">{data.links.companyInfo.title}</h3>
                  <div className="md:hidden text-white">
                    {openSection === 'companyInfo' ? <Minus size={22} strokeWidth={2} /> : <Plus size={22} strokeWidth={2} />}
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${isMobile ? (openSection === 'companyInfo' ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0') : 'max-h-none opacity-100 mt-0'}`}>
                  <ul className="flex flex-col gap-[20px] md:gap-[18px]">
                    {data.links.companyInfo.items.map((link, index) => (
                      <li key={index}>
                        <span onClick={() => navigate(link.url)} className="text-white font-medium hover:text-brand-text-hover text-[13px] md:text-[11px] uppercase tracking-widest transition-colors cursor-pointer block">
                          {link.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="mt-8 md:mt-16 pt-8 border-t border-[#333] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-6 md:px-10 pb-4">
          <div className="text-white text-[13px] md:text-[11px] uppercase font-semibold flex flex-col gap-2 tracking-widest">
            <p className="mb-0">{data.copyright}</p>
            <p className="mb-0">{data.allRightsReserved}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-2 lg:-ml-12 mt-2 md:mt-0">
            {data.paymentMethods.map((method, index) => {
              return (
                <div key={index} className="h-9 md:h-8 flex items-center justify-center bg-white rounded-[4px] px-2 ">
                  <img src={method.image} alt={method.name} className="max-h-5 md:max-h-5 max-w-[40px] md:max-w-[36px] object-contain" />
                </div>
              );
            })}
          </div>

          <button 
            onClick={scrollToTop}
            className="hidden md:flex w-11 h-11 rounded-full border border-brand text-brand items-center justify-center hover:bg-brand hover:text-black transition-colors"
          >
            <ArrowUp size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
