//Все скрипты, связанные с формами

$(function(){

    //Закрываем формы
    $(".modal-close").click(function(){
        $(this).closest(".modal-form-wrapper").removeClass("active");
        $("body").find("#modal").fadeOut();
        setTimeout(function(){
            $(".modal-form-wrapper").hide();
            $("#modal").remove();
        },400);
    });

    $("body").on("click","#modal",function(){
        $(".modal-close").trigger("click");
    });

    //Закрываем ответ по кнопке продолжить
    $(".modal-form-wrapper .answer-btn").on("click", function(){
        $(".modal-close").trigger("click");
    });

    //Устанавливаем чекбоксы
    $('.modal-form-wrapper input[type="checkbox"]').uiCheckRadio();

	//Запись на приём
    $("body,html").on("click",'.book-toggle',function(){

        $("body").append("<div id='modal' class='modal'></div>");

        var $this = $(this);
        var form = $('#book-app-content');

        autosize($('textarea', form));

        form.show();
        $("#modal").addClass("active");

        if (($this.data("submitted") == false) || ($this.data("submitted") == "false") || ($this.data("submitted") ==  "") || (!$this.data("submitted")) ){
            form.find(".start-form").show();
            form.find(".answer-form").hide();
        } else {
            form.find(".start-form").hide();
            form.find(".answer-form").show();
        }

        //Поставим валидацию
        setValidation(form);

        //Пропишем нужные параметры
        form.find(".book-form .form-header").html($this.data("book-info"));

        if ($this.data("book-text")){
            form.find(".start-form .book-app-info").html($this.data("book-text"));
        }

        if ($this.data("modal-button")){
            form.find(".start-form .submit-btn").attr("value",$this.data("modal-button"));
            form.find(".start-form .submit-btn").html($this.data("modal-button"));
        }

        if ($this.data("book-answer-title")){
            form.find(".answer-form .big-header").html($this.data("book-answer-title"));
        }

        form.find(".answer-form p").html($this.data("book-answer"));

        //И наконец показываем форму
        form.css("margin-top",-form.height()/2);
        form.addClass("active");


        //Добавляем id врача
        form.find(".doctor-id").val($this.data("doctor-id"));
        //Добавляем action для формы
        form.find(".book-form").attr("action",$this.data("form-action"));

        return false;
    });

    //Запись на приём
    $("body,html").on("click",'.jur-toggle',function(){

        $("body").append("<div id='modal' class='modal'></div>");

        var $this = $(this);
        var form = $('#jur-app-content');

        autosize($('textarea', form));

        form.show();
        $("#modal").addClass("active");

        if (($this.data("submitted") == false) || ($this.data("submitted") == "false") || ($this.data("submitted") ==  "") || (!$this.data("submitted")) ){
            form.find(".start-form").show();
            form.find(".answer-form").hide();
        } else {
            form.find(".start-form").hide();
            form.find(".answer-form").show();
        }

        //Поставим валидацию
        setValidation(form);

        //Пропишем нужные параметры
        form.find(".book-form .form-header").html($this.data("book-info"));

        if ($this.data("book-text")){
            form.find(".start-form .book-app-info").html($this.data("book-text"));
        }

        if ($this.data("modal-button")){
            form.find(".start-form .submit-btn").attr("value",$this.data("modal-button"));
            form.find(".start-form .submit-btn").html($this.data("modal-button"));
        }

        if ($this.data("book-answer-title")){
            form.find(".answer-form .big-header").html($this.data("book-answer-title"));
        }

        form.find(".answer-form p").html($this.data("book-answer"));

        //И наконец показываем форму
        form.css("margin-top",-form.height()/2);
        form.addClass("active");


        //Добавляем id врача
        form.find(".doctor-id").val($this.data("doctor-id"));
        //Добавляем action для формы
        form.find(".book-form").attr("action",$this.data("form-action"));

        return false;
    });

    //Вопрос/отзыв
    $("body,html").on("click",'.question-toggle',function(){

        $("body").append("<div id='modal' class='modal'></div>");

        var $this = $(this);
        var form = $('#question-app-content');

        autosize($('textarea', form));

        form.show();
        $("#modal").addClass("active");

        //Поставим валидацию
        setValidation(form);

        //Пропишем нужные параметры
        form.find("textarea").scrollbar();
        form.find(".scroll-content").css("height",220);
        form.find(".book-form .form-header").html($this.data("book-info"));

        if ($this.data("book-answer-title")){
            form.find(".question-answer-form .big-header").html($this.data("book-answer-title"));
        }

        if ($this.data("modal-button")){
            form.find(".book-form .submit-btn").html($this.data("modal-button"));
            form.find(".book-form .submit-btn").attr("value",$this.data("modal-button"));
        }

        form.find(".answer-form p").html($this.data("book-answer"));

        if (($this.data("submitted") == false) || ($this.data("submitted") == "false") || ($this.data("submitted") ==  "") || (!$this.data("submitted")) ){
            form.find(".start-form").show();
            form.find(".answer-form").hide();
        } else {
            form.find(".start-form").hide();
            form.find(".answer-form").show();
        }

        //Добавляем id вопроса
        form.find(".question-id").val($this.data("question-id"));

        //И наконец показываем форму
        form.css({
            "width": 425,
            "margin-top":-form.height()/2 - 110,
            "margin-left": -212,
        });
        form.addClass("active");

        return false;
    });

    //Запись по акции
    $("body,html").on("click",".action-toggle",function(){

        $("body").append("<div id='modal' class='modal'></div>");

        var $this = $(this); 
        var form = $("#action-app-content");

        autosize($('textarea', form));

        form.show();
        $("#modal").addClass("active");

        //Поставим валидацию
        setValidation(form);

        //Пропишем нужные параметры
        form.find(".book-form .form-header").html($this.data("book-info"));
        form.find(".book-form .form-header+div").html($this.data("book-about"));
        form.find(".answer-form p").html($this.data("book-answer"));

        if ($this.data("book-answer-title")){
            form.find(".answer-form .big-header").html($this.data("book-answer-title"));
        }

        if ($this.data("modal-button")){
            form.find(".book-form .submit-btn").html($this.data("modal-button"));
            form.find(".book-form .submit-btn").attr("value",$this.data("modal-button"));
        }

        //Добавляем id акции
        form.find(".action-id").val($this.data("action-id"));

        if (($this.data("submitted") == false) || ($this.data("submitted") == "false") || ($this.data("submitted") ==  "") || (!$this.data("submitted")) ){
            form.find(".start-form").show();
            form.find(".answer-form").hide();
        } else {
            form.find(".start-form").hide();
            form.find(".answer-form").show();
        }

        //И наконец показываем форму
        form.css("margin-top",-form.height()/2);
        form.addClass("active");

        return false;
    });

    //Запись на курс
    $("body,html").on("click",".course-toggle",function(){

        $("body").append("<div id='modal' class='modal'></div>");

        var $this = $(this); 
        var form = $("#course-app-content");

        autosize($('textarea', form));

        form.show();
        $("#modal").addClass("active");

        //Поставим валидацию
        setValidation(form);

        //Пропишем нужные параметры
        form.find(".book-form .form-header").html($this.data("book-info"));
        form.find(".book-form .form-header+div").html($this.data("book-about"));
        form.find(".answer-form p").html($this.data("book-answer"));

        if ($this.data("book-answer-title")){
            form.find(".answer-form .big-header").html($this.data("book-answer-title"));
        }

        if ($this.data("modal-button")){
            form.find(".book-form .submit-btn").html($this.data("modal-button"));
            form.find(".book-form .submit-btn").attr("value",$this.data("modal-button"));
        }

        //Добавляем id курса
        form.find(".course-id").val($this.data("course-id"));

        if (($this.data("submitted") == false) || ($this.data("submitted") == "false") || ($this.data("submitted") ==  "") || (!$this.data("submitted")) ){
            form.find(".start-form").show();
            form.find(".answer-form").hide();
        } else {
            form.find(".start-form").hide();
            form.find(".answer-form").show();
        }

        //И наконец показываем форму
        form.css("margin-top",-form.height()/2);
        form.addClass("active");

        return false;
    });

    //Откликнуться на вакансию
    $("body,html").on("click",".vacancy-toggle",function(){

        $("body").append("<div id='modal' class='modal'></div>");

        var $this = $(this); 
        var form = $("#vacancy-app-content");

        autosize($('textarea', form));

        //Загружаем файл резюме
        form.find(".file-button").click(function(){
            $(document).find("#resumeFileField").trigger("click");
            return false;
        });

        form.show();
        $("#modal").addClass("active");

        if (($this.data("submitted") == false) || ($this.data("submitted") == "false") || ($this.data("submitted") ==  "") || (!$this.data("submitted")) ){
            form.find(".start-form").show();
            form.find(".answer-form").hide();
        } else {
            form.find(".start-form").hide();
            form.find(".answer-form").show();
        }

        //Поставим валидацию
        setValidation(form);

        //Добавляем id вакансии
        form.find(".vacancy-id").val($this.data("vacancy-id"));
        //Пропишем нужные параметры
        form.find(".book-form .form-header").html($this.data("book-info"));
        form.find(".answer-form p").html($this.data("book-answer"));

        if ($this.data("book-answer-title")){
            form.find(".answer-form .big-header").html($this.data("book-answer-title"));
        }

        if ($this.data("modal-button")){
            form.find(".book-form .submit-btn").html($this.data("modal-button"));
            form.find(".book-form .submit-btn").attr("value",$this.data("modal-button"));
        }

        //И наконц показываем форму
        form.css("margin-top",-form.height()/2);
        form.addClass("active");

        return false;
    });

    //Переключатель форм
    $(".service-book").click(function(){
        serviceBookShow($(this));
        return false;
    });

    $(".question-book").click(function(){
        questionBookShow($(this));
        return false;
    });

    $(".service-form-wrapper .closed, .service-form-wrapper .answer-btn").click(function(){
        $(this).closest(".service-form-wrapper").find(".service-form-start-block").show();
        $(this).closest(".service-form-wrapper").find(".start-form, .answer-form, .question-answer-form, .question-form").hide();
        return false;
     });

    //Переключатель услуг
    $("#service-app-content").find(".cost-button").on("click", function(){
        var $this = $(this);
        checkCostButton($this);
     });

    //Открываем попап вопроса
    $("#service-app-content").find(".open-question-popup").click(function(){
        $(".question-popup").fadeOut();
        $(this).closest(".open-question-wrapper").find(".question-popup").fadeIn();
        return false;
    });
    $("#service-app-content").find(".question-popup .closed-popup").click(function(){
        $(this).closest(".question-popup").fadeOut();
        return false;
    });

    //Записаться на услугу
    $("body,html").on("click",".services-toggle", function(){

        $("body").append("<div id='modal' class='modal'></div>");

        var $this = $(this); 
        var tables = $this.closest("li").find(".prices-tables");
        var form = $("#service-app-content");

        autosize($('textarea', form));

        form.show();
        $("#modal").addClass("active");

        form.css("overflow","visible");

         //Поставим валидацию
        setValidation(form.find(".start-form"));
        setValidation(form.find(".question-form"));

        //Пропишем нужные параметры
        form.find('.textarea-scrollbar').scrollbar();
        form.find(".scroll-content").css("height",220);

        form.find(".cost-button.active").trigger("click");

        form.find(".service-form-start-block").show();
        form.find(".start-form, .answer-form, .question-form, .question-answer-form").hide();

        //Проставляем переменные
        form.find(".service-header").html($this.text());
        form.find(".cost-dl.clock-list").html(tables.find(".clock-list").html());
        form.find(".cost-dl.normal-list").html(tables.find(".normal-list").html());
        form.find(".cost-dl.premium-list").html(tables.find(".premium-list").html());

        form.find(".service-form-start-block .textblock").html($this.data("about-service"));
        form.find(".service-form-wrapper>.start-form .form-header").html($this.data("book-header"));   
        form.find(".question-popup .popup-header").html($this.data("question-header"));

        if ($this.data("book-answer-title")){
            form.find(".answer-form .big-header").html($this.data("book-answer-title"));
        }

        if ($this.data("modal-button")){
            form.find(".start-form .submit-btn").html($this.data("modal-button"));
            form.find(".start-form .submit-btn").attr("value",$this.data("modal-button"));
        }

        //Добавляем id услуги
        form.find(".service-id").val($this.data("service-id"));

        //И наконец показываем форму
        form.css({
            "width": 425,
            "margin-left": -212,
            "margin-top":-form.height()/2,
            "padding": 0,
        });

        form.addClass("active");
        return false;
    });

    //Вопрос руководству
    $("body,html").on("click",".manager-toggle",function(){

        $("body").append("<div id='modal' class='modal'></div>");

        var $this = $(this); 
        var form = $("#manager-app-content");

        form.find('.modal-textarea-scrollbar').scrollbar();

        form.show();
        $("#modal").addClass("active");

        //Поставим валидацию
        setValidation(form);

        //Пропишем нужное
        form.find(".manager-header").html($this.data("modal-header"));
        form.find("h2").html($this.data("modal-subheader"));
        form.find(".manager-form .textblock ").html($this.data("modal-text"));
        form.find(".manager-form .submit-btn").html($this.data("modal-button"));
        form.find(".answer-form p").html($this.data("modal-answer"));

        //Добавляем id руководителя
        form.find(".manager-id").val($this.data("manager-id"));

        if ($this.data("modal-button")){
            form.find(".book-form .submit-btn").html($this.data("modal-button"));
            form.find(".book-form .submit-btn").attr("value",$this.data("modal-button"));
        }

        if (($this.data("submitted") == false) || ($this.data("submitted") == "false") || ($this.data("submitted") ==  "") || (!$this.data("submitted")) ){
            form.find(".start-form").show();
            form.find(".answer-form").hide();
        } else {
            form.find(".start-form").hide();
            form.find(".answer-form").show();
        }

        //И наконц показываем форму
        form.css({
            "width": 614,
            "margin-top":-form.height()/2,
            "box-shadow":"none",
        });
        form.addClass("active");

        return false;
    });

    //Оформление карты
    $("body,html").on("click",'.card-toggle',function(){

        $("body").append("<div id='modal' class='modal'></div>");

        var $this = $(this);
        var form = $('#card-app-content');

         form.show();
        $("#modal").addClass("active");

        //Поставим валидацию
        setValidation(form);

        //Добавляем id заявки на карту
        form.find(".card-id").val($this.data("card-id"));

        if (($this.data("submitted") == false) || ($this.data("submitted") == "false") || ($this.data("submitted") ==  "") || (!$this.data("submitted")) ){
            form.find(".start-form").show();
            form.find(".answer-form").hide();
        } else {
            form.find(".start-form").hide();
            form.find(".answer-form").show();
        }

        //И наконц показываем форму
        form.css({
            "width": 614,
            "margin-top":-form.height()/2,
            "box-shadow":"none",
        });
        form.addClass("active");

        return false;
    });

	//Открываем попап вопроса
    $('.question-popup input[type="checkbox"]').uiCheckRadio();

    //Добавим валидацию
    $(".open-question-wrapper").each(function(){
        setValidation($(this));
    });

    $("body").on("click",".open-question-popup", function(){
        $(".question-popup").fadeOut();
        $(".question-popup .error-text").text("");
        $(".question-popup input, .question-popup textarea, .question-popup  .check-radio").removeClass("error");
        $(this).closest(".open-question-wrapper").find(".question-popup").fadeIn();
        return false;
    });
    $("body").on("click",".question-popup .closed-popup", function(){
        $(this).closest(".question-popup").fadeOut();
        return false;
    });

    //Форма обратной связи
    
    $(".feedback-form, .qa-form, .book-tile, .service-form-wrapper .start-form, .service-form-wrapper .question-form").each(function(){
        setValidation($(this));
    });

    $(".feedback-form .answer-btn").click(function(){
        $(this).closest(".feedback-form").find(".answer-form").hide();
        $(this).closest(".feedback-form").find(".start-form").show();
        return false;
    });

    //Запись на приём (страница услуги)

    $(".service-book").click(function(){
        serviceBookShow($(this));
        return false;
    });

    $(".question-book").click(function(){
        questionBookShow($(this));
        return false;
    });

     $(".service-form-wrapper .closed, .service-form-wrapper .answer-btn").click(function(){
        $(this).closest(".service-form-wrapper").find(".service-form-start-block").show();
        $(this).closest(".service-form-wrapper").find(".start-form, .answer-form, .question-answer-form, .question-form").hide();
        return false;
     });

     //Кнопки услуг
     $(".cost-button").click(function(){
        checkCostButton($(this));
        return false;
     });

     $(".cost-button.active").trigger("click");

     //Форма записи на странице Цены и акции
     $('.book-tile--toggle').click(function(){
        var bookTile = $(this).closest(".book-tile");
        bookTile.find('input[type="checkbox"]').uiCheckRadio();
        bookTile.toggleClass("-back-");
        $(this).closest(".book-tile--answer").stop().animate({
            left: "100%",
        }, 400);
    });

    //Подписка
    $(".subscribe-button").click(function(){
        var $this = $(this);
        $this.addClass("hidden");
        $this.closest(".subscribe-wrapper").find(".subscribe-form").removeClass("hidden");
        return false;
    });

    //Отправка формы подписки
    $(".subscribe-form").submit(function(){
        var input = $(this).find(".textfield");
        var email = /^([A-Za-z0-9_\.-]+)@([A-Za-z0-9_\.-]+)\.([a-z\.]{2,6})$/;

        if (!input.val().match(email)){
            $(this).addClass("error");
            input.val("");
            input.attr('placeholder',input.data("error-text"));
            return false;
        }

    });
});

