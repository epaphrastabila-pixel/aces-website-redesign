export type Resource = {
  id: string
  name: string
  type: 'slide' | 'note' | 'past-question' | 'assignment' | 'lab-manual' | 'video'
  format: 'pdf' | 'pptx' | 'docx' | 'mp4' | 'zip'
  fileSize: string
  uploadDate: string
  url?: string
}

export type Course = {
  code: string
  title: string
  year: number
  semester: string
  credits: number
  lecturer: string
  description: string
  resources: Resource[]
}

function r(
  id: string,
  name: string,
  type: Resource['type'],
  format: Resource['format'],
  fileSize: string,
  uploadDate: string,
  url?: string,
): Resource {
  return url
    ? { id, name, type, format, fileSize, uploadDate, url }
    : { id, name, type, format, fileSize, uploadDate }
}

const sem1: Resource[] = [
  r('s1', 'Lecture Slides — Week 1–6', 'slide', 'pptx', '4.2 MB', 'Sep 12, 2025'),
  r('s2', 'Lecture Slides — Week 7–13', 'slide', 'pptx', '5.8 MB', 'Nov 05, 2025'),
  r('n1', 'Complete Lecture Notes', 'note', 'pdf', '2.1 MB', 'Sep 15, 2025'),
  r('pq1', 'Mid-Semester Questions', 'past-question', 'pdf', '1.3 MB', 'Oct 20, 2025'),
  r('pq2', 'End-of-Semester Questions', 'past-question', 'pdf', '1.5 MB', 'Dec 10, 2025'),
]

const sem2: Resource[] = [
  r('s3', 'Lecture Slides — All Weeks', 'slide', 'pptx', '6.4 MB', 'Feb 10, 2026'),
  r('n2', 'Lecture Notes Compilation', 'note', 'pdf', '3.2 MB', 'Feb 14, 2026'),
  r('pq3', 'End-of-Semester Questions', 'past-question', 'pdf', '1.8 MB', 'May 05, 2026'),
  r('a1', 'Take-home Assignment', 'assignment', 'pdf', '0.9 MB', 'Mar 22, 2026'),
]

