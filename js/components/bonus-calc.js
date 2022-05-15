

$(function(){
	var startPrice = parseInt($("#bonusCalcBlock").data("start-sum")); //Стартовая цена

	//Ползунок
	$("#bonus-calc #range").ionRangeSlider({
        type: 'single',
        keyboard: true,
        min: 0, //Минимальное значение
        max: 1000000, //Максимальное значение
        from: startPrice,
        step: 1,
        onStart: function (data) {
		    checkBonus(data)
	    },
        onChange: function (data) {
	         checkBonus(data)
	    },
	    onUpdate: function (data) {
	    	 checkBonus(data)
	    }
    });

    function checkBonus(data){
    	var sum = data.from;
    	var percent = $("#bonusPercent");
    	$("#bonus-calc #calcSum").text(sum.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    	
    	switch(true){
    		case (sum > 0) && (sum < 20000): {
    			percent.text(3);
    			break;
    		}
    		case (sum >= 20000) && (sum < 30000): {
    			percent.text(4);
    			break;
    		}
    		case (sum >= 30000) && (sum < 50000): {
    			percent.text(5);
    			break;
    		}
    		case (sum >= 50000) && (sum < 100000): {
    			percent.text(6);
    			break;
    		}
    		case (sum >= 100000) && (sum < 150000): {
    			percent.text(7);
    			break;
    		}
    		case (sum >= 150000) && (sum < 200000): {
    			percent.text(8);
    			break;
    		}
    		case (sum >= 200000) && (sum < 300000): {
    			percent.text(9);
    			break;
    		}
    		case (sum >= 300000) && (sum < 500000): {
    			percent.text(10);
    			break;
    		}
    		case (sum >= 500000) && (sum < 700000): {
    			percent.text(11);
    			break;
    		}
    		case (sum >= 700000) && (sum < 800000): {
    			percent.text(12);
    			break;
    		}
    		case (sum >= 800000) && (sum < 900000): {
    			percent.text(13);
    			break;
    		}
    		case (sum >= 900000) && (sum < 1000000): {
    			percent.text(14);
    			break;
    		}
    		case (sum >= 1000000) : {
    			percent.text(15);
    			break;
    		}
    		default : {
				percent.text(0);
    			break;
    		}
    	}
    }
});