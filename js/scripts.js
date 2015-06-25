function randomWord() {
    var requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'randomWordComplete'
    });
  }

function randomWordComplete(data) {
  console.log(data.Word)
}

$(document).ready(function() {
  randomWord();
});
