"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { frameworks, programmingLanguages, projects, tools, webTechnologies } from "@/lib/data";

type ProjectKey = "cosmetique" | "qcm" | "stock" | "vente" | "toquiz";

export default function Portfolio() {
  const [currentImages, setCurrentImages] = useState<
    Record<ProjectKey, number>
  >({
    cosmetique: 0,
    qcm: 0,
    stock: 0,
    vente: 0,
    toquiz: 0,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) => ({
        cosmetique: (prev.cosmetique + 1) % projects[0].imageCount,
        qcm: (prev.qcm + 1) % projects[1].imageCount,
        stock: (prev.stock + 1) % projects[2].imageCount,
        vente: (prev.vente + 1) % projects[3].imageCount,
        toquiz: (prev.toquiz + 1) % projects[4].imageCount,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
      className="min-h-screen overflow-x-hidden"
    >
      <NavBar />

      {/* Hero Section */}
      <section
        id="accueil"
        className="min-h-screen flex items-center justify-center px-4 pt-20 md:pt-0"
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
              priority
            />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            Bonjour, je suis{" "}
            <span className="text-[var(--primary)]">RAZAFITSOTRA Toslin</span>,
            développeur web
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-[var(--muted-foreground)]"
          >
            Étudiant en informatique DAII à l’EMIT Fianarantsoa (L3), passionné
            par le développement web.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <motion.a
              href="#projets"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: "var(--primary)",
              }}
              className="px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 cursor-pointer"
            >
              Découvrir mes projets
            </motion.a>

            <motion.a
              href="/images/CV_RAZAFITSOTRA_Toslin.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: "var(--primary)",
              }}
              className="px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 cursor-pointer"
            >
              Télécharger mon CV
            </motion.a>
          </motion.div>
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
            Je suis RAZAFITSOTRA Toslin, étudiant en 3ᵉ année de Licence en
            Informatique, spécialité Développement d’Applications Internet et
            Intranet (DAII) à l’EMIT Fianarantsoa. Passionné par le
            développement web et le développement de jeux vidéo, j’utilise des
            technologies modernes comme React et Next.js pour créer des
            applications performantes et intuitives. Je maîtrise Git et GitHub
            pour la gestion de version et le travail collaboratif. Compétent en
            bureautique (Word, PowerPoint, Excel, Access), je communique
            couramment en français et je continue de perfectionner mon anglais.
            Curieux et créatif, je m’inspire de mes loisirs tels que les jeux
            vidéo, les mangas et les anime.
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
              "« L’expérience est une lanterne que l’on porte sur le dos et qui n’éclaire que le chemin parcouru. Mais chaque pas enrichit notre lumière pour les routes à venir. » – Confucius (adapté)"
            }
          </motion.blockquote>
        </motion.div>
      </section>

      {/* Skills Sections */}
      <SkillsSection title="Technologies Web" skills={webTechnologies} />
      <SkillsSection
        title="Langages de Programmation"
        skills={programmingLanguages}
      />
      <SkillsSection title="Frameworks" skills={frameworks} />
      <SkillsSection title="Outils" skills={tools} />

      {/* Projects Section */}
      <ProjectsSection
        currentImages={currentImages}
        setCurrentImages={setCurrentImages}
        setZoomedImage={setZoomedImage}
        expandedProject={expandedProject}
        setExpandedProject={setExpandedProject}
      />

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

      <footer
        style={{
          backgroundColor: "var(--card)",
          color: "var(--muted-foreground)",
        }}
        className="py-8 mb-20 text-center md:pb-8"
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
            className="fixed bottom-22 right-6 p-3 rounded-full shadow-lg hover:bg-[var(--accent)] transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

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