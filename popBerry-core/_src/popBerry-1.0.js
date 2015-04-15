/**
 * 
 * popBerry javaScript Library v1.0.0
 * 
 * Must supported by jquery1.6+
 * 
 * @Author lipengfei
 * @Email lipengfei217@163.com
 * @Date 2015-04-14
 * 
 */
(function(window, $, undefined) {

	// Use javaScript's strict mode.Some older browers will ignore this mode
	"use strict";

	if (!$) {
		alert(" Cannot find jQuery library,please import jQuery first,jquery1.6+ will be okay.");
		return;
	}
	;

	// create popBerry namespace...
	var _popBerry = window.popBerry;

	// Use the correct document accordingly with window argument (sandbox)
	var document = window.document;
	var location = window.location;
	var core_version = "1.0.0";

	var popBerry = function(selector, context) {

		return new popBerry.fn.init(selector, context);
	};

	popBerry.fn = popBerry.prototype = {

		// Current version of popBerry being used..
		popberry : core_version,

		constructor : popBerry,

		init : function(selector, context) {
			if (selector !== undefined) {
				this.selector = selector;
				return this;
			}
		},
		// Enable drag.
		dragable : function() {
			
			//Get current popBerry object;
			var that = this;

			var jqueryObj = $(this.selector);

			var arguLength = arguments.length, length = jqueryObj.length;

			// Only on element will be dragable
			jqueryObj.on("mousedown",function(){
				
				$(this).unbind("mousemove");				
				$(this).css("position","absolute");
				
				var preMousePosition=determinMouseCoordinate(event);
				
				var currX = jqueryObj.offset().left;
				var currY = jqueryObj.offset().top;
				
				var diffMousePosition={X:preMousePosition.X-currX,Y:preMousePosition.Y-currY};
				
				console.log(diffMousePosition);
				
				$(this).on("mousemove",function(){
					console.log(preMousePosition);
					dragEvent($(this),diffMousePosition,event);
				});
				
				
			});
			
			jqueryObj.on("mouseup",function(){
				$(this).css("position","relative");
				$(this).unbind("mousemove");
			});
				
		},
		selector : ""
	};

	// Give the init function the popBerry prototype for later instantiation
	popBerry.fn.init.prototype = popBerry.fn;
	
	function dragEvent(targetObj,diffMousePosition,event){
		
		var mousePosition = determinMouseCoordinate(event);
		
		//Get position of current element.
		var currX = targetObj.offset().left;
		var currY = targetObj.offset().top;
		
		var newLeft= currX+diffMousePosition.X;
		var newTop = currY+diffMousePosition.Y;
		
		console.log("diffX:"+diffMousePosition.X+" diffY:"+diffMousePosition.Y);
		targetObj.css("top",newTop+"px");
		targetObj.css("left",newLeft+"px");
	}
	
	//Get mouse's position
	function determinMouseCoordinate(event){
		var arr ={X:event.pageX,Y:event.pageY};
		return arr;
	}
	
	window.popBerry = popBerry;

})(window, jQuery);