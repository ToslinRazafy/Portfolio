"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { Dispatch, SetStateAction } from "react";

type ProjectKey = "cosmetique" | "qcm" | "stock" | "vente" | "toquiz";

interface ProjectsSectionProps {
  currentImages: Record<ProjectKey, number>;
  setCurrentImages: Dispatch<SetStateAction<Record<ProjectKey, number>>>;
  setZoomedImage: Dispatch<SetStateAction<{ project: string; index: number } | null>>;
  expandedProject: string | null;
  setExpandedProject: Dispatch<SetStateAction<string | null>>;
}

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

export default function ProjectsSection({
  currentImages,
  setCurrentImages,
  setZoomedImage,
  expandedProject,
  setExpandedProject,
}: ProjectsSectionProps) {
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
    <section
      id="projets"
      style={{ backgroundColor: "var(--background)" }}
      className="py-20 px-4 md:pb-20 pb-24 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ color: "var(--foreground)" }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Mes Projets
        </motion.h2>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
              className="relative overflow-hidden group p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full backdrop-blur-none hover:backdrop-blur-md"
            >

              {/* Image Gallery */}
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden group">
                <Image
                  src={`/images/${project.name}/${
                    currentImages[project.name as ProjectKey] + 1
                  }.png`}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-102"
                  onClick={() =>
                    setZoomedImage({
                      project: project.name,
                      index: currentImages[project.name as ProjectKey],
                    })
                  }
                />

                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage(
                        project.name as ProjectKey,
                        project.imageCount
                      );
                    }}
                    style={{ backgroundColor: "rgba(var(--card-rgb), 0.8)" }}
                    className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors backdrop-blur-sm"
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
                    style={{ backgroundColor: "rgba(var(--card-rgb), 0.8)" }}
                    className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors backdrop-blur-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Image Indicator */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {Array.from({ length: project.imageCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        currentImages[project.name as ProjectKey] === i
                          ? "w-4 bg-[var(--primary)]"
                          : "w-2 bg-[var(--muted-foreground)] opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Project Content */}
              <div className="flex-grow">
                <h3
                  style={{ color: "var(--card-foreground)" }}
                  className="text-xl font-semibold mb-2"
                >
                  {project.title}
                </h3>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={
                      expandedProject === project.name
                        ? "expanded"
                        : "collapsed"
                    }
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ color: "var(--muted-foreground)" }}
                    className="mb-4 overflow-hidden"
                  >
                    {expandedProject === project.name
                      ? project.fullDescription
                      : project.shortDescription}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.languages.map((lang) => (
                  <motion.span
                    key={lang}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--accent-foreground)",
                    }}
                    className="text-xs px-2 py-1 rounded-full"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>

              {/* Links */}
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === project.name ? null : project.name
                    )
                  }
                  style={{ color: "var(--primary)" }}
                  className="text-sm hover:underline transition-colors flex items-center"
                >
                  {expandedProject === project.name ? (
                    <>
                      <ChevronLeft size={16} className="mr-1" />
                      Réduire
                    </>
                  ) : (
                    "Voir plus de détails"
                  )}
                </button>

                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lien GitHub"
                      className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lien démo"
                      className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
