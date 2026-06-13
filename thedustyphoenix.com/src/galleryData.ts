// Import all user-uploaded high-resolution DeviantArt gallery assets
import adiposeNecklace from './assets/images/adipose_necklace_by_thedustyphoenix_d87c7cs-fullview.jpg';
import candlesticks from './assets/images/candlesticks_by_thedustyphoenix_dg1f7qx-fullview.png';
import cookiesEarrings from './assets/images/chocolat_chip_cookie_earrings_by_thedustyphoenix_d67n4qx-fullview.jpg';
import cobwebsGlow from './assets/images/cobwebs_glow_by_thedustyphoenix_dboltyy-fullview.png';
import contractReview from './assets/images/contract_review_by_thedustyphoenix_dcocbgr-fullview.jpg';
import daisyLights from './assets/images/daisy_lights_by_thedustyphoenix_d67za0m-fullview.jpg';
import darumaEarrings from './assets/images/daruma_earrings_by_thedustyphoenix_d67n5to-fullview.jpg';
import doctorTotoro from './assets/images/doctortotoro_by_thedustyphoenix_d7un57p-fullview.jpg';
import fireEater from './assets/images/fire_eater_by_thedustyphoenix_da4kbmf-fullview.png';
import glow from './assets/images/glow_by_thedustyphoenix_deme1mf-fullview.jpg';
import gnomePortraitII from './assets/images/gnome_portrait_ii_by_thedustyphoenix_d8o000q-fullview.jpg';
import goblinsMask from './assets/images/goblins_mask_by_thedustyphoenix_d8o0s9y-fullview.png';
import ice from './assets/images/ice_by_thedustyphoenix_d69dq6m-fullview.jpg';
import ivysPet from './assets/images/ivys_pet_by_thedustyphoenix_d8dq5cr-fullview.png';
import joypost from './assets/images/joypost_by_thedustyphoenix_db1d1fr-fullview.png';
import kokeshiHalloween from './assets/images/kokeshi_halloween_by_thedustyphoenix_dcmvpyl-fullview.png';
import kuroCats from './assets/images/kuro_cats_by_thedustyphoenix_d7udfo9-fullview.jpg';
import moonFalls from './assets/images/moon_falls_by_thedustyphoenix_d7r130r-fullview.jpg';
import petalouda from './assets/images/petalouda_by_thedustyphoenix_dfag2ln-fullview.png';
import princessSerenity from './assets/images/princess_serenity_by_thedustyphoenix_df7pjhw-fullview.png';
import reflectingGlowIII from './assets/images/reflecting_glow_iii_by_thedustyphoenix_da1u5ll-fullview.jpg';
import rohesiaDancer from './assets/images/rohesia_dancer_by_thedustyphoenix_d6jpdaa-fullview.jpg';
import senshiOfDestruction from './assets/images/senshi_of_destruction_by_thedustyphoenix_df7pjls-fullview.png';
import sirenHead from './assets/images/siren_head_by_thedustyphoenix_dg1etyh-fullview.png';
import sirenStones from './assets/images/siren_stones_by_thedustyphoenix_dg1f7zi-fullview.jpg';
import slenderPony from './assets/images/slender_pony_by_thedustyphoenix_d7uhftx-fullview.jpg';
import slenderWoods from './assets/images/slender_woods_by_thedustyphoenix_dg1ewzx-fullview.png';
import snorlaxCover from './assets/images/snorlax_light_switch_cover_by_thedustyphoenix_dc8y03w-fullview.jpg';
import snowyOwlEarrings from './assets/images/snowy_owl_earrings_by_thedustyphoenix_d7tbfsh-fullview.jpg';
import strayed from './assets/images/strayed_by_thedustyphoenix_d7b2xfi-fullview.jpg';
import suitorArmor from './assets/images/suitorarmor_by_thedustyphoenix_dekhaom-fullview.png';
import tearsHangingTree from './assets/images/tears_of_the_hanging_tree_by_thedustyphoenix_dboluh1-fullview.png';
import valor from './assets/images/valor_by_thedustyphoenix_dabrkp6-fullview.png';
import zombieChomp from './assets/images/zombie_chomp_by_thedustyphoenix_dfp77xf-fullview.png';

