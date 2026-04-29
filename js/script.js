/* 네비게이션 */
  const header = document.getElementById("header");
  const lnb = document.querySelectorAll(".lnb");

  //모든 메뉴 닫기
  const closeAllMenus = function(){
    lnb.forEach((item) => {
      item.classList.remove("is-open");
    });
    header.classList.remove("open");
  };

  //특정 메뉴만 열기
  const openMenu = (target) => {
    lnb.forEach((item) => {
      item.classList.remove("is-open");
    });
    target.classList.add("is-open");
    header.classList.add("open");
  };

  //각 메뉴 마우스 진입 시 해당 메뉴 열기
  lnb.forEach((item) => {
    item.addEventListener("mouseenter", () =>{
      openMenu(item);
    });
  });

  //헤더 영역 전체를 벗어나면 닫기
  header.addEventListener("mouseleave", () => {
    closeAllMenus();
  })

    

/* search */
const search = document.querySelector(".search");
const totalSearch = document.querySelector(".totalSearch")
const btnClose = document.querySelector(".btn-close")

search.addEventListener('click', ()=>{
  totalSearch.classList.add('show')
})

btnClose.addEventListener('click', ()=>{
  totalSearch.classList.remove('show')
})



/* 메인비주얼 스와이퍼 */
  document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");

  const whiteSlides = [0, 5, 6]; // 0부터 시작

  const mainSwiper = new Swiper("#mainSwiper", {
    loop: true,
    navigation: {
      nextEl: ".main-swiper-next",
      prevEl: ".main-swiper-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000
    },
    on: {
      init: function () {
        updateHeaderTheme(this.realIndex);
      },
      slideChange: function () {
        updateHeaderTheme(this.realIndex);
      },
    },
  });

  function updateHeaderTheme(index) {
    if (whiteSlides.includes(index)) {
      header.classList.add("white-mode");
    } else {
      header.classList.remove("white-mode");
    }
  }
});

/* 스토리 섹션 스와이프 */
const storySwiper = new Swiper("#storySwiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  pagination: {
    el: ".story .swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".story-button-next",
    prevEl: ".story-button-prev",
  },
});

/* 초록우산 섹션 카운트 */
const count1 = document.getElementById('count1');
const count2 = document.getElementById('count2');
const count3 = document.getElementById('count3');

function counter(element, target, speed) {
  let num = 0;

  const interval = setInterval(() => {
    num++;
    element.textContent = num;

    if (num >= target) {
      clearInterval(interval);
    }
  }, speed);
}

window.addEventListener('load', () => {
  counter(count1, 78, 20);
  counter(count2, 58, 25);
  counter(count3, 258, 8);
});

/* 캠페인 섹션 스와이퍼 */
const tabs = document.querySelectorAll('.campaign .tab a');
const swiperEls = document.querySelectorAll(
  '.campaignAll, .campaignDomestic, .campaignAbroad, .campaignJoin'
);
const paginationEl = document.querySelector('.campaign .swiper-pagination');

let campaignSwiper;

function initCampaignSwiper(target) {
  if (campaignSwiper) {
    campaignSwiper.destroy(true, false);
  }

  campaignSwiper = new Swiper(target, {
    slidesPerView: 5,
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    watchOverflow: false,
    pagination: {
      el: '.campaign .swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.campaign-button-next',
      prevEl: '.campaign-button-prev',
    },
  });

  const slideCount = target.querySelectorAll('.swiper-slide').length;

  // 슬라이드가 5개 이하이면 기본 바만 강제로 보이게
  if (slideCount <= 5) {
    paginationEl.classList.add('is-static');
  } else {
    paginationEl.classList.remove('is-static');
  }

  campaignSwiper.update();
}

function showCampaign(targetClass) {
  swiperEls.forEach(el => el.classList.add('is-hidden'));

  const target = document.querySelector(`.${targetClass}`);
  target.classList.remove('is-hidden');

  initCampaignSwiper(target);
}

const firstActive = document.querySelector('.campaign .tab a.active');
showCampaign(firstActive.dataset.target);

tabs.forEach(tab => {
  tab.addEventListener('click', function (e) {
    e.preventDefault();

    tabs.forEach(item => item.classList.remove('active'));
    this.classList.add('active');

    showCampaign(this.dataset.target);
  });
});

/* 배너 섹션 스와이퍼 */
const bannerSwiper = new Swiper("#bannerSwiper", {
  loop: true,
  autoplay: {
    delay: 3000
  },
  pagination: {
    el: ".banner .swiper-pagination",
  },
});

/* 후원 섹션 스와이퍼 */
const sponsorTexts = document.querySelectorAll(".sponsor .pagination-text li");

const sponsorswiper = new Swiper("#sponsorSwiper", {
  slidesPerView: 3,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: ".sponsor .swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".sponsor .sponsor-button-next",
    prevEl: ".sponsor .sponsor-button-prev",
  },
  on: {
    slideChange: function () {
      sponsorTexts.forEach((item) => {
        item.classList.remove("active");
      });

      sponsorTexts[this.realIndex].classList.add("active");
    },
  },
});

/* 텍스트 클릭하면 해당 슬라이드로 이동 */
sponsorTexts.forEach((item, index) => {
  item.addEventListener("click", () => {
    sponsorswiper.slideToLoop(index);
  });
});

/* 홍보동영상 스와이퍼 */
const thumbsSwiper = new Swiper("#thumbsSwiper", {
  spaceBetween: 16,
  slidesPerView: 3,
  direction: "vertical",
  freeMode: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".movie .movie-button-next",
    prevEl: ".movie .movie-button-prev",
  },
});

const movieSwiper = new Swiper("#movieSwiper", {
  thumbs: {
    swiper: thumbsSwiper,
  },
});

// 가운데 슬라이드를 기준으로 movieSwiper 이동
function syncMovieToCenterThumb() {
  const centerIndex = thumbsSwiper.activeIndex + 1; 
  // slidesPerView: 3 이라 가운데는 activeIndex 기준 +1

  if (centerIndex < movieSwiper.slides.length) {
    movieSwiper.slideTo(centerIndex);
  }
}

// 초기 실행
syncMovieToCenterThumb();

// 썸네일 스와이퍼가 이동한 뒤 메인 스와이퍼도 같이 이동
thumbsSwiper.on("slideChange", syncMovieToCenterThumb);

/* 소식 */
const noticeTabs = document.querySelectorAll(".newinfo li");
const noticeContents = document.querySelectorAll(".tab-con");

noticeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    noticeTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    noticeContents.forEach((content) => content.classList.remove("active"));

    const target = tab.dataset.target;
    const targetContent = document.querySelector(`.${target}`);

    if (targetContent) {
      targetContent.classList.add("active");
    }
  });
});