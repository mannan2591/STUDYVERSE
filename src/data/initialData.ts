import { Achievement, Course, ResourceItem, TimetableSlot } from '../types';

export const DEFAULT_SUBJECTS: string[] = [
  'Telugu',
  'Hindi',
  'English',
  'Mathematics',
  'Physics',
  'Biology',
  'Social',
  'Chemistry',
  'Sanskrit',
  'Botany',
  'Zoology',
];

export const SUBJECT_COLORS: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  Telugu: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800', badge: 'bg-[#0F8B6D] text-white' },
  Hindi: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800', badge: 'bg-amber-600 text-white' },
  English: { bg: 'bg-sky-50 dark:bg-sky-950/40', text: 'text-sky-700 dark:text-sky-300', border: 'border-sky-200 dark:border-sky-800', badge: 'bg-sky-600 text-white' },
  Mathematics: { bg: 'bg-teal-50 dark:bg-teal-950/40', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800', badge: 'bg-teal-600 text-white' },
  Physics: { bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800', badge: 'bg-indigo-600 text-white' },
  Biology: { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800', badge: 'bg-green-600 text-white' },
  Social: { bg: 'bg-orange-50 dark:bg-orange-950/40', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800', badge: 'bg-orange-600 text-white' },
  Chemistry: { bg: 'bg-cyan-50 dark:bg-cyan-950/40', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-800', badge: 'bg-cyan-600 text-white' },
  Sanskrit: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-800', badge: 'bg-rose-600 text-white' },
  Botany: { bg: 'bg-lime-50 dark:bg-lime-950/40', text: 'text-lime-700 dark:text-lime-300', border: 'border-lime-200 dark:border-lime-800', badge: 'bg-lime-600 text-white' },
  Zoology: { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800', badge: 'bg-purple-600 text-white' },
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-task',
    title: 'First Step to Glory',
    description: 'Complete your very first task in StudyVerse',
    xp: 50,
    badge: 'Beginner Scholar',
    iconName: 'CheckCircle2',
    category: 'tasks',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
  {
    id: 'streak-3',
    title: '3-Day Momentum',
    description: 'Maintain an active daily study streak for 3 consecutive days',
    xp: 150,
    badge: 'Momentum Builder',
    iconName: 'Flame',
    category: 'streak',
    progress: 0,
    maxProgress: 3,
    isUnlocked: false,
  },
  {
    id: 'streak-7',
    title: '7-Day Warrior',
    description: 'Achieve a full 7-day unbroken study streak',
    xp: 300,
    badge: 'Dedicated Learner',
    iconName: 'Zap',
    category: 'streak',
    progress: 0,
    maxProgress: 7,
    isUnlocked: false,
  },
  {
    id: 'streak-30',
    title: '30-Day Master of Habit',
    description: 'Complete daily study tasks for 30 consecutive days',
    xp: 1000,
    badge: 'Unstoppable Habit',
    iconName: 'Crown',
    category: 'streak',
    progress: 0,
    maxProgress: 30,
    isUnlocked: false,
  },
  {
    id: 'first-project',
    title: 'Project Architect',
    description: 'Finish and complete your first Project / Record',
    xp: 120,
    badge: 'Project Builder',
    iconName: 'FolderKanban',
    category: 'tasks',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
  {
    id: 'tasks-10',
    title: '10 Tasks Completed',
    description: 'Complete 10 homework, classwork, or project tasks',
    xp: 200,
    badge: 'Productivity Scout',
    iconName: 'Award',
    category: 'tasks',
    progress: 0,
    maxProgress: 10,
    isUnlocked: false,
  },
  {
    id: 'tasks-25',
    title: '25 Tasks Completed',
    description: 'Complete 25 tasks across all school subjects',
    xp: 500,
    badge: 'Academic Champion',
    iconName: 'Trophy',
    category: 'tasks',
    progress: 0,
    maxProgress: 25,
    isUnlocked: false,
  },
  {
    id: 'streak-14',
    title: '14-Day Consistency Master',
    description: 'Keep your daily study flame alive for two full weeks',
    xp: 600,
    badge: 'Habit Master',
    iconName: 'Flame',
    category: 'streak',
    progress: 0,
    maxProgress: 14,
    isUnlocked: false,
  },
  {
    id: 'pomodoro-first',
    title: 'First Deep Sprint',
    description: 'Complete your first full 25-minute Pomodoro study session',
    xp: 75,
    badge: 'Focus Novice',
    iconName: 'Timer',
    category: 'mastery',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
  {
    id: 'pomodoro-5',
    title: 'Zen Focus Builder',
    description: 'Log 5 focused Pomodoro study sessions',
    xp: 250,
    badge: 'Focus Master',
    iconName: 'Timer',
    category: 'mastery',
    progress: 0,
    maxProgress: 5,
    isUnlocked: false,
  },
  {
    id: 'pomodoro-20',
    title: 'Deep Work Champion',
    description: 'Complete 20 Pomodoro study sessions in your academic journey',
    xp: 750,
    badge: 'Zen Scholar',
    iconName: 'ShieldCheck',
    category: 'mastery',
    progress: 0,
    maxProgress: 20,
    isUnlocked: false,
  },
  {
    id: 'course-completed',
    title: 'Course Graduate',
    description: 'Complete all modules and quizzes of an educational course',
    xp: 400,
    badge: 'Certified Graduate',
    iconName: 'GraduationCap',
    category: 'learning',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
  },
  {
    id: 'perfect-week',
    title: 'Perfect Week',
    description: 'Complete all assigned homework on time with zero overdue tasks for 7 days',
    xp: 350,
    badge: 'Flawless Week',
    iconName: 'Sparkles',
    category: 'mastery',
    progress: 0,
    maxProgress: 7,
    isUnlocked: false,
  },
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'abhyas-deepika-10th',
    title: '10TH CLASS ABHYAS DEEPIKA ALL SUBJECTS',
    subject: 'All Subjects',
    category: 'Revision Material',
    description: 'Official comprehensive question bank, practice tests, and revision blueprint for SSC 10th Class state board examination.',
    link: 'https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW',
    isExternal: true,
    isFeatured: true,
    downloads: 3420,
    fileSize: 'Google Drive Folder',
    author: 'State Educational Department',
  },
  {
    id: 'maths-formula-sheet',
    title: 'Mathematics Complete Formula Handbook',
    subject: 'Mathematics',
    category: 'Notes',
    description: 'Algebra, Geometry, Trigonometry, Coordinate Geometry, Mensuration and Statistics formulas with quick examples.',
    link: 'https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW',
    isExternal: true,
    downloads: 1850,
    fileSize: '4.2 MB PDF',
    author: 'StudyVerse Academic Team',
  },
  {
    id: 'physics-diagrams',
    title: 'Physics Ray Diagrams & Circuit Master Guide',
    subject: 'Physics',
    category: 'Diagrams',
    description: 'High-definition labeled ray diagrams for concave/convex lenses, electric circuits, and electromagnetism concepts.',
    link: 'https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW',
    isExternal: true,
    downloads: 1240,
    fileSize: '6.8 MB PDF',
    author: 'StudyVerse Science Faculty',
  },
  {
    id: 'biology-important-questions',
    title: 'Biology Chapter-Wise 4-Mark & 2-Mark Question Bank',
    subject: 'Biology',
    category: 'Important Questions',
    description: 'Nutrition, Respiration, Transportation, Excretion, and Reproduction key diagrams and model answers.',
    link: 'https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW',
    isExternal: true,
    downloads: 1980,
    fileSize: '5.1 MB PDF',
    author: 'Senior Biology Mentor',
  },
  {
    id: 'chemistry-equations',
    title: 'Chemical Reactions & Balancing Mastery Notes',
    subject: 'Chemistry',
    category: 'Notes',
    description: 'Complete guide to balancing chemical equations, acids and bases indicators, and periodic classification trends.',
    link: 'https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW',
    isExternal: true,
    downloads: 1530,
    fileSize: '3.4 MB PDF',
    author: 'StudyVerse Team',
  },
  {
    id: 'social-model-paper',
    title: 'Social Studies Map Pointing & Board Model Papers',
    subject: 'Social',
    category: 'Question Papers',
    description: 'India and World outline map locations, historical timelines, and contemporary world economics revision notes.',
    link: 'https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW',
    isExternal: true,
    downloads: 1410,
    fileSize: '8.2 MB PDF',
    author: 'Board Review Committee',
  },
  {
    id: 'english-grammar-guide',
    title: 'English Grammar, Letter Writing & Editing Guide',
    subject: 'English',
    category: 'Study Guides',
    description: 'Direct-indirect speech, active-passive voice, formal letter formats, and comprehension test strategies.',
    link: 'https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW',
    isExternal: true,
    downloads: 2190,
    fileSize: '3.9 MB PDF',
    author: 'Language Specialists',
  },
  {
    id: 'telugu-sanskrit-sandhi',
    title: 'Telugu & Sanskrit Sandhulu and Samasalu Summary',
    subject: 'Telugu',
    category: 'Notes',
    description: 'Savarnadeergha, Guna, Vriddhi sandhi rules with simplified breakdowns and Telugu grammar flashcards.',
    link: 'https://drive.google.com/drive/folders/1KEWCdv2gg_Wd7fSkUT2vDVgTQny9HJUW',
    isExternal: true,
    downloads: 1120,
    fileSize: '2.7 MB PDF',
    author: 'Language Department',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ai-essentials',
    title: 'AI Essentials',
    tagline: 'Master Generative AI, Socratic Dialogue & Prompt Engineering for Academic Mastery',
    description: 'A comprehensive academic masterclass on using Large Language Models (LLMs) and Generative AI ethically and effectively. Learn tokenization mechanics, the C.R.E.A.T.E. prompting framework, Chain-of-Thought reasoning, hallucination detection, and real-world student workflows.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    duration: '1 hr 15 mins',
    level: 'Beginner to Advanced',
    isFree: true,
    rating: 4.98,
    studentsCount: 2840,
    instructor: 'Raghuveer (Founder, StudyVerse)',
    modules: [
      {
        id: 'ai-mod-1',
        title: 'Module 1: Foundations of Generative AI & Large Language Models',
        lessons: [
          {
            id: 'ai-l1',
            title: '1.1 How LLMs Work: Tokens, Context Windows & Probabilities',
            duration: '12 mins',
            type: 'reading',
            content: `### Demystifying Artificial Intelligence

To master AI as a student, you must understand what happens under the hood. AI models (like Gemini, GPT, Claude) are **Large Language Models (LLMs)** trained on vast corpora of human knowledge.

#### 1. Tokenization: How AI Reads
- AI does not read whole words or sentences the way humans do. It breaks text into **tokens** (roughly 4 characters or 0.75 words).
- When you provide a prompt, the model calculates mathematical probability vectors to predict the **most statistically accurate next token**.

#### 2. Context Windows: The AI's Working Memory
- Every AI model has a finite **context window** (measured in tokens).
- If your conversation exceeds this window, earlier instructions can be forgotten. 
- *Pro Student Tip*: In long study sessions, always summarize earlier conversation checkpoints to keep the AI focused on your target exam syllabus.

#### 3. Why AI is Not a Search Engine
- Traditional search engines index static web pages and return links.
- Generative AI **synthesizes and re-articulates concepts dynamically**. It can translate complex university-level biochemistry into an easy 8th-grade cartoon analogy in 2 seconds!`,
          },
          {
            id: 'ai-l2',
            title: '1.2 Socratic Tutoring vs Passive Shortcut Generation',
            duration: '10 mins',
            type: 'reading',
            content: `### The Golden Principle of Academic AI

There are two ways students use AI:
1. **The Passive Trap (Shortcut)**: Asking AI to write your entire history essay or solve all 20 math questions. *Result*: You save 30 minutes today, but fail the closed-book exam next week because zero neural connections were forged.
2. **The Active Amplifier (Socratic Tutoring)**: Asking AI to challenge your assumptions, generate practice questions, and guide your reasoning step by step. *Result*: You master the underlying principles in half the time!

#### The Socratic Prompt Formula:
> *"I am studying Newton's Second Law ($F = ma$). Act as a rigorous yet encouraging Socratic tutor. Do NOT give me the final answers directly. Instead, ask me one probing question at a time to test my understanding of mass, acceleration, and net external forces. If I make a mistake, provide a subtle real-life hint."*

This turns AI into a 24/7 private tutor that adapts precisely to your individual learning pace!`,
          },
        ],
      },
      {
        id: 'ai-mod-2',
        title: 'Module 2: Advanced Prompt Engineering for Students',
        lessons: [
          {
            id: 'ai-l3',
            title: '2.1 The C.R.E.A.T.E. Prompting Architecture',
            duration: '15 mins',
            type: 'reading',
            content: `### The C.R.E.A.T.E. Framework for High-Yield Study Prompts

Generic prompts produce generic answers. To get masterclass-grade academic explanations, apply the 6-part **C.R.E.A.T.E.** framework:

- **C - Context**: Define your educational stage and subject (*e.g., "Grade 10 CBSE Board Student preparing for Physics Optics"*).
- **R - Role**: Assign a specialized persona (*e.g., "Act as a passionate Senior Olympiad Coach"*).
- **E - Explicit Task**: State precisely what you want (*e.g., "Derive the Mirror Formula step-by-step and highlight where students commonly make sign convention errors"*).
- **A - Audience**: Specify the target clarity (*e.g., "Explain using intuitive visual diagrams and everyday flashlight examples"*).
- **T - Tone & Constraints**: Format your output (*e.g., "Limit to 4 bullet points, use bold headings, and avoid overly dense mathematical jargon"*).
- **E - Exemplar**: Provide an example of how you want the final response structured.

#### Side-by-Side Comparison:
- **Weak Prompt**: *"Explain Mitosis."*
- **Mastery Prompt**: *"Act as a molecular biology teacher. Explain the 4 stages of Mitosis (Prophase, Metaphase, Anaphase, Telophase) for a high school exam. For each stage, give: (1) Core chromosome movement, (2) A memorable 1-sentence mnemonic, (3) A common exam trap to avoid."*`,
          },
          {
            id: 'ai-l4',
            title: '2.2 Chain-of-Thought (CoT) & Step-by-Step Reasoning',
            duration: '12 mins',
            type: 'reading',
            content: `### Unleashing Chain-of-Thought (CoT) Reasoning

When dealing with multi-step math problems, chemistry stoichiometry, or complex physics derivations, AI models can make arithmetic errors if forced to guess the answer in one leap.

#### The Magic Phrase: *"Think Step by Step"*
Research demonstrates that prompting the AI with:
> *"Before providing the final answer, break down the problem into sequential steps. Show all intermediate calculations and state the governing formula used in each step."*

increases accuracy by up to **80% on STEM subjects**!

#### Example Workflow for Complex Math:
1. **Input**: A complex quadratic word problem involving speed, distance, and time.
2. **CoT Prompt**: *"1. Identify all given variables. 2. Define the unknown variable $x$. 3. Formulate the time equation. 4. Simplify into standard form $ax^2 + bx + c = 0$. 5. Apply the quadratic formula and discard any physically impossible negative roots."*
3. **Outcome**: The AI displays the full derivation trail, enabling you to inspect each logical step and verify your own work!`,
          },
        ],
      },
      {
        id: 'ai-mod-3',
        title: 'Module 3: Hallucinations, Ethics & Academic Integrity',
        lessons: [
          {
            id: 'ai-l5',
            title: '3.1 Hallucination Detection & The Triple-Check Rule',
            duration: '10 mins',
            type: 'reading',
            content: `### Understanding AI Hallucinations

An **AI Hallucination** occurs when a model generates convincing, articulate, but factually false statements. Why does this happen? Because LLMs prioritize linguistic coherence over real-world truth verification.

#### Common Student Traps:
- **Fake Academic Citations**: The AI might invent non-existent book titles, page numbers, or authors that sound remarkably plausible.
- **Subtle Math Calculation Errors**: Multiplying large numbers without code execution.
- **Historical Date Discrepancies**: Mixing up treaty years or monarch timelines.

#### The Triple-Check Rule:
1. **Cross-Reference Official Textbooks**: Always verify dates, formulas, and definitions against standard board materials (e.g., NCERT, Cambridge, State Board textbooks).
2. **Request Source Verification**: Ask the AI: *"What primary historical source or verified scientific principle supports this claim?"*
3. **Boundary Testing**: Ask the AI: *"What are the limitations or counter-arguments to this explanation?"*`,
          },
        ],
      },
      {
        id: 'ai-mod-4',
        title: 'Module 4: AI Essentials Certification Exam',
        lessons: [
          {
            id: 'ai-quiz-final',
            title: '4.1 Comprehensive AI Certification Exam',
            duration: '15 mins',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'ai-q1',
                question: 'What is a "token" in Large Language Model architecture?',
                options: [
                  'A physical coin used for computer hardware',
                  'A fundamental chunk of text (approx. 4 characters or 0.75 words) that AI reads and calculates probabilities for',
                  'A secret password required to log into an AI app',
                  'An encrypted file stored on a USB drive',
                ],
                correctAnswer: 1,
                explanation: 'LLMs process text by breaking it down into numerical tokens, allowing mathematical attention mechanisms to calculate the most probable subsequent tokens.',
              },
              {
                id: 'ai-q2',
                question: 'How does the Socratic method of AI prompting differ from traditional copy-pasting?',
                options: [
                  'It asks the AI to generate longer essays',
                  'It instructs the AI to act as a guiding tutor, asking probing questions and giving hints rather than handing over direct answers',
                  'It disables the AI from responding',
                  'It makes the AI run faster',
                ],
                correctAnswer: 1,
                explanation: 'Socratic prompting engages the student in active cognitive retrieval and problem solving, which produces durable long-term memory formation.',
              },
              {
                id: 'ai-q3',
                question: 'Why does adding "Think step by step" (Chain-of-Thought) significantly improve AI accuracy on STEM calculations?',
                options: [
                  'It gives the model intermediate reasoning tokens to calculate each phase sequentially before committing to a final answer',
                  'It makes the internet connection stronger',
                  'It uses fewer computer memory resources',
                  'It turns the AI into a human',
                ],
                correctAnswer: 0,
                explanation: 'Chain-of-Thought forces the model to generate explicit intermediate calculation states, preventing arithmetic leaps and logical shortcuts.',
              },
              {
                id: 'ai-q4',
                question: 'What is an "AI Hallucination"?',
                options: [
                  'When the computer screen flickers',
                  'When an AI model generates grammatically fluent text that is factually false or cites non-existent sources',
                  'When the AI gets infected with malware',
                  'When an AI model deletes your files',
                ],
                correctAnswer: 1,
                explanation: 'Hallucinations occur because LLMs generate text based on statistical token prediction rather than a dedicated database of verified facts.',
              },
              {
                id: 'ai-q5',
                question: 'In the C.R.E.A.T.E. prompt framework, what does the letter "E" stand for?',
                options: [
                  'Entertainment & Electricity',
                  'Explicit Task & Exemplar (format template)',
                  'Email address of your teacher',
                  'Ending the conversation immediately',
                ],
                correctAnswer: 1,
                explanation: 'Explicit Task clearly articulates the goal, while Exemplars provide the model with a concrete structural blueprint to follow.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'course-smart-study',
    title: 'Smart Study',
    tagline: 'The Cognitive Neuroscience of High-Retention Learning & Academic Rank Mastery',
    description: 'Master the evidence-based study techniques proven by cognitive psychology: Hermann Ebbinghaus forgetting curve, Active Recall, the Leitner 5-Box spaced repetition system, the Feynman Technique, and focus neurobiology.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    duration: '1 hr 10 mins',
    level: 'All Academic Grades',
    isFree: true,
    rating: 4.97,
    studentsCount: 3950,
    instructor: 'StudyVerse Academic Excellence Team',
    modules: [
      {
        id: 'ss-mod-1',
        title: 'Module 1: The Neuroscience of Memory & The Forgetting Curve',
        lessons: [
          {
            id: 'ss-l1',
            title: '1.1 The Ebbinghaus Decay Curve & Synaptic Consolidation',
            duration: '12 mins',
            type: 'reading',
            content: `### The Science of Why We Forget

In 1885, German psychologist **Hermann Ebbinghaus** conducted groundbreaking experiments on human memory. He discovered the mathematical **Forgetting Curve**:

- **Within 20 Minutes**: You forget 42% of what you just studied.
- **Within 24 Hours**: You forget nearly 67% without active revision.
- **Within 6 Days**: Over 75% of unreviewed content is permanently lost!

#### Why Does the Brain Delete Information?
Your brain is an energy-conservation engine. If information is merely looked at passively (like reading a textbook or highlighting notes), your hippocampus tags it as temporary noise and discards it during sleep.

#### The Neurological Antidote: Synaptic Consolidation
When you **force your brain to retrieve** a fact without looking at notes, you activate physical chemical transmitters across synapses (LTP: *Long-Term Potentiation*). This signals the brain: *"This information is critical for survival — encode it permanently in the cerebral cortex!"*`,
          },
          {
            id: 'ss-l2',
            title: '1.2 The Illusion of Competence: Why Highlighting Fails',
            duration: '10 mins',
            type: 'reading',
            content: `### The Dangerous Trap of "Familiarity"

Most students spend 80% of their study time doing three things:
1. Re-reading chapters over and over.
2. Highlighting text with fluorescent markers.
3. Copying textbook summaries verbatim into pretty notebooks.

#### Cognitive Ease vs. Desirable Difficulty
- When you re-read a page, your eyes recognize the words. Your brain experiences **cognitive ease** and whispers: *"I know this!"*
- This is the **Illusion of Competence**. In the exam room, when the textbook is closed, the cues vanish, and your mind goes blank!
- Cognitive psychologist Robert Bjork proved that durable learning requires **"Desirable Difficulty"** — the harder your brain has to work to retrieve a concept, the stronger the long-term memory trace becomes.`,
          },
        ],
      },
      {
        id: 'ss-mod-2',
        title: 'Module 2: High-Yield Active Retrieval & The Blurting Method',
        lessons: [
          {
            id: 'ss-l3',
            title: '2.1 The 4-Step Blurting (Brain Dump) Protocol',
            duration: '14 mins',
            type: 'reading',
            content: `### The "Blurting" Technique for Exam Rankers

Blurting is one of the highest-yield active recall strategies ever validated by educational psychologists.

#### How to Execute Blurting:
1. **Intense Study Sprint (15–20 mins)**: Read a challenging topic (e.g., The Digestive System or Trigonometric Identities) with full focus.
2. **The Hard Close**: Close the book completely and slide it away.
3. **The Brain Dump**: Grab a blank sheet of paper and write down **everything you can remember** from memory — diagrams, formulas, keywords, definitions, and connections. Give yourself 5 minutes of total retrieval effort.
4. **The Audit**: Open your textbook with a red or green pen. Compare your dump against the real notes. Highlight exactly what you missed.

*Why it works*: The gap between what you wrote and what you missed is your exact knowledge blind spot. By directly fixing that gap, you achieve 100% exam readiness in a fraction of traditional study time!`,
          },
        ],
      },
      {
        id: 'ss-mod-3',
        title: 'Module 3: Spaced Repetition & The Leitner 5-Box System',
        lessons: [
          {
            id: 'ss-l4',
            title: '3.1 Algorithmic Spacing: The 1-3-7-14-30 Schedule',
            duration: '12 mins',
            type: 'reading',
            content: `### Resetting the Forgetting Curve

Spaced Repetition is the practice of reviewing information at **exponentially increasing intervals** right before your brain is about to forget it.

#### The Ideal Revision Cadence:
- **Session 0**: Initial Deep Learning
- **Review 1 (Day 1 - 24 hours later)**: 5-minute active recall test. (Resets retention to 100%).
- **Review 2 (Day 3 - 72 hours later)**: 3-minute flashcard quiz. (Decay rate flattens).
- **Review 3 (Day 7 - 1 week later)**: Practice exam problem.
- **Review 4 (Day 14 - 2 weeks later)**: Quick Feynman summary.
- **Review 5 (Day 30 - 1 month later)**: Permanent long-term consolidation!

#### The Physical Leitner 5-Box Strategy:
- **Box 1 (Daily)**: New or difficult cards you got wrong.
- **Box 2 (Every 3 Days)**: Cards answered correctly once.
- **Box 3 (Weekly)**: Solid concepts.
- **Box 4 (Bi-Weekly)**: Strong mastery.
- **Box 5 (Monthly)**: Permanent exam knowledge.
*Rule*: If you get a Box 4 card wrong, it immediately drops back to Box 1!`,
          },
        ],
      },
      {
        id: 'ss-mod-4',
        title: 'Module 4: The Richard Feynman 4-Step Mastery Framework',
        lessons: [
          {
            id: 'ss-l5',
            title: '4.1 Jargon-Free Explanation & Analogical Thinking',
            duration: '10 mins',
            type: 'reading',
            content: `### The Richard Feynman Technique

Nobel Laureate physicist Richard Feynman believed that complex academic jargon often masks a lack of true understanding.

#### The 4 Steps to Absolute Mastery:
1. **Choose a Target Concept**: Write the topic name at the top of a clean sheet of paper (*e.g., Electric Current & Voltage*).
2. **Teach It to a 10-Year-Old**: Explain the concept out loud or in writing using plain, conversational everyday language. Forbid yourself from using textbook buzzwords!
   - *Example*: Instead of *"Potential difference drives electromotive force across a resistive load"*, explain: *"Voltage is like water pressure in a garden hose, and resistance is stepping on the hose with your shoe!"*
3. **Identify Where You Hesitate**: When you find yourself stuck or tempted to copy a complex definition, stop! That exact hesitation is your conceptual void.
4. **Return to the Source & Simplify**: Go back to your textbook, master the mechanics, and create a fresh everyday analogy.`,
          },
        ],
      },
      {
        id: 'ss-mod-5',
        title: 'Module 5: Smart Study Certification Exam',
        lessons: [
          {
            id: 'ss-quiz-final',
            title: '5.1 Cognitive Learning Science Final Exam',
            duration: '15 mins',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'ss-q1',
                question: 'According to Hermann Ebbinghaus, approximately what percentage of newly studied content is forgotten within 24 hours without active retrieval?',
                options: [
                  '0% — human memory is permanent',
                  'Approximately 60% to 70%',
                  'Only 5%',
                  '100% of everything',
                ],
                correctAnswer: 1,
                explanation: 'The Ebbinghaus forgetting curve demonstrates that without active review, the brain rapidly prunes un-reinforced short-term memories.',
              },
              {
                id: 'ss-q2',
                question: 'Why does the "Illusion of Competence" deceive students during passive re-reading?',
                options: [
                  'Because the text looks familiar to the eyes, tricking the brain into believing it can recall the information without cues',
                  'Because reading burns too many calories',
                  'Because highlighters have toxic chemicals',
                  'Because books are too heavy',
                ],
                correctAnswer: 0,
                explanation: 'Familiarity creates cognitive ease, which students mistake for mastery. True mastery requires active retrieval without visual cues.',
              },
              {
                id: 'ss-q3',
                question: 'In the Leitner 5-Box spaced repetition system, what happens when you get a card wrong in Box 4?',
                options: [
                  'It stays in Box 4 forever',
                  'It is thrown in the trash',
                  'It drops all the way back to Box 1 for daily review',
                  'You receive an automatic zero on your school exam',
                ],
                correctAnswer: 2,
                explanation: 'The Leitner system penalizes forgotten items by returning them to Box 1 to re-strengthen the neural pathway through daily repetition.',
              },
              {
                id: 'ss-q4',
                question: 'What is the core diagnostic test of understanding in the Feynman Technique?',
                options: [
                  'Using as many complex Greek symbols as possible',
                  'Explaining the concept simply in plain, jargon-free language to someone with zero background',
                  'Studying for 14 hours with no sleep',
                  'Memorizing the glossary section of a textbook',
                ],
                correctAnswer: 1,
                explanation: 'If you cannot articulate a concept in simple language with intuitive analogies, you have only memorized terminology rather than grasped the core mechanics.',
              },
              {
                id: 'ss-q5',
                question: 'What is the "Blurting" method?',
                options: [
                  'Shouting answers during an official exam',
                  'Reading a topic with focus, closing the book, and writing everything you recall onto a blank sheet before auditing gaps',
                  'Listening to podcasts at 3x speed while gaming',
                  'Copying your classmate homework',
                ],
                correctAnswer: 1,
                explanation: 'Blurting forces total cognitive retrieval and provides instant visual feedback on knowledge gaps.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'course-coding-for-beginners',
    title: 'Coding for Beginners',
    tagline: 'Computational Thinking, Algorithmic Problem Solving & Programming Architecture',
    description: 'A structured foundational course in computer science. Learn the 4 pillars of computational thinking, variables, memory addresses, data types, boolean logic truth tables, iterative loops, modular functions, and systematic debugging.',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
    duration: '1 hr 20 mins',
    level: 'Beginner to Intermediate',
    isFree: true,
    rating: 4.94,
    studentsCount: 2150,
    instructor: '7xstudios (Co-Founder, StudyVerse)',
    modules: [
      {
        id: 'cb-mod-1',
        title: 'Module 1: Computational Thinking & Algorithmic Design',
        lessons: [
          {
            id: 'cb-l1',
            title: '1.1 The 4 Pillars of Computational Thinking',
            duration: '12 mins',
            type: 'reading',
            content: `### How Computer Scientists Solve Real-World Problems

Programming isn't just about memorizing syntax in Python or JavaScript — it is about **Computational Thinking**. Every software system in the world relies on 4 fundamental pillars:

#### 1. Decomposition
Breaking a massive, overwhelming problem into tiny, manageable micro-tasks.
- *Real-life Example*: To build an online school grading app, decompose it into: User Login, Grade Calculation, Database Storage, Report Card PDF Generation.

#### 2. Pattern Recognition
Identifying similarities and trends across different problems.
- *Example*: Recognizing that calculating a student's GPA uses the exact same weighted-average logic as calculating a cricket player's batting strike rate!

#### 3. Abstraction
Filtering out unnecessary details to focus purely on what matters.
- *Example*: A GPS map app does not need to show the color of every tree or house; it abstracts the world into nodes (destinations) and edges (roads).

#### 4. Algorithmic Design
Crafting a step-by-step, unambiguous sequence of instructions that will always produce the correct result given a set of inputs.`,
          },
          {
            id: 'cb-l2',
            title: '1.2 Pseudocode & Flowchart Logic',
            duration: '10 mins',
            type: 'reading',
            content: `### Planning Before Coding

Professional software engineers write **Pseudocode** (plain English algorithmic outlines) before writing actual code.

#### Standard Flowchart Logic Symbols:
- **Ovals (Terminators)**: START and END points.
- **Rectangles (Processes)**: Arithmetic operations (*e.g., $total = price + tax$*).
- **Parallelograms (I/O)**: Receiving input from a user or printing output to screen.
- **Diamonds (Decisions)**: Questions that branch into YES (True) or NO (False).

#### Example Pseudocode: Student Pass/Fail Validator
\`\`\`text
START
  INPUT score
  IF score >= 50 THEN
    PRINT "Congratulations! You have passed."
  ELSE
    PRINT "Needs improvement. Review revision material."
  ENDIF
END
\`\`\``,
          },
        ],
      },
      {
        id: 'cb-mod-2',
        title: 'Module 2: Variables, Data Types & Boolean Logic',
        lessons: [
          {
            id: 'cb-l3',
            title: '2.1 Memory Slots, Variables & Data Types',
            duration: '14 mins',
            type: 'reading',
            content: `### How Computers Store Information in RAM

A **Variable** is a labeled box in computer memory (RAM) where a program stores a value that can change during execution.

#### Core Fundamental Data Types:
1. **Integer (\`int\`)**: Whole numbers without decimals (*e.g., \`studentCount = 42\`*).
2. **Floating-Point (\`float\`)**: Numbers with decimal precision (*e.g., \`gpa = 3.85\`*).
3. **String (\`str\`)**: Sequences of alphanumeric text enclosed in quotes (*e.g., \`schoolName = "StudyVerse Academy"\`*).
4. **Boolean (\`bool\`)**: Binary truth values — strictly either \`True\` (1) or \`False\` (0).
5. **Array / List (\`list\`)**: An ordered collection of values indexed starting at 0 (*e.g., \`scores = [85, 92, 78, 96]\`*).

#### The Assignment Operator (\`=\` vs \`==\`):
- Single equals \`=\` assigns a value to a variable: \`x = 10\`.
- Double equals \`==\` compares two values for equality: \`x == 10\` (evaluates to \`True\` or \`False\`).`,
          },
          {
            id: 'cb-l4',
            title: '2.2 Conditionals & Truth Tables (AND, OR, NOT)',
            duration: '12 mins',
            type: 'reading',
            content: `### Logic Gates and Branching

Conditionals allow a program to make intelligent decisions based on environmental conditions.

#### Boolean Operators:
- **AND (\`&&\`)**: True ONLY if **both** conditions are True.
  - \`isEnrolled == True AND feePaid == True\` → Access Granted.
- **OR (\`||\`)**: True if **at least one** condition is True.
  - \`isScholarshipWinner == True OR score > 95\` → Discount Awarded.
- **NOT (\`!\`)**: Inverts the truth value.
  - \`NOT False\` → True.

#### Nested Branching Structure:
\`\`\`text
IF score >= 90 THEN
  grade = "A+"
ELSE IF score >= 80 THEN
  grade = "A"
ELSE IF score >= 70 THEN
  grade = "B"
ELSE
  grade = "F"
ENDIF
\`\`\``,
          },
        ],
      },
      {
        id: 'cb-mod-3',
        title: 'Module 3: Control Flow, Loops & Modular Functions',
        lessons: [
          {
            id: 'cb-l5',
            title: '3.1 Iteration: For Loops vs While Loops',
            duration: '12 mins',
            type: 'reading',
            content: `### Automating Repetitive Work

Computers excel at repeating operations millions of times without fatigue. We control repetition using **Loops**.

#### 1. The \`For\` Loop (Definite Iteration):
Used when you know in advance how many times you need to repeat a block of code.
\`\`\`text
FOR each day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]:
  PRINT "Study 45 minutes of Math on " + day
ENDFOR
\`\`\`

#### 2. The \`While\` Loop (Indefinite Iteration):
Repeats continuously as long as a specific condition remains True.
\`\`\`text
studyTimerMinutes = 25
WHILE studyTimerMinutes > 0:
  studyTimerMinutes = studyTimerMinutes - 1
  PRINT "Focus in progress..."
ENDWHILE
PRINT "Pomodoro completed! Take a 5-minute break."
\`\`\`
*Warning*: Always ensure the variable inside the \`while\` loop changes towards terminating the condition, or you will create an **Infinite Loop** that freezes the computer!`,
          },
          {
            id: 'cb-l6',
            title: '3.2 Functions & The DRY Principle',
            duration: '12 mins',
            type: 'reading',
            content: `### Modular Code Architecture

In professional software development, you must follow the **DRY Principle**: *Don't Repeat Yourself*.

#### What is a Function?
A Function is a reusable mini-program that takes **Inputs (Parameters)**, executes specific logic, and gives back an **Output (Return Value)**.

\`\`\`text
FUNCTION calculatePercentage(obtainedMarks, totalMarks):
  percentage = (obtainedMarks / totalMarks) * 100
  RETURN percentage
ENDFUNCTION

// Calling the function across different subjects:
mathScore = calculatePercentage(95, 100)  // returns 95.0
physicsScore = calculatePercentage(42, 50) // returns 84.0
\`\`\`

Functions make code clean, readable, reusable, and easy to test!`,
          },
        ],
      },
      {
        id: 'cb-mod-4',
        title: 'Module 4: Systematic Debugging & Software Mindset',
        lessons: [
          {
            id: 'cb-l7',
            title: '4.1 The 3 Types of Software Bugs & Rubber Duck Debugging',
            duration: '10 mins',
            type: 'reading',
            content: `### Becoming a Master Problem Solver

Bugs are a normal, natural part of programming. Learning to debug systematically is what separates beginners from senior engineers.

#### The 3 Classes of Bugs:
1. **Syntax Errors**: Breaking the grammatical rules of the programming language (*e.g., missing closing parenthesis or misspelling a keyword*). The computer refuses to run the program.
2. **Runtime Errors**: Crashes that occur while the program is running (*e.g., dividing a number by zero or trying to access the 10th item in a 3-item list*).
3. **Logic Bugs**: The program runs smoothly without errors, but produces the **wrong answer** (*e.g., adding taxes twice or using \`>\` instead of \`<\`*).

#### The Famous "Rubber Duck Debugging" Technique:
When code isn't working, explain your code line-by-line out loud to a rubber duck (or a toy/pen on your desk). In 90% of cases, articulating the logic out loud forces your brain to spot the flawed assumption instantly!`,
          },
        ],
      },
      {
        id: 'cb-mod-5',
        title: 'Module 5: Coding for Beginners Certification Exam',
        lessons: [
          {
            id: 'cb-quiz-final',
            title: '5.1 Computational Thinking & Coding Certification Exam',
            duration: '15 mins',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'cb-q1',
                question: 'Which of the 4 pillars of computational thinking involves breaking a massive complex problem into smaller, bite-sized tasks?',
                options: [
                  'Decomposition',
                  'Abstraction',
                  'Pattern Recognition',
                  'Compilation',
                ],
                correctAnswer: 0,
                explanation: 'Decomposition is the process of breaking down a complex system or problem into smaller, more manageable sub-components.',
              },
              {
                id: 'cb-q2',
                question: 'What is the primary difference between the assignment operator (=) and the comparison operator (==)?',
                options: [
                  'There is no difference',
                  '(=) stores/assigns a value into a variable, whereas (==) evaluates whether two values are equal and returns a Boolean',
                  '(==) deletes the computer memory',
                  '(=) is only used in physics formulas',
                ],
                correctAnswer: 1,
                explanation: 'Assignment (=) stores a value in memory, while equality comparison (==) checks for equality and yields True or False.',
              },
              {
                id: 'cb-q3',
                question: 'If condition A is True and condition B is False, what does (A AND B) evaluate to in Boolean logic?',
                options: [
                  'True',
                  'False',
                  'Null',
                  'Undefined',
                ],
                correctAnswer: 1,
                explanation: 'The logical AND operator requires ALL operand conditions to be True. If even one condition is False, the entire AND expression evaluates to False.',
              },
              {
                id: 'cb-q4',
                question: 'What type of software error allows a program to run without crashing, but generates incorrect calculation results?',
                options: [
                  'Syntax Error',
                  'Hardware Failure',
                  'Logic Bug',
                  'Operating System Freeze',
                ],
                correctAnswer: 2,
                explanation: 'Logic errors occur when the algorithm itself has flawed reasoning, causing the program to run smoothly but produce incorrect outputs.',
              },
              {
                id: 'cb-q5',
                question: 'What does the DRY software engineering principle stand for?',
                options: [
                  'Do Read Yesterday',
                  'Don\'t Repeat Yourself (keep code modular with reusable functions)',
                  'Digital Remote Yield',
                  'Delete Random Years',
                ],
                correctAnswer: 1,
                explanation: 'DRY (Don\'t Repeat Yourself) encourages programmers to encapsulate repetitive logic into reusable functions and modules.',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const DEMO_SAMPLE_TASKS = [
  {
    id: 'demo-task-1',
    userId: 'demo-user',
    name: 'Complete Chapter 4 Exercise 4.2 Problems 1 to 10',
    subject: 'Mathematics',
    taskType: 'HOMEWORK' as const,
    priority: 'High' as const,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    completed: false,
    description: 'Quadratic equations and factorization methods on notebook.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-task-2',
    userId: 'demo-user',
    name: 'Light Refraction Ray Diagrams & Numerical Notes',
    subject: 'Physics',
    taskType: 'CLASSWORK' as const,
    priority: 'Medium' as const,
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // 2 days
    completed: false,
    description: 'Copy convex lens focus derivation from blackboard.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-task-3',
    userId: 'demo-user',
    name: 'Ecosystem & Biodiversity Science Fair Model & Record',
    subject: 'Biology',
    taskType: 'PROJECT' as const,
    priority: 'High' as const,
    dueDate: new Date(Date.now() + 432000000).toISOString().split('T')[0], // 5 days
    completed: false,
    description: 'Prepare thermocol food chain model and 10-page project report.',
    progress: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-task-4',
    userId: 'demo-user',
    name: 'Telugu Sandhulu & Samasalu Grammar Practice',
    subject: 'Telugu',
    taskType: 'HOMEWORK' as const,
    priority: 'Low' as const,
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    completed: true,
    completedAt: new Date().toISOString(),
    description: 'Exercise 3.1 completed on textbook workbook.',
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_TIMETABLE: TimetableSlot[] = [
  { id: 't1', userId: 'default', day: 'Monday', period: 1, timeRange: '09:00 - 09:45 AM', subject: 'Mathematics', teacher: 'Mr. Ramesh', room: 'Room 101' },
  { id: 't2', userId: 'default', day: 'Monday', period: 2, timeRange: '09:45 - 10:30 AM', subject: 'Physics', teacher: 'Mrs. Sunita', room: 'Physics Lab' },
  { id: 't3', userId: 'default', day: 'Monday', period: 3, timeRange: '10:45 - 11:30 AM', subject: 'English', teacher: 'Ms. Anita', room: 'Room 101' },
  { id: 't4', userId: 'default', day: 'Monday', period: 4, timeRange: '11:30 - 12:15 PM', subject: 'Social', teacher: 'Mr. Sharma', room: 'Room 102' },
  { id: 't5', userId: 'default', day: 'Monday', period: 5, timeRange: '01:00 - 01:45 PM', subject: 'Chemistry', teacher: 'Dr. Prasad', room: 'Chem Lab' },
  { id: 't6', userId: 'default', day: 'Monday', period: 6, timeRange: '01:45 - 02:30 PM', subject: 'Telugu', teacher: 'Mr. Satyanarayana', room: 'Room 101' },
  
  { id: 't7', userId: 'default', day: 'Tuesday', period: 1, timeRange: '09:00 - 09:45 AM', subject: 'Biology', teacher: 'Mrs. Lakshmi', room: 'Bio Lab' },
  { id: 't8', userId: 'default', day: 'Tuesday', period: 2, timeRange: '09:45 - 10:30 AM', subject: 'Mathematics', teacher: 'Mr. Ramesh', room: 'Room 101' },
  { id: 't9', userId: 'default', day: 'Tuesday', period: 3, timeRange: '10:45 - 11:30 AM', subject: 'Hindi', teacher: 'Mrs. Geeta', room: 'Room 101' },
  { id: 't10', userId: 'default', day: 'Tuesday', period: 4, timeRange: '11:30 - 12:15 PM', subject: 'Physics', teacher: 'Mrs. Sunita', room: 'Room 101' },
  { id: 't11', userId: 'default', day: 'Tuesday', period: 5, timeRange: '01:00 - 01:45 PM', subject: 'Social', teacher: 'Mr. Sharma', room: 'Room 102' },
  { id: 't12', userId: 'default', day: 'Tuesday', period: 6, timeRange: '01:45 - 02:30 PM', subject: 'English', teacher: 'Ms. Anita', room: 'Room 101' },

  { id: 't13', userId: 'default', day: 'Wednesday', period: 1, timeRange: '09:00 - 09:45 AM', subject: 'Chemistry', teacher: 'Dr. Prasad', room: 'Room 101' },
  { id: 't14', userId: 'default', day: 'Wednesday', period: 2, timeRange: '09:45 - 10:30 AM', subject: 'Mathematics', teacher: 'Mr. Ramesh', room: 'Room 101' },
  { id: 't15', userId: 'default', day: 'Wednesday', period: 3, timeRange: '10:45 - 11:30 AM', subject: 'Botany', teacher: 'Dr. Rao', room: 'Bio Lab' },
  { id: 't16', userId: 'default', day: 'Wednesday', period: 4, timeRange: '11:30 - 12:15 PM', subject: 'English', teacher: 'Ms. Anita', room: 'Room 101' },
  { id: 't17', userId: 'default', day: 'Wednesday', period: 5, timeRange: '01:00 - 01:45 PM', subject: 'Telugu', teacher: 'Mr. Satyanarayana', room: 'Room 101' },
  { id: 't18', userId: 'default', day: 'Wednesday', period: 6, timeRange: '01:45 - 02:30 PM', subject: 'Social', teacher: 'Mr. Sharma', room: 'Room 102' },

  { id: 't19', userId: 'default', day: 'Thursday', period: 1, timeRange: '09:00 - 09:45 AM', subject: 'Physics', teacher: 'Mrs. Sunita', room: 'Physics Lab' },
  { id: 't20', userId: 'default', day: 'Thursday', period: 2, timeRange: '09:45 - 10:30 AM', subject: 'Mathematics', teacher: 'Mr. Ramesh', room: 'Room 101' },
  { id: 't21', userId: 'default', day: 'Thursday', period: 3, timeRange: '10:45 - 11:30 AM', subject: 'Zoology', teacher: 'Dr. Rao', room: 'Bio Lab' },
  { id: 't22', userId: 'default', day: 'Thursday', period: 4, timeRange: '11:30 - 12:15 PM', subject: 'Hindi', teacher: 'Mrs. Geeta', room: 'Room 101' },
  { id: 't23', userId: 'default', day: 'Thursday', period: 5, timeRange: '01:00 - 01:45 PM', subject: 'English', teacher: 'Ms. Anita', room: 'Room 101' },
  { id: 't24', userId: 'default', day: 'Thursday', period: 6, timeRange: '01:45 - 02:30 PM', subject: 'Social', teacher: 'Mr. Sharma', room: 'Room 102' },

  { id: 't25', userId: 'default', day: 'Friday', period: 1, timeRange: '09:00 - 09:45 AM', subject: 'Mathematics', teacher: 'Mr. Ramesh', room: 'Room 101' },
  { id: 't26', userId: 'default', day: 'Friday', period: 2, timeRange: '09:45 - 10:30 AM', subject: 'Chemistry', teacher: 'Dr. Prasad', room: 'Chem Lab' },
  { id: 't27', userId: 'default', day: 'Friday', period: 3, timeRange: '10:45 - 11:30 AM', subject: 'Biology', teacher: 'Mrs. Lakshmi', room: 'Room 101' },
  { id: 't28', userId: 'default', day: 'Friday', period: 4, timeRange: '11:30 - 12:15 PM', subject: 'Telugu', teacher: 'Mr. Satyanarayana', room: 'Room 101' },
  { id: 't29', userId: 'default', day: 'Friday', period: 5, timeRange: '01:00 - 01:45 PM', subject: 'Physics', teacher: 'Mrs. Sunita', room: 'Room 101' },
  { id: 't30', userId: 'default', day: 'Friday', period: 6, timeRange: '01:45 - 02:30 PM', subject: 'Social', teacher: 'Mr. Sharma', room: 'Room 102' },

  { id: 't31', userId: 'default', day: 'Saturday', period: 1, timeRange: '09:00 - 09:45 AM', subject: 'Sanskrit', teacher: 'Pandit Shastri', room: 'Room 101' },
  { id: 't32', userId: 'default', day: 'Saturday', period: 2, timeRange: '09:45 - 10:30 AM', subject: 'Mathematics', teacher: 'Mr. Ramesh', room: 'Room 101' },
  { id: 't33', userId: 'default', day: 'Saturday', period: 3, timeRange: '10:45 - 11:30 AM', subject: 'English', teacher: 'Ms. Anita', room: 'Room 101' },
  { id: 't34', userId: 'default', day: 'Saturday', period: 4, timeRange: '11:30 - 12:15 PM', subject: 'Social', teacher: 'Mr. Sharma', room: 'Room 102' },
];
