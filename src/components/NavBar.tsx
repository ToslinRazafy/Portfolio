"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  MessageSquare,
  Code,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const navItems = [
  { id: "accueil", label: "Accueil", icon: <Home size={20} /> },
  { id: "a-propos", label: "À propos", icon: <User size={20} /> },
  { id: "projets", label: "Projets", icon: <Briefcase size={20} /> },
  { id: "competences", label: "Compétences", icon: <Code size={20} /> },
  { id: "contact", label: "Contact", icon: <MessageSquare size={20} /> },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  // Vérifier si le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Gestion du scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  // Détection de la section active
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      sections.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-0 w-full z-50 hidden md:block backdrop-blur-md border-b transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? "var(--card)"
            : "rgba(var(--card-rgb), 0.7)",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ color: "var(--card-foreground)" }}
              className="text-xl font-bold tracking-tight flex items-center gap-2"
            >
              <motion.span
                animate={scrolled ? { scale: 1 } : { scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                RAZAFITSOTRA Toslin
              </motion.span>
            </motion.div>

            <motion.ul
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              className="flex space-x-6 items-center"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={`#${item.id}`}
                    className={`relative px-3 py-2 transition-colors duration-200 ${
                      activeSection === item.id
                        ? "text-[var(--primary)] font-medium"
                        : "text-[var(--muted-foreground)] hover:text-[var(--primary)]"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-[var(--primary)]"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
              {/* Toggle Button Desktop */}
              {isMounted && (
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun size={20} className="text-[var(--primary)]" />
                  ) : (
                    <Moon size={20} className="text-[var(--primary)]" />
                  )}
                </motion.li>
              )}
            </motion.ul>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-md border-t"
        style={{
          backgroundColor: "rgba(var(--card-rgb), 0.95)",
          borderColor: "var(--border)",
        }}
      >
        <ul className="flex justify-around py-2 items-center">
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
              className="relative"
            >
              <a
                href={`#${item.id}`}
                className={`flex flex-col items-center p-2 transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted-foreground)]"
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
                {activeSection === item.id && (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className="absolute top-0 w-1 h-1 rounded-full bg-[var(--primary)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Floating Toggle Button Mobile */}
      {isMounted && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="md:hidden fixed top-4 right-4 z-[100] p-2 rounded-full shadow-lg backdrop-blur-md bg-[var(--card)] border border-[var(--border)]"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-[var(--primary)]" />
          ) : (
            <Moon size={20} className="text-[var(--primary)]" />
          )}
        </motion.button>
      )}
    </>
  );
}