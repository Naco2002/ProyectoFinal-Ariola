document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutForm = document.getElementById('checkoutForm');
    const paymentDetails = document.getElementById('paymentDetails');
    const formCheckout = document.getElementById('formCheckout');

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.textContent = `Producto ID: ${item.id} - Precio: $${item.price} x ${item.quantity}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Eliminar';
            removeBtn.addEventListener('click', () => removeItem(item.id));
            li.appendChild(removeBtn);
            cartItems.appendChild(li);
        });
        cartTotal.textContent = total.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(id, price) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ id, price, quantity: 1 });
        }
        updateCart();
    }

    function removeItem(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index > -1) {
            cart.splice(index, 1);
        }
        updateCart();
    }

    function emptyCart() {
        cart.length = 0;
        updateCart();
    }

    function handleCheckout() {
        checkoutForm.style.display = 'block';
    }

    document.getElementById('productList').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const productId = parseInt(event.target.getAttribute('data-id'), 10);
            const productPrice = parseFloat(event.target.getAttribute('data-price'));
            addToCart(productId, productPrice);
        }
    });

    document.getElementById('emptyCartBtn').addEventListener('click', function() {
        emptyCart();
    });

    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }
        handleCheckout();
    });

    document.getElementById('payment').addEventListener('change', function(event) {
        if (event.target.value === 'creditCard') {
            paymentDetails.style.display = 'block';
        } else {
            paymentDetails.style.display = 'none';
        }
    });

    formCheckout.addEventListener('submit', function(event) {
        event.preventDefault();
        localStorage.removeItem('cart');
        alert('Gracias por tu compra. ¡Hasta la próxima!');
        checkoutForm.style.display = 'none';
        emptyCart();
    });

    updateCart();
});
