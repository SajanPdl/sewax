(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {

        /*-----------------------------------
            Nab (window remove class responsive)
        -----------------------------------*/
        if ($(window).width() < 992) {
            $(".mobile-style").removeClass("show");
        }

        /*-----------------------------------
            Nab (window remove class responsive)
        -----------------------------------*/
        $('.tab-menu-global li a').on('click', function(){
            var target = $(this).attr('data-rel');
         $('.tab-menu-global li a').removeClass('active');
            $(this).addClass('active');
            $("#"+target).fadeIn('slow').siblings(".singleTab-items-global").hide();
            return false;
        });


        /*-----------------------------------
            global slick slicer control
        -----------------------------------*/
        var globalSlickInit = $('.global-slick-init');
        if (globalSlickInit.length > 0) {

            //todo have to check slider item
            $.each(globalSlickInit, function (index, value) {
                if ($(this).children('div').length > 1) {

                    //todo configure slider settings object
                    var sliderSettings = {};
                    var allData = $(this).data();
                    var infinite = typeof allData.infinite == 'undefined' ? false : allData.infinite;
                    var arrows = typeof allData.arrows == 'undefined' ? false : allData.arrows;
                    var autoplay = typeof allData.autoplay == 'undefined' ? false : allData.autoplay;
                    var focusOnSelect = typeof allData.focusonselect == 'undefined' ? false : allData.focusonselect;
                    var swipeToSlide = typeof allData.swipetoslide == 'undefined' ? false : allData.swipetoslide;
                    var slidesToShow = typeof allData.slidestoshow == 'undefined' ? 1 : allData.slidestoshow;
                    var slidesToScroll = typeof allData.slidestoscroll == 'undefined' ? 1 : allData.slidestoscroll;
                    var speed = typeof allData.speed == 'undefined' ? '500' : allData.speed;
                    var dots = typeof allData.dots == 'undefined' ? false : allData.dots;
                    var cssEase = typeof allData.cssease == 'undefined' ? 'linear' : allData.cssease;
                    var prevArrow = typeof allData.prevarrow == 'undefined' ? '' : allData.prevarrow;
                    var nextArrow = typeof allData.nextarrow == 'undefined' ? '' : allData.nextarrow;
                    var centerMode = typeof allData.centermode == 'undefined' ? false : allData.centermode;
                    var centerPadding = typeof allData.centerpadding == 'undefined' ? false : allData.centerpadding;
                    var rows = typeof allData.rows == 'undefined' ? 1 : parseInt(allData.rows);
                    var autoplay = typeof allData.autoplay == 'undefined' ? false : allData.autoplay;
                    var autoplaySpeed = typeof allData.autoplayspeed == 'undefined' ? 2000 : parseInt(allData.autoplayspeed);
                    var lazyLoad = typeof allData.lazyload == 'undefined' ? false : allData.lazyload; // have to remove it from settings object if it undefined
                    var appendDots = typeof allData.appenddots == 'undefined' ? false : allData.appenddots;
                    var appendArrows = typeof allData.appendarrows == 'undefined' ? false : allData.appendarrows;
                    var asNavFor = typeof allData.asnavfor == 'undefined' ? false : allData.asnavfor;
                    var verticalSwiping = typeof allData.verticalswiping == 'undefined' ? false : allData.verticalswiping;
                    var vertical = typeof allData.vertical == 'undefined' ? false : allData.vertical;
                    var fade = typeof allData.fade == 'undefined' ? false : allData.fade;
                    var rtl = typeof allData.rtl == 'undefined' ? false : allData.rtl;
                    var responsive = typeof $(this).data('responsive') == 'undefined' ? false : $(this).data('responsive');

                    //slider settings object setup
                    sliderSettings.infinite = infinite;
                    sliderSettings.arrows = arrows;
                    sliderSettings.autoplay = autoplay;
                    sliderSettings.focusOnSelect = focusOnSelect;
                    sliderSettings.swipeToSlide = swipeToSlide;
                    sliderSettings.slidesToShow = slidesToShow;
                    sliderSettings.slidesToScroll = slidesToScroll;
                    sliderSettings.speed = speed;
                    sliderSettings.dots = dots;
                    sliderSettings.cssEase = cssEase;
                    sliderSettings.prevArrow = prevArrow;
                    sliderSettings.nextArrow = nextArrow;
                    sliderSettings.rows = rows;
                    sliderSettings.autoplaySpeed = autoplaySpeed;
                    sliderSettings.autoplay = autoplay;
                    sliderSettings.verticalSwiping = verticalSwiping;
                    sliderSettings.vertical = vertical;
                    sliderSettings.rtl = rtl;

                    if (centerMode != false) {
                        sliderSettings.centerMode = centerMode;
                    }
                    if (centerPadding != false) {
                        sliderSettings.centerPadding = centerPadding;
                    }
                    if (lazyLoad != false) {
                        sliderSettings.lazyLoad = lazyLoad;
                    }
                    if (appendDots != false) {
                        sliderSettings.appendDots = appendDots;
                    }
                    if (appendArrows != false) {
                        sliderSettings.appendArrows = appendArrows;
                    }
                    if (asNavFor != false) {
                        sliderSettings.asNavFor = asNavFor;
                    }
                    if (fade != false) {
                        sliderSettings.fade = fade;
                    }
                    if (responsive != false) {
                        sliderSettings.responsive = responsive;
                    }
                    $(this).slick(sliderSettings);
                }
            });
        }

        /*-----------------------------------
            sidebar dropdown
        -----------------------------------*/
        $('.singleOption .optionBody').hide();
        $(".singleOption a").click(function () {
            $(this).parent(".singleOption").children(".optionBody").slideToggle("100");
            $(this).find(".icon").toggleClass("las la-plus las la-minus");
        });

        // File upload
        $('.input-file').each(function() {
            var $input = $(this),
                $label = $input.next('.js-labelFile'),
                labelVal = $label.html();

            $input.on('change', function(element) {
                var fileName = '';
                if (element.target.value) fileName = element.target.value.split('\\').pop();
                fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
            });
        });


        /*------------------------------
            payment gateway selection
        -------------------------------*/
        $(".payment-gateway-list li").on('click', function () {
            $(".payment-gateway-list li").removeClass("selected");
            $(this).addClass("selected");
        });


        /*-----------------------------------
           howWishList , ShowCart
        -----------------------------------*/

        // ShowWishList

            $(document).on('click', '.openWishList', function(){
                $('.ShowWishList, .close-overlay').addClass('show');
            })

            $(document).on('click', '.closedWishList, .close-overlay', function(){
                $(".ShowWishList, .close-overlay").removeClass("show");
            })


        // ShowCart
            $(document).on('click', '.openCart', function(){
                $('.ShowCart, .close-overlay').addClass('show');
            })

            $(document).on('click', '.closedCart, .close-overlay', function(){
                $(".ShowCart, .close-overlay").removeClass("show");
            })


        /*-----------------------------------
           Scrolling Full width section
        -----------------------------------*/
        $(".subscribeArea .container").length && $(window).on("scroll", function() {
            ! function(t, a = 0) {
                var i = $(window).scrollTop(),
                    o = i + $(window).height(),
                    s = $(t).offset().top;
                return s + $(t).height() - parseInt(a) <= o && s >= i
            }(".subscribeArea .container", 200) ? $(".subscribeArea .container").removeClass("container-fluid"): $(".subscribeArea .container").addClass("container-fluid")
        })

        /*-----------------------------------
            Click Value Add
        -----------------------------------*/
        // $(document).on('click', '.size-lists li', function(event) {
        //     var el = $(this);
        //     var value = el.data('value');
        //     var parentWrap = el.parent().parent();
        //     el.addClass('active');
        //     el.siblings().removeClass('active');
        //     parentWrap.find('.value-size').val(value);
        //
        // });

        /*-----------------------------------
            User Account
        -----------------------------------*/
        $('.userAccount').on('click', function () {
            $('.userAccount-wrapper').slideToggle(300);
        });

        /*-----------------------------------
            MainSlider-1
        -----------------------------------*/
        function mainSlider() {
            var BasicSlider = $('.slider-active');
            BasicSlider.on('init', function (e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
            });
            BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
            });
            BasicSlider.slick({
            autoplay: true,
            autoplaySpeed: 4000,
            dots: false,
            fade: true,
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="ti-shift-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-shift-right"></i></button>',
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
                },
                {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
                },
                {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
                }
            ]
            });

            function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                $this.removeClass($animationType);
                });
            });
            }
        }
        mainSlider();

        /*------------------------------
            payment gateway selection
        -------------------------------*/
        $(".payment-gateway-list li").on('click', function () {
            $(".payment-gateway-list li").removeClass("selected");
            $(this).addClass("selected");
        });

        /*-----------------------------------
            selectPricing , Tag
        -----------------------------------*/
        $(".selectPricing li, .selectTag li").click(function () {
            $(this).toggleClass('active').siblings().removeClass('active');
        });

        /*-----------------------------------
            Data-background
        -----------------------------------*/
        $("[data-background]").each(function () {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
        });

        /*--------------------------------
            increase & decrease
        --------------------------------*/
        // $(document).on('click', '.decrease', function (event) {
        //     event.preventDefault();
        //     let el = $(this);
        //     let parentWrap = el.parent();
        //     let qty = parentWrap.find('.qty_');
        //     let qtyVal = qty.val();
        //     if (qtyVal > 1) {
        //         qty.val(parseInt(qtyVal) - 1);
        //     }
        // });
        // $(document).on('click', '.increase', function (event) {
        //     event.preventDefault();
        //     let el = $(this);
        //     let parentWrap = el.parent();
        //     let qty = parentWrap.find('.qty_');
        //     let qtyVal = qty.val();
        //     if (qtyVal > 0) {
        //         qty.val(parseInt(qtyVal) + 1);
        //     }
        // });

        /*-----------------------------------
            Search Suggestions js
        -----------------------------------*/
        $(document).on('keyup', '.keyup-input', function(event){
            var input_values = $(this).val();
            if(input_values.length > 0){
                $('.search-showHide').addClass('show');
            }else{
                $('.search-showHide').removeClass('show');
            }
        })
        // Removed Search Bar when closed icon Click
        $(document).on('click', '.closed-icon', function() {
            $('.search-showHide').removeClass("show")
        });

        /*-----------------------------------
           On Click Open Navbar right contents
        -----------------------------------*/
        $(document).on('click', '.click_show_icon', function() {
            $(".nav-right-content").toggleClass("active");
        });

        /*-----------------------------------
            Navbar Toggler Icon
        ------------------------------*/
        $(document).on('click', '.navbar-toggler', function() {
            $(this).toggleClass("active")
        });

        /*------------------------------
           Pop Up Img
        -------------------------------*/
        var popUp = $('.img-pop-up');
        if(popUp.length){
            popUp.magnificPopup({
                type: 'image',
                gallery:{
                enabled:true
                }
            });
        }

        /*------------------------------
           Pop Up Video
        -------------------------------*/
        var popUp = $('.popup-video');
            if(popUp.length){
            popUp.magnificPopup({
            type: 'iframe'
            });
        }

        /*-----------------------------------
            Lazy - Image loader
        -----------------------------------*/
        $('.lazy').Lazy();

        /*-----------------------------------
            WOW active
        -----------------------------------*/
        new WOW().init();


        //Dynamic Progressbar
        var progressBar = $('.donation-progress');

        if (progressBar.length){
            $.each(progressBar,function (value){
                var el = $(this);
                progressBarInit(el,el.data('percentage'));
            })
        }
        function progressBarInit(selector,percentage){
            selector.rProgressbar({
                percentage: percentage,
                fillBackgroundColor: 'var(--main-color-one)'
            });
        }



        // Progress
        // $('.bar-1').rProgressbar({
        //     percentage: 90,
        //     fillBackgroundColor: 'var(--main-color-one)'
        // });

        $('.bar-2').rProgressbar({
            percentage: 80,
            fillBackgroundColor: 'var(--main-color-one)'
        });

        $('.bar-3').rProgressbar({
            percentage: 90,
            fillBackgroundColor: 'var(--main-color-one)'
        });

        $('.bar-4').rProgressbar({
            percentage: 85,
            fillBackgroundColor: 'var(--main-color-one)'
        });

        $('.bar-5').rProgressbar({
            percentage: 90,
            fillBackgroundColor: 'var(--main-color-one)'
        });

        $('.bar-6').rProgressbar({
            percentage: 80,
            fillBackgroundColor: 'var(--main-color-one)'
        });

        $('.bar-7').rProgressbar({
            percentage: 90,
            fillBackgroundColor: 'var(--main-color-one)'
        });

        $('.bar-8').rProgressbar({
            percentage: 85,
            fillBackgroundColor: 'var(--main-color-one)'
        });

        /*-----------------------------------
            Hover section Tilt Effect
        -----------------------------------*/
        $('.tilt-effect').tilt({
            maxTilt: 6,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            speed: 500,
            transition: true
        });

        /*-----------------------------------
            Nice Select
        -----------------------------------*/
        var nice_Select = $('.niceSelect');
        if(nice_Select.length){
            nice_Select.niceSelect();
        }

        //18. Active Odometer Counter
        $('.odometer').appear(function (e) {
            var odo = jQuery(".odometer");
            odo.each(function () {
            var countNumber = jQuery(this).attr("data-count");
            jQuery(this).html(countNumber);
            });
        });

        /*-----------------------------------
            Telephone country selector
        -----------------------------------*/
        if(document.getElementById('phone') != null){

            var input = document.querySelector("#phone");
            window.intlTelInput(input, { });
        }

        /*-----------------------------------
            Back To TOP
        -----------------------------------*/
        (function(){
            var progressPath = document.querySelector('.progressParent path');
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
            var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
            }
            updateProgress();
            $(window).scroll(updateProgress);
            var offset = 50;
            var duration = 550;
            jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progressParent').addClass('rn-backto-top-active');
            } else {
                jQuery('.progressParent').removeClass('rn-backto-top-active');
            }
            });
            jQuery('.progressParent').on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, duration);
            return false;
            })
        })();

        //18. Active Odometer Counter
        $('.odometer').appear(function (e) {
            var odo = jQuery(".odometer");
            odo.each(function () {
            var countNumber = jQuery(this).attr("data-count");
            jQuery(this).html(countNumber);
            });
        });


    });

    $(window).on('load', function () {
        /*------------------------------
            Preloader
        -------------------------------*/
        $('.preloader-inner').fadeOut(1000);
    });


}(jQuery));


