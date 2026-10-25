(() => {
  const explorer = document.querySelector('.decision-explorer');
  if (!explorer) return;
  const points = JSON.parse(document.getElementById('decision-data').textContent);
  const slider = document.getElementById('cost-weight');
  const output = document.getElementById('weight-value');
  const result = document.getElementById('weight-result');
  const line = document.getElementById('weight-line');
  const ko = explorer.dataset.lang === 'ko';
  const xMin = Number(explorer.dataset.xMin);
  const xMax = Number(explorer.dataset.xMax);
  const yMax = Number(explorer.dataset.yMax);

  function update() {
    const weight = Number(slider.value);
    const alpha = weight / 100;
    // 공통 denominator 4000을 사용해 동점을 integer arithmetic으로 비교한다.
    const score = p => 4 * weight * p.cost + 5 * (100 - weight) * p.spread;
    const minimum = Math.min(...points.map(score));
    const winners = points.filter(p => score(p) === minimum);
    const selected = new Set(winners.map(p => `${p.cost},${p.spread}`));
    for (const ring of explorer.querySelectorAll('[data-selection]')) {
      ring.toggleAttribute('hidden', !selected.has(ring.dataset.selection));
    }
    const y = cost => 288 - (8 * (minimum / 4000 - alpha * cost / 10) / (1 - alpha)) / yMax * 252;
    line.setAttribute('y1', y(xMin));
    line.setAttribute('y2', y(xMax));
    output.value = alpha.toFixed(2);
    slider.setAttribute('aria-valuetext', `${ko ? '비용 비중' : 'Cost weight'} ${alpha.toFixed(2)}`);
    const pairs = winners.map(p => `(${p.cost}, ${p.spread})`).join(', ');
    result.textContent = ko
      ? `α = ${alpha.toFixed(2)} · 선택된 (비용, 부하 차이): ${pairs} · 최소 Jα = ${(minimum / 4000).toFixed(4)}`
      : `α = ${alpha.toFixed(2)} · Selected (cost, spread): ${pairs} · Minimum Jα = ${(minimum / 4000).toFixed(4)}`;
  }

  slider.addEventListener('input', update);
  update();
  explorer.querySelector('.weight-controls').hidden = false;
})();
