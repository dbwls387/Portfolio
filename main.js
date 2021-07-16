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

  console.log(event.target.dataset.link);
  const scrollTo = document.querySelector(link); 
  scrollTo.scrollIntoView({behavior: 'smooth'});
});