export const courses: Course[] = [
  // ═══ Year 1 — Semester 1 ═══
  {
    code: 'CE 155', title: 'Environmental Studies', year: 1, semester: 'Sem 1', credits: 2, lecturer: '', description: '',
    resources: [
      r('ce155-1', 'CE 155_ Unit 1', 'slide', 'pdf', '2.8 MB', 'Jul 31, 2026', '/Courses/Environmental Studies/CE 155_ Unit 1.pdf'),
      r('ce155-2', 'CE 155_ Unit 2', 'slide', 'pdf', '3.2 MB', 'Jul 31, 2026', '/Courses/Environmental Studies/CE 155_ Unit 2 [Autosaved].pdf'),
      r('ce155-3', 'CE155_ Unit 3', 'slide', 'pdf', '2.5 MB', 'Jul 31, 2026', '/Courses/Environmental Studies/CE155_ Unit 3 [Autosaved].pdf'),
    ],
  },
  {
    code: 'COE 153', title: 'Engineering Technology', year: 1, semester: 'Sem 1', credits: 2, lecturer: '', description: '',
    resources: [
      r('coe153-1', 'Lecture Slides', 'slide', 'pptx', '7.4 MB', 'Jul 31, 2026', '/Courses/Engineering Technology/ac7a0d76123ef416356c74dd9c793725.pptx'),
      r('coe153-2', 'HTML AND CSS', 'slide', 'pptx', '486 KB', 'Jul 31, 2026', '/Courses/Engineering Technology/HTML AND CSS.pptx'),
      r('coe153-3', 'LAB. Presentation1 Bismark', 'slide', 'pptx', '9.6 MB', 'Jul 31, 2026', '/Courses/Engineering Technology/LAB. Presentation1 Bismark.pptx'),
      r('coe153-4', 'CE 155_ Unit 4', 'slide', 'pdf', '441 KB', 'Jul 31, 2026', '/Courses/Engineering Technology/CE 155_ Unit 4.pdf'),
      r('coe153-5', 'ACTIVITY 6', 'assignment', 'pdf', '69 KB', 'Jul 31, 2026', '/Courses/Engineering Technology/ACTIVITY 6.pdf'),
      r('coe153-6', 'ACTIVITY 7', 'assignment', 'pdf', '84 KB', 'Jul 31, 2026', '/Courses/Engineering Technology/ACTIVITY 7 pdf.pdf'),
      r('coe153-7', 'ACTIVITY 9', 'assignment', 'pdf', '134 KB', 'Jul 31, 2026', '/Courses/Engineering Technology/ACTIVITY 9.pdf'),
      r('coe153-8', 'Getting Started in KiCad 7', 'lab-manual', 'pdf', '2.2 MB', 'Jul 31, 2026', '/Courses/Engineering Technology/getting_started_in_kicad_7.pdf'),
    ],
  },
  {
    code: 'COE 181', title: 'Applied Electricity', year: 1, semester: 'Sem 1', credits: 3, lecturer: '', description: '',
    resources: [
      r('coe181-1', 'Unit 1', 'slide', 'pptx', '4.4 MB', 'Jul 31, 2026', '/Courses/Applied Electicity/Unit1-EE151.pptx'),
      r('coe181-2', 'Unit 2', 'slide', 'pptx', '1.7 MB', 'Jul 31, 2026', '/Courses/Applied Electicity/Unit2-EE151.pptx'),
      r('coe181-3', 'Unit 3', 'slide', 'pptx', '672 KB', 'Jul 31, 2026', '/Courses/Applied Electicity/Unit3-EE151.pptx'),
      r('coe181-4', 'Unit 4', 'slide', 'pptx', '335 KB', 'Jul 31, 2026', '/Courses/Applied Electicity/Unit4-EE151.pptx'),
    ],
  },
  {
    code: 'ENGL 157', title: 'Communication Skills I', year: 1, semester: 'Sem 1', credits: 2, lecturer: '', description: '',
    resources: [
      r('engl157-1', 'final PUNCTUATION IN ENGLISH LECTURE SLIDES', 'slide', 'pptx', '415 KB', 'Jul 31, 2026', '/Courses/Communication Skills 1/final PUNCTUATION IN ENGLISH LECTURE SLIDES.pptx'),
      r('engl157-2', 'finalCONCORD IN ENGLISH LECTURE SLIDES-1', 'slide', 'pptx', '449 KB', 'Jul 31, 2026', '/Courses/Communication Skills 1/finalCONCORD IN ENGLISH LECTURE SLIDES-1.pptx'),
      r('engl157-3', 'Afreh 2006', 'note', 'pdf', '96 MB', 'Jul 31, 2026', '/Courses/Communication Skills 1/Afreh 2006.pdf'),
    ],
  },
  {
    code: 'MATH 151', title: 'Algebra', year: 1, semester: 'Sem 1', credits: 4, lecturer: '', description: '',
    resources: [
      r('math151-1', 'Algebra Slide-2', 'slide', 'pdf', '440 KB', 'Jul 31, 2026', '/Courses/Algebra/Algebra Slide-2.pdf'),
      r('math151-2', 'Algebra Slide-5', 'slide', 'pdf', '564 KB', 'Jul 31, 2026', '/Courses/Algebra/Algebra Slide-5.pdf'),
      r('math151-3', 'MATH_151', 'note', 'pdf', '1.1 MB', 'Jul 31, 2026', '/Courses/Algebra/MATH_151.pdf'),
      r('math151-4', 'MATH-161', 'note', 'pdf', '655 KB', 'Jul 31, 2026', '/Courses/Algebra/MATH-161.pdf'),
      r('math151-5', 'keep204', 'note', 'pdf', '161 KB', 'Jul 31, 2026', '/Courses/Algebra/keep204.pdf'),
    ],
  },
  { code: 'ME 159', title: 'Technical Drawing', year: 1, semester: 'Sem 1', credits: 2, lecturer: '', description: '', resources: [] },
  {
    code: 'ME 161', title: 'Basic Mechanics', year: 1, semester: 'Sem 1', credits: 3, lecturer: '', description: '',
    resources: [
      r('me161-1', 'ME 161', 'note', 'pdf', '5.6 MB', 'Jul 31, 2026', '/Courses/Basic Mechanic/ME 161.pdf'),
    ],
  },
  { code: 'COE 152', title: 'Basic Electronics', year: 1, semester: 'Sem 2', credits: 3, lecturer: '', description: '', resources: [] },
  { code: 'COE 158', title: 'Introduction to Information Technology', year: 1, semester: 'Sem 2', credits: 2, lecturer: '', description: '', resources: [] },
  { code: 'EE 156', title: 'Electrical Eng. Drawing', year: 1, semester: 'Sem 2', credits: 2, lecturer: '', description: '', resources: [] },
  { code: 'EE 172', title: 'Electrical Machines', year: 1, semester: 'Sem 2', credits: 3, lecturer: '', description: '', resources: [] },
  { code: 'ENGL 158', title: 'Communication Skills II', year: 1, semester: 'Sem 2', credits: 2, lecturer: '', description: '', resources: [] },
  { code: 'MATH 152', title: 'Calculus with Analysis', year: 1, semester: 'Sem 2', credits: 4, lecturer: '', description: '', resources: [] },

  // ═══ Year 2 ═══
  {
    code: 'COE 251', title: 'Digital Electronics', year: 2, semester: 'Sem 1',
    credits: 4, lecturer: 'Dr. K. O. Gyasi', description: 'Boolean algebra, combinational and sequential logic, flip-flops, counters, and programmable logic devices.',
    resources: [
      r('251-s1', 'Lecture Slides — Boolean Algebra', 'slide', 'pptx', '3.6 MB', 'Sep 13, 2025'),
      r('251-s2', 'Lecture Slides — Sequential Logic', 'slide', 'pptx', '4.8 MB', 'Oct 22, 2025'),
      r('251-n1', 'Digital Logic Reference', 'note', 'pdf', '2.5 MB', 'Sep 17, 2025'),
      r('251-lab1', 'Lab Manual — Flip-Flop Circuits', 'lab-manual', 'pdf', '1.0 MB', 'Sep 25, 2025'),
      r('251-pq1', 'Mid-Sem Past Questions', 'past-question', 'pdf', '1.4 MB', 'Oct 30, 2025'),
    ],
  },
  {
    code: 'COE 253', title: 'Data Structures & Algorithms I', year: 2, semester: 'Sem 1',
    credits: 4, lecturer: 'Dr. B. K. Nkansah', description: 'Abstract data types, linked lists, stacks, queues, trees, sorting and searching algorithms.',
    resources: [
      r('253-s1', 'Lecture Slides — Lists & Stacks', 'slide', 'pptx', '4.0 MB', 'Sep 15, 2025'),
      r('253-s2', 'Lecture Slides — Trees & Graphs', 'slide', 'pptx', '5.2 MB', 'Oct 28, 2025'),
      r('253-n1', 'Algorithm Analysis Notes', 'note', 'pdf', '2.2 MB', 'Sep 20, 2025'),
      r('253-a1', 'Assignment — Linked List Implementation', 'assignment', 'pdf', '0.7 MB', 'Oct 12, 2025'),
    ],
  },
  {
    code: 'COE 255', title: 'Signals & Systems', year: 2, semester: 'Sem 1',
    credits: 3, lecturer: 'Dr. A. S. Agbemenu', description: 'Continuous and discrete-time signals, convolution, Fourier series, Laplace and Z-transforms.',
    resources: [
      r('255-s1', 'Lecture Slides — Fourier Analysis', 'slide', 'pptx', '3.4 MB', 'Sep 16, 2025'),
      r('255-s2', 'Lecture Slides — Laplace Transforms', 'slide', 'pptx', '3.9 MB', 'Oct 30, 2025'),
      r('255-n1', 'Transform Tables & Properties', 'note', 'pdf', '1.6 MB', 'Sep 22, 2025'),
      r('255-pq1', 'Past Questions Collection', 'past-question', 'pdf', '2.0 MB', 'Nov 18, 2025'),
    ],
  },
  {
    code: 'COE 252', title: 'Microprocessor Systems', year: 2, semester: 'Sem 2',
    credits: 4, lecturer: 'Dr. K. O. Gyasi', description: '8085/8086 architecture, assembly language programming, memory interfacing, and I/O systems.',
    resources: [
      r('252-s1', 'Lecture Slides — CPU Architecture', 'slide', 'pptx', '4.5 MB', 'Feb 11, 2026'),
      r('252-s2', 'Lecture Slides — Assembly Programming', 'slide', 'pptx', '5.0 MB', 'Mar 20, 2026'),
      r('252-n1', 'Assembly Instruction Set Guide', 'note', 'pdf', '2.8 MB', 'Feb 15, 2026'),
      r('252-lab1', 'Lab Manual — 8086 Programs', 'lab-manual', 'pdf', '1.4 MB', 'Feb 22, 2026'),
    ],
  },
  {
    code: 'COE 254', title: 'Data Structures & Algorithms II', year: 2, semester: 'Sem 2',
    credits: 4, lecturer: 'Dr. B. K. Nkansah', description: 'Hashing, balanced trees, graph algorithms (DFS, BFS, shortest path), dynamic programming, and complexity theory.',
    resources: [
      r('254-s1', 'Lecture Slides — Hashing & BSTs', 'slide', 'pptx', '4.2 MB', 'Feb 13, 2026'),
      r('254-s2', 'Lecture Slides — Graph Algorithms', 'slide', 'pptx', '5.5 MB', 'Mar 25, 2026'),
      r('254-n1', 'Algorithm Design Notes', 'note', 'pdf', '2.6 MB', 'Feb 18, 2026'),
      r('254-a1', 'Assignment — Graph Traversal', 'assignment', 'pdf', '0.9 MB', 'Apr 08, 2026'),
      r('254-pq1', 'End-of-Sem Past Questions', 'past-question', 'pdf', '2.1 MB', 'May 10, 2026'),
    ],
  },
  {
    code: 'COE 272', title: 'Object-Oriented Programming', year: 2, semester: 'Sem 2',
    credits: 3, lecturer: 'Dr. P. Y. Okyere', description: 'Advanced OOP in Java: GUI programming, exception handling, multithreading, and design patterns.',
    resources: [
      r('272-s1', 'Lecture Slides — Java Fundamentals', 'slide', 'pptx', '3.8 MB', 'Feb 10, 2026'),
      r('272-s2', 'Lecture Slides — GUI & Threads', 'slide', 'pptx', '4.6 MB', 'Mar 22, 2026'),
      r('272-n1', 'Java API Reference', 'note', 'pdf', '1.9 MB', 'Feb 16, 2026'),
      r('272-a1', 'Assignment — Swing Calculator', 'assignment', 'pdf', '0.8 MB', 'Apr 02, 2026'),
    ],
  },

  // ═══ Year 3 ═══
  {
    code: 'COE 351', title: 'Operating Systems', year: 3, semester: 'Sem 1',
    credits: 4, lecturer: 'Dr. B. K. Nkansah', description: 'Process management, CPU scheduling, memory management, file systems, and concurrency.',
    resources: [
      r('351-s1', 'Lecture Slides — Processes & Scheduling', 'slide', 'pptx', '4.8 MB', 'Sep 14, 2025'),
      r('351-s2', 'Lecture Slides — Memory & File Systems', 'slide', 'pptx', '5.2 MB', 'Oct 25, 2025'),
      r('351-n1', 'OS Concepts Summary', 'note', 'pdf', '3.0 MB', 'Sep 18, 2025'),
      r('351-pq1', 'Past Questions — OS', 'past-question', 'pdf', '1.8 MB', 'Nov 10, 2025'),
    ],
  },
  {
    code: 'COE 353', title: 'Computer Networks', year: 3, semester: 'Sem 1',
    credits: 4, lecturer: 'Prof. E. A. Frimpong', description: 'OSI and TCP/IP models, routing, switching, network security, and socket programming.',
    resources: [
      r('353-s1', 'Lecture Slides — Network Models', 'slide', 'pptx', '5.0 MB', 'Sep 16, 2025'),
      r('353-s2', 'Lecture Slides — Routing & Security', 'slide', 'pptx', '5.8 MB', 'Oct 28, 2025'),
      r('353-n1', 'Network Protocols Reference', 'note', 'pdf', '2.4 MB', 'Sep 22, 2025'),
      r('353-lab1', 'Lab Manual — Packet Tracer Exercises', 'lab-manual', 'pdf', '1.6 MB', 'Sep 28, 2025'),
    ],
  },
  {
    code: 'COE 355', title: 'Software Engineering', year: 3, semester: 'Sem 1',
    credits: 3, lecturer: 'Dr. J. K. Arthur', description: 'Requirements engineering, system design, UML, agile methodologies, testing, and project management.',
    resources: [
      r('355-s1', 'Lecture Slides — Requirements & UML', 'slide', 'pptx', '3.6 MB', 'Sep 15, 2025'),
      r('355-s2', 'Lecture Slides — Agile & Testing', 'slide', 'pptx', '4.0 MB', 'Oct 30, 2025'),
      r('355-n1', 'Software Process Models', 'note', 'pdf', '1.8 MB', 'Sep 20, 2025'),
      r('355-a1', 'Assignment — SRS Document', 'assignment', 'pdf', '0.7 MB', 'Oct 14, 2025'),
    ],
  },
  {
    code: 'COE 352', title: 'Database Systems', year: 3, semester: 'Sem 2',
    credits: 4, lecturer: 'Dr. J. K. Arthur', description: 'ER modelling, relational algebra, SQL, normalization, transaction processing, and NoSQL introduction.',
    resources: [
      r('352-s1', 'Lecture Slides — ER & Relational Model', 'slide', 'pptx', '4.2 MB', 'Feb 12, 2026'),
      r('352-s2', 'Lecture Slides — SQL & Transactions', 'slide', 'pptx', '4.8 MB', 'Mar 22, 2026'),
      r('352-n1', 'SQL Query Reference', 'note', 'pdf', '2.0 MB', 'Feb 16, 2026'),
      r('352-lab1', 'Lab Manual — MySQL Exercises', 'lab-manual', 'pdf', '1.3 MB', 'Feb 24, 2026'),
    ],
  },
  {
    code: 'COE 354', title: 'Embedded Systems', year: 3, semester: 'Sem 2',
    credits: 4, lecturer: 'Dr. K. O. Gyasi', description: 'ARM microcontroller architecture, peripheral interfacing, real-time operating systems, and IoT basics.',
    resources: [
      r('354-s1', 'Lecture Slides — ARM Architecture', 'slide', 'pptx', '5.2 MB', 'Feb 14, 2026'),
      r('354-s2', 'Lecture Slides — Peripherals & RTOS', 'slide', 'pptx', '5.6 MB', 'Mar 26, 2026'),
      r('354-n1', 'STM32 Programming Guide', 'note', 'pdf', '3.4 MB', 'Feb 18, 2026'),
      r('354-lab1', 'Lab Manual — GPIO & Interrupts', 'lab-manual', 'pdf', '1.5 MB', 'Feb 26, 2026'),
    ],
  },
  {
    code: 'COE 372', title: 'Artificial Intelligence', year: 3, semester: 'Sem 2',
    credits: 3, lecturer: 'Dr. B. K. Nkansah', description: 'Search algorithms, knowledge representation, probabilistic reasoning, and introduction to neural networks.',
    resources: [
      r('372-s1', 'Lecture Slides — Search & CSPs', 'slide', 'pptx', '3.8 MB', 'Feb 10, 2026'),
      r('372-s2', 'Lecture Slides — Neural Networks', 'slide', 'pptx', '4.4 MB', 'Mar 28, 2026'),
      r('372-n1', 'AI Algorithms Summary', 'note', 'pdf', '2.2 MB', 'Feb 14, 2026'),
      r('372-pq1', 'Past Questions — AI', 'past-question', 'pdf', '1.6 MB', 'May 02, 2026'),
    ],
  },

  // ═══ Year 4 ═══
  {
    code: 'COE 451', title: 'Machine Learning', year: 4, semester: 'Sem 1',
    credits: 4, lecturer: 'Dr. B. K. Nkansah', description: 'Supervised and unsupervised learning, regression, classification, clustering, and model evaluation.',
    resources: [
      r('451-s1', 'Lecture Slides — Regression & Classification', 'slide', 'pptx', '5.5 MB', 'Sep 14, 2025'),
      r('451-s2', 'Lecture Slides — Ensemble & Clustering', 'slide', 'pptx', '6.0 MB', 'Oct 26, 2025'),
      r('451-n1', 'ML Algorithm Cheatsheet', 'note', 'pdf', '2.6 MB', 'Sep 18, 2025'),
      r('451-lab1', 'Lab — Scikit-learn Workshop', 'lab-manual', 'pdf', '1.8 MB', 'Sep 28, 2025'),
    ],
  },
  {
    code: 'COE 453', title: 'Computer Security', year: 4, semester: 'Sem 1',
    credits: 4, lecturer: 'Prof. E. A. Frimpong', description: 'Cryptography, authentication, network security, web security, and ethical hacking fundamentals.',
    resources: [
      r('453-s1', 'Lecture Slides — Cryptography Basics', 'slide', 'pptx', '4.6 MB', 'Sep 16, 2025'),
      r('453-s2', 'Lecture Slides — Network & Web Security', 'slide', 'pptx', '5.2 MB', 'Oct 30, 2025'),
      r('453-n1', 'Security Protocols Reference', 'note', 'pdf', '2.0 MB', 'Sep 22, 2025'),
      r('453-lab1', 'Lab — Cryptography with OpenSSL', 'lab-manual', 'pdf', '1.2 MB', 'Sep 30, 2025'),
    ],
  },
  {
    code: 'COE 455', title: 'Capstone Project I', year: 4, semester: 'Sem 1',
    credits: 3, lecturer: 'Dr. J. K. Arthur', description: 'Project proposal, literature review, requirements specification, system architecture, and prototype planning.',
    resources: [
      r('455-s1', 'Lecture Slides — Project Methodology', 'slide', 'pptx', '2.8 MB', 'Sep 12, 2025'),
      r('455-n1', 'Project Proposal Template', 'note', 'pdf', '1.0 MB', 'Sep 20, 2025'),
      r('455-n2', 'Literature Review Guide', 'note', 'pdf', '1.5 MB', 'Oct 10, 2025'),
    ],
  },
  {
    code: 'COE 452', title: 'Deep Learning', year: 4, semester: 'Sem 2',
    credits: 4, lecturer: 'Dr. B. K. Nkansah', description: 'Deep neural networks, CNNs, RNNs, transformers, generative models, and GPU-accelerated training.',
    resources: [
      r('452-s1', 'Lecture Slides — DNNs & Backprop', 'slide', 'pptx', '6.2 MB', 'Feb 12, 2026'),
      r('452-s2', 'Lecture Slides — CNNs & RNNs', 'slide', 'pptx', '7.0 MB', 'Mar 24, 2026'),
      r('452-n1', 'TensorFlow Quickstart Guide', 'note', 'pdf', '2.8 MB', 'Feb 16, 2026'),
      r('452-lab1', 'Lab — Image Classification with CNN', 'lab-manual', 'pdf', '2.0 MB', 'Feb 28, 2026'),
    ],
  },
  {
    code: 'COE 454', title: 'Distributed Systems', year: 4, semester: 'Sem 2',
    credits: 4, lecturer: 'Prof. E. A. Frimpong', description: 'Distributed computing models, consensus algorithms, replication, fault tolerance, and cloud computing.',
    resources: [
      r('454-s1', 'Lecture Slides — Distributed Models', 'slide', 'pptx', '4.8 MB', 'Feb 14, 2026'),
      r('454-s2', 'Lecture Slides — Consensus & Replication', 'slide', 'pptx', '5.4 MB', 'Mar 26, 2026'),
      r('454-n1', 'Distributed Systems Concepts', 'note', 'pdf', '2.4 MB', 'Feb 18, 2026'),
      r('454-pq1', 'Past Questions — Distributed Systems', 'past-question', 'pdf', '1.8 MB', 'May 04, 2026'),
    ],
  },
  {
    code: 'COE 476', title: 'Capstone Project II', year: 4, semester: 'Sem 2',
    credits: 3, lecturer: 'Dr. J. K. Arthur', description: 'Implementation, testing, deployment, user evaluation, and final project defence.',
    resources: [
      r('476-s1', 'Lecture Slides — Implementation & Testing', 'slide', 'pptx', '3.0 MB', 'Feb 10, 2026'),
      r('476-n1', 'Final Report Template', 'note', 'pdf', '1.2 MB', 'Feb 20, 2026'),
      r('476-n2', 'Presentation Guidelines', 'note', 'pdf', '0.8 MB', 'Mar 15, 2026'),
    ],
  },
]

