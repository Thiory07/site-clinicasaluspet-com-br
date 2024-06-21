// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import our custom CSS
import '../scss/style.scss'


const toggleelements  = document.querySelectorAll('.js-wpp-form-toggle');
const elContent = document.querySelector("#ts__form");
const realForm_text = document.querySelector('#real-form [name="text"]');
const realFotm_submit = document.querySelector('#real-form [type="submit"]');
const cookie_bannner = document.querySelector('#cookie-banner');
const overlay = document.querySelector('#overlay');
let params = new URL(document.location).searchParams;
localStorage.gclid = params.get("gclid")?  params.get("gclid") : localStorage.gclid;

localStorage.newuser = localStorage.newuser==='false'? false : true;

toggleelements.forEach((el,i)=>{
    el.addEventListener("click", function(e) {
        e.preventDefault();
        console.log('??');
        elContent.className = "";
        elContent.classList.toggle(el.getAttribute('js-position'));
        elContent.classList.remove('d-none');
        overlay.classList.remove('d-none');
    }); 
})
document.addEventListener('click', function(e) {
    if (elContent.classList.contains('d-none')) return;

    if( !e.target.matches("#ts__form") && !e.target.closest("#ts__form") && ! e.target.matches('.js-wpp-form-toggle') && !e.target.closest('.js-wpp-form-toggle') ){
        elContent.classList.add('d-none');
        overlay.classList.add('d-none');
    }
});






var g_ts_config = {
    CSSEmail :'[type="email"]',
    CSSPhoneNumber : '[type="tel"]',
    country_code: '+55',
    CSSSubmitButton: '[type="submit"]'
}
window.g_ts_obj= window.g_ts_obj||{};

document.addEventListener('input',function(e){
    var input = e.target,
   isEmail = input.matches(g_ts_config.CSSEmail),
   isPhoneNumber = input.matches(g_ts_config.CSSPhoneNumber);
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

document.querySelector('#whatsapp-form-button').addEventListener('click',  function(e){
    e.preventDefault();
    let form = e.target.closest('form');
    realForm_text.value = `Gostaria de marcar uma consulta, meu celular é ${g_ts_obj.phone_number}`;

    let gclid = window.localStorage.gclid,
    url = `https://script.google.com/macros/s/AKfycbwFgFQVRY7Y9wji-A4i1T61jFzzqWhhUQMIWGoEIWmI8gA0o92kQqNVL9dtGfw23LU/exec?email=${g_ts_obj.email}&telephone=${g_ts_obj.phone_number}&ad_user_data=${localStorage.cookiesstatus}&ad_personalization=${localStorage.cookiesstatus}`;

    if (window.localStorage.gclid && window.localStorage.gclid!=''){url+=`&gclid=${gclid}`}

    if ( form.checkValidity()){
    fetch( url,{
        redirect: "follow",
        method: "GET",
        // body: JSON.stringify(g_ts_obj),
        // headers: {
        //     "Content-Type": "text/plain;charset=utf-8",
        // },
        mode: 'no-cors'
    })
    .then(response => { });
    }

    console.log(localStorage.newuser);
    if (!sessionStorage.fired_Contato_Enhanced ){
        gtag('set', 'user_data', g_ts_obj);
        // GA4
        gtag('event', 'contact_form', {
            'tipo': 'enhanced',
            'send_to': g__googleParams.configs[1],
            "new_customer": localStorage.newuser
        });
        // Ads Enhanced
        gtag('event', 'conversion', {
            'send_to': `${g__googleParams.configs[0]}/PfNJCK3DjrkZENKShO09`,
            "new_customer": localStorage.newuser
        });
        localStorage.newuser = false;
        sessionStorage.fired_Contato_Enhanced = true;
    }
    
    realFotm_submit.click();

});


function consentUpdate(e){
    window.g__googleParams.consent = {};
    let ads_data_redaction = false;
    let status = 'denied';
    let event = 'default';
    if ( e.target.classList.contains('reject')){
        window.g__googleParams.consent= {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        }
        ads_data_redaction = false;
        status = 'denied';
        localStorage.consent_status = status;
        event = 'update';
        console.log('Consent denied');
    }
    if ( e.target.classList.contains('accept')){
        window.g__googleParams.consent= {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
        }
        ads_data_redaction = true;
        status = 'granted';
        localStorage.consent_status = status;
        console.log('Consent granted');
        event = 'update';
    }
   

      gtag('consent', event, g__googleParams.consent);
      gtag("set", "ads_data_redaction", ads_data_redaction);

      g__googleParams.configs.forEach( (conf,i)=>{
        gtag('config', `${conf}`, { 'allow_enhanced_conversions':true });
      });
      sessionStorage.cookiesstatus = status;
      localStorage.cookiesstatus = status;
      cookie_bannner.classList.add('d-none');
      overlay.classList.add('d-none');
      gtag('event', 'consent_click', {
        'tipo': status,
        'send_to': g__googleParams.configs[1]
      });
}

document.querySelectorAll('.cookie-consent-banner__cta').forEach( (el,i) =>{
    el.addEventListener('click', consentUpdate);
});

if (!sessionStorage.cookiesstatus || sessionStorage.cookiesstatus == 'denied' || localStorage.consent_status != 'granted'){
    cookie_bannner.classList.remove('d-none');
    overlay.classList.remove('d-none');
}


document.querySelectorAll('.ga4-click').forEach( (el,i)=>{
    el.addEventListener('click',(e)=>{
        let element =  console.log(el.textContent.trim());
        gtag('event', 'contact_click', {
            'tipo': el.textContent.trim(),
            'send_to': g__googleParams.configs[1],
            'new_customer': localStorage.newuser
          });
          localStorage.newuser = false;
    });
});
document.querySelectorAll('.ads-click').forEach( (el,i)=>{
    el.addEventListener('click',(e)=>{
        console.log(el.textContent.trim());
        if( sessionStorage.fired_Contato_simples){ return; }
        sessionStorage.fired_Contato_simples= true;
        gtag('event', 'conversion', {
            'send_to': `${g__googleParams.configs[0]}/cn1vCO2447gZENKShO09`,
            'new_customer':localStorage.newuser
        });
        localStorage.newuser = false;
    });
});


setTimeout(function () {
    var adBoxEl = document.querySelector(".ad-box")
    var hasAdBlock = window.getComputedStyle(adBoxEl)?.display === "none"
    if (hasAdBlock){
        document.querySelector('.reject').click();
    }
  }, 2000);

