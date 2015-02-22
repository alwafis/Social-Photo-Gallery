// page load script
$( document ).ready(function() {
	//animate scroll to gallery
	$('.arrow').click(function(){
		$('html,body').animate({scrollTop : ($('#s_gallery').offset().top)},500);
	});
	// bring arrow to the top
	$( ".arrow" ).animate({marginTop: "0",}, 1500 );
	// catch scrolling
	 	$(window).scroll( function(){
		if($(window).scrollTop()>10){
			// gallery fade in animation
			$("#s_gallery").animate({opacity : 1},500);
		}
	});
});
//get and populate photo from instagram
$.ajax({
  type: "GET",
  url: "server-side/popular.php",
})
  .done(function( msg ) {
  	var linksContainer = $('#links'),
    baseUrl,thumb;
    // convert instagram data
  	msg = JSON.parse(msg);
  	for (var i = 0; i < msg.data.length; i++) {

  		// check if the element type is images
  		if(msg.data[i].type=="image"){
  			// hide the element until all images loaded
  			$("#s_gallery").css("display","block");
  			$("#s_gallery").css("opacity","0");
	  		baseUrl = msg.data[i].images.standard_resolution.url;
	  		thumb = msg.data[i].images.thumbnail.url;
	  	// create div and append it to #links
	  	$('<div/>')
	  	.prop("class","col-md-3")
	  	// create <a> element and append it to div 
        .append($('<a/>')
            .append($('<img>').prop('src', thumb ).prop("class","col-md-12"))
            .prop('href', baseUrl)
            .prop('title', 'credits @'+msg.data[i].user.username)
            .attr('data-gallery', "")
            )
        // add twitter button below the photo
        .append(
        	'<a class="tweet" href="javascript:tweetPhoto(\''+msg.data[i].user.username+'\',\''+msg.data[i].images.standard_resolution.url+'\')" target="_blank" alt="Tweet this page"><span>Share on twitter</span></a>'
        )
        .appendTo(linksContainer);
	  	}
  		
  	}
});
// twitter share function
function tweetPhoto(var1,var2) {
    window.open('https://twitter.com/share?text=checkout  @' + var1+ ' photo '+var2,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    return false; 
}