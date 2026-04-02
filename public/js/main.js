// Portfolio Navigation Script

let currentSection = null;

function goHome() {
  currentSection = null;
  console.debug('[main.js] goHome()');
  document.getElementById('content-area').style.display = 'none';
  document.getElementById('sidebar').classList.add('full-width');
  document.getElementById('nav-projects').classList.remove('active');
  document.getElementById('nav-information').classList.remove('active');
}

function showSection(section) {
  currentSection = section;
  console.debug('[main.js] showSection ->', section);
  document.getElementById('content-area').style.display = 'block';
  document.getElementById('sidebar').classList.remove('full-width');
  
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize: show home state
document.addEventListener('DOMContentLoaded', function() {
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
