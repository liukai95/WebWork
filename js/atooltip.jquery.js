(function($) {
    $.fn.aToolTip = function(options) {
    
    	// 设置默认设置
    	var defaults = {
    		clickIt: true,
    		closeTipBtn: 'aToolTipCloseBtn',
    		fixed: true,
    		inSpeed: 200,
    		outSpeed: 0,
    		tipContent: '',
    		toolTipClass: 'aToolTip',
    		xOffset: 5,
    		yOffset: 5
    	},
    
    	// 用户自定义选项覆盖默认设置
    	settings = $.extend({}, defaults, options);
		return this.each(function() {
			var obj = $(this);
			if(obj.attr('title')){
				var tipContent = obj.attr('title');	 
			} else {
				var tipContent = settings.tipContent;
			}
			
			if(tipContent && !settings.clickIt){	
				// 激活	
				obj.hover(function(el){
					obj.attr({title: ''});						  
					$('body').append("<div class='"+ settings.toolTipClass +"'><p class='aToolTipContent'>"+ tipContent +"</p></div>");
					$('.' + settings.toolTipClass).css({
						position: 'absolute',
						display: 'none',
						zIndex: '50000',
						top: (obj.offset().top - $('.' + settings.toolTipClass).outerHeight() - settings.yOffset) + 'px',
						left: (obj.offset().left + 1/2*(obj.outerWidth()) + settings.xOffset) + 'px'
					})
					.stop().fadeIn(settings.inSpeed);	
			    },
				function(){ 
					// 淡出
					$('.' + settings.toolTipClass).stop().fadeOut(settings.outSpeed, function(){$(this).remove();});
			    });	
		    }
		    
		    // 根据鼠标的点击是移走还是固定
		    if(!settings.fixed && !settings.clickIt){
				obj.mousemove(function(el){
					$('.' + settings.toolTipClass).css({
						top: (el.pageY - $('.' + settings.toolTipClass).outerHeight() - settings.yOffset),
						left: (el.pageX + settings.xOffset)
					})
				});			
			} 		    
		    
		    // 检查点击功能是否启用
		    if(tipContent && settings.clickIt){
				// 点击激活	
				obj.click(function(el){
					obj.attr({title: ''});						  
					$('body').append("<div class='"+ settings.toolTipClass +"'><p class='aToolTipContent'>"+ tipContent +"</p></div>");
					$('.' + settings.toolTipClass).append("<a class='"+ settings.closeTipBtn +"' href='#' alt='close'>close</a>");
					$('.' + settings.toolTipClass).css({
						position: 'absolute',
						display: 'none',
						zIndex: '50000',
						top: (obj.offset().top - $('.' + settings.toolTipClass).outerHeight() - settings.yOffset) + 'px',
						left: (obj.offset().left + obj.outerWidth() + settings.xOffset) + 'px'
					})
					.fadeIn(settings.inSpeed);	
					// 点击关闭
					$('.' + settings.closeTipBtn).click(function(){
						$('.' + settings.toolTipClass).fadeOut(settings.outSpeed, function(){$(this).remove();});
						return false;
					});		 
					return false;			
			    });
		    }
		  
		}); 
		return this;
    };
})(jQuery);

$(document).ready(function() {		
	$('.normaltip').aToolTip({
    	toolTipClass: 'aToolTip'});

})
