export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const skills = {
  Frontend: [
    { name: 'React', icon: 'SiReact', color: '#61dafb' },
    { name: 'TypeScript', icon: 'SiTypescript', color: '#3178c6' },
    { name: 'JavaScript', icon: 'SiJavascript', color: '#f7df1e' },
    { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#38bdf8' },
    { name: 'HTML5', icon: 'SiHtml5', color: '#e34f26' },
    { name: 'CSS3', icon: 'SiCss', color: '#1572b6' },
  ],
  Backend: [
    { name: 'Laravel', icon: 'SiLaravel', color: '#ff2d20' },
    { name: 'PHP', icon: 'SiPhp', color: '#777bb4' },
    { name: 'Node.js', icon: 'SiNodedotjs', color: '#339933' },
    { name: 'REST APIs', icon: 'SiPostman', color: '#ff6c37' },
  ],
  Database: [
    { name: 'MySQL', icon: 'SiMysql', color: '#4479a1' },
    { name: 'PostgreSQL', icon: 'SiPostgresql', color: '#336791' },
  ],
  Tools: [
    { name: 'Git', icon: 'SiGit', color: '#f05032' },
    { name: 'GitHub', icon: 'SiGithub', color: '#ffffff' },
    { name: 'Postman', icon: 'SiPostman', color: '#ff6c37' },
    { name: 'VS Code', icon: 'SiVisualstudiocode', color: '#007acc' },
  ],
};

export const projects = [
  {
    id: 1,
    title: 'WoodCraft Marketplace',
    description: 'A full-featured multi-vendor furniture marketplace connecting artisan sellers with customers. Features real-time inventory management, secure checkout, and a comprehensive seller dashboard.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=450&fit=crop',
    tech: ['Laravel', 'React', 'TypeScript', 'Inertia.js', 'MySQL', 'Tailwind CSS'],
    features: [
      'Multi-vendor seller dashboard',
      'Product & inventory management',
      'Shopping cart & checkout',
      'Order tracking system',
      'Authentication & authorization',
    ],
    github: 'https://github.com/MrRavin1/Woodkala-Nepal',
    demo: 'https://woodkala-nepal.onrender.com' as string | null,
    featured: true,
  },
];

export const socialLinks = {
  github: 'https://github.com/MrRavin1',
  linkedin: 'https://www.linkedin.com/in/rabin-karki-4105262b8/',
  email: 'mailto:29rabinkarki@gmail.com',
  instagram: 'https://www.instagram.com/rabin_jungkarki/',
  facebook: 'https://www.facebook.com/ravin2941',
};

export const stats = [
  { label: 'Projects Built', value: 10, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Graduation Year', value: 2026, suffix: '' },
  { label: 'Cups of Coffee', value: 500, suffix: '+' },
];
