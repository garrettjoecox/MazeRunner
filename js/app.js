(function (){
    'use strict';
    $(document).ready(function(){

        var ran = Math.floor(Math.random()*11);
        var $clock = $(".clock")

        /*---------------------------------------------------*/

        document.body.style.backgroundImage="url(backgrounds/" + ran.toString() + ".jpg)";
        setTime();
        setInterval(setTime, 1000);

        /*---------------------------------------------------*/

        function setTime(){
            var time = moment(Date.now()).format('h:mm')
            $clock.text(time);
        }
    })
})()