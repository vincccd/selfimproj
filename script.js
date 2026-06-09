const tree = {
  push: [
    {id:'p1',name:'Wall Push-up',l:1},{id:'p2',name:'Incline Push-up',l:2},
    {id:'p3',name:'Knee Push-up',l:3},{id:'p4',name:'Full Push-up',l:4},
    {id:'p5',name:'Wide Push-up',l:5},{id:'p6',name:'Close-grip PU',l:5},
    {id:'p7',name:'Diamond Push-up',l:6},{id:'p8',name:'Decline Push-up',l:6},
    {id:'p9',name:'Sphinx Push-up',l:6},{id:'p10',name:'Spiderman PU',l:6},
    {id:'p11',name:'Hindu Push-up',l:7},{id:'p12',name:'Dive Bomber PU',l:8},
    {id:'p13',name:'Archer Push-up',l:7},{id:'p14',name:'Uneven Push-up',l:8},
    {id:'p15',name:'Staggered PU',l:7},{id:'p16',name:'Explosive PU',l:7},
    {id:'p17',name:'Clap Push-up',l:8},{id:'p18',name:'Superman PU',l:9},
    {id:'p19',name:'Psdo Planche PU',l:8},{id:'p20',name:'Planche Lean',l:9},
    {id:'p21',name:'Tuck Planche',l:10},{id:'p22',name:'Adv Tuck Pl.',l:11},
    {id:'p23',name:'Straddle Planche',l:12},{id:'p24',name:'Full Planche',l:13},
    {id:'p25',name:'Tuck Pl. PU',l:12},{id:'p26',name:'Straddle Pl. PU',l:13},
    {id:'p27',name:'Full Pl. PU',l:14},{id:'p28',name:'90° Push-up',l:10},
    {id:'p29',name:'OAP Negative',l:9},{id:'p30',name:'OAP Half ROM',l:10},
    {id:'p31',name:'OAP Full',l:11},{id:'p32',name:'Bench Dips',l:2},
    {id:'p33',name:'PB Dips',l:5},{id:'p34',name:'Weighted Dips',l:9},
    {id:'p35',name:'L-sit Dips',l:8},{id:'p36',name:'Ring Dips',l:7},
    {id:'p37',name:'Bulgarian Dips',l:8},{id:'p38',name:'Korean Dips',l:10},
    {id:'p39',name:'Wall HS Hold',l:4},{id:'p40',name:'Wall HS',l:5},
    {id:'p41',name:'Wall HS Tap',l:6},{id:'p42',name:'Wall HS Walk',l:8},
    {id:'p43',name:'Free HS Hold',l:8},{id:'p44',name:'Free HS 30s',l:9},
    {id:'p45',name:'Free HS 60s',l:10},{id:'p46',name:'Elevated Pike',l:7},
    {id:'p47',name:'Wall HSPU Neg',l:8},{id:'p48',name:'Band HSPU',l:9},
    {id:'p49',name:'Wall HSPU',l:10},{id:'p50',name:'Deficit HSPU',l:11},
    {id:'p51',name:'Free HSPU Neg',l:12},{id:'p52',name:'Free HSPU',l:13},
    {id:'p53',name:'Wide HSPU',l:13},{id:'p54',name:'90° HSPU',l:13},
    {id:'p55',name:'Hefesto',l:14},
  ],
  pull: [
    {id:'u1',name:'Dead Hang',l:1},{id:'u2',name:'Scapular Pull',l:2},
    {id:'u3',name:'Neg. Pull-up',l:3},{id:'u4',name:'Band Pull-up',l:4},
    {id:'u5',name:'Full Pull-up',l:5},{id:'u6',name:'Wide Pull-up',l:6},
    {id:'u7',name:'Close-grip PU',l:6},{id:'u8',name:'Chin-up',l:6},
    {id:'u9',name:'Mixed-grip PU',l:7},{id:'u10',name:'Commando PU',l:7},
    {id:'u11',name:'B-neck PU',l:8},{id:'u12',name:'Typewriter PU',l:7},
    {id:'u13',name:'Archer Pull-up',l:8},{id:'u14',name:'OAP Negative',l:9},
    {id:'u15',name:'OAP Band',l:10},{id:'u16',name:'OAP Half',l:11},
    {id:'u17',name:'OAP Full',l:12},{id:'u18',name:'L-sit Pull-up',l:8},
    {id:'u19',name:'Weighted PU',l:8},{id:'u20',name:'MU Transition',l:7},
    {id:'u21',name:'MU Negative',l:8},{id:'u22',name:'Band MU',l:9},
    {id:'u23',name:'Strict MU',l:10},{id:'u24',name:'Kipping MU',l:10},
    {id:'u25',name:'Slow MU',l:11},{id:'u26',name:'Wide MU',l:11},
    {id:'u27',name:'Incline Row',l:2},{id:'u28',name:'Flat Row',l:3},
    {id:'u29',name:'Decline Row',l:5},{id:'u30',name:'Wide Row',l:6},
    {id:'u31',name:'Archer Row',l:8},{id:'u32',name:'Tuck FL Row',l:7},
    {id:'u33',name:'Tuck FL',l:5},{id:'u34',name:'Adv Tuck FL',l:7},
    {id:'u35',name:'One-leg FL',l:8},{id:'u36',name:'Straddle FL',l:9},
    {id:'u37',name:'Full FL',l:10},{id:'u38',name:'FL Negative',l:8},
    {id:'u39',name:'Tuck FL PU',l:8},{id:'u40',name:'Adv Tuck FL PU',l:9},
    {id:'u41',name:'Straddle FL PU',l:11},{id:'u42',name:'Full FL PU',l:12},
    {id:'u43',name:'Ice Cream Mkr',l:12},{id:'u44',name:'Tuck BL',l:6},
    {id:'u45',name:'Adv Tuck BL',l:7},{id:'u46',name:'One-leg BL',l:9},
    {id:'u47',name:'Straddle BL',l:10},{id:'u48',name:'Full BL',l:11},
    {id:'u49',name:'Tuck BL→Pl.',l:12},{id:'u50',name:'Rope Climb L',l:6},
    {id:'u51',name:'Rope Climb NL',l:10},{id:'u52',name:'Towel PU',l:7},
  ],
  core: [
    {id:'c1',name:'Dead Bug',l:1},{id:'c2',name:'Plank 30s',l:2},
    {id:'c3',name:'Plank 60s',l:3},{id:'c4',name:'Side Plank 30s',l:4},
    {id:'c5',name:'Side Plank 60s',l:5},{id:'c6',name:'Reverse Plank',l:5},
    {id:'c7',name:'Sh. Tap Plank',l:5},{id:'c8',name:'Mtn Climber',l:6},
    {id:'c9',name:'Plank Ups',l:5},{id:'c10',name:'Side Pl. Dips',l:6},
    {id:'c11',name:'HB Tuck',l:3},{id:'c12',name:'HB Full',l:4},
    {id:'c13',name:'Arch Hold',l:5},{id:'c14',name:'HB Rock',l:6},
    {id:'c15',name:'Crunch',l:4},{id:'c16',name:'Bicycle Cr.',l:5},
    {id:'c17',name:'Heel Tap Cr.',l:5},{id:'c18',name:'V-up Tuck',l:6},
    {id:'c19',name:'V-up Full',l:7},{id:'c20',name:'Lying Leg R.',l:4},
    {id:'c21',name:'Rev. Crunch',l:5},{id:'c22',name:'Hang. Knee R.',l:6},
    {id:'c23',name:'Hang. Leg R.',l:7},{id:'c24',name:'HLR Twist',l:8},
    {id:'c25',name:'Toes-to-bar',l:8},{id:'c26',name:'Windsh. Wiper',l:9},
    {id:'c27',name:'FL-sit Tuck',l:7},{id:'c28',name:'Floor L-sit',l:8},
    {id:'c29',name:'PB L-sit',l:8},{id:'c30',name:'L-sit 30s',l:9},
    {id:'c31',name:'L-sit 60s',l:10},{id:'c32',name:'V-sit Tuck',l:9},
    {id:'c33',name:'Vsit Adv Tuck',l:10},{id:'c34',name:'V-sit Strad.',l:11},
    {id:'c35',name:'V-sit Full',l:12},{id:'c36',name:'DF Negative',l:7},
    {id:'c37',name:'DF Full',l:8},{id:'c38',name:'DF Slow Neg',l:9},
    {id:'c39',name:'AR Kneeling',l:5},{id:'c40',name:'AR Standing',l:8},
    {id:'c41',name:'AR Full ROM',l:10},{id:'c42',name:'Manna Tuck',l:11},
    {id:'c43',name:'Manna AT',l:12},{id:'c44',name:'Manna Strad.',l:13},
    {id:'c45',name:'Manna Full',l:14},{id:'c46',name:'Candlestick',l:7},
    {id:'c47',name:'Skin the Cat',l:8},{id:'c48',name:'HF Tuck',l:9},
    {id:'c49',name:'HF Adv Tuck',l:10},{id:'c50',name:'HF Straddle',l:11},
    {id:'c51',name:'HF Full',l:12},{id:'c52',name:'Vict. Cross T',l:13},
  ],
  edges: [
    ['p1','p2'],['p2','p3'],['p3','p4'],
    ['p4','p5'],['p4','p6'],['p6','p7'],
    ['p4','p8'],['p4','p10'],['p10','p11'],['p11','p12'],
    ['p8','p13'],['p13','p14'],['p14','p15'],
    ['p4','p16'],['p16','p17'],['p17','p18'],
    ['p4','p19'],['p19','p20'],['p20','p21'],
    ['p21','p22'],['p22','p23'],['p23','p24'],
    ['p21','p25'],['p23','p26'],['p24','p27'],
    ['p7','p28'],['p13','p29'],['p29','p30'],['p30','p31'],
    ['p32','p33'],['p33','p34'],['p33','p35'],
    ['p33','p36'],['p36','p37'],['p36','p38'],
    ['p39','p40'],['p40','p41'],['p40','p42'],
    ['p39','p43'],['p43','p44'],['p44','p45'],
    ['p46','p47'],['p47','p48'],['p48','p49'],
    ['p49','p50'],['p50','p51'],['p51','p52'],
    ['p52','p53'],['p52','p54'],['p52','p55'],
    ['u1','u2'],['u2','u3'],['u3','u4'],['u4','u5'],
    ['u5','u6'],['u5','u7'],['u5','u8'],
    ['u8','u9'],['u9','u10'],['u10','u11'],
    ['u5','u12'],['u12','u13'],
    ['u13','u14'],['u14','u15'],['u15','u16'],['u16','u17'],
    ['u5','u18'],['u5','u19'],
    ['u5','u20'],['u20','u21'],['u21','u22'],
    ['u22','u23'],['u23','u24'],['u23','u25'],['u23','u26'],
    ['u27','u28'],['u28','u29'],['u29','u30'],
    ['u30','u31'],['u28','u32'],
    ['u33','u34'],['u34','u35'],['u35','u36'],['u36','u37'],
    ['u37','u38'],
    ['u33','u39'],['u34','u40'],['u39','u40'],
    ['u36','u41'],['u37','u42'],['u37','u43'],
    ['u44','u45'],['u45','u46'],['u46','u47'],['u47','u48'],
    ['u48','u49'],
    ['u1','u50'],['u50','u51'],['u5','u52'],
    ['c1','c2'],['c2','c3'],
    ['c3','c4'],['c4','c5'],['c3','c6'],
    ['c2','c7'],['c7','c8'],['c3','c9'],
    ['c5','c10'],
    ['c2','c11'],['c11','c12'],['c12','c13'],
    ['c12','c14'],
    ['c11','c15'],['c15','c16'],['c15','c17'],
    ['c12','c18'],['c18','c19'],
    ['c11','c20'],['c20','c21'],
    ['c21','c22'],['c22','c23'],
    ['c23','c24'],['c24','c25'],
    ['c25','c26'],
    ['c23','c27'],['c27','c28'],['c28','c29'],
    ['c29','c30'],['c30','c31'],
    ['c30','c32'],['c32','c33'],['c33','c34'],['c34','c35'],
    ['c22','c36'],['c36','c37'],['c37','c38'],
    ['c3','c39'],['c39','c40'],['c40','c41'],
    ['c35','c42'],['c42','c43'],['c43','c44'],['c44','c45'],
    ['c14','c46'],['c46','c47'],
    ['c47','c48'],['c48','c49'],['c49','c50'],['c50','c51'],
    ['c47','c52'],
  ],
  crossEdges: [
    ['c12','p40'],['c12','p43'],['c12','p20'],
    ['c31','p35'],['c28','p35'],['c3','p20'],
    ['c35','u41'],['c31','u18'],['c37','u43'],
    ['c13','u37'],['c3','u33'],['c23','u18'],
    ['u1','c22'],['u5','c22'],['u37','c37'],
    ['p40','c12'],['p45','c12'],['p33','c29'],
    ['p40','u44'],['p20','u33'],['p31','u17'],
    ['c47','p20'],['c47','u37'],['c14','p43'],
  ],
};

