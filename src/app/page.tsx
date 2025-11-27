"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Download,
  Badge,
} from "lucide-react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import {
  frameworks,
  programmingLanguages,
  projects,
  tools,
  webTechnologies,
} from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="space-y-6"
            >
              <motion.div className="space-y-4">
                <Badge variant="secondary" className="text-sm px-4 py-1">
                  Développeur Fullstack
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Bonjour, je suis{" "}
                  <span className="text-[var(--primary)]">
                    RAZAFITSOTRA Toslin
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  Je crée des applications web et mobile modernes, performantes
                  et centrées sur l'expérience utilisateur.
                </p>
              </motion.div>

              {/* Quick Contact Icons */}
              <motion.div className="flex flex-col gap-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="gap-2">
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
                  </Button>

                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <motion.a
                      href="/images/CV_RAZAFITSOTRA_Toslin.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      // style={{
                      //   backgroundColor: "var(--primary)",
                      // }}
                      className="px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <Download size={16} />
                      Télécharger mon CV
                    </motion.a>
                  </Button>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <span className="text-sm text-muted-foreground">
                    Me contacter :
                  </span>
                  <div className="flex gap-3">
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href="mailto:razafitosy@gmail.com"
                        className="hover:scale-110 transition-transform"
                      >
                        <Mail size={20} />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href="https://github.com/ToslinRazafy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                      >
                        <Github size={20} />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href="https://www.linkedin.com/in/toslin-razafitsotra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                      >
                        <Linkedin size={20} />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 group">
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-[var(--primary)] transition-colors duration-300 group-hover:border-[var(--primary-dark)]">
                  <Image
                    src="/images/moi.jpg"
                    alt="RAZAFITSOTRA Toslin"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 20rem, 24rem"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
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
            Passionné par le développement web, mobile et la création de jeux
            vidéo, j’aime concevoir des applications performantes, intuitives et
            centrées sur l’expérience utilisateur. J’utilise des technologies
            modernes pour développer des solutions fiables, évolutives et
            adaptées aux besoins des utilisateurs. Je maîtrise Git et GitHub
            pour la gestion de versions et le travail en équipe, et je possède
            également de solides compétences en bureautique (Word, Excel,
            PowerPoint, Access). Je communique couramment en français et je
            continue de renforcer mon niveau d’anglais. Curieux, rigoureux et
            créatif, je puise mon inspiration dans mes centres d’intérêt tels
            que les jeux vidéo, les mangas et les anime, ce qui nourrit mon sens
            de l’innovation et ma vision technique.
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
              title="sd"
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