export const yearLabels: Record<number, string> = {
  1: 'Year 1 · Freshman',
  2: 'Year 2 · Sophomore',
  3: 'Year 3 · Junior',
  4: 'Year 4 · Senior',
}

export const semesterLabels: Record<string, string> = {
  'Sem 1': 'First Semester',
  'Sem 2': 'Second Semester',
}

export function getYears(): number[] {
  return [1, 2, 3, 4]
}

export function getSemesters(): string[] {
  return ['Sem 1', 'Sem 2']
}

export type YearTheme = {
  primary: string
  light: string
  border: string
  soft: string
  hover: string
  shadow: string
}

export const yearThemes: Record<number, YearTheme> = {
  1: { primary: '#2563EB', light: '#DBEAFE', border: '#93C5FD', soft: '#EFF6FF', hover: '#1D4ED8', shadow: 'rgba(37,99,235,0.15)' },
  2: { primary: '#10B981', light: '#D1FAE5', border: '#6EE7B7', soft: '#ECFDF5', hover: '#059669', shadow: 'rgba(16,185,129,0.15)' },
  3: { primary: '#F59E0B', light: '#FEF3C7', border: '#FCD34D', soft: '#FFFBEB', hover: '#D97706', shadow: 'rgba(245,158,11,0.15)' },
  4: { primary: '#8B5CF6', light: '#EDE9FE', border: '#C4B5FD', soft: '#F5F3FF', hover: '#7C3AED', shadow: 'rgba(139,92,246,0.15)' },
}
