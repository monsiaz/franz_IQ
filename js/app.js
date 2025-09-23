(() => {
  let TOTAL_QUESTIONS = 15;

  /**
   * Simple set of fun, easy questions with optional inline SVG visuals.
   * Each question contains options with a boolean 'isCorrect'.
   */
  // Fallback starter questions (will be replaced when loading JSON succeeds)
  let QUESTIONS = [
    // 3x3 matrix logic: third cell follows rotation rule
    {
      prompt: 'Complétez la matrice 3×3',
      media: svgMatrixMain(),
      theme: 'logique',
      options: [
        { text: '', icon: svgMatrixOption('A'), isCorrect: false, color: 'bg-answer' },
        { text: '', icon: svgMatrixOption('B'), isCorrect: true,  color: 'bg-answer' },
        { text: '', icon: svgMatrixOption('C'), isCorrect: false, color: 'bg-answer' },
        { text: '', icon: svgMatrixOption('D'), isCorrect: false, color: 'bg-answer' }
      ]
    },
    {
      prompt: 'Quel motif complète la série ?',
      media: svgMotifSequence(),
      theme: 'logique',
      options: [
        { text: 'A', icon: svgSmallSquare(), isCorrect: false, color: 'bg-answer' },
        { text: 'B', icon: svgSmallSquare(true), isCorrect: true, color: 'bg-answer' },
        { text: 'C', icon: svgSmallCross(), isCorrect: false, color: 'bg-answer' },
        { text: 'D', icon: svgSmallCircle(), isCorrect: false, color: 'bg-answer' }
      ]
    },
    {
      prompt: 'Quelle figure complète la grille ?',
      media: svgPuzzle('grid-hole'),
      theme: 'formes',
      options: [
        { text: 'Carré simple', isCorrect: false, color: 'bg-answer' },
        { text: 'Grille complète', isCorrect: true, color: 'bg-answer' },
        { text: 'Croix', isCorrect: false, color: 'bg-answer' },
        { text: 'Triangle', isCorrect: false, color: 'bg-answer' }
      ]
    },
    { prompt: 'Quel nombre suit: 2, 4, 8, 16, ... ?', media: svgBars([2,4,8,16]), theme: 'numerique', options: [
      { text: '24', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '30', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '32', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: '26', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Combien de côtés a un octogone ?', media: svgOctagonRef(), theme: 'formes', options: [
      { text: '6', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '8', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: '10', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '12', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quel mot est un synonyme de "rapide" ?', media: svgSpeedIcon(), theme: 'vocabulaire', options: [
      { text: 'Lent', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Vite', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: 'Immense', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Brume', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quelle forme a 3 côtés ?', media: svgTriangleRef(), theme: 'formes', options: [
      { text: 'Triangle', icon: svgSmallTriangle(), isCorrect: true, color: 'bg-answer' },
      { text: 'Cercle', icon: svgSmallCircle(), isCorrect: false, color: 'bg-answer' },
      { text: 'Carré', icon: svgSmallSquare(), isCorrect: false, color: 'bg-answer' },
      { text: 'Pentagone', icon: svgSmallPentagon(), isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Complétez: L, M, N, O, ...', media: svgLettersSeq(['L','M','N','O','?']), theme: 'vocabulaire', options: [
      { text: 'P', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: 'Q', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'R', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Combien font 7 × 6 ?', media: svgDotsGrid(7, 6), theme: 'numerique', options: [
      { text: '42', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: '36', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '48', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '40', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Le contraire de "ouvert" est ...', media: svgDoorOpen(), theme: 'vocabulaire', options: [
      { text: 'Fermé', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: 'Large', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Vide', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Transparent', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quel est le jour suivant lundi ?', media: svgCalendar('Lun'), theme: 'logique', options: [
      { text: 'Mardi', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: 'Samedi', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Dimanche', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Jeudi', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quel est le plus grand nombre ?', media: svgBars([99,100,101]), theme: 'numerique', options: [
      { text: '99', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '100', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '101', icon: '', isCorrect: true, color: 'bg-answer' }
    ] },
    { prompt: 'Quel est l'intrus ?', media: svgOddOneOut(), theme: 'formes', options: [
      { text: 'Rouge', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Bleu', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Carré', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: 'Vert', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Dans la suite 1, 1, 2, 3, 5, 8, ... ?', media: svgBars([1,1,2,3,5,8]), theme: 'numerique', options: [
      { text: '13', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: '14', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '10', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '12', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Si un train part à 12h et met 2h, il arrive à ...', media: svgClockRange(12,14), theme: 'logique', options: [
      { text: '13h', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '14h', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: '15h', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quelle forme est uniquement composée de lignes courbes ?', media: svgShapes(true), theme: 'formes', options: [
      { text: 'Cercle', icon: svgSmallCircle(), isCorrect: true, color: 'bg-answer' },
      { text: 'Triangle', icon: svgSmallTriangle(), isCorrect: false, color: 'bg-answer' },
      { text: 'Rectangle', icon: svgSmallSquare(), isCorrect: false, color: 'bg-answer' },
      { text: 'Carré', icon: svgSmallSquare(), isCorrect: false, color: 'bg-answer' }
    ] },

    // Symétrie: choisir l'image miroir
    { prompt: 'Quelle image est la symétrie horizontale ?', media: svgMirrorPrompt(), theme: 'formes', options: [
      { text: '', icon: svgMirrorOption('A'), isCorrect: false, color: 'bg-answer' },
      { text: '', icon: svgMirrorOption('B'), isCorrect: true, color: 'bg-answer' },
      { text: '', icon: svgMirrorOption('C'), isCorrect: false, color: 'bg-answer' },
      { text: '', icon: svgMirrorOption('D'), isCorrect: false, color: 'bg-answer' }
    ] },

    // Suite visuelle: barres croissantes
    { prompt: 'Quelle barre complète la progression ?', media: svgBarsPrompt([2,4,6]), theme: 'logique', options: [
      { text: '', icon: svgBarChoice(6), isCorrect: false, color: 'bg-answer' },
      { text: '', icon: svgBarChoice(8), isCorrect: true, color: 'bg-answer' },
      { text: '', icon: svgBarChoice(10), isCorrect: false, color: 'bg-answer' },
      { text: '', icon: svgBarChoice(12), isCorrect: false, color: 'bg-answer' }
    ] },

    // Comptage: combien de points ?
    { prompt: 'Combien de points voyez-vous ?', media: svgDotsCountPrompt(12), theme: 'numerique', options: [
      { text: '10', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '12', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: '14', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '16', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },

    // Vocabulaire
    { prompt: 'Quel est le synonyme de "début" ?', media: '', theme: 'vocabulaire', options: [
      { text: 'Commencement', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: 'Fin', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Arrêt', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: 'Barrage', icon: '', isCorrect: false, color: 'bg-answer' }
    ] },

    // Logique temporelle
    { prompt: 'Après 21h vient ...', media: '', theme: 'logique', options: [
      { text: '22h', icon: '', isCorrect: true, color: 'bg-answer' },
      { text: '20h', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '23h', icon: '', isCorrect: false, color: 'bg-answer' },
      { text: '19h', icon: '', isCorrect: false, color: 'bg-answer' }
    ] }
  ];

  // Total basé sur la longueur réelle
  TOTAL_QUESTIONS = QUESTIONS.length;

  // Load external questions.json with random version selection
  fetch('./js/questions.json').then(r=>r.ok?r.json():Promise.reject()).then(data=>{
    console.log('Question data loaded:', data);
    
    // Select random version (A, B, or C)
    const versions = ['version_a', 'version_b', 'version_c'];
    const randomVersion = versions[Math.floor(Math.random() * versions.length)];
    let selectedQuestions = data[randomVersion];
    
    console.log(`Selected ${randomVersion} with ${selectedQuestions?.length || 0} questions`);
    
    if (Array.isArray(selectedQuestions) && selectedQuestions.length) {
      // Validate/normalize visual coherence before using, then auto-fix and filter
      selectedQuestions = validateQuestionsVisualCoherence(selectedQuestions);
      selectedQuestions = autoFixAndFilter(selectedQuestions);
      QUESTIONS = selectedQuestions; // Use selected version directly (already 20 questions)
      TOTAL_QUESTIONS = QUESTIONS.length;
      console.log('Total questions loaded:', TOTAL_QUESTIONS);
      
      // Always reset state when new questions are loaded
      state = initialState();
      // Force re-render if quiz is already visible
      if (!document.getElementById('hero').classList.contains('d-none')) {
        renderPagination();
        render();
        renderThemeSidebar();
      }
    }
  }).catch(e=>{console.error('Failed to load questions:', e);});

  // ===== Helpers to scale to 8 items per theme when needed =====
  function ensureEightPerTheme(items){
    const perTheme = { logique: [], formes: [], numerique: [], vocabulaire: [] };
    items.forEach(q=>{ (perTheme[normalizeTheme(q.theme)]).push(q); });
    const out = [];
    Object.keys(perTheme).forEach(theme=>{
      let arr = perTheme[theme];
      while (arr.length < 8) {
        if (theme === 'logique') arr.push(genLogicVariant(arr.length));
        else if (theme === 'formes') arr.push(genFormesVariant(arr.length));
        else if (theme === 'numerique') arr.push(genNumeriqueVariant(arr.length));
        else arr.push(genVocabVariant(arr.length));
      }
      out.push(...arr);
    });
    return out;
  }
  function genLogicVariant(i){
    const start = 2 + (i%3);
    const vals = [start, start*2, start*3];
    return { theme:'logique', prompt:'Quelle barre complète la progression ?', media:{ type:'bars', values: vals }, options:[
      { text:'', icon:'bar-'+(vals[1]), isCorrect:false },
      { text:'', icon:'bar-'+(vals[2]), isCorrect:true },
      { text:'', icon:'bar-'+(vals[2]+2), isCorrect:false },
      { text:'', icon:'bar-'+(vals[2]+4), isCorrect:false }
    ] };
  }
  function genFormesVariant(i){
    const correctIdx = i%4;
    return { theme:'formes', prompt:'Identifiez la forme demandée', media:{ type:'shapes', variant:'mix'}, options:[
      { text:'', icon:'triangle', isCorrect: correctIdx===0 },
      { text:'', icon:'circle', isCorrect: correctIdx===1 },
      { text:'', icon:'square', isCorrect: correctIdx===2 },
      { text:'', icon:'pentagon', isCorrect: correctIdx===3 }
    ] };
  }
  function genNumeriqueVariant(i){
    const a = 3 + (i%4); const seq = [a, a*2, a*4, a*8];
    return { theme:'numerique', prompt:'Quel nombre suit: '+seq.slice(0,3).join(', ')+', '+seq[3]+', ... ?', media:{ type:'bars', values: seq }, options:[
      { text:String(seq[3]*2), isCorrect:true },
      { text:String(seq[3]+6), isCorrect:false },
      { text:String(seq[3]+10), isCorrect:false },
      { text:String(seq[3]-4), isCorrect:false }
    ] };
  }
  function genVocabVariant(i){
    const pairs = [ ['rapide','vite'], ['grand','immense'], ['clair','évident'], ['heureux','joyeux'] ];
    const p = pairs[i%pairs.length];
    return { theme:'vocabulaire', prompt:'Quel est le synonyme de "'+p[0]+'" ?', media:{}, options:[
      { text:p[1], isCorrect:true }, { text:'lent', isCorrect:false }, { text:'opaque', isCorrect:false }, { text:'terne', isCorrect:false }
    ] };
  }

  function initialState() {
    return {
      index: 0,
      score: 0,
      completed: Array(TOTAL_QUESTIONS).fill(false),
      themeScores: { logique: 0, vocabulaire: 0, numerique: 0, formes: 0 },
      themeAttempts: { logique: 0, vocabulaire: 0, numerique: 0, formes: 0 },
      streak: 0,
      qStart: performance.now(),
      subscribed: false,
      popupsShown: 0, // Track popup count for intelligent distribution
      lastPopupAt: -1 // Track last popup question index
    };
  }

  let state = initialState();

  const els = {
    hero: document.getElementById('hero'),
    quizSection: document.getElementById('quizSection'),
    resultsSection: document.getElementById('resultsSection'),
    questionText: document.getElementById('questionText'),
    questionMedia: document.getElementById('questionMedia'),
    answers: document.getElementById('answers'),
    feedback: document.getElementById('feedback'),
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    pagination: document.getElementById('pagination'),
    progressBar: document.getElementById('progressBar'),
    stepNow: document.getElementById('stepNow'),
    stepTotal: document.getElementById('stepTotal'),
    scoreText: document.getElementById('scoreText'),
    percentile: document.getElementById('percentile'),
    themeBadge: document.getElementById('themeBadge')
  };

  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('btnStartHero').addEventListener('click', startQuiz);
  document.getElementById('btnStartTop').addEventListener('click', startQuiz);
  
  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.querySelector('.theme-icon');
  let isDark = localStorage.getItem('theme') === 'dark';
  
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
  
  applyTheme(isDark);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      isDark = !isDark;
      applyTheme(isDark);
    });
  }
  document.getElementById('btnRestart')?.addEventListener('click', () => {
    state = initialState();
    state.subscribed = true; // keep access if already paid during session
    showSection('quiz');
    render();
    renderThemeSidebar();
  });

  els.btnPrev.addEventListener('click', () => move(-1));
  els.btnNext.addEventListener('click', () => move(1));

  function startQuiz() {
    state = initialState();
    showSection('quiz');
    renderPagination();
    render();
    renderThemeSidebar();
    enableKeyboard();
  }

  function showSection(which) {
    const map = { hero: 'hero', quiz: 'quizSection', results: 'resultsSection' };
    ['hero','quizSection','resultsSection'].forEach(id => document.getElementById(id).classList.add('d-none'));
    document.getElementById(map[which] || 'hero').classList.remove('d-none');
  }

  function move(delta) {
    const nextIndex = state.index + delta;
    if (nextIndex < 0) return;
    // At the end, show paywall before results if not subscribed
    if (nextIndex >= TOTAL_QUESTIONS) {
      if (!state.subscribed) {
        const modal = new bootstrap.Modal(document.getElementById('paywallModal'));
        modal.show();
        return;
      }
      showResults();
      return;
    }

    state.index = nextIndex;
    render();
    renderPagination();
  }

  function handleAnswerClick(optionEl, isCorrect) {
    if (state.completed[state.index]) return;
    state.completed[state.index] = true;
    const themeNow = normalizeTheme(QUESTIONS[state.index].theme);
    state.themeAttempts[themeNow] = (state.themeAttempts[themeNow] || 0) + 1;
    if (isCorrect) {
      state.score += 1;
      state.themeScores[themeNow] = (state.themeScores[themeNow] || 0) + 1;
      state.streak += 1;
    } else {
      state.streak = 0;
    }
    const elapsedMs = performance.now() - (state.qStart||performance.now());
    // Neutral UX: do not reveal correctness
    optionEl.classList.add('selected');
    Array.from(els.answers.children).forEach(c => c.disabled = true);
    els.feedback.innerHTML = getContextualFeedback(themeNow, isCorrect);
    renderProgress();
    renderPagination();
    maybeEncourageIntelligent(isCorrect, elapsedMs);
    renderThemeSidebar();
    
    // Smooth transition to next question (except last question)
    setTimeout(() => {
      if (state.index === TOTAL_QUESTIONS - 1) {
        // Last question: show paywall with reassurance
        showPaywallWithReassurance();
      } else {
        // Auto-advance with smooth animation
        const cardBody = document.querySelector('#quizSection .card-body');
        if (cardBody) {
          cardBody.style.transform = 'translateX(-20px)';
          cardBody.style.opacity = '0.7';
          setTimeout(() => {
            move(1);
            cardBody.style.transform = 'translateX(0)';
            cardBody.style.opacity = '1';
          }, 150);
        } else {
          move(1);
        }
      }
    }, 800);
  }

  function render() {
    console.log('Rendering question', state.index, 'of', TOTAL_QUESTIONS);
    const q = QUESTIONS[state.index];
    console.log('Current question:', q);
    state.qStart = performance.now();
    
    if (els.stepTotal) els.stepTotal.textContent = String(TOTAL_QUESTIONS);
    if (els.stepNow) els.stepNow.textContent = String(state.index + 1);
    if (els.questionText) els.questionText.textContent = q.prompt || 'Question manquante';
    if (els.themeBadge) els.themeBadge.innerHTML = q.theme ? `<span class="theme-pill">${capitalize(q.theme)}</span>` : '';
    
    // Render media with debugging
    try {
      const mediaHtml = renderMedia(q.media);
      console.log('Media HTML generated:', mediaHtml ? 'YES' : 'NO', q.media);
      if (els.questionMedia) els.questionMedia.innerHTML = mediaHtml;
    } catch (e) {
      console.error('Media render error:', e);
      if (els.questionMedia) els.questionMedia.innerHTML = '';
    }
    
    if (els.feedback) els.feedback.innerHTML = '';
    if (els.answers) {
      els.answers.innerHTML = '';
      els.answers.classList.add('d-grid');
    }
    
    const opts = Array.isArray(q.options) && q.options.length ? q.options : [
      { text: 'Option 1', icon: '', isCorrect: false },
      { text: 'Option 2', icon: '', isCorrect: false },
      { text: 'Option 3', icon: '', isCorrect: false },
      { text: 'Option 4', icon: '', isCorrect: false }
    ];
    console.log('Options:', opts.length);
    
    opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = `answer btn text-start ${opt.color || 'bg-answer'}`.trim();
      let iconHtml = '';
      try { 
        iconHtml = opt.icon ? renderIcon(opt.icon) : ''; 
        console.log(`Option ${i} icon:`, opt.icon, '→', iconHtml ? 'rendered' : 'empty');
      } catch (e) { 
        console.error(`Icon render error for option ${i}:`, e);
        iconHtml = ''; 
      }
      const label = opt.text || '';
      // If no text and there's an icon, show only the icon (visual questions)
      if (!label && iconHtml) {
        btn.innerHTML = `<div class="d-flex justify-content-center">${iconHtml}</div>`;
      } else {
        // Show both icon and text, or just text if no icon
        btn.innerHTML = `<div class="d-flex align-items-center gap-3">${iconHtml}<span class="fw-semibold">${label}</span></div>`;
      }
      btn.addEventListener('click', () => handleAnswerClick(btn, !!opt.isCorrect));
      if (els.answers) els.answers.appendChild(btn);
    });

    if (els.btnPrev) els.btnPrev.disabled = state.index === 0;
    if (els.btnNext) els.btnNext.textContent = state.index === TOTAL_QUESTIONS - 1 ? 'Terminer' : 'Suivant';
    renderProgress();
    const bodyEl = document.querySelector('#quizSection .card-body');
    if (bodyEl) {
      bodyEl.classList.remove('fade-slide-in');
      void bodyEl.offsetWidth;
      bodyEl.classList.add('fade-slide-in');
    }
    renderThemeSidebar();
  }

  function renderProgress() {
    const completedCount = state.completed.filter(Boolean).length;
    const pct = Math.round((completedCount / TOTAL_QUESTIONS) * 100);
    if (els.progressBar) els.progressBar.style.width = `${pct}%`;
    
    // Enhanced progress indicators
    const stepLabel = document.getElementById('stepLabel');
    if (stepLabel) stepLabel.textContent = `Étape ${Math.min(completedCount+1, TOTAL_QUESTIONS)}/${TOTAL_QUESTIONS}`;
    
    // Estimated time remaining
    const avgTimePerQ = 15; // seconds
    const remaining = Math.max(0, TOTAL_QUESTIONS - completedCount);
    const timeLeft = Math.round(remaining * avgTimePerQ / 60); // minutes
    const timeEl = document.querySelector('.time-estimate');
    if (timeEl) {
      if (timeLeft > 1) {
        timeEl.textContent = `≈ ${timeLeft} min restantes`;
      } else if (timeLeft === 1) {
        timeEl.textContent = `≈ 1 min restante`;
      } else {
        timeEl.textContent = `Presque fini !`;
      }
    }
    
    // Progress percentage
    const pctEl = document.getElementById('progressPercent');
    if (pctEl) pctEl.textContent = `${pct}%`;
  }

  function renderPagination() {
    els.pagination.innerHTML = '';
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const dot = document.createElement('button');
      dot.className = 'page-dot btn btn-light';
      if (i === state.index) dot.classList.add('active');
      if (state.completed[i]) dot.classList.add('completed');
      dot.textContent = String(i + 1);
      dot.addEventListener('click', () => {
        // Prevent jumping past last if not subscribed; allow navigation within answered ones
        if (i >= TOTAL_QUESTIONS - 1 && !state.subscribed && state.index === TOTAL_QUESTIONS - 1) {
          const modal = new bootstrap.Modal(document.getElementById('paywallModal'));
          modal.show();
          return;
        }
        state.index = i; render();
      });
      els.pagination.appendChild(dot);
    }
  }

  function renderThemeSidebar() {
    const el = document.getElementById('themeSidebar');
    if (!el) return;
    const totals = { logique: 0, vocabulaire: 0, numerique: 0, formes: 0 };
    QUESTIONS.forEach(q => totals[normalizeTheme(q.theme)]++);
    const rows = Object.keys(totals).map(k => {
      const attempts = state.themeAttempts[k] || 0;
      const pct = Math.round((attempts / totals[k]) * 100);
      return `<div class="row align-items-center">
        <div class="col-5 text-capitalize">${k}</div>
        <div class="col-7">
          <div class="bar"><span style="width:${pct}%"></span></div>
          <div class="text-end small text-muted">${attempts}/${totals[k]}</div>
        </div>
      </div>`;
    }).join('');
    el.innerHTML = rows;

    // Global gauge (overall completion)
    const globalEl = document.getElementById('globalSidebarScore');
    if (globalEl) {
      const completedCount = state.completed.filter(Boolean).length;
      const pctAll = Math.round((completedCount / TOTAL_QUESTIONS) * 100);
      globalEl.innerHTML = `<div class="global-gauge"><span style="width:${pctAll}%"></span></div><div class="text-end small text-muted mt-1">${completedCount}/${TOTAL_QUESTIONS}</div>`;
    }

    // Render radar live while passing the quiz
    renderRadar();
    renderTicker();
    renderVerticalReviews();
  }

  function renderRadar() {
    const el = document.getElementById('radarChart'); if (!el) return;
    const totals = { logique: 0, vocabulaire: 0, numerique: 0, formes: 0 };
    QUESTIONS.forEach(q => totals[normalizeTheme(q.theme)]++);
    const keys = Object.keys(totals);
    const values = keys.map(k => (state.themeAttempts[k] || 0) / (totals[k] || 1)); // progress 0..1
    const cx = 130, cy = 110, r = 90;
    const points = values.map((v, i) => {
      const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
      const rr = Math.max(10, r * v); // minimal radius to visualize early progress
      const x = cx + rr * Math.cos(angle);
      const y = cy + rr * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    // grid
    let grid = '';
    for (let g = 1; g <= 3; g++) {
      const rr = (r * g) / 3;
      let ring = '';
      for (let i = 0; i < values.length; i++) {
        const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
        const x = cx + rr * Math.cos(angle);
        const y = cy + rr * Math.sin(angle);
        ring += `${x.toFixed(1)},${y.toFixed(1)} `;
      }
      grid += `<polygon points="${ring}" fill="none" stroke="#e5e7eb"/>`;
    }
    let axes = '';
    keys.forEach((k, i) => {
      const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      axes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#e5e7eb"/>`;
      axes += `<text x="${x}" y="${y}" font-size="10" fill="#334155" text-anchor="middle">${k}</text>`;
    });
    const poly = `<polygon points="${points}" fill="rgba(34,197,94,0.25)" stroke="#22c55e"/>`;
    el.innerHTML = `<div class=\"d-flex justify-content-center\"><svg width=\"260\" height=\"220\" viewBox=\"0 0 260 220\" xmlns=\"http://www.w3.org/2000/svg\">${grid}${axes}${poly}</svg></div>`;
    const iqScore = 80 + Math.round((state.score / TOTAL_QUESTIONS) * 40);
    const blurLabel = document.getElementById('radarScoreBlur'); if (blurLabel) blurLabel.textContent = `IQ ${iqScore}`;
    
    // Attractive percentile: always show TOP 1-9% (encouraging)
    const scoreRatio = state.score / TOTAL_QUESTIONS; // 0 to 1
    const topPercent = Math.max(1, Math.min(9, Math.round(1 + (1 - scoreRatio) * 8))); // 1-9%
    const topEl = document.getElementById('radarTopPercent'); if (topEl) topEl.textContent = `TOP ${topPercent}%`;
  }

  function renderTicker(){
    const el = document.getElementById('liveTicker'); if(!el) return;
    const firstNames = ['Paul','Camille','Nora','Alex','Marc','Yanis','Lina','Hugo','Emma','Sophie'];
    const cities = ['Paris, FR','Lyon, FR','Marseille, FR','Lille, FR','Bordeaux, FR','Nantes, FR'];
    const samples = Array.from({length: 6}).map((_,i)=>{
      const minutesAgo = Math.floor(Math.random()*55)+1; // 1..55
      const score = 80 + Math.floor(Math.random()*41);   // 80..120
      const name = firstNames[Math.floor(Math.random()*firstNames.length)] + ' ' + String.fromCharCode(65+Math.floor(Math.random()*26)) + '.';
      const city = cities[Math.floor(Math.random()*cities.length)];
      const when = minutesAgo < 60 ? `${minutesAgo} min` : `${Math.floor(minutesAgo/60)} h`;
      return { iq: score, who: `${name} (${city})`, when, minutesAgo };
    });
    
    // Sort by most recent first (smallest minutesAgo)
    samples.sort((a, b) => a.minutesAgo - b.minutesAgo);
    
    el.innerHTML = samples.map(s=>`<div class="item"><span>IQ ${s.iq} — ${s.who}</span><span class="time">il y a ${s.when}</span></div>`).join('');
  }
  
  function renderVerticalReviews() {
    const el = document.getElementById('verticalReviews');
    if (!el) return;
    const reviews = [
      { name: 'Sophie L.', platform: 'App Store', rating: 5, text: 'Interface claire et résultats précis. J\'ai adoré la fluidité du test !' },
      { name: 'Marc D.', platform: 'Google Play', rating: 5, text: 'Test rapide mais complet. Les visuels sont top !' },
      { name: 'Emma R.', platform: 'Web', rating: 5, text: 'Très bon outil d\'évaluation. Recommande fortement.' },
      { name: 'Alex K.', platform: 'App Store', rating: 4, text: 'Analyse détaillée par thème, c\'est génial.' },
      { name: 'Nora P.', platform: 'Web', rating: 5, text: 'Design moderne et questions pertinentes.' }
    ];
    
    // Add review-slider wrapper class
    el.className = 'review-slider';
    
    const html = reviews.map(r => `
      <div class="review-item">
        <div class="d-flex align-items-start mb-3">
          <div class="avatar me-3">${r.name[0]}</div>
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <div class="fw-semibold text-dark">${r.name}</div>
                <span class="review-platform">${r.platform}</span>
              </div>
              <div class="review-stars">${'⭐'.repeat(r.rating)}</div>
            </div>
            <div class="review-text">"${r.text}"</div>
          </div>
        </div>
      </div>
    `).join('');
    el.innerHTML = html;
  }

  // Intercept next on last to show paywall/results
  els.btnNext.addEventListener('click', () => {
    if (state.index === TOTAL_QUESTIONS - 1) {
      if (!state.subscribed) {
        const modal = new bootstrap.Modal(document.getElementById('paywallModal'));
        modal.show();
      } else {
        showResults();
      }
    }
  });

  // Payment simulation
  window.app = {
    simulatePayment(method) {
      // pretend async
      const btns = document.querySelectorAll('#paywallModal button');
      btns.forEach(b => b.disabled = true);
      setTimeout(() => {
        state.subscribed = true;
        bootstrap.Modal.getInstance(document.getElementById('paywallModal')).hide();
        btns.forEach(b => b.disabled = false);
        // Continue to results after simulated payment
        showResults();
      }, 700);
    }
  };

  // Helpers
  function successBadge(text) { return `<span class="badge bg-success-subtle text-success-emphasis">${text}</span>`; }
  function dangerBadge(text) { return `<span class="badge bg-danger-subtle text-danger-emphasis">${text}</span>`; }
  function showToast(message) { /* removed to avoid duplicate popups */ }

  function renderMedia(media) {
    try {
      if (!media) return '';
      if (typeof media === 'string') {
        if (media.startsWith('<svg')) return media;
        return `<div class="d-flex justify-content-center"><img src="${media}" alt="Question Media" class="img-fluid"></div>`;
      }
      if (Array.isArray(media)) {
        return svgBars(media);
      }
      if (media.type === 'grid-hole') return svgPuzzle('grid-hole');
      if (media.type === 'sequence') return svgMotifSequence();
      if (media.type === 'speed') return svgSpeedIcon();
      if (media.type === 'triangle') return svgTriangleRef();
      if (media.type === 'letters') return svgLettersSeq(media.sequence||[]);
      if (media.type === 'door') return svgDoorOpen();
      if (media.type === 'calendar') return svgCalendar(media.label||'');
      if (media.type === 'odd-one-out') return svgOddOneOut();
      if (media.type === 'clock') return svgClock(media.hour||0);
      if (media.type === 'clock-range') return svgClockRange(media.startHour||0, media.endHour||0);
      if (media.type === 'dots-grid') return svgDotsGrid(media.cols||3, media.rows||3);
      if (media.type === 'matrix') return svgMatrixMain();
      if (media.type === 'shapes') return svgShapes(!!media.curvyOnly);
      if (media.type === 'mirror') return svgMirrorPrompt();
      if (media.type === 'bars-prompt') return svgBarsPrompt(media.arr||[]);
      if (media.type === 'dots-count-prompt') return svgDotsCountPrompt(media.n||6);
      if (media.type === 'bars') return svgBars(media.values||[]);
      if (media.type === 'tetrahedron-pattern') return svgTetraPattern(media.variant||'');
      if (media.type === 'flow-diagram') return svgFlowDiagram(media.values||[]);
      if (media.type === 'sequence-numbers') return svgNumberSequence(media.values||[]);
      if (media.type === 'word-visual') return svgWordVisual(media.concept||'');
      if (media.type === 'proportion') return svgProportion(media.values||[]);
      if (media.type === 'equation-visual') return svgEquationVisual(media.values||[]);
      if (media.type === 'percentage-visual') return svgPercentageVisual(media.values||[]);
      if (media.type === 'symmetry') return svgSymmetry(media.variant||'');
      if (media.type === 'transformation') return svgTransformation(media.variant||'');
      if (media.type === 'paper-folding') return svgPaperFolding(media.variant||'');
      if (media.type === 'isometric') return svgIsometric(media.variant||'');
      if (media.type === '3d-assembly') return svg3DAssembly(media.variant||'');
      if (media.type === 'analogy') return svgAnalogy(media.variant||'');
      if (media.type === 'logic-grid') return svgLogicGrid(media.variant||'');
      if (media.type === 'analogy-words') return svgAnalogyWords(media.values||[]);
      if (media.type === 'word-group') return svgWordGroup(media.values||[]);
      if (media.type === 'context-clues') return svgContextClues(media.context||'');
      if (media.type === 'register-comparison') return svgRegisterComparison(media.values||[]);
      if (media.type === 'etymology') return svgEtymology(media.concept||'');
      if (media.type === 'pattern-grid') return svgPatternGrid(media.variant||'');
      if (media.type === 'transformation-sequence') return svgTransformationSequence(media.variant||'');
      if (media.type === 'word-nuance') return svgWordNuance(media.context||'');
      if (media.type === 'shape-sides') return svgShapeSides(media.values||[]);
      if (media.type === 'logic-deduction') return svgLogicDeduction(media.values||[]);
      if (media.type === 'shape-sequence') return svgShapeSequence(media.variant||'');
      if (media.type === 'puzzle') return svgPuzzle(media.kind||'');
      return '';
    } catch { return ''; }
  }

  function renderIcon(icon) {
    try {
      if (!icon) return '';
      if (typeof icon === 'string') {
        if (icon.startsWith('<svg')) return icon;
        return `<div class="d-flex justify-content-center"><img src="${icon}" alt="Option Icon" class="img-fluid" style="max-width: 24px;"></div>`;
      }
      if (Array.isArray(icon)) return svgBars(icon);
      if (icon.type === 'grid-hole') return svgPuzzle('grid-hole');
      if (icon.type === 'sequence') return svgMotifSequence();
      if (icon.type === 'speed') return svgSpeedIcon();
      if (icon.type === 'triangle') return svgTriangleRef();
      if (icon.type === 'letters') return svgLettersSeq(icon.sequence||[]);
      if (icon.type === 'door') return svgDoorOpen();
      if (icon.type === 'calendar') return svgCalendar(icon.label||'');
      if (icon.type === 'odd-one-out') return svgOddOneOut();
      if (icon.type === 'clock') return svgClock(icon.hour||0);
      if (icon.type === 'clock-range') return svgClockRange(icon.startHour||0, icon.endHour||0);
      if (icon.type === 'dots-grid') return svgDotsGrid(icon.cols||3, icon.rows||3);
      if (icon.type === 'matrix') return svgMatrixMain();
      if (icon.type === 'shapes') return svgShapes(!!icon.curvyOnly);
      if (icon.type === 'mirror') return svgMirrorPrompt();
      if (icon.type === 'bars-prompt') return svgBarsPrompt(icon.arr||[]);
      if (icon.type === 'dots-count-prompt') return svgDotsCountPrompt(icon.n||6);
      if (icon.type === 'bars') return svgBars(icon.values||[]);
      if (icon.type === 'tetrahedron-pattern') return svgTetraPattern(icon.variant||'');
      if (icon.type === 'flow-diagram') return svgFlowDiagram(icon.values||[]);
      if (icon.type === 'puzzle') return svgPuzzle(icon.kind||'');
      return '';
    } catch { return ''; }
  }

  function normalizeTheme(theme) {
    if (theme === 'logique') return 'logique';
    if (theme === 'vocabulaire') return 'vocabulaire';
    if (theme === 'numerique') return 'numerique';
    if (theme === 'formes') return 'formes';
    return 'logique'; // Default theme
  }

  function svgGrid(cols, rows) {
    const size = 140; const cell = 18;
    let lines = '';
    for (let i = 0; i <= cols; i++) lines += `<line x1="${i*cell}" y1="0" x2="${i*cell}" y2="${rows*cell}" stroke="#111" stroke-width="1"/>`;
    for (let j = 0; j <= rows; j++) lines += `<line x1="0" y1="${j*cell}" x2="${cols*cell}" y2="${j*cell}" stroke="#111" stroke-width="1"/>`;
    return `<div class="d-flex justify-content-center"><svg width="${size}" height="${size}" viewBox="0 0 ${cols*cell} ${rows*cell}" xmlns="http://www.w3.org/2000/svg">${lines}</svg></div>`;
  }

  // Cohesive, minimal visual set
  function svgMotifSequence() {
    const cell = 16; const cols = 6; const rows = 3; let s = '';
    for (let j=0;j<=rows;j++) s += `<line x1="0" y1="${j*cell}" x2="${cols*cell}" y2="${j*cell}" stroke="#111" stroke-width="1"/>`;
    for (let i=0;i<=cols;i++) s += `<line x1="${i*cell}" y1="0" x2="${i*cell}" y2="${rows*cell}" stroke="#111" stroke-width="1"/>`;
    // three cells filled A _ B (choose B)
    s += `<rect x="${cell}" y="${cell}" width="${cell}" height="${cell}" fill="#94a3b8"/>`;
    s += `<rect x="${4*cell}" y="${cell}" width="${cell}" height="${cell}" fill="#94a3b8"/>`;
    return `<div class="d-flex justify-content-center"><svg width="260" height="120" viewBox="0 0 ${cols*cell} ${rows*cell}" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>`;
  }

  function svgBars(values) {
    const max = Math.max(...values);
    const w = 12, gap = 8, h = 64; let s = '';
    values.forEach((v, i) => {
      const bh = Math.round((v/max) * h);
      s += `<rect x="${i*(w+gap)}" y="${h-bh}" width="${w}" height="${bh}" rx="3" fill="#14b8a6"/>`;
    });
    return `<div class="d-flex justify-content-center"><svg width="${values.length*(w+gap)}" height="${h}" viewBox="0 0 ${values.length*(w+gap)} ${h}" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>`;
  }

  function svgMirrorPrompt() {
    // base shape to mirror
    const poly = '<polygon points="10,30 26,10 42,30 26,34" fill="#e2e8f0" stroke="#111"/>';
    const base = `<svg width="80" height="48" viewBox="0 0 52 38" xmlns="http://www.w3.org/2000/svg">${poly}</svg>`;
    return `<div class="text-center">${base}</div>`;
  }
  function svgMirrorOption(letter){
    const flip = {A:'', B:' scale(-1,1) translate(-52,0)', C:' rotate(90 26 19)', D:' rotate(180 26 19)'}[letter]||'';
    const poly = `<g transform="${flip}"><polygon points="10,30 26,10 42,30 26,34" fill="#e2e8f0" stroke="#111"/></g>`;
    return `<svg width="52" height="38" viewBox="0 0 52 38" xmlns="http://www.w3.org/2000/svg">${poly}</svg>`;
  }

  function svgBarsPrompt(arr){
    const max = Math.max(...arr, 12); const w=10,g=6,h=40; let s='';
    arr.forEach((v,i)=>{ const bh=Math.round((v/max)*h); s+=`<rect x="${i*(w+g)}" y="${h-bh}" width="${w}" height="${bh}" rx="3" fill="#94a3b8"/>`; });
    return `<div class="d-flex justify-content-center"><svg width="${arr.length*(w+g)}" height="${h}" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>`;
  }
  function svgBarChoice(v){ const max=12,w=10,h=40; const bh=Math.round((v/max)*h); return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="${h-bh}" width="${w}" height="${bh}" rx="3" fill="#14b8a6"/></svg>`; }

  function svgDotsCountPrompt(n){
    const cols = Math.ceil(Math.sqrt(n)); const gap=12; let s=''; let r=0,c=0;
    for(let i=0;i<n;i++){ s+=`<circle cx="${c*gap+6}" cy="${r*gap+6}" r="4" fill="#111"/>`; c++; if(c>=cols){c=0;r++;} }
    return `<div class="d-flex justify-content-center"><svg width="${cols*gap}" height="${(r+1)*gap}" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>`;
  }

  function svgOctagonRef() {
    const points = [
      [30,6],[54,6],[78,30],[78,54],[54,78],[30,78],[6,54],[6,30]
    ].map(p => p.join(',')).join(' ');
    return `<div class="d-flex justify-content-center"><svg width="120" height="84" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg"><polygon points="${points}" fill="#e2e8f0" stroke="#111"/></svg></div>`;
  }

  function svgSpeedIcon() {
    return `<div class="d-flex justify-content-center"><svg width="140" height="60" viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg"><path d="M10 40 L60 40" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/><path d="M20 30 L100 30" stroke="#14b8a6" stroke-width="8" stroke-linecap="round"/><circle cx="110" cy="30" r="6" fill="#14b8a6"/></svg></div>`;
  }

  function svgTriangleRef() {
    return `<div class="text-center"><svg width="140" height="84" viewBox="0 0 140 84" xmlns="http://www.w3.org/2000/svg"><polygon points="70,10 20,74 120,74" fill="#e2e8f0" stroke="#111"/></svg></div>`;
  }

  function svgLettersSeq(arr) {
    let s = '';
    arr.forEach((ch, i) => s += `<rect x="${i*36}" y="0" width="30" height="36" rx="6" fill="#f1f5f9"/><text x="${i*36+15}" y="24" text-anchor="middle" font-family="Inter, Arial" font-size="16" fill="#0f172a">${ch}</text>`);
    return `<div class="d-flex justify-content-center"><svg width="${arr.length*36}" height="40" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>`;
  }

  function svgDoorOpen() {
    return `<div class="d-flex justify-content-center"><svg width="140" height="80" viewBox="0 0 140 80" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="40" height="60" rx="6" fill="#e2e8f0" stroke="#111"/><rect x="60" y="10" width="40" height="60" rx="6" fill="#fff" stroke="#111"/><circle cx="92" cy="40" r="3" fill="#111"/></svg></div>`;
  }

  function svgCalendar(label) {
    return `<div class="d-flex justify-content-center"><svg width="160" height="84" viewBox="0 0 160 84" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="18" width="140" height="56" rx="10" fill="#fff" stroke="#94a3b8"/><rect x="10" y="10" width="140" height="20" rx="8" fill="#14b8a6"/><text x="80" y="24" text-anchor="middle" font-family="Inter, Arial" font-size="12" fill="#fff">${label}</text></svg></div>`;
  }

  function svgOddOneOut() {
    const shapes = [
      '<circle cx="20" cy="20" r="16" fill="#94a3b8"/>',
      '<circle cx="60" cy="20" r="16" fill="#94a3b8"/>',
      '<rect x="92" y="4" width="32" height="32" rx="4" fill="#94a3b8"/>'
    ].join('');
    return `<div class="d-flex justify-content-center"><svg width="140" height="40" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">${shapes}</svg></div>`;
  }

  function svgClock(hour) {
    const angle = (hour % 12) * 30; // deg
    const rad = (angle - 90) * Math.PI/180;
    const cx = 40, cy = 40, r = 28;
    const x = cx + r * Math.cos(rad), y = cy + r * Math.sin(rad);
    return `<div class="d-flex justify-content-center"><svg width="100" height="100" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#111"/><line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#14b8a6" stroke-width="3" stroke-linecap="round"/></svg></div>`;
  }
  function svgClockRange(startHour, endHour) {
    const base = svgClock(startHour);
    // overlay second needle faintly pointing to endHour
    const angle = (endHour % 12) * 30; const rad = (angle - 90) * Math.PI/180;
    const cx = 40, cy = 40, r = 28; const x = cx + r*Math.cos(rad), y = cy + r*Math.sin(rad);
    return base.replace('</svg></div>', `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 3" opacity="0.6"/></svg></div>`);
  }

  function svgDotsGrid(cols, rows) {
    const size = 12; const gap = 10; let s = '';
    for (let r=0;r<rows;r++) for (let c=0;c<cols;c++) s += `<circle cx="${c*gap+6}" cy="${r*gap+6}" r="3" fill="#111"/>`;
    return `<div class="d-flex justify-content-center"><svg width="${cols*gap+6}" height="${rows*gap+6}" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>`;
  }

  // Advanced visual puzzles (matrix)
  function svgMatrixMain() {
    // simple: show two rotations and missing third
    let s = '';
    const cell = 44; const gap = 6; const startX = 6; const startY = 6;
    const drawTri = (x,y,rot=0) => `<g transform="translate(${x},${y}) rotate(${rot} 22 22)"><polygon points="22,6 6,38 38,38" fill="#e2e8f0" stroke="#111"/></g>`;
    s += drawTri(startX, startY, 0); // row1 col1
    s += drawTri(startX + cell + gap, startY, 90);
    s += `<rect x="${startX + 2*(cell+gap)}" y="${startY}" width="${cell}" height="${cell}" rx="6" fill="#dbeafe" stroke="#3b82f6"/>`;
    s += drawTri(startX, startY + cell + gap, 180);
    s += drawTri(startX + cell + gap, startY + cell + gap, 270);
    s += drawTri(startX + 2*(cell+gap), startY + cell + gap, 0);
    s += drawTri(startX, startY + 2*(cell + gap), 90);
    s += drawTri(startX + cell + gap, startY + 2*(cell+gap), 180);
    // last missing cell highlighted already above
    return `<div class="d-flex justify-content-center"><svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>`;
  }

  function svgMatrixOption(letter) {
    const cell = 44; const x = 0, y = 0;
    const rotMap = { A: 180, B: 270, C: 0, D: 45 };
    const rot = rotMap[letter] ?? 0;
    const tri = `<g transform="translate(${x},${y}) rotate(${rot} 22 22)"><polygon points="22,6 6,38 38,38" fill="#e2e8f0" stroke="#111"/></g>`;
    return `<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">${tri}</svg>`;
  }
  function enableKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('quizSection').classList.contains('d-none')) return;
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
      const num = parseInt(e.key, 10);
      if (!Number.isNaN(num) && num >= 1 && num <= 9) {
        const btn = els.answers.children[num-1];
        if (btn) btn.click();
      }
    });
  }
  function svgPuzzle(kind) {
    if (kind === 'grid-hole') {
      const cell = 16; const cols = 8; const rows = 6; let s = '';
      for (let i=0;i<=cols;i++) s += `<line x1="${i*cell}" y1="0" x2="${i*cell}" y2="${rows*cell}" stroke="#111" stroke-width="1"/>`;
      for (let j=0;j<=rows;j++) s += `<line x1="0" y1="${j*cell}" x2="${cols*cell}" y2="${j*cell}" stroke="#111" stroke-width="1"/>`;
      // hole
      const hx = 4*cell, hy = 3*cell, w = 2*cell, h = 2*cell;
      s += `<rect x="${hx}" y="${hy}" width="${w}" height="${h}" fill="#3b82f6" fill-opacity="0.1" stroke="#3b82f6"/>`;
      return `<div class="d-flex justify-content-center"><svg width="280" height="200" viewBox="0 0 ${cols*cell} ${rows*cell}" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>`;
    }
    return '';
  }

  function svgShapes(curvyOnly = false) {
    const s = [
      '<circle cx="32" cy="32" r="28" fill="#e2e8f0" stroke="#111"/>',
      '<rect x="72" y="8" width="48" height="48" fill="#e2e8f0" stroke="#111"/>',
      '<polygon points="160,56 136,8 184,8" fill="#e2e8f0" stroke="#111"/>'
    ];
    const items = curvyOnly ? s[0] : s.join('');
    return `<div class="d-flex justify-content-center"><svg width="220" height="72" viewBox="0 0 200 64" xmlns="http://www.w3.org/2000/svg">${items}</svg></div>`;
  }

  // Small icons for options
  function svgSmallSquare(filled=false) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="4" ${filled? 'fill="#14b8a6" stroke="#14b8a6"' : 'fill="#e2e8f0" stroke="#111"'}/></svg>`;
  }
  function svgSmallCircle() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#e2e8f0" stroke="#111"/></svg>`;
  }
  function svgSmallCross() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 6 L18 18 M18 6 L6 18" stroke="#111" stroke-width="2"/></svg>`;
  }
  function svgSmallTriangle() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12,4 4,20 20,20" fill="#e2e8f0" stroke="#111"/></svg>`;
  }
  function svgSmallPentagon() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12,3 20,9 16,20 8,20 4,9" fill="#e2e8f0" stroke="#111"/></svg>`;
  }

  // Generic small helpers for option thumbnails
  function svgLShape(rot){
    const unit=8; const color='#0ea5e9';
    const block=(x,y)=>`<rect x="${x}" y="${y}" width="${unit}" height="${unit}" fill="${color}" stroke="#0f172a"/>`;
    let s='';
    [[0,0],[0,unit],[0,2*unit],[unit,2*unit]].forEach(([x,y])=> s+=block(8+x,8+y));
    return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot} 14 14)">${s}</g></svg>`;
  }
  function svgArrow(dir){
    const rot = dir==='up'? -90 : dir==='down'? 90 : dir==='left'? 180 : 0;
    return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot} 14 14)"><path d="M6 14 L20 14" stroke="#111" stroke-width="3"/><path d="M16 10 L20 14 L16 18" fill="none" stroke="#111" stroke-width="3"/></g></svg>`;
  }
  function svgHoles(type){
    let dots='';
    const add=(x,y)=>{ dots += `<circle cx="${x}" cy="${y}" r="2" fill="#111"/>`; };
    if (type==='symmetric'){ [8,20].forEach(x=>{[8,20].forEach(y=>add(x,y));}); }
    else if (type==='single'){ add(14,14); }
    else if (type==='random'){ [[7,10],[19,9],[14,18]].forEach(([x,y])=>add(x,y)); }
    return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="20" height="20" rx="4" fill="#e2e8f0" stroke="#111"/>${dots}</svg>`;
  }
  function svgTetrisPiece(code){
    const unit=6; const color='#0ea5e9';
    const block=(x,y)=>`<rect x="${x}" y="${y}" width="${unit}" height="${unit}" fill="${color}" stroke="#0f172a"/>`;
    let s='';
    if (code==='l'){ [[0,0],[0,unit],[0,2*unit],[unit,2*unit]].forEach(([x,y])=> s+=block(8+x,8+y)); }
    else if (code==='t'){ [[unit,0],[0,unit],[unit,unit],[2*unit,unit]].forEach(([x,y])=> s+=block(8+x,8+y)); }
    else if (code==='z'){ [[0,0],[unit,0],[unit,unit],[2*unit,unit]].forEach(([x,y])=> s+=block(8+x,8+y)); }
    else if (code==='o'){ [[0,0],[unit,0],[0,unit],[unit,unit]].forEach(([x,y])=> s+=block(10+x,10+y)); }
    return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
  }
  function svgTopViewVariant(code){
    const config={a:[[8,8,12,4],[8,14,12,4]], b:[[6,10,16,4]], c:[[10,6,4,16]], d:[[6,6,16,16]]}[code]||[];
    const rect=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e2e8f0" stroke="#111"/>`;
    return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">${config.map(r=>rect(...r)).join('')}</svg>`;
  }
  function svgCubeConfig(code){
    const face=(x,y,c)=>`<rect x="${x}" y="${y}" width="10" height="10" fill="${c}" stroke="#0f172a"/>`;
    const schemes={a:['#93c5fd','#fca5a5','#86efac'],b:['#fca5a5','#86efac','#93c5fd'],c:['#86efac','#93c5fd','#fca5a5'],d:['#fde68a','#93c5fd','#86efac']};
    const [c1,c2,c3]=schemes[code]||['#e5e7eb','#e5e7eb','#e5e7eb'];
    return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">${face(4,8,c1)}${face(14,8,c2)}${face(9,3,c3)}</svg>`;
  }
  function svgTessellIcon(type){
    let s='';
    if (type==='hex'){ s='<polygon points="6,10 10,6 16,6 20,10 16,14 10,14" fill="#e2e8f0" stroke="#111"/><polygon points="12,18 16,14 22,14 26,18 22,22 16,22" fill="#e2e8f0" stroke="#111"/>'; }
    else if (type==='triangle'){ s='<polygon points="8,22 14,10 20,22" fill="#e2e8f0" stroke="#111"/><polygon points="2,10 8,22 14,10" fill="#e2e8f0" stroke="#111"/>'; }
    else if (type==='square'){ s='<rect x="4" y="4" width="8" height="8" fill="#e2e8f0" stroke="#111"/><rect x="12" y="12" width="8" height="8" fill="#e2e8f0" stroke="#111"/><rect x="20" y="4" width="8" height="8" fill="#e2e8f0" stroke="#111"/>'; }
    else { s='<circle cx="10" cy="10" r="4" fill="#e2e8f0" stroke="#111"/><circle cx="20" cy="20" r="4" fill="#e2e8f0" stroke="#111"/>'; }
    return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
  }
  function svgShadow(shape){
    const color='#cbd5e1';
    if (shape==='triangle') return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><polygon points="14,6 4,22 24,22" fill="${color}"/></svg>`;
    if (shape==='square') return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="16" height="16" fill="${color}"/></svg>`;
    if (shape==='circle') return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="8" fill="${color}"/></svg>`;
    return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="M6 6 L22 22 M6 22 L22 6" stroke="${color}" stroke-width="4"/></svg>`;
  }
  function svgOrigami(kind){
    const fill='#e2e8f0';
    if (kind==='bird') return `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="M2 18 L12 6 L18 10 L26 8 L18 14 L22 20 L12 16 Z" fill="${fill}" stroke="#111"/></svg>`;
    if (kind==='flower') return `<svg width="28" height="28" viewBox="0 0 28 28"><path d="M14 4 L18 10 L14 16 L10 10 Z" fill="${fill}" stroke="#111"/><circle cx="14" cy="10" r="2" fill="#94a3b8"/></svg>`;
    if (kind==='boat') return `<svg width="28" height="28" viewBox="0 0 28 28"><path d="M4 18 L24 18 L20 22 L8 22 Z" fill="${fill}" stroke="#111"/><path d="M14 18 L14 8 L8 14 Z" fill="#cbd5e1" stroke="#111"/></svg>`;
    return `<svg width="28" height="28" viewBox="0 0 28 28"><path d="M14 4 L16 10 L22 10 L17 14 L19 20 L14 16 L9 20 L11 14 L6 10 L12 10 Z" fill="${fill}" stroke="#111"/></svg>`;
  }
  
  // New visual functions for better interactivity
  function svgNumberSequence(values) {
    const cellW = 48, cellH = 36, gap = 8;
    let svg = '';
    values.forEach((val, i) => {
      const x = i * (cellW + gap);
      const isQuestion = val === '?';
      const bgColor = isQuestion ? '#fbbf24' : '#e2e8f0';
      const textColor = isQuestion ? '#fff' : '#0f172a';
      svg += `<rect x="${x}" y="0" width="${cellW}" height="${cellH}" rx="8" fill="${bgColor}" stroke="#111"/>`;
      svg += `<text x="${x + cellW/2}" y="${cellH/2 + 6}" text-anchor="middle" font-family="Inter" font-size="16" font-weight="600" fill="${textColor}">${val}</text>`;
    });
    const totalW = values.length * (cellW + gap) - gap;
    return `<div class="d-flex justify-content-center"><svg width="${totalW}" height="${cellH}" viewBox="0 0 ${totalW} ${cellH}" xmlns="http://www.w3.org/2000/svg">${svg}</svg></div>`;
  }
  
  function svgWordVisual(concept) {
    const concepts = {
      'speed': '<path d="M10 20 L50 20" stroke="#94a3b8" stroke-width="4"/><path d="M20 15 L80 15" stroke="#22c55e" stroke-width="6"/><circle cx="90" cy="15" r="4" fill="#22c55e"/>',
      'big-small': '<rect x="10" y="10" width="30" height="30" fill="#ef4444" opacity="0.8"/><rect x="50" y="20" width="15" height="15" fill="#22c55e" opacity="0.8"/>',
      'clarity': '<circle cx="40" cy="25" r="20" fill="#fff" stroke="#22c55e" stroke-width="3"/><circle cx="40" cy="25" r="8" fill="#22c55e"/>'
    };
    const visual = concepts[concept] || '<rect x="20" y="20" width="40" height="20" fill="#e2e8f0"/>';
    return `<div class="d-flex justify-content-center"><svg width="120" height="50" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">${visual}</svg></div>`;
  }
  
  function svgNumberIcon(num) {
    return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="24" height="24" rx="6" fill="#f1f5f9" stroke="#334155"/>
      <text x="16" y="20" text-anchor="middle" font-family="Inter" font-size="12" font-weight="600" fill="#0f172a">${num}</text>
    </svg>`;
  }
  
  function svgConceptIcon(token) {
    const icons = {
      'concept-speed': '<path d="M6 16 L20 16" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/><path d="M16 12 L20 16 L16 20" stroke="#22c55e" stroke-width="2" fill="none"/>',
      'concept-slow': '<path d="M6 16 L20 16" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>',
      'concept-heavy': '<rect x="8" y="12" width="16" height="8" fill="#64748b"/>',
      'concept-light': '<circle cx="16" cy="16" r="6" fill="#fbbf24" opacity="0.6"/>',
      'size-big': '<rect x="4" y="4" width="24" height="24" fill="#ef4444" opacity="0.8" rx="4"/>',
      'size-small': '<rect x="10" y="10" width="12" height="12" fill="#22c55e" opacity="0.8" rx="2"/>',
      'size-narrow': '<rect x="14" y="4" width="4" height="24" fill="#f59e0b" opacity="0.8"/>',
      'size-wide': '<rect x="4" y="14" width="24" height="4" fill="#3b82f6" opacity="0.8"/>',
      'concept-clear': '<circle cx="16" cy="16" r="10" fill="#fff" stroke="#22c55e" stroke-width="2"/>',
      'concept-opaque': '<rect x="6" y="6" width="20" height="20" fill="#64748b" rx="4"/>',
      'concept-dark': '<rect x="6" y="6" width="20" height="20" fill="#1f2937" rx="4"/>',
      'concept-blur': '<circle cx="16" cy="16" r="8" fill="#94a3b8" opacity="0.5" filter="blur(2px)"/>',
      'concept-insight': '<circle cx="16" cy="16" r="8" fill="#fbbf24"/><path d="M16 10 L16 22 M10 16 L22 16" stroke="#fff" stroke-width="2"/>',
      'concept-music': '<path d="M8 20 L8 8 L18 6 L18 18" stroke="#22c55e" stroke-width="2" fill="none"/><circle cx="8" cy="20" r="2" fill="#22c55e"/>',
      'concept-speech': '<path d="M6 10 L20 10 L20 18 L12 18 L8 22 L8 18 L6 18 Z" fill="#3b82f6" opacity="0.8"/>',
      'concept-wisdom': '<circle cx="16" cy="12" r="6" fill="#f59e0b"/><rect x="14" y="18" width="4" height="8" fill="#64748b"/>',
      'pattern-cross': '<path d="M16 6 L16 26 M6 16 L26 16" stroke="#ef4444" stroke-width="3"/>',
      'pattern-dot': '<circle cx="16" cy="16" r="4" fill="#22c55e"/>',
      'pattern-line': '<path d="M6 16 L26 16" stroke="#3b82f6" stroke-width="3"/>',
      'pattern-star': '<path d="M16 6 L18 12 L24 12 L19 16 L21 22 L16 19 L11 22 L13 16 L8 12 L14 12 Z" fill="#fbbf24"/>',
      'concept-study': '<rect x="8" y="8" width="16" height="12" fill="#f1f5f9" stroke="#64748b"/><path d="M10 12 L22 12 M10 16 L18 16" stroke="#64748b"/>',
      'concept-worship': '<path d="M16 6 L20 14 L12 14 Z M8 18 L24 18" stroke="#f59e0b" stroke-width="2" fill="none"/>',
      'concept-accept': '<circle cx="16" cy="16" r="8" fill="#22c55e" opacity="0.6"/><path d="M12 16 L15 19 L20 13" stroke="#fff" stroke-width="2" fill="none"/>',
      'concept-disdain': '<path d="M10 20 L22 12 M10 12 L22 20" stroke="#ef4444" stroke-width="2"/>'
    };
    const iconSvg = icons[token] || '<rect x="8" y="8" width="16" height="16" fill="#e2e8f0"/>';
    return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">${iconSvg}</svg>`;
  }
  
  // Advanced visual functions for complex questions
  function svgProportion(values) {
    const [a, b, c, d] = values;
    return `<div class="d-flex justify-content-center align-items-center gap-3">
      <div class="text-center"><div class="h5">${a}</div><div class="small text-muted">est à</div></div>
      <div class="text-center"><div class="h5 text-primary">${b}</div></div>
      <div class="text-center"><div class="small text-muted">ce que</div></div>
      <div class="text-center"><div class="h5">${c}</div><div class="small text-muted">est à</div></div>
      <div class="text-center"><div class="h5 text-warning">${d}</div></div>
    </div>`;
  }
  
  function svgEquationVisual(values) {
    return `<div class="d-flex justify-content-center">
      <svg width="240" height="100" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="30,20 20,40 40,40" fill="#22c55e"/>
        <text x="50" y="35" font-size="14" fill="#0f172a">=3</text>
        
        <rect x="80" y="20" width="20" height="20" fill="#3b82f6"/>
        <text x="110" y="35" font-size="14" fill="#0f172a">=5</text>
        
        <polygon points="30,60 20,80 40,80" fill="#22c55e"/>
        <text x="45" y="75" font-size="12" fill="#0f172a">+</text>
        <rect x="55" y="60" width="15" height="15" fill="#3b82f6"/>
        <text x="75" y="75" font-size="12" fill="#0f172a">+</text>
        <circle cx="90" cy="67" r="8" fill="#ef4444"/>
        <text x="105" y="75" font-size="14" fill="#0f172a">=12</text>
        
        <circle cx="160" cy="67" r="8" fill="#ef4444"/>
        <text x="175" y="75" font-size="14" fill="#0f172a">=?</text>
      </svg>
    </div>`;
  }
  
  function svgPercentageVisual(values) {
    const [total, pct1, pct2] = values;
    return `<div class="text-center">
      <div class="h4 mb-2">${pct2} de ${pct1} de ${total}</div>
      <svg width="180" height="60" viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="160" height="20" fill="#e2e8f0" stroke="#111"/>
        <rect x="10" y="20" width="128" height="20" fill="#3b82f6" opacity="0.6"/>
        <rect x="10" y="20" width="19" height="20" fill="#ef4444" opacity="0.8"/>
        <text x="90" y="55" text-anchor="middle" font-size="12">${total} → ${pct1} → ${pct2}</text>
      </svg>
    </div>`;
  }
  
  function svgSymmetry(variant) {
    return `<div class="d-flex justify-content-center">
      <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <polygon points="30,20 20,50 40,50" fill="#22c55e"/>
        <line x1="60" y1="10" x2="60" y2="70" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,3"/>
        <text x="60" y="85" text-anchor="middle" font-size="10">axe</text>
        <polygon points="90,20 80,50 100,50" fill="#22c55e" opacity="0.3"/>
      </svg>
    </div>`;
  }
  
  // Placeholder functions for complex question types
  function svgTransformation(variant) { return svgSymmetry(variant); }
  function svgPaperFolding(variant) { return svgPuzzle('grid-hole'); }
  function svgIsometric(variant) { return svgFlatCube('blue-red-green'); }
  function svg3DAssembly(variant) { return svgTetraPattern('striped-dotted-grid'); }
  function svgAnalogy(variant) { return svgMatrixMain(); }
  function svgLogicGrid(variant) { return svgMatrixMain(); }
  function svgAnalogyWords(values) { 
    return `<div class="text-center"><div class="h5">${values[0] || 'livre→lire'}</div><div class="h5 text-primary">${values[1] || 'piano→?'}</div></div>`;
  }
  function svgWordGroup(values) {
    return `<div class="d-flex justify-content-center gap-2 flex-wrap">${values.map(w => `<span class="badge bg-light text-dark">${w}</span>`).join('')}</div>`;
  }
  function svgContextClues(context) {
    return `<div class="text-center"><div class="small text-muted">Contexte: ${context}</div></div>`;
  }
  function svgRegisterComparison(values) {
    return `<div class="d-flex justify-content-center gap-2 flex-wrap">${values.map(w => `<span class="badge bg-secondary">${w}</span>`).join('')}</div>`;
  }
  function svgEtymology(concept) {
    return `<div class="text-center"><div class="h5 text-primary">${concept}</div><div class="small text-muted">(grec: amour)</div></div>`;
  }
  
  // Additional visual functions for new question types
  function svgPatternGrid(variant) {
    return `<div class="d-flex justify-content-center">
      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="20" height="20" fill="#e2e8f0" stroke="#111"/>
        <rect x="50" y="20" width="20" height="20" fill="#e2e8f0" stroke="#111"/>
        <rect x="80" y="20" width="20" height="20" fill="#e2e8f0" stroke="#111"/>
        <rect x="20" y="50" width="20" height="20" fill="#e2e8f0" stroke="#111"/>
        <rect x="50" y="50" width="20" height="20" fill="#fbbf24" stroke="#111"/>
        <rect x="80" y="50" width="20" height="20" fill="#e2e8f0" stroke="#111"/>
        <rect x="20" y="80" width="20" height="20" fill="#e2e8f0" stroke="#111"/>
        <rect x="50" y="80" width="20" height="20" fill="#e2e8f0" stroke="#111"/>
        <rect x="80" y="80" width="20" height="20" fill="#dbeafe" stroke="#3b82f6"/>
      </svg>
    </div>`;
  }
  
  function svgTransformationSequence(variant) {
    return `<div class="d-flex justify-content-center align-items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,8 10,32 30,32" fill="#22c55e" opacity="0.6"/>
      </svg>
      <span class="h5">→</span>
      <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(90 25 25)">
          <polygon points="25,10 12,40 38,40" fill="#22c55e"/>
        </g>
      </svg>
      <span class="h5">→</span>
      <span class="text-warning fw-bold">?</span>
    </div>`;
  }
  
  function svgWordNuance(context) {
    return `<div class="text-center">
      <div class="small text-muted mb-2">Nuance entre :</div>
      <div class="h6 text-primary">${context}</div>
    </div>`;
  }
  
  function svgShapeSides(values) {
    return `<div class="d-flex justify-content-center align-items-center gap-4">
      <div class="text-center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,5 5,35 35,35" fill="#22c55e" opacity="0.8"/>
        </svg>
        <div class="small mt-1">3 côtés</div>
      </div>
      <span class="h5">→</span>
      <div class="text-center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="20" height="20" fill="#3b82f6" opacity="0.8"/>
        </svg>
        <div class="small mt-1">? côtés</div>
      </div>
    </div>`;
  }
  
  function svgLogicDeduction(values) {
    return `<div class="d-flex justify-content-center align-items-center gap-3">
      <div class="text-center p-2 border rounded">A > B</div>
      <span class="fw-bold">ET</span>
      <div class="text-center p-2 border rounded">B > C</div>
      <span class="h5">→</span>
      <div class="text-center p-2 border rounded bg-warning-subtle">A ? C</div>
    </div>`;
  }
  
  function svgShapeSequence(variant) {
    return `<div class="d-flex justify-content-center align-items-center gap-3">
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="20" height="20" fill="#3b82f6" opacity="0.8"/>
      </svg>
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <polygon points="15,3 3,27 27,27" fill="#22c55e" opacity="0.8"/>
      </svg>
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="12" fill="#ef4444" opacity="0.8"/>
      </svg>
      <span class="h5">→</span>
      <span class="text-warning fw-bold">?</span>
    </div>`;
  }

  // Media & icon renderers + theme normalization
  function normalizeTheme(t){ return t === 'spatial' ? 'formes' : (t || 'logique'); }

  function renderMedia(media){
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.type === 'matrix') return svgMatrixVariant(media.variant||'default');
    if (media.type === '3d-cube') return svgFlatCube(media.variant);
    if (media.type === 'bars') return svgBars(media.values||[]);
    if (media.type === 'tetrahedron-pattern') return svgTetraPattern(media.variant);
    if (media.type === 'flow-diagram') return svgFlowDiagram(media.values||[]);
    if (media.type === 'shape-sequence') return svgShapeSequence(media.variant||'geometric');
    if (media.type === 'rotation-preview') return svgTransformation('rotate-90');
    return '';
  }

  // Matrix variants with color-aware visuals
  function svgMatrixVariant(variant){
    if (variant === 'rotation-color'){
      // 3x3 grid: triangles rotate across columns, color changes across rows
      const cell = 38, gap = 8; const colors=['#0ea5e9','#ef4444','#22c55e']; // blue, red, green
      const rot = [0,90,180];
      let svg='';
      for (let r=0;r<3;r++){
        for (let c=0;c<3;c++){
          const x = c*(cell+gap), y = r*(cell+gap);
          const fill = colors[r%colors.length];
          const angle = rot[c%rot.length];
          svg += `<g transform="translate(${x},${y}) rotate(${angle} ${cell/2} ${cell/2})">
            <polygon points="${cell/2},6 6,${cell-6} ${cell-6},${cell-6}" fill="${fill}" stroke="#0f172a" opacity="0.9"/>
          </g>`;
        }
      }
      const w = 3*(cell+gap)-gap, h = 3*(cell+gap)-gap;
      return `<div class="d-flex justify-content-center"><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${svg}</svg></div>`;
    }
    // Fallback to existing generic matrix
    return svgMatrixMain();
  }

  function renderIcon(token){
    if (!token) return '';
    console.log('Rendering icon token:', token);
    
    // Handle simple shape names
    if (token === 'circle') return svgSmallCircle();
    if (token === 'triangle') return svgSmallTriangle();
    if (token === 'square') return svgSmallSquare();
    if (token === 'pentagon') return svgSmallPentagon();
    
    // Handle number icons
    if (token.startsWith('number-')) {
      const num = token.split('-')[1];
      return svgNumberIcon(num);
    }
    
    // Handle concept icons
    if (token.startsWith('concept-') || token.startsWith('size-')) {
      return svgConceptIcon(token);
    }
    
    if (token.startsWith('bar-')) return svgBarChoice(parseInt(token.split('-')[1],10));
    if (token.startsWith('l-shape-')) { const deg=parseInt(token.split('-')[2],10)||0; return svgLShape(deg); }
    if (token.startsWith('arrow-')) return svgArrow(token.split('-')[1]);
    if (token.startsWith('holes-')) return svgHoles(token.split('-')[1]);
    if (token.startsWith('piece-')) return svgTetrisPiece(token.split('-')[1]);
    if (token.startsWith('top-view-')) return svgTopViewVariant(token.split('-')[2]||'a');
    if (token.startsWith('cube-config-')) return svgCubeConfig(token.split('-')[2]||'a');
    if (token.startsWith('tessell-')) return svgTessellIcon(token.split('-')[1]);
    if (token.startsWith('shadow-')) return svgShadow(token.split('-')[1]);
    if (token.startsWith('origami-')) return svgOrigami(token.split('-')[1]);
    const parts = token.split('-');
    const shape = parts[0];
    const mapSize = { small:16, medium:22, large:28 };
    let size = mapSize.medium, rot = 0, color = '#e2e8f0', stroke = '#111', number = '';
    parts.slice(1).forEach(p=>{
      if (mapSize[p]) size = mapSize[p];
      else if (p.endsWith('deg')) rot = parseInt(p,10);
      else if (/^\d+$/.test(p)) number = p;
      else {
        const colors = { blue:'#0ea5e9', red:'#ef4444', green:'#22c55e', yellow:'#f59e0b', orange:'#fb923c' };
        if (colors[p]) color = colors[p];
      }
    });
    if (shape.startsWith('triangle')) {
      let fill = color;
      // Handle special triangle tokens with color and number
      if (token.includes('-green-')) fill = '#22c55e';
      if (token.includes('-blue-')) fill = '#0ea5e9';
      if (token.includes('-red-')) fill = '#ef4444';
      if (token.includes('-orange-')) fill = '#fb923c';
      
      let deco = '';
      if (token.includes('grid')) deco = '<path d="M8 14 L24 14 M16 6 L16 22" stroke="#0f172a" stroke-width="0.6" opacity=".4"/>';
      if (token.includes('dotted')) deco = '<circle cx="16" cy="14" r="1" fill="#0f172a" opacity=".5"/><circle cx="12" cy="18" r="1" fill="#0f172a" opacity=".5"/><circle cx="20" cy="18" r="1" fill="#0f172a" opacity=".5"/>';
      if (token.includes('striped')) deco = '<path d="M10 20 L22 8" stroke="#0f172a" stroke-width="1" opacity=".5"/>';
      return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot} 16 16)"><polygon points="16,6 6,26 26,26" fill="${fill}" stroke="#111" opacity="0.8"/>${deco}</g>${number?`<text x="16" y="20" text-anchor="middle" font-size="10" fill="#0f172a">${number}</text>`:''}</svg>`;
    }
    if (shape.startsWith('circle')) {
      let fill = color;
      if (token.includes('-blue-')) fill = '#0ea5e9';
      return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="${size/2}" fill="${fill}" stroke="#111" opacity="0.8"/>${number?`<text x="16" y="20" text-anchor="middle" font-size="10" fill="#0f172a">${number}</text>`:''}</svg>`;
    }
    if (shape.startsWith('square')) {
      let fill = color;
      if (token.includes('-orange-')) fill = '#fb923c';
      return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot} 16 16)"><rect x="${16-size/2}" y="${16-size/2}" width="${size}" height="${size}" rx="4" fill="${fill}" stroke="${stroke}" opacity="0.8"/></g>${number?`<text x="16" y="20" text-anchor="middle" font-size="10" fill="#0f172a">${number}</text>`:''}</svg>`;
    }
    console.warn('Unknown icon token:', token);
    return '';
  }

  // Validate question coherence: media present for visual prompts and matching answer icon types
  function validateQuestionsVisualCoherence(items){
    const isNumericText = (t)=> typeof t === 'string' && /^\d+%?$/.test(t.trim());
    const hasIconOnly = (opt)=> opt && typeof opt.icon === 'string' && opt.icon !== '' && (!opt.text || opt.text === '');
    const ensureIconFromText = (opt)=>{
      if (!opt.icon && isNumericText(opt.text)) opt.icon = `number-${opt.text}`;
      if (!opt.text) opt.text = '';
      return opt;
    };
    const parseNumberFromIcon = (icon)=>{
      if (!icon) return NaN;
      if (icon.startsWith('number-')) return parseFloat(icon.split('number-')[1]);
      return NaN;
    };
    const computeFlowNext = (arr)=>{
      const a = Number(arr?.[0]);
      const b = Number(arr?.[1]);
      if (!isFinite(a) || !isFinite(b)) return NaN;
      const ratio = b / a;
      if (Number.isInteger(ratio)) return b * ratio;
      const diff = b - a;
      return b + diff;
    };
    const recognized = (token)=>{
      try { return !!renderIcon(token); } catch { return false; }
    };

    // --- helpers to ensure diverse options ---
    const parseShapeToken = (icon)=>{
      if (!icon) return null;
      const parts = icon.split('-');
      return {
        shape: parts[0],
        size: parts.find(p=> p==='small'||p==='medium'||p==='large') || 'medium',
        deg: (parts.find(p=> p.endsWith('deg'))||'0').replace('deg',''),
        color: ['blue','red','green','yellow','orange'].find(c=> parts.includes(c)) || ''
      };
    };
    const composeShapeToken = ({shape,size,deg,color})=>{
      return [shape, size, color, `${deg}deg`].filter(Boolean).join('-');
    };
    const altFromBase = (base, idx)=>{
      const p = parseShapeToken(base);
      if (!p) return base;
      const colors = ['', 'blue', 'red', 'green', 'orange'];
      const degNum = parseInt(p.deg||'0',10);
      const alt = { ...p };
      if (p.shape==='triangle' || p.shape==='square') {
        alt.deg = ((degNum + (idx*90)) % 360).toString();
        alt.color = colors[(idx % colors.length)];
      } else if (p.shape==='circle') {
        alt.size = (p.size==='medium'? (idx%2? 'small':'large') : 'medium');
        alt.color = colors[(idx % colors.length)];
      } else {
        alt.color = colors[(idx % colors.length)];
      }
      return composeShapeToken(alt);
    };
    const ensureOptionDiversity = (q)=>{
      if (!Array.isArray(q.options) || q.options.length===0) return q;
      const correct = q.options.find(o=> o.isCorrect);
      const baseIcon = correct && correct.icon ? correct.icon : (q.options[0]?.icon || 'square-medium-0deg');
      const seen = new Set();
      q.options.forEach((o, i) => {
        if (!o.icon || seen.has(o.icon)){
          if (o.isCorrect) {
            // keep correct; if duplicate, alter others instead
            seen.add(o.icon||'');
          } else {
            // generate a different variant from the correct icon
            let j = 1;
            let candidate = altFromBase(baseIcon, i+j);
            while (seen.has(candidate)) { j++; candidate = altFromBase(baseIcon, i+j); }
            o.icon = candidate; o.text = '';
          }
        }
        seen.add(o.icon||'');
      });
      return q;
    };
    const coerceMatrixRotationColor = (q)=>{
      if (!q.media || q.media.type!=='matrix' || !(q.media.variant||'').includes('rotation-color')) return q;
      const base = 'triangle-medium-0deg-blue';
      const candidates = [
        base,
        altFromBase(base,1),
        altFromBase(base,2),
        altFromBase(base,3)
      ];
      // preserve which one isCorrect; just swap icons to triangle variants
      q.options = (q.options||[]).slice(0,4).map((o,i)=> ({...o, text:'', icon: candidates[i]}));
      // keep exactly one correct (the first flagged correct keeps position)
      const ix = Math.max(0, (q.options||[]).findIndex(o=> o.isCorrect));
      q.options.forEach((o,i)=> o.isCorrect = (i=== (ix>=0? ix:0)));
      return q;
    };
    const computeSequenceNext = (arr)=>{
      const nums = (arr||[]).filter(v=> typeof v==='number');
      if (nums.length<2) return NaN;
      const d = nums[1]-nums[0];
      const arith = nums.every((v,i)=> i===0 || (v-nums[i-1])===d);
      if (arith) return nums[nums.length-1]+d;
      const r = nums[0]!==0 ? nums[1]/nums[0] : NaN;
      const geom = nums.every((v,i)=> i===0 || (nums[i-1]!==0 && Math.abs((v/nums[i-1])-r)<1e-9));
      if (geom && Number.isFinite(r)) return nums[nums.length-1]*r;
      // fallback: last + (last - prev)
      return nums[nums.length-1] + (nums[nums.length-1]-nums[nums.length-2]);
    };
    const computeSidesFromPrompt = (prompt)=>{
      if (!prompt) return NaN;
      const p = (prompt||'').toLowerCase();
      const map = { triangle:3, triang:3, '△':3, carre:4, carré:4, square:4, rectangle:4, pentagon:5, pentagone:5, hexagon:6, hexagone:6, octagon:8, octogone:8, cercle:0, circle:0 };
      for (const k of Object.keys(map)){
        if (p.includes(k)) return map[k];
      }
      return NaN;
    };

    return (items||[]).map((q, idx)=>{
      const theme = (q.theme||'').toLowerCase();
      const isVisual = ['logique','formes','numerique'].includes(theme) && q.media && typeof q.media === 'object';
      // Flow-diagram: answers must be numeric icons
      if (q.media && q.media.type === 'flow-diagram' && Array.isArray(q.options)){
        q.options = q.options.map(o=> ensureIconFromText({ ...o }));
        // Autofix correctness based on rule
        const expected = computeFlowNext(q.media.values||[]);
        if (isFinite(expected)){
          const expectedToken = `number-${expected}`;
          let fixed = false;
          const anyMatches = q.options.some(o=> o.icon === expectedToken);
          if (anyMatches){
            q.options.forEach(o=> o.isCorrect = (o.icon === expectedToken));
            fixed = true;
          } else {
            // replace first option to expected
            if (q.options[0]){
              q.options[0].icon = expectedToken; q.options[0].isCorrect = true;
              for (let i=1;i<q.options.length;i++) q.options[i].isCorrect = false;
              fixed = true;
            }
          }
        }
      }
      // Sequence-numbers numerique: prefer number- icons
      if (q.media && q.media.type === 'sequence-numbers' && Array.isArray(q.options)){
        // Compute expected and rebuild a plausible set
        const expected = computeSequenceNext(q.media.values||[]);
        if (isFinite(expected)){
          const dif = Math.max(1, Math.abs((q.media.values?.[1]||0) - (q.media.values?.[0]||0))||1);
          const distractors = [expected+dif, expected-dif, expected+2*dif].filter((v,i,arr)=> v>0 && v!==expected && arr.indexOf(v)===i);
          const opts = [expected, ...distractors].slice(0,4);
          q.options = opts.map((n,i)=> ({ text:'', icon:`number-${n}`, isCorrect:i===0 }));
        } else {
          q.options = q.options.map(o=> ensureIconFromText({ ...o }));
        }
      }
      // For visual questions, remove stray textual labels
      if (isVisual && Array.isArray(q.options)){
        // Preserve text for numeric/logical questions even with visuals (e.g., bar charts)
        // Strip text only for purely abstract visual questions where text is a placeholder
        const isPurelyVisual = q.theme === 'formes' || (q.media && ['matrix','rotation-preview','mirror-complex','cube-net'].includes(q.media.type));
        if (isPurelyVisual){
          q.options = q.options.map(o=> ({ ...o, text: '' }));
        }
        // Ensure renderable icons; replace unknown tokens with safe fallbacks
        q.options = q.options.map(o=>{
          if (o.icon && !recognized(o.icon)){
            // Fallbacks by theme
            if (theme==='logique') o.icon = 'square-medium-0deg';
            else if (theme==='formes') o.icon = 'triangle-medium-0deg';
            else if (theme==='numerique') o.icon = 'number-0';
          }
          return o;
        });
        // Normalize matrix rotation+couleur answers to triangle variants for visual coherence
        q = coerceMatrixRotationColor(q);
        // If prompt asks "combien" et fait référence à une forme → réponses numériques (n côtés)
        if ((/combien|côt|cote/.test((q.prompt||'').toLowerCase()) || (q.media && q.media.type==='shape-sides'))){
          const expected = computeSidesFromPrompt(q.prompt||'');
          if (isFinite(expected) && expected>0){
            const distractors = [expected-1, expected+1, expected+2].filter((v,i,arr)=> v>0 && v!==expected && arr.indexOf(v)===i);
            const opts = [expected, ...distractors].slice(0,4);
            q.options = opts.map((n,i)=> ({ text:'', icon:`number-${n}`, isCorrect:i===0 }));
          }
        }
        // Enforce diversity (avoid four times the same response)
        q = ensureOptionDiversity(q);
      }
      return q;
    });
  }

  // Final guard: ensure all questions are renderable and have exactly one correct option
  function autoFixAndFilter(items){
    const cleaned = [];
    (items||[]).forEach((q, idx)=>{
      try{
        if (!q || !Array.isArray(q.options) || q.options.length<2) return;
        // Must have exactly one correct answer
        let correctCount = q.options.filter(o=> !!o.isCorrect).length;
        if (correctCount !== 1){
          q.options.forEach((o,i)=> o.isCorrect = i===0);
          correctCount = 1;
        }
        // Ensure each option can render
        q.options = q.options.map(o=>{
          if (!o.icon && o.text && /^\d+%?$/.test(o.text)) o.icon = `number-${o.text}`;
          if (!o.icon) o.icon = (q.theme==='numerique' ? 'number-0' : q.theme==='formes' ? 'triangle-medium-0deg' : 'square-medium-0deg');
          return o;
        });
        cleaned.push(q);
      }catch(e){ /* skip invalid */ }
    });
    return cleaned;
  }

  function svgFlatCube(variant){
    const colors = { blue:'#0ea5e9', red:'#ef4444', green:'#22c55e' };
    return `<div class="d-flex justify-content-center"><svg width="140" height="120" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="70,10 110,30 70,50 30,30" fill="${colors.blue}" opacity=".8" stroke="#0f172a"/>
      <polygon points="110,30 110,70 70,90 70,50" fill="${colors.red}" opacity=".8" stroke="#0f172a"/>
      <polygon points="30,30 70,50 70,90 30,70" fill="${colors.green}" opacity=".8" stroke="#0f172a"/>
    </svg></div>`;
  }

  function svgTetraPattern(variant){
    const tri = (tx, ty, deco='') => `<g transform="translate(${tx},${ty})"><polygon points="40,0 0,70 80,70" fill="#e2e8f0" stroke="#111"/>${deco}</g>`;
    const striped = '<path d="M10 60 L70 10" stroke="#0f172a" stroke-width="2" opacity=".4"/>';
    const dotted = '<circle cx="40" cy="40" r="2" fill="#0f172a" opacity=".5"/><circle cx="25" cy="55" r="2" fill="#0f172a" opacity=".5"/><circle cx="55" cy="55" r="2" fill="#0f172a" opacity=".5"/>';
    const grid = '<path d="M20 70 L20 20 M40 70 L40 20 M60 70 L60 20 M0 50 L80 50 M0 30 L80 30" stroke="#0f172a" stroke-width="1" opacity=".2"/>';
    return `<div class="d-flex justify-content-center"><svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
      ${tri(70,0,striped)}${tri(0,70,dotted)}${tri(70,70,grid)}${tri(140,70,'')}
    </svg></div>`;
  }

  function svgFlowDiagram(values){
    // Extract color from third value if it's a string like "triangle-green"
    const thirdVal = values[2] || "triangle-green";
    const colorMatch = thirdVal.toString().match(/(green|blue|red|orange)/);
    const shapeColor = colorMatch ? {
      'green': '#22c55e',
      'blue': '#0ea5e9', 
      'red': '#ef4444',
      'orange': '#fb923c'
    }[colorMatch[1]] : '#22c55e';
    
    return `<div class="d-flex justify-content-center"><svg width="260" height="120" viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="40" width="40" height="40" rx="6" fill="#e2e8f0" stroke="#0f172a"/>
      <text x="40" y="65" font-size="12" text-anchor="middle">${values[0]||2}</text>
      <line x1="60" y1="60" x2="110" y2="60" stroke="#94a3b8" marker-end="url(#arrow)"/>
      <circle cx="130" cy="60" r="20" fill="#e2e8f0" stroke="#0f172a"/>
      <text x="130" y="65" font-size="12" text-anchor="middle">${values[1]||4}</text>
      <line x1="150" y1="60" x2="200" y2="60" stroke="#94a3b8" marker-end="url(#arrow)"/>
      <polygon points="220,40 240,60 220,80" fill="${shapeColor}" stroke="#0f172a" opacity="0.8"/>
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/></marker></defs>
    </svg></div>`;
  }

  // Add missing PRAISE_VARIANTS and other functions
  const PRAISE_VARIANTS = [
    { title: 'Bon rythme ! 👍', msg: 'Vous progressez bien dans le test.' },
    { title: 'Excellent ! ⭐', msg: 'Vos réponses montrent une bonne logique.' },
    { title: 'Très bien ! 🎯', msg: 'Continuez sur cette lancée.' },
    { title: 'Parfait ! 🔥', msg: 'Vous maîtrisez bien ces questions.' }
  ];
  
  function makeConfetti(container) {
    if (!container) return;
    for (let i = 0; i < 25; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.position = 'absolute';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = Math.random() * 100 + '%';
      confetti.style.backgroundColor = ['#22c55e', '#f59e0b', '#ef4444', '#0ea5e9'][Math.floor(Math.random() * 4)];
      confetti.style.setProperty('--dx', (Math.random() - 0.5) * 200 + 'px');
      confetti.style.setProperty('--dy', (Math.random() - 0.5) * 200 + 'px');
      confetti.style.animation = 'burst 0.8s ease-out forwards';
      container.appendChild(confetti);
      setTimeout(() => confetti.remove(), 800);
    }
  }
  
  function capitalize(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }
  
  function getContextualFeedback(theme, isCorrect) {
    const feedbacks = {
      logique: ['🧩 Logique parfaite !', '🎯 Bon raisonnement !', '⚡ Analyse rapide !'],
      formes: ['👁️ Vision spatiale !', '🔄 Rotation maîtrisée !', '📐 Géométrie claire !'],
      numerique: ['🔢 Calcul précis !', '📊 Suite comprise !', '🎲 Bon en maths !'],
      vocabulaire: ['📚 Vocabulaire riche !', '🗣️ Nuance saisie !', '✍️ Mot juste !']
    };
    const options = feedbacks[theme] || ['✅ Réponse notée !'];
    const msg = options[Math.floor(Math.random() * options.length)];
    return successBadge(msg);
  }
  
  function showResults() {
    const iqScore = 80 + Math.round((state.score / TOTAL_QUESTIONS) * 40);
    // Attractive percentile: always TOP 1-9% (encouraging)
    const scoreRatio = state.score / TOTAL_QUESTIONS;
    const topPercent = Math.max(1, Math.min(9, Math.round(1 + (1 - scoreRatio) * 8)));
    
    if (els.scoreText) els.scoreText.textContent = `IQ ${iqScore}`;
    if (els.percentile) els.percentile.textContent = `TOP ${topPercent}%`;
    
    // Update final blur with attractive percentile
    const finalBlur = document.getElementById('finalBlur');
    if (finalBlur) finalBlur.textContent = `IQ ${iqScore}`;
    
    renderResultsThemeChart();
    renderRadar();
    renderGauss();
    
    showSection('results');
  }
  
  function renderResultsThemeChart() {
    const el = document.getElementById('resultsThemeChart');
    if (!el) return;
    const totals = { logique: 0, vocabulaire: 0, numerique: 0, formes: 0 };
    QUESTIONS.forEach(q => totals[normalizeTheme(q.theme)]++);
    const rows = Object.keys(totals).map(k => {
      const correct = state.themeScores[k] || 0;
      const total = totals[k];
      const pct = Math.round((correct / total) * 100);
      return `<div class="row align-items-center mb-2">
        <div class="col-4 text-capitalize fw-semibold">${k}</div>
        <div class="col-8">
          <div class="bar"><span style="width:${pct}%"></span></div>
          <div class="text-end small text-muted">${correct}/${total}</div>
        </div>
      </div>`;
    }).join('');
    el.innerHTML = rows;
  }
  
  function renderGauss() {
    const el = document.getElementById('gaussChart');
    if (!el) return;
    const scoreRatio = state.score / TOTAL_QUESTIONS;
    const topPercent = Math.max(1, Math.min(9, Math.round(1 + (1 - scoreRatio) * 8)));
    const markerX = 50 + (scoreRatio * 400); // Position on curve
    
    el.innerHTML = `<svg width="520" height="120" viewBox="0 0 520 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,100 Q260,20 510,100" fill="rgba(34,197,94,0.1)" stroke="#22c55e" stroke-width="2"/>
      <line x1="${markerX}" y1="25" x2="${markerX}" y2="100" stroke="#ef4444" stroke-width="3"/>
      <circle cx="${markerX}" cy="22" r="4" fill="#ef4444"/>
      <text x="${markerX}" y="15" text-anchor="middle" font-size="12" font-weight="600" fill="#ef4444">TOP ${topPercent}%</text>
    </svg>`;
  }
  
  function showPaywallWithReassurance() {
    // Add reassurance elements to paywall modal
    const modal = document.getElementById('paywallModal');
    if (modal) {
      // Add reassurance text if not already present
      let reassuranceEl = modal.querySelector('.paywall-reassurance');
      if (!reassuranceEl) {
        reassuranceEl = document.createElement('div');
        reassuranceEl.className = 'paywall-reassurance text-center mb-3';
        reassuranceEl.innerHTML = `
          <div class="d-flex justify-content-center align-items-center gap-2 mb-2">
            <span class="badge bg-success-subtle text-success-emphasis">✓ Sécurisé</span>
            <span class="badge bg-info-subtle text-info-emphasis">✓ Sans engagement</span>
            <span class="badge bg-warning-subtle text-warning-emphasis">✓ Annulation libre</span>
          </div>
          <small class="text-muted">Plus de 20 000 utilisateurs nous font confiance • Paiement 100% sécurisé</small>
        `;
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) modalBody.insertBefore(reassuranceEl, modalBody.firstChild);
      }
    }
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  }
  
  function maybeEncourageIntelligent(isCorrect, elapsedMs){
    // Intelligent popup distribution: max 3 per test, well spaced
    const completedCount = state.completed.filter(Boolean).length;
    const minGapBetweenPopups = 6; // At least 6 questions between popups
    
    // Don't show if already shown 3 popups or too close to last one
    if (state.popupsShown >= 3 || (completedCount - state.lastPopupAt) < minGapBetweenPopups) {
      return;
    }
    
    let variant = null;
    
    // High-priority triggers (always show if conditions met)
    if (isCorrect && state.streak === 5) {
      variant = { title:'Streak parfait x5 🔥', msg:'Vous êtes dans une excellente dynamique !' };
    } else if (isCorrect && elapsedMs < 5000) {
      variant = { title:'Éclair de génie ⚡', msg:'Plus rapide que 85% des utilisateurs sur cette question !' };
    } else if (isCorrect && state.streak === 3) {
      variant = { title:'Série de 3 ✅', msg:'Belle régularité, vous maîtrisez bien !' };
    }
    
    // Medium-priority: strategic milestones (show if no recent popup)
    else if (completedCount === Math.floor(TOTAL_QUESTIONS * 0.25)) {
      variant = { title:'Premier quart ! 🎯', msg:'Excellent démarrage, continuez sur cette lancée !' };
    } else if (completedCount === Math.floor(TOTAL_QUESTIONS * 0.5)) {
      variant = { title:'Mi-parcours ! 🏃‍♂️', msg:'Vous tenez un bon rythme, c\'est parfait !' };
    } else if (completedCount === Math.floor(TOTAL_QUESTIONS * 0.75)) {
      variant = { title:'Dernière ligne droite ! 🏁', msg:'Plus que quelques questions, vous y êtes presque !' };
    }
    
    if (!variant) return;
    
    // Show popup and update tracking
    state.popupsShown++;
    state.lastPopupAt = completedCount;
    
    const modal = new bootstrap.Modal(document.getElementById('praiseModal'));
    document.getElementById('praiseTitle').textContent = variant.title;
    document.getElementById('praiseMsg').textContent = variant.msg;
    modal.show();
    makeConfetti(document.querySelector('#praiseModal .modal-content'));
    setTimeout(() => modal.hide(), 2000);
  }
})();


