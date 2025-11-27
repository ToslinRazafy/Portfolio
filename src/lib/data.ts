export const webTechnologies = [
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
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/tailwindcss/tailwindcss-plain.svg",
  },
];

export const programmingLanguages = [
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/python/python-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/java/java-original.svg",
  },
];

export const frameworks = [
  {
    name: "NextJs",
    icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/nextjs/nextjs-original.svg",
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
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/flutter/flutter-original.svg",
  },
];

export const tools = [
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/github/github-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/mysql/mysql-original.svg",
  }
];

export const projects = [
  {
    name: "cosmetique",
    title: "Cosmétique E-commerce",
    shortDescription: "Une plateforme e-commerce pour produits cosmétiques.",
    fullDescription:
      "Plateforme e-commerce complète avec Spring Boot et ReactJs, intégrant panier, authentification, et tableau de bord admin.",
    github: "https://github.com/ToslinRazafy/Cosm-tique-E-commerce.git",
    languages: ["Spring Boot", "PostgreSQL", "ReactJs", "Tailwind CSS"],
    imageCount: 10,
  },
  {
    name: "qcm",
    title: "QCM Gamifie",
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
  {
    name: "toquiz",
    title: "ToQuiz",
    shortDescription:
      "Découvrez ToQuiz, une application mobile pour défier vos connaissances avec des quiz captivants !",
    fullDescription:
      "ToQuiz est une application mobile développée avec Flutter, conçue pour offrir une expérience de quiz immersive et divertissante. Testez vos connaissances sur une variété de thèmes infromatique, grâce à des questions soigneusement élaborées. Avec une interface intuitive, des animations fluides et un design moderne, ToQuiz rend l'apprentissage amusant et addictif. Défiez vos amis avec vos score",
    github: "https://github.com/ToslinRazafy/ToQuiz.git",
    languages: ["Flutter"],
    imageCount: 1,
    demo: "https://to-quiz-vitrine.vercel.app",
  },
];
