const tree = {
  push: [
    {id:'p1',name:'Wall Push-up',l:1},{id:'p2',name:'Incline Push-up',l:2},
    {id:'p3',name:'Knee Push-up',l:3},{id:'p4',name:'Full Push-up',l:4},
    {id:'p5',name:'Wide Push-up',l:5},{id:'p6',name:'Close-grip Push-up',l:5},
    {id:'p7',name:'Diamond Push-up',l:6},{id:'p8',name:'Decline Push-up',l:6},
    {id:'p9',name:'Sphinx Push-up',l:6},{id:'p10',name:'Spiderman Push-up',l:6},
    {id:'p11',name:'Hindu Push-up',l:7},{id:'p12',name:'Dive Bomber PU',l:8},
    {id:'p13',name:'Archer Push-up',l:7},{id:'p14',name:'Uneven Push-up',l:8},
    {id:'p15',name:'Staggered Push-up',l:7},{id:'p16',name:'Explosive Push-up',l:7},
    {id:'p17',name:'Clap Push-up',l:8},{id:'p18',name:'Superman Push-up',l:9},
    {id:'p19',name:'Pseudo Planche PU',l:8},{id:'p20',name:'Planche Lean',l:9},
    {id:'p21',name:'Tuck Planche',l:10},{id:'p22',name:'Adv Tuck Planche',l:11},
    {id:'p23',name:'Straddle Planche',l:12},{id:'p24',name:'Full Planche',l:13},
    {id:'p25',name:'Tuck Planche PU',l:12},{id:'p26',name:'Straddle Planche PU',l:13},
    {id:'p27',name:'Full Planche PU',l:14},{id:'p28',name:'90° Push-up',l:10},
    {id:'p29',name:'OAP Negative',l:9},{id:'p30',name:'OAP Half ROM',l:10},
    {id:'p31',name:'OAP Full',l:11},{id:'p32',name:'Bench Dips',l:2},
    {id:'p33',name:'Parallel Bar Dips',l:5},{id:'p34',name:'Weighted Dips',l:9},
    {id:'p35',name:'L-sit Dips',l:8},{id:'p36',name:'Ring Dips',l:7},
    {id:'p37',name:'Bulgarian Dips',l:8},{id:'p38',name:'Korean Dips',l:10},
    {id:'p39',name:'Wall HS Hold',l:4},{id:'p40',name:'Wall Handstand',l:5},
    {id:'p41',name:'Wall HS Shoulder Tap',l:6},{id:'p42',name:'Wall HS Walk',l:8},
    {id:'p43',name:'Free HS Hold',l:8},{id:'p44',name:'Free HS 30s',l:9},
    {id:'p45',name:'Free HS 60s',l:10},{id:'p46',name:'Elevated Pike PU',l:7},
    {id:'p47',name:'Wall HSPU Neg',l:8},{id:'p48',name:'Band Wall HSPU',l:9},
    {id:'p49',name:'Wall HSPU',l:10},{id:'p50',name:'Deficit Wall HSPU',l:11},
    {id:'p51',name:'Free HSPU Neg',l:12},{id:'p52',name:'Freestanding HSPU',l:13},
    {id:'p53',name:'Wide HSPU',l:13},{id:'p54',name:'90° HSPU',l:13},
    {id:'p55',name:'Hefesto',l:14},
  ],
  pull: [
    {id:'u1',name:'Dead Hang 60s',l:1},{id:'u2',name:'Scapular Pull',l:2},
    {id:'u3',name:'Negative Pull-up',l:3},{id:'u4',name:'Band Pull-up',l:4},
    {id:'u5',name:'Full Pull-up',l:5},{id:'u6',name:'Wide Pull-up',l:6},
    {id:'u7',name:'Close-grip PU',l:6},{id:'u8',name:'Chin-up',l:6},
    {id:'u9',name:'Mixed-grip PU',l:7},{id:'u10',name:'Commando PU',l:7},
    {id:'u11',name:'Behind-neck PU',l:8},{id:'u12',name:'Typewriter PU',l:7},
    {id:'u13',name:'Archer Pull-up',l:8},{id:'u14',name:'OAP Negative',l:9},
    {id:'u15',name:'OAP Band',l:10},{id:'u16',name:'OAP Half',l:11},
    {id:'u17',name:'OAP Full',l:12},{id:'u18',name:'L-sit Pull-up',l:8},
    {id:'u19',name:'Weighted Pull-up',l:8},{id:'u20',name:'MU Transition',l:7},
    {id:'u21',name:'MU Negative',l:8},{id:'u22',name:'Band MU',l:9},
    {id:'u23',name:'Strict Muscle-up',l:10},{id:'u24',name:'Kipping MU',l:10},
    {id:'u25',name:'Slow Muscle-up',l:11},{id:'u26',name:'Wide Muscle-up',l:11},
    {id:'u27',name:'Incline Row',l:2},{id:'u28',name:'Flat Row',l:3},
    {id:'u29',name:'Decline Row',l:5},{id:'u30',name:'Wide Row',l:6},
    {id:'u31',name:'Archer Row',l:8},{id:'u32',name:'Tuck FL Row',l:7},
    {id:'u33',name:'Tuck FL',l:5},{id:'u34',name:'Adv Tuck FL',l:7},
    {id:'u35',name:'One-leg FL',l:8},{id:'u36',name:'Straddle FL',l:9},
    {id:'u37',name:'Full FL',l:10},{id:'u38',name:'FL Negative',l:8},
    {id:'u39',name:'Tuck FL PU',l:8},{id:'u40',name:'Adv Tuck FL PU',l:9},
    {id:'u41',name:'Straddle FL PU',l:11},{id:'u42',name:'Full FL PU',l:12},
    {id:'u43',name:'Ice Cream Maker',l:12},{id:'u44',name:'Tuck BL',l:6},
    {id:'u45',name:'Adv Tuck BL',l:7},{id:'u46',name:'One-leg BL',l:9},
    {id:'u47',name:'Straddle BL',l:10},{id:'u48',name:'Full BL',l:11},
    {id:'u49',name:'Tuck BL to Planche',l:12},{id:'u50',name:'Rope Climb Legs',l:6},
    {id:'u51',name:'Rope Climb No Legs',l:10},{id:'u52',name:'Towel Pull-up',l:7},
  ],
  core: [
    {id:'c1',name:'Dead Bug',l:1},{id:'c2',name:'Plank 30s',l:2},
    {id:'c3',name:'Plank 60s',l:3},{id:'c4',name:'Side Plank 30s',l:4},
    {id:'c5',name:'Side Plank 60s',l:5},{id:'c6',name:'Reverse Plank',l:5},
    {id:'c7',name:'Shoulder Tap Plank',l:5},{id:'c8',name:'Mountain Climber',l:6},
    {id:'c9',name:'Plank Ups',l:5},{id:'c10',name:'Side Plank Dips',l:6},
    {id:'c11',name:'HB Hold Tuck',l:3},{id:'c12',name:'HB Hold Full',l:4},
    {id:'c13',name:'Arch Hold',l:5},{id:'c14',name:'HB Rock',l:6},
    {id:'c15',name:'Crunch',l:4},{id:'c16',name:'Bicycle Crunch',l:5},
    {id:'c17',name:'Heel Tap Crunch',l:5},{id:'c18',name:'V-up Tuck',l:6},
    {id:'c19',name:'V-up Full',l:7},{id:'c20',name:'Lying Leg Raise',l:4},
    {id:'c21',name:'Reverse Crunch',l:5},{id:'c22',name:'Hanging Knee Raise',l:6},
    {id:'c23',name:'Hanging Leg Raise',l:7},{id:'c24',name:'HLR w/ Twist',l:8},
    {id:'c25',name:'Toes-to-bar',l:8},{id:'c26',name:'Windshield Wiper',l:9},
    {id:'c27',name:'Floor L-sit Tuck',l:7},{id:'c28',name:'Floor L-sit',l:8},
    {id:'c29',name:'PB L-sit',l:8},{id:'c30',name:'L-sit 30s',l:9},
    {id:'c31',name:'L-sit 60s',l:10},{id:'c32',name:'V-sit Tuck',l:9},
    {id:'c33',name:'V-sit Adv Tuck',l:10},{id:'c34',name:'V-sit Straddle',l:11},
    {id:'c35',name:'V-sit Full',l:12},{id:'c36',name:'Dragon Flag Neg',l:7},
    {id:'c37',name:'Dragon Flag Full',l:8},{id:'c38',name:'DF Slow Neg',l:9},
    {id:'c39',name:'Ab Rollout Knee',l:5},{id:'c40',name:'Ab Rollout Stand',l:8},
    {id:'c41',name:'Ab Rollout Full',l:10},{id:'c42',name:'Manna Tuck',l:11},
    {id:'c43',name:'Manna Adv Tuck',l:12},{id:'c44',name:'Manna Straddle',l:13},
    {id:'c45',name:'Manna Full',l:14},{id:'c46',name:'Candlestick',l:7},
    {id:'c47',name:'Skin the Cat',l:8},{id:'c48',name:'HF Tuck',l:9},
    {id:'c49',name:'HF Adv Tuck',l:10},{id:'c50',name:'HF Straddle',l:11},
    {id:'c51',name:'HF Full',l:12},{id:'c52',name:'Victorian Cross Tuck',l:13},
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
let drawn = false;

function buildTree() {
  drawn = false;
  const container = document.querySelector('.tree-columns');
  const svg = document.querySelector('.tree-svg');
  container.innerHTML = '';
  svg.innerHTML = '';
  for (const id in nodeMap) delete nodeMap[id];

  const cols = {};
  for (const cat of ['push','pull','core']) {
    const col = document.createElement('div');
    col.className = `column ${cat}`;
    const h = document.createElement('div');
    h.className = `column-header ${cat}`;
    h.textContent = catCfg[cat].label;
    col.appendChild(h);
    container.appendChild(col);
    cols[cat] = col;

    const sorted = [...tree[cat]].sort((a,b)=>a.l-b.l);
    for (const s of sorted) {
      const el = document.createElement('div');
      el.className = `skill-node ${cat}`;
      el.textContent = s.name;
      el.dataset.id = s.id;
      el.style.marginTop = s.l===1 ? '0' : `${Math.max(2, (s.l - sorted.find(ss=>ss.l===s.l-1)?.l||s.l)*0.2+0.4)}px`;
      col.appendChild(el);
      nodeMap[s.id] = el;
    }
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => drawLines());
    drawn = true;
  });
}

