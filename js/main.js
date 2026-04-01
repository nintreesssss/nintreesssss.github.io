// Portfolio Navigation Script

let currentSection = null;

function goHome() {
  currentSection = null;
  document.getElementById('content-area').style.display = 'none';
  document.getElementById('sidebar').classList.add('full-width');
  document.getElementById('nav-projects').classList.remove('active');
  document.getElementById('nav-information').classList.remove('active');
}

function showSection(section) {
  currentSection = section;
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
  goHome();
});
