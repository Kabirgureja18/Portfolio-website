import { AchievementItem } from '../types';

export const achievementsContent: AchievementItem[] = [
  {
    id: "billboard-art",
    title: "Artwork Featured on Public Billboards & Ad Campaigns",
    organization: "Urban Advertising Campaigns",
    year: "2024",
    date: "October 2024",
    category: "Press & Billboard",
    awardLevel: "Featured",
    description: "Kabir's original graphic vector artwork and visual campaign compositions were selected and displayed prominently on commercial public billboards, city hoardings, and urban print installations.",
    highlights: [
      "Original visual art scaled for large-format city billboards",
      "Vector typography and brutalist composition selection",
      "Verified public placement across major metropolitan transit corridors"
    ],
    verifiedNote: "Note: Kabir's created artwork appeared on these public billboards (not his personal face/photo).",
    badge: "Public Billboard Display",
    evidenceType: "Billboard Display",
    photoUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    tags: ["Billboard Art", "Vector Design", "Urban Media", "Visual Campaign"]
  },
  {
    id: "robotics-terra-award",
    title: "T.E.R.R.A. Autonomous Bio-Robotics Innovation Award",
    organization: "Regional Science & Engineering Fair",
    year: "2024",
    date: "November 2024",
    category: "Robotics",
    awardLevel: "Winner",
    description: "Conceived, engineered, and demonstrated the T.E.R.R.A. (Terrain-Enhancing Regeneration via Robotic Algae) autonomous bio-robotic rover. Engineered with ultrasonic obstacle navigation, precision micro-pumps, and live moisture telemetry.",
    highlights: [
      "1st Place Category Award for Ecological Automation",
      "Full hardware integration: Arduino Mega, ESP32, Soil pH sensors, Micro-valves",
      "Demonstrated live liquid-algae micro-dosing and soil bioremediation"
    ],
    verifiedNote: "Evaluated by engineering mentors for practical microcontroller execution and sustainability impact.",
    badge: "1st Place Winner",
    evidenceType: "Certificate",
    certificateUrl: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1200&auto=format&fit=crop",
    photoUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    credentialId: "STEM-TERRA-2024-089",
    featured: true,
    tags: ["Bio-Robotics", "Hardware", "Arduino", "Environmental Tech"]
  },
  {
    id: "mun-high-commendation",
    title: "Outstanding Diplomat & High Commendation Award",
    organization: "Inter-School Model United Nations (MUN) Conference",
    year: "2024",
    date: "July 2024",
    category: "MUN",
    awardLevel: "Commendation",
    description: "Represented the United Nations Environment Programme (UNEP) and Disarmament & International Security Committee (DISEC). Authored key working papers on AI governance, satellite surveillance regulation, and autonomous arms control.",
    highlights: [
      "Awarded High Commendation / Outstanding Delegate",
      "Authored primary working paper passed with 85% committee consensus",
      "Recognized for extemporaneous speech, diplomacy, and crisis management"
    ],
    verifiedNote: "Official certificate and committee gavel citation awarded by executive board.",
    badge: "High Commendation",
    evidenceType: "Official Commendation",
    certificateUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
    photoUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    credentialId: "MUN-DISEC-DEL-24",
    featured: true,
    tags: ["MUN", "Diplomacy", "Geopolitics", "Policy Writing"]
  },
  {
    id: "cs-python-algorithms",
    title: "Advanced Applied Python & Computational Algorithms Certification",
    organization: "Youth Computing Academy & Open Coursework",
    year: "2024",
    date: "May 2024",
    category: "Certificate",
    awardLevel: "Certified",
    description: "Completed comprehensive algorithmic problem solving, asynchronous concurrency, and data structures in Python with distinction. Developed custom parsers and CLI diagnostic tools.",
    highlights: [
      "Graduated with Distinction (Score: 98%)",
      "Built multi-threaded portfolio scrapers and data pipelines",
      "Implemented AST parsers and custom shell utilities"
    ],
    verifiedNote: "Verified programmatic project submissions and evaluations.",
    badge: "Distinction Certificate",
    evidenceType: "Certificate",
    certificateUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1200&auto=format&fit=crop",
    credentialId: "PY-ADV-9812-KG",
    featured: false,
    tags: ["Python", "Algorithms", "Backend", "Certification"]
  },
  {
    id: "hardware-iot-exhibition",
    title: "TechnoXian Robotics & Smart Agriculture Hardware Prototype Honors",
    organization: "TechnoXian World Robotics Cup & Youth Maker Summit",
    year: "2024",
    date: "September 2024",
    category: "Robotics",
    awardLevel: "Finalist",
    description: "Demonstrated FarmVerse (Agri Mitra) & SoilSense mesh networking nodes capable of transmitting moisture, ambient temperature, and NPK metrics over LoRa/ESP-NOW without internet connectivity.",
    highlights: [
      "TechnoXian & Maker Faire Innovation Showcase Top Selection",
      "Fabricated custom 3D-printed weather-sealed rover chassis & arm enclosures",
      "Live hardware telemetry dashboard at farmverse-technoxian.lovable.app"
    ],
    verifiedNote: "Exhibited prototype tested in real outdoor soil beds.",
    badge: "TechnoXian Finalist",
    evidenceType: "Hardware Demo",
    photoUrl: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/24ee4793-860f-4f98-8e22-4d59a6192a4a/id-preview-6fc93ac1--2051cc84-6201-4cde-a4e2-2e3e85b72331.lovable.app-1784254633213.png",
    featured: true,
    tags: ["TechnoXian", "IoT", "Robotics", "Agri Mitra", "Autonomous Rover"]
  },
  {
    id: "press-newspaper-feature",
    title: "Regional Newspaper Feature: 'Teen Innovator Building for the Future'",
    organization: "City Chronicle & Youth In Tech Journal",
    year: "2024",
    date: "December 2024",
    category: "Press & Billboard",
    awardLevel: "Featured",
    description: "Featured in a half-page media profile focusing on teenage engineering initiatives, combining software, robotics, and creative branding at age 14.",
    highlights: [
      "In-depth feature detailing the T.E.R.R.A. prototype and student web builds",
      "Photographed with electronics workbench and autonomous rover",
      "Circulated across regional print & digital edition"
    ],
    verifiedNote: "Documented print media coverage covering multidisciplinary youth creative projects.",
    badge: "Press Coverage",
    evidenceType: "Press Clippings",
    photoUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    tags: ["Press", "Media Feature", "Newspaper", "Interview"]
  },
  {
    id: "web-development-honors",
    title: "Full-Stack Web Architecture & Responsive Engineering",
    organization: "Web Guild & Developer Program",
    year: "2024",
    date: "August 2024",
    category: "Certificate",
    awardLevel: "Certified",
    description: "Recognized for mastering modern React, TypeScript, Vite, and component-driven architecture. Successfully deployed over 10+ custom client websites and interactive student apps.",
    highlights: [
      "Built custom micro-frontends with Tailwind CSS",
      "Optimized Lighthouse performance metrics > 95",
      "Zero template boilerplate, 100% handcrafted architecture"
    ],
    verifiedNote: "Hands-on coding, interface design, and client project delivery.",
    badge: "Certified Developer",
    evidenceType: "Certificate",
    certificateUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    credentialId: "REACT-TS-2024-KG",
    featured: false,
    tags: ["React", "TypeScript", "Frontend", "Web Dev"]
  },
  {
    id: "mun-unsc-special-mention",
    title: "UN Security Council (UNSC) Special Mention",
    organization: "National Youth Leadership Conclave",
    year: "2023",
    date: "November 2023",
    category: "MUN",
    awardLevel: "Special Mention",
    description: "Deliberated in a high-intensity crisis simulation committee handling cyber-warfare escalation and critical infrastructure defense doctrines.",
    highlights: [
      "Special Mention delegation honors",
      "Co-drafted international consensus resolution for critical energy grid safety",
      "Challenged seasoned high-school delegates with evidence-backed arguments"
    ],
    verifiedNote: "Committee Chair citation for crisis navigation under timed constraints.",
    badge: "Special Mention",
    evidenceType: "Official Commendation",
    certificateUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    credentialId: "MUN-UNSC-SM-2023",
    featured: false,
    tags: ["UNSC", "Crisis Committee", "Debate", "International Law"]
  }
];
