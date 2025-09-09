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
    { prompt: 'Quel est l’intrus ?', media: svgOddOneOut(), theme: 'formes', options: [
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

  // Load external questions.json if present
  fetch('./js/questions.json').then(r=>r.ok?r.json():Promise.reject()).then(json=>{
    console.log('Questions loaded:', json.length);
    if (Array.isArray(json) && json.length) {
      QUESTIONS = ensureEightPerTheme(json);
      TOTAL_QUESTIONS = QUESTIONS.length;
      console.log('Total questions after processing:', TOTAL_QUESTIONS);
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
      subscribed: false
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
    els.feedback.innerHTML = successBadge('Réponse enregistrée ✅');
    renderProgress();
    renderPagination();
    maybeEncourageIntelligent(isCorrect, elapsedMs);
    renderThemeSidebar();
    setTimeout(() => move(1), 420);
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
      const label = opt.text || `Option ${i+1}`;
      btn.innerHTML = `<div class="d-flex align-items-center gap-3">${iconHtml}<span class="fw-semibold">${label}</span></div>`;
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
    const stepLabel = document.getElementById('stepLabel');
    if (stepLabel) stepLabel.textContent = `Étape ${Math.min(completedCount+1, TOTAL_QUESTIONS)}/${TOTAL_QUESTIONS}`;
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
    renderReviewTicker();
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
    const top = Math.max(1, Math.min(99, 100 - Math.round((state.score / TOTAL_QUESTIONS) * 100)));
    const topEl = document.getElementById('radarTopPercent'); if (topEl) topEl.textContent = `TOP ${top}%`;
  }

  function renderTicker(){
    const el = document.getElementById('liveTicker'); if(!el) return;
    const firstNames = ['Paul','Camille','Nora','Alex','Marc','Yanis','Lina','Hugo'];
    const cities = ['Paris, FR','Lyon, FR','Marseille, FR','Lille, FR','Bordeaux, FR','Nantes, FR'];
    const samples = Array.from({length: 6}).map((_,i)=>{
      const minutesAgo = Math.floor(Math.random()*55)+1; // 1..55
      const score = 80 + Math.floor(Math.random()*41);   // 80..120
      const name = firstNames[Math.floor(Math.random()*firstNames.length)] + ' ' + String.fromCharCode(65+Math.floor(Math.random()*26)) + '.';
      const city = cities[Math.floor(Math.random()*cities.length)];
      const when = minutesAgo < 60 ? `${minutesAgo} min` : `${Math.floor(minutesAgo/60)} h`;
      return { iq: score, who: `${name} (${city})`, when };
    });
    el.innerHTML = samples.map(s=>`<div class="item"><span>IQ ${s.iq} — ${s.who}</span><span class="time">il y a ${s.when}</span></div>`).join('');
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
      'concept-blur': '<circle cx="16" cy="16" r="8" fill="#94a3b8" opacity="0.5" filter="blur(2px)"/>'
    };
    const iconSvg = icons[token] || '<rect x="8" y="8" width="16" height="16" fill="#e2e8f0"/>';
    return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">${iconSvg}</svg>`;
  }

  // Media & icon renderers + theme normalization
  function normalizeTheme(t){ return t === 'spatial' ? 'formes' : (t || 'logique'); }

  function renderMedia(media){
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (media.type === 'matrix') return svgMatrixMain();
    if (media.type === '3d-cube') return svgFlatCube(media.variant);
    if (media.type === 'bars') return svgBars(media.values||[]);
    if (media.type === 'tetrahedron-pattern') return svgTetraPattern(media.variant);
    if (media.type === 'flow-diagram') return svgFlowDiagram(media.values||[]);
    return '';
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
    if (shape.startsWith('square')) {
      return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot} 16 16)"><rect x="${16-size/2}" y="${16-size/2}" width="${size}" height="${size}" rx="4" fill="${color}" stroke="${stroke}"/></g>${number?`<text x="16" y="20" text-anchor="middle" font-size="10" fill="#0f172a">${number}</text>`:''}</svg>`;
    }
    if (shape.startsWith('triangle')) {
      const fill = color;
      let deco = '';
      if (token.includes('grid')) deco = '<path d="M8 14 L24 14 M16 6 L16 22" stroke="#0f172a" stroke-width="0.6" opacity=".4"/>';
      if (token.includes('dotted')) deco = '<circle cx="16" cy="14" r="1" fill="#0f172a" opacity=".5"/><circle cx="12" cy="18" r="1" fill="#0f172a" opacity=".5"/><circle cx="20" cy="18" r="1" fill="#0f172a" opacity=".5"/>';
      if (token.includes('striped')) deco = '<path d="M10 20 L22 8" stroke="#0f172a" stroke-width="1" opacity=".5"/>';
      return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot} 16 16)"><polygon points="16,6 6,26 26,26" fill="${fill}" stroke="#111"/>${deco}</g>${number?`<text x="16" y="20" text-anchor="middle" font-size="10" fill="#0f172a">${number}</text>`:''}</svg>`;
    }
    if (shape.startsWith('circle')) {
      return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="${size/2}" fill="${color}" stroke="#111"/>${number?`<text x="16" y="20" text-anchor="middle" font-size="10" fill="#0f172a">${number}</text>`:''}</svg>`;
    }
    console.warn('Unknown icon token:', token);
    return '';
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
    return `<div class="d-flex justify-content-center"><svg width="260" height="120" viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="40" width="40" height="40" rx="6" fill="#e2e8f0" stroke="#0f172a"/>
      <text x="40" y="65" font-size="12" text-anchor="middle">${values[0]||2}</text>
      <line x1="60" y1="60" x2="110" y2="60" stroke="#94a3b8" marker-end="url(#arrow)"/>
      <circle cx="130" cy="60" r="20" fill="#e2e8f0" stroke="#0f172a"/>
      <text x="130" y="65" font-size="12" text-anchor="middle">${values[1]||4}</text>
      <line x1="150" y1="60" x2="200" y2="60" stroke="#94a3b8" marker-end="url(#arrow)"/>
      <polygon points="220,40 240,60 220,80" fill="#fff" stroke="#0f172a"/>
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
  
  function maybeEncourageIntelligent(isCorrect, elapsedMs){
    const completedCount = state.completed.filter(Boolean).length;
    let variant = null;
    if (isCorrect && state.streak === 3) variant = { title:'Série de 3 ✅', msg:'Belle régularité, continuez !' };
    if (isCorrect && state.streak === 5) variant = { title:'Streak x5 🔥', msg:'Vous êtes dans une excellente dynamique.' };
    const fast = elapsedMs < 7000;
    if (isCorrect && fast) variant = { title:'Rapide et juste ⚡', msg:'Plus rapide que 80% des utilisateurs sur cet item.' };
    if (!variant && completedCount % 3 === 0) {
      const v = PRAISE_VARIANTS[(completedCount/3)%PRAISE_VARIANTS.length | 0];
      variant = v;
    }
    if (!variant) return;
    const modal = new bootstrap.Modal(document.getElementById('praiseModal'));
    document.getElementById('praiseTitle').textContent = variant.title;
    document.getElementById('praiseMsg').textContent = variant.msg;
    modal.show();
    makeConfetti(document.querySelector('#praiseModal .modal-content'));
    setTimeout(() => modal.hide(), 1700);
  }
})();


