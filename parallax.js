(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = id => document.getElementById(id);
  const chapters = [
    ['math','01 / Mathematics'],['cs','02 / Computer Science'],['finance','03 / Finance'],['experience','04 / Experience'],['academics','05 / Academics']
  ];
  chapters.forEach(([id,label])=>{
    const section=$(id); if(!section) return;
    section.classList.add('parallax-active');
    const divider=document.createElement('div'); divider.className='parallax-divider';
    const [num,title]=label.split(' / '); divider.innerHTML=`<span>${num}</span><strong>${title}</strong><span>scroll / explore</span>`;
    section.insertBefore(divider,section.firstChild);
  });
  const math=$('math'); if(math){const layer=document.createElement('div');layer.className='parallax-layer math-parallax';layer.setAttribute('aria-hidden','true');layer.innerHTML='<i class="geo g1"></i><i class="geo g2"></i><i class="geo g3"></i><i class="geo g4"></i>';math.insertBefore(layer,math.children[1]||null);}
  const cs=$('cs'); const code=`const idea = research\n  .map(signal => model(signal))\n  .filter(result => result.confidence > 0.8);\n\nfor (const hypothesis of idea) {\n  test(hypothesis);\n  refine(hypothesis);\n}\n\nship(idea);`;
  let codeText=null;
  if(cs){const layer=document.createElement('div');layer.className='parallax-layer cs-parallax';layer.setAttribute('aria-hidden','true');layer.innerHTML='<pre class="code-ghost"><span class="code-text"></span><span class="code-caret"></span></pre>';cs.insertBefore(layer,cs.children[1]||null);codeText=layer.querySelector('.code-text');}
  const fin=$('finance'); if(fin){const layer=document.createElement('div');layer.className='parallax-layer finance-parallax';layer.setAttribute('aria-hidden','true');layer.innerHTML=`<svg viewBox="0 0 900 340" preserveAspectRatio="none"><g>${[60,120,180,240,300].map(y=>`<line class="trend-grid" x1="0" y1="${y}" x2="900" y2="${y}"/>`).join('')}</g><path class="trend-area" d="M0 275 L90 250 L160 268 L240 210 L320 226 L405 155 L490 178 L570 118 L650 142 L735 78 L820 104 L900 55 L900 330 L0 330 Z"/><path class="trend-line" d="M0 275 L90 250 L160 268 L240 210 L320 226 L405 155 L490 178 L570 118 L650 142 L735 78 L820 104 L900 55"/></svg>`;fin.insertBefore(layer,fin.children[1]||null);}
  const palette={home:'#f7f7f2',math:'#f1efe5',cs:'#e8ece5',finance:'#ece7de',experience:'#efece5',academics:'#f4f1e9'};
  const paletteDark={home:'#10110f',math:'#12140f',cs:'#0f1511',finance:'#17130f',experience:'#131311',academics:'#111210'};
  const clamp=n=>Math.max(0,Math.min(1,n));
  function progress(section){const r=section.getBoundingClientRect(),vh=innerHeight;return clamp((vh-r.top)/(r.height+vh*.35));}
  let ticking=false;
  function draw(){ticking=false;const mp=math?progress(math):0,cp=cs?progress(cs):0,fp=fin?progress(fin):0;if(math)math.style.setProperty('--math-p',mp.toFixed(4));if(codeText)codeText.textContent=code.slice(0,Math.round(code.length*cp));if(fin)fin.style.setProperty('--fin-p',fp.toFixed(4));
    const mid=innerHeight*.46; let active='home'; document.querySelectorAll('main>section').forEach(s=>{const r=s.getBoundingClientRect();if(r.top<=mid&&r.bottom>=mid)active=s.id;}); const dark=document.documentElement.dataset.theme==='dark'; document.body.style.backgroundColor=(dark?paletteDark:palette)[active]||(dark?'#10110f':'#f7f7f2');}
  function request(){if(!ticking){ticking=true;requestAnimationFrame(draw)}}
  addEventListener('scroll',request,{passive:true});addEventListener('resize',request);addEventListener('themechange',request);request();
  if(reduced.matches){if(math)math.style.setProperty('--math-p','1');if(codeText)codeText.textContent=code;if(fin)fin.style.setProperty('--fin-p','1');}
})();
