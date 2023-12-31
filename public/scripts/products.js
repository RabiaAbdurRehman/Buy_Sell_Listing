// Client facing scripts here
$(() => {
  $("#fetch-products").on("click", () => {
    $.ajax({
      method: "GET",
      //url: '/api/products',
      url: '/api/index',
    }).then((response) => {
      console.log("We are here,", response.products);
      //const $productsList = $("#products");
      const $productsList = $("#index");
      $productsList.empty();

      for (const product of response.products) {
        let productElement = $(`
        <div class="product-container">
        <li class="products" data-productId="${product.id}">
          <img src="${product.image_url}" alt="${product.title}">
          <p>${product.title}</p>
          <p>${product.price}</p>

        </li>
      </div>
           `);
        $productsList.append(productElement);
      }
    });
  });

    $("#slide").on( "submit", function(event) {
      event.preventDefault();
    const txt = $("#search").val();
      console.log('Search query:', txt);
      $.ajax({
        method: "GET",
        //url: '/api/products/filter', RENAMED TO INDEX (RABIA'S)
        url: '/api/index/filter',
        data: {
          txt: txt
        }
      })
      .then((response) => {
        console.log("eventhandler", response);
        const $productsList = $("#searchResults");
        $productsList.empty();


        for (const product of response.products) {
            let productElement = $(`
            <div class="item" id="product-card-${product.id}">
            <img class="image" src="${product.image_url}" alt="Product Image" %>
            <div class="item-details">
              <a>${product.title}</a>
              <a>$${product.price}</a>
              <i class="fa-regular fa-heart likedIcone heartImage" id="heart-product-${product.id}" data-productid="${product.id}"></i>

            </div>
          </div>
             `);
           $productsList.append(productElement);
         }
         $("#search").val("");
      });
    });

});