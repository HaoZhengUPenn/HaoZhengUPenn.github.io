/* ============================================================
   交互逻辑：双语（中 / EN）、标签页渲染、时间轴 / K 线联动动画
   ============================================================ */
(function () {
  'use strict';

  const q = (s, r) => (r || document).querySelector(s);
  const qa = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const URLP = (function () { try { return new URLSearchParams(location.search); } catch (e) { return new URLSearchParams(''); } })();
  const STATIC = URLP.get('static') === '1'
    || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (STATIC) document.documentElement.classList.add('no-anim');

  /* ============================================================
     文案字典
     ============================================================ */
  const UI = {
    zh: {
      brandSub: '香港城市大学 · 建筑学及土木工程学系 · 助理教授',
      themeDark: '暗色', themeLight: '亮色',
      title: '郑豪 · 学术履历与人生 K 线 | Hao Zheng',

      heroEyebrow: 'City University of Hong Kong · 建筑学及土木工程学系',
      ctaJourney: '观看人生 K 线动画 →',
      ctaPapers: '浏览 {n} 篇论文',
      sideResearch: '研究领域', sideFunding: '累计科研经费', sideSci: 'SCI / SSCI / AHCI', sideTop2: '全球前 2% 科学家',
      sideFundingValue: '¥ 688 万', sideFundingNote: '≈ 96 万美元', sideTop2Value: '2026 年度',
      blockIntro: '个人简介', blockResearch: '研究方向', blockQuick: '履历速览', blockContact: '联系方式',
      quickEdu: '教育', quickWork: '任职', quickProjects: '科研项目', quickPapers: '论文',
      quickPatents: '专利', quickAwards: '获奖', quickTalks: '讲座', quickCourses: '课程',
      contactAddress: '地址', contactPhone: '电话', contactEmail: '邮件', contactHome: '主页',

      eduTitle: '教育经历',
      eduSub: '从上海交通大学到加州大学伯克利分校，再到宾夕法尼亚大学 —— 建筑学与计算科学的双重训练。',
      eduThesis: '学位论著', eduThesisKicker: '博士论文 · 2022 · University of Pennsylvania',

      workTitle: '工作与任职经历',
      workSub: '{n} 家机构 · {m} 段任职 —— 学术、产业、校友组织三线并行。',

      projTitle: '主持与参与科研项目',
      projSub: '累计 {n} 项、经费约 <strong>{fm}</strong>（≈ 96 万美元）；含 UGC 杰出青年学者计划（ECS）。',
      filtAll: '全部项目', filtFund: '竞争性基金', filtInd: '产业合作', filtSchool: '校级 / 其他',
      projRole: '角色', projFunder: '委托', projType: '类型', projPeriod: '周期',

      paperTitle: '论文发表',
      paperSub: '共 {n} 篇（简历口径约 80 篇），其中 SCI / SSCI / AHCI / CSSCI / CSCD {a} 篇、EI {b} 篇、会议论文 {c} 篇、博士论文 1 篇。',
      paperStatSci: 'SCI / SSCI / AHCI', paperStatEi: 'EI 收录', paperStatConf: '会议论文', paperStatIf: '最高影响因子',
      paperIfNote: 'Advanced Science · 封面',
      fAll: '全部', fSci: 'SCI / SSCI / AHCI', fEi: 'EI', fConf: '会议', fThesis: '博士论文', fJournal: '期刊',
      searchPapers: '搜索标题 / 期刊…', emptyPapers: '没有匹配的论文',

      patTitle: '发明专利与软件著作权',
      patSub: '共 {n} 项：发明专利 11 项 + 软件著作权 1 项，覆盖生成式设计、低碳评估、城市计算与智能建造。',

      awTitle: '荣誉与获奖',
      awSub: '从高中信息学奥赛到全球前 2% 科学家 —— {n} 项荣誉贯穿 17 年。',
      awResearch: '研究获奖', awInvention: '发明获奖', awDesign: '设计获奖', awContest: '竞赛获奖',
      awTeaching: '教学获奖', awExhibition: '研究展览', awEnResearch: 'Research Awards', awEnInvention: 'Invention Awards',
      awEnDesign: 'Design Awards', awEnContest: 'Competitions', awEnTeaching: 'Teaching Awards', awEnExhibition: 'Exhibition',

      teachTitle: '教学',
      teachSub: '{n} 门本科与硕士课程（其中 <strong>{l} 门</strong>由本人担任课程负责人），累计讲授 40 余门次；{s} 名博士生、6 届 DigitalFUTURES 工作营。',
      teachUG: '本科专业课程', teachPG: '硕士专业课程', teachWS: '工作营', teachPhD: '指导博士生',
      teachStudio: '本科毕业设计', teachThesis: '硕士毕业论文', teachExh: '教学展览', leadBadge: '课程负责人',
      enUG: 'Undergraduate', enPG: 'Master', enWS: 'Workshops', enPhD: 'PhD Supervision',
      enStudio: 'Final Year Studio', enThesis: 'Master Thesis', enExh: 'Teaching Exhibitions',

      svTitle: '学术任职与服务',
      svSub: '期刊主编 3 种 · 基金与奖项评委 7 项 · 会议主办 7 场 · 学会成员 5 个 · 审稿人 {n} 种期刊与会议。',
      svEditorial: '期刊主编', svPanels: '基金与奖项评委', svConferences: '会议主办', svSocieties: '学会成员',
      svReviewer: '审稿人', expand: '展开全部', collapse: '收起',

      talkTitle: '受邀讲座',
      talkSub: '{n} 场受邀演讲（简历口径 120 余场），足迹覆盖中国大陆、香港、新加坡、日本、韩国、欧洲、美国与中东。',
      talkAllYears: '全部年份', talkSearch: '搜索机构 / 城市 / 主题…', talkEmpty: '没有匹配的讲座',

      journeyEyebrow: 'Life Trajectory · 2009 — 2031',
      journeyTitle: '人生 K 线 · 时间轴叙事',
      journeyDesc: '每个年度一根蜡烛：开盘即年初状态，收盘是全年产出后的位置，影线来自事件在年内的分布。红涨绿跌，2027 年起为模型预测区间。',
      prev: '上一个', next: '下一个', play: '自动播放', pause: '暂停',
      focusAuto: '聚焦：自动', focusFull: '聚焦：全景', replay: '重绘 K 线',
      tipPrev: '上一个节点（←）', tipPlay: '自动播放（空格）', tipNext: '下一个节点（→）',
      tipSpeed: '播放速度', tipFocus: '切换自动聚焦 / 全景', tipReplay: '重新播放绘制动画',
      speed07: '0.7× 慢', speed10: '1.0× 正常', speed15: '1.5× 快', speed22: '2.2× 极快',
      chartTitle: '人生指数', chartSub: '指数 = 成长基准（年化 13.5%）× 当年度产出强度',
      chartTrend: '红涨绿跌 · 指数', chartVolume: '年度事件密度 / 成交量',
      chartForecast: '预测', chartForecastArea: '预测区 · 不确定性扇形',
      ysHead: '年度档案', timelineTitle: '时间轴',
      lgPapers: '论文', lgPatents: '专利', lgTalks: '讲座', lgRoles: '任职', lgProjects: '立项',
      tlFoot: '点击年份查看年度档案 · 点击圆点跳转节点 · ← → 切换 · 空格播放/暂停',

      evNewRole: '新任职', evNewProj: '新立项', evProjEnd: '结题', evSci: 'SCI', evEi: 'EI', evConf: '会议',
      evPatent: '专利', evTalk: '讲座', evAward: '获奖',
      evHist: '历史节点', evFuture: '预测节点', evInterval: '建议间隔',

      ysOpen: '开盘', ysClose: '收盘', ysChange: '涨跌',
      ysNewRoles: '新任职', ysEdu: '教育节点', ysProjStart: '项目开始', ysProjEnd: '项目结束',
      ysStats: '成果统计', ysFunding: '新增经费', ysActive: '在研项目', ysNodes: '年度节点',
      ysClick: '点击跳转', ysStatSci: 'SCI/SSCI', ysStatEi: 'EI', ysStatConf: '会议',
      ysStatPat: '专利', ysStatTalk: '讲座', ysStatAward: '获奖',
      ysEnrolled: '入学', ysGraduated: '毕业', ysNewProjects: '项新立项',

      tipOpen: '开', tipHigh: '高', tipLow: '低', tipClose: '收', tipActual: '实际', tipForecast: '预测',
      tipPapers: '论文', tipPatents: '专利', tipTalks: '讲座', tipNewProj: '新立项', tipActive: '在研', tipUnit: '项',

      footSource: '数据来源：郑豪简历（PDF，21 页，2026 年 11 月版） · 论文 84 篇 / 讲座 122 场 / 项目 13 项逐条录入',
      footNote: 'K 线指数为可视化建模，非真实财务数据；预测区间基于历史产出趋势外推，仅用于叙事展示。'
    },

    en: {
      brandSub: 'City University of Hong Kong · Architecture and Civil Engineering · Assistant Professor',
      themeDark: 'Dark', themeLight: 'Light',
      title: 'Hao Zheng · Interactive CV & Life Candlestick | 郑豪',

      heroEyebrow: 'City University of Hong Kong · Department of Architecture and Civil Engineering',
      ctaJourney: 'Watch the life K-line →',
      ctaPapers: 'Browse {n} publications',
      sideResearch: 'Research', sideFunding: 'Research funding', sideSci: 'SCI / SSCI / AHCI', sideTop2: 'World’s Top 2%',
      sideFundingValue: 'CNY 6.88M', sideFundingNote: '≈ USD 0.96M', sideTop2Value: 'Single-Year 2026',
      blockIntro: 'Short Bio', blockResearch: 'Research Interests', blockQuick: 'At a Glance', blockContact: 'Contact',
      quickEdu: 'Education', quickWork: 'Appointments', quickProjects: 'Grants', quickPapers: 'Publications',
      quickPatents: 'Patents', quickAwards: 'Awards', quickTalks: 'Talks', quickCourses: 'Courses',
      contactAddress: 'Address', contactPhone: 'Phone', contactEmail: 'Email', contactHome: 'Website',

      eduTitle: 'Education',
      eduSub: 'From Shanghai Jiao Tong University to UC Berkeley and the University of Pennsylvania — a dual training in architecture and computing.',
      eduThesis: 'Dissertation', eduThesisKicker: 'Ph.D. Dissertation · 2022 · University of Pennsylvania',

      workTitle: 'Work Experience',
      workSub: '{n} institutions · {m} appointments — academic, industry and alumni service running in parallel.',

      projTitle: 'Research Grants & Projects',
      projSub: '{n} projects, about <strong>{fm}</strong> (≈ USD 0.96M) in total, including the UGC Early Career Scheme (ECS).',
      filtAll: 'All projects', filtFund: 'Competitive grants', filtInd: 'Industry', filtSchool: 'University / other',
      projRole: 'Role', projFunder: 'Client', projType: 'Scheme', projPeriod: 'Date',

      paperTitle: 'Publications',
      paperSub: '{n} entries in total (≈80 per the CV), of which {a} are indexed in SCI / SSCI / AHCI / CSSCI / CSCD, {b} in EI, {c} conference papers and 1 Ph.D. dissertation.',
      paperStatSci: 'SCI / SSCI / AHCI', paperStatEi: 'EI indexed', paperStatConf: 'Conference papers', paperStatIf: 'Highest impact factor',
      paperIfNote: 'Advanced Science · Cover',
      fAll: 'All', fSci: 'SCI / SSCI / AHCI', fEi: 'EI', fConf: 'Conference', fThesis: 'Dissertation', fJournal: 'Journal',
      searchPapers: 'Search title / venue…', emptyPapers: 'No matching publications',

      patTitle: 'Patents & Software Copyrights',
      patSub: '{n} items: 11 invention patents and 1 software copyright, spanning generative design, low-carbon assessment, urban computing and intelligent construction.',

      awTitle: 'Honors & Awards',
      awSub: 'From an informatics olympiad in high school to the World’s Top 2% Scientists — {n} honors across 17 years.',
      awResearch: 'Research Awards', awInvention: 'Invention Awards', awDesign: 'Design Awards', awContest: 'Competitions',
      awTeaching: 'Teaching Awards', awExhibition: 'Research Exhibition',
      awEnResearch: '研究获奖', awEnInvention: '发明获奖', awEnDesign: '设计获奖', awEnContest: '竞赛获奖',
      awEnTeaching: '教学获奖', awEnExhibition: '研究展览',

      teachTitle: 'Teaching',
      teachSub: '{n} undergraduate and graduate courses (<strong>{l}</strong> as course leader), over 40 course offerings taught; {s} doctoral students and 6 editions of the DigitalFUTURES workshop.',
      teachUG: 'Undergraduate Courses', teachPG: 'Graduate Courses', teachWS: 'Workshops', teachPhD: 'Ph.D. Supervision',
      teachStudio: 'Undergraduate Thesis', teachThesis: 'Graduate Thesis', teachExh: 'Teaching Exhibitions', leadBadge: 'Course leader',
      enUG: '本科专业课程', enPG: '硕士专业课程', enWS: '工作营', enPhD: '指导博士生',
      enStudio: '本科毕业设计', enThesis: '硕士毕业论文', enExh: '教学展览',

      svTitle: 'Academic Roles & Service',
      svSub: '3 journals on the editorial board · 7 grant and award review panels · 7 conferences organized · 5 society memberships · reviewer for {n} journals and conferences.',
      svEditorial: 'Journal Editor', svPanels: 'Grant & Award Reviewer', svConferences: 'Conference Organizer', svSocieties: 'Membership',
      svReviewer: 'Reviewer', expand: 'Show all', collapse: 'Collapse',

      talkTitle: 'Invited Talks',
      talkSub: '{n} invited talks (120+ per the CV), across mainland China, Hong Kong, Singapore, Japan, Korea, Europe, the US and the Middle East.',
      talkAllYears: 'All years', talkSearch: 'Search institution / city / topic…', talkEmpty: 'No matching talks',

      journeyEyebrow: 'Life Trajectory · 2009 — 2031',
      journeyTitle: 'Life Candlestick · A Timeline Narrative',
      journeyDesc: 'One candle per year: the open is the state at the start of the year, the close is where the year’s output left it, and the wicks come from how events were distributed across the months. Red = up, green = down; 2027 onward is the model’s forecast.',
      prev: 'Previous', next: 'Next', play: 'Auto play', pause: 'Pause',
      focusAuto: 'Focus: auto', focusFull: 'Focus: full view', replay: 'Redraw K-line',
      tipPrev: 'Previous milestone (←)', tipPlay: 'Auto play (space)', tipNext: 'Next milestone (→)',
      tipSpeed: 'Playback speed', tipFocus: 'Toggle auto focus / full view', tipReplay: 'Replay the drawing animation',
      speed07: '0.7× slow', speed10: '1.0× normal', speed15: '1.5× fast', speed22: '2.2× fastest',
      chartTitle: 'Life Index', chartSub: 'Index = growth baseline (13.5% p.a.) × yearly output intensity',
      chartTrend: 'Red up · green down', chartVolume: 'Yearly event density / volume',
      chartForecast: 'Forecast', chartForecastArea: 'Forecast · uncertainty fan',
      ysHead: 'Year File', timelineTitle: 'Timeline',
      lgPapers: 'Papers', lgPatents: 'Patents', lgTalks: 'Talks', lgRoles: 'Roles', lgProjects: 'Grants',
      tlFoot: 'Click a year for its file · click a dot to jump · ← → to step · space to play/pause',

      evNewRole: 'New role', evNewProj: 'New grant', evProjEnd: 'Completed', evSci: 'SCI', evEi: 'EI', evConf: 'Conference',
      evPatent: 'Patents', evTalk: 'Talks', evAward: 'Awards',
      evHist: 'Historical', evFuture: 'Forecast', evInterval: 'Suggested interval',

      ysOpen: 'Open', ysClose: 'Close', ysChange: 'Change',
      ysNewRoles: 'New roles', ysEdu: 'Education', ysProjStart: 'Projects started', ysProjEnd: 'Projects completed',
      ysStats: 'Output', ysFunding: 'New funding', ysActive: 'Active projects', ysNodes: 'Milestones',
      ysClick: 'click to jump', ysStatSci: 'SCI/SSCI', ysStatEi: 'EI', ysStatConf: 'Conf.',
      ysStatPat: 'Patents', ysStatTalk: 'Talks', ysStatAward: 'Awards',
      ysEnrolled: 'Enrolled at', ysGraduated: 'Graduated from', ysNewProjects: 'new grants',

      tipOpen: 'O', tipHigh: 'H', tipLow: 'L', tipClose: 'C', tipActual: 'Actual', tipForecast: 'Forecast',
      tipPapers: 'papers', tipPatents: 'patents', tipTalks: 'talks', tipNewProj: 'new grants', tipActive: 'active', tipUnit: '',

      footSource: 'Source: Hao Zheng’s CV (PDF, 21 pages, Nov 2026) · 84 publications / 122 talks / 13 projects entered one by one',
      footNote: 'The K-line index is a visualization model, not financial data; the forecast extrapolates historical output trends for narrative purposes only.'
    }
  };

  const TABS = [
    { id: 'overview', zh: '概览', en: 'Profile' },
    { id: 'journey', zh: '人生 K 线', en: 'Journey' },
    { id: 'education', zh: '教育经历', en: 'Education' },
    { id: 'work', zh: '工作经历', en: 'Experience' },
    { id: 'projects', zh: '科研项目', en: 'Grants' },
    { id: 'papers', zh: '论文发表', en: 'Publications' },
    { id: 'patents', zh: '发明专利', en: 'Patents' },
    { id: 'awards', zh: '荣誉获奖', en: 'Awards' },
    { id: 'teaching', zh: '教学工作', en: 'Teaching' },
    { id: 'service', zh: '学术服务', en: 'Service' },
    { id: 'talks', zh: '受邀讲座', en: 'Talks' }
  ];

  let LANG = 'zh';
  let CV, CV2, S, MILES = [];
  const t = (k) => (UI[LANG] && UI[LANG][k] !== undefined ? UI[LANG][k] : (UI.zh[k] !== undefined ? UI.zh[k] : k));
  const isEN = () => LANG === 'en';
  const moneyEN = (wan) => {
    const cny = wan * 10000;
    return cny >= 1e6 ? `CNY ${(cny / 1e6).toFixed(2)}M` : `CNY ${Math.round(cny / 1000)}k`;
  };

  /* ---------------- 主题 ---------------- */
  const themeKey = 'zhcv-theme', langKey = 'zhcv-lang';
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* file:// 下可能不可用 */ } }
  };
  function applyTheme(th) {
    document.documentElement.dataset.theme = th;
    store.set(themeKey, th);
    qa('[data-theme-btn]').forEach(b => b.classList.toggle('is-on', b.dataset.themeBtn === th));
    if (chart) chart.setTheme(th);
  }

  /* ---------------- 语言 ---------------- */
  function applyStaticText() {
    qa('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    qa('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
    document.documentElement.lang = isEN() ? 'en' : 'zh-CN';
    document.title = t('title');
    q('#brand-mark').textContent = isEN() ? 'HZ' : '郑';
    q('#brand-name').innerHTML = isEN()
      ? `Hao ZHENG <span>郑豪</span>`
      : `郑豪 <span>Hao Zheng</span>`;
    qa('[data-lang-btn]').forEach(b => b.classList.toggle('is-on', b.dataset.langBtn === LANG));
    const bp = q('#btn-play');
    if (bp && !STATE.playing) bp.innerHTML = `<span class="ico">▶</span> ${t('play')}`;
    const bf = q('#btn-full');
    if (bf) bf.textContent = STATE.autoFocus ? t('focusAuto') : t('focusFull');
  }

  function applyLang(lang, opts) {
    opts = opts || {};
    LANG = lang === 'en' ? 'en' : 'zh';
    store.set(langKey, LANG);
    CV = isEN() ? window.CV_EN : window.CV;
    CV2 = isEN() ? window.CV2_EN : window.CV2;
    S = window.MODEL.build(CV, CV2);
    MILES = CV.milestones.slice().sort((a, b) => a.year - b.year || (a.month || 0) - (b.month || 0));

    applyStaticText();
    buildNav();

    renderOverview(); renderEducation(); renderWork(); renderProjects(); renderPapers();
    renderPatents(); renderAwards(); renderTeaching(); renderService(); renderTalks();

    rebuildJourney(opts.keepStep || 0);
    switchTab(opts.keepTab || 'overview', true);
  }

  /* ---------------- 标签页 ---------------- */
  let chart = null;

  function buildNav() {
    const nav = q('#tabs');
    nav.innerHTML = TABS.map(tb => {
      const main = isEN() ? tb.en : tb.zh;
      const sub = isEN() ? tb.zh : tb.en;
      return `<button class="tab-btn" data-tab="${tb.id}" role="tab" aria-controls="panel-${tb.id}">
         <span class="tab-cn">${main}</span><span class="tab-en">${sub}</span>
       </button>`;
    }).join('');
    if (!nav.dataset.bound) {
      nav.addEventListener('click', e => {
        const b = e.target.closest('.tab-btn');
        if (b) switchTab(b.dataset.tab);
      });
      nav.dataset.bound = '1';
    }
  }

  function switchTab(id, silent) {
    if (!TABS.some(x => x.id === id)) id = 'overview';
    qa('.tab-btn').forEach(b => b.classList.toggle('is-active', b.dataset.tab === id));
    qa('.panel').forEach(p => p.classList.toggle('is-active', p.id === 'panel-' + id));
    if (!silent) { try { history.replaceState(null, '', '#' + id); } catch (e) { } }
    if (id !== 'journey') pause();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'journey') onJourneyEnter();
  }

  /* ---------------- 概览 ---------------- */
  function renderOverview() {
    const p = CV.profile;
    const fundingWan = CV.projects.reduce((s, x) => s + (x.cny || 0), 0);
    const quick = [
      ['quickEdu', 3, isEN() ? 'Bachelor · Master · PhD' : '学士 · 硕士 · 博士', 'education'],
      ['quickWork', CV.positions.reduce((s, x) => s + x.roles.length, 0), isEN() ? 'Academic & industry' : '跨学术与产业', 'work'],
      ['quickProjects', CV.projects.length, isEN() ? moneyEN(fundingWan) + ' total' : `累计 ¥${fundingWan.toFixed(0)} 万`, 'projects'],
      ['quickPapers', S.totals.papers, `SCI ${S.totals.sci} · EI ${S.totals.ei} · ${isEN() ? 'Conf.' : '会议'} ${S.totals.conf}`, 'papers'],
      ['quickPatents', CV.patents.length, isEN() ? 'incl. US patent & software' : '含美国专利与软著', 'patents'],
      ['quickAwards', CV.awards.length, isEN() ? 'Research · Invention · Design' : '研究 · 发明 · 设计 · 竞赛', 'awards'],
      ['quickTalks', S.totals.talks, isEN() ? 'across 10+ countries' : '覆盖 10 余个国家', 'talks'],
      ['quickCourses', CV.teaching.undergradCourses.length + CV.teaching.masterCourses.length, isEN() ? 'Undergraduate + Master' : '本科 + 硕士', 'teaching']
    ];
    q('#panel-overview').innerHTML = `
      <div class="hero">
        <div class="hero-glow"></div>
        <div class="hero-main">
          <div class="hero-eyebrow"><span class="dot-live"></span> ${t('heroEyebrow')}</div>
          <h1 class="hero-name">${p.name}${isEN() ? '<span class="hero-en">郑豪</span>' : `<span class="hero-en">${p.enName}</span>`}</h1>
          <p class="hero-title">${p.title} · ${p.affiliation}</p>
          <ul class="hero-roles">${p.roles.map(r => `<li>${esc(r)}</li>`).join('')}</ul>
          <div class="hero-contact">
            <a class="chip" href="mailto:${p.email}">✉ ${p.email}</a>
            <span class="chip">☏ ${p.phone}</span>
            <a class="chip" href="${p.homepage}" target="_blank" rel="noopener">⌂ architecturalintelligence.group</a>
          </div>
          <div class="hero-actions">
            <button class="btn btn-primary" data-goto="journey">${t('ctaJourney')}</button>
            <button class="btn btn-ghost" data-goto="papers">${t('ctaPapers').replace('{n}', S.totals.papers)}</button>
          </div>
        </div>
        <div class="hero-side">
          <div class="hero-monogram">${isEN() ? 'ZH' : '郑'}</div>
          <div class="hero-side-meta">
            <div><span>${t('sideResearch')}</span><strong>${isEN() ? 'Architectural Intelligence · AIGC' : '建筑智能 · 生成式设计'}</strong></div>
            <div><span>${t('sideFunding')}</span><strong>${t('sideFundingValue')} <em>${t('sideFundingNote')}</em></strong></div>
            <div><span>${t('sideSci')}</span><strong>${S.totals.sci} ${isEN() ? 'papers' : '篇'}</strong></div>
            <div><span>${t('sideTop2')}</span><strong>${t('sideTop2Value')}</strong></div>
          </div>
        </div>
      </div>

      <div class="stat-row">
        ${p.highlights.map((h, i) => `
          <div class="stat-card" style="--d:${i * 70}ms">
            <div class="stat-num" data-count="${h.value}" data-suffix="${h.suffix || ''}">0${h.suffix || ''}</div>
            <div class="stat-label">${esc(h.label)}</div>
          </div>`).join('')}
      </div>

      <section class="block">
        <h2 class="block-title"><span class="idx">01</span>${t('blockIntro')}</h2>
        <div class="prose">${p.intro.map(x => `<p>${esc(x)}</p>`).join('')}</div>
      </section>

      <section class="block">
        <h2 class="block-title"><span class="idx">02</span>${t('blockResearch')}</h2>
        <div class="research-grid">
          ${p.research.map(r => `
            <div class="research-card">
              <div class="research-icon">${r.icon}</div>
              <h3>${esc(r.title)}</h3>
              <p>${esc(r.desc)}</p>
            </div>`).join('')}
        </div>
      </section>

      <section class="block">
        <h2 class="block-title"><span class="idx">03</span>${t('blockQuick')}</h2>
        <div class="quick-grid">
          ${quick.map(([k, num, sub, tab]) => `
            <button class="quick-card" data-goto="${tab}">
              <span class="quick-label">${t(k)}</span>
              <span class="quick-num">${num}</span>
              <span class="quick-sub">${sub}</span>
            </button>`).join('')}
        </div>
      </section>

      <section class="block">
        <h2 class="block-title"><span class="idx">04</span>${t('blockContact')}</h2>
        <div class="contact-card">
          <div><span>${t('contactAddress')}</span>${esc(p.address)}</div>
          <div><span>${t('contactPhone')}</span>${esc(p.phone)}</div>
          <div><span>${t('contactEmail')}</span><a href="mailto:${p.email}">${p.email}</a></div>
          <div><span>${t('contactHome')}</span><a href="${p.homepage}" target="_blank" rel="noopener">${p.homepage}</a></div>
        </div>
      </section>`;

    qa('[data-goto]', q('#panel-overview')).forEach(b => b.addEventListener('click', () => switchTab(b.dataset.goto)));
    animateCounters(q('#panel-overview'));
  }

  function animateCounters(root) {
    qa('[data-count]', root).forEach(el => {
      const to = +el.dataset.count, suffix = el.dataset.suffix || '';
      if (STATIC) { el.textContent = to + suffix; return; }
      const dur = 1100, t0 = performance.now();
      function step(now) {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(to * e) + suffix;
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------------- 教育 ---------------- */
  function renderEducation() {
    q('#panel-education').innerHTML = `
      <div class="section-head">
        <h2>${t('eduTitle')}</h2>
        <p>${t('eduSub')}</p>
      </div>
      <div class="edu-list">
        ${CV.education.map((e, i) => `
          <article class="edu-card" style="--d:${i * 90}ms">
            <div class="edu-years">
              <span class="edu-start">${e.start}</span>
              <span class="edu-line"></span>
              <span class="edu-end">${e.end}</span>
            </div>
            <div class="edu-body">
              <div class="edu-tag">${e.tag}</div>
              <h3>${esc(e.school)}</h3>
              <div class="edu-sub">${esc(isEN() ? e.city : e.en)}</div>
              <div class="edu-degree">${esc(e.degree)}<span class="edu-period">${e.period}</span></div>
              <ul class="bullet">${e.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
            </div>
          </article>`).join('')}
      </div>

      <div class="block">
        <h2 class="block-title"><span class="idx">+</span>${t('eduThesis')}</h2>
        <div class="mini-card">
          <div class="mini-kicker">${t('eduThesisKicker')}</div>
          <div class="mini-title">Geometry and Topology: Building Machine Learning Surrogate Models with Graphic Statics Method</div>
          <div class="mini-sub">Publicly Accessible Penn Dissertations 2022: 4713</div>
        </div>
      </div>`;
  }

  /* ---------------- 工作 ---------------- */
  function renderWork() {
    const totalRoles = CV.positions.reduce((s, x) => s + x.roles.length, 0);
    q('#panel-work').innerHTML = `
      <div class="section-head">
        <h2>${t('workTitle')}</h2>
        <p>${t('workSub').replace('{n}', CV.positions.length).replace('{m}', totalRoles)}</p>
      </div>
      <div class="work-list">
        ${CV.positions.map((p, i) => {
          const kindCls = /产业|Industry/.test(p.kind) ? 'ind' : /校友|Alumni/.test(p.kind) ? 'alum' : 'acad';
          return `
          <article class="work-card" style="--d:${i * 60}ms">
            <div class="work-head">
              <div>
                <h3>${esc(p.org)}</h3>
                <div class="work-sub">${esc(p.en)} · ${esc(p.city)}</div>
              </div>
              <span class="kind-badge kind-${kindCls}">${esc(p.kind)}</span>
            </div>
            <ul class="role-list">
              ${p.roles.map(r => `
                <li>
                  <span class="role-title">${esc(r.title)}</span>
                  ${r.dept && r.dept !== p.en ? `<span class="role-dept">${esc(r.dept)}</span>` : ''}
                  <span class="role-period">${esc(r.period)}</span>
                </li>`).join('')}
            </ul>
          </article>`;
        }).join('')}
      </div>`;
  }

  /* ---------------- 项目 ---------------- */
  const CAT_MAP = { '产业合作': 'ind', '竞争性基金': 'fund', '重点实验室': 'fund', '社科规划': 'fund', '校级基金': 'school', '展览基金': 'school' };
  let projFilter = 'all';
  function renderProjects() {
    const tags = [['all', t('filtAll')], ['fund', t('filtFund')], ['ind', t('filtInd')], ['school', t('filtSchool')]];
    const funding = CV.projects.reduce((s, x) => s + (x.cny || 0), 0);
    q('#panel-projects').innerHTML = `
      <div class="section-head">
        <h2>${t('projTitle')}</h2>
        <p>${t('projSub').replace('{n}', CV.projects.length).replace('{fm}', isEN() ? moneyEN(funding) : '¥' + funding.toFixed(0) + ' 万')}</p>
      </div>
      <div class="filter-row" id="proj-filter">
        ${tags.map(([k, l]) => `<button class="filter-chip ${k === 'all' ? 'is-on' : ''}" data-f="${k}">${l}</button>`).join('')}
      </div>
      <div class="proj-list" id="proj-list"></div>`;

    const list = q('#proj-list');
    function drawProj() {
      const items = CV.projects.filter(p => projFilter === 'all' || (p.cat || CAT_MAP[p.tag]) === projFilter);
      list.innerHTML = items.map((p, i) => `
        <article class="proj-card" style="--d:${i * 45}ms">
          <div class="proj-top">
            <span class="proj-tag">${esc(p.tag)}</span>
            <span class="proj-status ${/进行|在研|On-going/.test(p.status) ? 'is-live' : ''}">${esc(p.status)}</span>
          </div>
          <h3 class="proj-name">${esc(p.name)}</h3>
          <div class="proj-meta">
            <div><span>${t('projRole')}</span>${esc(p.role)}</div>
            <div><span>${t('projFunder')}</span>${esc(p.funder)}</div>
            <div><span>${t('projType')}</span>${esc(p.type)}</div>
            <div><span>${t('projPeriod')}</span><strong>${esc(p.period)}</strong></div>
          </div>
          <div class="proj-amount">${esc(p.amount)}</div>
        </article>`).join('');
    }
    q('#proj-filter').addEventListener('click', e => {
      const b = e.target.closest('[data-f]'); if (!b) return;
      projFilter = b.dataset.f;
      qa('#proj-filter .filter-chip').forEach(x => x.classList.toggle('is-on', x === b));
      drawProj();
    });
    drawProj();
  }

  /* ---------------- 论文 ---------------- */
  const TAG_CLASS = { SCI: 'sci', SSCI: 'ssci', AHCI: 'ahci', CSSCI: 'cssci', CSCD: 'cscd', EI: 'ei', '会议': 'conf', 'Conference': 'conf', '博士论文': 'thesis', 'Dissertation': 'thesis', '期刊': 'other', 'Journal': 'other' };
  function paperIndex(p) {
    const j = p.j || '';
    if (j.indexOf('SSCI') === 0) return 'SSCI';
    if (j.indexOf('AHCI') === 0) return 'AHCI';
    if (j.indexOf('CSSCI') === 0) return 'CSSCI';
    if (j.indexOf('CSCD') === 0) return 'CSCD';
    if (j.indexOf('CiteScore') === 0) return isEN() ? 'Journal' : '期刊';
    if (p.type === 'ei') return 'EI';
    if (p.type === 'conf') return isEN() ? 'Conference' : '会议';
    if (p.type === 'thesis') return isEN() ? 'Dissertation' : '博士论文';
    return 'SCI';
  }
  let paperFilter = 'all', paperQuery = '';
  function renderPapers() {
    const tot = S.totals;
    q('#panel-papers').innerHTML = `
      <div class="section-head">
        <h2>${t('paperTitle')}</h2>
        <p>${t('paperSub').replace('{n}', tot.papers).replace('{a}', tot.sci).replace('{b}', tot.ei).replace('{c}', tot.conf)}</p>
      </div>
      <div class="paper-stats">
        ${[[t('paperStatSci'), tot.sci], [t('paperStatEi'), tot.ei], [t('paperStatConf'), tot.conf]].map(([l, v]) => `
          <div class="paper-stat"><span>${l}</span><strong>${v}</strong><em>${isEN() ? '' : '篇'}</em></div>`).join('')}
        <div class="paper-stat paper-stat-wide"><span>${t('paperStatIf')}</span><strong>14.1</strong><em>${t('paperIfNote')}</em></div>
      </div>
      <div class="filter-row" id="paper-filter">
        ${[['all', t('fAll')], ['sci', t('fSci')], ['ei', t('fEi')], ['conf', t('fConf')], ['thesis', t('fThesis')]].map(([k, l]) =>
          `<button class="filter-chip ${k === 'all' ? 'is-on' : ''}" data-pf="${k}">${l}</button>`).join('')}
        <input class="search" id="paper-search" type="search" placeholder="${t('searchPapers')}" />
      </div>
      <div class="paper-list" id="paper-list"></div>`;

    const list = q('#paper-list');
    function drawPapers() {
      const items = CV2.papers.filter(p => {
        if (paperFilter !== 'all' && p.type !== paperFilter) return false;
        if (paperQuery) {
          const s = (p.ttl + ' ' + p.v).toLowerCase();
          if (!s.includes(paperQuery)) return false;
        }
        return true;
      }).sort((a, b) => b.y - a.y || a.n - b.n);
      list.innerHTML = items.map(p => {
        const idx = paperIndex(p);
        const j = p.j || '';
        const bare = /^(SCI|SSCI|AHCI|CSSCI|CSCD|EI|CiteScore|Conference|Dissertation|会议|博士论文)$/.test(j);
        return `
        <article class="paper-item">
          <div class="paper-year">${p.y}</div>
          <div class="paper-main">
            <div class="paper-title">${esc(p.ttl)}</div>
            <div class="paper-meta">
              <span class="paper-venue">${esc(p.v)}</span>
              <span class="tag tag-${TAG_CLASS[idx] || 'sci'}">${idx}</span>
              ${j && !bare ? `<span class="tag tag-jcr">${esc(j)}</span>` : ''}
              ${p.f ? `<span class="tag tag-if">IF ${p.f}</span>` : ''}
              <span class="tag tag-role">${esc(p.r)}</span>
              ${p.note ? `<span class="tag tag-note">${esc(p.note)}</span>` : ''}
            </div>
          </div>
        </article>`;
      }).join('') || `<div class="empty">${t('emptyPapers')}</div>`;
    }
    q('#paper-filter').addEventListener('click', e => {
      const b = e.target.closest('[data-pf]'); if (!b) return;
      paperFilter = b.dataset.pf;
      qa('#paper-filter .filter-chip').forEach(x => x.classList.toggle('is-on', x === b));
      drawPapers();
    });
    q('#paper-search').addEventListener('input', e => { paperQuery = e.target.value.trim().toLowerCase(); drawPapers(); });
    drawPapers();
  }

  /* ---------------- 专利 ---------------- */
  function renderPatents() {
    q('#panel-patents').innerHTML = `
      <div class="section-head">
        <h2>${t('patTitle')}</h2>
        <p>${t('patSub').replace('{n}', CV.patents.length)}</p>
      </div>
      <div class="patent-timeline">
        ${CV.patents.map((p, i) => `
          <article class="patent-card" style="--d:${i * 45}ms">
            <div class="patent-date">${p.date}</div>
            <div class="patent-body">
              <div class="patent-kind">${esc(p.kind)}</div>
              <h3>${esc(p.name)}</h3>
              <div class="patent-no">${esc(p.no)}</div>
              <div class="patent-authors">${esc(p.authors)}</div>
            </div>
          </article>`).join('')}
      </div>`;
  }

  /* ---------------- 获奖 ---------------- */
  function renderAwards() {
    const groups = [
      ['research', 'awResearch', 'awEnResearch'],
      ['invention', 'awInvention', 'awEnInvention'],
      ['design', 'awDesign', 'awEnDesign'],
      ['contest', 'awContest', 'awEnContest'],
      ['teaching', 'awTeaching', 'awEnTeaching']
    ];
    q('#panel-awards').innerHTML = `
      <div class="section-head">
        <h2>${t('awTitle')}</h2>
        <p>${t('awSub').replace('{n}', CV.awards.length)}</p>
      </div>
      ${groups.map(([k, key, keyEn]) => {
        const items = CV.awards.filter(a => a.cat === k).sort((a, b) => b.year - a.year);
        if (!items.length) return '';
        return `
          <section class="block">
            <h3 class="sub-title">${t(key)}<em>${t(keyEn)}</em></h3>
            <div class="award-list">
              ${items.map(a => `
                <div class="award-item award-${k}">
                  <span class="award-year">${a.year}</span>
                  <div class="award-main">
                    <div class="award-name">${esc(a.name)}</div>
                    <div class="award-org">${esc(a.org)}${a.people ? `<span class="award-people">${esc(a.people)}</span>` : ''}</div>
                  </div>
                  <span class="award-date">${esc(a.date)}</span>
                </div>`).join('')}
            </div>
          </section>`;
      }).join('')}
      <section class="block">
        <h3 class="sub-title">${t('awExhibition')}<em>${t('awEnExhibition')}</em></h3>
        <div class="award-list">
          ${CV.exhibitions.map(e => `
            <div class="award-item">
              <span class="award-year">${e.year}</span>
              <div class="award-main">
                <div class="award-name">${esc(e.name)}</div>
                <div class="award-org">${esc(e.host)}</div>
              </div>
              <span class="award-date">${esc(e.period)}</span>
            </div>`).join('')}
        </div>
      </section>`;
  }

  /* ---------------- 教学 ---------------- */
  function renderTeaching() {
    const T = CV.teaching;
    const allCourses = T.undergradCourses.concat(T.masterCourses);
    const leadCount = allCourses.filter(c => c.lead).length;
    const courseRow = (c) => `
      <div class="course-row ${c.lead ? 'is-lead' : ''}">
        <div class="course-name">${esc(c.name)}${c.lead ? `<span class="lead-badge">${t('leadBadge')}</span>` : ''}</div>
        <div class="course-code">${esc(c.code || '—')}</div>
        <div class="course-school">${esc(c.school)}</div>
        <div class="course-term">${esc(c.term)}</div>
      </div>`;
    q('#panel-teaching').innerHTML = `
      <div class="section-head">
        <h2>${t('teachTitle')}</h2>
        <p>${t('teachSub').replace('{n}', allCourses.length).replace('{l}', leadCount).replace('{s}', T.phd.length)}</p>
      </div>
      <div class="teach-grid">
        <div class="teach-col">
          <h3 class="sub-title">${t('teachUG')}<em>${t('enUG')}</em></h3>
          <div class="course-table">${T.undergradCourses.map(courseRow).join('')}</div>
          <h3 class="sub-title">${t('teachWS')}<em>${t('enWS')}</em></h3>
          <div class="course-table">${T.workshops.map(courseRow).join('')}</div>
        </div>
        <div class="teach-col">
          <h3 class="sub-title">${t('teachPG')}<em>${t('enPG')}</em></h3>
          <div class="course-table">${T.masterCourses.map(courseRow).join('')}</div>
        </div>
      </div>
      <section class="block">
        <h3 class="sub-title">${t('teachPhD')}<em>${t('enPhD')}</em></h3>
        <div class="phd-grid">
          ${T.phd.map(s => `
            <div class="phd-card ${s.note ? 'is-grad' : ''}">
              <div class="phd-name">${esc(s.name)}</div>
              <div class="phd-cohort">${esc(s.cohort)}</div>
              <div class="phd-school">${esc(s.school)}</div>
              ${s.note ? `<div class="phd-note">${esc(s.note)}</div>` : ''}
            </div>`).join('')}
        </div>
      </section>
      <div class="teach-grid block">
        <div class="teach-col">
          <h3 class="sub-title">${t('teachStudio')}<em>${t('enStudio')}</em></h3>
          <div class="course-table">${T.studios.map(courseRow).join('')}</div>
        </div>
        <div class="teach-col">
          <h3 class="sub-title">${t('teachThesis')}<em>${t('enThesis')}</em></h3>
          <div class="course-table">${T.masterTheses.map(courseRow).join('')}</div>
        </div>
      </div>
      <section class="block">
        <h3 class="sub-title">${t('teachExh')}<em>${t('enExh')}</em></h3>
        <div class="award-list">
          ${T.exhibitions.map(e => `
            <div class="award-item">
              <span class="award-year">${e.period.slice(0, 4)}</span>
              <div class="award-main">
                <div class="award-name">${esc(e.name)}</div>
                <div class="award-org">${esc(e.host)}</div>
              </div>
              <span class="award-date">${esc(e.period)}</span>
            </div>`).join('')}
        </div>
      </section>`;
  }

  /* ---------------- 学术服务 ---------------- */
  function renderService() {
    const sv = CV.service;
    q('#panel-service').innerHTML = `
      <div class="section-head">
        <h2>${t('svTitle')}</h2>
        <p>${t('svSub').replace('{n}', sv.reviewers.length)}</p>
      </div>
      <div class="service-grid">
        <section class="service-card">
          <h3>${t('svEditorial')}<em>Editorial</em></h3>
          <ul class="plain-list">
            ${sv.editorial.map(x => `<li><span>${esc(x.name)}</span><span class="tag tag-jcr">${esc(x.tag)}</span></li>`).join('')}
          </ul>
        </section>
        <section class="service-card">
          <h3>${t('svPanels')}<em>Panels</em></h3>
          <ul class="plain-list">${sv.panels.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </section>
        <section class="service-card">
          <h3>${t('svConferences')}<em>Chairs</em></h3>
          <ul class="plain-list">${sv.conferences.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </section>
        <section class="service-card">
          <h3>${t('svSocieties')}<em>Societies</em></h3>
          <ul class="plain-list">${sv.societies.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </section>
      </div>
      <section class="block">
        <h3 class="sub-title">${t('svReviewer')}<em>${sv.reviewers.length} ${isEN() ? 'journals & conferences' : '种期刊与会议'}</em>
          <button class="btn btn-mini" id="toggle-reviewers">${t('expand')}</button>
        </h3>
        <div class="reviewer-cloud is-clipped" id="reviewer-cloud">
          ${sv.reviewers.map(x => `<span class="reviewer-chip">${esc(x)}</span>`).join('')}
        </div>
      </section>`;
    q('#toggle-reviewers').addEventListener('click', e => {
      const c = q('#reviewer-cloud');
      const clipped = c.classList.toggle('is-clipped');
      e.target.textContent = clipped ? t('expand') : t('collapse');
    });
  }

  /* ---------------- 讲座 ---------------- */
  let talkYear = 'all', talkQuery = '';
  function renderTalks() {
    const years = Array.from(new Set(CV2.talks.map(x => +x.d.slice(0, 4)))).sort((a, b) => a - b);
    const counts = years.map(y => ({ y, n: CV2.talks.filter(x => +x.d.slice(0, 4) === y).length }));
    const maxN = Math.max(...counts.map(c => c.n));
    q('#panel-talks').innerHTML = `
      <div class="section-head">
        <h2>${t('talkTitle')}</h2>
        <p>${t('talkSub').replace('{n}', CV2.talks.length)}</p>
      </div>
      <div class="talk-bars">
        ${counts.map(c => `
          <button class="talk-bar" data-ty="${c.y}" title="${c.y} · ${c.n} ${isEN() ? 'talks' : '场'}">
            <span class="talk-bar-n">${c.n}</span>
            <span class="talk-bar-track"><span class="talk-bar-fill" style="height:${Math.max(4, c.n / maxN * 100).toFixed(0)}%"></span></span>
            <span class="talk-bar-y">${String(c.y).slice(2)}</span>
          </button>`).join('')}
      </div>
      <div class="filter-row">
        <button class="filter-chip is-on" data-ty="all">${t('talkAllYears')}</button>
        ${years.slice().reverse().map(y => `<button class="filter-chip" data-ty="${y}">${y}</button>`).join('')}
        <input class="search" id="talk-search" type="search" placeholder="${t('talkSearch')}" />
      </div>
      <div class="talk-list" id="talk-list"></div>`;

    function drawTalks() {
      const items = CV2.talks.filter(x => {
        if (talkYear !== 'all' && +x.d.slice(0, 4) !== +talkYear) return false;
        if (talkQuery && !(x.o + ' ' + x.p + ' ' + x.t).toLowerCase().includes(talkQuery)) return false;
        return true;
      });
      q('#talk-list').innerHTML = items.map(x => `
        <article class="talk-row">
          <div class="talk-date">${x.d}</div>
          <div class="talk-main">
            <div class="talk-topic">${esc(x.t)}</div>
            <div class="talk-org">${esc(x.o)}<span class="talk-place">${esc(x.p)}</span></div>
          </div>
        </article>`).join('') || `<div class="empty">${t('talkEmpty')}</div>`;
    }
    const pickYear = e => {
      const b = e.target.closest('[data-ty]'); if (!b) return;
      talkYear = b.dataset.ty;
      qa('#panel-talks [data-ty]').forEach(x => x.classList.toggle('is-on', x.dataset.ty === talkYear));
      drawTalks();
    };
    q('#panel-talks .talk-bars').addEventListener('click', pickYear);
    q('#panel-talks .filter-row').addEventListener('click', pickYear);
    q('#talk-search').addEventListener('input', e => { talkQuery = e.target.value.trim().toLowerCase(); drawTalks(); });
    drawTalks();
  }

  /* ============================================================
     人生 K 线 · 时间轴叙事
     ============================================================ */
  const STATE = { step: 0, playing: false, speed: 1, autoFocus: true, timer: null, progressRaf: null };
  let journeyEntered = false;
  let pendingStep = (function () {
    const v = parseInt(URLP.get('step'), 10);
    return isNaN(v) ? null : v;
  })();

  const yearRow = (y) => S.table.find(r => r.year === y);
  const candleOf = (y) => S.candles.find(c => c.year === y);
  const fullView = () => ({ start: -0.4, count: S.candles.length + 0.9 });

  function rebuildJourney(keepStep) {
    const keep = typeof keepStep === 'number' ? keepStep : STATE.step;
    STATE.playing = false;
    clearTimeout(STATE.timer);
    buildTimeline();
    buildSteps();
    initChart();
    goTo(keep, { initial: true });
    chart.setViewport(fullView(), false);
    if (journeyEntered) focusYear(MILES[Math.max(0, Math.min(MILES.length - 1, keep))].year, false);
  }

  function buildTimeline() {
    const track = q('#tl-track');
    const maxVol = Math.max(...S.table.map(r => r.volume), 1);
    track.innerHTML = S.years.map((y) => {
      const row = yearRow(y);
      const c = candleOf(y);
      const ms = MILES.map((m, idx) => ({ m, idx })).filter(x => x.m.year === y);
      const up = c.close >= c.open;
      return `
        <div class="tl-year ${y > 2026 ? 'is-future' : ''} ${row.volume === 0 ? 'is-quiet' : ''}" data-year="${y}">
          <div class="tl-vol"><span style="height:${Math.max(4, row.volume / maxVol * 100)}%"></span></div>
          <div class="tl-chips">
            ${row.sci ? `<span class="tl-chip c-sci" title="SCI/SSCI/AHCI">${row.sci}<i>SCI</i></span>` : ''}
            ${row.ei ? `<span class="tl-chip c-ei" title="EI">${row.ei}<i>EI</i></span>` : ''}
            ${row.patents ? `<span class="tl-chip c-pat" title="${t('lgPatents')}">${row.patents}<i>${isEN() ? 'P' : '专'}</i></span>` : ''}
            ${row.talks ? `<span class="tl-chip c-talk" title="${t('lgTalks')}">${row.talks}<i>${isEN() ? 'T' : '讲'}</i></span>` : ''}
            ${row.newRoles.length ? `<span class="tl-chip c-role" title="${t('evNewRole')}">${row.newRoles.length}<i>${isEN() ? 'R' : '职'}</i></span>` : ''}
            ${row.projStart.length ? `<span class="tl-chip c-proj" title="${t('evNewProj')}">${row.projStart.length}<i>${isEN() ? 'G' : '项'}</i></span>` : ''}
            ${y > 2026 && row.projActive.length ? `<span class="tl-chip c-live" title="${t('ysActive')}">${row.projActive.length}<i>${isEN() ? 'A' : '研'}</i></span>` : ''}
          </div>
          <div class="tl-dots">
            ${ms.map(x => `<button class="tl-dot cat-${x.m.cat}" data-step="${x.idx}" aria-label="${x.m.year} ${esc(x.m.title)}" title="${x.m.year}.${String(x.m.month || 6).padStart(2, '0')} · ${esc(x.m.title)}"><span></span></button>`).join('')}
          </div>
          <div class="tl-year-label">
            <b>${y}</b>
            <span class="tl-idx ${up ? 'up' : 'down'}">${Math.round(c.close)}</span>
          </div>
          <div class="tl-playhead"></div>
        </div>`;
    }).join('');

    if (!track.dataset.bound) {
      track.addEventListener('click', e => {
        const dot = e.target.closest('[data-step]');
        if (dot) { pause(); goTo(+dot.dataset.step); return; }
        const yr = e.target.closest('[data-year]');
        if (yr) {
          const y = +yr.dataset.year;
          const first = MILES.findIndex(m => m.year === y);
          if (first >= 0) { pause(); goTo(first); }
          else showYearSummary(y, true);
        }
      });
      track.dataset.bound = '1';
    }
  }

  function buildSteps() {
    q('#step-dots').innerHTML = MILES.map((m, i) =>
      `<button class="sd cat-${m.cat}" data-step="${i}" title="${m.year} · ${esc(m.title)}"></button>`).join('');
    const dots = q('#step-dots');
    if (!dots.dataset.bound) {
      dots.addEventListener('click', e => {
        const b = e.target.closest('[data-step]'); if (!b) return;
        pause(); goTo(+b.dataset.step);
      });
      q('#ys-body').addEventListener('click', e => {
        const n = e.target.closest('[data-step]'); if (!n) return;
        pause(); goTo(+n.dataset.step);
      });
      dots.dataset.bound = '1';
    }
  }

  function onJourneyEnter() {
    if (!chart) initChart();
    chart.resize();
    if (!journeyEntered) {
      journeyEntered = true;
      chart.setViewport(fullView(), false);
      if (!STATIC) {
        chart.playDraw(2100);
        setTimeout(() => chart && chart.revealTo(S.candles.length, 950), 2350);
      } else {
        chart.visible = chart.series.candles.length;
      }
      const go = () => {
        if (pendingStep !== null) { goTo(pendingStep); pendingStep = null; }
        focusYear(MILES[Math.max(0, STATE.step)].year, !STATIC);
      };
      if (STATIC) go(); else setTimeout(go, 1050);
    }
  }

  function initChart() {
    if (chart && chart._ro) chart._ro.disconnect();
    const wrap = q('.chart-canvas-wrap');
    const old = q('#kline');
    const canvas = document.createElement('canvas');
    canvas.id = 'kline';
    if (old) old.replaceWith(canvas); else wrap.appendChild(canvas);

    chart = new window.KlineChart(canvas, S, {
      labels: {
        ma3: 'MA3', ma5: 'MA5',
        forecast: t('chartForecast'),
        trend: t('chartTrend'),
        volume: t('chartVolume'),
        forecastArea: t('chartForecastArea')
      }
    });
    chart.setTheme(document.documentElement.dataset.theme || 'dark');
    chart._ro = new ResizeObserver(() => chart && chart.resize());
    chart._ro.observe(wrap);

    chart.onHover = (i, x, y) => {
      const tip = q('#chart-tip');
      if (i < 0) { tip.classList.remove('is-on'); chart._rangeLocked = false; chart._computeRange(); chart._animate(); return; }
      const c = S.candles[i], r = yearRow(c.year) || {};
      chart._rangeLocked = true;
      const chg = ((c.close - c.open) / c.open * 100).toFixed(1);
      const note = c.actual
        ? `${t('tipPapers')} ${r.papers || 0} · ${t('tipPatents')} ${r.patents || 0} · ${t('tipTalks')} ${r.talks || 0}`
        : `${t('tipForecast')} · ${t('tipNewProj')} ${r.projStart ? r.projStart.length : 0} · ${t('tipActive')} ${r.projActive ? r.projActive.length : 0}`;
      tip.innerHTML = `
        <div class="tip-head"><b>${c.year}</b>${c.actual ? `<span class="tip-tag">${t('tipActual')}</span>` : `<span class="tip-tag tip-fc">${t('tipForecast')}</span>`}</div>
        <div class="tip-grid">
          <span>${t('tipOpen')}</span><b>${c.open.toFixed(1)}</b>
          <span>${t('tipHigh')}</span><b class="up">${c.high.toFixed(1)}</b>
          <span>${t('tipLow')}</span><b class="down">${c.low.toFixed(1)}</b>
          <span>${t('tipClose')}</span><b>${c.close.toFixed(1)}</b>
        </div>
        <div class="tip-chg ${chg >= 0 ? 'up' : 'down'}">${chg >= 0 ? '+' : ''}${chg}%</div>
        <div class="tip-note">${note}</div>`;
      const box = canvas.parentElement.getBoundingClientRect();
      tip.style.left = Math.min(box.width - 200, Math.max(8, x - box.left + 14)) + 'px';
      tip.style.top = Math.min(box.height - 150, Math.max(8, y - box.top - 30)) + 'px';
      tip.classList.add('is-on');
    };
    chart.onPick = (i) => {
      const y = S.candles[i].year;
      const first = MILES.findIndex(m => m.year === y);
      pause();
      if (first >= 0) goTo(first); else showYearSummary(y, true);
    };
  }

  function focusYear(year, animate) {
    if (!chart) return;
    const idx = S.candles.findIndex(c => c.year === year);
    const total = S.candles.length;
    if (!STATE.autoFocus) { chart.setActive(idx, { from: idx - 0.5, to: idx + 0.5 }); return; }
    let count = 9;
    let start = idx - count / 2 + 0.5;
    if (start < 0) start = 0;
    if (start > total - count) start = total - count;
    if (year >= 2026) { count = 8; start = Math.min(total - count, Math.max(0, idx - 4)); }
    chart.setViewport({ start, count }, animate);
    chart.setActive(idx, { from: idx - 0.5, to: idx + 0.5 });
  }

  function cardHTML(m, i) {
    const row = yearRow(m.year);
    const future = m.year > 2026;
    const chips = [];
    if (row.newRoles.length) chips.push(`<span class="ev-chip c-role">${t('evNewRole')} ×${row.newRoles.length}</span>`);
    if (row.projStart.length) chips.push(`<span class="ev-chip c-proj">${t('evNewProj')} ×${row.projStart.length}</span>`);
    if (row.projEnd.length) chips.push(`<span class="ev-chip">${t('evProjEnd')} ×${row.projEnd.length}</span>`);
    if (row.sci) chips.push(`<span class="ev-chip c-sci">SCI ${row.sci}</span>`);
    if (row.ei) chips.push(`<span class="ev-chip c-ei">EI ${row.ei}</span>`);
    if (row.conf) chips.push(`<span class="ev-chip c-talk">${t('evConf')} ${row.conf}</span>`);
    if (row.patents) chips.push(`<span class="ev-chip c-pat">${t('evPatent')} ${row.patents}</span>`);
    if (row.talks) chips.push(`<span class="ev-chip c-talk">${t('evTalk')} ${row.talks}</span>`);
    if (row.awards) chips.push(`<span class="ev-chip c-award">${t('evAward')} ${row.awards}</span>`);
    return `
      <div class="ev-kicker"><span class="ev-cat cat-${m.cat}">${esc(m.kicker)}</span><span class="ev-date">${m.year}.${String(m.month || 6).padStart(2, '0')}</span></div>
      <h3 class="ev-title">${esc(m.title)}</h3>
      <p class="ev-desc">${esc(m.desc)}</p>
      <div class="ev-chips">${chips.join('')}</div>
      <div class="ev-foot">
        <span class="ev-hint">${future ? t('evFuture') : t('evHist')} · ${t('evInterval')} ${(m.dur * STATE.speed / 1000).toFixed(1)}s</span>
        <span class="ev-count">${i + 1} / ${MILES.length}</span>
      </div>`;
  }

  function showYearSummary(year, scrollOnly) {
    const row = yearRow(year);
    if (!row) return;
    const c = candleOf(year);
    const chg = ((c.close - c.open) / c.open * 100);
    const fundTxt = isEN() ? moneyEN(row.fundingNew) : `¥${row.fundingNew.toFixed(1)} 万`;
    q('#ys-year').textContent = year;
    q('#ys-body').innerHTML = `
      <div class="ys-kline">
        <div><span>${t('ysOpen')}</span><b>${c.open.toFixed(0)}</b></div>
        <div><span>${t('ysClose')}</span><b>${c.close.toFixed(0)}</b></div>
        <div><span>${t('ysChange')}</span><b class="${chg >= 0 ? 'up' : 'down'}">${chg >= 0 ? '+' : ''}${chg.toFixed(1)}%</b></div>
      </div>
      ${row.newRoles.length ? `<div class="ys-group"><h4>${t('ysNewRoles')}</h4>${row.newRoles.map(r => `<div class="ys-line"><b>${esc(r.title)}</b><span>${esc(r.org)}</span></div>`).join('')}</div>` : ''}
      ${row.eduStart.length || row.eduEnd.length ? `<div class="ys-group"><h4>${t('ysEdu')}</h4>${row.eduStart.map(e => `<div class="ys-line"><b>${t('ysEnrolled')} ${esc(e.school)}</b><span>${esc(e.degree)}</span></div>`).join('')}${row.eduEnd.map(e => `<div class="ys-line"><b>${t('ysGraduated')} ${esc(e.school)}</b><span>${esc(e.degree)}</span></div>`).join('')}</div>` : ''}
      ${row.projStart.length ? `<div class="ys-group"><h4>${t('ysProjStart')}</h4>${row.projStart.map(p => `<div class="ys-line"><b>${esc(p.name.length > 46 ? p.name.slice(0, 46) + '…' : p.name)}</b><span>${esc(p.period)} · ${esc(p.amount)}</span></div>`).join('')}</div>` : ''}
      ${row.projEnd.length ? `<div class="ys-group"><h4>${t('ysProjEnd')}</h4>${row.projEnd.map(p => `<div class="ys-line"><b>${esc(p.name.length > 46 ? p.name.slice(0, 46) + '…' : p.name)}</b><span>${esc(p.status)}</span></div>`).join('')}</div>` : ''}
      <div class="ys-group"><h4>${t('ysStats')}</h4>
        <div class="ys-stats">
          <div><b>${row.sci}</b><span>${t('ysStatSci')}</span></div>
          <div><b>${row.ei}</b><span>${t('ysStatEi')}</span></div>
          <div><b>${row.conf}</b><span>${t('ysStatConf')}</span></div>
          <div><b>${row.patents}</b><span>${t('ysStatPat')}</span></div>
          <div><b>${row.talks}</b><span>${t('ysStatTalk')}</span></div>
          <div><b>${row.awards}</b><span>${t('ysStatAward')}</span></div>
        </div>
      </div>
      ${row.fundingNew ? `<div class="ys-group"><h4>${t('ysFunding')}</h4><div class="ys-line"><b>${fundTxt}</b><span>${row.projStart.length} ${t('ysNewProjects')}</span></div></div>` : ''}
      ${row.projActive.length ? `<div class="ys-group"><h4>${t('ysActive')}</h4>${row.projActive.map(p => `<div class="ys-line"><b>${esc(p.name.length > 44 ? p.name.slice(0, 44) + '…' : p.name)}</b><span>${esc(p.role)}</span></div>`).join('')}</div>` : ''}
      ${MILES.filter(m => m.year === year).length ? `<div class="ys-group"><h4>${t('ysNodes')}</h4>${MILES.map((m, i) => ({ m, i })).filter(x => x.m.year === year).map(x => `<div class="ys-line ys-node" data-step="${x.i}"><b>${esc(x.m.title)}</b><span>${t('ysClick')} · ${esc(x.m.kicker)}</span></div>`).join('')}</div>` : ''}`;
    if (scrollOnly) focusYear(year, true);
  }

  function goTo(i, opt) {
    opt = opt || {};
    i = Math.max(0, Math.min(MILES.length - 1, i));
    STATE.step = i;
    const m = MILES[i];
    const card = q('#event-card');
    card.classList.remove('is-in');
    void card.offsetWidth;
    card.innerHTML = cardHTML(m, i);
    card.classList.add('is-in');
    card.dataset.cat = m.cat;

    qa('.tl-year').forEach(el => el.classList.toggle('is-active', +el.dataset.year === m.year));
    qa('.tl-dot').forEach(el => el.classList.toggle('is-active', +el.dataset.step === i));
    qa('.sd').forEach((el, k) => el.classList.toggle('is-active', k === i));

    q('#step-count').textContent = `${i + 1} / ${MILES.length}`;
    q('#step-label').textContent = m.year + '';
    q('#btn-prev').disabled = i === 0;
    q('#btn-next').disabled = i === MILES.length - 1;

    focusYear(m.year, !opt.initial);
    showYearSummary(m.year);
    centerTimeline(m.year);

    if (m.year > 2026 && chart) {
      const idx = S.candles.findIndex(c => c.year === m.year);
      chart.revealTo(idx + 1, 620);
    }
    if (STATE.playing) scheduleNext();
    startStepProgress(m.dur * STATE.speed);
  }

  function centerTimeline(year) {
    const track = q('#tl-track');
    const el = track.querySelector(`.tl-year[data-year="${year}"]`);
    if (!el) return;
    const wrap = q('#tl-scroll');
    const wr = wrap.getBoundingClientRect(), er = el.getBoundingClientRect();
    const delta = (er.left - wr.left) - (wr.width / 2 - er.width / 2);
    wrap.scrollTo({ left: Math.max(0, wrap.scrollLeft + delta), behavior: STATIC ? 'auto' : 'smooth' });
  }

  function startStepProgress(total) {
    const bar = q('#step-progress');
    if (STATE.progressRaf) cancelAnimationFrame(STATE.progressRaf);
    if (!STATE.playing) { bar.style.width = '0%'; return; }
    const t0 = performance.now();
    function tick(now) {
      const k = Math.min(1, (now - t0) / total);
      bar.style.width = (k * 100).toFixed(1) + '%';
      if (k < 1 && STATE.playing) STATE.progressRaf = requestAnimationFrame(tick);
    }
    STATE.progressRaf = requestAnimationFrame(tick);
  }

  function scheduleNext() {
    clearTimeout(STATE.timer);
    const m = MILES[STATE.step];
    if (!m) return;
    STATE.timer = setTimeout(() => {
      if (!STATE.playing) return;
      if (STATE.step >= MILES.length - 1) { pause(); return; }
      goTo(STATE.step + 1);
    }, m.dur * STATE.speed);
  }

  function play() {
    if (STATE.step >= MILES.length - 1) goTo(0);
    STATE.playing = true;
    const b = q('#btn-play');
    b.classList.add('is-playing'); b.innerHTML = `<span class="ico">❚❚</span> ${t('pause')}`;
    scheduleNext();
    startStepProgress(MILES[STATE.step].dur * STATE.speed);
  }

  function pause() {
    STATE.playing = false;
    clearTimeout(STATE.timer);
    if (STATE.progressRaf) cancelAnimationFrame(STATE.progressRaf);
    const b = q('#btn-play');
    if (b) { b.classList.remove('is-playing'); b.innerHTML = `<span class="ico">▶</span> ${t('play')}`; }
  }

  function bindJourney() {
    q('#btn-next').addEventListener('click', () => { pause(); goTo(STATE.step + 1); });
    q('#btn-prev').addEventListener('click', () => { pause(); goTo(STATE.step - 1); });
    q('#btn-play').addEventListener('click', () => { STATE.playing ? pause() : play(); });
    q('#btn-replay').addEventListener('click', () => {
      pause();
      chart.setViewport(fullView(), true);
      chart.playDraw(1900);
      setTimeout(() => chart && chart.revealTo(S.candles.length, 900), 2000);
      setTimeout(() => goTo(0), 1000);
    });
    q('#speed').addEventListener('change', e => {
      STATE.speed = parseFloat(e.target.value);
      goTo(STATE.step);
    });
    q('#btn-full').addEventListener('click', () => {
      STATE.autoFocus = !STATE.autoFocus;
      q('#btn-full').classList.toggle('is-on', !STATE.autoFocus);
      q('#btn-full').textContent = STATE.autoFocus ? t('focusAuto') : t('focusFull');
      if (!STATE.autoFocus) { chart.setViewport(fullView(), true); chart.setActive(-1, null); }
      else focusYear(MILES[STATE.step].year, true);
    });
    document.addEventListener('keydown', e => {
      if (!q('#panel-journey').classList.contains('is-active')) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); pause(); goTo(STATE.step + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); pause(); goTo(STATE.step - 1); }
      else if (e.key === ' ') { e.preventDefault(); STATE.playing ? pause() : play(); }
    });
  }

  /* ---------------- 启动 ---------------- */
  function boot() {
    LANG = (URLP.get('lang') || store.get(langKey) || 'en') === 'zh' ? 'zh' : 'en';
    CV = LANG === 'en' ? window.CV_EN : window.CV;
    CV2 = LANG === 'en' ? window.CV2_EN : window.CV2;
    S = window.MODEL.build(CV, CV2);
    MILES = CV.milestones.slice().sort((a, b) => a.year - b.year || (a.month || 0) - (b.month || 0));

    applyStaticText();
    buildNav();

    renderOverview(); renderEducation(); renderWork(); renderProjects(); renderPapers();
    renderPatents(); renderAwards(); renderTeaching(); renderService(); renderTalks();
    bindJourney();
    rebuildJourney(Math.max(0, pendingStep || 0));

    applyTheme(URLP.get('theme') || store.get(themeKey) || 'dark');
    qa('[data-theme-btn]').forEach(b => b.addEventListener('click', () => applyTheme(b.dataset.themeBtn)));
    qa('[data-lang-btn]').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.langBtn === LANG) return;
      const tab = q('.tab-btn.is-active');
      applyLang(b.dataset.langBtn, { keepStep: STATE.step, keepTab: tab ? tab.dataset.tab : 'overview' });
    }));

    const hash = (location.hash || '').replace('#', '');
    switchTab(TABS.some(x => x.id === hash) ? hash : 'overview', true);
    window.addEventListener('hashchange', () => switchTab((location.hash || '').replace('#', ''), true));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