//Прикрепляем файл
function changeResumeFileField(){
    var parts = $(document).find("#resumeFileField").val().split('\\');
    var name = parts[parts.length - 1];
    $(document).find(".vacancy-form .file-button").text(name);
}

//Переключатель услуг
function checkCostButton($this){
    var form = $this.closest(".service-form-wrapper");
    form.find(".cost-button.active").removeClass("active");
    $this.addClass("active");
    
    form.find(".cost-dl").hide();
    form.find("." + $this.data("dl")).show();

    form.find(".cost-type").text($this.data("cost-type"));
}

//Показываем форму записи на услугу
function serviceBookShow($this){
    var form = $this.closest(".service-form-wrapper");
    form.find(".service-form-start-block, .answer-form, .question-answer-form, .question-form").hide();
    form.find(".start-form").show();
    form.find('input[type="checkbox"]').uiCheckRadio();
}

//Показываем вопрос
function questionBookShow($this){
    var form = $this.closest(".service-form-wrapper");
    form.find(".service-form-start-block, .answer-form, .start-form ,.question-answer-form").hide();
    form.find(".question-form").show();
    form.find('input[type="checkbox"]').uiCheckRadio();
}

//Валидация форм
function setValidation(panel){

    //Убираем обозначения ошибок
    panel.find(".error-text").text("");
    panel.find(".book-form, .qa-form").removeClass("error-form");
    panel.find("input, textarea, .check-radio").removeClass("error");

    //Убираем ошибки при измении контента
    panel.find("input").on("keyup input change",function(){
        $(this).removeClass("error");
    });

    panel.find("textarea.question-text").on("focus",function(){
        $(this).attr("placeholder","");
        $(".question-text").removeClass("error");
    });

    panel.find(".check-radio").on("change",function(){
        $(this).closest(".checkbox").removeClass("error");
    });

    //Проверяем отправку
    panel.find(".submit-btn").on("click",function(){
        var form = $(this).closest(".book-form, .qa-form");
        return checking(form);        
    });

    panel.find(".book-form, .qa-form").on("submit",function(){
        return checking($(this));
    });

    panel.on("submit",function(){
        return checking($(this));
    });

}

