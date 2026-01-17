import { Mail, Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative text-white bg-[#160E77] mt-4 sm:mt-5 md:mt-6 lg:mt-8 overflow-hidden">
      {/* MAIN WRAPPER */}
      <div
        className="
          relative max-w-7xl mx-auto 
          px-4 sm:px-6 md:px-8 

          py-10 sm:py-12 lg:py-10    
          /* Mobile: decent height, Tablet: medium, Laptop: compact */

          space-y-10 sm:space-y-12 lg:space-y-10
          /* Laptop me spacing bhi kam */
        "
      >
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8">
          {/* LEFT SECTION */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo/logo-white.png"
                width={160}
                height={60}
                alt="MarkMyAd"
                className="object-contain transition-all duration-300 hover:scale-[1.04]"
              />
            </div>

            {/* Contact */}
            <div className="space-y-5 text-[#F7F9FC] text-center md:text-left">
              {/* Phone */}
              <div className="flex items-center justify-center md:justify-start gap-3 group cursor-pointer">
                <Smartphone
                  size={22}
                  className="transition-all duration-300 group-hover:-translate-y-[2px]"
                />

                <a
                  href="tel:+917700000766"
                  className="
                    transition-all duration-300 relative inline-block
                    group-hover:-translate-y-[2px]
                    after:absolute after:left-0 after:-bottom-[3px]
                    after:h-[2px] after:bg-white after:w-0
                    after:transition-all after:duration-300 
                    group-hover:after:w-full
                  "
                >
                  +91 7700000766
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center justify-center md:justify-start gap-3 group cursor-pointer">
                <Mail
                  size={22}
                  className="transition-all duration-300 group-hover:-translate-y-[2px]"
                />

                <a
                  href="mailto:Akshay@markmyad.com"
                  className="
                    transition-all duration-300 relative inline-block
                    group-hover:-translate-y-[2px]
                    after:absolute after:left-0 after:-bottom-[3px]
                    after:h-[2px] after:bg-white after:w-0
                    after:transition-all after:duration-300 
                    group-hover:after:w-full
                  "
                >
                  Akshay@markmyad.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-xl font-semibold">Resources</h3>

            <div className="flex flex-col items-center md:items-start gap-3 text-[#C5C8FF]">
              {[
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/faqs', label: 'FAQs' },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="group relative inline-block transition-all duration-300 hover:text-white"
                >
                  <span
                    className="
                      relative inline-block 
                      group-hover:-translate-y-[2px]
                      transition-all duration-300
                    "
                  >
                    {item.label}

                    <span
                      className="
                        absolute left-0 -bottom-1 h-[1.5px]
                        w-0 bg-white rounded-full
                        transition-all duration-300
                        group-hover:w-full
                      "
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/40" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-4">
          <p className="text-sm text-[#E8E9FF] text-center md:text-left">
            © 2025 Matus Business Ventures Private Limited
          </p>

          {/* Social Icons */}
          <ul className="flex items-center justify-center gap-8 lg:gap-6">
            {[
              {
                src: '/logo/face.png',
                label: 'Facebook',
                link: 'https://facebook.com/Markmyadindia',
              },
              {
                src: '/logo/google.png',
                label: 'Threads',
                link: 'https://www.threads.net/@markmyadindia',
              },
              {
                src: '/logo/link.png',
                label: 'LinkedIn',
                link: 'https://www.linkedin.com/company/mark-my-ad/',
              },
              {
                src: '/logo/tw.png',
                label: 'Twitter',
                link: 'https://twitter.com/Markmyad',
              },
            ].map((item, i) => (
              <li key={i} className="group flex flex-col items-center cursor-pointer">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    transition-all duration-300 
                    group-hover:-translate-y-1 
                    group-hover:scale-110
                  "
                >
                  <Image
                    src={item.src}
                    width={26}
                    height={26}
                    alt={item.label}
                    className="transition-all duration-300"
                  />
                </a>

                <span
                  className="
                    block h-[1.5px]
                    bg-white/70
                    w-0 
                    group-hover:w-8 
                    transition-all duration-300 
                    rounded-full mt-1
                  "
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
