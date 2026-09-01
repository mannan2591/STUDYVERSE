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
    tagline: 'Study Smarter with Generative AI & Prompt Engineering',
    description: 'Master Artificial Intelligence tools designed specifically for modern students. Learn how to craft high-yield study prompts, explain complex syllabus topics, draft outlines, and study ethically.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    duration: '45 mins',
    level: 'Beginner to Advanced',
    isFree: true,
    rating: 4.95,
    studentsCount: 1420,
    instructor: 'Raghuveer (Founder, StudyVerse)',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: The AI Revolution in Education',
        lessons: [
          {
            id: 'l-1',
            title: '1.1 What is AI and How Can It Help You Learn?',
            duration: '8 mins',
            type: 'reading',
            content: `### Welcome to AI Essentials!

Artificial Intelligence (AI) isn't here to do your homework for you — it's here to be the world's most patient personal study partner!

#### How to use AI ethically:
1. **Explain Like I am 10**: If a textbook definition of photosynthesis or quadratic equations is confusing, ask AI to explain it with simple real-life analogies.
2. **Generate Practice Quizzes**: Ask AI to quiz you on 5 tricky questions from History or Physics before exams.
3. **Draft Outlines**: Use AI to brainstorm essay ideas and structure your science project step by step.

#### What NOT to do:
- Never copy-paste AI answers blindly without understanding them.
- Always double check dates and mathematical calculations.`,
          },
          {
            id: 'l-2',
            title: '1.2 Crafting Perfect Study Prompts',
            duration: '10 mins',
            type: 'reading',
            content: `### The Golden Formula of Study Prompts

Great answers start with great questions. Follow the **ROLE + TOPIC + FORMAT** structure:

1. **Role**: "Act as an experienced high school physics teacher..."
2. **Topic**: "...explain Newton's Third Law with everyday skateboard and rocket examples..."
3. **Format**: "...in 3 bullet points with a 1-question check for understanding."

Try experimenting with breaking complex multi-chapter syllabus notes into bite-sized summaries!`,
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: Knowledge Assessment & Certificate Quiz',
        lessons: [
          {
            id: 'l-quiz-1',
            title: '2.1 Final Comprehension Quiz',
            duration: '10 mins',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'q1',
                question: 'What is the most effective way for a student to use AI while studying?',
                options: [
                  'Copying essays word-for-word without reading',
                  'Asking AI to explain complex concepts with simple analogies and practice quizzes',
                  'Using AI to skip doing all school tasks',
                  'Never checking if the information is accurate',
                ],
                correctAnswer: 1,
                explanation: 'Using AI as a tutor to explain ideas and generate self-test quizzes promotes deep learning.',
              },
              {
                id: 'q2',
                question: 'Which prompt structure yields the highest quality study assistance?',
                options: [
                  'Just typing one random word',
                  'Role + Topic + Format instructions',
                  'Asking AI to do your entire exam',
                  'Leaving the question completely blank',
                ],
                correctAnswer: 1,
                explanation: 'Specifying the Role, Topic, and Format gives the AI clear context to tailor the explanation.',
              },
              {
                id: 'q3',
                question: 'Why should you always review and verify information provided by AI?',
                options: [
                  'AI can occasionally make mistakes or hallucinate facts',
                  'Because your teachers want you to understand the material yourself',
                  'To build critical thinking skills',
                  'All of the above',
                ],
                correctAnswer: 3,
                explanation: 'All of these reasons are essential for responsible, high-performing academic study.',
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
    tagline: 'Science of Active Recall & Spaced Repetition',
    description: 'Discover how top rankers study less and score higher using active recall, the Feynman technique, spaced revision schedules, and the Pomodoro method.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    duration: '35 mins',
    level: 'All Grades',
    isFree: true,
    rating: 4.95,
    studentsCount: 2180,
    instructor: 'StudyVerse Academic Excellence Team',
    modules: [
      {
        id: 'ss-mod-1',
        title: 'Module 1: The Secrets of High-Retention Learning',
        lessons: [
          {
            id: 'ss-l1',
            title: '1.1 The Illusion of Competence vs Active Recall',
            duration: '12 mins',
            type: 'reading',
            content: `### Why Highlighting and Passive Reading Fails

When you highlight notes or re-read chapters, your brain feels familiar with the text. This is called the **"Illusion of Competence"**. In the exam hall, when the book is closed, the memory disappears!

#### The Active Recall Solution:
- Close the book after reading a paragraph.
- Write down everything you remember on a blank scratchpad.
- Check what you missed.
- This creates stronger neural pathways and guarantees permanent memory retention!`,
          },
          {
            id: 'ss-l2',
            title: '1.2 The Feynman Technique',
            duration: '10 mins',
            type: 'reading',
            content: `### Teach It to a 10-Year-Old

Nobel physicist Richard Feynman discovered that if you cannot explain a concept in simple, jargon-free language, you don't truly understand it yet.

1. Choose a target concept (e.g. Electricity, Cell Division).
2. Teach it out loud or write it on paper without technical jargon.
3. Identify where you get stuck.
4. Return to your textbook to clarify that specific gap!`,
          },
        ],
      },
      {
        id: 'ss-mod-2',
        title: 'Module 2: Mastery Certification Quiz',
        lessons: [
          {
            id: 'ss-quiz-1',
            title: '2.1 Smart Study Certification Quiz',
            duration: '8 mins',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'ss-q1',
                question: 'What is "Active Recall"?',
                options: [
                  'Highlighting textbooks with 5 different colored markers',
                  'Testing your brain by retrieving knowledge from memory without looking at notes',
                  'Listening to music while sleeping',
                  'Reading the same paragraph 10 times in a row',
                ],
                correctAnswer: 1,
                explanation: 'Active recall forces the brain to retrieve information, strengthening synaptic connections.',
              },
              {
                id: 'ss-q2',
                question: 'According to the Feynman Technique, how do you verify true understanding?',
                options: [
                  'By memorizing word-for-word textbook definitions',
                  'By being able to explain the concept simply in plain language',
                  'By buying more stationery',
                  'By studying only the night before exams',
                ],
                correctAnswer: 1,
                explanation: 'Explaining concepts in plain language reveals whether you grasp the underlying principles.',
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
    tagline: 'Computational Thinking for Young Minds',
    description: 'A fun, friendly introduction to computer science logic for students. Learn how computers think, how algorithms solve problems, and build your confidence in technology.',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
    duration: '40 mins',
    level: 'Beginner',
    isFree: true,
    rating: 4.88,
    studentsCount: 950,
    instructor: '7xStudios (Co-Founder, StudyVerse)',
    modules: [
      {
        id: 'cb-mod-1',
        title: 'Module 1: How Computers Think',
        lessons: [
          {
            id: 'cb-l1',
            title: '1.1 Algorithms: Recipes for Computers',
            duration: '10 mins',
            type: 'reading',
            content: `### What is an Algorithm?

An algorithm is simply a step-by-step list of instructions to complete a task.

Think of baking a cake or making a cup of tea:
1. Boil water.
2. Put tea bag in cup.
3. Pour water into cup.
4. Add milk and sugar.
5. Stir and enjoy!

If you swap step 1 and 3, it won't work! Computers follow exact sequential orders just like this.`,
          },
          {
            id: 'cb-l2',
            title: '1.2 Variables and Loops',
            duration: '12 mins',
            type: 'reading',
            content: `### Variables are Named Boxes
A **variable** is like a labeled pencil box. You can label a box \`score\` and put the number \`10\` inside. When you finish a task, you change it to \`20\`!

### Loops are Repetition Helpers
Instead of saying: "Walk 1 step, Walk 1 step, Walk 1 step, Walk 1 step..."
You simply write: **"Repeat 4 times: Walk 1 step"**!`,
          },
        ],
      },
      {
        id: 'cb-mod-2',
        title: 'Module 2: Code Thinker Quiz',
        lessons: [
          {
            id: 'cb-quiz-1',
            title: '2.1 Computational Logic Assessment',
            duration: '8 mins',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'cb-q1',
                question: 'What is a computer algorithm?',
                options: [
                  'A physical computer monitor',
                  'A step-by-step set of instructions to solve a problem',
                  'A computer virus',
                  'A gaming console',
                ],
                correctAnswer: 1,
                explanation: 'An algorithm is an unambiguous sequence of steps designed to perform a specific task.',
              },
              {
                id: 'cb-q2',
                question: 'In programming, what is a variable best compared to?',
                options: [
                  'A labeled storage container holding a value',
                  'A power cable',
                  'A computer mouse',
                  'A paper book',
                ],
                correctAnswer: 0,
                explanation: 'Variables store information like numbers, text, or flags that can be referenced and modified.',
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
