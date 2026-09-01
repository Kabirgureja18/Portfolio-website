import { profileContent, ProfileData } from './profile';
import { projectsContent } from './projects';
import { achievementsContent } from './achievements';
import { interestsContent } from './interests';
import { funFactsContent } from './funFacts';
import { artworkContent } from './artwork';
import { photographyContent } from './photography';
import { productsContent } from './products';
import { gamingContent } from './gaming';
import { marvelContent } from './marvel';
import { socialsContent, githubPreviewData } from './socials';
import { jarvisContent } from './jarvis';
import { statsContent } from './stats';
import { scrollQuoteContent, ScrollQuoteData } from './scrollQuote';
import { roadQuoteContent, RoadQuoteData } from './roadQuote';
import { ProjectItem, AchievementItem, InterestItem, FunFactItem, ArtworkItem, PhotoItem, ProductItem } from '../types';

export {
  profileContent,
  projectsContent,
  achievementsContent,
  interestsContent,
  funFactsContent,
  artworkContent,
  artworkContent as artworksContent,
  photographyContent,
  photographyContent as photosContent,
  productsContent,
  gamingContent,
  marvelContent,
  socialsContent,
  githubPreviewData,
  jarvisContent,
  statsContent,
  scrollQuoteContent,
  type ScrollQuoteData,
  roadQuoteContent,
  type RoadQuoteData,
};

export interface PortfolioContentState {
  profile: ProfileData;
  scrollQuote: ScrollQuoteData;
  roadQuote: RoadQuoteData;
  projects: ProjectItem[];
  achievements: AchievementItem[];
  interests: InterestItem[];
  funFacts: FunFactItem[];
  artwork: ArtworkItem[];
  photography: PhotoItem[];
  products: ProductItem[];
  gaming: typeof gamingContent;
  marvel: typeof marvelContent;
  socials: typeof socialsContent;
  github: typeof githubPreviewData;
  jarvis: typeof jarvisContent;
  stats: typeof statsContent;
}

export const initialPortfolioContent: PortfolioContentState = {
  profile: profileContent,
  scrollQuote: scrollQuoteContent,
  roadQuote: roadQuoteContent,
  projects: projectsContent,
  achievements: achievementsContent,
  interests: interestsContent,
  funFacts: funFactsContent,
  artwork: artworkContent,
  photography: photographyContent,
  products: productsContent,
  gaming: gamingContent,
  marvel: marvelContent,
  socials: socialsContent,
  github: githubPreviewData,
  jarvis: jarvisContent,
  stats: statsContent,
};
