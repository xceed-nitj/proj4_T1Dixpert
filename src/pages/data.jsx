import React from 'react';

const teamDetailsNITJ = [
    {
        name: "Dr. D Harimurugan",
        image: "/team/image1.png",
        designation: "Assistant Professor in the Department of Electrical Engineering",
        specialization: "Machine learning, Explainable AI & Software development",
    },
    {
        name: "Prof. Arun Khosla",
        image: "/team/image2.png",
        designation: "Professor in the Department of Electronics and Communication Engineering",
        specialization: "AI, Gamification and Assistive technologies, Human-Centric Design",
        additionalRole: "Head, Centre for Artificial Intelligence"
    },
    {
        name: "Dr. Amritpal Singh",
        image: "/team/image3.png",
        designation: "Assistant Professor in the Department of Computer Science Engineering",
        specialization: "AI, Cloud computing and Machine learning",
    },
    {
        name: "Dr. Khusal shah",
        image: "/team/image4.png",
        designation: "Software developer",
        specialization: "Machine learning & Software development",
    },
    {
        name: "Dr. Kulbhushan Chand",
        image: "/team/image5.png",
        designation: "Postdoctoral Fellow at IIT Mandi iHUb and HCI foundation",
        specialization: "Human Computer Interaction",
    }
];


const teamDetailsPGIMER = [
    {
        name: "Dr. Rakesh Kumar",
        image: "/team/image6.png",
        designation: "Professor at PGIMER Chandigarh",
        specialization: "T1D management and Clinical trials",
    },
    {
        name: "Dr. Jaivinder Yadav",
        image: "/team/image7.png",
        designation: "Additional Professor at Pediatric Endocrinology Unit PGIMER Chandigarh",
        specialization: "T1D management, Pediatric endocrinology, Clinical trials",
    }
];

const platformFeatures = [
    {
      id: 1,
      title: 'Intelligent Dashboard',
      description: 'Comprehensive analytics dashboard providing real-time insights and visualizations for diabetes management',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Smart Glucose Monitoring',
      description: 'Automated glucose level tracking with intelligent alerts and recommendations based on patterns',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Patient-Doctor Connectivity',
      description: 'Seamless communication between patients and healthcare providers with instant data sharing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Treatment Planning',
      description: 'AI-powered treatment recommendations with personalized dosage and medication scheduling',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  // T1D Statistics (Dummy data)
  const t1dStatistics = [
    { value: '0.2M+', label: 'Children with T1D in India', description: 'India has one of the largest populations of children with Type 1 Diabetes' },
    { value: '8.4M', label: 'People living with T1D globally', description: 'Type 1 Diabetes affects millions of people around the world' },
    { value: '9%', label: 'Annual increase in T1D cases', description: 'The prevalence of Type 1 Diabetes is rising each year' },
    { value: '78%', label: 'T1D patients struggle with management', description: 'Most patients face challenges with daily diabetes management' },
    { value: '13.5', label: 'Average age of diagnosis in India', description: 'Many children are diagnosed during critical development years' },
    { value: '42%', label: 'Reduced complications with proper care', description: 'Proper management significantly reduces health complications' },
  ];

  // Team data (using dummy data as requested)
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Ravi Kumar',
      role: 'Medical Director',
      image: '/home/team/placeholder.jpg',
      github: '#',
      linkedin: '#',
    },
    {
      id: 2,
      name: 'Dr. Priya Singh',
      role: 'Endocrinologist',
      image: '/home/team/placeholder.jpg',
      github: '#',
      linkedin: '#',
    },
    {
      id: 3,
      name: 'Vikram Mehta',
      role: 'Technology Lead',
      image: '/home/team/placeholder.jpg',
      github: '#',
      linkedin: '#',
    },
    {
      id: 4,
      name: 'Anjali Gupta',
      role: 'Patient Advocate',
      image: '/home/team/placeholder.jpg',
      github: '#',
      linkedin: '#',
    },
  ];

export { teamDetailsNITJ, teamDetailsPGIMER, platformFeatures, t1dStatistics, teamMembers }; 