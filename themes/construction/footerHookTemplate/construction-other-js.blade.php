<script>
    /*
========================================
   Faq accordion
========================================
*/
    $(document).on('click', '.constructionFaq__title', function(e) {
        let element = $(this).closest('.constructionFaq__item');
        element.toggleClass('open');
        element.children('.constructionFaq__panel').slideToggle(300);
        element.siblings().removeClass('open').children('.constructionFaq__panel').slideUp(300);
    });


    /*
========================================
    counter Odometer
========================================
*/
    $(".construction_single_counter__count").each(function() {
        $(this).isInViewport(function(status) {
            if (status === "entered") {
                for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
                    var el = document.querySelectorAll('.odometer')[i];
                    el.innerHTML = el.getAttribute("data-odometer-final");
                }
            }
        });
    });
</script>