function drawLines() {
  const svg = document.querySelector('.tree-svg');
  const container = document.querySelector('.tree-container');
  const containerRect = container.getBoundingClientRect();
  const w = container.scrollWidth;
  const h = Math.max(container.scrollHeight, container.clientHeight);
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
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
    const fe = nodeMap[fromId];
    const te = nodeMap[toId];
    if (!fe||!te) continue;

    const fr = fe.getBoundingClientRect();
    const tr = te.getBoundingClientRect();
    const x1 = fr.left-containerRect.left+fr.width/2;
    const y1 = fr.top-containerRect.top+fr.height/2+container.scrollTop;
    const x2 = tr.left-containerRect.left+tr.width/2;
    const y2 = tr.top-containerRect.top+tr.height/2+container.scrollTop;

    const fs = getSkill(fromId);
    const ts = getSkill(toId);
    const cross = fs.cat!==ts.cat;

    const line = document.createElementNS(ns,'line');
    line.setAttribute('x1',x1); line.setAttribute('y1',y1);
    line.setAttribute('x2',x2); line.setAttribute('y2',y2);
    line.setAttribute('stroke', cross ? 'rgba(255,255,255,0.15)' : catCfg[fs.cat].color);
    line.setAttribute('stroke-opacity', cross ? '0.5' : '0.2');
    line.setAttribute('stroke-width', cross ? '1' : '1.5');
    line.setAttribute('filter','url(#g)');
    svg.appendChild(line);
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
      buildTree();
    }
  });
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { if (drawn) drawLines(); }, 200);
});

document.querySelector('.skilltree-tab').click();
