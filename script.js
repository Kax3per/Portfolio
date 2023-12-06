
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
    link.download = 'index.html'; // Nazwa pliku do pobrania
    document.body.appendChild(link); // Dodanie linku do ciała dokumentu
    link.click(); // Emulacja kliknięcia linku
    document.body.removeChild(link); // Usunięcie linku
  }




                //IMAGES SEARCGER 

const apiKey1 = 'c-aUlGUqNBtmwXhX3heJQ42hOR-8mHNH9PNYZHrfcCE';

async function searchImages() {
    const searchInput = document.getElementById("searchInput").value;
    const imageResult = document.getElementById("imageResult");
    imageResult.innerHTML = "";

    if (!searchInput) {
        alert("Enter a description of the image to search.");
        return;
    }

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchInput}&client_id=${apiKey1}`);
    const data = await response.json();

    if (data.results.length === 0) {
        imageResult.textContent = "No search results.";
        return;
    }

    data.results.forEach(result => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        imageResult.appendChild(image);


    });
}




//WEATHER APP
const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
arrowBack = wrapper.querySelector("header i")

apiKey = "02b45911ed33529e70c9a0baffd21d0e"; // Replace with your actual API key
let api;

inputField.addEventListener("keyup", (e) => {
if (e.key == "Enter" && inputField.value != "") {
  requestApi(inputField.value);
}
});

locationBtn.addEventListener("click", () => {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
  alert("Your browser does not support geolocation api");
}
});

function requestApi(city) {
api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
fetchData();
}

function onSuccess(position) {
const { latitude, longitude } = position.coords;
api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
fetchData();
}

function onError(error) {
infoTxt.innerText = error.message;
infoTxt.classList.add("error");
}

function fetchData() {
infoTxt.innerText = "Getting weather details...";
infoTxt.classList.add("pending");
fetch(api)
  .then((res) => res.json())
  .then((result) => weatherDetails(result))
  .catch(() => {
    infoTxt.innerText = "Something went wrong, API Error";
    infoTxt.classList.replace("pending", "error");
  });
}

function weatherDetails(info) {
if (info.cod == "404") {
  infoTxt.classList.replace("pending", "error");
  infoTxt.innerText = `${inputField.value} isn't a valid city name`;
} else {
  const city = info.name;
  const country = info.sys.country;
  const { description, id } = info.weather[0];
  const { temp } = info.main;

  // Kody do wyboru ikony zostały zachowane dla Twojej referencji

  weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
  weatherPart.querySelector(".weather").innerText = description;
  weatherPart.querySelector(
    ".location span"
  ).innerText = `${city}, ${country}`;

  infoTxt.classList.remove("pending", "error");
  infoTxt.innerText = "";
  inputField.value = "";
  wrapper.classList.add("active");

  arrowBack.addEventListener("click", () => {
wrapper.classList.remove("active");
});

}
}   
 



// BOOK


