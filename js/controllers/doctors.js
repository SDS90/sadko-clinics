
//Страница доктора

$(function(){


    $(".service-section-wrapper .service-section").each(function(){
        new Masonry(this,{
            itemSelector: '.service-block',
            columnWidth: '.service-block',
        });
    });


    //Показываем подсказки
    $(".show-prize").hover(function(e){
        $("body").append('<div class="title-block"><span>' + $(this).find(".-dn-").html() + '</span></div>');
        var X = e.pageX; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ X
        var Y = e.pageY; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ Y
        var width = $(".title-block").width() + 20;
        $(".title-block").css({
            "top": Y + 35,
            "left": X - width,
        }).show();
    }, function(){
        $(".title-block").remove();
    });

    $(".show-prize").mousemove(function(e){
         var X = e.pageX; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ X
        var Y = e.pageY; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ Y
        var width = $(".title-block").width() + 20;
        $(".title-block").css({
            "top": Y + 35,
            "left": X - width,
        }).show();
    });

    
});


