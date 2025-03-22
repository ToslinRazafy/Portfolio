"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Home,
  User,
  Briefcase,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Code,
} from "lucide-react";

type ProjectKey = "cosmetique" | "qcm" | "stock" | "vente";

export default function Portfolio() {
  const [currentImages, setCurrentImages] = useState<
    Record<ProjectKey, number>
  >({
    cosmetique: 0,
    qcm: 0,
    stock: 0,
    vente: 0,
  });
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<{
    project: string;
    index: number;
  } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const navItems = [
    { id: "accueil", label: "Accueil", icon: <Home size={24} /> },
    { id: "a-propos", label: "À propos", icon: <User size={24} /> },
    { id: "projets", label: "Projets", icon: <Briefcase size={24} /> },
    { id: "competences", label: "Compétences", icon: <Code size={24} /> },
    { id: "contact", label: "Contact", icon: <MessageSquare size={24} /> },
  ];

  const skills = [
    {
      name: "ReactJs",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/react/react-original.svg",
    },
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/css3/css3-original.svg",
    },
    {
      name: "NodeJs",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/javascript/javascript-original.svg",
    },
    {
      name: "PHP",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/php/php-original.svg",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/mysql/mysql-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/tailwindcss/tailwindcss-plain.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/git/git-original.svg",
    },
  ];

  const programmingLanguages = [
    {
      name: "C",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/c/c-original.svg",
    },
    {
      name: "NextJs",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "C#",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/csharp/csharp-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/python/python-original.svg",
    },
    {
      name: "Spring Boot",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/spring/spring-original.svg",
    },
    {
      name: "Laravel",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
    },
    {
      name: "JavaFX",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/java/java-original.svg",
    },
    {
      name: "Java Swing",
      icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/java/java-original.svg",
    },
  ];

  const projects = [
    {
      name: "cosmetique",
      title: "Cosmétique E-commerce",
      shortDescription: "Une plateforme e-commerce pour produits cosmétiques.",
      fullDescription:
        "Plateforme e-commerce complète avec Spring Boot et ReactJs, intégrant panier, paiement sécurisé via Stripe, authentification, et tableau de bord admin.",
      github: "https://github.com/ToslinRazafy/Cosm-tique-E-commerce.git",
      languages: ["Spring Boot", "PostgreSQL", "ReactJs", "Tailwind CSS"],
      imageCount: 10,
    },
    {
      name: "qcm",
      title: "QCM Interactif",
      shortDescription: "Application de quiz interactifs.",
      fullDescription:
        "Quiz interactif avec Laravel, Socket.io pour mises à jour en temps réel, NextJs avec Chadcn UI, et PostgreSQL pour les données.",
      github: "https://github.com/ToslinRazafy/QCM-Gamifie.git",
      languages: [
        "Laravel",
        "PostgreSQL",
        "NodeJs (Socket.io)",
        "NextJs",
        "Tailwind CSS",
      ],
      imageCount: 24,
    },
    {
      name: "stock",
      title: "Gestion de Stock",
      shortDescription: "Système de gestion d’inventaire.",
      fullDescription:
        "Gestion d’inventaire avec NodeJs, Express, Sequelize, MySQL, incluant suivi des stocks et rapports.",
      github: "https://github.com/ToslinRazafy/Gestion-de-Stock.git",
      languages: ["NodeJs (Express)", "Sequelize", "MySQL", "Tailwind CSS"],
      imageCount: 7,
    },
    {
      name: "vente",
      title: "Plateforme de Vente",
      shortDescription: "Gestion des ventes.",
      fullDescription:
        "Plateforme de ventes avec Laravel, PostgreSQL, suivi des ventes, rapports en temps réel, et tableau analytique.",
      github: "https://github.com/ToslinRazafy/Gestion-de-vente.git",
      languages: ["Laravel", "PostgreSQL", "Tailwind CSS"],
      imageCount: 4,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) => ({
        cosmetique: (prev.cosmetique + 1) % projects[0].imageCount,
        qcm: (prev.qcm + 1) % projects[1].imageCount,
        stock: (prev.stock + 1) % projects[2].imageCount,
        vente: (prev.vente + 1) % projects[3].imageCount,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [projects]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNextImage = (projectName: ProjectKey, imageCount: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      [projectName]: (prev[projectName] + 1) % imageCount,
    }));
  };

  const handlePrevImage = (projectName: ProjectKey, imageCount: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      [projectName]: (prev[projectName] - 1 + imageCount) % imageCount,
    }));
  };

  const desktopNav = (
    <nav
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      className="fixed top-0 w-full shadow-lg z-50 hidden md:block backdrop-blur-md border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ color: "var(--card-foreground)" }}
            className="text-xl font-bold tracking-tight"
          >
            RAZAFITSOTRA Toslin
          </motion.div>
          <motion.ul
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="flex space-x-8"
          >
            {navItems.map((item) => (
              <motion.li key={item.id} variants={fadeInUp}>
                <a
                  href={`#${item.id}`}
                  style={{
                    color: "var(--muted-foreground)",
                    transition: "color 0.3s ease-in-out",
                  }}
                  className="hover:text-[var(--primary)]"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </nav>
  );

  const mobileNav = (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      className="fixed bottom-0 left-0 right-0 shadow-t-lg z-50 md:hidden backdrop-blur-md border-t"
    >
      <ul className="flex justify-around py-3">
        {navItems.map((item) => (
          <motion.li
            key={item.id}
            whileTap={{ scale: 0.9 }}
            variants={fadeInUp}
          >
            <a
              href={`#${item.id}`}
              style={{ color: "var(--muted-foreground)" }}
              className="flex flex-col items-center hover:text-[var(--primary)] p-2 transition-colors duration-300"
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
      className="min-h-screen overflow-x-hidden"
    >
      {desktopNav}
      {mobileNav}

      {/* Hero Section */}
      <section
        id="accueil"
        style={{
          background: `linear-gradient(to bottom right, var(--primary), var(--accent))`,
        }}
        className="min-h-screen flex items-center justify-center text-[var(--primary-foreground)] px-4 pt-20 md:pt-0"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="text-center max-w-4xl"
        >
          <motion.div
            variants={fadeInUp}
            className="relative w-32 h-32 mx-auto mb-6"
          >
            <Image
              src="/images/moi.jpg"
              alt="RAZAFITSOTRA Toslin"
              fill
              className="rounded-full object-cover border-4 border-[var(--secondary)] shadow-lg"
            />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            Bonjour, je suis RAZAFITSOTRA Toslin, développeur web
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Étudiant en informatique DAII en EMIT Fianarantsoa L3, passionné par
            le développement web.
          </motion.p>
          <motion.button
            variants={fadeInUp}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255,255,255,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--primary)",
            }}
            className="px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
          >
            <a href="#projets">Découvrir mes projets</a>
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="a-propos"
        style={{ backgroundColor: "var(--muted)" }}
        className="py-20 px-4 md:pb-20 pb-24"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            style={{ color: "var(--foreground)" }}
            className="text-4xl font-bold mb-12 text-center"
          >
            À propos de moi
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            style={{ color: "var(--muted-foreground)" }}
            className="leading-relaxed text-lg mb-8"
          >
            Je suis RAZAFITSOTRA Toslin, étudiant en troisième année de Licence
            (L3) en Informatique, spécialité Développement d&apos;Applications
            Internet et Intranet (DAII), à l’École de Management et d’Innovation
            Technologique (EMIT) de Fianarantsoa. Passionné par le développement
            web, je travaille sur des projets en utilisant des technologies
            modernes telles que React et Next.js. Mon ambition est de concevoir
            des applications performantes, esthétiques et conviviales, tout en
            perfectionnant mes compétences en informatique. Dans le domaine
            bureautique, je maîtrise parfaitement MS Word, MS PowerPoint, MS
            Excel et MS Access, des outils que j’utilise avec aisance pour
            structurer et présenter mes travaux. Je suis également très à l’aise
            en langue française, que je pratique couramment, et je possède des
            notions en anglais que je cherche à approfondir. En dehors de mes
            études, j’aime me détendre en jouant à des jeux vidéo sur mobile, en
            lisant des mangas et en regardant des anime japonais, des loisirs
            qui nourrissent ma créativité et ma curiosité.
          </motion.p>
          <motion.blockquote
            variants={fadeInUp}
            style={{
              color: "var(--primary)",
              borderLeft: "4px solid var(--primary)",
              paddingLeft: "1rem",
            }}
            className="text-lg italic mb-8"
          >
            {
              '"L’expérience est une lanterne que l’on porte sur le dos et qui n’éclaire que le chemin parcouru. Mais chaque pas enrichit notre lumière pour les routes à venir." – Confucius (adapté)'
            }
          </motion.blockquote>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section
        id="competences"
        style={{ backgroundColor: "var(--background)" }}
        className="py-20 px-4"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            style={{ color: "var(--foreground)" }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Mes Compétences
          </motion.h2>
          <motion.div
            variants={staggerChildren}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="card-hover flex flex-col items-center justify-center p-4 rounded-lg shadow-md"
                style={{ backgroundColor: "var(--card)" }}
              >
                <div className="relative w-12 h-12 glow-effect mb-2">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span
                  style={{ color: "var(--card-foreground)" }}
                  className="text-sm text-center"
                >
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Programming Languages Section */}
      <section
        id="langages"
        style={{ backgroundColor: "var(--muted)" }}
        className="py-20 px-4"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            style={{ color: "var(--foreground)" }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Langages de Programmation Étudiés
          </motion.h2>
          <motion.div
            variants={staggerChildren}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6"
          >
            {programmingLanguages.map((lang) => (
              <motion.div
                key={lang.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="card-hover flex flex-col items-center justify-center p-4 rounded-lg shadow-md"
                style={{ backgroundColor: "var(--card)" }}
              >
                <div className="relative w-12 h-12 glow-effect mb-2">
                  <Image
                    src={lang.icon}
                    alt={lang.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span
                  style={{ color: "var(--card-foreground)" }}
                  className="text-sm text-center"
                >
                  {lang.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        id="projets"
        style={{ backgroundColor: "var(--background)" }}
        className="py-20 px-4 md:pb-20 pb-24"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ color: "var(--foreground)" }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Mes Projets
          </motion.h2>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.name}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
                style={{ backgroundColor: "var(--card)" }}
                className="p-6 rounded-xl shadow-lg transition-all duration-300"
              >
                <div
                  className="relative h-48 mb-4 cursor-pointer rounded-lg overflow-hidden"
                  onClick={() =>
                    setZoomedImage({
                      project: project.name,
                      index: currentImages[project.name as ProjectKey],
                    })
                  }
                >
                  <Image
                    src={`/images/${project.name}/${
                      currentImages[project.name as ProjectKey] + 1
                    }.png`}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage(
                        project.name as ProjectKey,
                        project.imageCount
                      );
                    }}
                    style={{ backgroundColor: "var(--secondary)" }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-opacity-80 p-1 rounded-full hover:bg-[var(--secondary)] transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage(
                        project.name as ProjectKey,
                        project.imageCount
                      );
                    }}
                    style={{ backgroundColor: "var(--secondary)" }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-opacity-80 p-1 rounded-full hover:bg-[var(--secondary)] transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <h3
                  style={{ color: "var(--card-foreground)" }}
                  className="text-xl font-semibold mb-2"
                >
                  {project.title}
                </h3>
                <p
                  style={{ color: "var(--muted-foreground)" }}
                  className="mb-4"
                >
                  {expandedProject === project.name
                    ? project.fullDescription
                    : project.shortDescription}
                </p>
                <button
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === project.name ? null : project.name
                    )
                  }
                  style={{ color: "var(--primary)" }}
                  className="hover:underline mb-4 transition-colors"
                >
                  {expandedProject === project.name
                    ? "Voir moins"
                    : "Voir plus"}
                </button>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.languages.map((lang) => (
                    <span
                      key={lang}
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-foreground)",
                      }}
                      className="text-sm px-2 py-1 rounded-full"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--primary)" }}
                  className="flex items-center hover:underline transition-colors"
                >
                  <Github size={20} className="mr-2" /> GitHub
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{ backgroundColor: "var(--muted)" }}
        className="py-20 px-4 md:pb-20 pb-24"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            style={{ color: "var(--foreground)" }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Contactez-moi
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <p
                style={{ color: "var(--muted-foreground)" }}
                className="text-lg mb-6"
              >
                N’hésitez pas à me contacter pour discuter de vos projets ou
                opportunités de collaboration !
              </p>
              <div className="flex space-x-6">
                <a
                  href="mailto:razafitosy@gmail.com"
                  style={{ color: "var(--primary)" }}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  <Mail size={28} />
                </a>
                <a
                  href="https://github.com/ToslinRazafy"
                  style={{ color: "var(--primary)" }}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  <Github size={28} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61564105433601"
                  style={{ color: "var(--primary)" }}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-2.596 0-4.192 1.583-4.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "var(--card)",
          color: "var(--muted-foreground)",
        }}
        className="py-8 text-center md:pb-8 pb-20"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.p variants={fadeInUp}>© 2025 RAZAFITSOTRA Toslin</motion.p>
        </motion.div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
            className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg hover:bg-[var(--accent)] transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Zoomed Image Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm items-center justify-center"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-11/12 max-w-5xl"
            >
              <Image
                src={`/images/${zoomedImage.project}/${
                  zoomedImage.index + 1
                }.png`}
                alt="Zoomed screenshot"
                width={1200}
                height={800}
                className="object-contain rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage(
                    zoomedImage.project as ProjectKey,
                    projects.find((p) => p.name === zoomedImage.project)!
                      .imageCount
                  );
                  setZoomedImage({
                    ...zoomedImage,
                    index:
                      (zoomedImage.index -
                        1 +
                        projects.find((p) => p.name === zoomedImage.project)!
                          .imageCount) %
                      projects.find((p) => p.name === zoomedImage.project)!
                        .imageCount,
                  });
                }}
                style={{ backgroundColor: "var(--secondary)" }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage(
                    zoomedImage.project as ProjectKey,
                    projects.find((p) => p.name === zoomedImage.project)!
                      .imageCount
                  );
                  setZoomedImage({
                    ...zoomedImage,
                    index:
                      (zoomedImage.index + 1) %
                      projects.find((p) => p.name === zoomedImage.project)!
                        .imageCount,
                  });
                }}
                style={{ backgroundColor: "var(--secondary)" }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
              >
                <ChevronRight size={28} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
