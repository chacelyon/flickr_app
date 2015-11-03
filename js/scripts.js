$(document).ready(function() {
$('#divErrors').html("");
$('input').focus();

 $('button').click(function () {
    // highlight the button
    // not AJAX, just cool looking
    $("button").removeClass("selected");
    $(this).addClass("selected");
	
	if($('input').val() === ""){
		$('#divErrors').html('You must enter a search term').css('color', 'red');
		$('input').focus();
		return false;
	}
	
	$('#divErrors').html("");
	
    //AJAX
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var animal = $('input').val();
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="col-lg-4 col-md-4 col-sm-6 col-xs-12">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

}); // end ready