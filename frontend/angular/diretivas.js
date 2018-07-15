app.directive('focus', function () {
    return function (scope, element) {
        element[0].focus();
    }
});

app.directive('irParaOTopo', function () {
    return {
        restrict: 'EA',
        template: '<a id="scrolltag" title="Clique aqui para ir ao topo" class="scrollup">Scroll</a>',
        link: function (scope, $elm) {
            var scrollObject = {};
            var scrollElement = document.getElementById('scrolltag');
            window.onscroll = getPosicaoScroll;

            scrollElement.addEventListener("click", rolarTop, false);

            function getPosicaoScroll() {
                scrollObject = {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                }
                if (scrollObject.y > 300) {
                    scrollElement.classList.add("visible");
                } else {
                    scrollElement.classList.remove("visible");
                }
            }

            function rolarTop() {
                var scrollDuration = 500;
                var scrollStep = -window.scrollY / (scrollDuration / 15);
                console.log(scrollStep);

                var scrollInterval = setInterval(function () {
                    if (window.scrollY != 0) {
                        window.scrollBy(0, scrollStep);
                    } else {
                        clearInterval(scrollInterval);
                    }
                }, 15);
            }
        }
    }
});
