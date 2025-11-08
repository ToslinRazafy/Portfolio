"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Skill {
  name: string;
  icon: string;
  category?: string;
  proficiency?: number; // 1-5
}

interface SkillsSectionProps {
  title: string;
  skills: Skill[];
  showCategories?: boolean;
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function SkillsSection({
  title,
  skills,
  showCategories = false,
}: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tout");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Extraire les catégories uniques si showCategories est true
  const categories = showCategories
    ? ["Tout", ...new Set(skills.map((skill) => skill.category || "Autre"))]
    : [];

  // Filtrer les compétences par catégorie
  const filteredSkills =
    selectedCategory === "Tout"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section
      id="competences"
      style={{ backgroundColor: "var(--background)" }}
      className="py-10 px-4 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.h2
            variants={fadeInUp}
            style={{ color: "var(--foreground)" }}
            className="text-4xl font-bold mb-6 text-center"
          >
            {title}
          </motion.h2>

          {/* Filtres par catégorie */}
          {showCategories && categories.length > 0 && (
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor:
                      selectedCategory === category
                        ? "var(--primary)"
                        : "var(--secondary)",
                    color:
                      selectedCategory === category
                        ? "var(--primary-foreground)"
                        : "var(--secondary-foreground)",
                  }}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}

          <motion.div
            variants={staggerChildren}
            className="grid gap-4 justify-center items-center mx-auto"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
              maxWidth: '720px',
            }}
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="flex flex-col items-center justify-center p-4 rounded-xl transition-all"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow:
                    hoveredSkill === skill.name
                      ? "0 10px 20px rgba(0,0,0,0.1)"
                      : "none",
                }}
              >
                <div className="relative w-12 h-12 mb-3">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain transition-transform duration-300"
                    style={{
                      filter:
                        hoveredSkill === skill.name
                          ? "drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.4))"
                          : "none",
                      transform:
                        hoveredSkill === skill.name ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                </div>

                <div className="text-center">
                  <span
                    style={{ color: "var(--card-foreground)" }}
                    className="text-sm font-medium block"
                  >
                    {skill.name}
                  </span>

                  {skill.proficiency && (
                    <div className="flex justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor:
                              i < skill.proficiency!
                                ? "var(--primary)"
                                : "var(--muted)",
                            opacity: i < skill.proficiency! ? 1 : 0.3,
                          }}
                          className="w-2 h-2 rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {hoveredSkill === skill.name &&
                    skill.category &&
                    showCategories && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        style={{ backgroundColor: "var(--accent)" }}
                        className="text-xs px-2 py-1 rounded-full mt-2 absolute -bottom-2"
                      >
                        {skill.category}
                      </motion.span>
                    )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
