"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import RetroWindow from "./RetroWindow";

const projects = [
  {
    id: "form-builder",
    title: "No-Code Form Builder",
    description:
      "A No-Code drag and drop form builder that allows users to create forms without any coding knowledge.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/biswyaa28/Javascript-Mini-project.git",
    image: "/projects/form-builder.png",
  },
  {
    id: "quiz-game",
    title: "Quiz Game",
    description:
      "A fun and interactive quiz game with multiple-choice questions and instant feedback.",
    technologies: ["C++"],
    githubUrl: "https://github.com/biswyaa28/C-MiniProject.git",
    image: "/projects/quiz-game.png",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "A portfolio website to showcase my projects and skills.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/biswyaa28/PortfolioWebsite.git",
    image: "/projects/portfolio.png",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="breadcrumb-trail">
          <span className="breadcrumb-item">ROOT</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-item breadcrumb-item--active">PROJECTS</span>
        </div>

        <div className="text-center mb-12">
          <h2 className="section-heading text-3xl md:text-4xl text-foreground">
            Projects
          </h2>
          <span className="inventory-count">{projects.length} items</span>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group h-full"
              variants={cardVariants}
              whileHover={{
                y: -4,
                x: -4,
                transition: { duration: 0.1 },
              }}
            >
              <RetroWindow title={project.title.toUpperCase()} className="h-full flex flex-col">
                {/* Breadcrumb on card */}
                <div className="breadcrumb-trail breadcrumb-trail--card">
                  <span className="breadcrumb-item">ROOT</span>
                  <span className="breadcrumb-sep">&gt;</span>
                  <span className="breadcrumb-item">PROJECTS</span>
                  <span className="breadcrumb-sep">&gt;</span>
                  <span className="breadcrumb-item breadcrumb-item--active">{project.title.toUpperCase()}</span>
                </div>

                {/* Project Image — explicit aspect ratio prevents CLS */}
                {project.image && (
                  <div
                    className="relative w-full mb-4 overflow-hidden pixelate-img-wrapper border border-stone-800"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      className="object-cover pixelate-img"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-light mb-4 text-xs leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Command Block Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={`${project.id}-${tech}`} className="command-block">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub Link */}
                <div className="mt-auto pt-4 border-t border-stone-800 border-dashed">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-cyber-blue text-xs font-mono uppercase tracking-wider hover:text-cyber-glow transition-colors"
                  >
                    <span className="mr-2">&gt; View Source</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                </div>
              </RetroWindow>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
