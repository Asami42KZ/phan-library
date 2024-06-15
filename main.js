// Array of content URLs (YouTube videos and PDFs)
const contentItems = [
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/5qfZvz2_spE?si=_nFKrzHn-uzmd_5v'
  },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/_YfqYB-m1AM?si=TU5UhMF0FVAK-DLv'
  },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/SZ0Q9saSLRk?si=zFRPUhYLL5R0amC0'
  },
  {
    type: 'pdf',
    url: 'files/sample.pdf'
  },
  // Add more video or PDF items as needed
];

let currentContentIndex = 0;
const bookPagesContainer = document.querySelector('.book-pages');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Function to load content based on currentContentIndex
function loadContent() {
  const currentItem = contentItems[currentContentIndex];

  if (currentItem.type === 'video') {
    const iframe = document.createElement('iframe');
    iframe.src = currentItem.url;
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
  } else if (currentItem.type === 'pdf') {
    // Load PDF using PDF.js
    const pdfUrl = currentItem.url;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);

    loadingTask.promise.then(function(pdfDoc) {
      // PDF loaded, now render pages
      renderPDF(pdfDoc);
    }, function(error) {
      console.error('Error loading PDF:', error);
    });
  }
}

// Function to render PDF pages using PDF.js
function renderPDF(pdfDoc) {
  const numPages = pdfDoc.numPages;
  let pageNum = 1;

  pdfDoc.getPage(pageNum).then(function(page) {
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    const pageElement = document.createElement('div');
    pageElement.classList.add('book-page');
    pageElement.appendChild(canvas);

    bookPagesContainer.innerHTML = '';
    bookPagesContainer.appendChild(pageElement);

    page.render(renderContext);
  });
}

// Function to go to previous content
function prevContent() {
  currentContentIndex = (currentContentIndex - 1 + contentItems.length) % contentItems.length;
  loadContent();
}

// Function to go to next content
function nextContent() {
  currentContentIndex = (currentContentIndex + 1) % contentItems.length;
  loadContent();
}

// Event listeners for buttons
prevBtn.addEventListener('click', prevContent);
nextBtn.addEventListener('click', nextContent);

// Load initial content
loadContent();

// Update current year in footer
const currentYear = new Date().getFullYear();
document.getElementById('copyright-year').textContent = currentYear;
