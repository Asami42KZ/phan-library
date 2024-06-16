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
  },
  {
    categoryName: 'Llama Llama',
    videos: [
      {
        title: 'Llama Llama Red Pajama',
        url: 'https://www.youtube.com/embed/K7evZs9iRoU?si=6xsQ69nXSyOBMrRZ'
      },
      {
        title: 'Llama Llama Home With Mama',
        url: 'https://www.youtube.com/embed/2Ib6i1AL3IM?si=SWUJs4vAKPcvQiVL'
      },
      {
        title: 'Llama Llama Time To Share',
        url: 'https://www.youtube.com/embed/ZpxTIOtd2d4?si=Wt1u1hraUzpEhrQa'
      },
    ]
  },
  {
    categoryName: 'No, David!',
    videos: [
      {
        title: 'Grow Up, David!',
        url: 'https://www.youtube.com/embed/LrqLi8Aca2A?si=k_MbfK6l-0XZNjOX'
      },
      {
        title: 'David Gets in Trouble',
        url: 'https://www.youtube.com/embed/_7PYi7ihIpE?si=yRGWVa_wRLZqwqed'
      },
      {
        title: 'No, David!',
        url: 'https://www.youtube.com/embed/pIvm_8u0U1I?si=fvWSOdScoj_p1ACl'
      },
    ]
  },
  {
    categoryName: 'Pete the Cat',
    videos: [
      {
        title: 'Pete the Cat and the Perfect Pizza Party',
        url: 'https://www.youtube.com/embed/yrVrFBGi43w?si=XrJsNYLEoCoU36hz'
      },
      {
        title: 'Pete the Cat and the Bad Banana',
        url: 'https://www.youtube.com/embed/KQKiwFGCywA?si=TiYDZyl-qZ35rS-X'
      },
      {
        title: 'Pete the Cat and His Four Groovy Buttons',
        url: 'https://www.youtube.com/embed/jouIlj6xp1M?si=C6FNGhERiRZHnLDf'
      },
      {
        title: 'Pete the Cat: Scuba-Cat',
        url: 'https://www.youtube.com/embed/vf_Yg_5J6T4?si=oom5URliIKgAhqAQ'
      },
      {
        title: 'Pete the Cat: I Love My White Shoes',
        url: 'https://www.youtube.com/embed/fj_z6zGQVyM?si=HZal3OqoDGeI4hVg'
      },
      {
        title: 'Pete the Cat: Super Pete',
        url: 'https://www.youtube.com/embed/t9nIlLxxBxw?si=LvMbhXD_h76AICMv'
      },
      {
        title: 'Pete the Cat: Robo-Pete',
        url: 'https://www.youtube.com/embed/ltuuKMpsQbs?si=usKZwvPNAxD_LOpS'
      },
      {
        title: 'Pete the Cat Snow Daze',
        url: 'https://www.youtube.com/embed/WQ92ehmuxjs?si=njXca8zKPCCPPiqS'
      },
      {
        title: 'Pete the Cat: Big Easter Adventure',
        url: 'https://www.youtube.com/embed/ubTNaQsy8Fg?si=AYH0CsEgqMQGfsOJ'
      },
      {
        title: 'Pete the Cat and the Itsy Bitsy Spider',
        url: 'https://www.youtube.com/embed/daxyn4uW-WI?si=jNF1KP1d03R8tWKw'
      },
      {
        title: 'Pete the Cat: Five Little Pumpkins',
        url: 'https://www.youtube.com/embed/ZGnXklGW3_8?si=BEMLs0mmZHS3zmhE'
      },
      {
        title: `Pete the Cat's 12 Groovy Days of Christmas`,
        url: 'https://www.youtube.com/embed/KJZtBoxZTh0?si=kZwgbr_mFzo2XIMc'
      },
      {
        title: 'Pete the Cat and the Tip Top Tree House',
        url: 'https://www.youtube.com/embed/W-Fax35tKKI?si=aUX1Z3N9ZVmc5u00'
      },
      {
        title: 'Pete the Cat and the Treasure Map',
        url: 'https://www.youtube.com/embed/rMF8WwKlGHw?si=dl9aDKnMDPKeMbji'
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
