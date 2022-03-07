/**
 * Simple CSS animations
 */
$(function() {
    var $window           = $(window),
        win_height_padded = $window.height() * 1.1,
        isTouch           = Modernizr.touch;

    if (isTouch) { $('.revealOnScroll').addClass('animated'); }

    $window.on('scroll', revealOnScroll);

    function revealOnScroll() {
        var scrolled = $window.scrollTop(),
            win_height_padded = $window.height() * 1.1;

        // Showed...
        $(".revealOnScroll:not(.animated)").each(function () {
            var $this     = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
                if ($this.data('timeout')) {
                    window.setTimeout(function(){
                        $this.addClass('animated ' + $this.data('animation'));
                    }, parseInt($this.data('timeout'),10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                }
            }
        });
        // Hidden...
        $(".revealOnScroll.animated").each(function (index) {
            var $this     = $(this),
                offsetTop = $this.offset().top;
            if (scrolled + win_height_padded < offsetTop) {
                $(this).removeClass('animated fadeInUp flipInX lightSpeedIn')
            }
        });
    }
    revealOnScroll();
});

/**
 * Counter animations (numbers) - custom
 */
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
obj = document.querySelectorAll("#numbersrand");
$(window).scroll(function() {
    scroll = $(window).scrollTop();
    if(scroll > 980) {
        obj.forEach(element => {
                animateValue(element, 0, element.getAttribute('data-id'), 2000);
            }
        );
        delete window.obj;
        delete scroll.obj;
    }
});