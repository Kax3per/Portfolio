
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};



let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });



let header = document.querySelector('.header');

header.classList.toggle('sticky', window.scrollY > 100);



menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

};



var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});



let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};



ScrollReveal({
   
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });


                                //CODEEDITOR
                                
 
  var codeSections = document.querySelectorAll('.code-section');

  codeSections.forEach(section => {
    section.addEventListener('click', function() {

      codeSections.forEach(s => s.classList.remove('clicked'));

      this.classList.add('clicked');
    });
  });
  



    var j = 0;

    function update(i) {
      if (i == 0) {
        let htmlCode = document.getElementById("htmlCode").value;
        let cssCode = document.getElementById("cssCode").value;
        let javascriptCode = document.getElementById("javascriptCode").value;
        let text = htmlCode + "<style>" + cssCode + "</style>" + "<scri" + "pt>" + javascriptCode + "</scri" + "pt>";
        let iframe = document.getElementById('viewer').contentWindow.document;
        iframe.open();
        iframe.write(text);
        iframe.close();
      } else if (i == 1) {
        let htmlCode = document.getElementById("htmlCode").value;
        let html = htmlCode.slice(0, htmlCode.length);
        document.getElementById("htmlCode").value = html;
        j = 1;
      }
    }

    function handleTabKey(event, textarea) {
      if (event.keyCode === 9) {
        event.preventDefault();
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;

        textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }

      if (event.keyCode == 8) {
        update(1);
      }
    }



    var j = 0;

function update(i) {
  if (i == 0) {
    let htmlCode = document.getElementById("htmlCode").value;
    let cssCode = document.getElementById("cssCode").value;
    let javascriptCode = document.getElementById("javascriptCode").value;
    let text = htmlCode + "<style>" + cssCode + "</style>" + "<scri" + "pt>" + javascriptCode + "</scri" + "pt>";
    let iframe = document.getElementById('viewer').contentWindow.document;
    iframe.open();
    iframe.write(text);
    iframe.close();
  } else if (i == 1) {
    let htmlCode = document.getElementById("htmlCode").value;
    let html = htmlCode.slice(0, htmlCode.length);
    document.getElementById("htmlCode").value = html;
    j = 1;
  }
}

function handleTabKey(event, textarea) {
  if (event.keyCode === 9) {
    event.preventDefault();
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;

    textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 1;
  }

  if (event.keyCode == 8) {
    update(1);
  }
}







  function toggleBackgroundColor() {
    const body = document.querySelector('body');
    const currentColor = body.style.backgroundColor || getComputedStyle(body).backgroundColor;
    body.style.backgroundColor = currentColor === 'rgb(243, 243, 243)' ? '#f9f9f9' : '#f3f3f3'; // Zmiana koloru tła
  }


  // Funkcja do zapisu połączonego pliku HTML
  function saveHTMLFile() {
    const htmlContent = document.getElementById('htmlCode').value; // Zawartość HTML
    const cssContent = document.getElementById('cssCode').value; // Zawartość CSS
    const jsContent = document.getElementById('javascriptCode').value; // Zawartość JavaScript

    // Funkcja do zabezpieczenia zawartości CSS przed znakami specjalnymi
    function escapeHtml(unsafe) {
      return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Tworzenie kodu HTML z połączonych części
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Code Editor Output<\/title>
        <style>${escapeHtml(cssContent)}<\/style>
      <\/head>
      <body>
        ${htmlContent}
        <script>${jsContent}<\/script>
      <\/body>
      <\/html>
    `;

    const blob = new Blob([fullHTML], { type: 'text/html' }); // Tworzenie Blob z zawartością
    const url = URL.createObjectURL(blob); // Tworzenie URL z Blob
    const link = document.createElement('a'); // Tworzenie elementu <a> do zapisu
    link.href = url;
    link.download = 'Mypage.html'; // Nazwa pliku do pobrania
    document.body.appendChild(link); // Dodanie linku do ciała dokumentu
    link.click(); // Emulacja kliknięcia linku
    document.body.removeChild(link); // Usunięcie linku
  }

