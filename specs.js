/* Specs Mode 界面：需求数据维护于 requirements.js，本文件负责界面绑定。 */
(() => {
  const requirements = Array.isArray(window.CASINO_REQUIREMENTS) ? window.CASINO_REQUIREMENTS : [];
  if (!requirements.length) return;

  const byId = new Map(requirements.map((item, index) => [item.id, { ...item, index }]));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let specsEnabled = false;
  let selectedId = null;
  let listOpen = false;
  const statusLabel = status => ({ Confirmed:'已确认', 'To Confirm':'待确认', Draft:'草稿', Deprecated:'已废弃' }[status] || status || '待确认');

  const host = document.createElement('section');
  host.className = 'specs-layer';
  host.innerHTML = `
    <div class="specs-mode-switch" aria-label="原型与需求模式切换">
      <button type="button" data-spec-action="prototype" class="is-active">原型</button>
      <button type="button" data-spec-action="specs">需求</button>
      <button type="button" data-spec-action="list" class="specs-list-trigger" hidden>需求列表</button>
    </div>
    <div class="specs-scrim" data-spec-action="close" hidden></div>
    <aside class="specs-panel" aria-label="需求详情" aria-hidden="true"></aside>
  `;
  document.body.appendChild(host);

  const modeButtons = [...host.querySelectorAll('[data-spec-action="prototype"], [data-spec-action="specs"]')];
  const listTrigger = host.querySelector('.specs-list-trigger');
  const scrim = host.querySelector('.specs-scrim');
  const panel = host.querySelector('.specs-panel');

  const markerLabel = requirement => circled[requirement.index] || String(requirement.index + 1);
  const requirementIds = element => (element?.dataset.requirement || '').split(/\s+/).filter(Boolean).filter(id => byId.has(id));
  const updateUrl = id => {
    const url = new URL(window.location.href);
    if (id) url.searchParams.set('spec', id); else url.searchParams.delete('spec');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  };
  const setModeButtons = () => {
    modeButtons.forEach(button => button.classList.toggle('is-active', button.dataset.specAction === (specsEnabled ? 'specs' : 'prototype')));
    listTrigger.hidden = !specsEnabled;
  };
  const clearHighlight = () => document.querySelectorAll('.specs-highlight').forEach(element => element.classList.remove('specs-highlight'));
  const closePanel = () => {
    selectedId = null;
    listOpen = false;
    clearHighlight();
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    scrim.hidden = true;
    updateUrl(null);
  };
  const renderField = (label, value, list = false) => {
    const values = Array.isArray(value) ? value.filter(Boolean) : value ? [value] : [];
    if (!values.length) return '';
    return `<section class="specs-field"><h3>${escape(label)}</h3>${list ? `<ul>${values.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : `<p>${escape(values.join(' '))}</p>`}</section>`;
  };
  const renderRequirement = requirement => {
    listOpen = false;
    panel.innerHTML = `
      <header class="specs-panel-head"><div><span class="specs-kicker">需求 ID</span><strong>${escape(requirement.id)}</strong></div><button type="button" data-spec-action="close" aria-label="关闭需求">×</button></header>
      <div class="specs-panel-scroll">
        <div class="specs-title-row"><div><span class="specs-name-label">需求名称</span><h2>${escape(requirement.title)}</h2></div><span class="specs-status ${requirement.status === 'Confirmed' ? 'is-confirmed' : ''}">${escape(statusLabel(requirement.status))}</span></div>
        <dl class="specs-meta"><div><dt>模块</dt><dd>${escape(requirement.module || 'Casino')}</dd></div><div><dt>页面</dt><dd>${escape(requirement.page || '待确认')}</dd></div><div><dt>关联元素</dt><dd>${escape(requirement.element || '待确认')}</dd></div><div><dt>版本</dt><dd>${escape(requirement.version || '待确认')}</dd></div></dl>
        ${renderField('需求说明', requirement.description)}
        ${renderField('交互规则', requirement.interactionRules, true)}
        ${renderField('业务规则', requirement.businessRules, true)}
        ${renderField('异常 / 边界场景', requirement.edgeCases, true)}
        ${renderField('后台配置', requirement.backendConfig, true)}
        ${renderField('UI 说明', requirement.uiNotes, true)}
        ${renderField('验收标准', requirement.acceptanceCriteria, true)}
      </div>`;
  };
  const renderList = query => {
    const term = String(query || '').trim().toLowerCase();
    const visible = requirements.filter(item => !term || `${item.id} ${item.title}`.toLowerCase().includes(term));
    listOpen = true;
    panel.innerHTML = `
      <header class="specs-panel-head"><div><span class="specs-kicker">CASINO 2.0</span><strong>需求列表</strong></div><button type="button" data-spec-action="close" aria-label="关闭需求列表">×</button></header>
      <div class="specs-panel-scroll specs-list-view">
        <label class="specs-list-search"><span aria-hidden="true">⌕</span><input id="specsRequirementSearch" type="search" autocomplete="off" placeholder="搜索需求 ID 或名称" value="${escape(query || '')}" /></label>
        <p class="specs-list-count">${visible.length} 条需求</p>
        <div class="specs-list-items">${visible.map(item => `<button type="button" data-spec-open="${escape(item.id)}"><span>${escape(item.id)}</span><strong>${escape(item.title)}</strong><small>${escape(item.page)} · ${escape(statusLabel(item.status))}</small></button>`).join('') || '<div class="specs-list-empty">未找到匹配需求。</div>'}</div>
      </div>`;
  };
  const openPanel = () => {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    if (window.matchMedia('(max-width: 719px)').matches) scrim.hidden = false;
  };
  const focusRequirement = requirement => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      applyBindings();
      clearHighlight();
      const target = [...document.querySelectorAll(`[data-requirement~="${CSS.escape(requirement.id)}"]`)].find(element => element.offsetParent !== null);
      if (!target) return;
      target.classList.add('specs-highlight');
      target.scrollIntoView({ block:'center', inline:'nearest', behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }));
  };
  const openRequirement = (id, navigate = true) => {
    const requirement = byId.get(id);
    if (!requirement) return;
    if (!specsEnabled) setSpecsMode(true, true);
    selectedId = id;
    listOpen = false;
    renderRequirement(requirement);
    openPanel();
    updateUrl(id);
    if (navigate && requirement.route && Object.keys(requirement.route).length && window.WillBetSpecsAPI?.navigate) window.WillBetSpecsAPI.navigate(requirement.route);
    focusRequirement(requirement);
  };
  const setSpecsMode = (enabled, preservePanel = false) => {
    specsEnabled = enabled;
    document.body.classList.toggle('is-specs-mode', enabled);
    setModeButtons();
    applyBindings();
    if (!enabled) closePanel();
    else if (!preservePanel) { clearHighlight(); panel.classList.remove('is-open'); panel.setAttribute('aria-hidden', 'true'); scrim.hidden = true; }
  };
  const appendRequirement = (element, id) => {
    if (!element || !byId.has(id)) return;
    const ids = requirementIds(element);
    if (!ids.includes(id)) element.dataset.requirement = [...ids, id].join(' ');
  };
  const applyBindings = () => {
    requirements.forEach(requirement => (requirement.selectors || []).forEach(selector => {
      try { document.querySelectorAll(selector).forEach(element => appendRequirement(element, requirement.id)); } catch (_) { /* A missing optional selector must not affect the prototype. */ }
    }));
    document.querySelectorAll('.requirement-marker').forEach(marker => marker.remove());
    if (!specsEnabled) return;
    document.querySelectorAll('[data-requirement]').forEach(target => {
      const primaryId = requirementIds(target)[0];
      const requirement = byId.get(primaryId);
      if (!requirement || target.closest('.specs-layer')) return;
      target.classList.add('specs-annotated');
      const marker = document.createElement('span');
      marker.className = 'requirement-marker';
      marker.dataset.specOpen = primaryId;
      marker.setAttribute('role', 'button');
      marker.setAttribute('tabindex', '0');
      marker.setAttribute('aria-label', `打开 ${requirement.id}：${requirement.title}`);
      marker.textContent = markerLabel(requirement);
      target.appendChild(marker);
    });
  };

  host.addEventListener('click', event => {
    const action = event.target.closest('[data-spec-action]')?.dataset.specAction;
    if (action === 'prototype') { setSpecsMode(false); return; }
    if (action === 'specs') { setSpecsMode(true); return; }
    if (action === 'list') { renderList(''); openPanel(); return; }
    if (action === 'close') { closePanel(); return; }
    const trigger = event.target.closest('[data-spec-open]');
    if (trigger) openRequirement(trigger.dataset.specOpen);
  });
  host.addEventListener('input', event => {
    if (event.target.id !== 'specsRequirementSearch') return;
    const value=event.target.value; renderList(value);
    const input=panel.querySelector('#specsRequirementSearch'); if(input){ input.focus(); input.setSelectionRange(value.length,value.length); }
  });
  host.addEventListener('keydown', event => {
    const marker = event.target.closest('.requirement-marker');
    if (marker && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openRequirement(marker.dataset.specOpen, false); }
  });
  document.addEventListener('click', event => {
    if (!specsEnabled) return;
    const marker = event.target.closest('.requirement-marker');
    if (marker) { event.preventDefault(); event.stopImmediatePropagation(); openRequirement(marker.dataset.specOpen, false); return; }
    const annotated = event.target.closest('[data-requirement]');
    if (annotated && !annotated.closest('.specs-layer')) {
      const id = requirementIds(annotated)[0];
      if (id) { event.preventDefault(); event.stopImmediatePropagation(); openRequirement(id, false); }
    }
  }, true);
  window.addEventListener('willbet:render', () => {
    applyBindings();
    if (selectedId) {
      const requirement = byId.get(selectedId);
      if (requirement) focusRequirement(requirement);
    }
  });
  window.addEventListener('keydown', event => { if (event.key === 'Escape' && specsEnabled) closePanel(); });

  window.WillBetSpecs = { enable: () => setSpecsMode(true), disable: () => setSpecsMode(false), open: id => openRequirement(id), list: () => { setSpecsMode(true); renderList(''); openPanel(); } };
  applyBindings();
  const deepLinkId = new URLSearchParams(window.location.search).get('spec');
  if (deepLinkId && byId.has(deepLinkId)) setTimeout(() => openRequirement(deepLinkId), 0);
})();
