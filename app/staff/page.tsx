'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mail, Eye } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { FadeIn } from '@/components/fade-in'
import { Button } from '@/components/ui/button'
import { StaffModal, type StaffMember } from '@/components/staff/staff-modal'
import { courses } from '@/lib/courses-data'

const staff: StaffMember[] = [
  {
    id: 'eric-tutu-tchao',
    name: 'Prof. Eric Tutu Tchao',
    title: 'Prof.',
    role: 'Head, Department of Computer Engineering',
    department: 'Computer Engineering',
    expertise: 'Telecommunications Engineering',
    initials: 'ET',
    office: 'Room A312, Faculty of Electrical & Computer Engineering Block',
    email: 'ettchao@knust.edu.gh',
    educationalBackground: [
      'PhD Telecommunications Engineering',
      'BSc Telecommunications Engineering',
      'Certificate in High Performance Computing and Parallel Programming',
    ],
    researchInterests: [
      'Artificial Intelligence for Development (AI4D)',
      'Industrial IoT',
      'Blockchain Interoperability',
    ],
    positions: [
      'Scientific Director, DIPPER Lab',
      'Lead, Agricultural Innovations & Food Security Theme (RAIL)',
      'Department Exams Officer',
      'Curriculum Development Committee Member',
      'Hall Fellow (Independence Hall)',
      'Reviewer for international journals',
      'Ghana Institution of Engineers committees',
    ],
    publications: [
      'Nature Human Behaviour',
      'IEEE Access',
      'Electronics',
      'Scientific African',
      'Wireless Communications and Mobile Computing',
    ],
  },
  {
    id: 'henry-nunoo-mensah',
    name: 'Dr. Henry Nunoo-Mensah',
    title: 'Dr.',
    role: 'Senior Lecturer',
    department: 'Computer Engineering',
    expertise: 'Network Security & Wireless Sensor Networks',
    initials: 'HN',
    office: 'Room A423, Vodafone Block',
    email: 'hnunoo-mensah@knust.edu.gh',
    educationalBackground: [
      'BSc Computer Engineering (KNUST)',
      'MPhil Computer Engineering (KNUST)',
      'PhD Computer Engineering (KNUST)',
    ],
    researchInterests: [
      'Wireless Sensor Networks',
      'Network Security',
      'Intelligent Agents',
      'Algorithm Design & Optimisation',
    ],
    positions: [
      'MSc Programmes Coordinator (KEEP)',
      'Project Coordinator (CoDe Lab)',
      'Research Fellow',
    ],
  },
  {
    id: 'andrew-agbemenu',
    name: 'Dr. Andrew Selasi Agbemenu',
    title: 'Dr.',
    role: 'Senior Lecturer',
    department: 'Computer Engineering',
    expertise: 'Analog & Mixed Signal Design, IoT, Blockchain',
    initials: 'AA',
    office: 'Room 422, Caesar Block, College of Engineering',
    researchInterests: [
      'Analog and Mixed Signal Design',
      'Internet of Things',
      'Blockchain',
      'AI applications in agricultural value chains',
      'Low-Power ADCs',
      'Semiconductors',
      'CMOS/FinFET',
    ],
  },
  {
    id: 'benjamin-kommey',
    name: 'Prof. Emmanuel Kofi Akowuah',
    title: 'Prof.',
    role: 'Professor',
    department: 'Computer Engineering',
    expertise: 'Optical Communication Systems & Cyber Security',
    initials: 'EA',
    educationalBackground: [
      'PhD Electronic Engineering – University of Kent, UK',
      'MSc Broadband and Mobile Communication Networks – University of Kent, UK',
      'BSc Electrical and Electronic Engineering – KNUST',
    ],
    researchInterests: [
      'High-speed Optical Communication Systems',
      'Network and Cyber Security',
      'Communication System Design and Optimisation',
      'Grid-connected Systems',
      'Hybrid Photovoltaic (PV) Energy Systems',
      'Intelligent Energy Management Systems',
      'Photonic Devices',
      'Photonic Crystal Fibres',
      'Surface Plasmon Polaritons',
      'Metamaterials',
    ],
    positions: [
      'Fellow, The Brew-Hammond Energy Centre (TBHEC)',
      'Head, Department of Computer Engineering (2016–2020)',
      'University ICT Consultant (2013–2016)',
    ],
  },
  {
    id: 'bright-yeboah-akowuah',
    name: 'Dr. Bright Yeboah-Akowuah',
    title: 'Dr.',
    role: 'Senior Lecturer',
    department: 'Computer Engineering',
    expertise: 'Antennas, Metasurfaces & Software Engineering',
    initials: 'BY',
    educationalBackground: [
      'PhD Telecommunication Engineering – King\'s College London',
      'MSc Telecommunications (Networking) – Queen Mary University of London',
    ],
    researchInterests: [
      'Antennas',
      'Metasurfaces',
      'Software Engineering',
      'Computer Programming',
      'Computer Networking',
    ],
  },
  {
    id: 'dorothy-agyapong',
    name: 'Dr. (Mrs.) Dorothy Araba Yakoba Agyapong',
    title: 'Dr.',
    role: 'Senior Lecturer',
    department: 'Computer Engineering',
    expertise: 'Biomedical Engineering & Biomaterials',
    initials: 'DA',
    email: 'daagyapong@knust.edu.gh',
    educationalBackground: [
      'BSc Computer Engineering – KNUST',
      'MSc Bioengineering – The University of Nottingham, UK',
      'PhD Biomedical Engineering – University of Electronic Science and Technology of China',
      'Postgraduate Diploma in Education – University of Education, Winneba',
    ],
    researchInterests: [
      'Material optimization and engineering of biomedical implants',
      'Biological considerations for implant performance',
      'Biosensors',
      'Biomedical Engineering',
      'Microwave heating effects on biomaterials',
    ],
    positions: [
      'International Programmes Officer, College of Engineering',
      'Department Examinations Officer',
      'Assistant Examinations Officer',
      'Vacation Training Officer',
      'Patron, Biomedical Engineering Students Association',
      'Academic Tutor',
      'COVID-19 Focal Person (Faculty of Electrical & Computer Engineering)',
    ],
    coursesTaught: [
      'Introduction to Information Technology',
      'Healthcare Technology and Management',
      'Health System Development',
      'Biomaterials I & II',
      'Anatomy and Physiology for Engineers I & II',
      'Cell Biology',
      'Medical Device Regulation',
      'Research Methods',
    ],
  },
  {
    id: 'griffith-klogo',
    name: 'Dr. Griffith Selorm Klogo',
    title: 'Dr.',
    role: 'Senior Lecturer',
    department: 'Computer Engineering',
    expertise: 'Smart Metering & Embedded Systems Security',
    initials: 'GK',
    office: 'Room 207, Caesar Block, College of Engineering',
    researchInterests: [
      'Smart Metering',
      'Metering Infrastructure',
      'Telecommunication Infrastructure',
      'Embedded Systems Security',
      'Security Systems',
    ],
  },
  {
    id: 'prince-adjei',
    name: 'Dr. Prince Ebenezer Adjei',
    title: 'Dr.',
    role: 'Lecturer',
    department: 'Computer Engineering',
    expertise: 'AI, Machine Learning & Medical Image Analysis',
    initials: 'PA',
    office: 'Room 423, Caesar Block, College of Engineering',
    email: 'peadjei.coe@knust.edu.gh',
    educationalBackground: [
      'MPhil Computer Engineering',
      'MSc Biometrics',
      'Doctor of Engineering (Biomedical Engineering)',
    ],
    researchInterests: [
      'Artificial Intelligence',
      'Machine Learning',
      'Pattern Recognition',
      'Deep Learning',
      'Generative Models',
      'Medical Image Analysis',
      'Ophthalmology Imaging',
      'Gastroenterology Imaging',
    ],
    coursesTaught: [
      'Biomedical Engineering Design I',
      'Biomedical Engineering Design II',
      'Introduction to MATLAB and LabVIEW',
      'Biosignal Processing and Analysis',
      'Medical Device Regulation',
    ],
    positions: [
      'Assistant Examinations Officer',
      'Procurement Committee Member',
      'Facilitator, Engineering in Society Clinic',
      'Reviewer, Biomedical Signal Processing and Control (Elsevier)',
    ],
    publications: [
      'GAN-Based Synthetic Gastrointestinal Image Generation (2020)',
      'Optic Cup and Optic Disc Analysis for Glaucoma Screening (IEEE MECBME 2018)',
      'Brain Tumor Segmentation using SLIC Superpixels and Optimized Thresholding Algorithm (2018)',
    ],
  },
  {
    id: 'prince-odame',
    name: 'Dr. Prince Odame',
    title: 'Dr.',
    role: 'Lecturer',
    department: 'Computer Engineering',
    expertise: 'AI for Healthcare & Biomedical Engineering',
    initials: 'PO',
    office: 'Room A411, Caesar Building',
    educationalBackground: [
      'BSc Agricultural Engineering',
      'MSc Biological Engineering',
      'PhD Computer Engineering',
    ],
    researchInterests: [
      'Artificial Intelligence for Healthcare',
      'Neonatal Healthcare Technologies',
      'Biomedical Engineering',
      'Internet of Medical Things (IoMT)',
      'Medical Device Design',
      'Computational Modelling',
      'AI-assisted Diagnostics',
      'Agricultural Technologies',
    ],
    coursesTaught: [
      'Biomechanics I',
      'Biomechanics II',
      'Biomaterials I',
    ],
    positions: [
      'Research Fellow, Responsible Artificial Intelligence Laboratory (RAIL)',
      'Lead, Health Division, DIPPER Lab',
      'Assistant Examinations Officer',
      'Examinations Officer',
      'Patron, Biomedical Engineering Students Society',
      'Coordinator, Engineering in Society',
      'Budget Committee Member',
      'Curriculum Development Committee Member',
      'Lead Facilitator, Engineering in Society Clinic',
    ],
  },
  {
    id: 'daniel-kwegyir',
    name: 'Dr. Daniel Kwegyir',
    title: 'Dr.',
    role: 'Lecturer',
    department: 'Computer Engineering',
    expertise: 'Computer Engineering',
    initials: 'DK',
  },
  {
    id: 'james-okae',
    name: 'Dr. James Okae',
    title: 'Dr.',
    role: 'Lecturer',
    department: 'Computer Engineering',
    expertise: 'Computer Engineering',
    initials: 'JO',
  },
  {
    id: 'jeffery-ezearn',
    name: 'Dr. Jeffery Ezearn',
    title: 'Dr.',
    role: 'Lecturer',
    department: 'Computer Engineering',
    expertise: 'Mathematics',
    initials: 'JE',
  },
  {
    id: 'isaac-acquah',
    name: 'Dr. Isaac Acquah',
    title: 'Dr.',
    role: 'Senior Lecturer',
    department: 'Computer Engineering',
    expertise: 'Biomedical Engineering',
    initials: 'IA',
    educationalBackground: [
      'BSc Computer Engineering (KNUST)',
      'MSc Biomedical Engineering (University of Surrey, England)',
      'PhD Biomedical Engineering (Korea University, South Korea)',
    ],
    researchInterests: [
      'Medical AI Applications',
      'Bioinstrumentation',
      'Biomaterials',
      'Healthcare Technologies',
    ],
    positions: [
      'Biomedical Engineering Programme, Department of Computer Engineering (2008–Present)',
    ],
  },
]

