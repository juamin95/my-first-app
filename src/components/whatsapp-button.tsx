"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

const WHATSAPP_NUMBER = "4915168452004"
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hallo, ich interessiere mich für eine Anfrage und würde gerne mehr erfahren."
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

function getTime() {
  return new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const time = getTime()

  useEffect(() => {
    if (!sessionStorage.getItem("wa-chat-closed")) {
      const t = setTimeout(() => setOpen(true), 3000)
      return () => clearTimeout(t)
    }
  }, [])

  function handleClose() {
    sessionStorage.setItem("wa-chat-closed", "1")
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-whatsapp flex flex-col items-end gap-3 pointer-events-none">

      {/* ── Chat Window ─────────────────────────────────── */}
      <div
        role="dialog"
        aria-label="WhatsApp Chat"
        aria-hidden={!open}
        className={`
          w-[300px] overflow-hidden rounded-2xl bg-white
          transition-all duration-300 origin-bottom-right
          ${open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none select-none"}
        `}
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.28), 0 2px 12px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)" }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center gap-2.5 px-3 py-3"
          style={{ backgroundColor: "#075E54" }}
        >
          <div className="relative shrink-0">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.25)" }}>
              <Image
                src="/logos/logo-amini.png"
                alt="Grünschnitt Logo"
                width={40}
                height={40}
                className="h-full w-full object-contain p-0.5"
              />
            </div>
            {/* Online dot */}
            <span
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#25D366", border: "2px solid #075E54" }}
            />
          </div>

          <p className="flex-1 min-w-0 truncate text-[13px] font-semibold text-white">
            Grünschnitt by Marvin Amini
          </p>

          <button
            onClick={handleClose}
            aria-label="Chat schließen"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── Chat Body ── */}
        <div
          className="px-3 py-4"
          style={{
            backgroundColor: "#E5DDD5",
            backgroundImage: "url('/images/whatsapp-bg.jpg')",
            backgroundBlendMode: "multiply",
            backgroundSize: "320px",
          }}
        >
          {/* Speech bubble */}
          <div className="relative rounded-lg rounded-tl-none bg-white px-3 py-2.5 shadow-sm">
            {/* Triangle tail */}
            <span
              className="absolute -left-[7px] top-0"
              style={{
                width: 0,
                height: 0,
                borderRight: "8px solid white",
                borderTop: "8px solid transparent",
              }}
            />
            {/* Sender name inside bubble */}
            <p className="mb-1 text-[10.5px] font-semibold" style={{ color: "#075E54" }}>
              Grünschnitt by Marvin Amini
            </p>
            <p className="text-[12px] leading-[1.5] text-gray-800">
              Guten Tag 👋
            </p>
            <p className="mt-1 text-[12px] leading-[1.5] text-gray-800">
              Wie können wir Ihnen helfen?
            </p>
            <p className="mt-1 text-right text-[10px] text-gray-400">{time}</p>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="px-3 py-3" style={{ backgroundColor: "#ffffff" }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            {/* Inline white WA icon – no Tailwind fill class, guaranteed white */}
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="white"
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
              />
              <path
                fill="white"
                d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.119 1.532 5.845L.057 23.571a.5.5 0 00.609.609l5.726-1.475A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.877 9.877 0 01-5.034-1.378l-.361-.214-3.741.964.991-3.633-.235-.374A9.877 9.877 0 012.118 12C2.118 6.54 6.54 2.118 12 2.118c5.46 0 9.882 4.422 9.882 9.882 0 5.46-4.422 9.882-9.882 9.882z"
              />
            </svg>
            Chat starten
          </a>
        </div>
      </div>

      {/* ── Floating Toggle Button ────────────────────────── */}
      <button
        onClick={() => open ? handleClose() : setOpen(true)}
        aria-label={open ? "Chat schließen" : "Auf WhatsApp schreiben"}
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-200 hover:scale-110 active:scale-95 pointer-events-auto"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)" }}
      >
        {/* Notification dot */}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500" />
        )}

        {/* WA icon (closed state): green speech bubble + white phone */}
        <div className={`absolute transition-all duration-200 ${open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
          <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true">
            {/* Filled speech bubble with tail (the actual WhatsApp logo shape) */}
            <path
              fill="#25D366"
              d="M20.52 3.449C18.245 1.245 15.241 0 12.047 0 5.463 0 .104 5.335.101 11.893c-.001 2.096.546 4.142 1.588 5.946L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.52 3.45"
            />
            {/* White phone handset */}
            <path
              fill="white"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
            />
          </svg>
        </div>

        {/* X icon (open state) */}
        <div className={`absolute transition-all duration-200 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`}>
          <X className="h-6 w-6 text-gray-500" />
        </div>
      </button>
    </div>
  )
}
