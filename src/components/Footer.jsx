"use client"
import VinotecaContext from '@/context/VinotecaContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const Footer = () => {

  const { colorear, setColorear } = useContext(VinotecaContext);

  const footerData = [
    { type: "text", value: "📍 Av. Las Flores 1600, Barrio Gráfico, Wilde" },
    { type: "link", value: "📞 +54 11 3588 0974", href: "https://wa.me/541135880974" },
    { type: "link", value: "✉ galvarezp.dev@gmail.com", href: "mailto:galvarezp.dev@gmail.com" },
    { type: "text", value: "🕒 Lun a Jue 09:00 - 18:00" },
    { type: "link", value: "📸 @galvarezp.dev", href: "https://www.instagram.com/galvarezp.dev/" }
  ]

  return (
    <footer className='flex-col gap-0_5rem aI-center fS-12px-mQ pdUD-0_5rem-mQ'>
      <div className='flex-row fW-wR jC-center gap-0_5rem w-100 w-90-mQ tA-center aI-center'>
        {footerData.map((item, i) => (
          <div className='flex-row gap-0_5rem' key={i}>
            {item.type === "text" && <p>{item.value}</p>}
            {item.type === "link" && (
              <p>
                <Link
                  className={`fC-letrasFooter ${colorear}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.value}
                </Link>
              </p>
            )}
            {i < footerData.length - 1 && <p className="dS-none-mQ">|</p>}
          </div>
        ))}
      </div>

      <div className='w-100 w-90-mQ tA-center'>
        <p>© 2025 Vinoteca Alvarez Rapetti es ficticia. Todos los derechos reservados.</p>
      </div>
    </footer>

  )
}

export default Footer