const catCfg = { push:{color:'#89CFF0',label:'Push'}, pull:{color:'#FFB6C1',label:'Pull'}, core:{color:'#C8FFC8',label:'Core'} };
const nodeMap = {};
const skillPositions = {};
let drawn = false;
let animFrame = null;
let zoom = 1;



function applyZoom() {
  const web = document.querySelector('.tree-web');
  const svg = document.querySelector('.tree-svg');
  const base = parseFloat(web.dataset.baseH) || web.scrollHeight;
  const baseW = parseFloat(web.dataset.baseW) || web.parentElement.clientWidth;

  for (const id in skillPositions) {
    const sp = skillPositions[id];
    const wrap = nodeMap[id];
    if (!wrap) continue;
    wrap.style.left = (sp.baseX * zoom) + 'px';
    wrap.style.top = (sp.baseY * zoom) + 'px';
  }

  web.style.height = (base * zoom) + 'px';
  svg.setAttribute('width', baseW * zoom);
  svg.setAttribute('height', base * zoom);
  drawLines();
}

function buildTree() {
  drawn = false;
  if (animFrame) cancelAnimationFrame(animFrame);
  zoom = 1;
  const container = document.querySelector('.tree-web');
  const svg = document.querySelector('.tree-svg');
  container.innerHTML = '';
  svg.innerHTML = '';
  for (const id in nodeMap) delete nodeMap[id];
  for (const id in skillPositions) delete skillPositions[id];

  const cats = ['push','pull','core'];
  const maxL = { push:0, pull:0, core:0 };
  for (const cat of cats)
    for (const s of tree[cat])
      if (s.l>maxL[cat]) maxL[cat]=s.l;

  const padX = 50;
  const colW = Math.max(0, (container.clientWidth-padX*2)/3);
  const startY = 40;
  const levelH = 48;

  const positions = {};

  for (let ci=0; ci<cats.length; ci++) {
    const cat = cats[ci];
    const cx = padX + colW*(ci+0.5);
    const byL = {};
    for (const s of tree[cat]) {
      if (!byL[s.l]) byL[s.l]=[];
      byL[s.l].push(s);
    }
    for (const lvl in byL) {
      const arr = byL[lvl];
      for (let si=0; si<arr.length; si++) {
        const s = arr[si];
        const yOff = arr.length>1 ? (si-arr.length/2)*32 : 0;
        const xOff = arr.length>1 ? (si-arr.length/2)*20 : 0;
        const rx = (Math.random()-0.5)*12;
        const ry = (Math.random()-0.5)*8;
        const x = cx + xOff + rx;
        const y = startY + (parseInt(lvl)-1)*levelH + yOff + ry;
        positions[s.id] = { x, y };
        skillPositions[s.id] = { baseX: x, baseY: y };
      }
    }
  }

  for (const cat of cats) {
    for (const s of tree[cat]) {
      const p = positions[s.id];
      if (!p) continue;
      const wrap = document.createElement('div');
      wrap.className = 'skill-wrap';
      wrap.style.left = (p.x * zoom)+'px';
      wrap.style.top = (p.y * zoom)+'px';
      wrap.dataset.id = s.id;

      const circle = document.createElement('div');
      circle.className = `skill-node ${cat}`;
      circle.textContent = s.name;
      wrap.appendChild(circle);
      container.appendChild(wrap);
      nodeMap[s.id] = wrap;
    }
  }

  const naturalH = startY + 14*levelH + 100;
  const baseW = container.parentElement.clientWidth;
  container.style.height = (naturalH * zoom)+'px';
  container.dataset.naturalH = naturalH;
  container.dataset.baseH = naturalH;
  container.dataset.baseW = baseW;

  svg.setAttribute('width', baseW * zoom);
  svg.setAttribute('height', naturalH * zoom);

  animFrame = requestAnimationFrame(() => requestAnimationFrame(() => drawLines()));
  drawn = true;
}

