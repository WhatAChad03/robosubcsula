import './style.css';

// Count-up stats
  const nums = document.querySelectorAll('.stat .num');
  nums.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const unitEl = el.querySelector('.unit');
    let cur = 0;
    const dur = 900;
    const start = performance.now() + 900; // wait for hero anim
    function tick(now){
      if(now < start){ requestAnimationFrame(tick); return; }
      const p = Math.min((now-start)/dur, 1);
      cur = Math.floor(p * target);
      el.childNodes[0].nodeValue = cur;
      if(p < 1) requestAnimationFrame(tick);
      else el.childNodes[0].nodeValue = target;
    }
    requestAnimationFrame(tick);
  });

  // Fleet card scan reveal on scroll into view
  const fleetCard = document.getElementById('fleetCard');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        fleetCard.classList.add('revealed');
        io.disconnect();
      }
    });
  }, {threshold:0.4});
  io.observe(fleetCard);

  // Ambient full-viewport bubble field (fixed, drifts in front of the whole page)
  const canvas = document.getElementById('bubbles');
  const ctx = canvas.getContext('2d');
  let w, h;
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let bubbles = [];
  const count = reduceMotion ? 0 : 46;
  for(let i=0;i<count;i++){
    bubbles.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: 0.8 + Math.random()*2.6,
      speed: 0.1 + Math.random()*0.35,
      drift: (Math.random()-0.5)*0.25,
      alpha: 0.05 + Math.random()*0.14
    });
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#4FC3DA';
    bubbles.forEach(b => {
      ctx.globalAlpha = b.alpha;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.fill();
      b.y -= b.speed;
      b.x += b.drift;
      if(b.y < -10){ b.y = h + 10; b.x = Math.random()*w; }
    });
    ctx.globalAlpha = 1;
    if(!reduceMotion) requestAnimationFrame(draw);
  }
  draw();

  // Scroll-tied depth gauge — the page IS the water column
  const depthFill = document.getElementById('depthFill');
  const depthReadout = document.getElementById('depthReadout');
  const MAX_DEPTH = 100;

  // Background darkens with scroll depth — surface tone at top, near-black at bottom
  const SURFACE_RGB = [16, 38, 51];   // the starting tone
  const DEEP_RGB     = [0, 0, 0];     // the deepest tone
  function lerp(a, b, t){ return Math.round(a + (b - a) * t); }

  function updateDepth(){
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;

    depthFill.style.height = (pct*100) + '%';
    depthReadout.textContent = Math.round(pct * MAX_DEPTH) + ' m';

    const r = lerp(SURFACE_RGB[0], DEEP_RGB[0], pct);
    const g = lerp(SURFACE_RGB[1], DEEP_RGB[1], pct);
    const b = lerp(SURFACE_RGB[2], DEEP_RGB[2], pct);
    document.documentElement.style.setProperty('--bg-depth', `rgb(${r}, ${g}, ${b})`);
  }
  window.addEventListener('scroll', updateDepth, {passive:true});
  updateDepth();
