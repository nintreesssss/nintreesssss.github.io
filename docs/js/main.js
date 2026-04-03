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
  var svgNS = 'http://www.w3.org/2000/svg';
  var xlinkNS = 'http://www.w3.org/1999/xlink';
  var maskCounter = 0;

  var layers = [];

  function createMaskedTreeNode(src) {
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('aria-hidden', 'true');

    var defs = document.createElementNS(svgNS, 'defs');
    var mask = document.createElementNS(svgNS, 'mask');
    var maskId = 'tree-cutout-mask-' + (maskCounter++);
    mask.setAttribute('id', maskId);
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    mask.setAttribute('maskContentUnits', 'userSpaceOnUse');
    mask.setAttribute('x', '0');
    mask.setAttribute('y', '0');
    mask.setAttribute('width', '100');
    mask.setAttribute('height', '100');

    var visibleRect = document.createElementNS(svgNS, 'rect');
    visibleRect.setAttribute('x', '0');
    visibleRect.setAttribute('y', '0');
    visibleRect.setAttribute('width', '100');
    visibleRect.setAttribute('height', '100');
    visibleRect.setAttribute('fill', 'white');

    // Downward equilateral triangle, slightly rotated left, cut out from canopy center.
    var cutout = document.createElementNS(svgNS, 'polygon');
    cutout.setAttribute('points', '21.25 24.20 78.75 24.20 50 74.00');
    cutout.setAttribute('fill', 'black');
    cutout.setAttribute('transform', 'rotate(-5 50 47)');

    mask.appendChild(visibleRect);
    mask.appendChild(cutout);
    defs.appendChild(mask);
    svg.appendChild(defs);

    var image = document.createElementNS(svgNS, 'image');
    image.setAttribute('x', '0');
    image.setAttribute('y', '0');
    image.setAttribute('width', '100');
    image.setAttribute('height', '100');
    image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    image.setAttribute('mask', 'url(#' + maskId + ')');
    image.setAttributeNS(xlinkNS, 'href', src);
    image.setAttribute('href', src);

    svg.appendChild(image);
    return svg;
  }

  function createLayersConfig(vw) {
    var unit = Math.round(vw / 3);
    var baseNodeSize = Math.max(460, Math.min(760, unit));

    return [
      { opacity: 0.76, nodeSize: Math.round(baseNodeSize * 1.5 * 0.81), sizeScale: 0.81, nodeRotOffset: 0, layerAngle: -15, speedMul: 0.90, dirDeg: 265 },
      { opacity: 0.88, nodeSize: Math.round(baseNodeSize * 1.5 * 0.90), sizeScale: 0.90, nodeRotOffset: 0, layerAngle: 0, speedMul: 1.00, dirDeg: 270 },
      { opacity: 1.0, nodeSize: Math.round(baseNodeSize * 1.5 * 1.00), sizeScale: 1.00, nodeRotOffset: 0, layerAngle: 15, speedMul: 1.12, dirDeg: 275 }
    ];
  }

  function buildLayers() {
    backdrop.innerHTML = '';
    layers = [];

    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var layersConfig = createLayersConfig(vw);
    var sharedPitchX = Math.round(layersConfig[layersConfig.length - 1].nodeSize * 0.76);
    var sharedPitchY = Math.round(layersConfig[layersConfig.length - 1].nodeSize * 0.76);

    layersConfig.forEach(function(cfg) {
      var layer = document.createElement('div');
      layer.className = 'parallax-layer';
      layer.style.opacity = String(cfg.opacity);
      backdrop.appendChild(layer);

      var pitchX = sharedPitchX;
      var pitchY = sharedPitchY;

      var padX = pitchX * 3;
      var padY = pitchY * 3;
      var minX = -padX;
      var minY = -padY;
      var maxX = vw + padX;
      var maxY = vh + padY;

      for (var y = minY; y < maxY; y += pitchY) {
        for (var x = minX; x < maxX; x += pitchX) {
          var posX = x;
          var posY = y;

          var node = document.createElement('div');
          node.className = 'parallax-node';
          node.style.left = posX + 'px';
          node.style.top = posY + 'px';
          node.style.setProperty('--node-size', cfg.nodeSize + 'px');
          node.style.setProperty('--node-opacity', '1');
          node.style.setProperty('--node-rot', cfg.nodeRotOffset + 'deg');

          node.appendChild(createMaskedTreeNode(imageSrc));
          layer.appendChild(node);
        }
      }

      layers.push({
        el: layer,
        pitchX: pitchX,
        pitchY: pitchY,
        speedMul: cfg.speedMul,
        layerAngle: cfg.layerAngle,
        dirDeg: cfg.dirDeg
      });
    });
  }

  var speedPxPerSec = 34.0;

  function animate(ts) {
    var t = ts * 0.001;
    var dist = prefersReducedMotion ? 0 : t * speedPxPerSec;

    layers.forEach(function(layer) {
      var dir = layer.dirDeg * (Math.PI / 180);
      var dx = Math.cos(dir) * dist * layer.speedMul;
      var dy = Math.sin(dir) * dist * layer.speedMul;
      var wrapX = ((dx % layer.pitchX) + layer.pitchX) % layer.pitchX;
      var wrapY = ((dy % layer.pitchY) + layer.pitchY) % layer.pitchY;
      layer.el.style.transform = 'translate3d(' + wrapX.toFixed(2) + 'px,' + wrapY.toFixed(2) + 'px,0) rotate(' + layer.layerAngle + 'deg)';
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
