window.addEventListener('DOMContentLoaded', () => {
  const iconElement = document.querySelector("#icon");
  iconElement.addEventListener('click',showFun);

  let menuElement = document.querySelectorAll('.menu');
  menuElement.forEach((item) => { 
    item.addEventListener('click', showSubMenu ) ;
  });
 

  
  function showFun() {
    let menuElement = document.querySelector("#menu");
    menuElement.classList.toggle("hidden");
  }
  
  
  function showSubMenu() { 
    let subMenu = this.querySelectorAll('.sub-menu');
        if( subMenu[0]){
        subMenu[0].classList.toggle('hidden');

     }else {
        showFun();
    };
  }

  const boxShop = document.querySelector('#box-shop');
  const cartContent = document.querySelector('.cart-content');
  const closeCartShop = document.querySelector('#closeCart');

  boxShop.onclick = () =>{
    cartContent.style.display = "block";
  }

    closeCartShop.onclick = () =>{
    cartContent.style.display = "none";
  }



    //Модальне вікно - зворотній звязок
    let modal = document.querySelector('#myModal')
    let Tell = document.querySelector('#Tell')
    let close = document.querySelector('.close')
    let next = document.querySelector('.FormNext')
    
    Tell.onclick = () => {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    };
  
    close.onclick = () => {
      modal.style.display = "none";
      document.body.style.overflow = "visible";
    };
    
  
    window.onclick = (e) => {
      if(e.target == modal){
        modal.style.display = "none"; 
        document.body.style.overflow = "visible";
      }
    };
    
    document.addEventListener('keydown',(e) =>{
    if(e.code ==="Escape"){
      modal.style.display = "none"; 
     };
    });

   //Спливаюче вікно в кінці сторінки сайта
   function showMobalByScroll(){
    if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
      removeEventListener('scroll',showMobalByScroll);
    };
   }

   window.addEventListener('scroll',showMobalByScroll);
 
   //*-----------------------------------------------------------------------*/
  
   //Таби для меню
    const tabContent = document.querySelectorAll(".tabcontent");
    const tabs =  document.querySelectorAll(".tab");
    const perent = document.querySelector(".header");

    function hideTabContent () {
      tabContent.forEach(item => {
        item.style.display = "none";
      });
    }

    function showTabContent (i=0) {
        tabContent[i].style.display = "block";
    }

    hideTabContent();
    showTabContent();

  perent.addEventListener("click", (e) =>{
    const target = e.target;
    if(target && target.classList.contains("tab")){
      tabs.forEach((item, i) =>{
        if(target == item){
          hideTabContent();
          showTabContent(i);
        };
      });
    };
  });

  //Відправлення даних форми на почту 
  next.addEventListener('click', () => {
    modal.style.display = "none";
    let name = $('#name').val();//скорочений спосіб 
    let namber = document.getElementById('namber').value.trim();
    let text = document.getElementById('text').value;

    if(name == "" || name ==" " ){
      $("#errorMess").text("Введіть імя");
      return false;
    }
    else if(namber == "" || namber ==" " ){
      $("#errorMess").text("Введіть номер");
      return false;
    };
    $("#errorMess").text("");
  });
/*
  //Відправляє дані на php файл за допомогою технології Ajax

  $.ajax({
    url: '.../home/yevgen/Стільниця/shoping/ajax/mail.php',
    type: POST,
    cache:false,
    data: {'name': name, 'namber': namber, 'message': text},
    dataType: 'html',
    beforeSend: function(){
     next.prop('disabled', true);
    },
    success: function(data){
      if(!data){
        alert('Була помилка, повідомлення не відправлено')
      } else {
      $('#mailform').trigger("reset");
    alert(data);
    next.prop('disabled', false);
    }}
  });
  */

  //Таймер акції 

  let deadline  = '2021-06-21'

  function daysAction (endtime) {
    const t = Date.parse(endtime)- Date.parse(new Date);
      days = Math.floor(t/(1000*60*60*24)),
      hours = Math.floor(t/(1000*60*60) % 24),
      minutes = Math.floor(t/(1000*60) % 60),
      seconds = Math.floor((t/1000) % 60);

      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
  }

  function setClock (selector, endtime){
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds"),
          timeInterval= setInterval(updateClock,1000);

          updateClock ();

          function updateClock (){
            const t = daysAction (endtime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            
            if (t.total <= 0){
              clearInterval(updateClock);
            };
          };
  };

  setClock('.timer', deadline);
  
  
  // Модальне вікно при загрузки сторінки(реклама)
 /* const a = document.querySelector('.downLoadWindow');
  const closeWindow = document.querySelector('.closeDownLoad')
  const modalTimerId = setTimeout (setAction, 2000);
   

  function setAction () {
    setClock('.timer1', deadline);
    a.style.display = "block";
  }

  closeWindow.addEventListener('click', () =>{
    a.style.display = "none";
  });
  window.onclick = (e) =>{
    if(e.target == a){
      a.style.display = "none";
    };
  }
  */
  //Класи для карточків товарів
  class MenuCart {
    constructor (src, alt, title, price, key, parenSelector, ...classes){
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.price = price;
      this.key = key;
      this.classes = classes;
      this.parens = document.querySelector(parenSelector);
    }

    disignCart() {
      const element = document.createElement('div');
      if (this.classes.length === 0){
        element.classList.add('product-inner')
    } else
        {
    this.classes.forEach(className => element.classList.add(className));
        }
      element.innerHTML = `
      <article class="product">
      <div class="product-wrap">
          <img id="imgProduct"src=${this.src} alt=${this.alt} >
          <div class="actions">
              <a href="" class="quickview"></a>
       </div>
        </div>
        <div class="product-info">
          <h3 class="product-title"><a href="#"><h3>${this.title}</h3></a></h3>
          <span class="price"> UAH ${this.price}</span>
          <button class="add-to-cart" data-id=${this.key} >В корзину</button>
        </div>
        </article>
      `; this.parens.append(element);
    }
  };

  new MenuCart (
    'https://html5book.ru/wp-content/uploads/2015/10/black-dress.jpg',
    'Cart',
    'Одяг',
     499,
     "1122",
    '.container-clothing',
  ).disignCart();

  //корзина
  const productsBtn = document.querySelectorAll('.add-to-cart');
  const cartProductsList = document.querySelector('.cart-content__list');
  const cartQuantity = document.querySelector('.cart__quantity');
  const cartPrice = document.querySelectorAll('.cart-product__price')
  const fullPrice = document.querySelector('.fullprice');
  let price = 0;

  const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
  };
  
  
  const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };
  
 const normalPrice = (str) => {
   return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };


  const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
 };
  
  const minusFullPrice = (currentPrice) => {
   return price -= currentPrice;
  };

  const printFullPrice = () => {
    fullPrice.innerHTML =`${normalPrice(price)} грн`;
  };
  
  const printQuantity = () => {
    let a = document.querySelectorAll('.cart-product__text');
    let productsListLength = a.length;
    cartQuantity.innerHTML = productsListLength;
  };

  const deleteCartProduct = (productParent) =>{
    let id = productParent.querySelector('.cart-product').dataset.id;
    document.querySelector(`.product[data-id = "${id}"`).querySelector('.add-to-cart').disabled = false;
    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
    minusFullPrice(currentPrice);
    printFullPrice ();
    productParent.remove();
    printQuantity();
  } 

  const generateCartProduct = (img, title, price, id) => {
    return `
    <li class="cart-content__item">
      <article class="cart-content__product cart-product" data-id="${id}">
        <img src="${img}" alt="#" class="cart-product__img">
        <div class="cart-product__text">
          <h3 class="cart-product__title">${title}</h3>
          <span class="cart-product__price">${normalPrice(price)}</span>
        </div>
        <button class="cart-product__delete" aria-label="Удалить товар"></button>
      </article>
    </li>   
    `};
  
    productsBtn.forEach(el => {
     el.closest('.product').setAttribute('data-id', randomId());
    
      el.addEventListener('click', (Event) => {
        let self = Event.currentTarget;
        let parent = self.closest('.product');
        let id = parent.dataset.id;
        let img = parent.querySelector('#imgProduct').getAttribute('src');
        let title = parent.querySelector(".product-title").textContent;
        let priceString = parseInt(priceWithoutSpaces(parent.querySelector('.price').textContent));

        cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));  
        
        self.disabled = true;
        printQuantity ();
        plusFullPrice(priceString);
        printFullPrice ();
      });
    
    });

  cartProductsList.addEventListener('click', (Event) =>{
    if (Event.target.classList.contains('cart-product__delete')
      ) {
         deleteCartProduct(Event.target.closest('.cart-content__item'));
      }
  })
 
})

