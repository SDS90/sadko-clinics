//Страница клиники

$(function(){

	$("#branchesList").scrollbar();

	if ($("#branchesMap").length){
		setBranchesMap();
	}

   	//Чекбоксы
	$('.contacts-feedback input[type="checkbox"]').uiCheckRadio();

});


function setBranchesMap(){
	var branchesMapNormalMarker = $("#branchesList").data("marker");
	var branchesMapActiveMarker = $("#branchesList").data("active-marker");
	var brahcneNum = 0;
	var gBranchesmarkers = [];

	//Проверка открытия окна
	var opened = false;

	//Стили для карты
	var branchesMapStyles = [
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

    var centerMap = new google.maps.LatLng(56.334838,44.005608);
    var mapOptions = {
    	center: centerMap,
    	zoom: 13,
    	scrollwheel: false,
    	styles: branchesMapStyles
  	};

  	//Здесь указывается id блока
  	contactsMap = new google.maps.Map(document.getElementById('branchesMap'),  mapOptions);

	//Составим массив клиник	
    var clinicsArray = [];
	$("#branchesList li .clinic-map-info").each(function(i,v){
		var clinicCoord = [];
		var contacts = $(this).find(".contacts-wrapper").eq(0);
		$(this).closest("li").find(".about-address").attr("data-num",i);
		clinicCoord.push(contacts.data("latitude"));
		clinicCoord.push(contacts.data("longitude"));
		clinicCoord.push(contacts.data("address"));
		if (contacts.hasClass("opened")){
			clinicCoord.push(1);
		} else {
			clinicCoord.push(0);
		}
		clinicsArray.push(clinicCoord);
	});


	//Добавляем маркеры на карту
	for (var i = 0; i < clinicsArray.length; i++) {
        var addressLatLng = new google.maps.LatLng(clinicsArray[i][0], clinicsArray[i][1]);
        var marker = new google.maps.Marker({
            position: addressLatLng,
            lat: clinicsArray[i][0],
            lng: clinicsArray[i][1],
            map: contactsMap,
            title: clinicsArray[i][2],
            icon: branchesMapNormalMarker,
            pointNumber: i
        });

        google.maps.event.addListener(marker, "click", function () {

        	var marker = this;

        	for (var i=0; i<gBranchesmarkers.length; i++) {
                gBranchesmarkers[i].setIcon(branchesMapNormalMarker);
            }
            //$("#branchesList .about-address[data-num = " + this.pointNumber + "]").trigger("click");
            $("#branchesList li, #branchesList .branches-type").hide();
            $("#branchesList .contacts-wrapper").each(function(){
            	if ( ($(this).data("latitude") == marker.lat) && ($(this).data("longitude") == marker.lng) ){
	            	$(this).closest("li").show();
	            	$(this).closest("ul").prev(".branches-type").show();
	            }
            });
            this.setIcon(branchesMapActiveMarker);
        });

        gBranchesmarkers.push(marker);

        if (clinicsArray[i][3] == 1){
        	google.maps.event.trigger(gBranchesmarkers[i], 'click');
        }
    }

    //Автомасштабирование карты - делаем, чтобы все маркеры помещались
    var latlng = [];
    for (var i = 0; i < clinicsArray.length; i++) {
        var addressLatLng = new google.maps.LatLng(clinicsArray[i][0], clinicsArray[i][1]);
        latlng.push(addressLatLng);
    }
    var latlngbounds = new google.maps.LatLngBounds();
    for (var i = 0; i < latlng.length; i++) {
      latlngbounds.extend(latlng[i]);
    }
    contactsMap.fitBounds(latlngbounds);

    var listener = google.maps.event.addListener(contactsMap, "idle", function() { 
      if (contactsMap.getZoom() > 13) contactsMap.setZoom(13); 
      google.maps.event.removeListener(listener); 
    });

    //Ховеры для списка адресов
	$("body").on("mouseover", "#branchesList li .about-address", function(){
		if (opened == false) {
    		gBranchesmarkers[$(this).data("num")].setIcon(branchesMapActiveMarker);
    	}
    });
    $("body").on("mouseleave", "#branchesList li .about-address", function(){
    	if (opened == false) {
    		gBranchesmarkers[$(this).data("num")].setIcon(branchesMapNormalMarker);
    	}
    });

	//Открываем блок с адресом
	$(".actions-scroll").scrollbar();
	$("body").on("click", "#branchesList li .about-address", function(){
		var li = $(this).closest("li");
		opened = true;

		$(".clinic-map-info").hide();
		for (var i = 0; i < gBranchesmarkers.length; i++) {
			gBranchesmarkers[i].setIcon(branchesMapNormalMarker)
		}

		li.find(".clinic-map-info").show();
		
		gBranchesmarkers[$(this).data("num")].setIcon(branchesMapActiveMarker);
		return false;
	});

	//Закрываем адрес
	$("body").on("click", "#branchesList .clinic-map-info .closed", function(){
		$(this).closest(".clinic-map-info").hide();
		$("#branchesList li, #branchesList .branches-type").show();
		for (var i=0; i<gBranchesmarkers.length; i++) {
            gBranchesmarkers[i].setIcon(branchesMapNormalMarker);
        }
		opened = false;
		return false;
	});

	//Это нужно, чтобы отрисовывать маршруты
    directionsDisplay = new google.maps.DirectionsRenderer();
	directionsService = new google.maps.DirectionsService();

    //Поиск по адресу
    $("body").on("submit","#branchesList .address-search", function(){

    	var $this = $(this);
    	var start = new google.maps.LatLng($(this).closest(".clinic-map-info").find(".contacts-wrapper").data("latitude"),$(this).closest(".clinic-map-info").find(".contacts-wrapper").data("longitude"));

    	if (!$this.find(".textfield").val()){
    		return false;
    	}

    	var geocoder = new google.maps.Geocoder(); 

		geocoder.geocode({
				address : 'Нижний Новгород' + $this.find(".textfield").val(), 
				region: 'ru' 
			},
		    function(results, status) {
		    	if (status.toLowerCase() == 'ok') {
					// Get center
					var coords = new google.maps.LatLng(
						results[0]['geometry']['location'].lat(),
						results[0]['geometry']['location'].lng()
					);

					//Рисуем маршрут

					directionsDisplay.setMap(null);

				    var request = {
				        origin: coords, //точка старта
				        destination: start, //точка финиша
				        travelMode: google.maps.DirectionsTravelMode.DRIVING //режим прокладки маршрута
				    };

				    directionsService.route(request, function(response, status) {
				        if (status == google.maps.DirectionsStatus.OK) {
				            directionsDisplay.setDirections(response);
				        }
				    });

				    directionsDisplay.setMap(contactsMap);		    
 
		    	} else {
		    		console.log("Address not found");
		    	}
			}
		);

    	return false;
    });
}