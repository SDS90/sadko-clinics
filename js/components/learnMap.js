//Скрипты для карты обучения

$(function(){

    //Ссылки
    var allMapDataUrl = 'http://' + location.hostname + '/map/get_event.php';

    //Массив городов
    var allCities;
    var learnMarkers = [];
    var learnGMarkers = []; 

    //Запускаем карту
    startLearnMap(allCities,allMapDataUrl,learnMarkers,learnGMarkers,false);

    //Массив докторов
    //var allDoctors =  eval($("#learnMapInfo").data("doctors"));

    //Смена фильтра
    $(".learn-map--filter .check-radio").change(function(){
        var i,j;
        var $this = $(this);
        startLearnMap(allCities,allMapDataUrl + '?' +$("#learmCheckFilter .check-radio:checked").val());
    });

    //Сброс фильтров
    $(".learn-map--delete-filter").click(function(){
        refreshFilter();
        //Запускаем карту
        startLearnMap(allCities,allMapDataUrl,learnMarkers,learnGMarkers,false);
        return false;
    });

    //Показываем данные конференции
    $("body").on("click",".conferences-list a",function(){
        var id = $(this).attr("href");
        $(".more-members-info").hide();
        $(this).closest(".conference-city-wrapper").find(".conferences-list-wrapper").hide();
        $(id).show();
        return false;
    });

    //Скрываем данные конференции
    $("body").on("click", ".conferences-number",function(){
        $(this).closest(".conference-city-wrapper").find(".conferences-list-wrapper").show();
        $(this).closest(".conference-info, .more-members-info").hide();
        return false;
    });

    //Показываем других членов конференций
    $("body").on("click",".more-members",function(){
        $(this).closest(".more-wrapper").find(".more-members-info").fadeToggle();
        return false;
    });

    //Поиск по фамилии
    if ($("#learnSearchDoctor input").length && (typeof doctors !== "undefined")) {
        var doctorsNames = [];
        for (var key in doctors) {
            var doctorData = {};
            doctorData.label = doctors[key].doctor;
            doctorData.id = doctors[key].doctrorID;
            doctorsNames.push(doctorData);
        }
    }
    //Автозаполнение
    $("#learnSearchDoctor input").autocomplete({
        source: doctorsNames,
        close: function(event, ui){
            $("#learnSearchDoctor").trigger("submit");
        },
        select: function(event, ui) { 
            $("#learnSearchDoctor").data("doctor-id",ui.item.id);
            $("#learnSearchDoctor").trigger("submit");
        },
        change: function (event, ui) {
            if (ui.item == null || ui.item == undefined) {
                $("#learnSearchDoctor input").val("");
            }
        }
    });
    //Отправка
    $("#learnSearchDoctor").submit(function(){
        var name = $(this).data("doctor-id");
        var i,j;

        var url = 'http://' + location.hostname + '/map/get_staff.php?id=' + name;
        startLearnMap(allCities,url,learnMarkers,learnGMarkers,true);
        return false;
    });

});

//Загрузка данных карты
function startLearnMap(allCities,url,learnMarkers,learnGMarkers,doctorCheck){
    
    $("#learmCheckFilter label, .learn-map--wrapper").addClass("disabled");
    allCities = "";

    $.getJSON(url, function(data){
        allCities = data;
        //Формируем список конференций
        if (doctorCheck){
            setConferencesData(allCities.conferences);
        } else {
            setConferencesData(allCities);
        }
        
        //Массив маркеров
        learnMarkers = [];
        learnGMarkers = [];  
        //Устанавливаем карту
        if ($("#learnMapInfo").length){
            setLearnMap(learnMarkers,learnGMarkers);
        }
    });
}

//Пересчёт карты
function setLearnMap(learnMarkers,learnGMarkers){  

    var learnMapStyles = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#b4d4e1"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ];

    //Проверка открытия окна
    var opened = false;

    //Иконки
    var normalMarker = $("#learn-map").data("marker");
    var activeMarker = $("#learn-map").data("active-marker"); 

    //Начальный расчёт карты
    $("#learnMapInfo .conference-city-wrapper").each(function(i,v){
        var address = [];
        $(this).attr("data-num",i);
        address.push($(this).data("latitude"));
        address.push($(this).data("longitude"));
        address.push(1);
        learnMarkers.push(address);
    });

    //Запускаем карту

    var firstCoords = new google.maps.LatLng($("#learnMapInfo .conference-city-wrapper:first").data("latitude"),$("#learnMapInfo .conference-city-wrapper:first").data("longitude"));
    //Это просто, чтобы было куда ткнуть центр для начального запуска
    var mapOptions = {
        center: firstCoords,
        zoom: 13,
        scrollwheel: false,
        styles: learnMapStyles,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        }
    };

    //Здесь указывается id блока
    learnmap = new google.maps.Map(document.getElementById('learn-map'),  mapOptions);

    //Добавляем маркеры на карту
    for (var i = 0; i < learnMarkers.length; i++) {
        var address = learnMarkers[i];
        var addressLatLng = new google.maps.LatLng(address[0], address[1]);

        var marker = new google.maps.Marker({
            position: addressLatLng,
            map: learnmap,
            icon: normalMarker,
            pointNumber: i,
        });

        //По наводке - меняем иконку
        google.maps.event.addListener(marker, "mouseover", function () {
            var pointNum = this.pointNumber;
            for (var i = 0; i < learnGMarkers.length; i++) {
                learnGMarkers[i].setIcon(normalMarker)
            }
            this.setIcon(activeMarker);
        });

        google.maps.event.addListener(marker, "mouseleave", function () {
            this.setIcon(normalMarker);
        });

        //Открываем блок по клику на точку на карте
        google.maps.event.addListener(marker, "click", function () {
            this.setIcon(activeMarker);
            var pointNum = this.pointNumber;
            var city = $("#learnMapInfo .conference-city-wrapper[data-num = " + pointNum + "]").eq(0);
            city.scrollbar('destroy');
            $("#learnMapInfo .conference-city-wrapper, .conferences-list-wrapper, .conference-info, .more-members-info").hide();
            city.find(".conference-info.show-block").first().show();
            city.slideDown(400);
            setTimeout(function(){
                city.find(".conferences-list-wrapper").scrollbar();
                city.find(".conferences-list-wrapper").on("mousewheel",function(event, delta) {

                  this.scrollLeft -= (delta * 30);

                  if (this.scrollLeft > 0){
                    $(this).closest(".scroll-wrapper").addClass("scrolling");
                  } else {
                    $(this).closest(".scroll-wrapper").removeClass("scrolling");
                  }
                  return false;
                });
            },400);
        });

        learnGMarkers.push(marker);
    }

    //Автомасштабирование карты - делаем, чтобы все маркеры помещались
    setMapZoom(learnMarkers);

    //Убираем прелоадер
    $("#learmCheckFilter label, .learn-map--wrapper").removeClass("disabled");
}