function drawLines() {
  const svg = document.querySelector('.tree-svg');
  svg.innerHTML = '';

  const ns = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(ns,'defs');
  const f = document.createElementNS(ns,'filter');
  f.setAttribute('id','g');
  f.innerHTML = '<feGaussianBlur stdDeviation="1"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>';
  defs.appendChild(f);
  svg.appendChild(defs);

  const allEdges = [...tree.edges, ...tree.crossEdges];
  for (const [fromId, toId] of allEdges) {
    const fp = skillPositions[fromId];
    const tp = skillPositions[toId];
    if (!fp||!tp) continue;

    const x1 = fp.baseX * zoom;
    const y1 = fp.baseY * zoom;
    const x2 = tp.baseX * zoom;
    const y2 = tp.baseY * zoom;

    const fs = getSkill(fromId);
    const ts = getSkill(toId);
    if (!fs||!ts) continue;
    const cross = fs.cat!==ts.cat;

    const midY = (y1 + y2) / 2;
    const dx = Math.abs(x2 - x1) * 0.3;
    const path = document.createElementNS(ns,'path');
    const d = `M ${x1} ${y1} C ${x1} ${midY + dx}, ${x2} ${midY - dx}, ${x2} ${y2}`;
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', cross ? 'rgba(255,255,255,0.08)' : catCfg[fs.cat].color);
    path.setAttribute('stroke-opacity', cross ? '0.35' : '0.15');
    path.setAttribute('stroke-width', cross ? '1' : '1.2');
    path.setAttribute('filter','url(#g)');
    svg.appendChild(path);
  }
}

