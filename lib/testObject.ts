import { ProjectType , FileX ,Skill } from "./ZodObject";

// A curated list of Unsplash Image IDs that match a "Modern/Space/Tech" aesthetic
const UNSPLASH_IDS = [
  "1451187580459-43490279c0fa", // Space
  "1518770660439-4636190af475", // Chips/Tech
  "1550684848-fac1c5b4e853",    // Fluid Abstract
  "1555066931-4365d14bab8c",    // Coding
  "1535268647670-3072eb30d3cd", // Particles
  "1614728853913-1e32005e307a", // Purple Fluid
  "1620641788421-7f1c3a8b40e1", // Cyberpunk
  "1504384308090-c54beed1f92b", // Nebulas
  "1635070041078-e363dbe005cb", // 3D Shapes
  "1480231015861-4d2241d86cf8"  // Neon Lights
];


// 1. Pool of available skills/tools
const AVAILABLE_SKILLS: Omit<Skill, 'size'>[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Hono", category: "Backend" },
  { name: "Prisma", category: "Database" },
  { name: "Drizzle", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Tailwind CSS", category: "Design" },
  { name: "Figma", category: "Design" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "DevOps" },
  { name: "Git", category: "Tools" },
  { name: "C++", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Unreal Engine", category: "Game Dev" },
  { name: "Three.js", category: "Frontend" },
  { name: "Vite", category: "Build Tool" }
];

// 2. New function to generate random unique skills with random sizes
const generateRandomTechnologies = (min: number = 2, max: number = 6): Skill[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  // Shuffle and slice to get unique skills
  const shuffled = [...AVAILABLE_SKILLS].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map(skill => ({
    ...skill,
    // Randomly assign a grid size
    size: ["small", "medium", "large"][Math.floor(Math.random() * 3)] as "small" | "medium" | "large"
  }));
};

const generateRandomImage = (index: number): FileX => {
  const randomId = UNSPLASH_IDS[index % UNSPLASH_IDS.length];
  const width = 800 + (index % 5) * 10; 
  const height = 600 + (index % 5) * 10;
  
  return {
    type: 'image',
    name: `project-shot-${index}.jpg`,
    size: 1024 * (Math.floor(Math.random() * 500) + 100),
    path: `/projects/${index}/main.jpg`,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ['ui', 'web', 'design'],
    link: `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`
  };
};

// Generate 30 Mock Projects
export const MOCK_PROJECTS: ProjectType[] = Array.from({ length: 30 }, (_, i) => {
  return {
    title: `Project Horizon ${i + 1}`,
    description: `This is a detailed description for Project Horizon ${i + 1}. It involves building a scalable architecture using modern web technologies. The goal was to create a seamless user experience with high performance and accessibility standards.`,
    link: `https://project-horizon-${i + 1}.demo.com`,
    gitHub: `https://github.com/username/project-horizon-${i + 1}`,
    
    // 3. Use the new random generator here
    technologies: generateRandomTechnologies(3, 6),

    images: [
      generateRandomImage(i),
      ...(i % 3 === 0 ? [generateRandomImage(i + 10)] : [])
    ],
    
    videos: i % 5 === 0 ? {
      type: 'video',
      name: 'demo.mp4',
      size: 5000000,
      path: '/videos/demo.mp4',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['demo'],
      link: 'https://www.w3schools.com/html/mov_bbb.mp4'
    } : undefined
  };
});