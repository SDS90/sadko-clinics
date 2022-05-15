 //Управление фильтром

$(function(){

    //Переключаем фильтр
    $(".filter-button, .filter-list-wrapper li a").click(function(){
        var activeBlock;
        if ($(this).closest(".filter-list-wrapper").length){
            activeBlock = $(this).closest("li");
        } else {
            activeBlock = $(this);
        }

        //Если выбран ТОП - то остальные фильтры выключаются,и наоборот
        if ($(this).hasClass("top-filter")){
            var pageFilter =  $(this).closest(".filter-wrapper");
            pageFilter.find(".filter-button, .filter-list-wrapper li, .filter-open-button").removeClass("active");
            activeBlock.addClass("active");
            
        } else {

            if (activeBlock.hasClass("active")){
                activeBlock.removeClass("active");
            } else {
                activeBlock.addClass("active");
            }

            $(this).closest(".filter-wrapper").find(".top-filter").removeClass("active");
        }

        if ($(this).closest(".filter-list-wrapper").find("li.active").length){
            $(this).closest(".filter-block-wrapper").find(".filter-open-button").addClass("active");
        } else {
            $(this).closest(".filter-block-wrapper").find(".filter-open-button").removeClass("active");
        }

    });

    //Открываем поиск по списку
    $("body").on("click",".filter-open-button", function(){
        var filterBlock = $(this).closest(".filter-block-wrapper").find(".filter-block");
        if ($(this).hasClass("opened")){
            filterBlock.fadeOut(); 
            $(this).removeClass("opened");
        } else {
            $(".filter-open-button.opened").removeClass("opened");
            $(".filter-block").hide();
            filterBlock.fadeIn(); 
            $(this).addClass("opened");
        }
    });

    //Закрываем попапы
    $("body").on("click",".filter-block .closed", function(){
        $(this).closest(".filter-block").fadeOut();
        return false;
    });

    //Вешаем красивую прокрутку
    $('.textarea-scrollbar, .filter-list-wrapper').scrollbar();

    //Сбросить фильтры
    $(".delete-filter").click(function(){
        var pageFilter =  $(this).closest(".filter-wrapper");
        pageFilter.find(".filter-button, .filter-list-wrapper li, .filter-open-button").removeClass("active");
        pageFilter.find(".top-filter").trigger("click");
    });

    //Чекбокс акций
    $("#actions-checkbox").uiCheckRadio();
    if ($("#actions-checkbox").prop("checked")){
        $(".actions-page").find(".action-finish-block").hide();
    } else {
        $(".actions-page").find(".action-finish-block").show();
    }
    $("#actions-checkbox").change(function(){
        if ($(this).prop("checked")){
            $(".actions-page").find(".action-finish-block").hide();
        } else {
            $(".actions-page").find(".action-finish-block").show();
        }
    });
});