function checking(form){
    var error = true;
    var errorText = form.find(".error-text");

    var phones = form.find(".phone-field").length;
    var emails = form.find(".email-field").length;
    var files = form.find(".file-button").length;

   //return false;

   //Вопросы
    form.find("textarea.question-text").each(function(){
        if ((!$(this).val()) || ($(this).val() == "")){
            form.find(".question-text").addClass("error").attr("placeholder","Напишите здесь что-нибудь.");
            form.find(".scroll-wrapper.question-text").addClass("error");
            form.addClass("error-form");
            error = false
            return false;
        } 
    });

    if (error == false){
        return false;
    }

   //Обязательные поля
    form.find(".required-field").each(function(){
        if (!$(this).val()){
            errorText.text("Заполните, пожалуйста, все поля.");
            form.addClass("error-form");
            error = false;
            return false;
        }
    });

    if (error == false){
        return false;
    }


    //Проверяем заполненность
    if ( (phones > 0) || (emails > 0)){

        if ((!form.find(".phone-field").val()) && (!form.find(".email-field").val())){
            errorText.text("Напишите пожалуйста ваш e-mail или телефон.");
            form.addClass("error-form");
            return false;
        }
    }

    //Проверяем формат почты
    var email = /^([A-Za-z0-9_\.-]+)@([A-Za-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    form.find(".email-field").each(function(){
        if ($(this).val() && !$(this).val().match(email)){
            errorText.text("Видимо, какие-то поля заполнены неправильно.");
            form.find(".email-field").addClass("error");
            error = false;
            return false;
        }
    });

    if (error == false){
        return false;
    }


    //Проверяем файл, если есть
    if (files > 0){
        if (!$(document).find("#resumeFileField").val()){
           errorText.text("Прикрепите, пожалуйста, файл с резюме."); 
           form.addClass("error-form");
           return false;
        }
    }


    //Проверяем чекбокс
    form.find(".check-radio").each(function(){
        if (!$(this).prop("checked")){
            errorText.text("Для отправки заявки необходимо принять условия обработки ваших данных.");
            form.find(".checkbox").addClass("error");
            form.addClass("error-form");
            error = false;
            return false;
        }
    });

    if (error == false){
        return false;
    }

}

//Блок ответа
function showAnswerForm(){
    answer = $("#answer-app-content");
    $("body").append("<div id='modal' class='modal'></div>");
    $("#answer-app-content, #answer-app-content .answer-form").show();
    $("#modal").addClass("active");
    answer.css("margin-top",-answer.height()/2);
    answer.addClass("active");
}