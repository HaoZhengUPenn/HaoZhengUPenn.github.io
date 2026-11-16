/* ============================================================
   英文数据集（对应 CV_Hao.pdf 英文版）
   与 data.js / data2.js 结构一致；论文与讲座的题目/机构本身即英文，
   故论文仅翻译作者角色与收录标签，讲座直接复用。
   ============================================================ */
window.CV_EN = (function () {
  'use strict';

  const profile = {
    name: 'Hao ZHENG',
    enName: 'Hao Zheng',
    title: 'Assistant Professor · PhD Supervisor',
    affiliation: 'Department of Architecture and Civil Engineering, City University of Hong Kong',
    roles: [
      'Assistant Professor & PhD Supervisor (12/2022 – present)',
      'Associate Program Leader, Master of Architecture (08/2023 – present)',
      'Director, Architectural Intelligence Group (12/2022 – present)',
      'Director, AI Fabrication Lab (10/2025 – present)'
    ],
    address: 'Room B6418, YEUNG Building, 83 Tat Chee Avenue, City University of Hong Kong, Kowloon, Hong Kong',
    phone: '+86 18817555682 (WeChat)',
    email: 'zhhao@alumni.upenn.edu',
    homepage: 'https://www.architecturalintelligence.group/',
    intro: [
      'Prof. Dr. Hao Zheng is an Assistant Professor and Associate Program Leader of the Master of Architecture Program in the Department of Architecture and Civil Engineering at City University of Hong Kong. He also directs the Architectural Intelligence Group and the AI Fabrication Lab. He earned his Ph.D. from the University of Pennsylvania, where his research focused on machine learning, AI-generated content, data-driven design, and big data analytics. He holds a Master of Architecture degree from the University of California, Berkeley, and bachelor\'s degrees in Architecture and Arts from Shanghai Jiao Tong University.',
      'Prior to his current appointment, Hao conducted research at Tsinghua University and UC Berkeley, focusing on robotic assembly, machine learning, and bio-inspired 3D printing. His teaching experience includes serving as a workshop tutor at Tongji University, a lecturer at the University of Pennsylvania, and a teaching fellow at Shanghai Jiao Tong University.',
      'Hao actively contributes to the international research community as a co-organizer and reviewer for conferences such as ACADIA, CAADRIA, and CDRF, and as a reviewer for more than 50 SCI-, SSCI-, and AHCI-indexed journals. His scholarly output comprises approximately 80 publications, including more than 30 journal articles indexed in SCI, SSCI, or AHCI. His work has also been featured on the cover of Advanced Science.',
      'Hao has led research and industry-funded projects totaling more than USD 1 million, including projects supported by the Early Career Scheme (ECS) of the University Grants Committee (UGC) of Hong Kong. His achievements have earned him multiple research and teaching awards, including recognition on the World\'s Top 2% Scientists list (Single-Year 2026) compiled by Stanford University and Elsevier.',
      'Throughout his academic career, Hao has taught more than 40 courses, supervised over 10 doctoral students, and delivered more than 120 invited talks at international conferences and academic organizations. He has also served as a journal editor, held memberships in academic societies, and provided expert consultancy to publicly listed companies.'
    ],
    research: [
      { icon: '◈', title: 'Machine Learning & Data Mining', desc: 'Analysis, prediction and simulation of the built environment' },
      { icon: '◉', title: 'AI-Generated Content (AIGC)', desc: 'Creative AI · Al Designer' },
      { icon: '◇', title: 'Data-Driven Design', desc: 'Computational design · Parametric design' },
      { icon: '▣', title: 'Big Data Analysis', desc: 'Urban modeling · Urban form-finding' }
    ],
    highlights: [
      { value: 84, suffix: '', label: 'Publications (39 in SCI / SSCI / AHCI)' },
      { value: 12, suffix: '', label: 'Patents & software copyrights' },
      { value: 13, suffix: '', label: 'Research projects led / joined' },
      { value: 122, suffix: '', label: 'Invited talks' }
    ]
  };

  const education = [
    {
      school: 'University of Pennsylvania', en: 'Philadelphia, USA', degree: 'PhD in Architecture', period: '2018 – 2022',
      start: 2018, end: 2022, city: 'Philadelphia, USA',
      points: ['Machine Learning in Architectural Design', 'Fully-funded by PennDesign Fellowship'],
      tag: 'PhD'
    },
    {
      school: 'University of California, Berkeley', en: 'Berkeley, USA', degree: 'Master of Architecture', period: '2016 – 2017',
      start: 2016, end: 2017, city: 'Berkeley, USA',
      points: ['Computational Design and Digital Fabrication', 'GPA: 3.98 / 4'],
      tag: 'Master'
    },
    {
      school: 'Shanghai Jiao Tong University', en: 'Shanghai, China', degree: 'Bachelor of Architecture', period: '2011 – 2016',
      start: 2011, end: 2016, city: 'Shanghai, China',
      points: ['Architectural Design Major with Literature Minor', 'GPA: 3.43 / 4'],
      tag: 'Bachelor'
    }
  ];

  const positions = [
    {
      org: 'City University of Hong Kong', en: 'Department of Architecture and Civil Engineering', kind: 'Academic', city: 'Hong Kong',
      roles: [
        { title: 'Assistant Professor, PhD Supervisor', period: '12/2022 – present', start: 2022.9, end: null, dept: 'Department of Architecture and Civil Engineering' },
        { title: 'Director, Architectural Intelligence Group (AIG)', period: '12/2022 – present', start: 2022.9, end: null },
        { title: 'Associate Program Leader, Master of Architecture', period: '08/2023 – present', start: 2023.5, end: null },
        { title: 'Associate Program Leader, BSc Architecture and Surveying', period: '08/2023 – 08/2025', start: 2023.5, end: 2025.5 },
        { title: 'Director, AI Fabrication Lab', period: '10/2025 – present', start: 2025.7, end: null }
      ]
    },
    {
      org: 'Shanghai Jiao Tong University', en: 'Hong Kong Alumni Association', kind: 'Academic · Alumni', city: 'Shanghai',
      roles: [
        { title: 'Member of the Council, Hong Kong Alumni Association', period: '11/2024 – present', start: 2024.8, end: null },
        { title: 'Teaching Fellow', period: '09/2020 – 08/2021', start: 2020.6, end: 2021.5 }
      ]
    },
    {
      org: 'Glodon Company Limited', en: 'Glodon Company Limited', kind: 'Industry', city: 'Beijing',
      roles: [{ title: 'Senior Consultant of the CTO Office', period: '09/2020 – 03/2021', start: 2020.6, end: 2021.2 }]
    },
    {
      org: 'University of Pennsylvania', en: 'University of Pennsylvania', kind: 'Academic', city: 'Philadelphia',
      roles: [{ title: 'Lecturer', period: '08/2019 – 12/2020', start: 2019.5, end: 2020.9 }]
    },
    {
      org: 'Tongji University', en: 'Tongji University', kind: 'Academic', city: 'Shanghai',
      roles: [{ title: 'Workshop Tutor', period: '06/2019 – 07/2024', start: 2019.4, end: 2024.5 }]
    },
    {
      org: 'Tsinghua University', en: 'Tsinghua University', kind: 'Research', city: 'Beijing',
      roles: [{ title: 'Research Assistant', period: '09/2017 – 04/2018', start: 2017.6, end: 2018.2 }]
    },
    {
      org: 'University of California, Berkeley', en: 'University of California, Berkeley', kind: 'Research', city: 'Berkeley',
      roles: [{ title: 'Research Assistant', period: '01/2017 – 08/2017', start: 2017.0, end: 2017.5 }]
    }
  ];

  const projects = [
    {
      name: 'BIMMAKE Intelligent Construction Layout Platform', role: 'Principal Investigator (PI)', funder: 'Glodon Technology Co., Ltd.',
      type: 'Industry Project', period: '09/2020 – 03/2021', start: 2020.7, end: 2021.2,
      amount: '120,000 CNY / 17,000 USD', cny: 12, status: 'Completed', tag: 'Industry', cat: 'ind'
    },
    {
      name: 'Green Urban/Building Intelligent Analysis Platform', role: 'Principal Investigator (PI)',
      funder: 'Shanghai Landleaf Building Technology Co., Ltd. & National Development and Reform Commission of PRC',
      type: 'Industry · NDRC', period: '01/2021 – 05/2021', start: 2021.0, end: 2021.3,
      amount: '1,000,000 CNY / 140,000 USD', cny: 100, status: 'Completed', tag: 'Industry', cat: 'ind'
    },
    {
      name: 'Virtual Display Platform of Prefabricated Buildings', role: 'Principal Investigator (PI)',
      funder: 'Insome Technology Co., Ltd.',
      type: 'Industry Project', period: '05/2021 – 01/2022', start: 2021.3, end: 2022.0,
      amount: '2,000,000 CNY / 280,000 USD', cny: 200, status: 'Completed', tag: 'Industry', cat: 'ind'
    },
    {
      name: 'Auto-design Software of Wanda Plaza', role: 'Principal Investigator (PI)',
      funder: 'Wanda Holding Group Co., Ltd. & China Construction Second Bureau Installation Engineering Co., Ltd.',
      type: 'Industry Project', period: '09/2021 – 01/2022', start: 2021.7, end: 2022.0,
      amount: '500,000 CNY / 70,000 USD', cny: 50, status: 'Completed', tag: 'Industry', cat: 'ind'
    },
    {
      name: 'Predicting the residential environment preferences of different age and gender groups in Hong Kong through machine learning',
      role: 'Principal Investigator (PI)', funder: 'University Grants Committee (UGC) of Hong Kong',
      type: 'Research Matching Grant Scheme (RMGS)', period: '06/2023 – 05/2025', start: 2023.4, end: 2025.4,
      amount: '200,000 HKD / 25,000 USD', cny: 18.4, status: 'Completed', tag: 'Competitive Grant', cat: 'fund'
    },
    {
      name: 'Predicting the disaster warning and optimizing the grey infrastructure of flood control and stormwater management systems based on machine learning',
      role: 'Project Coordinator (PC)', funder: 'City University of Hong Kong',
      type: 'Departmental Strategic Research Development Fund', period: '07/2023 – 06/2025', start: 2023.5, end: 2025.5,
      amount: '150,000 HKD / 20,000 USD', cny: 13.8, status: 'Completed', tag: 'University Grant', cat: 'school'
    },
    {
      name: 'Improving the urban development of Hong Kong through artificial intelligence: increasing the consumer quality as an example',
      role: 'Principal Investigator (PI)', funder: 'City University of Hong Kong',
      type: 'New Faculty Start-up Grant', period: '10/2023 – 03/2027', start: 2023.7, end: 2027.2,
      amount: '1,500,000 HKD / 200,000 USD', cny: 138, status: 'On-going', tag: 'University Grant', cat: 'school'
    },
    {
      name: 'Dynamic assessment method of carbon emissions for green and low-carbon campus building renovation based on scan-to-BIM',
      role: 'Co-Investigator (Co-I)', funder: 'Guangdong Basic and Applied Basic Research Foundation',
      type: 'Natural Science Foundation Project (General Project)', period: '01/2024 – 12/2026', start: 2024.0, end: 2026.9,
      amount: '150,000 CNY / 20,000 USD', cny: 15, status: 'On-going', tag: 'Competitive Grant', cat: 'fund'
    },
    {
      name: 'Indoor ventilation planning methods and technologies for multimodal regulation and correlation of large-scale exhibition buildings in subtropical regions',
      role: 'Co-Investigator (Co-I)', funder: 'State Key Laboratory of Subtropical Building and Urban Science',
      type: 'Independent Research (Key Project)', period: '09/2025 – 08/2027', start: 2025.7, end: 2027.6,
      amount: '430,000 CNY / 62,000 USD', cny: 43, status: 'On-going', tag: 'Key Laboratory', cat: 'fund'
    },
    {
      name: 'Generative futures: AI in architectural design', role: 'Principal Investigator (PI)',
      funder: 'Hong Kong Institute of Architects', type: 'UABB 2025 Exhibition Fund',
      period: '09/2025 – 01/2026', start: 2025.7, end: 2025.9,
      amount: '40,000 HKD / 5,000 USD', cny: 3.7, status: 'Completed', tag: 'Exhibition Fund', cat: 'school'
    },
    {
      name: 'Empowering low-carbon retrofitting of Guangzhou school rooftops with new quality productive forces: a photovoltaic potential assessment and decision-making mechanism based on "low-altitude sensing + AI"',
      role: 'Co-Investigator (Co-I)', funder: 'Guangzhou Federation of Social Science Associations',
      type: 'Philosophy and Social Science Planning (Annual Project)', period: '09/2026 – 04/2028', start: 2026.7, end: 2028.3,
      amount: '20,000 CNY / 3,000 USD', cny: 2, status: 'On-going', tag: 'Social Science Program', cat: 'fund'
    },
    {
      name: 'Nature-inspired design of high-performance building cantilever structures',
      role: 'Principal Investigator (PI)', funder: 'University Grants Committee (UGC) of Hong Kong',
      type: 'Early Career Scheme (ECS)', period: '01/2027 – 12/2029', start: 2027.0, end: 2029.9,
      amount: '954,000 HKD / 120,000 USD', cny: 87.8, status: 'Awarded (On-going)', tag: 'Competitive Grant', cat: 'fund'
    },
    {
      name: 'Nature-inspired design of high-performance building cantilever structures',
      role: 'Principal Investigator (PI)', funder: 'City University of Hong Kong',
      type: 'Internal Funds for RGC Grants', period: '01/2027 – 12/2029', start: 2027.0, end: 2029.9,
      amount: '47,700 HKD / 6,000 USD', cny: 4.4, status: 'Awarded (On-going)', tag: 'University Grant', cat: 'school'
    }
  ];

  const patents = [
    { date: '2023-07-18', year: 2023, name: 'A method and system for automatically generating apartment floor plans', no: 'ZL201910952689.0[P]', authors: 'Zheng, Hao', kind: 'Invention Patent' },
    { date: '2024-05-17', year: 2024, name: 'Building atmosphere evaluation methods, systems, equipment and media based on the improved VGG16 model', no: 'ZL202410061106.6[P]', authors: 'Chen, Zong; Liang, Haixiu; Hao Zheng; Jiang, Lei; Lin, Zexuan', kind: 'Invention Patent' },
    { date: '2024-07-26', year: 2024, name: 'A decision-making method for low-carbon building design in hot summer and warm winter areas based on GAN and GA', no: 'ZL202410485368.5[P]', authors: 'Ni, Yang; Wei, Jin; Hao Zheng', kind: 'Invention Patent' },
    { date: '2024-12-27', year: 2024, name: 'A computational decision support method and system for adaptive architectural cavity design', no: 'ZL202411207995.9[P]', authors: 'Ni, Yang; Wei, Jin; Hao Zheng', kind: 'Invention Patent' },
    { date: '2025-01-23', year: 2025, name: 'Methods, Systems, and Computer Readable Media for Generating Structural Forms Using Machine Learning', no: 'US20250028871A1[P]', authors: 'Akbarzadeh, Masoud; Hao Zheng', kind: 'US Patent' },
    { date: '2025-04-04', year: 2025, name: 'Multi-objective optimization method for university campus planning and design based on cGAN and NSGA-II', no: 'ZL202411814738.1[P]', authors: 'Wei, Jin; Ni, Yang; Hao Zheng', kind: 'Invention Patent' },
    { date: '2025-05-30', year: 2025, name: 'Embodied perception evaluation method and system for campus green space based on multimodal learning', no: 'ZL202510358454.4[P]', authors: 'Wei, Jin; Hao Zheng; Liang, Haixiu; Liu, Kai; Yuan, Man; Yin, Shi', kind: 'Invention Patent' },
    { date: '2025-09-05', year: 2025, name: 'A multimodal fusion method for evaluating natural ventilation in tall atriums of exhibition buildings', no: 'ZL202510901801.3[P]', authors: 'Ni, Yang; Luo, Jianhe; Tang, Haida; Hao Zheng; Qiu, Yue; Wei, Jin', kind: 'Invention Patent' },
    { date: '2025-11-04', year: 2025, name: 'A method and system for intelligent assessment of outdoor thermal comfort mediated by psychological state', no: 'ZL202511159670.2[P]', authors: 'Wei, Jin; Ni, Yang; Liu, Xiao; Liang, Haixiu; Liu, Kai; Hao Zheng', kind: 'Invention Patent' },
    { date: '2026-03-17', year: 2026, name: 'A method for optimizing the layout of small green spaces for all ages based on spatiotemporal data models', no: 'ZL202511993633.1[P]', authors: 'Wei, Jin; Ni, Yang; Deng, Mengren; Hao Zheng', kind: 'Invention Patent' },
    { date: '2026-04-21', year: 2026, name: 'A method for assessing the synergistic restoration effects of campus building and landscape transition', no: 'ZL202610116979.1[P]', authors: 'Wei, Jin; Ni, Yang; Liu, Xiao; Luo, Jianhe; Hao Zheng', kind: 'Invention Patent' },
    { date: '2026-10-21', year: 2026, name: 'Intelligent Auxiliary Design System for Wind- and Thermal-Driven Building Ventilation Cavities V1.0', no: '2026SR1060324[CP/OL]', authors: 'Ni, Yang; Wei, Jin; Luo, Jianhe; Hao Zheng; Tang, Haida; Lin, Run; Deng, Xinyu; Jiang, Yi; Xu, Yinghong; Yan, Shuchao; Wang, Yanhuan', kind: 'Software Copyright' }
  ];

  const awards = [
    { year: 2026, date: '2026-10-07', name: 'World\'s Top 2% Scientists (Single-Year 2026)', org: 'Stanford University / Elsevier', cat: 'research', note: 'Single-Year 2026 list' },
    { year: 2026, date: '2026-08-15', name: 'Silver Medal', org: 'Silicon Valley International Invention Festival 2026', cat: 'invention', people: 'Ni Yang, Jin Wei, Hao Zheng' },
    { year: 2026, date: '2026-08-16', name: 'RIVA Special Award', org: 'Silicon Valley International Invention Festival 2026', cat: 'invention', people: 'Ni Yang, Jin Wei, Hao Zheng' },
    { year: 2025, date: '2025 Fall', name: 'Recognition of Outstanding Teaching Performance (Top 5%)', org: 'City University of Hong Kong', cat: 'teaching', note: 'Semester A, 2025/26' },
    { year: 2023, date: '2023 Fall', name: 'Recognition of Outstanding Teaching Performance (Top 5%)', org: 'City University of Hong Kong', cat: 'teaching', note: 'Semester A, 2023/24' },
    { year: 2019, date: '2019-07-08', name: 'Best Presentation Award', org: 'Digital Futures Annual Conference', cat: 'research' },
    { year: 2018, date: '2018-10-20', name: 'Student Scholarship Award', org: 'Association for Computer Aided Design in Architecture (ACADIA)', cat: 'research' },
    { year: 2017, date: '2017-03-03', name: 'Final Student Recognition Award', org: 'University of California, Berkeley', cat: 'research', people: 'Zheng, Hao; Yuepeng Li; Yuanfang Lu' },
    { year: 2014, date: '2014-09-01', name: 'Finalist Award (Top 30)', org: 'The 3rd zhulong.com National Student Exhibition of Architectural and Environmental Design', cat: 'design' },
    { year: 2013, date: '2013-08-01', name: 'Finalist Award (Top 10)', org: 'The 1st DADA Digital Future – Digital Construction Design Competition', cat: 'design', people: 'Zheng, Hao; Yang Liang' },
    { year: 2012, date: '2012-05-01', name: 'Excellence Award', org: 'The 6th Huacheng Cup Design & Construction Competition', cat: 'design' },
    { year: 2010, date: '2010-12-01', name: 'Provincial and National First Prize', org: 'The 16th National Olympiad in Informatics in Provinces (NOIP)', cat: 'contest' },
    { year: 2010, date: '2010-05-01', name: 'Bronze Medal', org: 'The 4th Asia-Pacific Informatics Olympiad (APIO)', cat: 'contest' },
    { year: 2009, date: '2009-12-01', name: 'Provincial and National First Prize', org: 'The 15th National Olympiad in Informatics in Provinces (NOIP)', cat: 'contest' },
    { year: 2009, date: '2009-07-01', name: 'National Third Prize', org: 'The 26th National Olympiad in Informatics (NOI)', cat: 'contest' }
  ];

  const exhibitions = [
    { period: '2025.12.16 – 2026.01.24', name: 'Hong Kong & Shenzhen Bi-City Biennale of Urbanism/Architecture (UABB) 2025', host: 'Hosted by the Hong Kong Institute of Architects (HKIA)', year: 2025, type: 'Research Exhibition' }
  ];

  const teaching = {
    undergradCourses: [
      { name: 'Innovative Thinking and Modern Design', code: 'ME903', school: 'Shanghai Jiao Tong University', term: '2021 Spring', lead: true },
      { name: 'Construction Contract and Management', code: 'CA3686', school: 'City University of Hong Kong', term: '2023 Spring' },
      { name: 'Structural Systems and Materials', code: 'CA29506', school: 'City University of Hong Kong', term: '2023 Spring', lead: true },
      { name: 'Innovations in Construction Technology', code: 'CA3171', school: 'City University of Hong Kong', term: '2023/2024/2025 Spring', lead: true },
      { name: 'Professionals and Society', code: 'CA2066', school: 'City University of Hong Kong', term: '2027 Spring' }
    ],
    masterCourses: [
      { name: 'Contemporary Theory', code: 'ARCH710', school: 'University of Pennsylvania', term: '2019/2020 Fall' },
      { name: 'Special Topic in Design Rendering', code: 'MADM26', school: 'Macau University of Science and Technology', term: '2020 Spring', lead: true },
      { name: 'Parametric Design and Digital Construction', code: 'AR26003', school: 'Shanghai Jiao Tong University', term: '2021 Spring', lead: true },
      { name: 'Advanced Digital Construction', code: 'CA5563', school: 'City University of Hong Kong', term: '2023/2024/2025/2026 Fall', lead: true },
      { name: 'Geographic Data Management and Planning Analysis', code: 'CA6241', school: 'City University of Hong Kong', term: '2024 Spring' },
      { name: 'Advanced Architectural Design Studio: Digital Architecture', code: 'CA5201', school: 'City University of Hong Kong', term: '2024/2025/2026 Fall', lead: true },
      { name: 'Research Methods & Thesis Development Seminar in Architecture', code: 'CA5203', school: 'City University of Hong Kong', term: '2025/2026/2027 Spring', lead: true },
      { name: 'Theory and Criticism of Architecture', code: 'CA6302', school: 'City University of Hong Kong', term: '2025 Fall' },
      { name: 'Advanced Topics in Computational Design', code: 'CA6701', school: 'City University of Hong Kong', term: '2026 Spring', lead: true }
    ],
    workshops: [
      { name: 'DigitalFUTURES Summer Workshop', school: 'Tongji University', term: '2019/2020/2021/2022/2023/2024', lead: true },
      { name: 'Summer Workshop', school: 'Hefei University of Technology', term: '2021', lead: true }
    ],
    studios: [
      { name: 'Transportation Architecture Joint Graduation Design', school: 'Shanghai Jiao Tong University', term: 'Class of 2021' },
      { name: 'Final Year Project', school: 'City University of Hong Kong', term: 'Class of 2024/2027' },
      { name: 'Final Year Design Research Project', school: 'City University of Hong Kong', term: 'Class of 2024/2025' }
    ],
    masterTheses: [
      { name: 'Dissertation', school: 'Shanghai Jiao Tong University', term: 'Class of 2021/2022' },
      { name: 'Dissertation', school: 'City University of Hong Kong', term: 'Class of 2024/2025/2026/2027' },
      { name: 'Architectural Design Studio', school: 'City University of Hong Kong', term: 'Class of 2026', lead: true }
    ],
    phd: [
      { name: 'Zhe Lai', school: 'Co-advising with South China University of Technology & CityU', cohort: '2024', note: 'Graduated' },
      { name: 'Keke Li', school: 'Co-advising with Tongji University & CityU', cohort: '2026' },
      { name: 'Yinghua Ji', school: 'City University of Hong Kong', cohort: '2027' },
      { name: 'Jiaxuan Zhu', school: 'City University of Hong Kong', cohort: '2027' },
      { name: 'Nai Wei', school: 'Co-advising with Tongji University & CityU', cohort: '2027' },
      { name: 'Pei Xu', school: 'City University of Hong Kong', cohort: '2028' },
      { name: 'Jianru Yang', school: 'Co-advising with East China Normal University & CityU', cohort: '2028' },
      { name: 'Youran Gu', school: 'City University of Hong Kong', cohort: '2029' }
    ],
    awards: [
      { name: 'Recognition of Outstanding Teaching Performance (Top 5%)', school: 'City University of Hong Kong', term: 'Semester A, 2023/24' },
      { name: 'Recognition of Outstanding Teaching Performance (Top 5%)', school: 'City University of Hong Kong', term: 'Semester A, 2025/26' }
    ],
    exhibitions: [
      { period: '2026.08.08 – 2026.08.13', name: '“Year-end Show 2026”', host: 'Hosted by City University of Hong Kong' },
      { period: '2025.05.24 – 2025.06.01', name: '“Year-end Show 2025”', host: 'Hosted by City University of Hong Kong' },
      { period: '2024.06.11 – 2024.06.19', name: '“Year-end Show 2024”', host: 'Hosted by City University of Hong Kong' },
      { period: '2024.04.22 – 2024.06.28', name: '“Notre-Dame (Re)births”', host: 'Hosted by the Consulate General of France in Hong Kong and Macau' },
      { period: '2023.06.08 – 2023.06.17', name: '“Year-end Show 2023”', host: 'Hosted by City University of Hong Kong' }
    ]
  };

  const service = {
    editorial: [
      { name: 'Building and Environment', tag: 'SCI' },
      { name: 'Architectural Intelligence', tag: 'Journal' },
      { name: 'Perspectives in Architecture and Urbanism', tag: 'Journal' }
    ],
    panels: [
      'Natural Sciences and Engineering Research Council of Canada (NSERC) – Discovery Grant',
      'Canada Foundation for Innovation (CFI) – John R. Evans Leaders Fund',
      'Austrian Science Fund (FWF) – FWF ASTRA Awards',
      'The University of Hong Kong (HKU) – Special Projects Fund',
      'VinFuture Foundation of Vietnam – VinFuture Prize',
      'The Acoustical Society of China – National Soundscape Design Competition',
      'Muses Education – Hong Kong Children Architectural Design Competition'
    ],
    conferences: [
      'Association for Computer Aided Design in Architecture (ACADIA2022)',
      'Asian Smart Cities Network and Digital Twin Symposium (ASCNDTS2023)',
      'International Conference on Construction Engineering and Project Management (ICCEPM2024)',
      'Computational Design and Robotic Fabrication (CDRF 2024)',
      'International Conference on Computational Design (CCD 2024)',
      'Computer Aided Architecture Design Futures (CAAD Futures 2025)',
      'Cold Climate HVAC & Energy 2025'
    ],
    societies: [
      'The Association for Computer Aided Design in Architecture',
      'Education and Research in Computer Aided Architectural Design in Europe',
      'The Association for Computer-Aided Architectural Design Research in Asia',
      'The Computational Design Academic Committee of the Architectural Society of China',
      'DigitalFUTURES'
    ],
    reviewers: window.CV ? window.CV.service.reviewers : []
  };

  /* ---------- 叙事节点（英文版） ---------- */
  const milestones = [
    { year: 2009, month: 7, cat: 'award', kicker: 'Origins · Informatics', title: 'National Third Prize, National Olympiad in Informatics (NOI)', desc: 'Competitive programming became the entry point: NOI national third prize and two NOIP provincial & national first prizes — the seed of “architecture × AI”.', dur: 2600 },
    { year: 2011, month: 9, cat: 'edu', kicker: 'Bachelor · Shanghai Jiao Tong University', title: 'Entered Shanghai Jiao Tong University, Bachelor of Architecture', desc: 'Major in architectural design with a minor in literature — engineering and humanities from day one.', dur: 2200 },
    { year: 2014, month: 9, cat: 'award', kicker: 'Design Beginnings', title: 'Finalist (Top 30), zhulong.com National Student Exhibition', desc: 'Three consecutive design awards in the bachelor years: Huacheng Cup Excellence Award (2012), DADA Digital Construction Top 10 (2013), and this national Top 30 (2014).', dur: 2400 },
    { year: 2016, month: 9, cat: 'edu', kicker: 'Master · UC Berkeley', title: 'Entered UC Berkeley, Master of Architecture (GPA 3.98/4)', desc: 'Shifted toward computational design and digital fabrication; taught a Rhino & Grasshopper tutorial at SJTU in April.', dur: 2600 },
    { year: 2017, month: 1, cat: 'work', kicker: 'First Research Post', title: 'Research Assistant, University of California, Berkeley', desc: 'Robotic assembly research (Jan–Aug); received the Berkeley Final Student Recognition Award in March.', dur: 2400 },
    { year: 2017, month: 9, cat: 'work', kicker: 'To the Frontier', title: 'Research Assistant, Tsinghua University', desc: 'Machine learning and bio-inspired 3D printing (until 04/2018); gave “Machine Learning for Architects” at Tsinghua.', dur: 2400 },
    { year: 2018, month: 8, cat: 'edu', kicker: 'PhD · University of Pennsylvania', title: 'Entered Penn’s PhD in Architecture (fully funded)', desc: 'Machine learning in architectural design; four CAADRIA 2018 papers in one conference, plus the ACADIA Student Scholarship Award.', dur: 2800 },
    { year: 2019, month: 6, cat: 'work', kicker: 'Teaching & Research', title: 'Workshop Tutor at Tongji · Lecturer at Penn', desc: 'Tongji DigitalFUTURES workshop tutor from June (2019–2024); Penn lecturer from August; Best Presentation Award at Digital Futures in July.', dur: 2600 },
    { year: 2020, month: 9, cat: 'work', kicker: 'Crossing into Industry', title: 'Senior Consultant, Glodon CTO Office · first industry grant', desc: 'BIMMAKE intelligent construction layout project launched (CNY 120k); also teaching fellow at SJTU. 11 papers and 7 talks that year.', dur: 2800 },
    { year: 2021, month: 1, cat: 'project', kicker: 'Million-CNY Projects', title: 'Three industry projects incl. a CNY 1M platform', desc: 'Green urban platform (CNY 1M), prefabricated building display (CNY 2M) and Wanda Plaza auto-design (CNY 0.5M).', dur: 3000 },
    { year: 2022, month: 4, cat: 'paper', kicker: 'Doctoral Output', title: 'PhD defence · Advanced Science cover paper', desc: '“Geometry and Topology: Building Machine Learning Surrogate Models with Graphic Statics Method”; the dragonfly-wing study made the cover of Advanced Science (IF 14.1).', dur: 3000 },
    { year: 2022, month: 12, cat: 'work', kicker: 'The Pivotal Move', title: 'Joined City University of Hong Kong as Assistant Professor', desc: 'Founded the Architectural Intelligence Group (AIG); began the independent PI phase in December 2022.', dur: 3400 },
    { year: 2023, month: 6, cat: 'project', kicker: 'Competitive Funding', title: 'UGC RMGS (HKD 200k) · Start-up Grant (HKD 1.5M)', desc: 'RMGS as PI in June, departmental strategic fund as PC in July, New Faculty Start-up (HKD 1.5M) in October; became Associate Program Leader in August.', dur: 3200 },
    { year: 2023, month: 5, cat: 'talk', kicker: 'Academic Reach', title: '29 invited talks in a single year', desc: 'From ETH and Imperial to Herzog & de Meuron and Alibaba A.I. Labs; 11 papers and 6 patents in the same period.', dur: 3000 },
    { year: 2024, month: 1, cat: 'project', kicker: 'Greater Bay Area', title: 'Guangdong Natural Science Foundation (Co-I)', desc: 'Scan-to-BIM carbon assessment for green campus renovation; elected to the SJTU Hong Kong Alumni Council in November.', dur: 2600 },
    { year: 2024, month: 11, cat: 'talk', kicker: 'Peak Year', title: '30 invited talks · 8 publications', desc: 'Queensland, Imperial, Oxford China Forum, AtkinsRéalis and more; patents reached four.', dur: 2800 },
    { year: 2025, month: 8, cat: 'work', kicker: 'Building Platforms', title: 'Associate Program Leader (MArch) · Director, AI Fabrication Lab', desc: 'Took charge of the AI Fabrication Lab in October; received CityU’s Outstanding Teaching Recognition (Top 5%) in August.', dur: 2800 },
    { year: 2025, month: 9, cat: 'project', kicker: 'Major Award', title: 'State Key Lab key project (CNY 430k) · UABB 2025 fund', desc: 'Exhibition-building ventilation research funded; the Bi-City Biennale UABB 2025 opened in December.', dur: 3000 },
    { year: 2025, month: 12, cat: 'paper', kicker: 'Publication Peak', title: '13 papers · 5 patents in one year', desc: 'Advanced Engineering Informatics, Building and Environment, Cities and others; patent portfolio reached twelve.', dur: 2800 },
    { year: 2026, month: 8, cat: 'award', kicker: 'International Recognition', title: 'Silver Medal + RIVA Special Award, Silicon Valley', desc: 'The wind- and thermal-driven ventilation cavity design system won two awards at the Silicon Valley International Invention Festival.', dur: 3000 },
    { year: 2026, month: 10, cat: 'award', kicker: 'The Summit', title: 'Stanford/Elsevier World’s Top 2% Scientists', desc: 'Named among the World’s Top 2% Scientists (Single-Year 2026), with 14 papers — a personal record — in the same year.', dur: 3600 },
    { year: 2027, month: 1, cat: 'project', kicker: 'Future · Awarded', title: 'UGC Early Career Scheme (HKD 954k) begins', desc: 'Nature-inspired design of high-performance building cantilever structures, 01/2027–12/2029, plus HKD 47.7k in internal RGC matching funds.', dur: 3200 },
    { year: 2029, month: 6, cat: 'future', kicker: 'Forecast', title: 'All current fully-supervised PhD graduates · team scales up', desc: 'The model projects a compounding phase: 14–18 papers per year, ~20 patents in total and ~CNY 9M in cumulative funding.', dur: 3000 },
    { year: 2031, month: 12, cat: 'future', kicker: 'Forecast', title: 'An international leader in architectural intelligence', desc: 'Projected: AIG and the AI Fabrication Lab anchor a complete research portfolio — generative design, intelligent construction, urban computing.', dur: 3200 }
  ];

  return { profile, education, positions, projects, patents, awards, exhibitions, teaching, service, milestones };
})();