function staffEmail(member: StaffMember): string {
  if (member.email) return member.email
  return member.name
    .replace(/^(Prof|Dr|Mr|Mrs|Ms)\..?\s*/i, '')
    .replace(/\([^)]*\)/g, '')
    .toLowerCase()
    .replace(/\.\s*/g, '')
    .replace(/\s+/g, '.')
    .replace(/\.+/g, '.')
    .replace(/^\.|\.$/g, '') + '@knust.edu.gh'
}

function staffCourses(name: string): string[] {
  return courses
    .filter((c) => c.lecturer === name)
    .map((c) => `${c.code} — ${c.title}`)
}

function hasPhoto(id: string): boolean {
  return id !== 'isaac-acquah'
}

export default function StaffPage() {
  const [selected, setSelected] = useState<StaffMember | null>(null)

  return (
    <AppShell title="Staff">
      <FadeIn>
        <section className="px-4 pt-5">
          <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">Department staff</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
            The lecturers and advisors supporting Computer Engineering at KNUST.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={50}>
        <section className="px-4 pt-5 pb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {staff.map((member, i) => {
              const email = staffEmail(member)
              const taught = staffCourses(member.name)
              const photo = hasPhoto(member.id)
              return (
                <div
                  key={member.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 card-border-glow hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted">
                      {photo ? (
                        <Image
                          src={`/images/STAFF/${member.id}.jpg`}
                          alt={member.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                          priority={i < 4}
                        />
                      ) : (
                        <span className="flex size-full items-center justify-center font-heading text-lg font-bold text-muted-foreground/50">
                          {member.initials}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-heading text-base font-bold text-foreground">{member.name}</h2>
                      <p className="text-sm font-semibold text-primary">{member.role}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{member.department}</p>
                      <p className="text-xs text-muted-foreground/80">{member.expertise}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="size-3.5" aria-hidden="true" />
                      Email
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected(member)}
                      className="rounded-full px-4 py-2 text-xs font-semibold"
                    >
                      <Eye className="size-3.5 mr-1" aria-hidden="true" />
                      View Profile
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </FadeIn>

      <StaffModal
        member={selected && {
          ...selected,
          email: staffEmail(selected),
          courses: staffCourses(selected.name),
        }}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </AppShell>
  )
}
