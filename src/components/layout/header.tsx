"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"

const navLinks = [
  { href: "/projekte", label: "Projekte" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
] as const

const leistungsLinks = [
  { href: "/leistungen#pflege", label: "Pflegeleistungen", description: "Rasenpflege, Heckenschnitt, Dauerpflege" },
  { href: "/leistungen#bau", label: "Bauleistungen", description: "Terrassen, Naturstein, Erdarbeiten" },
] as const

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [leistungenOpen, setLeistungenOpen] = useState(false)

  // Close on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className="mx-auto max-w-7xl rounded-2xl border border-black/10 bg-white/80 px-6 shadow-sm backdrop-blur-md">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" aria-label="Zur Startseite">
              <Image
                src="/logos/logo-amini.png"
                alt="Grünschnitt by Marvin Amini"
                width={140}
                height={94}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-1">
                {/* Startseite */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={cn(
                        "px-3 py-2 text-sm font-medium transition-colors text-foreground/60 hover:text-foreground",
                        isActive("/") && "text-primary font-semibold"
                      )}
                    >
                      Startseite
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Leistungen mit Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-foreground/60 hover:text-foreground",
                      isActive("/leistungen") && "text-primary font-semibold"
                    )}
                  >
                    Leistungen
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-56 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/leistungen"
                            className="block rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            Alle Leistungen
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="my-1 border-t border-black/5" />
                      {leistungsLinks.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block rounded-lg px-3 py-2 transition-colors hover:bg-primary/5 hover:text-primary"
                            >
                              <div className="text-sm font-medium text-foreground/80">{item.label}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Restliche Links */}
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "px-3 py-2 text-sm font-medium transition-colors text-foreground/60 hover:text-foreground",
                          isActive(link.href) && "text-primary font-semibold"
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Desktop CTA + Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link href="/kontakt">Kontakt aufnehmen</Link>
              </Button>

              <button
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white/60 backdrop-blur-sm transition-colors hover:bg-white/80"
                aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Fullscreen Mobile Menu ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col transition-all duration-300 md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", backgroundColor: "rgba(255,255,255,0.85)" }}
        aria-hidden={!mobileOpen}
      >
        {/* Close button top-right */}
        <div className="flex justify-end px-6 pt-6">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Menü schließen"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/60 backdrop-blur-sm"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-1" aria-label="Mobile Navigation">
          {/* Startseite */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "w-full max-w-xs rounded-2xl px-6 py-4 text-center text-xl font-semibold transition-colors text-foreground/70 hover:bg-primary/5 hover:text-primary",
              isActive("/") && "text-primary bg-primary/5"
            )}
          >
            Startseite
          </Link>

          {/* Leistungen mit Submenu */}
          <div className="w-full max-w-xs">
            <button
              onClick={() => setLeistungenOpen((v) => !v)}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-xl font-semibold transition-colors text-foreground/70 hover:bg-primary/5 hover:text-primary",
                isActive("/leistungen") && "text-primary bg-primary/5"
              )}
            >
              Leistungen
              <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", leistungenOpen && "rotate-180")} />
            </button>
            {leistungenOpen && (
              <div className="mt-1 flex flex-col gap-1 pl-4">
                <Link
                  href="/leistungen"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-5 py-3 text-base font-medium text-foreground/60 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  Alle Leistungen
                </Link>
                {leistungsLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-5 py-3 text-base font-medium text-foreground/60 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Restliche Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "w-full max-w-xs rounded-2xl px-6 py-4 text-center text-xl font-semibold transition-colors text-foreground/70 hover:bg-primary/5 hover:text-primary",
                isActive(link.href) && "text-primary bg-primary/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-3 px-6 pb-16">
          <Button asChild size="lg" className="w-full max-w-xs">
            <Link href="/kontakt" onClick={() => setMobileOpen(false)}>
              Kontakt aufnehmen
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full max-w-xs">
            <a href="tel:+4915168452004">
              <Phone className="mr-2 h-4 w-4" />
              Anrufen
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}
