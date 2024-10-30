let product_10 = document.getElementById('product_10');
let product_1 = document.getElementById('product_1');
let product_2 = document.getElementById('product_2');
let product_3 = document.getElementById('product_3');
let product_4 = document.getElementById('product_4');
let product_5 = document.getElementById('product_5');
let product_6 = document.getElementById('product_6');
let product_7 = document.getElementById('product_7');
let product_8 = document.getElementById('product_8');
let product_9 = document.getElementById('product_9');
let product_11 = document.getElementById('product_11');

let cart = document.querySelector('.cart');  // корзина 
let rack = document.querySelector(".container_products"); 
let count = 0;

cart.ondragover = allowDrop;

function allowDrop(e) {
    e.preventDefault();
}

let products =[
    product_1, product_10, product_11, product_2, product_3,
    product_4, product_5, product_6 , product_7, product_8,
    product_9
];

products.forEach(product =>{
    product.onmousedown = function(e) {
        startDrag(e, product);
    };

    product.ontouchstart = function(e) {
        startDrag(e.touches[0], product); 
    };


    function startDrag (e){
        let sizeW = product.offsetWidth;
        let sizeH = product.offsetHeight;

        product.style.position = 'fixed';

        let placeholder = document.createElement('div');
        placeholder.className = 'placeholder';

        placeholder.style.height = "10px";
        placeholder.style.width = "20px";

        if(product == product_6){
            placeholder.style.gridColumn = "span 2";
        }

        changeElement();

        function changeElement(){
            product.style.width = sizeW  + 'px';
            product.style.height = sizeH + 'px';

            product.position = 'fixed';

            moveAt(e);

            product.parentNode.replaceChild(placeholder, product);
            document.getElementById('block4').appendChild(product);
            product.style.zIndex = 3;
        }

        

        function moveAt(e){
            product.style.left = e.pageX - product.offsetWidth / 2 + 'px';
            product.style.top = e.pageY - product.offsetHeight / 2 + 'px';

            let cartRect = cart.getBoundingClientRect();
            let productRect = product.getBoundingClientRect();
            

            if (productRect.left < cartRect.right &&
                productRect.right > cartRect.left &&
                productRect.top < cartRect.bottom &&
                productRect.bottom > cartRect.top) {

                let centerX = cartRect.left;
                let centerY = cartRect.bottom - product.offsetHeight;;
                    
                product.style.left = centerX + 'px';
                product.style.top = centerY + 'px';
            
                document.onmousemove = null;
                document.ontouchmove = null;
                ++count;
            }

            function createButton(){
                if(count > 2 && !document.querySelector('.container_button')){
                    let button = document.createElement('button');
                    button.className = 'container_button';
                    button.innerHTML = "<a href='https://lavka.yandex.ru' style='color: inherit; text-decoration: none;'>Оплатить корзину</a>";
            
                    let zone = document.querySelector('.container_block2');
                    zone.appendChild(button);
                }
                console.log(count);
            }
            
            createButton();
    }

    document.onmousemove = function(e){
        moveAt(e);
    }

    product.onmouseup = function(){
        document.onmousemove = null;
        document.ontouchmove = null
        product.onmouseup = null;
    }
    document.ontouchmove = function(e) {
        moveAt(e.touches[0]); 
    };

    product.ondragstart = function() {
        return false;
      };
   }
});


