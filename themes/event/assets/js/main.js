(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {

        /*--------------------------------
            increase & decrease
        --------------------------------*/
        $(document).on('click', '.decrease', function (event) {
            event.preventDefault();
            let el = $(this);
            let parentWrap = el.parent();
            let qty = parentWrap.find('.qty_');
            let qtyVal = qty.val();
            if (qtyVal > 1) {
                qty.val(parseInt(qtyVal) - 1);
            }
        });
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

    });







}(jQuery));


