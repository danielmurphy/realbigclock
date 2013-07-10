setTime = ->
    curtime = new Date()
    hour = curtime.getHours() % 12
    hour = 12 if hour is 0

    minutes = curtime.getMinutes()
    minutes = "#{if minutes < 10 then '0' else ''}#{minutes}"

    seconds = curtime.getSeconds()
    seconds = "#{if seconds < 10 then '0' else ''}#{seconds}"

    $("#clock").html "#{hour}:#{minutes}:#{seconds}"

resizeClock = ->
  oldFontSize = $('#clock').css('font-size')
  newFontSize = parseFloat(oldFontSize.substring(0, oldFontSize.length - 2))

  while $(document).width() <= $(window).width()
    $('#clock').css 'font-size', ++newFontSize

  while $(document).width() > $(window).width() or $(document).height() > $(window).height()
    $('#clock').css 'font-size', --newFontSize

  $('#clock').css 'top', (($(document).height() - $("#clock").height()) / 4)

showLink = ->
  $('#info').css('top', $(window).height() - 20).fadeIn(500)
  clearTimeout window.linkTimer if window.linkTimer?
  window.linkTimer = setTimeout ->
    $('#info').fadeOut()
  , 2000

$ ->
  setTime()
  resizeClock()
  showLink()
  setInterval setTime, 1000
  setInterval resizeClock, 1000

  $(window).on('mousemove', showLink).on('resize', resizeClock).o