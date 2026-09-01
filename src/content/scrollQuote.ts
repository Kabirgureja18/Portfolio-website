export interface ScrollQuoteData {
  thoughtSentence: string;
  projectSentence: string;
  projectLine1?: string;
  projectLine2?: string;
  projectHighlight?: string;
  badge?: string;
  coordinates?: string;
  indexCode?: string;
  tagline?: string;
}

export const scrollQuoteContent: ScrollQuoteData = {
  thoughtSentence: "Some ideas stay in my head.",
  projectSentence: "Mine usually end up becoming projects.",
  projectLine1: "Mine usually end up",
  projectLine2: "becoming",
  projectHighlight: "PROJECTS.",
  badge: "INTERNAL REVERIE → PHYSICAL ARTIFACT",
  coordinates: "22.7196° N, 75.8577° E",
  indexCode: "SECTOR 00 // THE TRANSFORMATION",
  tagline: "KABIR GUREJA // MANIFESTO",
};
