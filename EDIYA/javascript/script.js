// 1. offcanvas open / close is-active 추가 / hidden false
// 2. detail--item open / close ediya-menu__item button is-close-panel


// Load Event (이미지까지 모드 로드한 후 실행)
//window.addEventListener('load', init);

// DOMContentLoaded Event (문서갹체구조가 완성되면 실행, 그래서 Load Event보다는 DOMContentLoaded을 더 권장)
(function(){
	document.addEventListener('DOMContentLoaded', init);

	var menuOpenBtn = null;
	var appNavi = null;
	var menuCloseBtn = null;
	var menu_item = null;


	function init(){
		accessingDOMElements();
		eventBind();
		a11yOffCanvas();
	}

	function accessingDOMElements(){
		menuOpenBtn = el('.button.is-open');
		appNavi = el('.app-navigation');
		menuCloseBtn = el('.button.is-close-menu');
		menu_item = els('.ediya-menu__item');
	}


	function canvasOpen(){
		appNavi.hidden = false;
		window.setTimeout(function(){
			appNavi.classList.add('is-active');
		}, 10);
		
	}

	function canvasClose(){
		appNavi.classList.remove('is-active');
		window.setTimeout(function(){
			appNavi.hidden = true;
		}, 600);
		
	}

	function eventBind(){

	for( var i=0; i<menu_item.length; i = i+1 ){
		var item = menu_item[i];
		var link = el('a', item);
		link.addEventListener('click', panelOpen.bind(link, i));
	}

	menuOpenBtn.addEventListener('click', canvasOpen);
	menuCloseBtn.addEventListener('click', canvasClose);
	}


	function panelOpen(index, e){
		e.preventDefault();
		var detail = el('.ediya-menu__item--detail', menu_item[index]);
		var panelCloseBtn = el('.button.is-close-panel', detail);
		detail.hidden = false;
		panelCloseBtn.addEventListener('click', panelClose);
		window.setTimeout(function(){
			detail.classList.add('is-active');
		}, 10);
	}

	function panelClose(){
		var parent = this.parentNode; 
		parent.classList.remove('is-active');
		window.setTimeout(function(){
			parent.hidden = true;
		}, 600);
	}

	function a11yOffCanvas(){
	window.addEventListener('keydown', function(e){
		if(e.keyCode === 27){
			canvasClose();
			var actived_items = document.querySelectorAll('.ediya-menu__item--detail.is-active');
			for(var i=0, l=actived_items.length; i<l; ++i){
				var panelCloseBtn = el('.button.is-close-panel', actived_items[i]);
				panelClose.call(panelCloseBtn);
			}
		}
	})
	}
	//init();
		
})();




