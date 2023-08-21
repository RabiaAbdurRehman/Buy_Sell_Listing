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

        //we can check lines after when we have login.
        // const $favouriteList = $('#favourite');
        // $favouriteList.empty();

        // Update the list with the message
  //$(`<li class="favourite">`).text(response.message).appendTo($favouriteList);

        // for(const favourite of response.favourites) {
        //   $(`<li class="favourite">`).text(favourite.product_id).appendTo($favouriteList);
        // }
      });
  });


});
