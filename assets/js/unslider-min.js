!function(i){i?(i.Unslider=function(t,n){var o=this;return o._="unslider",o.defaults={autoplay:!1,delay:3e3,speed:750,easing:"swing",keys:{prev:37,next:39},nav:!0,arrows:{prev:'<a class="'+o._+'-arrow prev">Prev</a>',next:'<a class="'+o._+'-arrow next">Next</a>'},animation:"horizontal",selectors:{container:"ul:first",slides:"li"},animateHeight:!1,activeClass:o._+"-active",swipe:!0,swipeThreshold:.2},o.$context=t,o.options={},o.$parent=null,o.$container=null,o.$slides=null,o.$nav=null,o.$arrows=[],o.total=0,o.current=0,o.prefix=o._+"-",o.eventSuffix="."+o.prefix+~~(2e3*Math.random()),o.interval=null,o.init=function(t){return o.options=i.extend({},o.defaults,t),o.$container=o.$context.find(o.options.selectors.container).addClass(o.prefix+"wrap"),o.$slides=o.$container.children(o.options.selectors.slides),o.setup(),i.each(["nav","arrows","keys","infinite"],function(t,n){o.options[n]&&o["init"+i._ucfirst(n)]()}),jQuery.event.special.swipe&&o.options.swipe&&o.initSwipe(),o.options.autoplay&&o.start(),o.calculateSlides(),o.$context.trigger(o._+".ready"),o.animate(o.options.index||o.current,"init")},o.setup=function(){o.$context.addClass(o.prefix+o.options.animation).wrap('<div class="'+o._+'" />'),o.$parent=o.$context.parent("."+o._),"static"===o.$context.css("position")&&o.$context.css("position","relative"),o.$context.css("overflow","hidden")},o.calculateSlides=function(){var t;o.total=o.$slides.length,"fade"!==o.options.animation&&(t="width","vertical"===o.options.animation&&(t="height"),o.$container.css(t,100*o.total+"%").addClass(o.prefix+"carousel"),o.$slides.css(t,100/o.total+"%"))},o.start=function(){return o.interval=setTimeout(function(){o.next()},o.options.delay),o},o.stop=function(){return clearTimeout(o.interval),o},o.initNav=function(){var e=i('<nav class="'+o.prefix+'nav"><ol /></nav>');o.$slides.each(function(t){var n=this.getAttribute("data-nav")||t+1;i.isFunction(o.options.nav)&&(n=o.options.nav.call(o.$slides.eq(t),t,n)),e.children("ol").append('<li data-slide="'+t+'">'+n+"</li>")}),o.$nav=e.insertAfter(o.$context),o.$nav.find("li").on("click"+o.eventSuffix,function(){var t=i(this).addClass(o.options.activeClass);t.siblings().removeClass(o.options.activeClass),o.animate(t.attr("data-slide"))})},o.initArrows=function(){!0===o.options.arrows&&(o.options.arrows=o.defaults.arrows),i.each(o.options.arrows,function(t,n){o.$arrows.push(i(n).insertAfter(o.$context).on("click"+o.eventSuffix,o[t]))})},o.initKeys=function(){!0===o.options.keys&&(o.options.keys=o.defaults.keys),i(document).on("keyup"+o.eventSuffix,function(e){i.each(o.options.keys,function(t,n){e.which===n&&i.isFunction(o[t])&&o[t].call(o)})})},o.initSwipe=function(){var n=o.$slides.width();"fade"!==o.options.animation&&o.$container.on({movestart:function(t){return t.distX>t.distY&&t.distX<-t.distY||t.distX<t.distY&&t.distX>-t.distY?!!t.preventDefault():void o.$container.css("position","relative")},move:function(t){o.$container.css("left",-100*o.current+100*t.distX/n+"%")},moveend:function(t){Math.abs(t.distX)/n>o.options.swipeThreshold?o[t.distX<0?"next":"prev"]():o.$container.animate({left:-100*o.current+"%"},o.options.speed/2)}})},o.initInfinite=function(){var e=["first","last"];i.each(e,function(t,n){o.$slides.push.apply(o.$slides,o.$slides.filter(':not(".'+o._+'-clone")')[n]().clone().addClass(o._+"-clone")["insert"+(0===t?"After":"Before")](o.$slides[e[~~!t]]()))})},o.destroyArrows=function(){i.each(o.$arrows,function(t,n){n.remove()})},o.destroySwipe=function(){o.$container.off("movestart move moveend")},o.destroyKeys=function(){i(document).off("keyup"+o.eventSuffix)},o.setIndex=function(t){return t<0&&(t=o.total-1),o.current=Math.min(Math.max(0,t),o.total-1),o.options.nav&&o.$nav.find('[data-slide="'+o.current+'"]')._active(o.options.activeClass),o.$slides.eq(o.current)._active(o.options.activeClass),o},o.animate=function(t,n){return"last"===(t="first"===t?0:t)&&(t=o.total),isNaN(t)||(o.options.autoplay&&o.stop().start(),o.setIndex(t),o.$context.trigger(o._+".change",[t,o.$slides.eq(t)]),t="animate"+i._ucfirst(o.options.animation),i.isFunction(o[t])&&o[t](o.current,n)),o},o.next=function(){var t=o.current+1;return t>=o.total&&(t=0),o.animate(t,"next")},o.prev=function(){return o.animate(o.current-1,"prev")},o.animateHorizontal=function(t){var n="left";return"rtl"===o.$context.attr("dir")&&(n="right"),o.options.infinite&&o.$container.css("margin-"+n,"-100%"),o.slide(n,t)},o.animateVertical=function(t){return o.options.animateHeight=!0,o.options.infinite&&o.$container.css("margin-top",-o.$slides.outerHeight()),o.slide("top",t)},o.slide=function(t,n){o.options.animateHeight&&o._move(o.$context,{height:o.$slides.eq(n).outerHeight()},!1),o.options.infinite&&(n===o.total-1&&(e=o.total-3,n=-1),n===o.total-2&&(e=0,n=o.total-2),"number"==typeof e)&&(o.setIndex(e),o.$context.on(o._+".moved",function(){o.current===e&&o.$container.css(t,-100*e+"%").off(o._+".moved")}));var e,i={};return i[t]=-100*n+"%",o._move(o.$container,i)},o.animateFade=function(t){t=o.$slides.eq(t).addClass(o.options.activeClass);o._move(t.siblings().removeClass(o.options.activeClass),{opacity:0}),o._move(t,{opacity:1},!1)},o._move=function(t,n,e,i){return t._move(n,i||o.options.speed,o.options.easing,e=!1!==e?function(){o.$context.trigger(o._+".moved")}:e)},o.init(n)},i.fn._active=function(t){return this.addClass(t).siblings().removeClass(t)},i._ucfirst=function(t){return(t+"").toLowerCase().replace(/^./,function(t){return t.toUpperCase()})},i.fn._move=function(){return this.stop(!0,!0),i.fn[i.fn.velocity?"velocity":"animate"].apply(this,arguments)},i.fn.unslider=function(e){return this.each(function(){var t=i(this);if("string"==typeof e&&t.data("unslider")){e=e.split(":");var n=t.data("unslider")[e[0]];if(i.isFunction(n))return n.apply(t,e[1]?e[1].split(","):null)}return t.data("unslider",new i.Unslider(t,e))})}):console.warn("Unslider needs jQuery")}(window.jQuery);