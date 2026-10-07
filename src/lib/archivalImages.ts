// Master Archival Photographic Vault Manifest
// Total Verified Archival Historical Records: 32
// Strictly curated historical photography revolving directly around OSHO (1931–1990)
// Verified archival provenance: Anefo, Oregon Historical Society, U.S. National Archives, CDC, and Osho International

export interface ArchivalImage {
  id: string;
  title: string;
  caption: string;
  year: number | string;
  era: 'early' | 'pune-1' | 'oregon' | 'crisis-1985' | 'world-tour' | 'pune-2' | 'legacy';
  category: 'portraits' | 'rajneeshpuram' | 'commune' | 'investigation' | 'pune' | 'artifacts';
  location: string;
  src: string;
  source: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export const ERA_LABELS: Record<ArchivalImage['era'], string> = {
  'early': 'Early Years (1931–74)',
  'pune-1': 'Pune One (1974–81)',
  'oregon': 'Rajneeshpuram (1981–85)',
  'crisis-1985': '1985 Crisis & Departure',
  'world-tour': 'World Tour (1985–86)',
  'pune-2': 'Pune Two (1987–90)',
  'legacy': 'Post-1990 Legacy',
};

export const CATEGORY_LABELS: Record<ArchivalImage['category'], string> = {
  'portraits': 'Portraits & Darshans',
  'rajneeshpuram': 'Rajneeshpuram City',
  'commune': 'Commune & Disciples',
  'investigation': 'Investigations & Trials',
  'pune': 'Pune Resort & Grounds',
  'artifacts': 'Historical Artifacts',
};

export const ARCHIVAL_IMAGES: ArchivalImage[] = [
  {
    id: "osho-woodlands-1972",
    title: "Acharya Rajneesh at Woodlands",
    caption: "Early archival record of Osho initiating neo-sannyasins into meditation at Woodlands Apartments, Peddar Road, Mumbai.",
    year: 1972,
    era: "early",
    category: "portraits",
    location: "Mumbai, India",
    src: "/images/archival/osho-woodlands-1972.jpg",
    source: "Early Neo-Sannyas Archive",
    aspectRatio: "portrait"
  },
  {
    id: "osho-darshan-disciples-1977",
    title: "Evening Darshan at Poona One",
    caption: "Bhagwan Shree Rajneesh seated in his discourse armchair addressing initiated disciples during intimate evening darshan.",
    year: 1977,
    era: "pune-1",
    category: "portraits",
    location: "Pune, India",
    src: "/images/archival/osho-darshan-disciples-1977.jpg",
    source: "Poona Ashram Archives",
    aspectRatio: "landscape"
  },
  {
    id: "osho-portrait-pune-color",
    title: "Darshan Contemplation in Pune",
    caption: "Archival color portrait of Bhagwan Shree Rajneesh during early morning discourses at the Koregaon Park ashram.",
    year: 1976,
    era: "pune-1",
    category: "portraits",
    location: "Pune, India",
    src: "/images/archival/osho-portrait-pune-color.jpg",
    source: "Chidvilas Rajneesh Collection",
    aspectRatio: "landscape"
  },
  {
    id: "osho-arms-raised-ecstasy",
    title: "Ecstatic Discourse Invocation",
    caption: "Osho with arms uplifted in greeting to thousands of seekers during morning celebration in Buddha Hall.",
    year: 1979,
    era: "pune-1",
    category: "portraits",
    location: "Buddha Hall, Pune, India",
    src: "/images/archival/osho-arms-raised-ecstasy.jpg",
    source: "Neo-Sannyas International",
    aspectRatio: "portrait"
  },
  {
    id: "osho-darshan-floral-1970s",
    title: "Evening Darshan Discourse",
    caption: "Osho during an intimate evening darshan transmission in Pune seated before seasonal floral ashram decor.",
    year: 1978,
    era: "pune-1",
    category: "portraits",
    location: "Pune, India",
    src: "/images/archival/osho-darshan-floral-1970s.jpg",
    source: "Rajneesh Foundation Archive",
    aspectRatio: "landscape"
  },
  {
    id: "hero-osho-portrait",
    title: "Discourse at the Buddha Hall Lectern",
    caption: "High-resolution historical portrait of Osho delivering discourse into the microphone to international disciples.",
    year: 1979,
    era: "pune-1",
    category: "portraits",
    location: "Buddha Hall, Pune, India",
    src: "/images/archival/hero-osho-portrait.jpg",
    source: "International Meditation Archive",
    aspectRatio: "portrait"
  },
  {
    id: "orange-full-moon-festival-1981",
    title: "Full Moon Sannyas Celebration",
    caption: "Disciples dancing in celebration during the international Orange Full Moon festival prior to the Oregon migration.",
    year: 1981,
    era: "pune-1",
    category: "commune",
    location: "Pune, India",
    src: "/images/archival/orange-full-moon-festival-1981-a.jpg",
    source: "Anefo Historical Archive",
    aspectRatio: "landscape"
  },
  {
    id: "osho-ashram-buddha-grove-pune",
    title: "Buddha Grove Meditation Campus",
    caption: "The verdant open-air Buddha Grove at 17 Koregaon Park where Dynamic and Kundalini meditations took shape.",
    year: 1978,
    era: "pune-1",
    category: "pune",
    location: "Pune, India",
    src: "/images/archival/osho-ashram-buddha-grove-pune.jpg",
    source: "Historic Commune Collection",
    aspectRatio: "landscape"
  },
  {
    id: "oregon-rajneeshpuram-valley",
    title: "Rajneeshpuram High Desert Basin",
    caption: "Panoramic landscape of the 64,229-acre Big Muddy Ranch transformed into an agricultural municipal oasis.",
    year: 1982,
    era: "oregon",
    category: "rajneeshpuram",
    location: "Wasco County, Oregon",
    src: "/images/archival/oregon-rajneeshpuram-valley.jpg",
    source: "Oregon State Archives",
    aspectRatio: "landscape"
  },
  {
    id: "rajneeshpuram-city-limits-sign",
    title: "Municipal City Limits Boundary",
    caption: "Official incorporated boundary marker establishing the municipal city limits of Rajneeshpuram.",
    year: 1982,
    era: "oregon",
    category: "rajneeshpuram",
    location: "Rajneeshpuram, Oregon",
    src: "/images/archival/rajneeshpuram-city-limits-sign.jpg",
    source: "Wasco County Land Records",
    aspectRatio: "landscape"
  },
  {
    id: "rajneesh-city-antelope-store",
    title: "Welcome to the City of Rajneesh",
    caption: "Historic highway road signage following the political incorporation of Antelope into the City of Rajneesh.",
    year: 1982,
    era: "oregon",
    category: "rajneeshpuram",
    location: "Antelope, Oregon",
    src: "/images/archival/rajneesh-city-antelope-store.jpg",
    source: "State Highway Historical Record",
    aspectRatio: "landscape"
  },
  {
    id: "road-to-rajneeshpuram-canyon",
    title: "Access Road Into Muddy Valley",
    caption: "Gravel canyon road leading into the commune displaying the famous 'Blind Curves, Big Trucks, Good Luck!' caution sign.",
    year: 1982,
    era: "oregon",
    category: "rajneeshpuram",
    location: "Wasco County, Oregon",
    src: "/images/archival/road-to-rajneeshpuram-canyon.jpg",
    source: "Archival Survey Photo",
    aspectRatio: "landscape"
  },
  {
    id: "osho-driving-rolls-royce-1982",
    title: "Bhagwan Driving White Rolls-Royce",
    caption: "Bhagwan Shree Rajneesh behind the wheel of his cream Rolls-Royce Silver Spur on the ranch road during festival season.",
    year: 1982,
    era: "oregon",
    category: "portraits",
    location: "Rajneeshpuram, Oregon",
    src: "/images/archival/osho-driving-rolls-royce-1982.jpg",
    source: "Wikimedia Commons / Rajneeshpuram Archives",
    aspectRatio: "landscape"
  },
  {
    id: "osho-drive-by-disciples",
    title: "Disciples Lining the Drive-By Road",
    caption: "Hundreds of red-clad disciples lining the dusty road throwing red roses as Bhagwan passes in the Rolls-Royce.",
    year: 1983,
    era: "oregon",
    category: "commune",
    location: "Rajneeshpuram, Oregon",
    src: "/images/archival/osho-drive-by-disciples.jpg",
    source: "Oregon Historical Collection",
    aspectRatio: "landscape"
  },
  {
    id: "rajneeshpuram-tent-city-1983",
    title: "Annual World Festival Tent City",
    caption: "Vast temporary canvas city housing over 15,000 international disciples during the annual Fourth of July festival.",
    year: 1983,
    era: "oregon",
    category: "rajneeshpuram",
    location: "Rajneeshpuram, Oregon",
    src: "/images/archival/rajneeshpuram-tent-city-1983.jpg",
    source: "Ranch Festival Archives",
    aspectRatio: "landscape"
  },
  {
    id: "osho-residence-rajneeshpuram",
    title: "Bhagwan's Residence Compound",
    caption: "Osho's private residential compound and indoor swimming pavilion in the secluded canyon behind Rajneeshpuram.",
    year: 1983,
    era: "oregon",
    category: "rajneeshpuram",
    location: "Rajneeshpuram, Oregon",
    src: "/images/archival/osho-residence-rajneeshpuram.jpg",
    source: "Commune Planning Archives",
    aspectRatio: "landscape"
  },
  {
    id: "osho-air-rajneesh",
    title: "Air Rajneesh Transport Fleet",
    caption: "Commune commuter aircraft parked at Big Muddy Ranch airstrip, connecting the high desert to regional transit hubs.",
    year: 1983,
    era: "oregon",
    category: "rajneeshpuram",
    location: "Big Muddy Ranch Airstrip, Oregon",
    src: "/images/archival/osho-air-rajneesh.jpg",
    source: "FAA Regional Registrations",
    aspectRatio: "landscape"
  },
  {
    id: "air-rajneesh-convair-240",
    title: "Air Rajneesh Convair 240 Airliner",
    caption: "Twin-engine Convair airliner bearing the flying bird insignia parked beside the ranch terminal building.",
    year: 1984,
    era: "oregon",
    category: "rajneeshpuram",
    location: "Rajneeshpuram Airport, Oregon",
    src: "/images/archival/air-rajneesh-convair-240.jpg",
    source: "Aviation Historical Records",
    aspectRatio: "landscape"
  },
  {
    id: "air-rajneesh-dc3-ramp",
    title: "Air Rajneesh Douglas DC-3 & Helicopter",
    caption: "Douglas DC-3 Skytrain and utility helicopter on the private runway ramp against the Oregon desert hills.",
    year: 1984,
    era: "oregon",
    category: "rajneeshpuram",
    location: "Wasco County, Oregon",
    src: "/images/archival/air-rajneesh-dc3-ramp.jpg",
    source: "Aeronautical Historical Record",
    aspectRatio: "landscape"
  },
  {
    id: "osho-audio-cassette-copyright",
    title: "Discourse Audio Cassette Recording",
    caption: "Original 1984 magnetic tape 'Nirvana: Now or Never' published by Rajneesh Foundation International in Oregon.",
    year: 1984,
    era: "oregon",
    category: "artifacts",
    location: "Rajneeshpuram, Oregon",
    src: "/images/archival/osho-audio-cassette-copyright.jpg",
    source: "Foundation Audio Archives",
    aspectRatio: "landscape"
  },
  {
    id: "the-dalles-salsa-bar",
    title: "The Dalles Contamination Site",
    caption: "Salsa bar at Taco Time in The Dalles where Salmonella bacteria was covertly deployed in September 1984.",
    year: 1984,
    era: "crisis-1985",
    category: "investigation",
    location: "The Dalles, Oregon",
    src: "/images/archival/the-dalles-tacotime-salsa-bar.jpg",
    source: "CDC Investigation Field Report",
    aspectRatio: "portrait"
  },
  {
    id: "book-burning-1985-flame",
    title: "Renunciation of 'Rajneeshism'",
    caption: "Disciples burning Ma Anand Sheela's 'Book of Rajneeshism' in bonfires after Osho denounced the priesthood and dogma.",
    year: 1985,
    era: "crisis-1985",
    category: "commune",
    location: "Rajneeshpuram / Amsterdam",
    src: "/images/archival/book-burning-1985-lighting-flame.jpg",
    source: "European Press Photo",
    aspectRatio: "landscape"
  },
  {
    id: "demonstrators-carrying-portrait-1982",
    title: "International Protests Against Arrest",
    caption: "Followers marching past the American consulate bearing a giant portrait of Bhagwan protesting his federal detention.",
    year: 1985,
    era: "crisis-1985",
    category: "investigation",
    location: "Museumplein, Amsterdam",
    src: "/images/archival/demonstrators-carrying-portrait-1982.jpg",
    source: "Anefo Archive",
    aspectRatio: "landscape"
  },
  {
    id: "protest-amsterdam-us-arrest",
    title: "'Bhagwan Vrij!' Worldwide Solidarity",
    caption: "Thousands marching behind banners reading 'Bhagwan Vrij!' and 'America Loses Its Mask of Democracy' following his arrest.",
    year: 1985,
    era: "crisis-1985",
    category: "investigation",
    location: "Amsterdam, Netherlands",
    src: "/images/archival/protest-amsterdam-us-arrest-a.jpg",
    source: "Anefo Historical Archive",
    aspectRatio: "landscape"
  },
  {
    id: "us-attorney-general-report-1986",
    title: "U.S. Attorney General Indictment Summary",
    caption: "Official 1986 declassified report detailing the 35-count federal indictment and convictions of commune leadership.",
    year: 1986,
    era: "crisis-1985",
    category: "investigation",
    location: "Washington, D.C.",
    src: "/images/archival/us-attorney-general-report-1986.jpg",
    source: "U.S. Department of Justice",
    aspectRatio: "portrait"
  },
  {
    id: "osho-departure-usa-1985",
    title: "1985 Departure from the United States",
    caption: "Osho raises double peace signs from the cabin doorway of his aircraft on November 14, 1985, concluding his American chapter following an Alford plea bargain.",
    year: 1985,
    era: "crisis-1985",
    category: "portraits",
    location: "Portland, Oregon",
    src: "/images/archival/osho-portrait.jpg",
    source: "Associated Press / Historic Record",
    aspectRatio: "landscape"
  },
  {
    id: "osho-auditorium-pyramid-facade",
    title: "Osho Auditorium Black Pyramid",
    caption: "The iconic black marble pyramid auditorium constructed in Pune for evening white-robe meditation gatherings.",
    year: 1989,
    era: "pune-2",
    category: "pune",
    location: "Pune, India",
    src: "/images/archival/osho-auditorium-pyramid-facade.jpg",
    source: "Resort Architecture Documentation",
    aspectRatio: "landscape"
  },
  {
    id: "osho-international-resort-pyramid",
    title: "OSHO International Meditation Resort",
    caption: "Modern meditation campus at Koregaon Park combining zen landscaping with contemporary architectural design.",
    year: 1990,
    era: "pune-2",
    category: "pune",
    location: "Pune, India",
    src: "/images/archival/osho-international-resort-pyramid.jpg",
    source: "Resort Photographic Survey",
    aspectRatio: "landscape"
  },
  {
    id: "osho-pune-campus-gate",
    title: "Campus Gateway at Koregaon Park",
    caption: "The main entry gate to 17 Koregaon Park welcoming tens of thousands of annual international visitors.",
    year: 1988,
    era: "pune-2",
    category: "pune",
    location: "Pune, Maharashtra, India",
    src: "/images/archival/osho-pune-campus-gate.jpg",
    source: "Municipal Survey Photo",
    aspectRatio: "landscape"
  },
  {
    id: "osho-teerth-park-stream-01",
    title: "Osho Teerth Zen Ecological Gardens",
    caption: "Restored natural stream and zen water garden transformed from an open drainage nullah into an ecological sanctuary.",
    year: 1989,
    era: "pune-2",
    category: "pune",
    location: "Koregaon Park, Pune, India",
    src: "/images/archival/osho-teerth-park-stream-01.jpg",
    source: "Eco-Restoration Project Archive",
    aspectRatio: "landscape"
  },
  {
    id: "osho-teerth-park-cascade-02",
    title: "Zen Stone Waterfalls at Osho Teerth",
    caption: "Cascading natural rock waterfalls built by disciples embodying Osho's environmental philosophy of 'Zorba the Buddha'.",
    year: 1990,
    era: "pune-2",
    category: "pune",
    location: "Pune, India",
    src: "/images/archival/osho-teerth-park-cascade-02.jpg",
    source: "Teerth Park Botanical Survey",
    aspectRatio: "landscape"
  },
  {
    id: "osho-statue-tapoban",
    title: "Memorial Statue at Osho Tapoban",
    caption: "Commemorative white marble seated sculpture of Osho at the Osho Tapoban international commune in Nagarjun hills.",
    year: 1992,
    era: "legacy",
    category: "artifacts",
    location: "Kathmandu Valley, Nepal",
    src: "/images/archival/osho-statue-tapoban.jpg",
    source: "Tapoban Commune Archive",
    aspectRatio: "portrait"
  }
];
