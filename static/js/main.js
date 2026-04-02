// Portfolio Navigation Script

let currentSection = null;

function goHome() {
  currentSection = null;
  console.debug('[main.js] goHome()');
  document.getElementById('content-area').style.display = 'none';
  document.getElementById('sidebar').classList.add('full-width');
  document.body.classList.remove('content-open');
  document.body.classList.add('home');
  document.getElementById('nav-projects').classList.remove('active');
  document.getElementById('nav-information').classList.remove('active');
}

function showSection(section) {
  currentSection = section;
  console.debug('[main.js] showSection ->', section);
  document.getElementById('content-area').style.display = 'block';
  document.body.classList.add('content-open');
  document.getElementById('sidebar').classList.remove('full-width');
  document.body.classList.remove('home');
  
  // Hide all sections
  document.getElementById('information-section').style.display = 'none';
  document.getElementById('projects-section').style.display = 'none';
  
  // Show selected section
  document.getElementById(section + '-section').style.display = 'block';
  
  // Update nav active state
  document.getElementById('nav-projects').classList.remove('active');
  document.getElementById('nav-information').classList.remove('active');
  document.getElementById('nav-' + section).classList.add('active');
}

function scrollToTop() {
  var contentArea = document.getElementById('content-area');
  if (contentArea && contentArea.style.display !== 'none') {
    contentArea.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initParallaxBackdrop() {
  var backdrop = document.getElementById('parallax-backdrop');
  if (!backdrop) return;

  var imageSrc = backdrop.dataset.image || '/images/tree-placeholder.png';
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var layersConfig = [
    { opacity: 0.94, nodeSize: 720, pitchX: 900, pitchY: 760, angle: 16, offsetX: 0, offsetY: 0 },
    { opacity: 0.97, nodeSize: 720, pitchX: 900, pitchY: 760, angle: 34, offsetX: 300, offsetY: 210 },
    { opacity: 1.0, nodeSize: 720, pitchX: 900, pitchY: 760, angle: 52, offsetX: 600, offsetY: 420 }
  ];

  var layers = [];

  function buildLayers() {
    backdrop.innerHTML = '';
    layers = [];

    var vw = window.innerWidth;
    var vh = window.innerHeight;

    layersConfig.forEach(function(cfg) {
      var layer = document.createElement('div');
      layer.className = 'parallax-layer';
      layer.style.opacity = String(cfg.opacity);
      backdrop.appendChild(layer);

      var padX = cfg.pitchX * 2;
      var padY = cfg.pitchY * 2;
      var minX = -padX + cfg.offsetX;
      var minY = -padY + cfg.offsetY;
      var maxX = vw + padX;
      var maxY = vh + padY;

      for (var y = minY; y < maxY; y += cfg.pitchY) {
        for (var x = minX; x < maxX; x += cfg.pitchX) {
          var node = document.createElement('div');
          node.className = 'parallax-node';
          node.style.left = x + 'px';
          node.style.top = y + 'px';
          node.style.setProperty('--node-size', cfg.nodeSize + 'px');
          node.style.setProperty('--node-opacity', '1');
          node.style.setProperty('--node-rot', cfg.angle + 'deg');
          node.style.setProperty('--cutout-rot', cfg.angle + 'deg');

          var img = document.createElement('img');
          img.src = imageSrc;
          img.alt = '';
          img.decoding = 'async';
          node.appendChild(img);
          layer.appendChild(node);
        }
      }

      layers.push({ el: layer, pitchX: cfg.pitchX, pitchY: cfg.pitchY });
    });
  }

  var directionDeg = 265;
  var directionRad = directionDeg * (Math.PI / 180);
  var speedPxPerSec = 30.8; // ~10% faster than previous tuning

  function animate(ts) {
    var t = ts * 0.001;
    var dist = prefersReducedMotion ? 0 : t * speedPxPerSec;
    var dx = Math.cos(directionRad) * dist;
    var dy = Math.sin(directionRad) * dist;

    layers.forEach(function(layer) {
      var wrapX = ((dx % layer.pitchX) + layer.pitchX) % layer.pitchX;
      var wrapY = ((dy % layer.pitchY) + layer.pitchY) % layer.pitchY;
      layer.el.style.transform = 'translate3d(' + wrapX.toFixed(2) + 'px,' + wrapY.toFixed(2) + 'px,0)';
    });

    requestAnimationFrame(animate);
  }

  buildLayers();
  window.addEventListener('resize', buildLayers);
  requestAnimationFrame(animate);
}

// Initialize: show home state
document.addEventListener('DOMContentLoaded', function() {
  initParallaxBackdrop();

  // Attach handlers for site title
  var siteTitle = document.getElementById('site-title');
  if (siteTitle) siteTitle.addEventListener('click', function(e){ e.preventDefault(); goHome(); });

  // Attach handlers for nav links (data-section)
  document.querySelectorAll('.nav-link').forEach(function(el){
    el.addEventListener('click', function(ev){ ev.preventDefault(); var sec = el.dataset.section; console.debug('[main.js] nav click', sec); if(sec) showSection(sec); });
  });

  // Attach handler for top button
  var topBtn = document.querySelector('.top-button');
  if (topBtn) topBtn.addEventListener('click', function(ev){ ev.preventDefault(); scrollToTop(); });

  // Attach error handlers to images to show placeholder siblings
  document.querySelectorAll('img.tree-image, img.profile-image, img.project-image').forEach(function(img){
    img.addEventListener('error', function(){
      img.style.display = 'none';
      var ph = img.nextElementSibling;
      if(ph) ph.style.display = 'flex';
    });
  });

  // Initial state
  goHome();
});
