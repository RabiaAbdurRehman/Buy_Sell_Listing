$(() => {
  $('#searchResults').on('click', '.likedIcone', (event) => {
    let productId = event.currentTarget.dataset.productid;  //<i data-productid="1" data-title="Test"></i>
                                                            //element.dataset.title
    console.log("Favourite.js", productId);
    $.ajax({
      method: 'POST',
      data: { productId },
      url: '/api/favourites'
    })
      .done((response) => {
        console.log(response);
        $(`#heart-product-${productId}`).toggleClass("clicked");

      });
  });

});