function getSkill(id) {
  for (const cat of ['push','pull','core'])
    for (const s of tree[cat])
      if (s.id===id) return { ...s, cat };
  return null;
}

const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    if (tab.classList.contains('home-tab')) document.querySelector('.home-page').classList.add('active');
    if (tab.classList.contains('skilltree-tab')) {
      document.querySelector('.skilltree-page').classList.add('active');
      requestAnimationFrame(() => buildTree());
    }
  });
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  if (drawn) resizeTimer = setTimeout(() => {
    const web = document.querySelector('.tree-web');
    web.dataset.baseW = web.parentElement.clientWidth;
    applyZoom();
  }, 200);
});

const treeContainer = document.querySelector('.tree-container');
let panning = false, panStartX, panStartY, panScrollX, panScrollY;
treeContainer.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return;
  panning = true;
  panStartX = e.clientX;
  panStartY = e.clientY;
  panScrollX = treeContainer.scrollLeft;
  panScrollY = treeContainer.scrollTop;
  treeContainer.style.cursor = 'grabbing';
  treeContainer.style.userSelect = 'none';
});
window.addEventListener('mousemove', (e) => {
  if (!panning) return;
  const dx = e.clientX - panStartX;
  const dy = e.clientY - panStartY;
  treeContainer.scrollLeft = panScrollX - dx;
  treeContainer.scrollTop = panScrollY - dy;
});
window.addEventListener('mouseup', () => {
  if (!panning) return;
  panning = false;
  treeContainer.style.cursor = '';
  treeContainer.style.userSelect = '';
});

let zoomTimer;
treeContainer.addEventListener('wheel', (e) => {
  if (!drawn) return;
  e.preventDefault();
  const delta = e.deltaY>0 ? 0.92 : 1.08;
  const newZoom = Math.max(0.3, Math.min(3, zoom * delta));
  if (newZoom === zoom) return;
  zoom = newZoom;
  clearTimeout(zoomTimer);
  zoomTimer = requestAnimationFrame(() => applyZoom());
}, { passive: false });

document.querySelector('.home-tab').classList.remove('active');
document.querySelector('.skilltree-tab').classList.add('active');
document.querySelector('.home-page').classList.remove('active');
document.querySelector('.skilltree-page').classList.add('active');
requestAnimationFrame(() => buildTree());
