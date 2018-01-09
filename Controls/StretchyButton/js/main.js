document.body   .onload=((e) => {
    var stretchyNavs = document.getElementsByClassName("cd-stretchy-nav");
    function toggleClass(dom, className) {
        if (dom.classList.contains(className))
            dom.classList.remove(className);
        else dom.classList.add(className);
    }
    if (stretchyNavs.length > 0) {
        for (var i of stretchyNavs) {
            (function myfunction() {
                var stretchyNav = this,
                    stretchyNavTrigger = $('.cd-nav-trigger', stretchyNav);
                if (!stretchyNavTrigger.length) return;
                for (var x of stretchyNavTrigger)
                    x.addEventListener('click', function (event) {
                        event.preventDefault();
                        toggleClass(stretchyNav, 'nav-is-visible');
                    });
            }).call(i);
        }
        //stretchyNavs.each(function(){
        //	var stretchyNav = $(this),
        //		stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');
        //           function toggleClass(dom,className){
        //              if (dom.className.contains(className))
        //                  dom.classList.remove(className);
        //              else dom.classList.add(className);
        //          }
        //	stretchyNavTrigger.on('click', function(event){
        //              event.preventDefault();
        //              toggleClass(stretchyNav, 'nav-is-visible');
        //	});
        //});
        document.addEventListener('click', function (event) {
            var target = event.target;
            var classList = target.classList;
            if (classList.contains('cd-nav-trigger')) return;
            if (classList.contains('cd-nav-trigger') || target.tagName === 'SPAN') return;
            for (var i of stretchyNavs)
                i.classList.remove('nav-is-visible');
            //( !$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span') ) && stretchyNavs.removeClass('nav-is-visible');
        });
    }
});
//jQuery(document).ready(function () {
    
//});