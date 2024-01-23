import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js'
import formatCurrency  from '../util/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliverOption.js';



export function renderPaymentSummary(){
    let productPriceCent = 0;
    let shippingPriceCents = 0;
 cart.forEach((cartItem)=>{
   const product= getProduct(cartItem.productId);
   productPriceCent += product.priceCents* cartItem.quantity;
   const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId); 
    shippingPriceCents += deliveryOption.priceCents;

   
 });

const totalBeforeTaxCents = productPriceCent + shippingPriceCents;
const taxCents = totalBeforeTaxCents *0.1;
const totalCents = totalBeforeTaxCents + taxCents;
 console.log(shippingPriceCents);



 let paymentsummaryHTML = `
        
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCent)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
 `;
 document.querySelector('.js-payment-summary').innerHTML = paymentsummaryHTML;
}
