document.addEventListener('DOMContentLoaded', function() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto;">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button data-id="${product.id}" data-price="${product.price}">Añadir al carrito</button>
                `;

                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});


