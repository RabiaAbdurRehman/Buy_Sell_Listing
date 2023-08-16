$(() => {
  $('#products').on('click', 'li', (event) => {
    //console.log("We are here now", event.currentTarget.dataset.productid)
    let productId = event.currentTarget.dataset.productid;
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
