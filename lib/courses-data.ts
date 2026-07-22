export type Resource = {
  id: string
  name: string
  type: 'slide' | 'note' | 'past-question' | 'assignment' | 'lab-manual' | 'video'
  format: 'pdf' | 'pptx' | 'docx' | 'mp4' | 'zip'
  fileSize: string
  uploadDate: string
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
): Resource {
  return { id, name, type, format, fileSize, uploadDate }
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
  // ═══ Year 1 ═══
  {
    code: 'COE 151', title: 'Basic Electronics I', year: 1, semester: 'Sem 1',
    credits: 4, lecturer: 'Dr. A. S. Agbemenu', description: 'Fundamental principles of analogue electronics including semiconductor theory, diodes, and transistor circuits.',
    resources: [
      r('151-s1', 'Lecture Slides — Diodes & Rectifiers', 'slide', 'pptx', '3.8 MB', 'Sep 14, 2025'),
      r('151-s2', 'Lecture Slides — Transistor Amplifiers', 'slide', 'pptx', '4.5 MB', 'Oct 20, 2025'),
      r('151-n1', 'Circuit Analysis Notes', 'note', 'pdf', '2.4 MB', 'Sep 18, 2025'),
      r('151-pq1', 'Mid-Sem Exam — Past Questions', 'past-question', 'pdf', '1.1 MB', 'Oct 28, 2025'),
      r('151-lab1', 'Lab 1 — Diode Characteristics', 'lab-manual', 'pdf', '0.8 MB', 'Sep 22, 2025'),
    ],
  },
  {
    code: 'COE 153', title: 'Introduction to Programming I', year: 1, semester: 'Sem 1',
    credits: 4, lecturer: 'Dr. P. Y. Okyere', description: 'Introduction to problem-solving using C++. Topics include variables, control structures, functions, and arrays.',
    resources: [
      r('153-s1', 'Lecture Slides — Variables & Control Flow', 'slide', 'pptx', '3.2 MB', 'Sep 14, 2025'),
      r('153-s2', 'Lecture Slides — Functions & Arrays', 'slide', 'pptx', '4.0 MB', 'Oct 18, 2025'),
      r('153-n1', 'C++ Quick Reference Guide', 'note', 'pdf', '1.5 MB', 'Sep 20, 2025'),
      r('153-a1', 'Assignment 1 — Loops & Conditionals', 'assignment', 'pdf', '0.6 MB', 'Oct 05, 2025'),
      r('153-a2', 'Assignment 2 — Array Manipulation', 'assignment', 'pdf', '0.7 MB', 'Nov 02, 2025'),
    ],
  },
  {
    code: 'COE 155', title: 'Engineering Mathematics I', year: 1, semester: 'Sem 1',
    credits: 3, lecturer: 'Dr. J. K. Arthur', description: 'Analytic geometry, limits, differentiation, and integration of algebraic and transcendental functions.',
    resources: [
      r('155-s1', 'Lecture Slides — Differentiation', 'slide', 'pptx', '2.9 MB', 'Sep 16, 2025'),
      r('155-s2', 'Lecture Slides — Integration Techniques', 'slide', 'pptx', '3.4 MB', 'Oct 25, 2025'),
      r('155-n1', 'Formula Sheet & Derivations', 'note', 'pdf', '1.8 MB', 'Sep 22, 2025'),
      r('155-pq1', 'Past Questions — All Topics', 'past-question', 'pdf', '2.2 MB', 'Nov 15, 2025'),
    ],
  },
  {
    code: 'COE 152', title: 'Basic Electronics II', year: 1, semester: 'Sem 2',
    credits: 4, lecturer: 'Dr. A. S. Agbemenu', description: 'Operational amplifiers, feedback theory, oscillators, and introduction to power electronics.',
    resources: [
      r('152-s1', 'Lecture Slides — Op-Amps', 'slide', 'pptx', '4.1 MB', 'Feb 12, 2026'),
      r('152-s2', 'Lecture Slides — Oscillators & Timers', 'slide', 'pptx', '3.7 MB', 'Mar 18, 2026'),
      r('152-n1', 'Op-Amp Circuit Notes', 'note', 'pdf', '2.0 MB', 'Feb 16, 2026'),
      r('152-lab1', 'Lab Manual — Op-Amp Applications', 'lab-manual', 'pdf', '1.2 MB', 'Feb 20, 2026'),
      r('152-pq1', 'End-of-Sem Past Questions', 'past-question', 'pdf', '1.6 MB', 'May 08, 2026'),
    ],
  },
  {
    code: 'COE 154', title: 'Introduction to Programming II', year: 1, semester: 'Sem 2',
    credits: 4, lecturer: 'Dr. P. Y. Okyere', description: 'Object-oriented programming in C++: classes, inheritance, polymorphism, file I/O, and STL containers.',
    resources: [
      r('154-s1', 'Lecture Slides — Classes & Objects', 'slide', 'pptx', '3.5 MB', 'Feb 14, 2026'),
      r('154-s2', 'Lecture Slides — Inheritance & Polymorphism', 'slide', 'pptx', '4.2 MB', 'Mar 22, 2026'),
      r('154-n1', 'OOP Cheatsheet', 'note', 'pdf', '1.1 MB', 'Feb 18, 2026'),
      r('154-a1', 'Assignment — Inheritance Hierarchy', 'assignment', 'pdf', '0.8 MB', 'Apr 05, 2026'),
    ],
  },
  {
    code: 'COE 172', title: 'Engineering Mathematics II', year: 1, semester: 'Sem 2',
    credits: 3, lecturer: 'Dr. J. K. Arthur', description: 'Vectors, matrices, systems of linear equations, eigenvalues, and introductory differential equations.',
    resources: [
      r('172-s1', 'Lecture Slides — Linear Algebra', 'slide', 'pptx', '3.0 MB', 'Feb 10, 2026'),
      r('172-s2', 'Lecture Slides — Differential Equations', 'slide', 'pptx', '3.6 MB', 'Mar 28, 2026'),
      r('172-n1', 'Matrix Operations Workbook', 'note', 'pdf', '2.3 MB', 'Feb 14, 2026'),
      r('172-pq1', 'Past Questions — With Solutions', 'past-question', 'pdf', '2.8 MB', 'Apr 20, 2026'),
    ],
  },

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
