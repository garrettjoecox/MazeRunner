(function (){
    'use strict';
    $(document).ready(function(){

        var $clock = $(".clock")

        /*---------------------------------------------------*/

        setTime();
        setInterval(setTime, 1000);
        $clock.hide();
        $clock.delay(1000).fadeIn(1000)

        /*---------------------------------------------------*/

        function setTime(){
            var time = moment(Date.now()).format('h:mm')
            $clock.text(time);
        }
    })
})()