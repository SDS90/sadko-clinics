
//Страница образования
$(function(){

	//Программы образования
    setEducationHeight();

    //Показываем программы
    $(".education-program").hover(function(){
        var showBlock = $(this).find(".about-show-block");
        var hideBlock = $(this).find(".about-hide-block");
        var hideBlockHeight = hideBlock.data("realheight");

        hideBlock.css({height:0,display:'block'}).stop().animate({height: hideBlockHeight}, 400);
        showBlock.stop().animate({ paddingBottom: hideBlockHeight}, 400);
    }, function(){
        var showBlock = $(this).find(".about-show-block");
        var hideBlock = $(this).find(".about-hide-block");

        hideBlock.stop().animate({height: 0}, 400, function(){hideBlock.hide();});
        showBlock.stop().animate({ paddingBottom: 0}, 400);
    });

      //Показываем инфу о преподах
    $("body").on("click",".teacher-small-block .top-button",function(){
        var teacherBlock = $(this).closest(".teacher-small-block");

        if (teacherBlock.hasClass("opened")){
            teacherBlock.find(".about-doctor-wrapper").animate({
                bottom: teacherBlock.data("bottom")
            }, 400,function(){
                teacherBlock.removeClass("opened");
            });
        } else {
            teacherBlock.addClass("opened");
            teacherBlock.find(".about-doctor-wrapper").animate({
                bottom: "0px"
            }, 400);
        }
        
        return false;
    });
});

//Выравниваем все высоты у блоков программ
function setEducationHeight(){

    $(".education-program-wrapper").each(function(){

        if ($(this).closest(".doctors-education-program").length){

            var minHeight = 0;
            $(this).find(".education-program .program-name").each(function(){
                if ($(this).outerHeight() > minHeight){
                    minHeight = $(this).outerHeight();
                }
            });
            $(this).find(".education-program .program-name").css("height",minHeight);

        }
    });

    $(".education-program .about-hide-block").each(function(){
        $(this).attr("data-realheight",$(this).outerHeight());
    });
}