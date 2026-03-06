let cart = [];

// Affiche le nombre d'articles dans l'icône
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

// Affiche le détail dans le panneau
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += Number(item.price);
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price}€</div>
      </div>
      <div class="cart-item-remove" data-index="${index}">✖</div>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = total;
}

// Ajouter un produit au panier
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = button.dataset.price;
    const img = button.dataset.img;
    cart.push({name, price, img});
    updateCartCount();
    renderCart();
    document.querySelector('.cart-sidebar').classList.add('active');
  });
});

// Supprimer un produit
document.getElementById('cart-items').addEventListener('click', (e) => {
  if(e.target.classList.contains('cart-item-remove')){
    const index = e.target.dataset.index;
    cart.splice(index,1);
    updateCartCount();
    renderCart();
  }
});

// Ouvrir/fermer le panier
document.querySelector('.cart-icon').addEventListener('click', () => {
  document.querySelector('.cart-sidebar').classList.toggle('active');
});

// Bouton paiement
document.getElementById('checkout-btn').addEventListener('click', () => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'checkout.html';
});
