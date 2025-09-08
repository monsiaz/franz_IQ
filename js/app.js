(() => {
  const TOTAL_QUESTIONS = 15;

  /**
   * Simple set of fun, easy questions with optional inline SVG visuals.
   * Each question contains options with a boolean 'isCorrect'.
   */
  const QUESTIONS = [
    {
      prompt: 'Quel motif complète la série ?',
      media: svgMotifSequence(),
      options: [
        { text: 'Motif A', isCorrect: false, color: 'bg-answer' },
        { text: 'Motif B', isCorrect: true, color: 'bg-answer' },
        { text: 'Motif C', isCorrect: false, color: 'bg-answer' }
      ]
    },
    {
      prompt: 'Quelle figure complète la grille ?',
      media: svgPuzzle('grid-hole'),
      options: [
        { text: 'Carré simple', isCorrect: false, color: 'bg-answer' },
        { text: 'Grille complète', isCorrect: true, color: 'bg-answer' },
        { text: 'Croix', isCorrect: false, color: 'bg-answer' }
      ]
    },
    { prompt: 'Quel nombre suit: 2, 4, 8, 16, ... ?', media: svgBars([2,4,8,16]), options: [
      { text: '24', isCorrect: false, color: 'bg-answer' },
      { text: '30', isCorrect: false, color: 'bg-answer' },
      { text: '32', isCorrect: true, color: 'bg-answer' }
    ] },
    { prompt: 'Combien de côtés a un octogone ?', media: svgOctagonRef(), options: [
      { text: '6', isCorrect: false, color: 'bg-answer' },
      { text: '8', isCorrect: true, color: 'bg-answer' },
      { text: '10', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quel mot est un synonyme de "rapide" ?', media: svgSpeedIcon(), options: [
      { text: 'Lent', isCorrect: false, color: 'bg-answer' },
      { text: 'Vite', isCorrect: true, color: 'bg-answer' },
      { text: 'Immense', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quelle forme a 3 côtés ?', media: svgTriangleRef(), options: [
      { text: 'Triangle', isCorrect: true, color: 'bg-answer' },
      { text: 'Cercle', isCorrect: false, color: 'bg-answer' },
      { text: 'Carré', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Complétez: L, M, N, O, ...', media: svgLettersSeq(['L','M','N','O','?']), options: [
      { text: 'P', isCorrect: true, color: 'bg-answer' },
      { text: 'Q', isCorrect: false, color: 'bg-answer' },
      { text: 'R', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Combien font 7 × 6 ?', media: svgGrid(7, 4), options: [
      { text: '42', isCorrect: true, color: 'bg-answer' },
      { text: '36', isCorrect: false, color: 'bg-answer' },
      { text: '48', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Le contraire de "ouvert" est ...', media: svgDoorOpen(), options: [
      { text: 'Fermé', isCorrect: true, color: 'bg-answer' },
      { text: 'Large', isCorrect: false, color: 'bg-answer' },
      { text: 'Vide', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quel est le jour suivant lundi ?', media: svgCalendar('Lun'), options: [
      { text: 'Mardi', isCorrect: true, color: 'bg-answer' },
      { text: 'Samedi', isCorrect: false, color: 'bg-answer' },
      { text: 'Dimanche', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quel est le plus grand nombre ?', media: svgBars([99,100,101]), options: [
      { text: '99', isCorrect: false, color: 'bg-answer' },
      { text: '100', isCorrect: false, color: 'bg-answer' },
      { text: '101', isCorrect: true, color: 'bg-answer' }
    ] },
    { prompt: 'Quel est l’intrus ?', media: svgOddOneOut(), options: [
      { text: 'Rouge', isCorrect: false, color: 'bg-answer' },
      { text: 'Bleu', isCorrect: false, color: 'bg-answer' },
      { text: 'Carré', isCorrect: true, color: 'bg-answer' }
    ] },
    { prompt: 'Dans la suite 1, 1, 2, 3, 5, 8, ... ?', media: svgBars([1,1,2,3,5,8]), options: [
      { text: '13', isCorrect: true, color: 'bg-answer' },
      { text: '14', isCorrect: false, color: 'bg-answer' },
      { text: '10', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Si un train part à 12h et met 2h, il arrive à ...', media: svgClock(12), options: [
      { text: '13h', isCorrect: false, color: 'bg-answer' },
      { text: '14h', isCorrect: true, color: 'bg-answer' },
      { text: '15h', isCorrect: false, color: 'bg-answer' }
    ] },
    { prompt: 'Quelle forme est uniquement composée de lignes courbes ?', media: svgShapes(true), options: [
      { text: 'Cercle', isCorrect: true, color: 'bg-answer' },
      { text: 'Triangle', isCorrect: false, color: 'bg-answer' },
      { text: 'Rectangle', isCorrect: false, color: 'bg-answer' }
    ] }
  ];

  let state = {
    index: 0,
    score: 0,
    completed: Array(TOTAL_QUESTIONS).fill(false),
    subscribed: false
  };

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
    percentile: document.getElementById('percentile')
  };

  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('btnStartHero').addEventListener('click', startQuiz);
  document.getElementById('btnStartTop').addEventListener('click', startQuiz);
  document.getElementById('btnRestart')?.addEventListener('click', () => {
    state = { index: 0, score: 0, completed: Array(TOTAL_QUESTIONS).fill(false), subscribed: state.subscribed };
    showSection('quiz');
    render();
  });

  els.btnPrev.addEventListener('click', () => move(-1));
  els.btnNext.addEventListener('click', () => move(1));

  function startQuiz() {
    showSection('quiz');
    renderPagination();
    render();
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
  }

  function handleAnswerClick(optionEl, isCorrect) {
    if (state.completed[state.index]) return;
    state.completed[state.index] = true;
    if (isCorrect) state.score += 1;
    // Neutral UX: do not reveal correctness
    optionEl.classList.add('selected');
    Array.from(els.answers.children).forEach(c => c.disabled = true);
    els.feedback.innerHTML = successBadge('Réponse enregistrée ✅');
    renderProgress();
    renderPagination();
    maybeEncourage();
    setTimeout(() => move(1), 420);
  }

  function render() {
    const q = QUESTIONS[state.index];
    els.stepTotal.textContent = String(TOTAL_QUESTIONS);
    els.stepNow.textContent = String(state.index + 1);
    els.questionText.textContent = q.prompt;
    els.questionMedia.innerHTML = q.media || '';
    els.feedback.innerHTML = '';
    els.answers.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = `answer btn w-100 text-start ${opt.color}`;
      btn.innerHTML = `<div class="d-flex justify-content-between align-items-center"><span>${opt.text}</span><span class="bi"></span></div>`;
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

  function maybeEncourage() {
    const completedCount = state.completed.filter(Boolean).length;
    if (completedCount > 0 && completedCount % 3 === 0 && completedCount < TOTAL_QUESTIONS) {
      showToast("Vous êtes dans le top 10% des participants aujourd'hui ! ⚡");
    }
  }

  function showResults() {
    const iqScore = 80 + Math.round((state.score / TOTAL_QUESTIONS) * 40); // 80-120 simple scale
    const percentile = Math.max(1, Math.min(99, Math.round((state.score / TOTAL_QUESTIONS) * 100)));
    els.scoreText.textContent = `IQ ${iqScore}`;
    document.getElementById('percentile').textContent = `${percentile}%`;
    showSection('results');
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
  function showToast(message) {
    const toastEl = document.getElementById('toastProgress');
    if (!toastEl) return;
    toastEl.querySelector('.toast-body').textContent = message;
    const t = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2600 });
    t.show();
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
})();


