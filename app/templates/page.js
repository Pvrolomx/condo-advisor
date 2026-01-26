'use client'

import { useState } from 'react'
import Link from 'next/link'

const templates = [
  {
    id: 'carta-poder',
    titleEs: 'Carta Poder para Asamblea',
    titleEn: 'Power of Attorney for HOA Meeting',
    descEs: 'Autoriza a otra persona para votar en tu nombre en la asamblea.',
    descEn: 'Authorize someone to vote on your behalf at the assembly.',
    icon: '✍️'
  },
  {
    id: 'carta-banco',
    titleEs: 'Carta Instrucción al Banco',
    titleEn: 'Letter of Instruction to Bank',
    descEs: 'Solicita al banco poder para votar si tu propiedad está en fideicomiso.',
    descEn: 'Request voting power from bank if your property is in a trust.',
    icon: '🏦'
  },
  {
    id: 'solicitud-asamblea',
    titleEs: 'Solicitud de Asamblea Extraordinaria',
    titleEn: 'Request for Special Assembly',
    descEs: 'Junta firmas de condóminos para convocar asamblea extraordinaria.',
    descEn: 'Gather owner signatures to call a special assembly.',
    icon: '📋'
  },
  {
    id: 'queja-formal',
    titleEs: 'Queja Formal al Administrador',
    titleEn: 'Formal Complaint to Administrator',
    descEs: 'Documenta quejas sobre vecinos, ruido, mascotas, etc.',
    descEn: 'Document complaints about neighbors, noise, pets, etc.',
    icon: '📝'
  },
  {
    id: 'solicitud-financiera',
    titleEs: 'Solicitud de Información Financiera',
    titleEn: 'Request for Financial Information',
    descEs: 'Solicita estados de cuenta, facturas y reportes del condominio.',
    descEn: 'Request bank statements, invoices and condo reports.',
    icon: '💰'
  },
  {
    id: 'acuerdo-convivencia',
    titleEs: 'Acuerdo de Buena Vecindad',
    titleEn: 'Good Neighbor Agreement',
    descEs: 'Resuelve conflictos vecinales con un acuerdo por escrito.',
    descEn: 'Resolve neighbor disputes with a written agreement.',
    icon: '🤝'
  }
]

export default function Templates() {
  const [lang, setLang] = useState('en')

  return (
    <div className="min-h-screen bg-[#111b21]">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 bg-[#202c33] border-b border-[#2a3942]">
        <Link href="/" className="text-[#00a884] hover:text-[#25d366]">
          ← Back
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-[#e9edef] font-medium">📄 Templates / Plantillas</h1>
        </div>
        <button 
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          className="px-3 py-1 text-sm bg-[#2a3942] text-[#00a884] rounded-full"
        >
          {lang === 'en' ? '🇲🇽 ES' : '🇺🇸 EN'}
        </button>
      </header>

      {/* Content */}
      <div className="p-4 max-w-2xl mx-auto">
        <p className="text-[#8696a0] text-sm mb-6 text-center">
          {lang === 'en' 
            ? 'Download bilingual templates for common condo situations. All documents are in English and Spanish.'
            : 'Descarga plantillas bilingües para situaciones comunes del condominio. Todos los documentos están en inglés y español.'}
        </p>

        <div className="space-y-3">
          {templates.map(t => (
            <a
              key={t.id}
              href={`/templates/${t.id}.md`}
              download
              className="block bg-[#202c33] rounded-xl p-4 border border-[#2a3942] hover:border-[#00a884] transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{t.icon}</span>
                <div className="flex-1">
                  <h3 className="text-[#e9edef] font-medium">
                    {lang === 'en' ? t.titleEn : t.titleEs}
                  </h3>
                  <p className="text-[#8696a0] text-sm mt-1">
                    {lang === 'en' ? t.descEn : t.descEs}
                  </p>
                </div>
                <span className="text-[#00a884]">⬇️</span>
              </div>
            </a>
          ))}
        </div>

        <p className="text-[#8696a0] text-xs mt-6 text-center">
          {lang === 'en'
            ? '💡 Tip: Open in any text editor and fill in your information.'
            : '💡 Tip: Abre en cualquier editor de texto y llena tu información.'}
        </p>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 bg-[#202c33] border-t border-[#2a3942] text-center">
        <p className="text-[#8696a0] text-xs">
          Powered by <span className="text-[#00a884]">duendes.app</span>
        </p>
      </footer>
    </div>
  )
}
