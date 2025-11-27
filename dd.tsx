"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUp, ChevronLeft, ChevronRight, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { frameworks, programmingLanguages, projects, tools, webTechnologies } from "@/lib/data";

type ProjectKey = "cosmetique" | "qcm" | "stock" | "vente" | "toquiz";

export default function Portfolio() {
  const [currentImages, setCurrentImages] = useState<Record<ProjectKey, number>>({
    cosmetique: 0,
    qcm: 0,
    stock: 0,
    vente: 0,
    toquiz: 0,
  });
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<{ project: string; index: number } | null>(null);
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

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
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
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <NavBar />

      {/* Hero Section */}
      <section id="accueil" className="min-h-screen flex items-center justify-center px-4 pt-20 md:pt-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="space-y-6"
            >
              <motion.div variants={slideInFromLeft} className="space-y-4">
                <Badge variant="secondary" className="text-sm px-4 py-1">
                  Développeur Fullstack
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Bonjour, je suis{" "}
                  <span className="text-primary bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    RAZAFITSOTRA Toslin
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Je crée des applications web et mobile modernes, performantes 
                  et centrées sur l'expérience utilisateur.
                </p>
              </motion.div>

              {/* Quick Contact Icons */}
              <motion.div 
                variants={slideInFromLeft}
                className="flex flex-col gap-4 pt-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <a href="#projets">
                      Découvrir mes projets
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <a 
                      href="/images/CV_RAZAFITSOTRA_Toslin.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download size={18} />
                      Télécharger CV
                    </a>
                  </Button>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <span className="text-sm text-muted-foreground">Me contacter :</span>
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

            {/* Profile Image - Right Side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInFromRight}
              className="flex justify-center lg:justify-end"
            >
              <Card className="relative w-80 h-80 lg:w-96 lg:h-96 group overflow-hidden border-0 shadow-2xl">
                <CardContent className="p-0 relative h-full">
                  <Image
                    src="/images/moi.jpg"
                    alt="RAZAFITSOTRA Toslin"
                    fill
                    className="object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-[2px] rounded-lg bg-background" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="a-propos" className="py-20 px-4 bg-muted">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold mb-12 text-center text-foreground"
          >
            À propos de moi
          </motion.h2>
          
          <Card className="backdrop-blur-sm bg-background/50">
            <CardContent className="p-8">
              <motion.div variants={fadeInUp} className="space-y-6">
                <p className="leading-relaxed text-lg">
                  Passionné par le développement web, mobile et la création de jeux vidéo, 
                  j'aime concevoir des applications performantes, intuitives et centrées 
                  sur l'expérience utilisateur. J'utilise des technologies modernes pour 
                  développer des solutions fiables, évolutives et adaptées aux besoins des utilisateurs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-primary">
                      Compétences techniques
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Développement Fullstack
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Gestion de versions (Git/GitHub)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Suite bureautique avancée
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-primary">
                      Langues & Intérêts
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Français (Courant)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Anglais (En progression)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Jeux vidéo, Mangas, Anime
                      </li>
                    </ul>
                  </div>
                </div>

                <motion.blockquote
                  variants={fadeInUp}
                  className="text-lg italic text-center pt-6 border-t border-primary text-primary"
                >
                  &ldquo;L'expérience est une lanterne que l'on porte sur le dos et qui 
                  n'éclaire que le chemin parcouru. Mais chaque pas enrichit notre 
                  lumière pour les routes à venir.&rdquo;
                </motion.blockquote>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Skills Sections */}
      <SkillsSection title="Technologies Web" skills={webTechnologies} />
      <SkillsSection title="Langages de Programmation" skills={programmingLanguages} />
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
      <section id="contact" className="py-20 px-4 bg-muted">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold mb-12 text-center text-foreground"
          >
            Contactez-moi
          </motion.h2>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <motion.div variants={fadeInUp} className="text-center space-y-6">
                <p className="text-lg text-muted-foreground">
                  N'hésitez pas à me contacter pour discuter de vos projets ou
                  opportunités de collaboration !
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <a href="mailto:razafitosy@gmail.com">
                      <Mail size={20} />
                      Email
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <a 
                      href="https://github.com/ToslinRazafy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} />
                      GitHub
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <a 
                      href="https://www.linkedin.com/in/toslin-razafitsotra"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={20} />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <footer className="py-8 text-center bg-card text-muted-foreground">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.p variants={fadeInUp}>
            © 2025 RAZAFITSOTRA Toslin - Tous droits réservés
          </motion.p>
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
            className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors z-50"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm items-center justify-center p-4"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-5xl"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={`/images/${zoomedImage.project}/${zoomedImage.index + 1}.png`}
                    alt="Zoomed screenshot"
                    width={1200}
                    height={800}
                    className="object-contain w-full h-auto max-h-[80vh]"
                  />
                </CardContent>
              </Card>
              
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage(
                    zoomedImage.project as ProjectKey,
                    projects.find((p) => p.name === zoomedImage.project)!.imageCount
                  );
                  setZoomedImage({
                    ...zoomedImage,
                    index: (zoomedImage.index - 1 + projects.find((p) => p.name === zoomedImage.project)!.imageCount) % 
                      projects.find((p) => p.name === zoomedImage.project)!.imageCount,
                  });
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                size="icon"
              >
                <ChevronLeft size={24} />
              </Button>
              
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage(
                    zoomedImage.project as ProjectKey,
                    projects.find((p) => p.name === zoomedImage.project)!.imageCount
                  );
                  setZoomedImage({
                    ...zoomedImage,
                    index: (zoomedImage.index + 1) % projects.find((p) => p.name === zoomedImage.project)!.imageCount,
                  });
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                size="icon"
              >
                <ChevronRight size={24} />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}