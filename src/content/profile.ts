export interface ProfileData {
  firstName: string;
  lastName: string;
  fullName: string;
  handle: string;
  roles: string[];
  birthDate: string; // ISO date string for live dynamic age calculation
  location: string;
  headlineQuote?: string;
  editorialQuotes: string[];
  bioParagraphs: string[];
  descriptors?: string[];
  currentFocus: string;
  statusBadge: string;
  email: string;
  phone?: string;
}

export const profileContent: ProfileData = {
  firstName: "KABIR",
  lastName: "GUREJA",
  fullName: "Kabir Gureja",
  handle: "@kabirgureja",
  roles: [
    "Software & AI Builder",
    "Robotics Developer",
    "Founder of root India",
    "Student Web Creator",
    "Visual Artist"
  ],
  // Actual birthdate: September 27, 2012 (14 years old)
  birthDate: "2012-09-27T00:00:00Z",
  location: "Indore, India",
  headlineQuote: "“I don’t collect hobbies. I build them.”",
  editorialQuotes: [
    "I build things I wish existed.",
    "Too many ideas. Not enough tabs.",
    "I learn by building.",
    "Probably working on something right now.",
    "Bad At Studies ig."
  ],
  descriptors: [
    "I build things I wish existed.",
    "Too many ideas. Not enough tabs.",
    "I learn by building.",
    "Probably working on something right now.",
    "Bad At Studies ig."
  ],
  bioParagraphs: [
    "I’m Kabir Gureja, a student, builder and programmer from India. I like turning random ideas into real things, from AI systems and robotics to websites, art, photography, fashion and experiments that probably started as “what if?”",
    "I’m usually somewhere between coding, designing, sketching, researching or building something.",
    "I don’t really follow one path. I like exploring whatever catches my attention, learning by actually making things and seeing how far an idea can go.",
    "Right now, I’m building the future I want to see."
  ],
  currentFocus: "T.E.R.R.A. robotics research, root India apparel development, and ENEGY AI.",
  statusBadge: "BUILDING IN PUBLIC — LAB ONLINE",
  email: "kabirgureja08@gmail.com",
  phone: "+91 9826977750"
};
