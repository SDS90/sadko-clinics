//Услуги (страница)

$(function(){
	$(".service-page .open-link[href=#linkBlock]").click(function(){
		$($(this).attr("href")).slideToggle();
		return false;
	});
});