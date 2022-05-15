
//Страница врача (персональная)
$(function(){
	$(".doctor-education-section .more-education").click(function(){
		var $this = $(this),
			text = $this.text();
		$this.closest(".doctor-education-years").find(".hover-block").slideToggle();
		$this.text($this.data("opened-text"));
		$this.data("opened-text",text);
		return false;
	});
});