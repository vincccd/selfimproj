const API = {
  async get() { try { const r = await fetch('/api/data'); return await r.json(); } catch { return {}; } },
  async post(data) { try { await fetch('/api/data', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }); } catch {} }
};

let savedData = {};
let isLoading = true;

const loadingOverlay = document.querySelector('.loading-overlay');
const container = document.querySelector('.categories-container');
const catScreen = document.querySelector('.category-screen');
const fitnessScreen = document.querySelector('.fitness-screen');
const dashboardScreen = document.querySelector('.dashboard-screen');

// ===== RIPPLE EFFECT =====
function createRipple(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = (e.clientX ?? e.touches?.[0]?.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2;
  const y = (e.clientY ?? e.touches?.[0]?.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.tab-bar button').forEach(el => {
  el.addEventListener('click', createRipple);
});

// ===== PAGE TRANSITIONS =====
let transitionActive = false;

function transitionTo(hideScreen, showScreen, direction) {
  if (transitionActive) return;
  if (!showScreen || showScreen.style.display !== 'none') return;
  transitionActive = true;

  hideScreen.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  hideScreen.style.transform = direction === 'left' ? 'translateX(-30px)' : 'translateX(30px)';
  hideScreen.style.opacity = '0';

  setTimeout(() => {
    hideScreen.style.display = 'none';
    hideScreen.style.transform = '';
    hideScreen.style.opacity = '';

    showScreen.style.display = 'block';
    showScreen.style.transform = direction === 'left' ? 'translateX(30px)' : 'translateX(-30px)';
    showScreen.style.opacity = '0';

    requestAnimationFrame(() => {
      showScreen.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease';
      showScreen.style.transform = 'translateX(0)';
      showScreen.style.opacity = '1';

      setTimeout(() => {
        showScreen.style.transform = '';
        showScreen.style.opacity = '';
        showScreen.style.transition = '';
        transitionActive = false;
      }, 400);
    });
  }, 300);
}

// ===== SCROLL FADE =====
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

function observeScrollElements(parent) {
  parent.querySelectorAll('.scroll-fade:not(.observed)').forEach(el => {
    el.classList.add('observed');
    scrollObserver.observe(el);
  });
}

// ===== CATEGORIES =====
const categories = [
  { name: 'Math', icon: '<text x="12" y="18" font-family="serif" font-size="22" font-weight="bold" fill="none" stroke="currentColor" stroke-width="1.5" text-anchor="middle">&#x03C0;</text>' },
  { name: 'Science', icon: '<ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2" fill="currentColor"/>' },
  { name: 'Engineering', icon: '<path d="M12 22 L12 12 M8 12 C8 8 10 6 12 6 C14 6 16 8 16 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' },
  { name: 'History', icon: '<rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 10 H19" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 10 V15 L14 17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' },
  { name: 'Language', icon: '<rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8 H15 M9 11 H13 M9 14 H15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 17 V20" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 20 H15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' },
  { name: 'AI', icon: '<rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="9" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="9" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="15" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="15" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M11 9 L13 9 M9 11 V13 M15 11 V13 M11 15 L13 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' },
  { name: 'Biology', icon: '<path d="M12 3 C8 7 8 11 12 12 C16 13 16 17 12 21" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3 C16 7 16 11 12 12 C8 13 8 17 12 21" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 6 C7 6 9 9 12 9 C15 9 17 6 20 6" fill="none" stroke="currentColor" stroke-width="1"/><path d="M4 18 C7 18 9 15 12 15 C15 15 17 18 20 18" fill="none" stroke="currentColor" stroke-width="1"/>' },
  { name: 'Governance', icon: '<path d="M12 2 L3 9 V12 H21 V9 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M7 12 V18" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 12 V18" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 12 V18" fill="none" stroke="currentColor" stroke-width="2"/>' },
  { name: 'Coding', icon: '<path d="M8 8 L4 12 L8 16 M16 8 L20 12 L16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' },
  { name: 'Chemistry', icon: '<path d="M9 4 H15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 4 V14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 14 C7 11 17 11 17 14 L15 19 C15 21 9 21 9 19 Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="16" r="1" fill="currentColor"/><circle cx="14" cy="16" r="1" fill="currentColor"/>' }
];

const welcome = document.createElement('div');
welcome.className = 'welcome-text';
welcome.textContent = 'What do you want to learn?';
container.appendChild(welcome);

let activeScreen = null;
let categoriesFragment = null;

categories.forEach(cat => {
  const div = document.createElement('div');
  div.className = 'category-item';
  div.innerHTML = `<svg class="category-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${cat.icon}</svg><span>${cat.name}</span>`;
  div.addEventListener('click', (e) => {
    createRipple(e);
    document.querySelectorAll('.category-item').forEach(el => {
      if (el !== div) {
        el.getAnimations().forEach(a => a.cancel());
        el.style.cssText = '';
        el.classList.add('hiding');
      }
    });
    const rect = div.getBoundingClientRect();
    const cx = window.innerWidth / 2 - rect.width / 2;
    const cy = window.innerHeight / 2 - rect.height / 2;
    const dx = cx - rect.left;
    const dy = cy - rect.top;
    div.animate([
      { transform: 'none', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(1.35)`, opacity: 0 }
    ], { duration: 700, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' });

    setTimeout(() => {
      container.classList.remove('visible');
      container.style.display = 'none';

      const key = 'cat_' + cat.name.toLowerCase();
      const val = savedData[key] ?? Math.floor(Math.random() * 100);
      savedData[key] = val;
      API.post(savedData);

      catScreen.innerHTML = `
        <div class="top-row">
          <button class="back-btn"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 18 L9 12 L15 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <div class="name">${cat.name}</div>
        </div>
        <div class="scroll-wrap">
          <div class="car-gauge">
            ${gaugeSVG(val, 'cg')}
          </div>
          <div class="spacer"></div>
        </div>`;
      catScreen.style.display = 'block';
      catScreen.classList.add('visible');

      requestAnimationFrame(() => {
        const needle = catScreen.querySelector('.needle');
        const valText = catScreen.querySelector('.value-text');
        if (needle) {
          const a = -90 + val * 1.8;
          needle.animate([
            { transform: 'rotate(-90deg)' },
            { transform: `rotate(${a}deg)` }
          ], { duration: 1200, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
        }
        if (valText) { valText.classList.remove('pulse'); void valText.offsetWidth; valText.classList.add('pulse'); }
      });

      const onScroll = () => {
        const topRow = catScreen.querySelector('.top-row');
        if (!topRow) return;
        const scrollY = catScreen.scrollTop;
        topRow.classList.toggle('scrolled', scrollY > 20);
      };
      catScreen.addEventListener('scroll', onScroll);

      catScreen.querySelector('.back-btn').addEventListener('click', () => {
        catScreen.removeEventListener('scroll', onScroll);
        const tr = catScreen.querySelector('.top-row');
        if (tr) tr.classList.remove('scrolled');
        catScreen.classList.remove('visible');
        catScreen.style.display = 'none';
        container.style.display = '';
        container.classList.add('visible');
        document.querySelectorAll('.category-item').forEach(el => {
          el.getAnimations().forEach(anim => anim.cancel());
          el.style.cssText = '';
          el.classList.remove('hiding');
        });
      });
    }, 750);
  });
  container.appendChild(div);
});

// ===== SHARED GAUGE SVG =====
function gaugeSVG(val, id) {
  const angle = -90 + val * 1.8;
  const r = 100, gcx = 140, gcy = 140;
  const p = (deg) => `${gcx + r * Math.cos(deg * Math.PI / 180)},${gcy + r * Math.sin(deg * Math.PI / 180)}`;
  const arcLength = Math.PI * r;
  const offset = arcLength * (1 - val / 100);
  const color = val < 40 ? '#ef4444' : val < 70 ? '#f59e0b' : '#22c55e';

  let ticks = '';
  for (let v = 0; v <= 100; v += 25) {
    const a = 180 + v * 1.8, rad = a * Math.PI / 180;
    const tx = gcx + (r - 28) * Math.cos(rad), ty = gcy + (r - 28) * Math.sin(rad);
    const dotX = gcx + (r + 4) * Math.cos(rad), dotY = gcy + (r + 4) * Math.sin(rad);
    ticks += `<circle cx="${dotX}" cy="${dotY}" r="3" fill="rgba(255,255,255,${v === 0 || v === 100 ? 0.4 : 0.2})"/>
              <text x="${tx}" y="${ty + 4}" fill="rgba(255,255,255,0.35)" font-family="'SF Mono',monospace" font-size="11" text-anchor="middle" font-weight="500">${v}</text>`;
  }

  return `<svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" class="gauge-svg">
    <defs>
      <linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ef4444"/>
        <stop offset="50%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#22c55e"/>
      </linearGradient>
    </defs>
    <path d="M ${p(180)} A ${r} ${r} 0 0 1 ${p(0)}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="14" stroke-linecap="round"/>
    <path d="M ${p(180)} A ${r} ${r} 0 0 1 ${p(0)}" fill="none" stroke="url(#g-${id})" stroke-width="14" stroke-linecap="round" stroke-dasharray="${arcLength}" stroke-dashoffset="${offset}" class="gauge-arc"/>
    ${ticks}
    <circle cx="40" cy="140" r="4" fill="rgba(255,255,255,0.1)"/>
    <circle cx="240" cy="140" r="4" fill="${color}" opacity="0.4"/>
    <g class="needle" style="transform-origin: ${gcx}px ${gcy}px;">
      <polygon points="${gcx},${gcy} ${gcx - 3},${gcy - 55} ${gcx},${gcy - 70} ${gcx + 3},${gcy - 55}" fill="#ffffff"/>
      <circle cx="${gcx}" cy="${gcy}" r="5" fill="#ffffff"/>
    </g>
    <text x="${gcx}" y="${gcy + 60}" class="value-text" fill="${color}" font-size="30" font-weight="700" font-family="'SF Mono',monospace" letter-spacing="-0.5">${val}</text>
  </svg>`;
}

// ===== FITNESS =====
let fitnessVal = 42;
let currentStrengthMetric = 'volume';
let selectedExercise = '';
const APP_VERSION = '1.0.22';
const strengthMetrics = [
  { key: 'volume', label: 'Volume', color: '#8b5cf6' },
  { key: 'tonnage', label: 'Tonnage', color: '#3b82f6' },
  { key: 'maxWeight', label: 'Max Weight', color: '#22c55e' },
  { key: 'max1RM', label: 'Est. 1RM', color: '#f59e0b' },
  { key: 'exercisesDone', label: 'Exercises', color: '#ef4444' },
];

const bodyweightExercises = new Set(['Full Leg Raise','Hollow Hold','Dragon Planche','Leg Push','Knee Raise','Pull Up','Negative Muscle Up','Assisted High Pull Up','Assisted Front Lever','Horsekick','5K Run','Intervals','Hill Sprints','Cool Down']);
const workoutMap = {1:'Chest,Bicep',5:'Chest,Bicep',2:'Shoulder,Abs',6:'Shoulder,Abs',3:'Tricep,Back',0:'Tricep,Back',4:'Run'};
const exercises = {
  Chest:['Incline Dumbbell Press','Flat Bench Press','Dumbbell Flies','Pullover'],
  Bicep:['Preacher Curl','Hammer Curl','Sitting Barbell Curl'],
  Shoulder:['Overhead Press','Lateral Raise','Front Raise'],
  Abs:['Full Leg Raise','Hollow Hold','Dragon Planche','Leg Push','Knee Raise'],
  Back:['Assisted Front Lever','Pull Up','Negative Muscle Up','Assisted High Pull Up'],
  Tricep:['Overhead Tricep Extension','Horsekick','Skull Crusher'],
  Run:['5K Run','Intervals','Hill Sprints','Cool Down']
};

function getTodayExercises() {
  const today = new Date().getDay();
  const list = [];
  (workoutMap[today] || '').split(',').forEach(m => (exercises[m] || []).forEach(ex => list.push(ex)));
  return list;
}

function getStrengthData(days) {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0,10);
    const dayLog = (savedData.fitnessLog || {})[dateStr];
    let volume = 0, tonnage = 0, maxWeight = 0, max1RM = 0, exercisesDone = 0;
    if (dayLog) {
      Object.values(dayLog).forEach(entry => {
        if (entry && typeof entry === 'object') {
          const w = entry.weight || 0, s = entry.sets || 0, r = entry.reps || 0;
          volume += w * s * r;
          tonnage += w * r;
          if (w > maxWeight) maxWeight = w;
          if (w > 0 && r > 0) { const rm = Math.round(w * (1 + r / 30)); if (rm > max1RM) max1RM = rm; }
          if (entry.done) exercisesDone++;
        }
      });
    }
    data.push({ date: dateStr, volume, tonnage, maxWeight, max1RM, exercisesDone, label: `${d.getMonth()+1}/${d.getDate()}` });
  }
  return data;
}

function getExerciseData(exName, days) {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0,10);
    const entry = (savedData.fitnessLog || {})[dateStr]?.[exName];
    if (entry && typeof entry === 'object') {
      const w = entry.weight || 0, s = entry.sets || 0, r = entry.reps || 0;
      data.push({ date: dateStr, volume: w * s * r, tonnage: w * r, maxWeight: w, max1RM: w > 0 && r > 0 ? Math.round(w * (1 + r / 30)) : 0, exercisesDone: entry.done ? 1 : 0, label: `${d.getMonth()+1}/${d.getDate()}` });
    } else {
      data.push({ date: dateStr, volume: 0, tonnage: 0, maxWeight: 0, max1RM: 0, exercisesDone: 0, label: `${d.getMonth()+1}/${d.getDate()}` });
    }
  }
  return data;
}

function getAllTrackedExercises() {
  const set = new Set();
  const log = savedData.fitnessLog || {};
  Object.values(log).forEach(day => Object.keys(day).forEach(ex => set.add(ex)));
  return Array.from(set).sort();
}

function strengthChartSVG(data) {
  const chartData = selectedExercise ? getExerciseData(selectedExercise, 14) : data;
  if (chartData.length < 2) return '';
  const metric = currentStrengthMetric;
  const m = strengthMetrics.find(mm => mm.key === metric) || strengthMetrics[0];
  const values = chartData.map(d => d[metric] ?? 0);
  const maxV = Math.max(...values, 1);
  const W = 600, H = 200, PL = 44, PR = 16, PT = 16, PB = 36;
  const cw = W - PL - PR, ch = H - PT - PB;
  const yTicks = 3;
  let extras = '';
  for (let i = 0; i <= yTicks; i++) {
    const y = PT + ch - (ch * i / yTicks);
    const v = Math.round(maxV * i / yTicks);
    extras += `<line x1="${PL}" y1="${y}" x2="${W - PR}" y2="${y}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><text x="${PL - 8}" y="${y + 4}" fill="rgba(255,255,255,0.25)" font-family="'SF Mono',monospace" font-size="10" text-anchor="end">${v}</text>`;
  }
  const points = chartData.map((d, i) => {
    const x = PL + cw * i / (chartData.length - 1);
    const y = PT + ch - ch * (d[metric] ?? 0) / maxV;
    return { x, y };
  });
  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) linePath += ` L ${points[i].x} ${points[i].y}`;
  const areaPath = linePath + ` L ${points[points.length - 1].x} ${PT + ch} L ${points[0].x} ${PT + ch} Z`;
  const step = Math.max(1, Math.floor(chartData.length / 7));
  let labels = '';
  chartData.forEach((d, i) => {
    if (i % step !== 0 && i !== chartData.length - 1) return;
    labels += `<text x="${points[i].x}" y="${H - PB + 16}" fill="rgba(255,255,255,0.25)" font-family="'SF Mono',monospace" font-size="10" text-anchor="middle">${d.label}</text>`;
  });
  let dots = '';
  points.forEach((p, i) => {
    if ((chartData[i][metric] ?? 0) === 0) return;
    dots += `<circle cx="${p.x}" cy="${p.y}" r="3" fill="${m.color}" opacity="0.8"/>`;
  });
  let btns = '';
  strengthMetrics.forEach(sm => {
    const active = sm.key === metric;
    btns += `<button class="metric-btn${active ? ' active' : ''}" data-metric="${sm.key}" style="background:${active ? sm.color + '33' : 'rgba(255,255,255,0.04)'};border:1px solid ${active ? sm.color + '66' : 'rgba(255,255,255,0.08)'};color:${active ? sm.color : 'rgba(255,255,255,0.4)'};padding:4px 10px;border-radius:8px;font-size:12px;font-family:inherit;cursor:pointer;transition:all 0.2s ease;text-transform:uppercase;letter-spacing:0.3px;">${sm.label}</button>`;
  });
  const allExs = getAllTrackedExercises();
  if (!selectedExercise && allExs.length > 0) selectedExercise = allExs[0];
  let opts = '';
  allExs.forEach(ex => opts += `<option value="${ex}"${ex === selectedExercise ? ' selected' : ''}>${ex}</option>`);
  return `<div class="strength-board" style="margin-top:16px;width:100%;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:16px;box-sizing:border-box;">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
      <div style="display:flex;gap:4px;flex-wrap:wrap;">${btns}</div>
      <select class="ex-select">${opts}</select>
    </div>
    <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
      ${extras}
      <defs><linearGradient id="sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${m.color}" stop-opacity="0.25"/><stop offset="100%" stop-color="${m.color}" stop-opacity="0.01"/></linearGradient></defs>
      <path d="${areaPath}" fill="url(#sf)"/>
      <path d="${linePath}" fill="none" stroke="${m.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px ${m.color}66)"/>
      ${dots}
    </svg>
  </div>`;
}

function buildGaugeSVG(val, todayLog) {
  const today = new Date().getDay();
  const workout = workoutMap[today];
  const muscles = workout.split(',');
  let exList = '';
  let exIdx = 0;
  let doneCount = 0;
  muscles.forEach(m => {
    (exercises[m] || []).forEach(ex => {
      const entry = todayLog[ex];
      const data = entry && typeof entry === 'object' ? entry : { done: !!entry, weight: 0, sets: 0, reps: 0 };
      if (data.done) doneCount++;
      const bw = bodyweightExercises.has(ex);
      exList += `<div class="exercise-item${data.done ? ' completed' : ''}" data-exercise="${ex}" style="padding:20px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:32px;color:rgba(255,255,255,0.8);animation-delay:${exIdx * 0.08}s;">
        <span class="ex-check">${data.done ? '✓' : '○'}</span>
        <span class="ex-name hover-pop">${ex}</span>
        <span class="ex-stats">
          ${bw ? '' : `<input type="number" class="ex-stat" data-field="weight" value="${data.weight}" min="0" inputmode="numeric"><span class="ex-stat-label">kg</span> `}
          <input type="number" class="ex-stat" data-field="sets" value="${data.sets}" min="0" inputmode="numeric">
          <span class="ex-stat-label">×</span>
          <input type="number" class="ex-stat" data-field="reps" value="${data.reps}" min="0" inputmode="numeric">
        </span>
      </div>`;
      exIdx++;
    });
  });
  const totalExs = exIdx;
  const pct = totalExs > 0 ? Math.round((doneCount / totalExs) * 100) : 0;
  return `<div class="scroll-wrap">
    <div class="car-gauge">
      ${gaugeSVG(val, 'fg')}
    </div>
    <div style="display:flex;gap:12px;width:100%;margin:32px auto 0;padding:0 16px;box-sizing:border-box;">
      <div class="fitness-board-anim today-board" style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:24px;display:flex;flex-direction:column;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="hover-pop" style="font-size:56px;color:#fff;font-weight:600;">${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][today]}</span>
          <span class="hover-pop" style="font-size:28px;color:rgba(255,255,255,0.5);">${(new Date().getMonth()+1).toString().padStart(2,'0')}.${new Date().getDate().toString().padStart(2,'0')}</span>
        </div>
        <div class="hover-pop" style="margin-top:4px;font-size:28px;color:rgba(255,255,255,0.7);">${workout}</div>
        <div class="fitness-progress" style="margin-top:16px;padding:12px 0 4px;">
          <div class="fitness-progress-text" style="font-size:18px;color:rgba(255,255,255,0.6);margin-bottom:10px;">${doneCount} / ${totalExs} exercises</div>
          <div class="fitness-progress-bar" style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
            <div class="fitness-progress-fill" style="height:100%;width:${pct}%;background:linear-gradient(90deg,#3b82f6,#22c55e);border-radius:3px;transition:width 0.4s ease;"></div>
          </div>
        </div>
        <div class="fitness-ex-list" style="margin-top:8px;">${exList}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;flex:1;">
        <div class="fitness-board-anim streak-board" style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:16px;display:flex;flex-direction:column;animation-delay:0.05s;">
          <span style="font-size:48px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;text-align:left;">Streak</span>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);column-gap:3px;row-gap:3px;">${(() => {
            const days = [];
            const now = new Date();
            for (let i = 29; i >= 0; i--) {
              const d = new Date(now);
              d.setDate(d.getDate() - i);
              const dateStr = d.toISOString().slice(0,10);
              const intensity = (savedData.streakDays || []).includes(dateStr) ? 0.6 : 0;
              const opacity = 0.05 + intensity * 0.7;
              days.push(`<div class="streak-cell" style="aspect-ratio:1;max-height:65px;border-radius:6px;background:rgba(34,197,94,${opacity});display:flex;align-items:center;justify-content:center;font-size:20px;color:rgba(255,255,255,${0.3 + intensity * 0.5});font-weight:600;">${d.getDate()}</div>`);
            }
            return days.join('');
          })()}</div>
        </div>
        <div class="fitness-board-anim streak-board" style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;animation-delay:0.1s;overflow:hidden;position:relative;">
          <div style="font-size:48px;opacity:0.4;">📸</div>
          <span style="font-size:14px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;text-align:center;">Progress<br>Picture</span>
        </div>
      </div>
    </div>
    ${strengthChartSVG(getStrengthData(14))}
    <div style="height:80px;"></div>
  </div>`;
}

function updateFitnessUI(exName) {
  const todayStr = new Date().toISOString().slice(0,10);
  const log = (savedData.fitnessLog || {})[todayStr] || {};
  const item = exName ? fitnessScreen.querySelector(`[data-exercise="${exName}"]`) : null;
  if (item) {
    const entry = log[exName];
    const done = entry && (typeof entry === 'object' ? entry.done : !!entry);
    item.classList.toggle('completed', !!done);
    item.querySelector('.ex-check').textContent = done ? '✓' : '○';
  }
  const allExs = getTodayExercises();
  const done = allExs.filter(ex => { const e = log[ex]; return e && (typeof e === 'object' ? e.done : !!e); }).length;
  const total = allExs.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const progressText = fitnessScreen.querySelector('.fitness-progress-text');
  if (progressText) progressText.textContent = `${done} / ${total} exercises`;
  const progressFill = fitnessScreen.querySelector('.fitness-progress-fill');
  if (progressFill) progressFill.style.width = `${pct}%`;
  const valText = fitnessScreen.querySelector('.value-text');
  if (valText) {
    valText.textContent = fitnessVal;
    valText.style.fill = fitnessVal < 40 ? '#ef4444' : fitnessVal < 70 ? '#f59e0b' : '#22c55e';
    valText.classList.remove('pulse');
    void valText.offsetWidth;
    valText.classList.add('pulse');
  }
  const needle = fitnessScreen.querySelector('.needle');
  if (needle) {
    needle.getAnimations().forEach(a => a.cancel());
    needle.animate([
      { transform: `rotate(${-90 + (fitnessVal - 1) * 1.8}deg)` },
      { transform: `rotate(${-90 + fitnessVal * 1.8}deg)` }
    ], { duration: 800, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
  }
  const sb = fitnessScreen.querySelector('.strength-board');
  if (sb) {
    const h = strengthChartSVG(getStrengthData(14));
    if (h) sb.outerHTML = h;
  }
}

function showFitness() {
  const todayStr = new Date().toISOString().slice(0,10);
  const todayLog = (savedData.fitnessLog || {})[todayStr] || {};
  fitnessScreen.innerHTML = buildGaugeSVG(fitnessVal, todayLog);
  fitnessScreen.style.display = 'block';
  fitnessScreen.classList.add('visible');

  if (fitnessScreen._exHandler) fitnessScreen.removeEventListener('click', fitnessScreen._exHandler);
  fitnessScreen._exHandler = (e) => {
    const metricBtn = e.target.closest('[data-metric]');
    if (metricBtn) {
      const key = metricBtn.dataset.metric;
      if (key && key !== currentStrengthMetric) {
        currentStrengthMetric = key;
        const sb = fitnessScreen.querySelector('.strength-board');
        if (sb) { const h = strengthChartSVG(getStrengthData(14)); if (h) sb.outerHTML = h; }
      }
      return;
    }
    if (e.target.classList.contains('ex-stat') || e.target.closest('.ex-stats')) return;
    const item = e.target.closest('[data-exercise]');
    if (!item) return;
    const exName = item.dataset.exercise;
    if (!savedData.fitnessLog) savedData.fitnessLog = {};
    if (!savedData.fitnessLog[todayStr]) savedData.fitnessLog[todayStr] = {};
    const cur = savedData.fitnessLog[todayStr][exName];
    const entry = cur && typeof cur === 'object' ? cur : { done: !!cur, weight: 0, sets: 0, reps: 0 };
    entry.done = !entry.done;
    savedData.fitnessLog[todayStr][exName] = entry;
    const allExs = getTodayExercises();
    const log = savedData.fitnessLog[todayStr];
    const doneCount = allExs.filter(ex => { const e = log[ex]; return e && (typeof e === 'object' ? e.done : !!e); }).length;
    fitnessVal = allExs.length > 0 ? Math.round((doneCount / allExs.length) * 100) : fitnessVal;
    savedData.fitnessVal = fitnessVal;
    API.post(savedData);
    updateFitnessUI(exName);
  };
  fitnessScreen.addEventListener('click', fitnessScreen._exHandler);

  if (fitnessScreen._inHandler) fitnessScreen.removeEventListener('input', fitnessScreen._inHandler);
  fitnessScreen._inHandler = (e) => {
    const input = e.target;
    if (!input.classList.contains('ex-stat')) return;
    const item = input.closest('[data-exercise]');
    if (!item) return;
    const exName = item.dataset.exercise;
    const field = input.dataset.field;
    const val = parseFloat(input.value) || 0;
    if (!savedData.fitnessLog) savedData.fitnessLog = {};
    if (!savedData.fitnessLog[todayStr]) savedData.fitnessLog[todayStr] = {};
    const cur = savedData.fitnessLog[todayStr][exName];
    const entry = cur && typeof cur === 'object' ? cur : { done: !!cur, weight: 0, sets: 0, reps: 0 };
    entry[field] = val;
    savedData.fitnessLog[todayStr][exName] = entry;
    API.post(savedData);
    const sb = fitnessScreen.querySelector('.strength-board');
    if (sb) {
      const h = strengthChartSVG(getStrengthData(14));
      if (h) sb.outerHTML = h;
    }
  };
  fitnessScreen.addEventListener('input', fitnessScreen._inHandler);

  if (fitnessScreen._selHandler) fitnessScreen.removeEventListener('change', fitnessScreen._selHandler);
  fitnessScreen._selHandler = (e) => {
    const select = e.target.closest('.ex-select');
    if (!select) return;
    selectedExercise = select.value || '';
    const sb = fitnessScreen.querySelector('.strength-board');
    if (sb) { const h = strengthChartSVG(getStrengthData(14)); if (h) sb.outerHTML = h; }
  };
  fitnessScreen.addEventListener('change', fitnessScreen._selHandler);

  requestAnimationFrame(() => {
    const needle = fitnessScreen.querySelector('.needle');
    if (needle) {
      const a = -90 + fitnessVal * 1.8;
      needle.animate([
        { transform: 'rotate(-90deg)' },
        { transform: `rotate(${a}deg)` }
      ], { duration: 1200, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
    }
  });
  savedData.fitnessVal = fitnessVal;
  API.post(savedData);
}

// ===== DASHBOARD =====
function showDashboard() {
  const catKeys = Object.keys(savedData).filter(k => k.startsWith('cat_'));
  const activeCats = catKeys.filter(k => (savedData[k] ?? 0) > 0);
  const avgScore = catKeys.length > 0
    ? Math.round(catKeys.reduce((s, k) => s + (savedData[k] ?? 0), 0) / catKeys.length)
    : 0;
  const streakDays = savedData.streakDays || [];
  const streakCount = streakDays.length;

  let catTags = '';
  const catNames = { cat_math:'Math', cat_science:'Science', cat_engineering:'Engineering', cat_history:'History', cat_language:'Language', cat_ai:'AI', cat_biology:'Biology', cat_governance:'Governance', cat_coding:'Coding', cat_chemistry:'Chemistry' };
  activeCats.forEach((k, i) => {
    const name = catNames[k] || k.replace('cat_', '');
    const score = savedData[k];
    catTags += `<div class="dashboard-cat-tag" style="animation-delay:${i * 0.05}s">${name} <span style="color:rgba(255,255,255,0.3);margin-left:4px;font-size:12px">${score}%</span></div>`;
  });

  const hours = new Date().getHours();
  const greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';

  dashboardScreen.innerHTML = `
    <div class="dashboard-header">
      <div class="dashboard-greeting">${greeting}</div>
      <div class="dashboard-title">selfimproj</div>
      <div class="dashboard-sub">Keep building yourself <span style="font-size:10px;color:rgba(255,255,255,0.2);margin-left:6px">v${APP_VERSION}</span></div>
    </div>
    <div class="dashboard-cards">
      <div class="dashboard-card">
        <div class="dashboard-card-label">Learning</div>
        <div class="dashboard-card-value" style="color:${avgScore < 40 ? '#ef4444' : avgScore < 70 ? '#f59e0b' : '#22c55e'}">${avgScore}%</div>
        <div class="dashboard-card-desc">${activeCats.length} of ${catKeys.length} categories active</div>
        <div class="dashboard-mini-gauge">
          <div class="dashboard-mini-gauge-fill" style="width:0%;background:linear-gradient(90deg,#8b5cf6,#3b82f6)"></div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-label">Fitness</div>
        <div class="dashboard-card-value" style="color:${(savedData.fitnessVal ?? 0) < 40 ? '#ef4444' : (savedData.fitnessVal ?? 0) < 70 ? '#f59e0b' : '#22c55e'}">${savedData.fitnessVal ?? '—'}</div>
        <div class="dashboard-card-desc">Overall fitness score</div>
        <div class="dashboard-mini-gauge">
          <div class="dashboard-mini-gauge-fill" style="width:0%;background:linear-gradient(90deg,#3b82f6,#22c55e)"></div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-label">Streak</div>
        <div class="dashboard-card-value" style="color:#f59e0b">${streakCount}</div>
        <div class="dashboard-card-desc">Days logged</div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-label">Mind</div>
        <div class="dashboard-card-value" style="color:rgba(255,255,255,0.3)">—</div>
        <div class="dashboard-card-desc">Coming soon</div>
      </div>
    </div>
    ${activeCats.length > 0 ? `<div class="dashboard-section-title">Active Categories</div><div class="dashboard-cat-row">${catTags}</div>` : ''}
  `;

  dashboardScreen.style.display = 'block';
  dashboardScreen.classList.add('visible');

  requestAnimationFrame(() => {
    dashboardScreen.querySelectorAll('.dashboard-mini-gauge-fill').forEach(el => {
      const parent = el.closest('.dashboard-card');
      if (!parent) return;
      const label = parent.querySelector('.dashboard-card-label');
      if (!label) return;
      if (label.textContent === 'Learning') el.style.width = `${avgScore}%`;
      else if (label.textContent === 'Fitness') el.style.width = `${savedData.fitnessVal ?? 0}%`;
    });
  });
}

// ===== TABS =====
document.querySelectorAll('.tab-bar button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-bar button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const isLearning = btn.classList.contains('learning-btn');
    const isFitness = btn.classList.contains('fitness-btn');
    const isHome = btn.classList.contains('home-btn');
    const isMind = btn.classList.contains('mind-btn');
    const isFinance = btn.classList.contains('finance-btn');
    const isHabits = btn.classList.contains('habits-btn');
    const isNutrition = btn.classList.contains('nutrition-btn');

    // hide all screens
    catScreen.classList.remove('visible');
    catScreen.style.display = 'none';
    fitnessScreen.classList.remove('visible');
    fitnessScreen.style.display = 'none';
    dashboardScreen.classList.remove('visible');
    dashboardScreen.style.display = 'none';

    // remove placeholder message if exists
    const placeholder = container.querySelector('.placeholder-msg');
    if (placeholder) placeholder.remove();

    // restore categories if stashed
    if (categoriesFragment && container.querySelectorAll('.category-item').length === 0) {
      container.innerHTML = '';
      container.appendChild(categoriesFragment);
      categoriesFragment = null;
    }

    container.classList.remove('visible');
    container.style.display = 'none';

    if (isHome) {
      showDashboard();
    }

    if (isLearning) {
      container.style.display = '';
      container.classList.add('visible');
      document.querySelectorAll('.category-item, .welcome-text').forEach(el => {
        el.getAnimations().forEach(anim => anim.cancel());
        el.style.cssText = '';
        el.classList.remove('hiding');
      });
      requestAnimationFrame(() => {
        document.querySelectorAll('.category-item, .welcome-text').forEach((el, i) => {
          el.style.animation = `fadeIn 0.3s ease ${i * 0.05}s forwards`;
        });
      });
    }

    if (isFitness) showFitness();

    // placeholder for other tabs
    if (isMind || isFinance || isHabits || isNutrition) {
      const cats = container.querySelectorAll('.category-item, .welcome-text');
      if (cats.length > 0) {
        const frag = document.createDocumentFragment();
        cats.forEach(el => frag.appendChild(el));
        categoriesFragment = frag;
      }
      container.innerHTML = '';
      container.style.display = '';
      container.classList.add('visible');
      const msg = document.createElement('div');
      msg.className = 'placeholder-msg welcome-text';
      msg.style.cssText = 'grid-column:1/-1;text-align:center;font-size:28px;color:rgba(255,255,255,0.5);padding:60px 0;';
      msg.textContent = `${isMind ? 'Mind' : isFinance ? 'Finance' : isHabits ? 'Habits' : 'Nutrition'} — coming soon`;
      container.appendChild(msg);
    }
  });
});

// ===== LOAD DATA =====
API.get().then(d => {
  savedData = d;
  if (d.fitnessVal !== undefined) fitnessVal = d.fitnessVal;
  const todayStr = new Date().toISOString().slice(0,10);
  const todayLog = (d.fitnessLog || {})[todayStr] || {};
  const todayExs = getTodayExercises();
  if (todayExs.length > 0) {
    const done = todayExs.filter(ex => { const e = todayLog[ex]; return e && (typeof e === 'object' ? e.done : !!e); }).length;
    fitnessVal = Math.round((done / todayExs.length) * 100);
    if (d.fitnessVal === undefined) d.fitnessVal = fitnessVal;
  }
  isLoading = false;

  loadingOverlay.classList.add('hidden');
  setTimeout(() => { loadingOverlay.style.display = 'none'; }, 600);

  // show home by default (already clicked in html)
  document.querySelector('.home-btn').click();
});
