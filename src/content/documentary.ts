import type { DocumentaryData } from './types';

/**
 * OSHO RAJNEESH: A DOCUMENTARY ANALYSIS
 * 
 * This data is faithfully converted from the documentary source:
 * source/OSHO_Rajneesh_Documentary_Report.docx
 * 
 * No facts, quotations, dates, statistics, or claims have been invented.
 * The source's terminology and level of certainty are preserved.
 * Analytical statements remain labeled as analysis.
 * Qualified statements remain qualified.
 */

export const documentary: DocumentaryData = {
  intro: [
    {
      type: 'heading',
      eyebrow: 'A Documentary Analysis',
      title: 'OSHO RAJNEESH',
      body: 'Philosophy, Outcomes, and the Truth Behind the Movement',
    },
    {
      type: 'paragraph',
      body: 'A Critical Examination of Verified Facts, Teachings, and Their Real-World Impact (1931–1990)',
      evidence: 'fact',
    },
    {
      type: 'heading',
      title: 'Introduction: Who Was Osho?',
    },
    {
      type: 'paragraph',
      body: 'Chandra Mohan Jain, known to the world as Osho Rajneesh (December 11, 1931 – January 19, 1990), was one of the 20th century\'s most controversial spiritual teachers. Over five decades, he delivered more than 4,000 discourses, initiated hundreds of thousands of disciples, and founded movements that spread from India to America and Europe. His ideas about sex, meditation, spirituality, and human freedom challenged conventional morality. His communities created both profound healing and devastating harm. His name is synonymous with both radical spiritual insight and organizational corruption.',
      evidence: 'fact',
    },
    {
      type: 'paragraph',
      body: 'This report examines the verified facts of his life, his authentic teachings, and critically evaluates what he was right and wrong about — based on court records, official biographies, his recorded discourses, and contemporary scholarship. No speculation. No hagiography. No dismissal. Only evidence.',
      evidence: 'analysis',
    },
  ],

  chapters: [
    // ─── CHAPTER 1: EARLY LIFE AND CLAIMED ENLIGHTENMENT ───
    {
      id: 'early-life',
      index: 1,
      slug: 'early-life',
      title: 'Early Life and Claimed Enlightenment',
      subtitle: '1931–1970',
      blocks: [
        {
          type: 'heading',
          eyebrow: '01 / The Seeker',
          title: 'Early Life and Claimed Enlightenment',
          body: '1931–1970',
        },
        {
          type: 'heading',
          title: 'Birth and Childhood',
        },
        {
          type: 'paragraph',
          body: 'Osho was born on December 11, 1931, in Kuchwada, a village in Madhya Pradesh, India, into a Jain merchant family. His parents, Babulal Jain and Saraswati, placed him in the care of his maternal grandparents at age 8. By his own accounts, he showed early mystical inclinations — questioning authority, investigating meditation, and reading widely across philosophy, religion, and science. His grandfather died in 1943; his grandmother in 1949. These separations likely shaped his later teaching on non-attachment, though he did not publicly dwell on personal trauma.',
          evidence: 'fact',
        },
        {
          type: 'paragraph',
          body: 'Fact check: His birth date, place, and Jain background are confirmed in multiple biographical sources, including his official ashram records and Britannica entries.',
          evidence: 'fact',
        },
        {
          type: 'heading',
          title: 'The Claim of Enlightenment',
          body: 'March 21, 1953',
        },
        {
          type: 'paragraph',
          body: 'At age 21, Osho claimed to have experienced sudden enlightenment while sitting under a tree in Bhanvartal Garden, Jabalpur, on the night of March 21, 1953.',
          evidence: 'fact',
        },
        {
          type: 'quote',
          text: 'That night I died and was born. The person who went to sleep was not the person who woke up. The old individual was completely gone. There was nobody to say \'I am.\' Existence flowered without a self. A center was not there, and yet everything was there.',
          attribution: 'Osho',
          source: 'From early discourses',
          evidence: 'quote',
        },
        {
          type: 'analysis',
          label: 'Analysis',
          body: 'This is a common mystical experience claim across traditions. Osho\'s description aligns with phenomenological accounts of ego-death and unity consciousness. However, the claim itself is subjective and unfalsifiable. What matters is what he taught afterward and how it affected people, not whether the experience \'happened.\' Both will be examined.',
          evidence: 'analysis',
        },
        {
          type: 'heading',
          title: 'Education and Early Career',
          body: '1955–1966',
        },
        {
          type: 'paragraph',
          body: 'From 1955–1957, Osho completed his B.A. and M.A. in Philosophy from the University of Sagar (Madhya Pradesh), graduating with distinction. He then lectured at Jabalpur University (1958–1966), where he earned a reputation as an unconventional, stimulating philosophy teacher who questioned religious orthodoxy and encouraged critical thinking. One student, Laxmi Narain, would later become his first ashram manager.',
          evidence: 'fact',
        },
        {
          type: 'paragraph',
          body: 'In the 1960s, he began touring India giving public lectures under the name Acharya Rajneesh (Teacher/Master Rajneesh), where he publicly criticized Mahatma Gandhi\'s idealization of celibacy, attacked socialist politics as morally destructive, and argued that organized religion was designed to suppress authentic human living.',
          evidence: 'fact',
        },
        {
          type: 'statement',
          body: 'What he got right: His critique of sexual repression was prescient.',
          evidence: 'analysis',
        },
        {
          type: 'paragraph',
          body: 'In the 1960s, when Hindu, Jain, and Christian orthodoxy all treated sex as sinful, dangerous, and to be tightly controlled, Osho taught that sexual energy was natural, often sacred, and could be a gateway to spiritual awareness. His book \'From Sex to Superconsciousness\' (1968) argued that suppressing sexuality leads to neurosis, guilt, and spiritual stagnation. His core insight was correct: repression causes harm.',
          evidence: 'analysis',
        },
        {
          type: 'timeline',
          items: [
            { year: '1931', event: 'Born in Kuchwada, Madhya Pradesh' },
            { year: '1953', event: 'Claimed enlightenment in Jabalpur' },
            { year: '1955–57', event: 'B.A. and M.A. in Philosophy, University of Sagar' },
            { year: '1958–66', event: 'Lecturer at Jabalpur University' },
            { year: '1968', event: '\'From Sex to Superconsciousness\' published' },
          ],
        },
      ],
    },

    // ─── CHAPTER 2: FOUNDING THE MOVEMENT ───
    {
      id: 'founding-movement',
      index: 2,
      slug: 'founding-movement',
      title: 'Founding the Movement',
      subtitle: '1970–1973',
      blocks: [
        {
          type: 'heading',
          eyebrow: '02 / The Teacher',
          title: 'Founding the Movement',
          body: '1970–1973',
        },
        {
          type: 'paragraph',
          body: 'In 1970, Osho introduced Dynamic Meditation — a cathartic meditation technique combining rapid breathing, emotional release, and silent witnessing. He described it as \'a revolution in meditation for modern humans\' who lacked the physical discipline of monks. He initiated his first group of neo-sannyasins (initiates) in Mumbai on September 26, 1970. In 1971, he adopted the title Bhagwan Shree Rajneesh (The Blessed Lord). By 1973, he had thousands of followers across India, particularly among educated, urban seekers.',
          evidence: 'fact',
        },
        {
          type: 'timeline',
          items: [
            { year: '1970', event: 'Dynamic Meditation introduced; first neo-sannyasins initiated in Mumbai' },
            { year: '1971', event: 'Adopted the title Bhagwan Shree Rajneesh' },
            { year: '1973', event: 'Thousands of followers across India' },
          ],
        },
      ],
    },

    // ─── CHAPTER 3: PUNE ASHRAM ───
    {
      id: 'pune-ashram',
      index: 3,
      slug: 'pune-ashram',
      title: 'Pune Ashram',
      subtitle: '1974–1981: Building a Utopia',
      blocks: [
        {
          type: 'heading',
          eyebrow: '03 / The Movement',
          title: 'Pune Ashram',
          body: '1974–1981: Building a Utopia',
        },
        {
          type: 'heading',
          title: 'The Experiment Begins',
        },
        {
          type: 'paragraph',
          body: 'In 1974, with help from Ma Yoga Mukta, a wealthy Indian woman and early follower, Osho established an ashram (spiritual community) in Koregaon Park, Pune. The ashram became a place of intense meditation, therapy, and communal living. By the late 1970s, thousands of seekers — including many from Europe, America, and Australia — came to sit with Osho, participate in group therapies, and live an experimental life focused on consciousness and freedom.',
          evidence: 'fact',
        },
        {
          type: 'heading',
          title: 'The Zorba the Buddha Vision',
        },
        {
          type: 'paragraph',
          body: 'Osho\'s core teaching during the Pune years was captured in the concept \'Zorba the Buddha\' — a synthesis of material comfort, sensual pleasure, and spiritual awakening. He rejected the false choice between worldly success and spiritual depth.',
          evidence: 'fact',
        },
        {
          type: 'quote',
          text: 'Why should the spiritual person be poor? Why should spirituality be against luxury, beauty, music, dance? The old religions made you choose: either you are Zorba — enjoying life, dancing, sensual — or you are the Buddha — meditating, poor, celibate. I say: be both. Be a Buddha who loves to live well, who celebrates existence.',
          attribution: 'Osho',
          source: 'From 1975–1980 discourses',
          evidence: 'quote',
        },
        {
          type: 'analysis',
          label: 'What he got right',
          body: 'Osho correctly identified a false dichotomy in traditional spirituality. Monasticism, celibacy, and poverty are not inherent requirements of awakening. Osho\'s integration model is healthier than medieval asceticism.',
          evidence: 'analysis',
        },
        {
          type: 'heading',
          title: 'The Shadow: Group Therapies and Boundary Issues',
        },
        {
          type: 'paragraph',
          body: 'The Pune ashram also introduced intensive group therapies — many adapted from Primal Scream Therapy, Gestalt, and encounter groups. Disciples participated in Encounter groups, Primal Scream sessions, and Tantra-based practices aimed at catharsis and emotional release.',
          evidence: 'fact',
        },
        {
          type: 'statement',
          body: 'What went wrong: Documented accounts from therapists and ex-disciples describe:',
          evidence: 'fact',
        },
        {
          type: 'paragraph',
          body: 'Sexually invasive \'therapy\' — therapists encouraging sexual contact between participants under the guise of \'breaking repression.\' Lack of professional boundaries — no informed consent, no trauma screening, no aftercare. Abuse of power — therapists who were Osho\'s chosen appointees were treated as beyond accountability.',
          evidence: 'fact',
        },
        {
          type: 'analysis',
          label: 'Osho\'s responsibility',
          body: 'While Osho himself did not directly run the therapies, he created and sanctioned the culture that enabled boundary violations. He got the principle right — emotional catharsis can help healing — but the execution was deeply unethical.',
          evidence: 'analysis',
        },
      ],
    },

    // ─── CHAPTER 4: OREGON COMMUNE ───
    {
      id: 'rajneeshpuram',
      index: 4,
      slug: 'rajneeshpuram',
      title: 'The Oregon Commune',
      subtitle: '1981–1985: Paradise and Corruption',
      blocks: [
        {
          type: 'heading',
          eyebrow: '04 / Rajneeshpuram',
          title: 'The Oregon Commune',
          body: '1981–1985: Paradise and Corruption',
        },
        {
          type: 'heading',
          title: 'The Relocation',
        },
        {
          type: 'paragraph',
          body: 'On June 1, 1981, Osho left India for the United States. His personal secretary, Ma Anand Sheela — an Indian-American woman with a talent for organization — orchestrated the move. In August 1981, Sheela purchased a 64,229-acre ranch in Wasco County, Oregon, for $5.75 million. The community was renamed Rajneeshpuram and incorporated as a city in May 1982.',
          evidence: 'fact',
        },
        {
          type: 'heading',
          title: 'A New Civilization',
        },
        {
          type: 'paragraph',
          body: 'At its peak (1983–1984), Rajneeshpuram had 7,000 residents. The community built schools, farms, factories, a medical center, its own police force, fire department, and airport. Osho himself lived in seclusion. Sheela became the de facto leader, running day-to-day operations with increasing authoritarian control.',
          evidence: 'fact',
        },
        {
          type: 'heading',
          title: 'The Bioterror Attack',
          body: 'September 1984',
        },
        {
          type: 'paragraph',
          body: 'On September 9, 1984, members of Sheela\'s inner circle intentionally contaminated 10 salad bars in restaurants in The Dalles, Oregon, with Salmonella typhimurium. Over 750 people became ill; 45 were hospitalized. This was the largest act of bioterrorism in U.S. history at that time.',
          evidence: 'fact',
        },
        {
          type: 'paragraph',
          body: 'Fact check: This is documented in U.S. Department of Justice criminal convictions (case no. CR 85–0150, U.S. District Court, District of Oregon). Ma Anand Sheela pleaded guilty to conspiracy; her partner Dr. Devaraj pleaded guilty to producing biological weapons.',
          evidence: 'fact',
        },
        {
          type: 'analysis',
          label: 'Osho\'s responsibility',
          body: 'While Osho was likely unaware of the specific plot, he created and maintained the conditions that enabled it. He appointed Sheela as his voice, claimed she was enlightened, discouraged followers from questioning her, and lived in separation from the community, abdicating responsibility for governance and ethics. This is Osho\'s most significant failure.',
          evidence: 'analysis',
        },
        {
          type: 'timeline',
          items: [
            { year: '1981', event: 'Osho leaves India for the United States' },
            { year: '1981', event: 'Sheela purchases 64,229-acre ranch in Oregon' },
            { year: '1982', event: 'Rajneeshpuram incorporated as a city' },
            { year: '1983–84', event: 'Community peaks at 7,000 residents' },
            { year: '1984', event: 'Salmonella bioterror attack — 750 sickened' },
          ],
        },
      ],
    },

    // ─── CHAPTER 5: LEGAL RECKONING AND DEPORTATION ───
    {
      id: 'legal-reckoning',
      index: 5,
      slug: 'legal-reckoning',
      title: 'Legal Reckoning and Deportation',
      subtitle: '1985–1987',
      blocks: [
        {
          type: 'heading',
          eyebrow: '05 / The Collapse',
          title: 'Legal Reckoning and Deportation',
          body: '1985–1987',
        },
        {
          type: 'heading',
          title: 'The Collapse of Rajneeshpuram',
        },
        {
          type: 'paragraph',
          body: 'In September 1985, Sheela fled the Oregon commune. Osho publicly expelled her and encouraged followers to report crimes to authorities. Criminal investigations revealed immigration fraud, wiretapping, and the Salmonella bioterror attack. By November 1985, Osho was arrested on immigration fraud charges. On November 14, 1985, he entered an Alford plea (pleading no contest to two counts), received a 10-year suspended sentence, and was fined $400,000. He was deported from the United States.',
          evidence: 'fact',
        },
        {
          type: 'heading',
          title: 'The Exile: A Prophet Rejected',
        },
        {
          type: 'paragraph',
          body: 'After his deportation, Osho was denied entry to 21 countries. He returned to India in July 1986, settling back in Pune. He reflected on his U.S. experience in a book titled \'Socrates Poisoned Again After 25 Centuries\' (1986), positioning himself as a martyr to truth. However, this obscures his own role in enabling the corruption that destroyed his movement.',
          evidence: 'fact',
        },
        {
          type: 'timeline',
          items: [
            { year: 'Sep 1985', event: 'Sheela flees the commune' },
            { year: 'Nov 1985', event: 'Osho arrested on immigration fraud charges' },
            { year: 'Nov 14, 1985', event: 'Alford plea; $400,000 fine; 10-year suspended sentence' },
            { year: '1986', event: 'Denied entry to 21 countries' },
            { year: 'Jul 1986', event: 'Returns to India, settles in Pune' },
          ],
        },
      ],
    },

    // ─── CHAPTER 6: WHAT OSHO GOT FUNDAMENTALLY WRONG ───
    {
      id: 'fundamentally-wrong',
      index: 6,
      slug: 'fundamentally-wrong',
      title: 'What Osho Got Fundamentally Wrong',
      blocks: [
        {
          type: 'heading',
          eyebrow: '06 / The Reckoning',
          title: 'What Osho Got Fundamentally Wrong',
        },
        {
          type: 'heading',
          title: 'The Enlightenment-Infallibility Equation',
        },
        {
          type: 'paragraph',
          body: 'Osho taught that enlightenment grants perfect moral wisdom. This is demonstrably false. Meditation does not rewire the brain\'s ethical judgment or eliminate narcissism or the desire for power. Many claimed enlightened beings have engaged in sexual abuse, fraud, and organizational corruption. Osho created a system where the teacher is beyond accountability. This is a recipe for abuse.',
          evidence: 'argument',
        },
        {
          type: 'heading',
          title: 'The Surrender Paradox: Freedom and Obedience',
        },
        {
          type: 'paragraph',
          body: 'Osho taught that spiritual growth requires absolute surrender to the master. Disciples took vows of obedience; they changed their names; they were told to trust the teacher completely. Modern psychology shows that surrender of will to an authority figure creates patterns identical to trauma bonding. Suppression of doubt and critical thinking is a mechanism of undue influence. Many ex-disciples developed PTSD and difficulty with autonomous decision-making after leaving.',
          evidence: 'argument',
        },
      ],
    },

    // ─── CHAPTER 7: WHAT OSHO GOT PHILOSOPHICALLY RIGHT ───
    {
      id: 'philosophically-right',
      index: 7,
      slug: 'philosophically-right',
      title: 'What Osho Got Philosophically Right',
      blocks: [
        {
          type: 'heading',
          eyebrow: '07 / The Paradox',
          title: 'What Osho Got Philosophically Right',
        },
        {
          type: 'heading',
          title: 'Sexual Repression Is Destructive',
        },
        {
          type: 'paragraph',
          body: 'In 1968, this was radical. In 2025, it is orthodox. Modern psychologists agree: sexual shame, suppression, and guilt create neurosis, depression, and disconnection from the body. Osho said it first, clearly, and loudly. He was right.',
          evidence: 'argument',
        },
        {
          type: 'heading',
          title: 'Meditation and Awareness Work',
          body: 'Empirically Supported',
        },
        {
          type: 'paragraph',
          body: 'Osho\'s emphasis on meditation, mindfulness, and conscious awareness is aligned with modern neuroscience. Hundreds of studies show that regular meditation reduces anxiety, depression, and pain perception, increases emotional regulation, improves focus and creativity, and improves immune function. The science backs him up.',
          evidence: 'argument',
        },
        {
          type: 'heading',
          title: 'The Rejection of Dogma and Institutional Religion',
        },
        {
          type: 'paragraph',
          body: 'Osho spent his life arguing that truth cannot be inherited or enforced — it must be directly experienced. He rejected the priesthood, ritual for its own sake, and belief systems that demanded obedience without inquiry. This is correct. Genuine understanding requires direct engagement, not secondhand belief. Osho was right to critique this.',
          evidence: 'argument',
        },
        {
          type: 'heading',
          title: 'Integration of the Spiritual and Mundane',
          body: 'Zorba the Buddha',
        },
        {
          type: 'paragraph',
          body: 'The false choice between spirituality and worldly success is a false choice. A person can be materially successful, sensually alive, and spiritually awake. Osho synthesized this beautifully. He was right.',
          evidence: 'argument',
        },
      ],
    },

    // ─── CHAPTER 8: FINAL YEARS AND THE QUESTION OF RESPONSIBILITY ───
    {
      id: 'final-years',
      index: 8,
      slug: 'final-years',
      title: 'Final Years and the Question of Responsibility',
      subtitle: '1987–1990',
      blocks: [
        {
          type: 'heading',
          eyebrow: '08 / The Question',
          title: 'Final Years and the Question of Responsibility',
          body: '1987–1990',
        },
        {
          type: 'paragraph',
          body: 'After returning to India in 1986, Osho reestablished the Pune ashram as an international meditation center. His health gradually declined. In February 1989, he changed his name to simply \'Osho\'. He entered a period of public silence. On January 19, 1990, at age 58, he died of heart failure (massive coronary thrombosis, per his physician Dr. Gokul Gokani).',
          evidence: 'fact',
        },
        {
          type: 'analysis',
          label: 'Did he take responsibility?',
          body: 'No. In interviews and late discourses, Osho maintained that Sheela and her inner circle were manipulators who acted without his knowledge. However, he fundamentally refused to examine his own role in creating the conditions for abuse. He did not acknowledge his teaching of absolute obedience as problematic, offer apologies to survivors of abuse, or suggest structural reforms to prevent similar abuses. This is his greatest failure — not just the harm that occurred, but the refusal to take accountability.',
          evidence: 'analysis',
        },
        {
          type: 'timeline',
          items: [
            { year: '1986', event: 'Returns to India; reestablishes Pune ashram' },
            { year: '1989', event: 'Changes name to \'Osho\'; enters public silence' },
            { year: 'Jan 19, 1990', event: 'Dies of heart failure at age 58' },
          ],
        },
      ],
    },

    // ─── CHAPTER 9: IMPACT AND LEGACY ───
    {
      id: 'impact-legacy',
      index: 9,
      slug: 'impact-legacy',
      title: 'Impact and Legacy',
      subtitle: 'The Good and the Damage (1990–Present)',
      blocks: [
        {
          type: 'heading',
          eyebrow: '09 / Legacy',
          title: 'Impact and Legacy',
          body: 'The Good and the Damage (1990–Present)',
        },
        {
          type: 'heading',
          title: 'The Ashram and Meditation Movement Continue',
        },
        {
          type: 'paragraph',
          body: 'The Osho International Meditation Resort operates in Pune with thousands of visitors annually. His recorded discourses (over 4,000) remain widely published. Osho communities and meditation centers exist in 60+ countries. For many sincere seekers, Osho\'s teachings on meditation, awareness, and freedom from dogma have been genuinely helpful.',
          evidence: 'fact',
        },
        {
          type: 'heading',
          title: 'The Cost in Human Suffering',
        },
        {
          type: 'paragraph',
          body: 'Documented harm includes survivors of sexual abuse and boundary violations during group therapies, ex-disciples who developed PTSD and attachment disorders similar to complex trauma in cult survivors, the 751 people sickened in the 1984 bioterror attack with lasting health consequences, and fractured families, abandoned children, and financial exploitation by the movement.',
          evidence: 'fact',
        },
        {
          type: 'analysis',
          label: 'A balanced assessment',
          body: 'Some of Osho\'s teachings have value. The harm caused by his movement also cannot be minimized or excused.',
          evidence: 'analysis',
        },
      ],
    },
  ],

  epilogue: [
    {
      type: 'heading',
      eyebrow: 'Conclusion',
      title: 'The Paradox of Osho',
    },
    {
      type: 'paragraph',
      body: 'Osho Rajneesh presents a profound paradox: a brilliant philosopher of consciousness who was morally careless and organizationally abusive. He was not simply \'right\' or \'wrong\' — he was both, simultaneously.',
      evidence: 'conclusion',
    },
    {
      type: 'paragraph',
      body: 'Sexual repression causes psychological damage. Meditation and mindfulness are empirically beneficial. Direct experience is superior to inherited belief. Spiritual growth and material well-being are compatible. These truths stand independent of his ethical failures.',
      evidence: 'conclusion',
    },
    {
      type: 'paragraph',
      body: 'Conversely, enlightenment does not confer moral infallibility. Absolute obedience to a teacher is harmful, not liberating. Organizational ethics and democratic accountability matter. You cannot meditate your way out of the need for transparency and justice.',
      evidence: 'conclusion',
    },
    {
      type: 'statement',
      body: 'For students and seekers today: You can benefit from Osho\'s teachings on meditation and awareness while firmly rejecting his model of absolute devotion to a master. You can appreciate his philosophical insights while being cautious of any teacher who claims infallibility or discourages questioning. The gold in his work is real; so is the poison. Your job is to discern the difference.',
      evidence: 'conclusion',
    },
  ],

  references: [
    { type: 'reference', citation: 'Osho. From Sex to Superconsciousness. Harper & Row, 1968.' },
    { type: 'reference', citation: 'Osho. The Book of Secrets (discourse compilations, 1972–1975).' },
    { type: 'reference', citation: 'Osho. Socrates Poisoned Again After 25 Centuries. St. Martin\'s Press, 1986.' },
    { type: 'reference', citation: 'Official Osho.com archives and transcribed discourses.' },
    { type: 'reference', citation: 'U.S. Department of Justice, Criminal Division. Case CR 85–0150, U.S. District Court, District of Oregon (1985–1986).' },
    { type: 'reference', citation: 'Oregon Attorney General. Rajneeshee Movement Investigation (1984–1986 reports and media archives).' },
    { type: 'reference', citation: 'The Oregonian newspaper archives (1985–1986 investigative series on Rajneeshpuram).' },
    { type: 'reference', citation: 'Carter, Lewis. Charisma and Control in Rajneesh Communities. Cambridge University Press, 2011.' },
    { type: 'reference', citation: 'Hassan, Steven. Combating Cult Mind Control. Park Street Press, 2015.' },
    { type: 'reference', citation: 'Lalich, Janja, & Langone, Michael D. Take Back Your Life: Recovering from Cults and Abusive Relationships. Bay Tree Publishing, 2006.' },
    { type: 'reference', citation: 'Goleman, Daniel, & Davidson, Richard J. Altered Traits: Science Reveals How Meditation Changes Your Mind and Body. Bantam, 2017.' },
    { type: 'reference', citation: 'Van der Kolk, Bessel. The Body Keeps the Score. Penguin, 2014.' },
    { type: 'reference', citation: 'International Cultic Studies Association (ICSA). Research on trauma, recovery, and cult dynamics.', url: 'https://www.icsahome.com' },
    { type: 'reference', citation: 'Britannica Encyclopedia. \'Osho Rajneesh\' entry (cross-verified with multiple editions).' },
  ],
};