import { GalleryItem } from './types';

export const LOCAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'da-adipose-necklace',
    title: "Adipose Necklace (test)",
    description: "A little polymer clay adipose necklace.\n\nBased on the BBC show Doctor Who.",
    imageUrl: adiposeNecklace,
    year: "2014",
    tags: ["Adipose Necklace", "jewelry", "necklace", "polymer clay", "adipose", "doctor who"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Adipose-Necklace-496056124",
    altText: "A small handmade white polymer clay Adipose pendant hanging on a silver chain"
  },
  {
    id: 'da-candlesticks',
    title: "Candlesticks",
    description: "Some bits I made while trying my hand at some KDP books.",
    imageUrl: candlesticks,
    year: "2023",
    tags: ["candle", "gothic"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Candlesticks-969848313",
    altText: "An elegant gothic-style digital illustration of black ornate candlesticks"
  },
  {
    id: 'da-cookie-earrings',
    title: "Chocolate Chip Cookie Earrings",
    description: `Add some sweetness to your wardrobe with these adorable little cookies. Each one is hand crafted from polymer clay. Made from my own original molds. with chips chopped and added by hand. All are similar but no two are exactly alike.

suspended from silver toned hook earrings.

Appx measurements:
just cookie - 1"
cookies and hook - 1 3/4" long`,
    imageUrl: cookiesEarrings,
    year: "2013",
    tags: ["Chocolate Chip Cookie", "polymer clay", "dessert", "miniature food"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Chocolat-Chip-Cookie-Earrings-375633609",
    altText: "A pair of realistic miniature chocolate chip cookie dangle earrings handcrafted from polymer clay"
  },
  {
    id: 'da-cobwebs-glow',
    title: "Cobwebs Glow",
    description: "I've always wanted to design my own set of potion labels.  So, I finally am.",
    imageUrl: cobwebsGlow,
    year: "2017",
    tags: ["cobweb", "halloween", "magic potion", "sorcery", "spider web", "witchcraft"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Cobwebs-Glow-706457338",
    altText: "A designed vintage potion label featuring spider webs and glowing gothic text"
  },
  {
    id: 'da-contract-review',
    title: "Contract Review",
    description: `Without giving away too heavy of spoilers for either show, but maybe some tiny ones....



Hilda (A Netflix original animation based on a graphic novel by Luke Pearson) is a kind, adventurous, excitable little girl who loves to learn about and make friends with the many fantastic creatures living in her world, which often leads her and her friends into trouble.  Alfur is her friend, an elf.  Elfs absolutely love paperwork, there's little more exciting then a footnote within a footnote or epic tales of contract negotiation.

Kyubey (The anime Puella Magi Madoka Magica) is a magical little creature.  In his show he offers the main character a contract, by signing she gets to become a magical girl... but... there's trouble....`,
    imageUrl: contractReview,
    year: "2018",
    tags: ["crossover", "fanart", "hilda", "madoka magica", "kyubey"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Contract-Review-766479627",
    altText: "A whimsical cross-over digital illustration of Hilda's elf friend Alfur reviewing a contract with Kyubey"
  },
  {
    id: 'da-daisy-lights',
    title: "Daisy Lights",
    description: "I always wanted to take a wildflower pic like this, all lit by the setting sun. I finally lucked into one why driving around a large park/nature reclamation area. We happened by the field of daisies right as the sun turned golden.",
    imageUrl: daisyLights,
    year: "2013",
    tags: ["meadow", "golden hour", "flowers", "photography"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Daisy-Lights-376200310",
    altText: "A warm photographic shot of white daisies in a meadow illuminated by the glowing golden sunset"
  },
  {
    id: 'da-daruma-earrings',
    title: "Daruma Earrings",
    description: `Daruma are a traditional wishing doll from Japan. They are sold or given away with blank white eyes. When you make your wish or set your goal you fill the pupil of just one eye. When your wish/goal is complete you fill in the other eye.

This daruma is made from polymer clay and hand painted with acrylic. He's been coated in gloss and accented with a deep yellow seed bead at each end. They are hung on metal earring hooks.

Approx Measurements:
Charm 3/4"
with hooks 1 3/4"`,
    imageUrl: darumaEarrings,
    year: "2013",
    tags: ["daruma", "wish", "Japanese folk art", "polymer clay"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Daruma-Earrings-375635004",
    altText: "A pair of traditional Japanese Daruma doll earrings handpainted on polymer clay"
  },
  {
    id: 'da-doctor-totoro',
    title: "Doctor Totoro",
    description: "Totoro and his neighbors doing a little Doctor Who cosplay.",
    imageUrl: doctorTotoro,
    year: "2014",
    tags: ["totoro", "doctor who", "crossover"],
    link: "https://www.deviantart.com/thedustyphoenix/art/DoctorTotoro-474731557",
    altText: "A cute fan art painting of Totoro dressed in a brown trench coat as Doctor Who"
  },
  {
    id: 'da-fire-eater',
    title: "Fire Eater",
    description: "My little fire eater.",
    imageUrl: fireEater,
    year: "2016",
    tags: ["chibi", "fire eater", "performer", "renaissance faire"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Fire-Eater-642423065",
    altText: "A colorful chibi character illustration of a Renaissance faire fire eater performing in a costume"
  },
  {
    id: 'da-glow',
    title: "Glow",
    description: "A little gnome and his friend.",
    imageUrl: glow,
    year: "2021",
    tags: ["candlelight", "gnome", "matchstick", "moth", "plague doctor", "plague mask"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Glow-884133303",
    altText: "A cozy digital drawing of a small gnome resting near a lit matchstick and a friendly moth"
  },
  {
    id: 'da-gnome-portrait-ii',
    title: "Gnome Portrait II",
    description: "",
    imageUrl: gnomePortraitII,
    year: "2015",
    tags: ["blossoms", "cherry", "gnome", "portrait", "puppet", "sakura", "spring"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Gnome-Portrait-II-524040218",
    altText: "A delightful portrait of a handmade fantasy gnome puppet surrounded by spring cherry blossoms"
  },
  {
    id: 'da-goblins-mask',
    title: "Goblins Mask",
    description: `Silhouette of Sarah in her ballgown holding the mask of Jareth the Goblin King.  
Jim Henson's Labyrinth. 

I used a bit of stock from the wonderful :iconsenshistock: to help me with the pose of the arm, torso, and face.

Labyrinth image inside her is my own image I've used as a background for a couple Sarah chibis:
Sarah: https://www.deviantart.com/thedustyphoenix/art/Sarah-and-Toby-524018118
Sarah Ballgown: https://www.deviantart.com/thedustyphoenix/art/Sarah-419698612?q=gallery%3Athedustyphoenix%2F47664724&qo=14`,
    imageUrl: goblinsMask,
    year: "2015",
    tags: ["jimhenson", "labyrinth", "goblin king", "masquerade", "sarah ball gown"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Goblins-Mask-524076838",
    altText: "A high-contrast graphic silhouette art piece of Sarah holding Jareth the Goblin King's masquerade mask"
  },
  {
    id: 'da-ice',
    title: "Ice",
    description: `A frosty mask made from a paper base.

This mask is painted in shades of white and blue. The base is white with a blue tinet and metallic sheen that feathers out over dark blue edges. The ice design is partly semi-transparent, distressed in a pale blue and tipped in metallic white.

Dimensional tendrils emanate out from the center of this mask and climb up the tiara. Pearl like dots line the lower rims of the eyes.

The entire mask has a subtle blue shimmer from iridescent glitter. At the middle of the tiara is a large plastic crystal surrounded by tendrils.`,
    imageUrl: ice,
    year: "2013",
    tags: ["mask", "masquerade", "costume"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Ice-378554062",
    altText: "An ornate handcrafted mask painted in shades of icy white and blue with dimensional tendrils and a center crystal"
  },
  {
    id: 'da-ivys-pet',
    title: "Ivy's Pet",
    description: "Poison Ivy from Batman with her new pakkun from Nintendos Mario.",
    imageUrl: ivysPet,
    year: "2015",
    tags: ["chompy flower", "comics", "poison ivy", "pakkun", "piranha plant"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Ivys-Pet-506784411",
    altText: "A vibrant digital drawing of Poison Ivy holding a miniature Piranha Plant from Mario"
  },
  {
    id: 'da-joypost',
    title: "Joypost",
    description: "Nurse Joy from Pokemon.",
    imageUrl: joypost,
    year: "2017",
    tags: ["chibi", "nurse joy", "pokemon"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Joypost-667415943",
    altText: "A cute chibi digital illustration of Nurse Joy in her uniform from Pokemon"
  },
  {
    id: 'da-kokeshi-halloween',
    title: "Kokeshi Halloween",
    description: "Another of my kokeshi set.",
    imageUrl: kokeshiHalloween,
    year: "2018",
    tags: ["halloween", "japanese", "kawaii", "kokeshi", "pumpkin"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Kokeshi-Halloween-764025645",
    altText: "An adorable Japanese kokeshi doll styled with a Halloween pumpkin dress and witch hat"
  },
  {
    id: 'da-kuro-cats',
    title: "Kuro Cats",
    description: "A few of my favorite black cats:\nLuna - Sailor Moon\nJiji - Kiki's Delivery Service\nTakkuun - FLCL\nKuro Neko - Trigun",
    imageUrl: kuroCats,
    year: "2014",
    tags: ["neko", "trigun", "sailor moon", "flcl", "kiki's delivery service"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Kuro-Cats-474278553",
    altText: "A collective digital drawing of famous anime black cats including Luna, Jiji, Takkuun, and Kuro Neko"
  },
  {
    id: 'da-moon-falls',
    title: "Moon Falls",
    description: `I'm sure if these two were ever to actually cross over the fall of the Moon Kingdom would be a fixed point in time, but then again, wibbley wobbley...

The Doctor whisking away Princess Serenity as the Moon Kingdom collapses around them.`,
    imageUrl: moonFalls,
    year: "2014",
    tags: ["sailor moon", "soctor who", "cross over", "princess serenity", "tardis"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Moon-Falls-468663435",
    altText: "A dramatic fan art illustration of the Doctor from Doctor Who rescuing Princess Serenity in the TARDIS"
  },
  {
    id: 'da-petalouda',
    title: "Petalouda",
    description: `Fan Art of Hades and butterfly Persephone from the Web Comic Lore Olympus. \nI might be on my third read through.....\n\nDrawn up from scratch in one evening in Procreate.  I'm pretty happy with it considering male anatomy is very much not my strong suit.\n\nPetalouda = Butterfly`,
    imageUrl: petalouda,
    year: "2022",
    tags: ["aidoneus", "butterfly", "hades", "mythology", "persephone", "lore olympus"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Petalouda-924538667",
    altText: "A beautiful Procreate digital painting of Hades and butterfly-winged Persephone from Lore Olympus"
  },
  {
    id: 'da-princess-serenity',
    title: "Princess Serenity",
    description: "Princess Serenity from Sailor Moon.",
    imageUrl: princessSerenity,
    year: "2022",
    tags: ["chibi", "princess serenity", "sailor moon", "serenity", "usagi tsukino", "sailor moon crystal"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Princess-Serenity-919941620",
    altText: "A charming chibi digital portrait of Princess Serenity from Sailor Moon"
  },
  {
    id: 'da-reflecting-glow-iii',
    title: "Reflecting Glow III",
    description: `Image size
5184x3456px 18.57 MB
Make
Canon
Model
Canon EOS REBEL T3i
Shutter Speed
1/8 second
Aperture
F/3.5
Focal Length
18 mm
ISO Speed
3200
Date Taken
Oct 31, 2015, 6:44:01 AM
Sensor Size
22mm`,
    imageUrl: reflectingGlowIII,
    year: "2016",
    tags: ["pumpkin carving", "creepy", "halloween decoration", "jackolantern", "pumpkin"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Reflecting-Glow-III-607748313",
    altText: "A close-up photograph of a detailed, creepily carved pumpkin lantern glowing inside a dark room"
  },
  {
    id: 'da-rohesia-dancer',
    title: "Rohesia Dancer",
    description: "I needed a break from drawing Chibi's. I'm pretty happy with how she turned out too. Not sure what it is about her, she's pretty simple, but there's something about her that makes me quite happy.",
    imageUrl: rohesiaDancer,
    year: "2013",
    tags: ["renaissance faire", "dancer"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Rohesia-Dancer-395893378",
    altText: "An elegant traditional-style drawing of a Renaissance faire dancer in flowy medieval clothing"
  },
  {
    id: 'da-senshi-destruction',
    title: "Senshi of Destruction",
    description: `Hotaru from Sailor Moon.

My favorite Senshi.`,
    imageUrl: senshiOfDestruction,
    year: "2022",
    tags: ["hotaru tomoe", "sailor senshi", "senshi of silence", "sailor moon crystal", "sailor saturn"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Senshi-of-Destruction-919941760",
    altText: "A powerful full-color digital illustration of Hotaru Tomoe as Sailor Saturn from Sailor Moon Crystal"
  },
  {
    id: 'da-siren-head',
    title: "Siren Head",
    description: `Going on a Cryptid Kick.


"Siren Head is a fictional monster created by Trevor Henderson. It is a tall emaciated being with a pair of symbolic sirens where a head would normally go, which are capable of emitting various noises both natural and man-made, including sirens, radio broadcasts, white noise, and human voices. An ambush predator, it always hides in plain sight and sometimes mimics the voices of its past victims to lure any potential prey closer. The creature is one of many monsters in Trevor Henderson's found-footage style art..." 
~ https://en.wikipedia.org/wiki/List_of_creepypastas#Siren_Head`,
    imageUrl: sirenHead,
    year: "2023",
    tags: ["cryptid", "crypto zoology", "monster", "nightmare", "urban legend", "creepy pasta", "siren head"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Siren-Head-969830441",
    altText: "An eerie scale illustration of the fan-favorite cryptid Siren Head standing slim against a foggy tree line"
  },
  {
    id: 'da-siren-stones',
    title: "Siren Stones",
    description: `Made this ages ago to get used to my new drawing tablet. 
`,
    imageUrl: sirenStones,
    year: "2023",
    tags: ["folk lore", "lure", "mermaid", "mythology", "pirates", "sea creature", "siren", "siren song"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Siren-Stones-969848622",
    altText: "A soft digital artwork depicting deep-sea siren mermaids resting upon ocean stone ruins"
  },
  {
    id: 'da-slender-pony',
    title: "Slender Pony",
    description: `Watch out crusaders, somethings creeping through the Everfree Forest.





Based on characters from the cartoon My Little Pony.
.....and Slender Man.`,
    imageUrl: slenderPony,
    year: "2014",
    tags: ["my little pony", "cutie mark crusaders", "slender man", "cross over"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Slender-Pony-474465381",
    altText: "A crossover digital comic illustration of the Cutie Mark Crusaders encountering Slender Man in the Everfree Forest"
  },
  {
    id: 'da-slender-woods',
    title: "Slender Woods",
    description: `Going on a Cryptid Kick.



"The Slender Man (also spelled Slenderman) is a fictional supernatural character that originated as a creepypasta Internet meme created by Something Awful forum user Eric Knudsen (also known as "Victor Surge") in 2009. He is depicted as a thin, unnaturally tall humanoid with a featureless white head and face, wearing a black suit.

Stories of the Slender Man commonly feature his stalking, abducting, or traumatizing people, particularly children."

~ https://en.wikipedia.org/wiki/Slender_Man`,
    imageUrl: slenderWoods,
    year: "2023",
    tags: ["cryptid", "nightmare", "scary story", "urban legend", "slender man", "creepy pasta"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Slender-Woods-969834381",
    altText: "A spooky digital painting of the tall, featureless Slender Man standing between birch tree trunks in the forest"
  },
  {
    id: 'da-snorlax-cover',
    title: "Snorlax Light Switch Cover",
    description: `Snorlax from Pokemon

Lightswitch covers.`,
    imageUrl: snorlaxCover,
    year: "2018",
    tags: ["light switch", "pokemon", "snorlax", "switch plate"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Snorlax-Light-Switch-Cover-740617484",
    altText: "A custom light switch wall plate designed with a sleeping Snorlax illustration"
  },
  {
    id: 'da-snowy-owl-earrings',
    title: "Snowy Owl Earrings",
    description: `Polymer clay earrings.

Available with and without letters.`,
    imageUrl: snowyOwlEarrings,
    year: "2014",
    tags: ["polymer clay", "earrings", "snowy owl", "handmade craft"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Snowy-Owl-Earrings-472505777",
    altText: "A pair of beautifully detailed snowy owl earrings crafted by hand out of polymer clay"
  },
  {
    id: 'da-strayed',
    title: "Strayed",
    description: `Little Red Riding Hood and her big bad wolf Slender Man. 

I have another version of this with a child Red, but haven't colored it yet. 

Tried to do something different with this one.  I actually drew something of a background for a change instead of photo shopping one in after the fact.  I also decided to try coloring it a bit differently then I usually would.  Instead of doing my usual cell shading style or using any multiply layers I did the whole thing by just adding normal color on color on color.  I also tried out a lot of new brushes for the first time ever.  I'm usually pretty stuck on the round brush and only use the others for occasional effect, but I really wanted this to have more texture and more the feeling of a traditional book illustration then of something more animation style.`,
    imageUrl: strayed,
    year: "2014",
    tags: ["slender man", "little red riding hood", "creepy pasta", "folk lore", "cross over"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Strayed-441875646",
    altText: "An illustrative children's book-style picture depicting Red Riding Hood walking with Slender Man as the wolf"
  },
  {
    id: 'da-suitor-armor',
    title: "Suitor Armor",
    description: "Some fan art of Lucia and Modeus from one of my current favorite Web Toons, Suitor Armor by Purpah",
    imageUrl: suitorArmor,
    year: "2021",
    tags: ["lucia", "modeus", "purpah", "suitor armor", "webtoon series"],
    link: "https://www.deviantart.com/thedustyphoenix/art/SuitorArmor-880925782",
    altText: "A sweet fan art illustration of Lucia and Modeus from the webtoon series Suitor Armor"
  },
  {
    id: 'da-tears-hanging-tree',
    title: "Tears of the Hanging Tree",
    description: "Label for a potion bottle.",
    imageUrl: tearsHangingTree,
    year: "2017",
    tags: ["hangman", "magic potion", "witchcraft"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Tears-of-the-Hanging-Tree-706457989",
    altText: "A spooky hand-designed potion bottle label illustration titled Tears of the Hanging Tree"
  },
  {
    id: 'da-valor',
    title: "Valor",
    description: `Team Valor - PokemonGo

Mystic - https://www.deviantart.com/thedustyphoenix/art/Mystic-629134233
Instinct - https://www.deviantart.com/thedustyphoenix/art/Instinct-629116874

Print Version with all 3: https://www.deviantart.com/thedustyphoenix/art/Team-Go-642425300`,
    imageUrl: valor,
    year: "2016",
    tags: ["moltres", "mythic", "pokemon", "team valor", "pokemon go"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Valor-624424074",
    altText: "A fiery red digital artwork featuring Moltres, the legendary emblem of Team Valor from Pokemon Go"
  },
  {
    id: 'da-zombie-chomp',
    title: "Zombie Chomp",
    description: "Design I made for my God Daughter's shirt for the Zombie Walk.  Sadly the walk didn't happen this year so i don't think the design ever made it onto the actual shirt.  But she has the spare iron on transfer framed in her room. ^_^",
    imageUrl: zombieChomp,
    year: "2023",
    tags: ["lego", "mini fig", "uni kitty", "zombie", "lego men"],
    link: "https://www.deviantart.com/thedustyphoenix/art/Zombie-Chomp-949319907",
    altText: "A playful cartoon t-shirt illustration depicting a LEGO minifigure being bitten by a zombie kitty"
  }
];
