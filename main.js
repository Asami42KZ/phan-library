// Array of video objects with titles and URLs
const videoCategories = [
  {
    categoryName: 'Funny Videos',
    videos: [
      { 
        title: 'Acheron and the Raiden-verse', 
        url: 'https://www.youtube.com/embed/5qfZvz2_spE?si=_nFKrzHn-uzmd_5v' 
      },
      { 
        title: 'More Herta Please!', 
        url: 'https://www.youtube.com/embed/_YfqYB-m1AM?si=TU5UhMF0FVAK-DLv' 
      },
      { 
        title: 'Another Peaceful Day on the Astral Express', 
        url: 'https://www.youtube.com/embed/SZ0Q9saSLRk?si=zFRPUhYLL5R0amC0' 
      },
      { 
        title: 'Robin During Boss battle', 
        url: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Falvflamehazegaming%2Fvideos%2F1569761860539417%2F' 
      }
    ]
  },
  {
    categoryName: 'Personal',
    videos: [
      { 
        title: 'The Three Little Pigs', 
        url: 'https://www.youtube.com/embed/FNYBQsay_Ek?si=Se6fmPJQ6Tg_NZxZ'
      }
    ]
  }
  // Add more categories and video objects as needed
];

let currentCategoryIndex = 0; // Initial category index to display
let currentVideoIndex = 0;
const categoryList = document.querySelector('.category-list');
const bookPagesContainer = document.querySelector('.book-pages');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Function to load video based on category index and video index
function loadVideo(categoryIndex, videoIndex) {
  const videos = videoCategories[categoryIndex].videos;
  const iframe = document.createElement('iframe');
  iframe.src = videos[videoIndex].url;
  iframe.title = 'Video player';
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

// Function to switch category and load videos
function switchCategory(categoryIndex) {
  currentCategoryIndex = categoryIndex;
  currentVideoIndex = 0;
  loadVideo(currentCategoryIndex, currentVideoIndex);
}

// Function to play previous video in the current category
function prevVideo() {
  const videos = videoCategories[currentCategoryIndex].videos;
  currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
  loadVideo(currentCategoryIndex, currentVideoIndex);
}

// Function to play next video in the current category
function nextVideo() {
  const videos = videoCategories[currentCategoryIndex].videos;
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  loadVideo(currentCategoryIndex, currentVideoIndex);
}

// Populate categories and videos in the directory
videoCategories.forEach((category, index) => {
  const categoryItem = document.createElement('li');
  categoryItem.classList.add('category');
  categoryItem.textContent = category.categoryName;

  const videoList = document.createElement('ul');
  videoList.classList.add('video-list');
  category.videos.forEach((video, videoIndex) => {
    const videoItem = document.createElement('li');
    videoItem.classList.add('video');

    // Determine the icon class based on the URL
    let iconClass;
    if (video.url.includes('youtube.com')) {
      iconClass = 'fab fa-youtube youtube';
    } else if (video.url.includes('facebook.com')) {
      iconClass = 'fab fa-facebook facebook';
    } else {
      iconClass = 'fas fa-video other';
    }

    const icon = document.createElement('i');
    icon.className = iconClass;

    videoItem.appendChild(icon);
    videoItem.appendChild(document.createTextNode(video.title));

    videoItem.addEventListener('click', () => {
      switchCategory(index);
      currentVideoIndex = videoIndex; // Update current video index for accurate navigation
      loadVideo(index, videoIndex);
    });
    videoList.appendChild(videoItem);
  });

  categoryItem.appendChild(videoList);
  categoryList.appendChild(categoryItem);
});

// Event listeners for navigation buttons
prevBtn.addEventListener('click', prevVideo);
nextBtn.addEventListener('click', nextVideo);

// Load initial category and video
switchCategory(currentCategoryIndex);

// Update current year in footer
const currentYear = new Date().getFullYear();
document.getElementById('copyright-year').textContent = currentYear;
