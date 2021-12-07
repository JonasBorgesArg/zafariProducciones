ScrollReveal().reveal('.inicio');
ScrollReveal().reveal('.nuestro-equipo', {delay: 300});
ScrollReveal().reveal('.nuestros-trabajos', {delay: 300});
ScrollReveal().reveal('.seccion', {delay: 300});
ScrollReveal().reveal('.ig', {delay: 300});

/*************SLIDE IMAGENES*************/
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 5000);
}

/*************MODAL*************/


var modal = document.getElementById('myModal');

var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");

img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;

}

var span = document.getElementsByClassName("cerrar")[0];

span.onclick = function() { 
  modal.style.display = "none";
}

/*************FORMULARIO*************/
function contactFormValidations(){
  const $form = document.querySelector(".contact-form")
  const $inputs = document.querySelectorAll(".contact-form [required]")

  $inputs.forEach(input =>{
    const $span = document.createElement("span")
    $span.id = input.name
    $span.textContent = input.title;
    $span.classList.add("contact-form-error","none")
    input.insertAdjacentElement("afterend",$span)

  })

  document.addEventListener("keyup", (e)=>{
    if(e.target.matches(".contact-form [required]")){
      let $input = e.target
      let pattern = $input.pattern || $input.dataset.pattern

      if(pattern && $input.value !==""){
        //console.log("si") 
        let regEx = new RegExp(pattern)
        return !regEx.exec($input.value)
          ? document.getElementById($input.name).classList.add("is-active")
          : document.getElementById($input.name).classList.remove("is-active")
      } 

      if(!pattern){
        //console.log("no")
        return $input.value === ""
          ? document.getElementById($input.name).classList.add("is-active")
          : document.getElementById($input.name).classList.remove("is-active")
      }
    }
  })

  document.addEventListener("submit", (e)=>{
    //e.preventDefault()

    const $loader = document.querySelector(".contact-form-loader");
    const $response = document.querySelector(".contact-form-response");

    $loader.classList.remove("none")

    setTimeout(()=>{
      $loader.classList.add('none')
      $response.classList.remove('none')
      $form.reset()

      setTimeout(()=> $response.classList.add('none'), 3000)
    },3000);
  })
}

/*************MENU HAMBURGUESA*************/
function menuHamburguesa(panelBtn, navMenu, menuLink){

  document.addEventListener("click", (e)=>{
    //el * hace referencia a todos sus elementos hijos (el boton, las tres lineas)
    if(e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)){
      document.querySelector(navMenu).classList.toggle("is-active")
      document.querySelector(panelBtn).classList.toggle("is-active")
    }
  
    if(e.target.matches(menuLink)){
      document.querySelector(navMenu).classList.remove("is-active")
      document.querySelector(panelBtn).classList.remove("is-active")
    }
  })
}

/*************CONEXION DE RED*************/
function networkStatus(){
  const isOnline =()=>{

    const $div= document.createElement("div");

    if(navigator.onLine){
      $div.textContent = "Conexion Reestablecida";
      $div.classList.add("online");
      $div.classList.remove("offline");
    }else{
      $div.textContent = "Conexion Perdida";
      $div.classList.add("offline");
      $div.classList.remove("online");
    }
  document.body.insertAdjacentElement("afterbegin", $div);
  setTimeout(()=> document.body.removeChild($div),2000)
  }

window.addEventListener("online", e=> isOnline())
window.addEventListener("offline", e=> isOnline())
}

document.addEventListener("DOMContentLoaded", (e)=>{
  contactFormValidations()
  menuHamburguesa(".panel-btn", ".nav-menu", ".nav-menu a");
  networkStatus()
})