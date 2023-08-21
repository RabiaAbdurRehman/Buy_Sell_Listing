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

        // $(`<li class="product">`).text(product.title).appendTo($productsList);
        // $(`<li class="product">`).text(product.price).appendTo($productsList);
        // $(`<li class="product">`).html(`<img src="${product.image_url}" alt="${product.title}">`).appendTo($productsList);
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
              <li class="products" data-productId="${product.id}">
                <p>${product.title}</p>
                <p>${product.price}</p>
                <img src="${product.image_url}" alt="${product.title}">
              </li>
             `);
           $productsList.append(productElement);
         }
         $("#search").val("");
      });
    });

});
