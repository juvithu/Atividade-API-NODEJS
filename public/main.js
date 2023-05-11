fetch('/api/products')
  .then(function(response) {
    return response.json();
  })
  .then(function(products) {
    var container = document.getElementById('container');
    products.forEach(function(product) {
      var element = document.createElement('div');
      element.className = 'product';
      element.innerHTML = '<h2>' + product.name + '</h2>' +
                          '<p>' + product.description + '</p>' +
                          '<span>R$ ' + product.price.toFixed(2) + '</span>';
      container.appendChild(element);
    });
  });

var form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var name = form.elements['name'].value;
    var description = form.elements['description'].value;
    var price = parseFloat(form.elements['price'].value);
        if (name && description && price) {
            fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description, price: price })
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(product) {
                    var element = document.createElement('div');
                    element.className = 'product';
                    element.innerHTML = '<h2>' + product.name + '</h2>' +
                                        '<p>' + product.description + '</p>' +
                                        '<span>R$ ' + product.price.toFixed(2) + '</span>';
                    container.appendChild(element);
                    form.reset();
                });
    }
});

var editForm = document.getElementById('edit-form');
var editProductForm = document.getElementById('edit-product-form');
var cancelEditButton = document.getElementById('cancel-edit');

function showEditForm(product) {
  editForm.style.display = 'block';
  editProductForm.elements['name'].value = product.name;
  editProductForm.elements['description'].value = product.description;
  editProductForm.elements['price'].value = product.price;
  editProductForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var name = editProductForm.elements['name'].value;
    var description = editProductForm.elements['description'].value;
    var price = parseFloat(editProductForm.elements['price'].value);
    if (name && description && price) {
      fetch('/api/products/' + product.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, description: description, price: price })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(product) {
          var element = document.getElementById('product-' + product.id);
          element.querySelector('h2').innerText = product.name;
          element.querySelector('p').innerText = product.description;
          element.querySelector('span').innerText = 'R$ ' + product.price.toFixed(2);
          editForm.style.display = 'none';
        });
    }
  });
  cancelEditButton.addEventListener('click', function() {
    editForm.style.display = 'none';
  });
}

function deleteProduct(id) {
  fetch('/api/products/' + id, {
    method: 'DELETE'
  })
    .then(function(response) {
      return response.json();
    })
    .then(function() {
      var element = document.getElementById('product-' + id);
      element.parentNode.removeChild(element);
    });
}

editButton.addEventListener('click', function() {
  showEditForm(product);
});
deleteButton.addEventListener('click', function() {
  deleteProduct(product.id);
});


