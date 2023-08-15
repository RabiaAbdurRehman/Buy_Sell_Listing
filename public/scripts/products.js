// Client facing scripts here
$(() => {
  $("#fetch-products").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/api/products",
    }).then((response) => {
      console.log("We are here,", response.products);
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

        // $(`<li class="product">`).text(product.title).appendTo($productsList);
        // $(`<li class="product">`).text(product.price).appendTo($productsList);
        // $(`<li class="product">`).html(`<img src="${product.image_url}" alt="${product.title}">`).appendTo($productsList);
      }
    });
  });
});