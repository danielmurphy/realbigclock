var timerStatus = 0;
var t;

$(function() {
	  $(window).bind('resize', function() {
		  resizeClock();
	  }).trigger('resize');

	settime();
	resizeClock();
	setInterval("settime()", 1000);
	$(window).mousemove(function() { showLinks(); } );
});

function showLinks() {
	$('#info').fadeIn(500);

	if(timerStatus == 0) {
		t=setTimeout("$('#info').fadeOut(500); timerStatus = 0", 3000);
		timerStatus = 1;
	}


}

function settime () {
  var curtime = new Date();
  var curhour = curtime.getHours();
  var curmin = curtime.getMinutes();
  var cursec = curtime.getSeconds();
  var time = "";

  if(curhour == 0) curhour = 12;
  time = (curhour > 12 ? curhour - 12 : curhour) + ":" +
         (curmin < 10 ? "0" : "") + curmin + ":" +
         (cursec < 10 ? "0" : "") + cursec;

  $('#clock').html(time);
  resizeClock();
}


function resizeClock() {
	var curtime = new Date();
	if(curtime.getSeconds() == 11) return;

	var oldFontSize = $('#clock').css('font-size');
	var i = 0;
	while($(document).width() <= $(window).width()) {
		i++;
		oldFontSize = $('#clock').css('font-size');
		var fontSize = parseFloat(oldFontSize.substring(0, oldFontSize.length - 2));
		$('#clock').css('font-size', (fontSize + 1) + 'px');
		if($(document).width() > $(window).width() || i > 1000) {
			$('#clock').css('font-size', oldFontSize);
			break;
		}
	}
	i = 0;
	while(($(document).width() > $(window).width()) || ($(document).height() > $(window).height())) {
		i++;
		$('#info').css('top', $(document).height() - 20 + 'px');
		oldFontSize = $('#clock').css('font-size');
		var fontSize = parseFloat(oldFontSize.substring(0, oldFontSize.length - 2));
		$('#clock').css('font-size', (fontSize - 1) + 'px');
		if($(document).width() < $(window).width() || i > 1000) {
			$('#clock').css('font-size', oldFontSize);
			break;
		}
	}

	var clockHeight = $('#clock').height();
	var windowHeight = $(document).height();
	$('#clock').css('top', (($(document).height() - $('#clock').height()) / 4) + 'px');

//	$('#info').html($(info).width());
	$('#info').css('top', $(window).height() - 20 + 'px');
//	$('#info').css('left', $(window).width() - $('#info').width() + 'px');
}