jQuery(document).ready(function($) {
	var wWidth;
	var wHeight;
	var car = $('p#car-prado');
	var filter = '<div id="filter"></div>';
	wWidth = $(window).outerWidth();
	wHeight = $(window).outerHeight();

	//setting of vegas
	var imageArray = [];
	var imageUrlDir = './images/bg/';
	var imageCnt = 56;

	(function init(){
		$('body').append(filter);
		$('#filter').css({
			backgroundColor:'#fff',
			position:'absolute',
			width:'100%',
			height:'100%',
			color:'red',
			zIndex:9999
		});
		$('.date').css({
			opacity:0
		});
		car.css({
			display:'none',
			left:wWidth+'px'
		});

		intro1()
		.then(intro2)
		.then(intro3)
		.then(intro4)
		.then(introEnd)
		.then(startVegas);

	})();

	//Event functions

	// startVegas();
	function startVegas(){
		for(var i = 1;i<=imageCnt;i++){
			var obj = {};
			var cnt = ('0'+i).substr(('0'+i).length-2,2);
			var pathStr = imageUrlDir+'bg_image_'+cnt+'.png';
			obj.src = pathStr;
			imageArray.push(obj);
		}
		imageArray.shuffle();

		$.vegas({
			src: null, // defined by Css
			align: 'center',
			valign: 'center',
			fade: 4000,
			loading: true,
			load: function(){},
			complete:    function(){}
		})
		('slideshow', {
			backgrounds:imageArray,
			delay:4000,
			fade:2000,
			preload:true,
			walk:stepSlideShow
		})('overlay', {
			src:'./images/vegas/03.png',
			opacity:0.2
		});

		function stepSlideShow(){
		}
	}//startVegas


	function intro1(){
		var d = new $.Deferred;
		var speed = 2000;
		$('#filter').delay(500).transition({
			width:0,
			opacity:0
		},speed,'linear',function(){
			d.resolve();
		});
		return d.promise();
	}

	function intro2(){
		var d = new $.Deferred;
		var speed = 500;
		$('.date').transition({
			opacity:1.0
		},speed,'linear',function(){
			d.resolve();
		});
		return d.promise();
	}

	function intro3(){
		//move car
		var d = new $.Deferred;
		var startSpeed = 1000;
		var speed = 1500;
		var carDelay = 500;
		car.css({
			display:'block'
		});
		car.transition({
			left:wWidth-car.find('img').width()+'px'
		},startSpeed,'easeOutSine',function(){
			$(this).delay(carDelay).transition({
				left:-car.find('img').width()+'px'
			},speed,'easeInQuad',function(){
				d.resolve();
			});
		});
		return d.promise();
	}

	function intro4(){
		var d = new $.Deferred;
		var speed = 2000;
		$('#filter').css({
			right:0,
			width:0,
		});
		$('#filter').transition({
			width:'100%',
			opacity:1.0
		},speed,'linear',function(){
			d.resolve();
		});
		return d.promise();
	}

	function introEnd(){
		var speed = 2000;
		var d = new $.Deferred;

		$('.text-inner').css({
			verticalAlign:'top',
			textAlign:'left',
			padding:'20px'
		});

		$('h1').css({
			fontSize:'4.0em',
			color:"#fff",
			lineHeight:'1.25em'
		});
		$('p.date').css({
			fontSize:'2.0em',
			color:"#fff",
			margin:0,
			marginTop:"10px"
		});

		$('#filter').transition({
			opacity:0
		},speed,'linear',function(){
			$(this).remove();
		});
		return d.promise;
	}

});

Array.prototype.shuffle = function() {
    var i = this.length;
    while(i){
        var j = Math.floor(Math.random()*i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

