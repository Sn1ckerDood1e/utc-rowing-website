// "From the archive" gallery on /history. Sources: 1983–85 LRC scrapbook
// (UTC ARC/_extracted clippings), Ben Robbs' throwback Dropbox (2026-05-14
// submission, 1990s prints + 1996–97 slide show). Web copies ≤1400px.

export type ArchivePhoto = {
  src: string;
  width: number;
  height: number;
  caption: string;
  credit: string;
};

export const ARCHIVE_GALLERY: ArchivePhoto[] = [
  {
    src: "/photos/archive/gallery/1983-riverfront-walnut-street.jpg",
    width: 1011,
    height: 1047,
    caption: "The riverfront at the Walnut Street Bridge.",
    credit: "1983–85 · LRC scrapbook",
  },
  {
    src: "/photos/archive/gallery/1983-crew-from-the-launch.jpg",
    width: 1002,
    height: 1048,
    caption: "A crew on the Tennessee, shot from the launch.",
    credit: "1983–85 · LRC scrapbook",
  },
  {
    src: "/photos/archive/gallery/1983-sculler-tennessee.jpg",
    width: 1007,
    height: 1047,
    caption: "A sculler on the Tennessee.",
    credit: "1983–85 · LRC scrapbook",
  },
  {
    src: "/photos/archive/gallery/1990s-full-team.jpg",
    width: 604,
    height: 391,
    caption: "A full UTC Rowing team photo.",
    credit: "1990s · Ben Robbs collection",
  },
  {
    src: "/photos/archive/gallery/1990s-medal-podium.jpg",
    width: 604,
    height: 416,
    caption: "UTC medalists on the podium.",
    credit: "1990s · Ben Robbs collection",
  },
  {
    src: "/photos/archive/gallery/1990s-augusta-men.jpg",
    width: 604,
    height: 426,
    caption: "UTC rowers with medals at the Augusta Invitational.",
    credit: "1990s · Ben Robbs collection",
  },
  {
    src: "/photos/archive/gallery/1990s-mens-squad.jpg",
    width: 604,
    height: 317,
    caption: "The men's squad lined up at a regatta.",
    credit: "1990s · Ben Robbs collection",
  },
  {
    src: "/photos/archive/gallery/1990s-dad-vail-eights.jpg",
    width: 604,
    height: 400,
    caption: "Eights racing on the Schuylkill at the Dad Vail Regatta.",
    credit: "1990s · Ben Robbs collection",
  },
  {
    src: "/photos/archive/gallery/1990s-dad-vail-shell-carry.jpg",
    width: 604,
    height: 397,
    caption: "UTC rowers bringing a shell in at the Dad Vail.",
    credit: "1990s · Ben Robbs collection",
  },
  {
    src: "/photos/archive/gallery/1990s-boat-christening.jpg",
    width: 396,
    height: 604,
    caption: "A boat christening.",
    credit: "1990s · Ben Robbs collection",
  },
  {
    src: "/photos/archive/gallery/1990s-eight-overhead.jpg",
    width: 604,
    height: 419,
    caption: "A crew carrying an eight down to the water.",
    credit: "1990s · Ben Robbs collection",
  },
  {
    src: "/photos/archive/gallery/1996-97-team-photo.jpg",
    width: 1095,
    height: 720,
    caption: "The 1996–97 UTC Rowing team.",
    credit: "1996–97 · Ben Robbs slides",
  },
  {
    src: "/photos/archive/gallery/1996-97-eight-to-the-dock.jpg",
    width: 1107,
    height: 720,
    caption: "Walking an eight onto the dock.",
    credit: "1996–97 · Ben Robbs slides",
  },
  {
    src: "/photos/archive/gallery/1996-97-four-celebrates.jpg",
    width: 1125,
    height: 720,
    caption: "A UTC four celebrates after the finish.",
    credit: "1996–97 · Ben Robbs slides",
  },
  {
    src: "/photos/archive/gallery/1996-97-women-medals.jpg",
    width: 1108,
    height: 720,
    caption: "UTC women with their medals.",
    credit: "1996–97 · Ben Robbs slides",
  },
];
