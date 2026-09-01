export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  description: string;
  verified: boolean;
}

export const socialsContent: SocialLink[] = [
  {
    platform: "Instagram",
    handle: "@kabirgureja",
    url: "https://instagram.com",
    description: "Visual experiments, creative snippets, street photography & behind-the-scenes build logs.",
    verified: true
  },
  {
    platform: "GitHub",
    handle: "kabirgureja",
    url: "https://github.com",
    description: "Open-source repositories, microcontroller firmware, AI experiment scripts & web projects.",
    verified: true
  },
  {
    platform: "LinkedIn",
    handle: "Kabir Gureja",
    url: "https://linkedin.com",
    description: "Professional updates, MUN participations, robotics research milestones & network.",
    verified: true
  },
  {
    platform: "Direct Mail",
    handle: "kabirgureja08@gmail.com",
    url: "mailto:kabirgureja08@gmail.com",
    description: "Primary channel for collaborations, website inquiries, robotics ideas & Marvel debates.",
    verified: true
  }
];

export const githubPreviewData = {
  username: "kabirgureja",
  bio: "Builder • Robotics • AI Systems • Creative Technologist",
  reposCount: 18,
  contributionsThisYear: 342,
  topLanguages: [
    { name: "TypeScript", percent: 42, color: "#3178c6" },
    { name: "Python", percent: 34, color: "#3572A5" },
    { name: "C++ / Arduino", percent: 16, color: "#f34b7d" },
    { name: "HTML / CSS", percent: 8, color: "#e34c26" }
  ],
  pinnedRepos: [
    {
      name: "terra-robotics-firmware",
      description: "ESP32 firmware & telemetry stack for autonomous algae biofilm dispersal mechanisms.",
      stars: 12,
      forks: 4,
      language: "C++"
    },
    {
      name: "jarvis-desktop-daemon",
      description: "Local desktop assistant orchestrator with speech hooks and workflow automation.",
      stars: 28,
      forks: 7,
      language: "Python"
    },
    {
      name: "ai-contextual-browser",
      description: "Lightweight Chromium wrapper featuring semantic multi-tab summarization.",
      stars: 19,
      forks: 3,
      language: "TypeScript"
    }
  ]
};
