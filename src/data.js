export const profile = {
  name: 'Shrishti Dubey',
  role: 'Frontend Developer',
  status: 'Open to remote work',
  email: 'shrishtirenu028@gmail.com',
  github: 'https://github.com/shrishtirenu028-design',
  linkedin: 'https://www.linkedin.com/in/shrishti-dubey028',
  // Put your photo at public/profile.jpg. Leave it missing to show initials instead.
  photo: '/profile.jpg',
  // Paste your Formspree endpoint here (https://formspree.io/f/xxxxxxx)
  formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
}

export const stats = [
  { value: '2+', label: 'years building web projects' },
  { value: '10+', label: 'projects across frontend, DSA and hackathons' },
  { value: '100%', label: 'focus on responsive, modern UI' },
]

export const skillGroups = [
  { title: 'Frontend core', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS'] },
  { title: 'Motion and styling', items: ['Framer Motion', 'GSAP', 'Responsive design', 'Mobile-first'] },
  { title: 'CS foundations', items: ['Python', 'C', 'OOP', 'Data structures'] },
  { title: 'Tools and workflow', items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel'] },
]

const gh = (r) => `https://github.com/shrishtirenu028-design/${r}`

const rawProjects = [
  {
    slug: 'beautyguide', title: 'BeautyGuide', featured: true,
    desc: 'A beauty and skincare discovery platform with personalised recommendations and detailed side-by-side analysis, built to go beyond conventional portals like Tira.',
    role: 'Designed the UI layout, product taxonomy and comparison logic.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Product comparison UI', 'Responsive'],
    features: ['Side-by-side multi-brand comparison', 'Skin-type filtering', 'Ingredient and benefit breakdowns'],
    github: gh('BeautyGuide'), live: null,
  },
  {
    slug: 'digital-canteen', title: 'Digital-Canteen', featured: true,
    desc: 'A campus and workplace food pre-ordering portal that removes physical canteen queues.',
    role: 'Sole developer: responsive interface and full order flow.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX', 'LocalStorage'],
    features: ['Digital menu', 'Quick cart management', 'Queue-bypassing order confirmation'],
    github: gh('Digital-Canteen'), live: 'https://merry-elf-b3a0fe.netlify.app/',
  },
  {
    slug: 'tripwiseai', title: 'TripWiseAi',
    desc: 'An AI trip planner that builds custom itineraries with automated budget estimates.',
    role: 'Built the web client, budget logic and AI response handlers.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Generative AI API'],
    features: ['Multi-day itineraries', 'Budget calculator for transport, stay and food'],
    github: gh('TripWiseAi'), live: null,
  },
  {
    slug: 'hydra', title: 'HYDRA',
    desc: 'A sustainable e-commerce concept for discovering and buying eco-friendly alternatives to single-use plastics.',
    role: 'Designed the product catalog and sustainability metrics.',
    tags: ['HTML', 'CSS', 'JavaScript', 'E-commerce UI', 'Green tech'],
    features: ['Plastic-free swap recommendations', 'Product impact stats'],
    github: gh('HYDRA'), live: null,
  },
  {
    slug: 'imposter-desi', title: 'Imposter-Desi',
    desc: 'A multiplayer social deduction party game with Indian slang, culture and pop-culture scenarios.',
    role: 'Designed the game UI, role allocation and round state machine.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Game dev'],
    features: ['Desi scenario cards', 'Role-reveal animations', 'Round voting interface'],
    github: gh('Imposter-Desi'), live: null,
  },
  {
    slug: 'aws-sbg-sigce', title: 'AWS_SBG_SIGCE',
    desc: 'A community platform for the AWS Student Builder Group.',
    role: 'Core frontend developer: UI components, layout and client-side interactions in TypeScript.',
    tags: ['TypeScript', 'HTML5', 'CSS3', 'Team Git workflow'],
    features: ['Type-safe modular components', 'Event showcase feeds'],
    github: gh('AWS_SBG_SIGCE'), live: null,
  },
  {
    slug: 'shrishtigamesweb', title: 'ShrishtiGamesWeb',
    desc: 'Custom arcade games connected to a relational database through JDBC.',
    role: 'Designed the database schema, SQL queries and data access layer.',
    tags: ['Java', 'JDBC', 'MySQL', 'OOP', 'Swing'],
    features: ['Persistent high scores', 'Player profiles', 'Leaderboard queries'],
    github: gh('ShrishtiGamesWeb'), live: null, note: 'Desktop and database app',
  },
  {
    slug: 'minigamehub', title: 'MiniGameHub',
    desc: 'A multi-game desktop launcher in core Java with retro arcade games.',
    role: 'Programmed game loops, keyboard input, collision detection and visuals.',
    tags: ['Java', 'OOP', 'Swing / AWT', 'Game loop'],
    features: ['Modular game launcher', 'Zero external dependencies', 'Real-time collision and scoring'],
    github: gh('MiniGameHub'), live: null, note: 'Desktop app (.jar)',
  },
]

// Cover: /projects/<slug>.png   Walkthrough: /projects/<slug>-1.png, -2.png ... (one per key feature)
export const projects = rawProjects.map((p) => ({
  ...p,
  cover: `/projects/${p.slug}.png`,
  shots: p.features.map((f, i) => ({ src: `/projects/${p.slug}-${i + 1}.png`, caption: f })),
}))
