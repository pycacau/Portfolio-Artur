import React from "react"
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"

export function Footer({ logo, brandName, socialLinks, mainLinks, legalLinks, copyright, className }) {
  return (
    <footer className={cn("bg-black border-t border-white/10 py-12 md:py-16 text-white", className)}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {logo}
              <span className="text-xl font-bold tracking-tight">{brandName}</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Building digital solutions with creativity and code.
            </p>
            <div className="flex gap-4 mt-2">
              {socialLinks && socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-8">
             {/* Main Links */}
             <div>
                <h3 className="font-semibold mb-4">Navegação</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  {mainLinks && mainLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
             </div>
             {/* Legal/Other Links */}
             <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                   {legalLinks && legalLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
          
           <div className="flex flex-col gap-4">
              {/* Optional 4th column */}
           </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>{copyright?.text}</p>
          <p className="text-xs">{copyright?.license}</p>
        </div>
      </div>
    </footer>
  )
}