function setConferencesData(allData){
    var i,j,k,l,count,length;
    var htmlString = '';
    var doctorsList, maxLength = 4;

    $("#learnMapInfo").html("");

    //Заполняем данные
    for (var key in allData) {
        htmlString = '';

        if ( (allData[key].latitude != null) || (allData[key].longitude != null) ){

            //Добавляем данные города
            htmlString = '<div data-latitude="' + allData[key].latitude + '" data-longitude="' + allData[key].longitude + '" id = "city' + allData[key].id + '" class="conference-city-wrapper clear -dn- show-block"><div class="conferences-list-wrapper -dn-"><div class="conferences-list">';
            //Добавляем данные конференций
            for (k = 0; k < allData[key].conferences.length; k++){
                htmlString = htmlString + '<a href="#conference' + allData[key].conferences[k].id + '" class="conference-name">' + allData[key].conferences[k].name + '</a>';
            }

            htmlString = htmlString + '</div></div>';

            for (k = 0; k < allData[key].conferences.length; k++){
                htmlString = htmlString + '<div id="conference' + allData[key].conferences[k].id + '" class="conference-info show-block clear -dn-"><div class="conference-name">' + allData[key].conferences[k].name + '</div>';

                if (allData[key].conferences[k].lectors != null){
                    htmlString = htmlString + '<div class="conference-lectors textblock"><i>Лекторы:</i><br>' + allData[key].conferences[k].lectors + '</div>';
                }

                doctorsList = allData[key].conferences[k].doctors;

                if (doctorsList != null) {

                    length = Object.keys(doctorsList).length;
                    count = 1;

                    htmlString = htmlString + '<div class="conference-members"><div class="textblock"><i>Участники:</i><br>';

                    if (length > maxLength){

                        for (var l in doctorsList){
                            if (count < length) {
                                htmlString = htmlString + '<a href="' + doctorsList[l].link + '">' + doctorsList[l].name + ',</a> ';
                                if (count == maxLength){
                                    htmlString = htmlString + '</div><div class="more-wrapper"><a href="#" class="more-members">другие</a><div class="more-members-info textblock -dn-">';
                                }
                                count++;
                            } else {
                                htmlString = htmlString + '<a href="' + doctorsList[l].link + '">' + doctorsList[l].name + '</a></div></div></div>';
                            }
                        }

                    } else {

                        for (var l in doctorsList){

                            if (count < length) {
                                htmlString = htmlString + '<a href="' + doctorsList[l].link + '">' + doctorsList[l].name + ',</a> ';
                                count++;
                            } else {
                                htmlString = htmlString + '<a href="' + doctorsList[l].link + '">' + doctorsList[l].name + '</a></div></div>';
                            }
                        }
                    }
                }

                htmlString = htmlString + '<button class="conferences-number"><div class="text">событий:</div><div class="num">' + allData[key].conferences.length + '</div></button></div>';
                
            }
        }

        $("#learnMapInfo").append(htmlString);
    }

}

//Сбрасываем фильтр
function refreshFilter(){
    $(".learn-map--filter .check-radio").prop("checked",false);
    $(".learn-map--filter .radio").removeClass("-checked-");
    $("#learnSearchDoctor input").val("");
    $("#learnMapInfo .conference-city-wrapper, .conferences-list-wrapper, .conference-info, .more-members-info").hide();
    $(".conference-city-wrapper").each(function(){
        $(this).find(".conferences-number .num").text($(this).find(".conferences-list .conference-name.show-block").length);
    });
}


//Автомасштабирование
function setMapZoom(learnMarkers){
     var latlng = [];
    for (var i = 0; i < learnMarkers.length; i++) {
        var address = learnMarkers[i];
        if (learnMarkers[i][2] == 1){
            var addressLatLng = new google.maps.LatLng(address[0], address[1]);
            latlng.push(addressLatLng);
        }
    }
    var latlngbounds = new google.maps.LatLngBounds();
    for (var i = 0; i < latlng.length; i++) {
      latlngbounds.extend(latlng[i]);
    }
    learnmap.fitBounds(latlngbounds);

    var listener = google.maps.event.addListener(learnmap, "idle", function() { 
      if (learnmap.getZoom() > 16) learnmap.setZoom(10); 
      google.maps.event.removeListener(listener); 
    });
}