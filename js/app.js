(function (){
    'use strict';
    $(document).ready(function(){

        var ran = Math.floor(Math.random()*10 + 1);
        var $clock = $(".clock")
        var $img = $("img")

        /*---------------------------------------------------*/

        setTime();
        setInterval(setTime, 1000);
        $img.attr("src", "backgrounds/" + ran.toString() + ".jpg")
        $img.hide();
        $clock.hide();
        $img.fadeIn(1000)
        $clock.delay(1000).fadeIn(1000)

        /*---------------------------------------------------*/

        function setTime(){
            var time = moment(Date.now()).format('h:mm')
            $clock.text(time);
        }
    })
})()