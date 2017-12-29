;(function(window, undefined){
	var bw = function(){
		return new bw();
	}
	
	bw.toast = function ( msg ) {
		var toast = document.getElementById('bw-toast')
		if(!toast){
			var dom = document.createElement('div');
			dom.classList = 'bw-toast noselect';
			dom.id = 'bw-toast';
			// dom.setAttribute('class', 'bw-toast noselect');
			dom.setAttribute('style', 'top: -36px;');
			dom.setAttribute('unselectable', 'on');
			var msg = document.createTextNode(msg);
			dom.appendChild(msg);
			document.body.appendChild(dom);
			this.once(function(){
				var bodyWidth = document.body.clientWidth;
				var toastWidth = dom.clientWidth;
				dom.setAttribute('style', 'top: 10px;left: '+(bodyWidth-toastWidth)/2+'px;opacity:1;');
			}, 0)
			this.once(function(){
				dom.classList.add('toastout')
				dom.addEventListener("webkitAnimationEnd", function(){
					dom.parentNode.removeChild(dom);
				}, false);
			}, 3000)
		} else {
			toast.parentNode.removeChild(toast);
			this.toast(msg)
		}
	},
	bw.once = function(callback, time){
		var timer = setTimeout(function(){
			callback && callback();
		}, time);
		return timer;
	}

	window.bw = bw;
})(window);


/*
function bw(){
	
};

bw.fn = bw.prototype = {
	constructor: bw,
	init:function(){
        this.sayHello = function(){
            this.toast();
        }
    },
	once: function(callback, time){
		var timer = setTimeout(function(){
			callback && callback();
		}, time);
		return timer;
	},
	toast: function ( msg ) {
		var toast = document.getElementById('bw-toast')
		if(!toast){
			var dom = document.createElement('div');
			dom.classList = 'bw-toast noselect';
			dom.id = 'bw-toast';
			// dom.setAttribute('class', 'bw-toast noselect');
			dom.setAttribute('style', 'top: -36px;');
			dom.setAttribute('unselectable', 'on');
			var msg = document.createTextNode(msg);
			dom.appendChild(msg);
			document.body.appendChild(dom);
			this.once(function(){
				var bodyWidth = document.body.clientWidth;
				var toastWidth = dom.clientWidth;
				dom.setAttribute('style', 'top: 10px;left: '+(bodyWidth-toastWidth)/2+'px;opacity:1;');
			}, 0)
			this.once(function(){
				dom.classList.add('toastout')
				dom.addEventListener("webkitAnimationEnd", function(){
					dom.parentNode.removeChild(dom);
				}, false);
			}, 3000)
		} else {
			toast.parentNode.removeChild(toast);
			this.toast(msg)
		}
	}
}
*/