/* ============================================================
   郑豪 简历数据集 · 核心档案
   来源：郑豪简历.pdf（21 页，2026 年 11 月版）
   ============================================================ */
window.CV = (function () {
  'use strict';

  /* ---------- 基本信息 ---------- */
  const profile = {
    name: '郑豪',
    enName: 'Hao Zheng',
    title: '助理教授 · 博士生导师',
    affiliation: '香港城市大学 建筑学及土木工程学系',
    roles: [
      '助理教授 · 博士生导师（12/2022 至今）',
      '建筑学硕士课程副主任（08/2023 至今）',
      '建筑智能研究组（AIG）主任（12/2022 至今）',
      '人工智能建造实验室主任（10/2025 至今）'
    ],
    address: 'Room B6418, YEUNG Building, 83 Tat Chee Avenue, City University of Hong Kong, Kowloon, Hong Kong',
    phone: '+86 18817555682（微信同号）',
    email: 'zhhao@alumni.upenn.edu',
    homepage: 'https://www.architecturalintelligence.group/',
    intro: [
      '郑豪教授现任香港城市大学建筑学及土木工程学系助理教授、建筑学硕士课程副主任，同时担任建筑智能研究组及人工智能建造实验室主任。他毕业于美国宾夕法尼亚大学，获博士学位，研究方向涵盖机器学习、生成式人工智能、数据驱动式设计及大数据分析。他拥有美国加州大学伯克利分校建筑学硕士学位，以及上海交通大学建筑学与文学学士学位。',
      '在加入香港城市大学之前，郑豪教授曾在清华大学及加州大学伯克利分校从事研究工作，主要研究方向包括机械臂辅助施工、机器学习及仿生式 3D 打印。他拥有丰富的教学经验，曾担任同济大学工作营导师、宾夕法尼亚大学讲师及上海交通大学设计实践导师。',
      '郑豪教授积极参与国际学术交流与学术共同体建设，曾担任 ACADIA、CAADRIA、CDRF 等国际学术会议共同组织者及审稿人，并为 50 余种 SCI、SSCI 及 AHCI 收录期刊提供审稿服务。他已发表约 80 篇学术论文，其中包括 30 余篇发表于 SCI、SSCI 或 AHCI 收录期刊的论文，其研究成果还曾登上国际知名期刊《Advanced Science》的封面。',
      '郑豪教授主持的科研及产业合作项目经费总额超过 100 万美元，其中包括获得香港大学教育资助委员会（UGC）的杰出青年学者计划（ECS）支持的研究项目。他在科研与教学方面屡获殊荣，其中包括入选由斯坦福大学与爱思唯尔联合发布的“2026 年度全球前 2% 顶尖科学家”榜单。',
      '在学术与教学工作中，郑豪教授已讲授 40 余门课程，指导 10 余名博士生，并受邀在国际学术会议及学术组织发表演讲 120 余场。此外，他还曾担任学术期刊编辑、参与学术团体工作，并为多家上市公司提供专家咨询服务。'
    ],
    research: [
      { icon: '◈', title: '机器学习 · 数据挖掘与分析', desc: '预测与模拟：以数据驱动方式建立建筑与城市的可计算模型' },
      { icon: '◉', title: '生成式人工智能', desc: '创造性 AI 模型 · 人工智能设计师' },
      { icon: '◇', title: '数据驱动式设计', desc: '计算性设计 · 参数化设计' },
      { icon: '▣', title: '大数据分析', desc: '城市建模 · 城市形态优化' }
    ],
    highlights: [
      { value: 84, suffix: ' 篇', label: '学术论文（含 SCI/SSCI/AHCI 39 篇）' },
      { value: 12, suffix: ' 项', label: '发明专利与软件著作权' },
      { value: 13, suffix: ' 项', label: '主持 / 参与科研项目' },
      { value: 122, suffix: ' 场', label: '受邀学术讲座' }
    ]
  };

  /* ---------- 教育经历 ---------- */
  const education = [
    {
      school: '宾夕法尼亚大学', en: 'University of Pennsylvania', degree: '建筑学博士', period: '2018 – 2022',
      start: 2018, end: 2022, city: 'Philadelphia, USA',
      points: ['研究方向：人工智能与建筑设计', 'PennDesign Fellowship 全额奖学金'],
      tag: '博士'
    },
    {
      school: '加州大学伯克利分校', en: 'University of California, Berkeley', degree: '建筑学硕士', period: '2016 – 2017',
      start: 2016, end: 2017, city: 'Berkeley, USA',
      points: ['方向：参数化设计与数字建造', 'GPA 3.98 / 4'],
      tag: '硕士'
    },
    {
      school: '上海交通大学', en: 'Shanghai Jiao Tong University', degree: '建筑学学士', period: '2011 – 2016',
      start: 2011, end: 2016, city: 'Shanghai, China',
      points: ['主修建筑设计，辅修文学', 'GPA 3.43 / 4'],
      tag: '学士'
    }
  ];

  /* ---------- 工作与任职经历 ---------- */
  const positions = [
    {
      org: '香港城市大学', en: 'City University of Hong Kong', kind: '学术', city: 'Hong Kong',
      roles: [
        { title: '助理教授、博士生导师', period: '12/2022 – 至今', start: 2022.9, end: null, dept: '建筑学及土木工程学系' },
        { title: '建筑智能研究组（AIG）主任', period: '12/2022 – 至今', start: 2022.9, end: null },
        { title: '建筑学硕士项目副主任', period: '08/2023 – 至今', start: 2023.5, end: null },
        { title: '建筑学本科项目副主任', period: '08/2023 – 08/2025', start: 2023.5, end: 2025.5 },
        { title: '人工智能建造实验室主任', period: '10/2025 – 至今', start: 2025.7, end: null }
      ]
    },
    {
      org: '上海交通大学', en: 'Shanghai Jiao Tong University', kind: '学术 · 校友', city: 'Shanghai',
      roles: [
        { title: '香港校友会理事会理事', period: '11/2024 – 至今', start: 2024.8, end: null },
        { title: '设计实践导师', period: '09/2020 – 08/2021', start: 2020.6, end: 2021.5 }
      ]
    },
    {
      org: '广联达科技股份有限公司', en: 'Glodon Company Limited', kind: '产业', city: 'Beijing',
      roles: [{ title: 'CTO 办公室高级顾问', period: '09/2020 – 03/2021', start: 2020.6, end: 2021.2 }]
    },
    {
      org: '宾夕法尼亚大学', en: 'University of Pennsylvania', kind: '学术', city: 'Philadelphia',
      roles: [{ title: '讲师', period: '08/2019 – 12/2020', start: 2019.5, end: 2020.9 }]
    },
    {
      org: '同济大学', en: 'Tongji University', kind: '学术', city: 'Shanghai',
      roles: [{ title: '工作营导师', period: '06/2019 – 07/2024', start: 2019.4, end: 2024.5 }]
    },
    {
      org: '清华大学', en: 'Tsinghua University', kind: '研究', city: 'Beijing',
      roles: [{ title: '研究助理', period: '09/2017 – 04/2018', start: 2017.6, end: 2018.2 }]
    },
    {
      org: '加州大学伯克利分校', en: 'University of California, Berkeley', kind: '研究', city: 'Berkeley',
      roles: [{ title: '研究助理', period: '01/2017 – 08/2017', start: 2017.0, end: 2017.5 }]
    }
  ];

  /* ---------- 科研项目 ---------- */
  const projects = [
    {
      name: 'BIMMAKE 智能场布', role: '项目负责人', funder: '广联达科技股份有限公司',
      type: '企业委托', period: '2020.09 – 2021.03', start: 2020.7, end: 2021.2,
      amount: '12 万元人民币', cny: 12, status: '已结题', tag: '产业合作'
    },
    {
      name: '绿色城区 / 建筑智慧评估和方案分析平台', role: '项目负责人',
      funder: '上海朗绿建筑科技股份有限公司、中华人民共和国国家发改委',
      type: '企业委托 · 国家发改委', period: '2021.01 – 2021.05', start: 2021.0, end: 2021.3,
      amount: '100 万元人民币', cny: 100, status: '已结题', tag: '产业合作'
    },
    {
      name: '装配式建筑虚拟展示和定制化', role: '项目负责人', funder: '应舍美居（深圳）科技有限公司',
      type: '企业委托', period: '2021.05 – 2022.01', start: 2021.3, end: 2022.0,
      amount: '200 万元人民币', cny: 200, status: '已结题', tag: '产业合作'
    },
    {
      name: '万达广场智能辅助设计', role: '项目负责人', funder: '万达控股集团有限公司、中建二局安装工程有限公司',
      type: '企业委托', period: '2021.09 – 2022.01', start: 2021.7, end: 2022.0,
      amount: '50 万元人民币', cny: 50, status: '已结题', tag: '产业合作'
    },
    {
      name: 'Predicting the residential environment preferences of different age and gender groups in Hong Kong through machine learning',
      role: 'Principal Investigator (PI)', funder: 'University Grants Committee (UGC) of Hong Kong',
      type: 'Research Matching Grant Scheme (RMGS)', period: '06/2023 – 05/2025', start: 2023.4, end: 2025.4,
      amount: '200,000 HKD', cny: 18.4, status: '已完成', tag: '竞争性基金'
    },
    {
      name: 'Predicting the disaster warning and optimizing the grey infrastructure of flood control and stormwater management systems based on machine learning',
      role: 'Project Coordinator (PC)', funder: 'City University of Hong Kong',
      type: 'Departmental Strategic Research Development Fund', period: '07/2023 – 06/2025', start: 2023.5, end: 2025.5,
      amount: '150,000 HKD', cny: 13.8, status: '已完成', tag: '校级基金'
    },
    {
      name: 'Improving the urban development of Hong Kong through artificial intelligence: increasing the consumer quality as an example',
      role: 'Principal Investigator (PI)', funder: 'City University of Hong Kong',
      type: 'New Faculty Start-up Grant', period: '10/2023 – 03/2027', start: 2023.7, end: 2027.2,
      amount: '1,500,000 HKD', cny: 138, status: '进行中', tag: '校级基金'
    },
    {
      name: '基于 Scan-to-BIM 的绿色低碳校园既有建筑更新碳排放动态评估方法研究',
      role: '共同项目研究人', funder: '广东省基础与应用基础研究基金委员会',
      type: '自然科学基金项目（面上项目）', period: '2024.01 – 2026.12', start: 2024.0, end: 2026.9,
      amount: '15 万元人民币', cny: 15, status: '进行中', tag: '竞争性基金'
    },
    {
      name: '亚热带大型会展建筑多模态调控关联的室内通风规划方法与技术',
      role: '共同项目研究人', funder: '亚热带建筑与城市科学全国重点实验室',
      type: '自主研究课题（重点项目）', period: '2025.09 – 2027.08', start: 2025.7, end: 2027.6,
      amount: '43 万元人民币', cny: 43, status: '进行中', tag: '重点实验室'
    },
    {
      name: 'Generative futures: AI in architectural design', role: 'Principal Investigator (PI)',
      funder: 'Hong Kong Institute of Architects', type: 'UABB 2025 Exhibition Fund',
      period: '09/2025 – 01/2026', start: 2025.7, end: 2025.9,
      amount: '40,000 HKD', cny: 3.7, status: '已完成', tag: '展览基金'
    },
    {
      name: '新质生产力赋能广州校园屋顶低碳更新：基于“低空感知+AI”的光伏潜力评价与决策机制',
      role: '共同项目研究人', funder: '广州市社会科学界联合会',
      type: '哲学社会科学规划年度常规课题', period: '2026.09 – 2028.04', start: 2026.7, end: 2028.3,
      amount: '2 万元人民币', cny: 2, status: '进行中', tag: '社科规划'
    },
    {
      name: 'Nature-inspired design of high-performance building cantilever structures',
      role: 'Principal Investigator (PI)', funder: 'University Grants Committee (UGC) of Hong Kong',
      type: 'Early Career Scheme (ECS) · 杰出青年学者计划', period: '01/2027 – 12/2029', start: 2027.0, end: 2029.9,
      amount: '954,000 HKD', cny: 87.8, status: '在研（已立项）', tag: '竞争性基金'
    },
    {
      name: 'Nature-inspired design of high-performance building cantilever structures',
      role: 'Principal Investigator (PI)', funder: 'City University of Hong Kong',
      type: 'Internal Funds for RGC Grants', period: '01/2027 – 12/2029', start: 2027.0, end: 2029.9,
      amount: '47,700 HKD', cny: 4.4, status: '在研（已立项）', tag: '校级基金'
    }
  ];

  /* ---------- 发明专利 ---------- */
  const patents = [
    { date: '2023-07-18', year: 2023, name: '一种住宅户型平面图自动生成方法和系统', no: 'ZL201910952689.0[P]', authors: '郑豪', kind: '发明专利' },
    { date: '2024-05-17', year: 2024, name: '基于改进 VGG16 模型的建筑氛围评价方法、系统、设备及介质', no: 'ZL202410061106.6[P]', authors: '陈纵、梁海岫、郑豪、姜磊、林泽轩', kind: '发明专利' },
    { date: '2024-07-26', year: 2024, name: '一种基于 GAN 和 GA 的夏热冬暖地区低碳建筑设计决策方法', no: 'ZL202410485368.5[P]', authors: '倪阳、韦进、郑豪', kind: '发明专利' },
    { date: '2024-12-27', year: 2024, name: '一种用于适候建筑腔体设计的计算性辅助决策方法及系统', no: 'ZL202411207995.9[P]', authors: '倪阳、韦进、郑豪', kind: '发明专利' },
    { date: '2025-01-23', year: 2025, name: 'Methods, Systems, and Computer Readable Media for Generating Structural Forms Using Machine Learning', no: 'US20250028871A1[P]', authors: 'Akbarzadeh, Masoud; Hao Zheng', kind: '美国专利' },
    { date: '2025-04-04', year: 2025, name: '基于 cGAN 和 NSGA-II 的大学校园规划设计多目标优化方法', no: 'ZL202411814738.1[P]', authors: '韦进、倪阳、郑豪', kind: '发明专利' },
    { date: '2025-05-30', year: 2025, name: '基于多模态学习的校园绿色空间具身感知评估方法及系统', no: 'ZL202510358454.4[P]', authors: '韦进、郑豪、梁海岫、刘凯、袁满、殷实', kind: '发明专利' },
    { date: '2025-09-05', year: 2025, name: '一种多模态融合的会展建筑高大中庭自然通风评估方法', no: 'ZL202510901801.3[P]', authors: '倪阳、罗建河、唐海达、郑豪、邱越、韦进', kind: '发明专利' },
    { date: '2025-11-04', year: 2025, name: '一种以心理状态为媒介的室外热舒适智能评估方法及系统', no: 'ZL202511159670.2[P]', authors: '韦进、倪阳、刘晓、梁海岫、刘凯、郑豪', kind: '发明专利' },
    { date: '2026-03-17', year: 2026, name: '基于时空数据大模型的全龄化小微绿地布局优化方法', no: 'ZL202511993633.1[P]', authors: '韦进、倪阳、邓孟仁、郑豪', kind: '发明专利' },
    { date: '2026-04-21', year: 2026, name: '一种面向校园建筑与景观过渡的协同恢复性效应评估方法', no: 'ZL202610116979.1[P]', authors: '韦进、倪阳、刘晓、罗建河、郑豪', kind: '发明专利' },
    { date: '2026-10-21', year: 2026, name: '风热双驱动建筑拔风腔体智能辅助设计系统 V1.0', no: '2026SR1060324[CP/OL]', authors: '倪阳、韦进、罗建河、郑豪、唐海达、林润、邓心宇、姜熠、徐滢鸿、闫淑超、王彦欢', kind: '软件著作权' }
  ];

  /* ---------- 获奖荣誉 ---------- */
  const awards = [
    { year: 2026, date: '2026-10-07', name: 'World’s Top 2% Scientist（Single Year 2026）', org: 'Stanford / Elsevier', cat: 'research', note: '全球前 2% 顶尖科学家' },
    { year: 2026, date: '2026-08-15', name: 'Silver Medal', org: 'Silicon Valley International Invention Festival 2026', cat: 'invention', people: 'Ni Yang, Jin Wei, Hao Zheng' },
    { year: 2026, date: '2026-08-16', name: 'RIVA Special Award', org: 'Silicon Valley International Invention Festival 2026', cat: 'invention', people: 'Ni Yang, Jin Wei, Hao Zheng' },
    { year: 2025, date: '2025 秋', name: '杰出教学表彰（前 5%）', org: '香港城市大学', cat: 'teaching', note: '2025 秋季学期' },
    { year: 2023, date: '2023 秋', name: '杰出教学表彰（前 5%）', org: '香港城市大学', cat: 'teaching', note: '2023 秋季学期' },
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
    { period: '2025.12.16 – 2026.01.24', name: '港深城市 / 建筑双城双年展 2025', host: '香港建筑师学会主办', year: 2025, type: '研究展览' }
  ];

  /* ---------- 教学 ---------- */
  const teaching = {
    undergradCourses: [
      { name: '创新思维与现代设计', code: 'ME903', school: '上海交通大学', term: '2021 春季学期', lead: true },
      { name: '建筑合同与管理', code: 'CA3686', school: '香港城市大学', term: '2023 春季学期' },
      { name: '结构系统和材料', code: 'CA29506', school: '香港城市大学', term: '2023 春季学期', lead: true },
      { name: '建筑技术创新', code: 'CA3171', school: '香港城市大学', term: '2023/2024/2025 春季学期', lead: true },
      { name: '专业与社会', code: 'CA2066', school: '香港城市大学', term: '2027 春季学期' }
    ],
    masterCourses: [
      { name: '当代建筑理论', code: 'ARCH710', school: '宾夕法尼亚大学', term: '2019/2020 秋季学期' },
      { name: '设计运算专题', code: 'MADM26', school: '澳门科技大学', term: '2020 春季学期', lead: true },
      { name: '参数化设计与数字建造', code: 'AR26003', school: '上海交通大学', term: '2021 春季学期', lead: true },
      { name: '高级数字建造', code: 'CA5563', school: '香港城市大学', term: '2023/2024/2025/2026 秋季学期', lead: true },
      { name: '地理数据管理和规划分析', code: 'CA6241', school: '香港城市大学', term: '2024 春季学期' },
      { name: '数字建筑设计课', code: 'CA5201', school: '香港城市大学', term: '2024/2025/2026 秋季学期', lead: true },
      { name: '建筑研究方法与论文', code: 'CA5203', school: '香港城市大学', term: '2025/2026/2027 春季学期', lead: true },
      { name: '建筑理论与批判', code: 'CA6302', school: '香港城市大学', term: '2025 秋季学期' },
      { name: '高级计算性设计', code: 'CA6701', school: '香港城市大学', term: '2026 春季学期', lead: true }
    ],
    workshops: [
      { name: 'DigitalFUTURES 暑期工作营', school: '同济大学', term: '2019/2020/2021/2022/2023/2024', lead: true },
      { name: '暑期工作营', school: '合肥工业大学', term: '2021', lead: true }
    ],
    studios: [
      { name: '交通建筑联合毕业设计', school: '上海交通大学', term: '2021 届' },
      { name: '毕业项目', school: '香港城市大学', term: '2024/2027 届' },
      { name: '毕业设计与研究项目', school: '香港城市大学', term: '2024/2025 届' }
    ],
    masterTheses: [
      { name: '硕士毕业论文', school: '上海交通大学', term: '2021/2022 届' },
      { name: '硕士毕业论文', school: '香港城市大学', term: '2024/2025/2026/2027 届' },
      { name: '硕士毕业设计（建筑设计）', school: '香港城市大学', term: '2026 届', lead: true }
    ],
    phd: [
      { name: '赖哲', school: '华南理工大学 & 香港城市大学', cohort: '2024 届', note: '已毕业' },
      { name: '李可可', school: '同济大学 & 香港城市大学', cohort: '2026 届' },
      { name: '纪英华', school: '香港城市大学', cohort: '2027 届' },
      { name: '朱佳璇', school: '香港城市大学', cohort: '2027 届' },
      { name: '韦耐', school: '同济大学 & 香港城市大学', cohort: '2027 届' },
      { name: '徐沛', school: '香港城市大学', cohort: '2028 届' },
      { name: '杨建儒', school: '华东师范大学 & 香港城市大学', cohort: '2028 届' },
      { name: '顾悠然', school: '香港城市大学', cohort: '2029 届' }
    ],
    awards: [
      { name: '杰出教学表彰（前 5%）', school: '香港城市大学', term: '2023 秋季学期' },
      { name: '杰出教学表彰（前 5%）', school: '香港城市大学', term: '2025 秋季学期' }
    ],
    exhibitions: [
      { period: '2026.08.08 – 2026.08.13', name: '学生毕业设计展览 2026', host: '香港城市大学主办' },
      { period: '2025.05.24 – 2025.06.01', name: '学生毕业设计展览 2025', host: '香港城市大学主办' },
      { period: '2024.06.11 – 2024.06.19', name: '学生毕业设计展览 2024', host: '香港城市大学主办' },
      { period: '2024.04.22 – 2024.06.28', name: '“巴黎圣母院的重生”', host: '法国驻香港及澳门总领事馆主办' },
      { period: '2023.06.08 – 2023.06.17', name: '学生毕业设计展览 2023', host: '香港城市大学主办' }
    ]
  };

  /* ---------- 学术任职 ---------- */
  const service = {
    editorial: [
      { name: 'Building and Environment', tag: 'SCI' },
      { name: 'Architectural Intelligence', tag: '期刊' },
      { name: 'Perspectives in Architecture and Urbanism', tag: '期刊' }
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
    reviewers: [
      'Sustainable Cities and Society (SCI)', 'Automation in Construction (SCI)', 'Journal of Cleaner Production (SCI)',
      'Building and Environment (SCI)', 'Energy and Buildings (SCI)', 'Energy (SCI)',
      'Developments in the Built Environment (SCI)', 'Engineering Applications of Artificial Intelligence (SCI)',
      'Advanced Engineering Informatics (SCI)', 'International Journal of Applied Earth Observation and Geoinformation (SCI)',
      'Neural Networks (SCI)', 'Journal of Building Engineering (SCI)', 'Journal of Computational Design and Engineering (SCI)',
      'Computer-Aided Design (SCI)', 'Ain Shams Engineering Journal (SCI)', 'International Journal of Digital Earth (SCI)',
      'Architectural Engineering and Design Management (SCI)', 'International Journal of Intelligent Systems (SCI)',
      'World Journal of Gastroenterology (SCI)', 'Mathematics (SCI)', 'Bioengineering (SCI)', 'Displays (SCI)',
      'Buildings (SCI)', 'Sensors (SCI)', 'Energies (SCI)', 'Biomimetics (SCI)', 'Symmetry (SCI)',
      'Applied Sciences (SCI)', 'Data (SCI)', 'Electronics (SCI)', 'IEEE Access (SCI)',
      'Advances in Space Research (SCI)', 'PeerJ Computer Science (SCI)', 'Cybernetics and Systems (SCI)',
      'Electronic Research Archive (SCI)', 'Computers, Materials & Continua (SCI)',
      'Computer Modeling in Engineering & Sciences (SCI)', 'PLoS One (SCI)',
      'Environmental Engineering and Management Journal (SCI)', 'Imaging Science Journal (SCI)',
      'Results in Engineering (SCI)', 'SoftwareX (SCI)', 'Transportation Research Part A (SCI) (SSCI)',
      'Sustainability (SCI) (SSCI)', 'Cities (SSCI)', 'Journal of Transport Geography (SSCI)',
      'Habitat International (SSCI)', 'Progress in Planning (SSCI)', 'Computers, Environment and Urban Systems (SSCI)',
      'Journal of Urban Technology (SSCI)', 'Transactions in GIS (SSCI)',
      'International Journal of Environmental Research and Public Health (SSCI)',
      'Environment and Planning B: Urban Analytics and City Science (SSCI)',
      'Journal of Asian Architecture and Building Engineering (SCI) (AHCI)',
      'Frontiers of Architectural Research (AHCI)', 'Architectural Science Review (AHCI)',
      'International Journal of Architectural Computing (EI)', 'The Association for Computer Aided Design in Architecture (EI)',
      'The Association for Computer-Aided Architectural Design Research in Asia (EI)',
      'Computational Design and Robotic Fabrication (EI)', 'Computational Design Symposium and Annual Conference',
      'SIGGRAPH Asia', 'International Conference on Intelligent Computing in Engineering',
      'International Conference on Construction Engineering and Project Management', 'Landscape Architecture Frontiers',
      'Computational Urban Science', 'Technology | Architecture + Design', 'Journal of Infrastructure Intelligence and Resilience',
      'Cubic Journal', 'Architectural Intelligence', 'Architecture', 'Routledge (book reviewer)'
    ]
  };

  /* ---------- 人生轨迹动画脚本：重要事件节点 ---------- */
  const milestones = [
    { year: 2009, month: 7, cat: 'award', kicker: '起点 · 信息学', title: 'NOI 全国青少年信息学奥林匹克竞赛 全国三等奖', desc: '编程竞赛之路开启 —— 高中时期连续取得 NOI 全国三等奖、NOIP 省级与国家级一等奖，为日后“建筑 × 人工智能”埋下伏笔。', dur: 2600 },
    { year: 2011, month: 9, cat: 'edu', kicker: '本科 · 上海交通大学', title: '入读上海交通大学 建筑学学士', desc: '主修建筑设计、辅修文学，开始用人文与工程双重视角理解空间。', dur: 2200 },
    { year: 2014, month: 9, cat: 'award', kicker: '设计起步', title: 'zhulong.com 全国大学生建筑与环境设计展 入围（Top 30）', desc: '本科阶段设计竞赛连续入围：2012 华城杯 Excellence Award、2013 DADA 数字建造 Top 10、2014 全国学生展 Top 30。', dur: 2400 },
    { year: 2016, month: 9, cat: 'edu', kicker: '硕士 · 加州大学伯克利分校', title: '入读 UC Berkeley 建筑学硕士（GPA 3.98/4）', desc: '转向参数化设计与数字建造；同年 4 月在交大开设 Rhino & Grasshopper 教程，开始教学分享。', dur: 2600 },
    { year: 2017, month: 1, cat: 'work', kicker: '首次研究任职', title: '加州大学伯克利分校 研究助理', desc: '1–8 月从事机械臂辅助施工研究，3 月获 Berkeley Final Student Recognition Award。', dur: 2400 },
    { year: 2017, month: 9, cat: 'work', kicker: '北上前沿', title: '清华大学 研究助理', desc: '转向机器学习与仿生式 3D 打印研究（至 2018.04），并在清华开讲 “Machine Learning for Architects”。', dur: 2400 },
    { year: 2018, month: 8, cat: 'edu', kicker: '博士 · 宾夕法尼亚大学', title: '入读宾大建筑学博士（全额奖学金）', desc: '研究人工智能与建筑设计；CAADRIA 2018 北京一次发表 4 篇论文，ACADIA 2018 获 Student Scholarship Award。', dur: 2800 },
    { year: 2019, month: 6, cat: 'work', kicker: '教研并进', title: '同济大学 工作营导师 · 宾大 讲师', desc: '6 月起任同济 DigitalFUTURES 工作营导师（连续 2019–2024）；8 月起任宾大讲师；7 月获 Digital Futures 最佳报告奖。', dur: 2600 },
    { year: 2020, month: 9, cat: 'work', kicker: '产学研跨界', title: '广联达 CTO 办公室 高级顾问 · 首个企业项目立项', desc: 'BIMMAKE 智能场布项目（12 万元）启动；同期担任上海交通大学设计实践导师。当年发表 11 篇论文、7 场报告。', dur: 2800 },
    { year: 2021, month: 1, cat: 'project', kicker: '百万级项目', title: '绿色城区智慧评估平台（100 万）等 3 项企业课题', desc: '全年启动 3 项企业委托：绿色城区平台 100 万、装配式虚拟展示 200 万、万达广场智能辅助设计 50 万。', dur: 3000 },
    { year: 2022, month: 4, cat: 'paper', kicker: '博士成果', title: '博士论文答辩 · Advanced Science 封面论文', desc: '《Geometry and Topology: Building Machine Learning Surrogate Models with Graphic Statics Method》；蜻蜓翅仿生研究登上 Advanced Science 封面（IF 14.1）。', dur: 3000 },
    { year: 2022, month: 12, cat: 'work', kicker: '关键跃迁', title: '入职香港城市大学 助理教授、博士生导师', desc: '创建建筑智能研究组（AIG）；12/2022 起组建团队，开启独立 PI 生涯。', dur: 3400 },
    { year: 2023, month: 6, cat: 'project', kicker: '竞争性基金突破', title: 'UGC RMGS 20 万 HKD · 校级 Start-up 150 万 HKD', desc: '6 月获 RMGS（PI）、7 月获系战略研究基金（PC）、10 月获新教师启动基金（PI，150 万 HKD）；8 月起任建筑学本科/硕士项目副主任。', dur: 3200 },
    { year: 2023, month: 5, cat: 'talk', kicker: '学术影响力', title: '年度受邀报告 29 场', desc: '从 MIT 到 ETH、从 Herzog & de Meuron 到阿里巴巴，全年 29 场受邀讲座；同年发表 11 篇论文、获 6 项发明专利。', dur: 3000 },
    { year: 2024, month: 1, cat: 'project', kicker: '湾区协同', title: '广东省自然科学基金面上项目（共同研究人）', desc: '基于 Scan-to-BIM 的绿色低碳校园碳排放动态评估；11 月当选上海交通大学香港校友会理事会理事。', dur: 2600 },
    { year: 2024, month: 11, cat: 'talk', kicker: '年度峰值', title: '全年 30 场受邀报告 · 8 篇论文', desc: '覆盖 Queensland、Imperial、Oxford China Forum、AtkinsRéalis 等机构；发明专利累计 4 件。', dur: 2800 },
    { year: 2025, month: 8, cat: 'work', kicker: '平台建设', title: '建筑学硕士项目副主任 · 人工智能建造实验室主任', desc: '10/2025 起出任人工智能建造实验室主任；8 月获香港城市大学杰出教学表彰（前 5%）。', dur: 2800 },
    { year: 2025, month: 9, cat: 'project', kicker: '重大立项', title: '亚热带国家重点实验室重点项目（43 万）· UABB 2025 展览基金', desc: '会展建筑室内通风规划研究立项；同年 12 月“港深城市/建筑双城双年展 2025”开展。', dur: 3000 },
    { year: 2025, month: 12, cat: 'paper', kicker: '发表高峰', title: '单年 13 篇论文 · 5 项发明专利', desc: 'Advanced Engineering Informatics、Building and Environment、Cities 等；专利累计 12 项。', dur: 2800 },
    { year: 2026, month: 8, cat: 'award', kicker: '国际认可', title: '硅谷国际发明展 银奖 + RIVA 特别奖', desc: '风热双驱动拔风腔体智能辅助设计系统等成果获国际发明展双奖。', dur: 3000 },
    { year: 2026, month: 10, cat: 'award', kicker: '巅峰时刻', title: '入选斯坦福/爱思唯尔 全球前 2% 顶尖科学家', desc: '2026 年度全球前 2% 科学家（Single Year 2026）；当年发表 14 篇论文，创历史新高。', dur: 3600 },
    { year: 2027, month: 1, cat: 'project', kicker: '未来 · 已立项', title: 'UGC 杰出青年学者计划（ECS）95.4 万 HKD 启动', desc: 'Nature-inspired design of high-performance building cantilever structures，2027.01–2029.12；配套校内 RGC 基金 4.77 万 HKD。', dur: 3200 },
    { year: 2029, month: 6, cat: 'future', kicker: '预测', title: '首位完整培养博士生毕业 · 团队规模化', desc: '模型预测：2029 年前后进入成果复利期，年度论文稳定 14–18 篇，专利累计约 20 项，经费累计约 900 万元。', dur: 3000 },
    { year: 2031, month: 12, cat: 'future', kicker: '预测', title: '建筑智能领域的国际引领者', desc: '预测：以 AIG + AI 建造实验室为枢纽，形成“生成式设计—智能建造—城市计算”完整研究版图。', dur: 3200 }
  ];

  return { profile, education, positions, projects, patents, awards, exhibitions, teaching, service, milestones };
})();
