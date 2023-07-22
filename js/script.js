// Function to fetch products from the API
function getProducts() {
  fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((data) => {
      products = data.products;
      displayItems(products);
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
    });
}

// Function to display products on the page
function displayItems(items) {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';

  items.forEach((item) => {
    const productCard = document.createElement('div');
    productCard.classList.add('card');

    productCard.innerHTML = `
      <div class="card-body">
        <img src="${item.thumbnail}" alt="${item.title}" class="product-thumbnail">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description}</p>
        <p class="card-price">$${item.price}</p>
      </div>
    `;

    productContainer.appendChild(productCard);
  });
}

// Fetch products and display them on the page
let products = [];

fetch('https://dummyjson.com/products')
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then((data) => {
    console.log(data); // Log the API response to inspect the data structure
    if (Array.isArray(data.products)) {
      products = data.products;
      displayItems(products);
    } else {
      console.error('Products data is not an array.');
    }
  })
  .catch((error) => {
    console.error('Error fetching products:', error);
  });

// Event listener for the cart icon click
document.getElementById('cartIcon').addEventListener('click', () => {
  const cartContainer = document.getElementById('cartContainer');
  cartContainer.classList.toggle('show');
});

// Function to navigate to the cart page (cart.html) with cart items as query parameter
function goToCartPage() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemIds = cartItems.map(item => item.id).join(',');
  window.location.href = `cart.html?items=${cartItemIds}`;
}




// Event listener for the "Go to Cart" button
document.getElementById('goToCartBtn').addEventListener('click', goToCartPage);

// Function to display products on the page
function displayItems(items) {
  const productContainer = document.getElementById('productContainer');

  items.forEach((item) => {
    const productCard = document.createElement('div');
    productCard.classList.add('card');
    productCard.innerHTML = `
      <div class="card-body">
        <img src="${item.thumbnail}" alt="${item.title}" class="product-thumbnail">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-price">$${item.price}</p>
        <div class="btn btn-primary add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</div>
      </div>
    `;
    productContainer.appendChild(productCard);
  });
}

// Function to add items to the shopping cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingItemIndex = cartItems.findIndex((item) => item.id === productId);

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity++;
  } else {
    cartItems.push({
      id: productId,
      thumbnail: product.thumbnail,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCount();
  updateCartContainer();
}

// Function to update cart count in the navbar
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartCount = document.getElementById('cartCount');
  const totalCount = cartItems.reduce((total, item) => total + item.quantity - 1, 0);
  cartCount.innerText = totalCount;

  // Update the cart count in local storage
  localStorage.setItem('cartCount', totalCount);
}

// Function to update cart container content
function updateCartContainer() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsDiv = document.querySelector('.shopping-cart');
  cartItemsDiv.innerHTML = '';

  cartItems.forEach((item) => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    const thumbnail = document.createElement('img');
    thumbnail.src = item.thumbnail;
    cartItemDiv.appendChild(thumbnail);

    const title = document.createElement('div');
    title.classList.add('title');
    title.innerText = item.title;
    cartItemDiv.appendChild(title);

    const price = document.createElement('div');
    price.classList.add('price');
    price.innerText = `$${item.price}`;
    cartItemDiv.appendChild(price);

    const quantityInput = document.createElement('input');
    quantityInput.classList.add('quantity-input');
    quantityInput.type = 'number';
    quantityInput.min = 1;
    
    quantityInput.value = item.quantity;
    quantityInput.addEventListener('change', (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      if (newQuantity >= 1) {
        item.quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        updateCartContainer();
      }
    });
    cartItemDiv.appendChild(quantityInput);

    cartItemsDiv.appendChild(cartItemDiv);
  });
}

// Fetch products and update cart count on page load
function getProducts() {
  // Simulate fetching products from the server
  setTimeout(() => {
    displayItems(products);
  }, 500);
}

getProducts();
updateCartCount();