/* ---------- 英文论文与讲座 ---------- */
window.CV2_EN = (function () {
  'use strict';

  const ROLE = {
    '第一作者': 'First author',
    '通讯作者': 'Corresponding author',
    '合作者': 'Co-author',
    '第一作者 · 通讯作者': 'First & corresponding author',
    '作者': 'Author'
  };
  const JCR = {
    '中科院一区': 'CAS Q1',
    '中科院二区': 'CAS Q2',
    '中科院三区': 'CAS Q3',
    '中科院四区': 'CAS Q4',
    'SSCI中科院一区': 'SSCI · CAS Q1',
    'AHCI中科院一区': 'AHCI · CAS Q1',
    'AHCI中科院四区': 'AHCI · CAS Q4',
    'CSSCI': 'CSSCI',
    'CSCD': 'CSCD',
    'CiteScore': 'CiteScore',
    'EI': 'EI',
    '会议': 'Conference',
    '博士论文': 'Dissertation'
  };

  const src = (window.CV2 && window.CV2.papers) || [];
  const papers = src.map(p => Object.assign({}, p, {
    r: ROLE[p.r] || p.r,
    j: JCR[p.j] || p.j,
    note: p.note === '封面论文' ? 'Cover feature' : p.note
  }));

  return { papers: papers, talks: (window.CV2 && window.CV2.talks) || [] };
})();
