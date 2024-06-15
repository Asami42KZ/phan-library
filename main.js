// Array of video URLs
const videoUrls = [
  'https://www.youtube.com/embed/5qfZvz2_spE?si=_nFKrzHn-uzmd_5v',
  'https://www.youtube.com/embed/_YfqYB-m1AM?si=TU5UhMF0FVAK-DLv',
  'https://www.youtube.com/embed/SZ0Q9saSLRk?si=zFRPUhYLL5R0amC0'
];

let currentVideoIndex = 0;
const bookPagesContainer = document.querySelector('.book-pages');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const yearSpan = document.getElementById('copyright-year');

// Function to load video based on currentVideoIndex
function loadVideo() {
  const iframe = document.createElement('iframe');
  iframe.src = videoUrls[currentVideoIndex];
  iframe.title = 'YouTube video player';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.referrerpolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;

  const page = document.createElement('div');
  page.classList.add('book-page');
  page.appendChild(iframe);

  // Clear existing pages and add the new one
  bookPagesContainer.innerHTML = '';
  bookPagesContainer.appendChild(page);
}

// Function to play previous video
function prevVideo() {
  currentVideoIndex = (currentVideoIndex - 1 + videoUrls.length) % videoUrls.length;
  loadVideo();
}

// Function to play next video
function nextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videoUrls.length;
  loadVideo();
}

// Event listeners for buttons
prevBtn.addEventListener('click', prevVideo);
nextBtn.addEventListener('click', nextVideo);

// Load initial video
loadVideo();

// Update current year in footer
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;
