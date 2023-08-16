$(() => {
  $('#fetch-favourites').on('click', () => {
    $.ajax({
      method: 'POST',
      url: '/api/favourites'
    })
    .done((response) => {
      const $favouriteList = $('#favourite');
      $favouriteList.empty();

      // Update the list with the message
      $(`<li class="favourite">`).text(response.message).appendTo($favouriteList);
    });
  });
});
