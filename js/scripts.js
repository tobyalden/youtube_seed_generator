var viewCountThreshold = 500;
var keywordBlacklist = ["pronounce", "say", "vocabulary", "spelling", "mean", "definition", "slideshow"]

function randomWord() {
  var requestStr = "http://randomword.setgetgo.com/get.php";
  // $.getJSON(requestStr).then(function(responseJSON0) {
  //   randomVideo(responseJSON0);
  // });

  $.ajax({
      type: "GET",
      url: requestStr,
      dataType: "jsonp",
      jsonpCallback: 'randomVideo'
  });
}

function randomVideo(data) {
  console.log(data.Word);
  var url = "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&q=" + data.Word + "&type=video&maxResults=50&key=AIzaSyAHu80T94GGhKOzjBs9z5yr0KU8v48Zh60";
  $.getJSON(url).then(function(responseJSON) {
    if (responseJSON.items.length < 1) {
      console.log("No videos found for " + data.Word + "Restarting search.");
      randomWord();
    } else {
        var videoId = responseJSON.items[0].id.videoId;
        var url2 = "https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+statistics&id=" + videoId + "&key=AIzaSyAHu80T94GGhKOzjBs9z5yr0KU8v48Zh60";
        $.getJSON(url2).then(function(responseJSON2) {
          if(responseJSON2.items[0].statistics.viewCount > viewCountThreshold) {
            console.log("View count too high. Restarting search.");
            randomWord();
          } else if(isBlacklisted(responseJSON2.items[0].snippet.title, responseJSON2.items[0].snippet.description)) {
            console.log("Title: " + responseJSON2.items[0].snippet.title + " - Description: " + responseJSON2.items[0].snippet.description + " contains blacklisted word. Restarting search.")
            randomWord();
          } else {
            console.log("Success! Video ID = " + responseJSON2.items[0].id);
            $("#video-url").html('<a href="https://www.youtube.com/watch?v=' + responseJSON2.items[0].id + '">D E L I V E R M E U N T O D A R K W E B</a>');
          }
        });
      }
  });
}

function isBlacklisted(title, description) {
  title = title.toLowerCase();
  description = description.toLowerCase();
  for(var i = 0; i < keywordBlacklist.length; i++) {
    if(title.includes(keywordBlacklist[i]) || description.includes(keywordBlacklist[i])) {
      return true;
    }
  }
  return false;
}

$(document).ready(function() {
  randomWord();
});


// function isStatic(videoId) {
//   var img1 = 'http://i.ytimg.com/vi/' + videoId + '/1.jpg';
//   var img2 = 'http://i.ytimg.com/vi/' + videoId + '/2.jpg';
//   var img3 = 'http://i.ytimg.com/vi/' + videoId + '/3.jpg';
//
//   var api = resemble(img1).onComplete(function(data){
//       console.log(data);
//       /*
//       {
//         red: 255,
//         green: 255,
//         blue: 255,
//         brightness: 255
//       }
//       */
//   });
//
// }
