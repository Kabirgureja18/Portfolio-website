export interface RoadQuoteData {
  line1: string;
  line2Intro: string;
  line2Focus: string;
  line2Outro: string;
  fullQuote?: string;
  tagline?: string;
  descriptor?: string;
  badge?: string;
  indexCode?: string;
}

export const roadQuoteContent: RoadQuoteData = {
  line1: "I don’t really have a single lane.",
  line2Intro: "I’d rather build",
  line2Focus: "my own road",
  line2Outro: "and see where it goes.",
  fullQuote: "“I don’t really have a single lane. I’d rather build my own road and see where it goes.”",
  tagline: "AUTONOMOUS TRAJECTORY // UNPAVED",
  descriptor: "ON CREATIVE INDEPENDENCE",
  badge: "STATEMENT // SECTOR 06",
  indexCode: "REF.06 // PATHWAY",
};
