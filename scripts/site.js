(() => {
  const korean = document.documentElement.lang === 'ko';
  const labels = korean ? {
    minimum: '최소 총 이동 시간',
    infeasible: '조건을 만족하는 배정이 없습니다',
    visit: number => `방문 ${number}`,
    team: name => `팀 ${name}`,
    covered: count => `방문 ${count}건 모두 배정 · 중복 배정 없음`,
    shortage: (available, required) => `같은 시간대의 방문 ${required}건에 ${available}개 팀을 사용할 수 있습니다. 가용 팀을 추가하거나 조건을 조정해야 합니다.`,
  } : {
    minimum: 'Minimum total travel',
    infeasible: 'No feasible assignment',
    visit: number => `Visit ${number}`,
    team: name => `Team ${name}`,
    covered: count => `${count} visits covered · No team assigned twice`,
    shortage: (available, required) => `${available} teams available for ${required} simultaneous visits. Add availability or revise the requirements.`,
  };
  const rows = [...document.querySelectorAll('[data-team]')];
  const teams = rows.map(row => ({
    name: row.dataset.team,
    costs: [...row.querySelectorAll('[data-cost]')].map(cell => Number(cell.dataset.cost)),
    input: row.querySelector('[data-team-input]'),
    row,
  }));
  const visitCount = teams[0].costs.length;

  // This small example enumerates every feasible assignment exactly.
  function solve(availableTeams) {
    let best = null;
    function search(assignment, cost) {
      const visit = assignment.length;
      if (visit === visitCount) {
        if (!best || cost < best.cost) best = { assignment: [...assignment], cost };
        return;
      }
      for (const team of availableTeams) {
        if (assignment.includes(team)) continue;
        assignment.push(team);
        search(assignment, cost + team.costs[visit]);
        assignment.pop();
      }
    }
    search([], 0);
    return best;
  }

  function updatePlan() {
    const available = teams.filter(team => team.input.checked);
    const plan = solve(available);
    for (const team of teams) {
      team.row.classList.toggle('unavailable', !team.input.checked);
      [...team.row.querySelectorAll('[data-cost]')].forEach((cell, visit) => {
        cell.classList.toggle('chosen', plan?.assignment[visit] === team);
      });
    }
    document.getElementById('result-label').textContent = plan ? labels.minimum : labels.infeasible;
    document.getElementById('total-cost').textContent = plan ? String(plan.cost) : '—';
    document.getElementById('cost-unit').hidden = !plan;
    const assignmentList = document.getElementById('assignments');
    assignmentList.replaceChildren();
    if (plan) {
      plan.assignment.forEach((team, visit) => {
        const item = document.createElement('div');
        item.className = 'assignment';
        const label = document.createElement('span');
        label.textContent = labels.visit(visit + 1);
        item.append(label, labels.team(team.name));
        assignmentList.append(item);
      });
    }
    assignmentList.hidden = !plan;
    document.getElementById('result-note').textContent = plan
      ? labels.covered(visitCount)
      : labels.shortage(available.length, visitCount);
  }

  const baseline = solve(teams);
  const changedTeams = teams.filter(team => team.name !== 'C');
  const replanned = solve(changedTeams);
  for (const [prefix, plan] of [['baseline', baseline], ['replan', replanned]]) {
    document.getElementById(`${prefix}-cost`).textContent = String(plan.cost);
    const allocation = document.getElementById(`${prefix}-allocation`);
    allocation.replaceChildren();
    plan.assignment.forEach((team, visit) => {
      if (visit) allocation.append(document.createElement('br'));
      allocation.append(`${labels.visit(visit + 1)} → ${labels.team(team.name)}`);
    });
  }
  document.getElementById('coverage-check').textContent = `${replanned.assignment.length} / ${visitCount}`;
  document.getElementById('duplicate-check').textContent = String(replanned.assignment.length - new Set(replanned.assignment).size);
  document.getElementById('unavailable-check').textContent = String(replanned.assignment.filter(team => !changedTeams.includes(team)).length);
  for (const team of teams) {
    team.input.disabled = false;
    team.input.addEventListener('change', updatePlan);
  }
  updatePlan();

  const links = [...document.querySelectorAll('[data-slide-link]')];
  const slides = [...document.querySelectorAll('main > .slide')];
  let scheduled = false;
  function updateNavigation() {
    const anchor = window.innerHeight * .42;
    let active = slides[0];
    for (const slide of slides) {
      if (slide.getBoundingClientRect().top <= anchor) active = slide;
    }
    for (const link of links) {
      if (link.dataset.slideLink === active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    for (const link of document.querySelectorAll('[data-language-href]')) {
      link.href = `${link.dataset.languageHref}#${active.id}`;
    }
    scheduled = false;
  }
  function scheduleNavigation() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  }
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  updateNavigation();
})();
