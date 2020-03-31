'use strict';


const apiKey = 'AIzaSyC6qXqF62A9At8K_rX0YbAhcyhGwLtd6Tg'; 
const searchURL = 'https://www.googleapis.com/youtube/v3/search';



function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

//top video code
//populates top video and description
function displayResults(responseJson) {

  console.log(responseJson);
  let results1= responseJson.items[0].id.videoId;

  $('#results-list').empty();
  
  for (let i = 0; i < responseJson.items.length; i++){
    
    $('#results-list').append(
      `<h3>${responseJson.items[i].snippet.title}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      `);
    $('.firstVid').attr('src', 'https://www.youtube.com/embed/' + results1);
 
    $('#results').removeClass('hidden');
    $('#js-error-message').addClass('hidden');
  };
};

//top video code
//get top video
function getYouTubeVideos(query, maxResults=1) {
  const params = {
    key: apiKey,
    q: query + " skate video skateboarding",
    part: 'snippet',
    maxResults,
    type: 'video',
    videoEmbeddable: true,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`).removeClass('hidden');
    });
}



//playlist code
//populates playlist video
function displayResults2(responseJson) {
 
  console.log(responseJson);
  let results2= responseJson.items[0].id.playlistId;

  $('#results-list2').empty();
  
  for (let i = 0; i < responseJson.items.length; i++){

    
    $('.firstVid2').attr('src', 'https://www.youtube.com/embed/videoseries?list=' + results2);
 
  $('#results').removeClass('hidden');
  $('#js-error-message').addClass('hidden');
  };
};

//get playlist
function getYouTubeVideos2(query, maxResults=1) {
  const params = {
    key: apiKey,
    q: query + " skateboarding skate skateboarder",
    part: 'snippet',
    maxResults,
    id: query,
    type: 'playlist',
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults2(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`).removeClass('hidden');
    });
}




//search function
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    //get top video result
    getYouTubeVideos(searchTerm, maxResults);
    //get top playlist result
    getYouTubeVideos2(searchTerm)
  });
}



$(watchForm);