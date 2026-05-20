import CoverPoster from './CoverPoster'
import ChapterBriefing from './ChapterBriefing'
import ChapterBoat from './ChapterBoat'
import ChapterUnderwater from './ChapterUnderwater'
import BookNowPostcard from './BookNowPostcard'
import MangaNavigation from './MangaNavigation'
import SectionTransition from './SectionTransition'

export default function MangaReader() {
  return (
    <div className="w-full flex flex-col gap-0 relative">
      
      {/* Global paper screen tone layer */}
      <div className="absolute inset-0 manga-paper pointer-events-none z-10 opacity-100"></div>
    
      {/* SECTION 1: COVER SPLASH */}
      <CoverPoster />

      {/* TRANSITION Separator 1: Cover ➔ Classroom */}
      <SectionTransition type="cover-to-classroom" />

      {/* SECTION 2: CLASSROOM BRIEFING */}
      <ChapterBriefing />

      {/* SECTION 3: BOAT DECK PREP */}
      <ChapterBoat />

      {/* SECTION 4: UNDERWATER REEF EXPLORATION */}
      <ChapterUnderwater />

      {/* SECTION 5: BOOKING POSTCARD */}
      <BookNowPostcard />

    </div>
  )
}
