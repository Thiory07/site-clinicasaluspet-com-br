// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import our custom CSS
import '../scss/style.scss'


const toggleelements  = document.querySelectorAll('.js-wpp-form-toggle');
const elContent = document.querySelector("#ts__form");

toggleelements.forEach((el,i)=>{
    el.addEventListener("click", function(e) {
        e.preventDefault();
        console.log();
        elContent.className = "";
        elContent.classList.toggle(el.getAttribute('js-position'));
        if ( elContent.classList.contains('d-none')) elContent.classList.toggle('d-none')
    }); 
})
document.addEventListener('click', function(e) {
    if (elContent.classList.contains('d-none')) return;

    if( !e.target.matches("#ts__form") && !e.target.closest("#ts__form") && ! e.target.matches('.js-wpp-form-toggle') && !e.target.closest('.js-wpp-form-toggle') ){
        elContent.classList.toggle('d-none')
    }
});






var g_ts_config = {
    CSSEmail :'[name="email"]',
    CSSPhoneNumber : '[type="tel"]',
    country_code: '+55',
    CSSSubmitButton: '[type="submit"]'
}
window.g_ts_obj= window.g_ts_obj||{};

document.addEventListener('input',function(e){
    var input = e.target,
    isEmail = input.matches(g_ts_config.CSSEmail),
    isPhoneNumber = input.matches(g_ts_config.CSSPhoneNumber);
    console.log(isEmail,input);
if (!isEmail && !isPhoneNumber) return;

if (isEmail && /\S+@\S+\.\S+/.test(input.value) ) {
    console.log('é um e-mail válido inputs' );
    g_ts_obj.email = input.value
}


if (isPhoneNumber)  {
    var tel = '+' +  (g_ts_config.country_code + input.value).replace(/\D/g,'');
    console.log(tel + 'é o telefone' );
    if (! /^\+[1-9]\d{1,14}$/.test(tel)) return;
    g_ts_obj.phone_number = tel;
}
});

document.addEventListener('click',  function(e){
var  element = e.target;
if(element.matches(g_ts_config.CSSSubmitButton) || element.closest(g_ts_config.CSSSubmitButton)) {
    console.log(g_ts_obj)
}
});