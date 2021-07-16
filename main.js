'use strict' 


// navbar 올라가면 투명, 아니면 하늘색으로 만들기 
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  console.log(window,scrollY);
  console.log('navbarHeight: ${navbarHeight}');

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

  scrollIntoView(link);
});

// "contact me" 클릭 시 컨택트 미로 스크롤링 
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector); 
  scrollTo.scrollIntoView({behavior: 'smooth'});
}