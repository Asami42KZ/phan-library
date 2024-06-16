let videoCategories = [
  {
    categoryName: 'Dr Seuss',
    videos: [
      {
        title: 'What Pet Should I Get',
        url: 'https://www.youtube.com/embed/psCzO1TlJlU?si=TWN5nX6YoFe72IUU'
      },
      {
        title: 'Fox in Socks',
        url: 'https://www.youtube.com/embed/c-jB21cm2mo?si=Mh0W9KsKncyaQH-c'
      }
    ]
  },
  {
    categoryName: 'Elephant and Piggie',
    videos: [
      {
        title: 'My New Friend Is So Fun',
        url: 'https://www.youtube.com/embed/-LLsAsXHYZw?si=DFeXD6dg_YTly8Fy'
      },
      {
        title: 'I Broke My Trunk',
        url: 'https://www.youtube.com/embed/TIOuDdeiJ9E?si=xsumBmwfUn5Zor57'
      },
      {
        title: 'Waiting Is Not Easy',
        url: 'https://www.youtube.com/embed/PPswJFlmQp0?si=RJsQOBH_hizCLhp0'
      }
    ]
  }
];

let filteredCategories = []; // Variable to hold filtered categories

const categoryList = document.querySelector('.category-list');
const bookPagesContainer = document.querySelector('.book-pages');

// Function to load video based on category index and video index
function loadVideo(categoryIndex, videoIndex) {
  let categories = filteredCategories.length > 0 ? filteredCategories : videoCategories;

  if (!categories[categoryIndex]) {
    console.error(`Category at index ${categoryIndex} not found.`);
    return;
  }

  const category = categories[categoryIndex];
  const videos = category.videos;

  if (!videos || videoIndex < 0 || videoIndex >= videos.length) {
    console.error(`Video at index ${videoIndex} not found in category ${categoryIndex}.`);
    return;
  }

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

function filterVideos(query) {
  query = query.toLowerCase();

  if (query.trim() === '') {
    // If search query is empty, reset to original categories
    filteredCategories = [];
    renderCategories(videoCategories);
    collapseAllCategories();
    return;
  }

  filteredCategories = videoCategories.map(category => {
    const filteredVideos = category.videos.filter(video =>
      video.title.toLowerCase().includes(query)
    );
    if (filteredVideos.length > 0) {
      return { ...category, videos: filteredVideos };
    } else {
      return null; // Filter out categories with no matching videos
    }
  }).filter(Boolean); // Remove null entries

  renderCategories(filteredCategories);
  expandAllCategories();
}

// Function to collapse all category headers
function collapseAllCategories() {
  const categoryHeaders = document.querySelectorAll('.category-header');
  categoryHeaders.forEach(header => {
    header.classList.remove('show');
    const targetId = header.getAttribute('data-target');
    const targetCollapse = document.querySelector(targetId);
    if (targetCollapse) {
      targetCollapse.classList.remove('show');
    }
  });
}

// Function to expand all category headers
function expandAllCategories() {
  const categoryHeaders = document.querySelectorAll('.category-header');
  categoryHeaders.forEach(header => {
    header.classList.add('show');
    const targetId = header.getAttribute('data-target');
    const targetCollapse = document.querySelector(targetId);
    if (targetCollapse) {
      targetCollapse.classList.add('show');
    }
  });
}

function renderCategories(categories) {
  categoryList.innerHTML = '';

  categories.forEach((category, index) => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('category');

    const categoryHeader = document.createElement('div');
    categoryHeader.classList.add('category-header');
    categoryHeader.textContent = category.categoryName;
    categoryHeader.setAttribute('data-toggle', 'collapse');
    categoryHeader.setAttribute('data-target', `#category-${index}`);

    const videoList = document.createElement('ul');
    videoList.classList.add('video-list', 'collapse');
    videoList.id = `category-${index}`;

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
        switchCategory(index, videoIndex);
      });
      videoList.appendChild(videoItem);
    });

    categoryItem.appendChild(categoryHeader);
    categoryItem.appendChild(videoList);
    categoryList.appendChild(categoryItem);
  });
}

// Function to switch category and load videos
function switchCategory(categoryIndex, videoIndex = 0) {
  loadVideo(categoryIndex, videoIndex);
}

// Populate categories and videos in the directory
videoCategories.forEach((category, index) => {
  const categoryItem = document.createElement('li');
  categoryItem.classList.add('category');

  const categoryHeader = document.createElement('div');
  categoryHeader.classList.add('category-header');
  categoryHeader.textContent = category.categoryName;
  categoryHeader.setAttribute('data-toggle', 'collapse');
  categoryHeader.setAttribute('data-target', `#category-${index}`);

  const videoList = document.createElement('ul');
  videoList.classList.add('video-list', 'collapse');
  videoList.id = `category-${index}`;

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
      switchCategory(index, videoIndex);
    });
    videoList.appendChild(videoItem);
  });

  categoryItem.appendChild(categoryHeader);
  categoryItem.appendChild(videoList);
  categoryList.appendChild(categoryItem);
});

const videoSearchInput = document.getElementById('videoSearch');
videoSearchInput.addEventListener('input', function () {
  const searchText = this.value.trim();
  filterVideos(searchText);
});

// Update current year in footer
const currentYear = new Date().getFullYear();
document.getElementById('copyright-year').textContent = currentYear;
