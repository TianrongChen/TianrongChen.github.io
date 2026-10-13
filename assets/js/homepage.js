/* Progressive enhancement: the complete bibliography is readable without JavaScript. */
(() => {
  const controls = document.querySelector('.publication-controls');
  const papers = [...document.querySelectorAll('.paper')];
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const search = document.querySelector('#publication-search');
  const count = document.querySelector('#publication-count');
  const empty = document.querySelector('.empty-state');
  const showAll = document.querySelector('.show-all');
  let filter = 'selected';
  const normalized = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const searchable = papers.map(paper => normalized(paper.textContent));
  function render() {
    const query = normalized(search.value.trim());
    let visible = 0;
    papers.forEach((paper, index) => {
      const inCategory = filter === 'all' || (filter === 'selected' ? paper.dataset.selected === 'true' : paper.dataset.category === filter);
      const matches = inCategory && searchable[index].includes(query);
      paper.hidden = !matches;
      if (matches) visible++;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    count.textContent = `${visible} of ${papers.length} publications${filter === 'selected' ? ' · Selected work' : ''} · * Equal contribution`;
    empty.hidden = visible !== 0;
    showAll.hidden = filter === 'all' || Boolean(query);
  }
  function select(value) {
    filter = value;
    search.value = '';
    render();
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.filter)));
  document.querySelectorAll('[data-topic]').forEach(link => link.addEventListener('click', () => select(link.dataset.topic)));
  search.addEventListener('input', () => {
    // Search starts with the entire bibliography, including work outside the selection.
    if (filter === 'selected' && search.value.trim()) filter = 'all';
    render();
  });
  showAll.addEventListener('click', () => {
    select('all');
    buttons.find(button => button.dataset.filter === 'all').focus({ preventScroll: true });
    document.querySelector('#publications').scrollIntoView({ behavior: 'instant' });
  });
  controls.hidden = false;
  document.querySelector('.total-count').textContent = papers.length;
  render();
})();
