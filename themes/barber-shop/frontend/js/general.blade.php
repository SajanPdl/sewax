
<script>
    let site_currency_symbol = '{{ site_currency_symbol() }}';

    @if(tenant()->theme_slug == 'theme-1')
    $('.theme-one-footer .col-lg-3').removeClass('col-lg-3').addClass('col-lg-4');
    @endif
</script>

<script>
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp",
    };

    $(function (){

        function load_topbar_cart_nad_wishlist()
        {
            $('#track-icon-list').load(location.href + " #track-icon-list");
            $('#track-icon-wishlist').load(location.href + " #track-icon-wishlist");
            $('.track-icon-list').load(location.href + " .track-icon-list");
            $('#compare_li').load(location.href + " #compare_li");
        }

        $(document).on('keyup', '#search_form_input', function (e){
            e.preventDefault();

            let search_text = $(this).val();

            $.ajax({
                url: '{{ route("tenant.search.ajax") }}',
                type: 'GET',
                data: {
                    search: search_text
                },
                beforeSend: function () {

                },
                success: function (data) {
                    if(data.product_object.length > 0)
                    {
                        $('.product-suggestion-list').html(data.markup);
                    }
                }
            });
        });

        // Compare Product
        $(document).on('click', '.quick-view-compare-btn', function (e) {
            e.preventDefault();

            let quick_view_has_campaign = '{{empty($campaign_product) ? 0 : 1}}';
            let quick_view_campaign_expired = '{{isset($is_expired) ? $is_expired : 0}}';

            if(quick_view_has_campaign === 1){
                if (quick_view_campaign_expired === 0){
                    toastr.error('The campaign is over, Sorry! you can not cart this product');
                    return false;
                }
            }

            let selected_size = $('#selected_size').val();
            let selected_color = $('#selected_color').val();

            let pid_id = getQuickViewAttributesForCart();

            let product_id = quick_view_product_id;
            let quantity = Number($('#quick-view-quantity').val().trim());
            let price = $('#price').text().split(site_currency_symbol)[1];
            let attributes = {};
            let product_variant = pid_id;
            let productAttribute = quick_view_selected_variant;

            attributes['price'] = price;

            // if selected attribute is a valid product item
            if (quickViewValidateSelectedAttributes()) {
                $.ajax({
                    url: '{{ route("tenant.shop.product.add.to.compare.ajax") }}',
                    type: 'POST',
                    data: {
                        product_id: product_id,
                        quantity: quantity,
                        pid_id: pid_id,
                        product_variant: product_variant,
                        selected_size: selected_size,
                        selected_color: selected_color,
                        _token: '{{ csrf_token() }}'
                    },
                    beforeSend: function () {
                        CustomLoader.start();
                    },
                    success: function (data) {
                        CustomLoader.end();

                        if (data.quantity_msg)
                        {
                            CustomSweetAlertTwo.warning(data.quantity_msg)
                        }
                        else if(data.error_msg)
                        {
                            CustomSweetAlertTwo.error(data.error_msg)
                        }
                        else
                        {
                            CustomSweetAlertTwo.success(data.msg)
                            SohanCustom.load_topbar_cart_nad_wishlist();
                        }
                    },
                    erorr: function (err) {
                        toastr.error('{{ __("An error occurred") }}')
                    }
                });
            } else {
                toastr.error('{{ __("Select all attribute to proceed") }}')
            }
        });


        $(document).on('click', '.compare-btn', function (e) {
            e.preventDefault();

            let pid_id = null;
            let product_id = $(this).data("product_id");
            let quantity = 1;
            let product_variant = null;

            $.ajax({
                url: '{{ route("tenant.shop.product.add.to.compare.ajax") }}',
                type: 'POST',
                data: {
                    product_id: product_id,
                    quantity: quantity,
                    pid_id: pid_id,
                    product_variant: product_variant,
                    selected_size: null,
                    selected_color: null,
                    _token: '{{ csrf_token() }}'
                },
                beforeSend: function () {
                    CustomLoader.start();
                },
                success: function (data) {
                    if (data.quantity_msg)
                    {
                        CustomSweetAlertTwo.warning(data.quantity_msg);
                        CustomLoader.end();
                    }
                    else if(data.error_msg)
                    {
                        CustomSweetAlertTwo.error(data.error_msg);
                        CustomLoader.end();
                    }
                    else
                    {
                        CustomSweetAlertTwo.success(data.msg);
                       SohanCustom.load_topbar_cart_nad_wishlist();
                        CustomLoader.end();
                    }
                },
                erorr: function (err) {
                    CustomSweetAlertTwo.error('{{ __("An error occurred") }}');
                    CustomLoader.end();
                }
            });

        });

        $(document).on('click', '.add-to-wishlist-btn', function (e) {
            e.preventDefault();

            let pid_id = null;
            let product_id = $(this).data("product_id");
            let quantity = 1;
            let product_variant = null;

            $.ajax({
                url: '{{ route("tenant.shop.product.add.to.wishlist.ajax") }}',
                type: 'POST',
                data: {
                    product_id: product_id,
                    quantity: quantity,
                    pid_id: pid_id,
                    product_variant: product_variant,
                    selected_size: null,
                    selected_color: null,
                    _token: '{{ csrf_token() }}'
                },
                beforeSend: function () {
                    CustomLoader.start();
                },
                success: function (data) {
                    if (data.quantity_msg)
                    {
                        CustomSweetAlertTwo.warning(data.quantity_msg);
                        CustomLoader.end();
                    }
                    else if(data.error_msg)
                    {
                        CustomSweetAlertTwo.error(data.error_msg);
                        CustomLoader.end();
                    }
                    else
                    {
                        CustomSweetAlertTwo.success(data.msg);
                        load_topbar_cart_nad_wishlist();
                        CustomLoader.end();
                    }
                },
                erorr: function (err) {
                    CustomSweetAlertTwo.error('{{ __("An error occurred") }}');
                }
            });

        });

        $(document).on('click', '.add-to-cart-btn', function (e) {
            e.preventDefault();

            let pid_id = null;
            let product_id = $(this).data("product_id");
            let quantity = 1;
            let product_variant = null;

            $.ajax({
                url: '{{ route("tenant.shop.product.add.to.cart.ajax") }}',
                type: 'POST',
                data: {
                    product_id: product_id,
                    quantity: quantity,
                    pid_id: pid_id,
                    product_variant: product_variant,
                    selected_size: null,
                    selected_color: null,
                    _token: '{{ csrf_token() }}'
                },
                beforeSend: function () {
                    CustomLoader.start();
                },
                success: function (data) {
                    if (data.quantity_msg)
                    {
                        CustomSweetAlertTwo.warning(data.quantity_msg);
                        CustomLoader.end();
                    }
                    else if(data.error_msg)
                    {
                         CustomSweetAlertTwo.error(data.error_msg);
                         CustomLoader.end();
                    }
                    else
                    {
                        CustomSweetAlertTwo.success(data.msg);
                        CustomLoader.end();
                        load_topbar_cart_nad_wishlist();

                    }
                },
                erorr: function (err) {
                    CustomSweetAlertTwo.error(data.error_msg);
                }
            });

        });


        $(document).on('click', '.add-to-buy-now-btn', function (e) {
            e.preventDefault();

            let pid_id = null;
            let product_id = $(this).data("product_id");
            let quantity = 1;
            let product_variant = null;

            $.ajax({
                url: '{{ route("tenant.shop.product.add.to.cart.ajax") }}',
                type: 'POST',
                data: {
                    product_id: product_id,
                    quantity: quantity,
                    pid_id: pid_id,
                    product_variant: product_variant,
                    selected_size: null,
                    selected_color: null,
                    _token: '{{ csrf_token() }}'
                },
                beforeSend: function () {
                    CustomLoader.start();
                },
                success: function (data) {
                    if (data.quantity_msg)
                    {
                        CustomSweetAlertTwo.warning(data.error_msg);
                    }
                    else if(data.error_msg)
                    {
                         CustomSweetAlertTwo.error(data.error_msg);
                         CustomLoader.end();
                    }
                    else
                    {
                        CustomSweetAlertTwo.success(data.msg);
                        CustomLoader.end();
                        load_topbar_cart_nad_wishlist();

                    }

                    setTimeout(()=>{
                        location.href = "{{ route('tenant.shop.checkout') }}";
                    }, 1000)
                },
                erorr: function (err) {
                    //toastr.error('{{ __("An error occurred") }}')
                    CustomSweetAlertTwo.error(data.error_msg);
                }
            });

        });

        function storeIntoSession(product_id) {
            let arrItem = [];

            if(sessionStorage.length === 0)
            {
                sessionStorage.setItem('products', product_id);
            } else {
                arrItem.push(sessionStorage.getItem('products'));
                arrItem.push(product_id);
                sessionStorage.setItem('products', arrItem);
            }

            return sessionStorage.getItem('products');
        }
    });

    $(document).on('click', '.social_share_parent', function (e){
        $('.social_share_wrapper_item').toggleClass('show');
    });

    $('body').on('click', '.quick-view-size-lists li', function (event) {
        let el = $(this);
        let value = el.data('displayValue');
        let parentWrap = el.parent().parent();
        el.addClass('active');
        el.siblings().removeClass('active');
        parentWrap.find('input[type=text]').val(value);
        parentWrap.find('input[type=hidden]').val(el.data('value'));

        // selected attributes
        selectedAttributeSearch(this);
    });

    function selectedAttributeSearch(selected_item) {
        /*
        * search based on all selected attributes
        *
        * 1. get all selected attributes in {key:value} format
        * 2. search in attribute_store for all available matches
        * 3. display available matches (keep available matches selectable, and rest as disabled)
        * */

        let available_variant_types = [];
        let selected_options = {};

        $('.quick-view-size-lists li').addClass('disabled');

        // get all selected attributes in {key:value} format
        quick_view_available_options.map(function (k, option) {
            let selected_option = $(option).find('li.active');
            let type = selected_option.closest('.quick-view-size-lists').data('type');
            let value = selected_option.data('displayValue');

            if (type) {
                available_variant_types.push(type);
            }

            if (type && value) {
                selected_options[type] = value;
            }
        });

        quickViewSyncImage(get_quick_view_selected_options());
        quickViewSyncPrice(get_quick_view_selected_options());
        quickViewSyncStock(get_quick_view_selected_options());

        // search in attribute_store for all available matches
        let available_variants_selection = [];
        let selected_attributes_by_type = {};
        quick_view_attribute_store.map(function (arr) {
            let matched = true;

            Object.keys(selected_options).map(function (type) {

                if (arr[type] !== selected_options[type]) {
                    matched = false;
                }
            })

            if (matched) {
                available_variants_selection.push(arr);

                // insert as {key: [value, value...]}
                Object.keys(arr).map(function (type) {
                    // not array available for the given key
                    if (!selected_attributes_by_type[type]) {
                        selected_attributes_by_type[type] = []
                    }

                    // insert value if not inserted yet
                    if (selected_attributes_by_type[type].indexOf(arr[type]) <= -1) {
                        selected_attributes_by_type[type].push(arr[type]);
                    }
                })
            }

            window.quick_view_selected_variant = selected_attributes_by_type;
        });

        // selected item not contain product then de-select all selected option hare
        if (Object.keys(selected_attributes_by_type).length == 0) {
            $('.quick-view-size-lists li.active').each(function () {
                let sizeItem = $(this).parent().parent();

                sizeItem.find('input[type=hidden]').val('');
                sizeItem.find('input[type=text]').val('');
            });

            $('.quick-view-size-lists li.active').removeClass("active");
            $('.quick-view-size-lists li.disabled').removeClass("disabled");

            let el = $(selected_item);
            let value = el.data('displayValue');
            let parentWrap = el.parent().parent();

            el.addClass("active");
            el.siblings().removeClass('active');

            selectedAttributeSearch();

            parentWrap.find('input[type=text]').val(value);
            parentWrap.find('input[type=hidden]').val(el.data('value'));
        }

        // keep only available matches selectable
        Object.keys(selected_attributes_by_type).map(function (type) {
            // initially, disable all buttons
            $('.quick-view-size-lists[data-type="' + type + '"] li').addClass('disabled');

            // make buttons selectable for the available options
            selected_attributes_by_type[type].map(function (value) {
                let available_buttons = $('.quick-view-size-lists[data-type="' + type + '"] li[data-display-value="' + value + '"]');
                available_buttons.map(function (key, el) {
                    $(el).removeClass('disabled');
                })
            })
        });
        // todo check is empty object
        // selected_attributes_by_type
    }

    function quickViewSyncImage(selected_options) {
        //todo fire when attribute changed
        let hashed_key = getQuickViewSelectionHash(selected_options);

        let product_image_el = $('.quick-view-long-img img');

        let img_original_src = product_image_el.parent().data('src');

        // if selection has any image to it
        if (quick_view_additional_info_store[hashed_key]) {
            let attribute_image = quick_view_additional_info_store[hashed_key].image;
            if (attribute_image) {
                product_image_el.attr('src', attribute_image);
            }
        } else {
            product_image_el.attr('src', img_original_src);
        }
    }

    function quickViewSyncPrice(selected_options) {
        let hashed_key = getQuickViewSelectionHash(selected_options);

        let product_price_el = $('#quick-view-price');
        let product_main_price = Number(String(product_price_el.data('mainPrice'))).toFixed(2);
        let site_currency_symbol = product_price_el.data('currencySymbol');

        // if selection has any additional price to it
        if (quick_view_additional_info_store[hashed_key]) {
            let attribute_price = quick_view_additional_info_store[hashed_key]['additional_price'];
            if (attribute_price) {
                let price = Number(product_main_price) + Number(attribute_price);
                product_price_el.text(site_currency_symbol + Number(price).toFixed(2));
            }
        } else {
            product_price_el.text(site_currency_symbol + product_main_price);
        }
    }

    function quickViewSyncStock(selected_options) {
        let hashed_key = getQuickViewSelectionHash(selected_options);
        let product_stock_el = $('#quick_view_stock');
        let product_item_left_el = $('#quick_view_item_left');

        // if selection has any size and color to it

        if (quick_view_additional_info_store[hashed_key]) {
            let stock_count = quick_view_additional_info_store[hashed_key]['stock_count'];

            let stock_message = '';
            if (Number(stock_count) > 0) {
                stock_message = `<span class="text-success">{{__('In Stock')}}</span>`;
                product_item_left_el.text(`Only! ${stock_count} Item Left!`);
                product_item_left_el.addClass('text-success');
                product_item_left_el.removeClass('text-danger');
            } else {
                stock_message = `<span class="text-danger">{{__('Our fo Stock')}}</span>`;
                product_item_left_el.text(`No Item Left!`);
                product_item_left_el.addClass('text-danger');
                product_item_left_el.removeClass('text-success');
            }

            product_stock_el.html(stock_message);
        }else{
            product_stock_el.html(product_stock_el.data("stock-text"))
            product_item_left_el.html(product_item_left_el.data("stock-text"))
        }
    }

    function attributeSelected() {
        let total_options_count = $('.quick-view-size-lists').length;
        let selected_options_count = $('.quick-view-size-lists li.active').length;
        return total_options_count === selected_options_count;
    }

    function addslashes(str) {
        return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    }

    function getQuickViewSelectionHash(selected_options) {
        return MD5(JSON.stringify(selected_options));
    }

    function get_quick_view_selected_options() {
        let selected_options = {};
        var quick_view_available_options = $('.quick-view-value-input-area');
        // get all selected attributes in {key:value} format
        quick_view_available_options.map(function (k, option) {
            let selected_option = $(option).find('li.active');
            let type = selected_option.closest('.quick-view-size-lists').data('type');
            let value = selected_option.data('displayValue');

            if (type && value) {
                selected_options[type] = value;
            }
        });

        let ordered_data = {};
        let selected_options_keys = Object.keys(selected_options).sort();
        selected_options_keys.map(function (e) {
            ordered_data[e] = selected_options[e];
        });

        return ordered_data;
    }

    function getQuickViewAttributesForCart() {
        let selected_options = get_quick_view_selected_options();
        let cart_selected_options = selected_options;
        let hashed_key = getQuickViewSelectionHash(selected_options);

        // if selected attribute set is available
        if (quick_view_additional_info_store[hashed_key]) {
            return quick_view_additional_info_store[hashed_key]['pid_id'];
        }

        // if selected attribute set is not available
        if  (Object.keys(selected_options).length) {
            toastr.error('{{ __("Attribute not available") }}')
        }

        return '';
    }

    function quickViewValidateSelectedAttributes() {
        let selected_options = get_quick_view_selected_options();
        let hashed_key = getQuickViewSelectionHash(selected_options);

        // validate if product has any attribute
        if (quick_view_attribute_store.length) {
            if (!Object.keys(selected_options).length) {
                return false;
            }

            if (!quick_view_additional_info_store[hashed_key]) {
                return false;
            }

            return !!quick_view_additional_info_store[hashed_key]['pid_id'];
        }

        return true;
    }

    $(document).on('click', '.quick_view_add_to_cart', function (e) {
        e.preventDefault();

        let quick_view_has_campaign = '{{empty($campaign_product) ? 0 : 1}}';
        let quick_view_campaign_expired = '{{isset($is_expired) ? $is_expired : 0}}';

        if(quick_view_has_campaign === 1){
            if (quick_view_campaign_expired === 0){
                toastr.error('The campaign is over, Sorry! you can not cart this product');
                return false;
            }
        }

        let selected_size = $('#selected_size').val();
        let selected_color = $('#selected_color').val();

        let pid_id = getQuickViewAttributesForCart();

        let product_id = quick_view_product_id;
        let quantity = Number($('#quick-view-quantity').val().trim());
        let price = $('#price').text().split(site_currency_symbol)[1];
        let attributes = {};
        let product_variant = pid_id;
        let productAttribute = quick_view_selected_variant;

        attributes['price'] = price;

        // if selected attribute is a valid product item
        if (quickViewValidateSelectedAttributes()) {
            $.ajax({
                url: '{{ route("tenant.shop.product.add.to.cart.ajax") }}',
                type: 'POST',
                data: {
                    product_id: product_id,
                    quantity: quantity,
                    pid_id: pid_id,
                    product_variant: product_variant,
                    selected_size: selected_size,
                    selected_color: selected_color,
                    _token: '{{ csrf_token() }}'
                },
                beforeSend: function () {
                    CustomLoader.start();
                },
                success: function (data) {
                    CustomLoader.end();
                    if (data.quantity_msg)
                    {
                        CustomSweetAlertTwo.warning(data.quantity_msg);
                    }
                    else if(data.error_msg)
                    {
                        CustomSweetAlertTwo.error(data.error_msg);
                    }
                    else
                    {
                        CustomSweetAlertTwo.success(data.msg);
                        SohanCustom.load_topbar_cart_nad_wishlist();

                        $('.track-icon-list').hide();
                        $('.track-icon-list').fadeIn();
                    }
                },
                erorr: function (err) {
                    toastr.error('{{ __("An error occurred") }}')
                }
            });
        } else {
            toastr.error('{{ __("Select all attribute to proceed") }}')
        }
    });

    $(document).on('click', '.quick_view_add_to_wishlist', function (e) {
        e.preventDefault();

        let quick_view_has_campaign = '{{empty($campaign_product) ? 0 : 1}}';
        let quick_view_campaign_expired = '{{isset($is_expired) ? $is_expired : 0}}';

        if(quick_view_has_campaign === 1){
            if (quick_view_campaign_expired === 0){
                toastr.error('The campaign is over, Sorry! you can not cart this product');
                return false;
            }
        }

        let selected_size = $('#selected_size').val();
        let selected_color = $('#selected_color').val();

        let pid_id = getQuickViewAttributesForCart();

        let product_id = quick_view_product_id;
        let quantity = Number($('#quick-view-quantity').val().trim());
        let price = $('#price').text().split(site_currency_symbol)[1];
        let attributes = {};
        let product_variant = pid_id;
        let productAttribute = quick_view_selected_variant;

        attributes['price'] = price;

        // if selected attribute is a valid product item
        if (quickViewValidateSelectedAttributes()) {
            $.ajax({
                url: '{{ route("tenant.shop.product.add.to.wishlist.ajax") }}',
                type: 'POST',
                data: {
                    product_id: product_id,
                    quantity: quantity,
                    pid_id: pid_id,
                    product_variant: product_variant,
                    selected_size: selected_size,
                    selected_color: selected_color,
                    _token: '{{ csrf_token() }}'
                },
                beforeSend: function () {
                    CustomLoader.start();
                },
                success: function (data) {
                    CustomLoader.end();
                    if (data.quantity_msg)
                    {
                        CustomSweetAlertTwo.warning(data.quantity_msg)
                    }
                    else if(data.error_msg)
                    {
                        CustomSweetAlertTwo.error(data.error_msg)
                    }
                    else
                    {
                        CustomSweetAlertTwo.success(data.msg)
                        SohanCustom.load_topbar_cart_nad_wishlist();
                    }
                },
                erorr: function (err) {
                    CustomSweetAlertTwo.error('{{ __("An error occurred") }}')
                }
            });
        } else {
            CustomSweetAlertTwo.error('{{ __("Select all attribute to proceed") }}')
        }
    });

    $(document).on('click', '.quick_view_but_now', function (e) {
        e.preventDefault();

        let quick_view_has_campaign = '{{empty($campaign_product) ? 0 : 1}}';
        let quick_view_campaign_expired = '{{isset($is_expired) ? $is_expired : 0}}';

        if(quick_view_has_campaign === 1){
            if (quick_view_campaign_expired === 0){
                toastr.error('The campaign is over, Sorry! you can not cart this product');
                return false;
            }
        }

        let selected_size = $('#selected_size').val();
        let selected_color = $('#selected_color').val();

        let pid_id = getQuickViewAttributesForCart();

        let product_id = quick_view_product_id;
        let quantity = Number($('#quick-view-quantity').val().trim());
        let price = $('#price').text().split(site_currency_symbol)[1];
        let attributes = {};
        let product_variant = pid_id;
        let productAttribute = quick_view_selected_variant;

        attributes['price'] = price;

        // if selected attribute is a valid product item
        if (quickViewValidateSelectedAttributes()) {
            $.ajax({
                url: '{{ route("tenant.shop.product.add.to.cart.ajax") }}',
                type: 'POST',
                data: {
                    product_id: product_id,
                    quantity: quantity,
                    pid_id: pid_id,
                    product_variant: product_variant,
                    selected_size: selected_size,
                    selected_color: selected_color,
                    _token: '{{ csrf_token() }}'
                },
                beforeSend: function () {
                    CustomLoader.start();
                },
                success: function (data) {
                    if (data.quantity_msg)
                    {
                        CustomSweetAlertTwo.warning(data.quantity_msg);
                    }
                    else if(data.error_msg)
                    {
                        CustomSweetAlertTwo.error(data.error_msg);
                    }
                    else
                    {
                        CustomSweetAlertTwo.success(data.msg);
                        SohanCustom.load_topbar_cart_nad_wishlist();
                    }

                    setTimeout(()=>{
                        location.href = "{{ route('tenant.shop.checkout') }}";
                    }, 2000)
                },
                erorr: function (err) {
                    CustomSweetAlertTwo.error('{{ __("An error occurred") }}');
                }
            });
        } else {
            CustomSweetAlertTwo.error('{{ __("Select all attribute to proceed") }}');
        }
    });

    /* ========================================
                Product Quantity JS
    ========================================*/

    $(document).on('click', '.quick-view-plus', function () {
        var selectedInput = $(this).prev('.quick-view-quantity-input');
        if (selectedInput.val()) {
            selectedInput[0].stepUp(1);
        }
    });

    $(document).on('click', '.quick-view-substract', function () {
        var selectedInput = $(this).next('.quick-view-quantity-input');
        if (selectedInput.val() > 1) {
            selectedInput[0].stepDown(1);
        }
    });


    $(document).on('click', '.top_right_close_table_cart', function (e){
        let el = $(this);
        let product_hash_id = el.data('product_hash_id');

        console.log(product_hash_id)

        $.ajax({
            url: '{{route('tenant.shop.cart.remove.product.ajax')}}',
            type: 'GET',
            data: {
                'product_hash_id': product_hash_id,
            },
            beforeSend: function (){
                CustomLoader.start();
            },
            success: function (data){
                CustomLoader.end();
                if (data.msg)
                {

                    CustomSweetAlertTwo.success(data.msg)
                    SohanCustom.load_topbar_cart_nad_wishlist();

                    if (data.empty_cart !== '')
                    {
                        $('.cart-main-wrapper').html(data.empty_cart).hide();
                        $('.cart-main-wrapper').fadeIn();
                    }

                    $('.coupon-contents').parent().load(location.href + " .coupon-contents");

                    $('.track-icon-list').load(location.href + " .track-icon-list");
                    $('.custom--table.table-border.radius-10').parent().load(location.href + " .custom--table.table-border.radius-10");
                    $('.close-overlay').removeClass('show');
                }


            },
            error: function (data){
                CustomSweetAlertTwo.error(data.msg)
            }
        })
    });

    $(document).on('click', '.top_right_close_table_wishlist', function (e){
        let el = $(this);
        let product_hash_id = el.data('product_hash_id');

        $.ajax({
            url: '{{route('tenant.shop.wishlist.remove.product.ajax')}}',
            type: 'GET',
            data: {
                'product_hash_id': product_hash_id,
            },
            beforeSend: function (){
                CustomLoader.start();
            },
            success: function (data){
                if (data.msg)
                {
                    SohanCustom.load_topbar_cart_nad_wishlist();
                    CustomSweetAlertTwo.success(data.msg)
                    CustomLoader.end();
                    if (data.empty_cart !== '')
                    {
                        $('.cart-main-wrapper').html(data.empty_cart).hide();
                        $('.cart-main-wrapper').fadeIn();
                    }


                    $('.track-icon-list').load(location.href + " .track-icon-list");
                    $('.custom--table.table-border.radius-10').parent().load(location.href + " .custom--table.table-border.radius-10");
                    $('.close-overlay').removeClass('show');
                }


            },
            error: function (data){
                CustomLoader.end();
            }
        })
    });
</script>
