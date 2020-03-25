    
  function getVideo() {
    $.ajax({
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
          key:"AIzaSyC6qXqF62A9At8K_rX0YbAhcyhGwLtd6Tg",
          q: $('#js-search-term').val() + "skate video skateboard skateboarder skater",
          part: 'snippet',
          maxResults: 1,
          type: 'video',
          videoEmbeddable: true,
      },
      success: function(data){
          embedVideo(data)
      },
      error: function(response){
          console.log("Request Failed");
      }
    });

  }

  function embedVideo(data) {
  $('.firstVid').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
  $('h3').text(data.items[0].snippet.title)
  $('.description').text(data.items[0].snippet.description)
  }



function watchForm() {
  $('.form1').submit(event => {
    event.preventDefault();
    getVideo();
    $('.itsTheVideoStuff').removeClass('hidden');
  });
}
$(watchForm);