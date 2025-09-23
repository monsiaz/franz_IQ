(function(){
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const defaultOptions = () => ([
    { text: '', icon: 'triangle', isCorrect: true },
    { text: '', icon: 'circle', isCorrect: false },
    { text: '', icon: 'square', isCorrect: false },
    { text: '', icon: 'pentagon', isCorrect: false }
  ]);

  function parseJson(text){ try { return JSON.parse(text); } catch { return []; } }

  function readForm(){
    const media = { type: $('#mediaType').value };
    const variant = $('#variant').value.trim();
    if (variant) media.variant = variant;
    const valuesRaw = $('#values').value.trim();
    if (valuesRaw) media.values = parseJson(valuesRaw);

    const opts = $$('#options .opt').map(row => ({
      text: row.querySelector('.opt-text').value,
      icon: row.querySelector('.opt-icon').value,
      isCorrect: row.querySelector('input[type="radio"]').checked
    }));

    return {
      theme: $('#theme').value,
      prompt: $('#prompt').value || 'Question',
      media,
      options: opts
    };
  }

  function renderOptionsEditor(list){
    const root = $('#options');
    root.innerHTML = '';
    list.forEach((opt, i) => {
      const id = 'optCorrect'+i;
      const row = document.createElement('div');
      row.className = 'opt row g-2 align-items-center mb-1';
      row.innerHTML = `
        <div class="col-1 text-center"><input type="radio" name="correct" ${opt.isCorrect?'checked':''} id="${id}"/></div>
        <div class="col-4"><input class="form-control form-control-sm opt-icon" placeholder="icon token (ex: triangle)" value="${opt.icon||''}"/></div>
        <div class="col-7"><input class="form-control form-control-sm opt-text" placeholder="texte (facultatif)" value="${opt.text||''}"/></div>
      `;
      root.appendChild(row);
    });
  }

  function preview(){
    const q = readForm();
    const mediaHtml = (window.IQRender && window.IQRender.renderMedia) ? window.IQRender.renderMedia(q.media) : '';
    $('#mediaPreview').innerHTML = mediaHtml;
    const optHtml = q.options.map(o => `
      <div class="col-6">
        <div class="d-flex align-items-center gap-2 p-2 rounded-3" style="background:#0b1220;border:1px solid #1f2937;">
          <div>${(window.IQRender && window.IQRender.renderIcon) ? window.IQRender.renderIcon(o.icon) : ''}</div>
          <div class="small text-secondary">${o.text||''}</div>
          ${o.isCorrect?'<span class="badge bg-success-subtle text-success-emphasis ms-auto">correct</span>':''}
        </div>
      </div>`).join('');
    $('#optionsPreview').innerHTML = optHtml;
    $('#jsonOut').value = JSON.stringify(q, null, 2);
  }

  // Init
  renderOptionsEditor(defaultOptions());
  preview();

  // Events
  ['theme','prompt','mediaType','variant','values'].forEach(id => {
    $('#'+id).addEventListener('input', preview);
    $('#'+id).addEventListener('change', preview);
  });
  $('#options').addEventListener('input', preview);
  $('#options').addEventListener('change', preview);
  $('#resetOptions').addEventListener('click', () => { renderOptionsEditor(defaultOptions()); preview(); });
  $('#exportJson').addEventListener('click', () => { navigator.clipboard.writeText($('#jsonOut').value).then(()=>{ alert('Copié dans le presse-papiers'); }); });
})();


