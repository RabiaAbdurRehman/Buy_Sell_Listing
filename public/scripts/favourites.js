
$(() => {
  $('#fetch-favourites').on('click', () => {
    $.ajax({
      method: 'POST',
      url: '/api/favourites'
    })
    .done((response) => {
      const $favouriteList = $('#favourite');
      $favouriteList.empty();

      for(const favourite of response.favourites) {
        $(`<li class="favourite">`).text(favourite.product_id).appendTo($favouriteList);
      }
    });
  });
});
