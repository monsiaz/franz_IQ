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
      { text: 'P', isCorrect: true, color: 'bg-answer' },
      { text: 'Q', isCorrect: false, color: 'bg-answer' },
      { text: 'R', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Combien font 7 × 6 ?', media: svgDotsGrid(7, 6), theme: 'numerique', options: [
      { text: '42', isCorrect: true, color: 'bg-answer' },
      { text: '36', isCorrect: false, color: 'bg-answer' },
      { text: '48', isCorrect: false, color: 'bg-answer' },
      { text: '40', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Le contraire de "ouvert" est ...', media: svgDoorOpen(), theme: 'vocabulaire', options: [
      { text: 'Fermé', isCorrect: true, color: 'bg-answer' },
      { text: 'Large', isCorrect: false, color: 'bg-answer' },
      { text: 'Vide', isCorrect: false, color: 'bg-answer' },
      { text: 'Transparent', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quel est le jour suivant lundi ?', media: svgCalendar('Lun'), theme: 'logique', options: [
      { text: 'Mardi', isCorrect: true, color: 'bg-answer' },
      { text: 'Samedi', isCorrect: false, color: 'bg-answer' },
      { text: 'Dimanche', isCorrect: false, color: 'bg-answer' },
      { text: 'Jeudi', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quel est le plus grand nombre ?', media: svgBars([99,100,101]), theme: 'numerique', options: [
      { text: '99', isCorrect: false, color: 'bg-answer' },
      { text: '100', isCorrect: false, color: 'bg-answer' },
      { text: '101', isCorrect: true, color: 'bg-answer' }
    ] },
    { prompt: 'Quel est l’intrus ?', media: svgOddOneOut(), theme: 'formes', options: [
      { text: 'Rouge', isCorrect: false, color: 'bg-answer' },
      { text: 'Bleu', isCorrect: false, color: 'bg-answer' },
      { text: 'Carré', isCorrect: true, color: 'bg-answer' },
      { text: 'Vert', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Dans la suite 1, 1, 2, 3, 5, 8, ... ?', media: svgBars([1,1,2,3,5,8]), theme: 'numerique', options: [
      { text: '13', isCorrect: true, color: 'bg-answer' },
      { text: '14', isCorrect: false, color: 'bg-answer' },
      { text: '10', isCorrect: false, color: 'bg-answer' },
      { text: '12', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Si un train part à 12h et met 2h, il arrive à ...', media: svgClockRange(12,14), theme: 'logique', options: [
      { text: '13h', isCorrect: false, color: 'bg-answer' },
      { text: '14h', isCorrect: true, color: 'bg-answer' },
      { text: '15h', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quelle forme est uniquement composée de lignes courbes ?', media: svgShapes(true), theme: 'formes', options: [
      { text: 'Cercle', isCorrect: true, color: 'bg-answer' },
      { text: 'Triangle', isCorrect: false, color: 'bg-answer' },
      { text: 'Rectangle', isCorrect: false, color: 'bg-answer' },
      { text: 'Carré', isCorrect: false, color: 'bg-answer' }
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
      { text: '10', isCorrect: false, color: 'bg-answer' },
      { text: '12', isCorrect: true, color: 'bg-answer' },
      { text: '14', isCorrect: false, color: 'bg-answer' },
      { text: '16', isCorrect: false, color: 'bg-answer' }
    ] },

    // Vocabulaire
    { prompt: 'Quel est le synonyme de "début" ?', media: '', theme: 'vocabulaire', options: [
      { text: 'Commencement', isCorrect: true, color: 'bg-answer' },
      { text: 'Fin', isCorrect: false, color: 'bg-answer' },
      { text: 'Arrêt', isCorrect: false, color: 'bg-answer' },
      { text: 'Barrage', isCorrect: false, color: 'bg-answer' }
    ] },

    // Logique temporelle
    { prompt: 'Après 21h vient ...', media: '', theme: 'logique', options: [
      { text: '22h', isCorrect: true, color: 'bg-answer' },
      { text: '20h', isCorrect: false, color: 'bg-answer' },
      { text: '23h', isCorrect: false, color: 'bg-answer' },
      { text: '19h', isCorrect: false, color: 'bg-answer' }
    ] }
  ];

  // Total basé sur la longueur réelle
  TOTAL_QUESTIONS = QUESTIONS.length;

  // Load external questions.json if present
  fetch('./js/questions.json').then(r=>r.ok?r.json():Promise.reject()).then(json=>{
    if (Array.isArray(json) && json.length) {
      QUESTIONS = json;
      TOTAL_QUESTIONS = QUESTIONS.length;
      // reset state if quiz already visible
      if (!document.getElementById('hero').classList.contains('d-none')) return;
      state = initialState();
      renderPagination();
      render();
      renderThemeSidebar();
    }
  }).catch(()=>{});

  function initialState() {
    return {
      index: 0,
      score: 0,
      completed: Array(TOTAL_QUESTIONS).fill(false),
      themeScores: { logique: 0, vocabulaire: 0, numerique: 0, formes: 0 }, // correct answers by theme
      themeAttempts: { logique: 0, vocabulaire: 0, numerique: 0, formes: 0 }, // answered by theme
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
    const themeNow = QUESTIONS[state.index].theme || 'logique';
    state.themeAttempts[themeNow] = (state.themeAttempts[themeNow] || 0) + 1;
    if (isCorrect) {
      state.score += 1;
      state.themeScores[themeNow] = (state.themeScores[themeNow] || 0) + 1;
    }
    // Neutral UX: do not reveal correctness
    optionEl.classList.add('selected');
    Array.from(els.answers.children).forEach(c => c.disabled = true);
    els.feedback.innerHTML = successBadge('Réponse enregistrée ✅');
    renderProgress();
    renderPagination();
    maybeEncourage();
    renderThemeSidebar();
    setTimeout(() => move(1), 420);
  }

  function render() {
    const q = QUESTIONS[state.index];
    els.stepTotal.textContent = String(TOTAL_QUESTIONS);
    els.stepNow.textContent = String(state.index + 1);
    els.questionText.textContent = q.prompt;
    els.themeBadge.innerHTML = q.theme ? `<span class="theme-pill">${capitalize(q.theme)}</span>` : '';
    els.questionMedia.innerHTML = q.media || '';
    els.feedback.innerHTML = '';
    els.answers.innerHTML = '';
    els.answers.classList.add('d-grid');
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = `answer btn text-start ${opt.color}`;
      btn.innerHTML = `<div class="d-flex align-items-center gap-3">
        ${opt.icon ? `<span>${opt.icon}</span>` : ''}
        <span class="fw-semibold">${opt.text}</span>
      </div>`;
      btn.addEventListener('click', () => handleAnswerClick(btn, !!opt.isCorrect));
      els.answers.appendChild(btn);
    });

    els.btnPrev.disabled = state.index === 0;
    els.btnNext.textContent = state.index === TOTAL_QUESTIONS - 1 ? 'Terminer' : 'Suivant';
    renderProgress();
    // Animate the card body
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
    els.progressBar.style.width = `${pct}%`;
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
    QUESTIONS.forEach(q => totals[q.theme || 'logique']++);
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
  }

  function capitalize(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }

  const PRAISE_VARIANTS = [
    { title: 'Super rythme ⚡', msg: 'Vous gardez une avance nette !' },
    { title: 'Bravo 👏', msg: 'Top 10% sur la vitesse aujourd\'hui.' },
    { title: 'Continuez 🚀', msg: 'Exécution fluide, c\'est excellent.' }
  ];

  function maybeEncourage() {
    const completedCount = state.completed.filter(Boolean).length;
    if (completedCount > 0 && completedCount % 3 === 0 && completedCount < TOTAL_QUESTIONS) {
      const v = PRAISE_VARIANTS[(completedCount/3)%PRAISE_VARIANTS.length | 0];
      // Big popup only (remove toast to avoid duplicate)
      const modal = new bootstrap.Modal(document.getElementById('praiseModal'));
      document.getElementById('praiseTitle').textContent = v.title;
      document.getElementById('praiseMsg').textContent = v.msg;
      modal.show();
      makeConfetti(document.querySelector('#praiseModal .modal-content'));
      setTimeout(() => modal.hide(), 1700);
    }
  }

  function makeConfetti(target) {
    if (!target) return;
    for (let i = 0; i < 22; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.background = ['#14b8a6','#0ea5e9','#f59e0b','#ef4444'][i%4];
      c.style.left = '50%'; c.style.top = '48%'; c.style.position = 'absolute';
      const dx = (Math.random()*180-90) + 'px';
      const dy = (Math.random()*140-70) + 'px';
      c.style.setProperty('--dx', dx); c.style.setProperty('--dy', dy);
      c.style.animation = 'burst 900ms ease-out forwards';
      target.appendChild(c);
      setTimeout(() => c.remove(), 1000);
    }
  }

  function showResults() {
    const iqScore = 80 + Math.round((state.score / TOTAL_QUESTIONS) * 40); // 80-120 simple scale
    const percentile = Math.max(1, Math.min(99, Math.round((state.score / TOTAL_QUESTIONS) * 100)));
    els.scoreText.textContent = `IQ ${iqScore}`;
    document.getElementById('percentile').textContent = `${percentile}%`;
    renderResultsThemeChart();
    renderRadar();
    showSection('results');
  }

  function renderResultsThemeChart(){
    const el = document.getElementById('resultsThemeChart'); if(!el) return;
    const totals = { logique: 0, vocabulaire: 0, numerique: 0, formes: 0 };
    QUESTIONS.forEach(q => totals[q.theme || 'logique']++);
    const rows = Object.keys(totals).map(k => {
      const done = state.themeScores[k] || 0;
      const pct = Math.round((done / totals[k]) * 100);
      return `<div class="row align-items-center">
        <div class="col-5 text-capitalize">${k}</div>
        <div class="col-7">
          <div class="bar"><span style="width:${pct}%"></span></div>
          <div class="text-end small text-muted">${done}/${totals[k]}</div>
        </div>
      </div>`;
    }).join('');
    el.innerHTML = rows;
  }

  function renderGauss(percentile){
    const container = document.getElementById('gaussChart'); if(!container) return;
    const bins = [1,3,7,12,18,22,18,12,7,3,1];
    const max = Math.max(...bins);
    const w = 260, h = 110, bw = Math.floor(w / bins.length) - 2;
    let s = '';
    bins.forEach((v,i)=>{
      const bh = Math.round((v/max) * (h-20));
      s += `<rect x="${i*(bw+2)}" y="${h-bh}" width="${bw}" height="${bh}" fill="#fde68a"/>`;
    });
    // marker based on percentile (~map 0-100 to 0-w)
    const x = Math.max(0, Math.min(w, Math.round((percentile/100) * w)));
    s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#3b82f6" stroke-width="3"/>`;
    container.innerHTML = `<div class="gauss d-flex justify-content-center"><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>`;
  }

  function renderRadar() {
    const el = document.getElementById('radarChart'); if (!el) return;
    const totals = { logique: 0, vocabulaire: 0, numerique: 0, formes: 0 };
    QUESTIONS.forEach(q => totals[q.theme || 'logique']++);
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
    const now = Date.now();
    const samples = Array.from({length: 6}).map((_,i)=>{
      const minutesAgo = Math.floor(Math.random()*55)+1; // 1..55
      const score = 80 + Math.floor(Math.random()*41);   // 80..120
      return { when: minutesAgo < 60 ? `${minutesAgo} min` : `${Math.floor(minutesAgo/60)} h`, iq: score };
    });
    el.innerHTML = samples.map(s=>`<div class="item"><span>IQ ${s.iq}</span><span class="time">il y a ${s.when}</span></div>`).join('');
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
})();


