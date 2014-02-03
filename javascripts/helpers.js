;(function(){
	merge = function(first, second){
		return JSON.parse((JSON.stringify(first) + JSON.stringify(second)).replace(/}{/g,","));
	}
	$ = function(selector){
		return document.querySelector(selector);
	}
})();