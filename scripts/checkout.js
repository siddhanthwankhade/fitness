import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js'
import formatCurrency  from './util/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliverOption.js';


let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let matchingProducts;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProducts = product;
        }
    });




    const deliveryOptionId = cartItem.deliveryOptionId;
    console.log(cartItem.deliveryOptionId);
    let deliveryOption;
    let dateString;
    deliveryOptions.forEach((option)=>{
      if(option.id === deliveryOptionId){
        deliveryOption = option;
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'day');
         dateString = deliveryDate.format('dddd, MMMM D');

        
      }
    })
    
   cartSummaryHTML += `
     <div class="cart-item-container js-cart-item-container-${matchingProducts.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProducts.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProducts.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProducts.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProducts.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryOptionsHTML(matchingProducts,cartItem)}
              </div>
            </div>
          </div>
`;
});


function deliveryOptionsHTML(matchingProducts,cartItem){
  let html='';


  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'day');

    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption === 0?  
    'FREE -': `$${formatCurrency(deliveryOption.priceCents)} -`


   const isCheck = (deliveryOption.id === cartItem.deliveryOptionId) ? true:false ;
   console.log(cartItem.deliveryOptionId);



   html+=`<div class="delivery-option js-delivery-option" 
   data-product-id = "${matchingProducts.id}",
   data-delivery-option-id ="${deliveryOption.id}">
   <input type="radio"  ${isCheck ? 'checked' : '' }
     class="delivery-option-input"
     name="delivery-option-${matchingProducts.id}">
   <div>
     <div class="delivery-option-date">
      ${dateString}
     </div>
     <div class="delivery-option-price">
       ${priceString} Shipping
     </div>
   </div>
 </div>`
  });
  return html;
};


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId
    removeFromCart(productId);
    console.log(productId);
   const containor = document.querySelector(`.js-cart-item-container-${productId}`);
   containor.remove();
  });
});


document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionId}  = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);

  });
});