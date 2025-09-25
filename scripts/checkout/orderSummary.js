import {cart, removeFromCart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';

import {renderPaymentSummary} from './paymentSummary.js';

export function renderOrderSummary() {
  let cartSummaryHTML = ''; 

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
     
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // function deliveryOptionsHTML(matchingProduct, cartItem) {
    // let html = '';

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();

        renderPaymentSummary();
      });
    });

  // document.querySelectorAll('.js-delivery-option')
  //   .forEach((element) => {
  //     element.addEventListener('click', () => {
  //       const {productId, deliveryOptionId} = element.dataset;
  //       updateDeliveryOption(productId, deliveryOptionId);
  //       renderOrderSummary();
  //       renderPaymentSummary();
  //     });
  //   });
}


        // <div class="delivery-date">
        //   Delivery date: ${dateString}
        // </div>

          // <div class="delivery-options">
          //   <div class="delivery-options-title">
          //     Choose a delivery option:
          //   </div>
          //   ${deliveryOptionsHTML(matchingProduct, cartItem)}
          // </div>