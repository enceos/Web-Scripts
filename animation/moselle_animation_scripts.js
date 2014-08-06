$(document).ready(function() {  	
	timer();

	//var page = $('input[name="page"]').val().match(/(?:\/)(.{1})(?:\/.*)$/i);
	//if(page == 'a')	{
	var prefix = '';
	/*} else {
		if(page != null)
			var prefix = '../a/';
		else
			var prefix = 'a/';
	}*/
	
	var Android = navigator.userAgent.search(/Android/i);
	var iPhone = navigator.userAgent.search(/iPhone/i);
	var iPad = navigator.userAgent.search(/iPad/i);
	if(Android != -1 || iPhone != -1 || iPad != -1) {
		$('html').css('width', window.innerWidth + 'px');
	} else {
		$(".scroll").each(function () {
			var block = $(this);
			$(window).scroll(function() {
				var top = block.offset().top;
				var bottom = block.height()+top;
				top = top - $(window).height();
				var scroll_top = $(this).scrollTop();
				if ((scroll_top > top) && (scroll_top < bottom)) {
					if (!block.hasClass("animated")) {
						block.addClass("animated");
					}
				} else {
					block.removeClass("animated");
				}
			});
		});
		$('head').append('<link rel="stylesheet" href="'+prefix+'css/animation.css" />');
	}

	$('.button').click(function() {
		$('body').find('form:not(this)').children('label').removeClass('red');
		//var page = $('input[name="page"]').val().match(/(?:\/)(.{1})(?:\/.*)$/i);
		//if(page == null) {
			var url = "send.php";
		/*} else {
			var url = "../send.php";
		}*/
		var utm_source = $('input[name="ref_url"]').val().match(/(?:utm_source=)(.*)(?:&utm_medium)/i);
		var utm_medium = $('input[name="ref_url"]').val().match(/(?:utm_medium=)(.*)(?:&utm_campaign)/i);
		var utm_campaign = $('input[name="ref_url"]').val().match(/(?:utm_campaign=)(.*)(?:&utm_term)/i);
		var utm_term = $('input[name="ref_url"]').val().match(/(?:utm_term=)([0-9a-zA-Zа-яА-Я%]{1,})/i);
		if(utm_source == null || utm_medium == null || utm_campaign == null || utm_term == null)
			var utms = '';
		else
			var utms = '\nutm_source = '+utm_source[1]+'\nutm_medium = '+utm_medium[1]+'\nutm_campaign = '+utm_campaign[1]+'\nutm_term = '+utm_term[1]+'\n';
		var answer = checkForm($(this).parent().get(0));
		if(answer != false)
		{
			var $form = $(this).parent(),
				name =     $('input[name="name"]', $form).val(),
				phone =    $('input[name="phone"]', $form).val(),
				email =    $('input[name="email"]', $form).val(),
				ques =     $('textarea[name="ques"]', $form).val(),
				sbt =      $('input[type="button"]', $form).attr("name"),
				submit =   $('input[name='+sbt+']', $form).val();
			var ref =      $('input[name="referer"]').val();
			var ref = ref+utms;
			var formname = $('input[name="formname"]').val();
			$.ajax({
				type: "POST",
				url: url,
				dataType: "json",
				data: "name="+name+"&phone="+phone+"&"+sbt+"="+submit+"&email="+email+"&ques="+ques+"&formname="+formname+"&ref="+ref
			}).always(function() {
				//if(page == null) {
					document.location.href = sbt+'.php';
				/*} else {
					document.location.href = '../'+sbt+'.php';
				}*/
			});
		}
	});
	
	$('[id*=sertimg]').fancybox({
		'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600, 
		'speedOut'		:	200,
		
	});

	var top = (window.outerHeight - 250 - 180) / 2 + 'px';
	$('.target').css('top', top);
});

$(window).resize(function(){
	var Mtop = -($('.activePopup').outerHeight() / 2) + 'px';
	var Mleft = -($('.activePopup').outerWidth() / 2) + 'px';
	$('.activePopup').css({
		'margin-top' : Mtop,
		'margin-left' : Mleft,
		'left' : '50%',
		'top' : '50%'
 	});
	var targetTop = (window.outerHeight - 250 - 180) / 2 + 'px';
	$('.target').css('top', targetTop);
});

function timer()
{
	var now = new Date();
	newDate = new Date((now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear()+" 23:59:59");
	var totalRemains = (newDate.getTime()-now.getTime());
	   
	if (totalRemains>1)
	{
		var Days = (parseInt(parseInt(totalRemains/1000)/(24*3600)));
		var Hours = (parseInt((parseInt(totalRemains/1000) - Days*24*3600)/3600));
		var Min = (parseInt(parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600)/60));
		var Sec = parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600) - Min*60;
		if (Sec<10){Sec="0"+Sec}
		if (Min<10){Min="0"+Min}
		if (Hours<10){Hours="0"+Hours}
		if (Days<10){Days="0"+Days}
		$(".day").each(function() { $(this).text(Days); });
		$(".hour").each(function() { $(this).text(Hours); });
		$(".min").each(function() { $(this).text(Min); });
		$(".sec").each(function() { $(this).text(Sec); });
		setTimeout(timer, 1000);
	}
}

function popup( id, form )
{	
	var block 	= $( '#' + id );
	if( form ){
		$('.popup_h1', block).text( form );
	}

	$('.popup_shadow').show();
	$('#'+id).addClass('activePopup');
	var Mtop = -($('.activePopup').outerHeight() / 2) + 'px';
	var Mleft = -($('.activePopup').outerWidth() / 2) + 'px';
	$('.activePopup').css({
		'margin-top' : Mtop,
		'margin-left' : Mleft,
		'left' : '50%',
		'top' : '50%'
 	});
	$('.activePopup').show();
	$('.formname').attr("value", form);
}

function popup_out()
{
	$('.popup_shadow').hide();
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
}

jQuery(document).ready(function(){
			jQuery('.spoiler-text').hide()
			jQuery('.spoiler').click(function(){
				jQuery(this).toggleClass("folded").toggleClass("unfolded").next().slideToggle()
			})
		})