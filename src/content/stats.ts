export interface StatItem {
  id: string;
  label: string;
  value: string;
  context: string;
  badge?: string;
}

export const statsContent: StatItem[] = [
  {
    id: "student-projects",
    label: "STUDENT & CLIENT BUILDS",
    value: "10+",
    context: "Custom portfolio sites, tools, and digital experiences created for students & creators.",
    badge: "Web Builds"
  },
  {
    id: "prototypes",
    label: "PHYSICAL & DIGITAL PROTOTYPES",
    value: "14+",
    context: "Including T.E.R.R.A. robotics, FarmCraft nodes, AI browsers & local scripts.",
    badge: "Built & Tested"
  },
  {
    id: "billboards",
    label: "BILLBOARD ARTWORK FEATURES",
    value: "Multiple",
    context: "Artwork designed by Kabir deployed on public city advertising billboards.",
    badge: "Public Print / OOH"
  },
  {
    id: "tabs",
    label: "AVERAGE BROWSER TABS OPEN",
    value: "∞ (64+)",
    context: "Across robotics datasheets, Marvel lore threads, code docs & stock charts.",
    badge: "Perpetual State"
  }
];
