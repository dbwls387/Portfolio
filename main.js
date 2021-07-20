'use strict' 


// navbar 올라가면 투명, 아니면 하늘색으로 만들기 
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  //console.log(window,scrollY);
  //console.log('navbarHeight: ${navbarHeight}');

  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {    
    navbar.classList.remove('navbar--dark');
  }
});

// navbar의 메뉴를 선택했을 시 스크롤링 해주기 
const navbarMenu = document.querySelector('.navbar__menu'); 
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if(link == null){ // navbar의 빈 공간을 누를 경우 
    return; 
  }
  navbarMenu.classList.remove('open'); 
  scrollIntoView(link);
});

// 화면이 작을 때 navbar toggle button 
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn'); 
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open'); 
})

// "contact me" 클릭 시 '컨택트 미'로 스크롤링 
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// 스크롤을 내릴수록 home 화면이 조금씩 투명해지게 만들기 
const home = document.querySelector('.home__container'); 
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
  
});

// 스크롤을 내렸을 때 arrow-up 버튼 나타내기 
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight /2) {
    arrowUp.classList.add('visible'); 
  } else {
    arrowUp.classList.remove('visible'); 
  }
});

// "arrow-up" 버튼 클릭했을 때 
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Projects 
const workBtnContainer = document.querySelector('.work__categories'); 
const projectContainer = document.querySelector('.work__projects'); 
const projects = document.querySelectorAll('.project'); 
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null){
    return;
  }

  // 이전에 선택된 아이템에서 셀렉션을 없애고 새로 클릭된 곳에 넣어주기 
  const active = document.querySelector('.category__btn.selected'); 
  active.classList.remove('selected'); 
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected'); 

  //console.log(filter); 
  projectContainer.classList.add('anim-out'); 
  setTimeout(() => {
    projects.forEach((project) => {
      //console.log(project.dataset.type); 
      if(filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    }); 
    projectContainer.classList.remove('anim-out'); 
  }, 300);  
}); 



//1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다. 
//2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다. 
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다. 
// 1번 
const sectionIds = [
  '#home', 
  '#about', 
  '#skills', 
  '#work', 
  //'#testimonials', 
  '#contact', 
]; 

const sections = sectionIds.map(id => document.querySelector(id)); 
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
//console.log(sections);
//console.log(navItems);

//2번 
let selectedNavIndex = 0; 
let selectedNavItem = navItems[0]; 
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active'); 
  selectedNavItem = selected; 
  selectedNavItem.classList.add('active'); 
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector); 
  scrollTo.scrollIntoView({behavior: 'smooth'});
  selectNavItem(navItems[sectionIds.indexOf(selector)]); 
}

const observerOptions = {
  root: null, 
  rootMargin: '0px', 
  threshold: 0.3, 
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    //console.log(entry.target);  
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴 
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1; 
      } else {
        selectedNavIndex = index - 1; 
      }
    }
  });
};

//3번 
const observer = new IntersectionObserver(observerCallback, observerOptions); 
sections.forEach(section => observer.observe(section)); 

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight) {
      selectedNavIndex = navItems.length - 1;
    } 
    selectNavItem(navItems[selectedNavIndex]); 
});