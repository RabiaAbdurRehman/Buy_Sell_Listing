// Client facing scripts here
$(() => {
  $("#fetch-products").on("click", () => {
    $.ajax({
      method: "GET",
      url: '/api/products',
    }).then((response) => {
      console.log("We are here,", response.products);
      const $productsList = $("#products");
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
      let txt = $("#search").val();
      $.ajax({
        method: "GET",
        url: '/api/products',
        data: txt
      })
      .then((response) => {
        console.log("DId I search something", response);
        const $productsList = $("#products");
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
