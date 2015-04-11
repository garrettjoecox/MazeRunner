$(document).ready(function(){

    /* Variables */

    var $clock = $(".clock");
    var $bg = $(".bg");
    var rbg = "url(./backgrounds/" + (Math.floor(Math.random()*5)+1) + ".jpg)";

    /* Logic */

    $bg.css('background-image', rbg);
    $bg.on('webkitAnimationEnd', function(){
        $(this).addClass('visible');
        $clock.addClass('fadein');
    });
    $clock.on('webkitAnimationEnd', function(){
        $(this).addClass('visible');
    });
    setTime();
    setInterval(setTime, 1000);

    /* Functions */

    function setTime(){
        var time = moment(Date.now()).format('h:mm');
        $clock.text(time);
    };
});
