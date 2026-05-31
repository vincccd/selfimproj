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
        el.style.animation = '';
        el.classList.add('hiding');
        el.style.cssText += 'opacity:0;transform:scale(0.8);';
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

      const angle = -90 + val * 1.8;
      const r = 100, cx = 140, cy = 140;
      const p = (deg) => `${cx + r * Math.cos(deg * Math.PI / 180)},${cy + r * Math.sin(deg * Math.PI / 180)}`;
      let ticks = '';
      for (let v = 0; v <= 100; v += 25) {
        const a = 180 + v * 1.8, rad = a * Math.PI / 180;
        const x1 = cx + (r + 8) * Math.cos(rad), y1 = cy + (r + 8) * Math.sin(rad);
        const x2 = cx + (r - 12) * Math.cos(rad), y2 = cy + (r - 12) * Math.sin(rad);
        const tx = cx + (r - 28) * Math.cos(rad), ty = cy + (r - 28) * Math.sin(rad);
        ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
                  <text x="${tx}" y="${ty + 4}" fill="rgba(255,255,255,0.4)" font-family="'Segoe UI',sans-serif" font-size="11" text-anchor="middle">${v}</text>`;
      }
      catScreen.innerHTML = `
        <div class="top-row">
          <button class="back-btn"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 18 L9 12 L15 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <div class="name">${cat.name}</div>
        </div>
        <div class="scroll-wrap">
          <div class="car-gauge">
            <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
            <path d="M ${p(180)} A ${r} ${r} 0 0 1 ${p(0)}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="12" stroke-linecap="round"/>
            <path d="M ${p(180)} A ${r} ${r} 0 0 1 ${p(0)}" fill="none" stroke="url(#cg)" stroke-width="12" stroke-linecap="round" stroke-dasharray="314.16" stroke-dashoffset="${314.16 * (1 - val / 100)}"/>
              <linearGradient id="cg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ef4444"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#22c55e"/></linearGradient>
              ${ticks}
              <g class="needle spring" style="transform: rotate(-90deg); transform-origin: 140px 140px;">
                <polygon points="${cx},${cy} ${cx - 4},${cy - 60} ${cx},${cy - 75} ${cx + 4},${cy - 60}" fill="#ffffff"/>
                <circle cx="${cx}" cy="${cy}" r="5" fill="#ffffff"/>
              </g>
              <text x="${cx}" y="${cy + 65}" class="value-text pulse" fill="${val < 50 ? '#ef4444' : val > 50 ? '#22c55e' : '#f59e0b'}" font-size="28">${val}</text>
            </svg>
          </div>
          <div class="spacer"></div>
        </div>`;
      catScreen.style.display = 'block';
      catScreen.classList.add('visible');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const needle = catScreen.querySelector('.needle');
          const valText = catScreen.querySelector('.value-text');
          if (needle) needle.style.transform = `rotate(${angle}deg)`;
          if (valText) { valText.classList.remove('pulse'); void valText.offsetWidth; valText.classList.add('pulse'); }
        });
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
          el.style.animation = '';
          el.style.opacity = '';
          el.style.transform = '';
          el.classList.remove('hiding');
        });
      });
    }, 750);
  });
  container.appendChild(div);
});

// ===== FITNESS =====
let fitnessVal = 42;

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

function buildGaugeSVG(val) {
  const angle = -90 + val * 1.8;
  const r = 100, cx = 140, cy = 140;
  const p = (deg) => `${cx + r * Math.cos(deg * Math.PI / 180)},${cy + r * Math.sin(deg * Math.PI / 180)}`;
  let ticks = '';
  for (let v = 0; v <= 100; v += 25) {
    const a = 180 + v * 1.8, rad = a * Math.PI / 180;
    const x1 = cx + (r + 8) * Math.cos(rad), y1 = cy + (r + 8) * Math.sin(rad);
    const x2 = cx + (r - 12) * Math.cos(rad), y2 = cy + (r - 12) * Math.sin(rad);
    const tx = cx + (r - 28) * Math.cos(rad), ty = cy + (r - 28) * Math.sin(rad);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
              <text x="${tx}" y="${ty + 4}" fill="rgba(255,255,255,0.4)" font-family="'Segoe UI',sans-serif" font-size="11" text-anchor="middle">${v}</text>`;
  }
  return `<div class="scroll-wrap">
    <div class="car-gauge">
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
        <path d="M ${p(180)} A ${r} ${r} 0 0 1 ${p(0)}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="12" stroke-linecap="round"/>
        <path d="M ${p(180)} A ${r} ${r} 0 0 1 ${p(0)}" fill="none" stroke="url(#fg)" stroke-width="12" stroke-linecap="round" stroke-dasharray="314.16" stroke-dashoffset="${314.16 * (1 - val / 100)}"/>
        <linearGradient id="fg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ef4444"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#22c55e"/></linearGradient>
        ${ticks}
        <g class="needle spring" style="transform: rotate(-90deg); transform-origin: ${cx}px ${cy}px;">
          <polygon points="${cx},${cy} ${cx - 4},${cy - 60} ${cx},${cy - 75} ${cx + 4},${cy - 60}" fill="#ffffff"/>
          <circle cx="${cx}" cy="${cy}" r="5" fill="#ffffff"/>
        </g>
        <text x="${cx}" y="${cy + 65}" class="value-text" fill="${val < 50 ? '#ef4444' : val > 50 ? '#22c55e' : '#f59e0b'}" font-size="28">${val}</text>
      </svg>
    </div>
    ${(() => {
      const today = new Date().getDay();
      const workout = workoutMap[today];
      const muscles = workout.split(',');
      let exList = '';
      let exIdx = 0;
      muscles.forEach(m => {
        (exercises[m] || []).forEach(ex => {
          exList += `<div class="exercise-item" style="padding:20px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:32px;color:rgba(255,255,255,0.8);animation-delay:${exIdx * 0.08}s;"><span class="hover-pop">${ex}</span></div>`;
          exIdx++;
        });
      });
      return `<div style="display:flex;gap:12px;width:100%;margin:32px auto 0;padding:0 16px;box-sizing:border-box;">
      <div class="fitness-board-anim today-board" style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:24px;display:flex;flex-direction:column;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="hover-pop" style="font-size:56px;color:#fff;font-weight:600;">${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][today]}</span>
          <span class="hover-pop" style="font-size:28px;color:rgba(255,255,255,0.5);">${(new Date().getMonth()+1).toString().padStart(2,'0')}.${new Date().getDate().toString().padStart(2,'0')}</span>
        </div>
        <div class="hover-pop" style="margin-top:4px;font-size:28px;color:rgba(255,255,255,0.7);">${workout}</div>
        <div style="margin-top:16px;">${exList}</div>
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
    </div>`;})()}
    <div style="height:80px;"></div>
  </div>`;
}

function showFitness() {
  fitnessScreen.innerHTML = buildGaugeSVG(fitnessVal);
  fitnessScreen.style.display = 'block';
  fitnessScreen.classList.add('visible');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const needle = fitnessScreen.querySelector('.needle');
      if (needle) needle.style.transform = `rotate(${-90 + fitnessVal * 1.8}deg)`;
    });
  });
  savedData.fitnessVal = fitnessVal;
  API.post(savedData);
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

    if (isLearning || isHome) {
      container.style.display = '';
      container.classList.add('visible');
      document.querySelectorAll('.category-item, .welcome-text').forEach(el => {
        el.getAnimations().forEach(anim => anim.cancel());
        el.style.animation = '';
        el.style.opacity = '';
        el.style.transform = '';
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
  isLoading = false;

  loadingOverlay.classList.add('hidden');
  setTimeout(() => { loadingOverlay.style.display = 'none'; }, 600);

  // show home by default (already clicked in html)
  document.querySelector('.home-btn').click();
});
