(function (){
    'use strict';
    $(document).ready(function(){
        var $clock = $(".clock");
        var $bg = $(".bg");

        /* Logic */

        $bg.on('webkitAnimationEnd', function(){
            $(this).addClass('visible');
            $clock.addClass('fadein')
        });
        $clock.on('webkitAnimationEnd', function(){
            $(this).addClass('visible');
        });
        setTime();
        setInterval(setTime, 1000);

        /* Functions */

        function setTime(){
            var time = moment(Date.now()).format('h:mm')
            $clock.text(time);
        }
    })
})()