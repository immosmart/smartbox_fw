var triggerKey=function(key){
    $('body').trigger($.Event('keydown',{
        keyCode: SB.keys[key]
    }));
}
SB(function(){




    var meter=new FPSMeter();




    triggerKey('ENTER');
    triggerKey('RIGHT');


    setTimeout(function(){
        triggerKey('ENTER');
        (function tick(){
            meter.tickStart();
            triggerKey('DOWN');
            meter.tick();
            setTimeout(tick, 1000/60);
            //window.requestAnimationFrame(tick);
        }());
    }, 1000)





});