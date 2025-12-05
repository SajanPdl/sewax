<script>
    (function ($) {
        'use strict'
        $("#product_quick_view .modal-content.p-5").niceScroll();

        let site_currency_symbol = '{{ site_currency_symbol() }}';

        $('body').on('click', '.quick-view-size-lists li', function (event) {
            let el = $(this);
            let value = el.attr('data-display-value');


            let parentWrap = el.parent().parent();

            el.addClass('active');
            el.siblings().removeClass('active');
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
            });

            // selected item not contain product then de-select all selected option hare
            if (Object.keys(selected_attributes_by_type).length == 0) {
                $('.quick-view-size-lists li.active').each(function () {
                    let sizeItem = $(this).parent().parent();

                    sizeItem.find('input[type=hidden]').val('');
                    sizeItem.find('input[type=text]').val('');
                });

                $('.quick-view-size-lists li.active').removeClass("active");
                $('.quick-view-size-lists li.disabled-option').removeClass("disabled-option");

                let el = $(selected_item);
                let value = el.data('displayValue');

                el.addClass("active");
                $(this).find('input[type=hidden]').val(value);
                $(this).find('input[type=text]').val(el.data('value'));

                selectedAttributeSearch();
            }

            // keep only available matches selectable
            Object.keys(selected_attributes_by_type).map(function (type) {
                // initially, disable all buttons
                $('.quick-view-size-lists[data-type="' + type + '"] li').addClass('disabled-option');

                // make buttons selectable for the available options
                selected_attributes_by_type[type].map(function (value) {
                    let available_buttons = $('.quick-view-size-lists[data-type="' + type + '"] li[data-display-value="' + value + '"]');
                    available_buttons.map(function (key, el) {
                        $(el).removeClass('disabled-option');
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

        $('body').on('click', '.add_to_cart_single_page_quick_view',function (e) {

            e.preventDefault();
            let selected_size = $('#quick_view_selected_size').val();
            let selected_color = $('#quick_view_selected_color').val();

            $(".quick-view-size-lists.active")

            let pid_id = getQuickViewAttributesForCart();

            let product_id = $(this).data('id');
            let quantity = Number($('#quick-view-quantity').val().trim());
            let price = $('#quick-view-price').text().split(site_currency_symbol)[1];
            let attributes = {};
            let product_variant = pid_id;

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
                        attributes: attributes,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function (data) {

                        CustomSweetAlertTwo.success(data.msg)
                        if (data.quantity_msg) {
                            CustomSweetAlertTwo.warning(data.quantity_msg)
                        }

                        refreshShippingDropdown();
                    },
                    erorr: function (err) {
                        CustomSweetAlertTwo.error('{{ __("An error occurred") }}')
                    }
                });
            } else {
                CustomSweetAlertTwo.error('{{ __("Select all attribute to proceed") }}')
            }
        });

        let productQuickViewModel = document.getElementById("product_quick_view");
        let defaultQuickViewModel = document.getElementById("quick_view");

        window.onclick = function (event){
            if(productQuickViewModel == event.target){
                $("#product_quick_view").fadeOut();
                setTimeout(function (){
                    $("#product_quick_view").empty();
                },200);
            }else if(defaultQuickViewModel == event.target){
                $("#quick_view").fadeOut();
                $("#quick_view").removeClass('show');
                $(".modal-backdrop").fadeOut();
            }

            $("html body").removeClass("stop-scroll")
        }

        $(document).on('click','.add_to_cart_ajax', function (e) {
            e.preventDefault();
            let product_id = $(this).data('id');
            let quickViewQty = $("#quantity_single_quick_view_btn").val();
            quickViewQty = quickViewQty != undefined ? quickViewQty.trim() : 1;
            let quantity = Number(quickViewQty);
            $.ajax({
                url: '{{ route("tenant.shop.product.add.to.cart.ajax") }}',
                type: 'POST',
                data: {
                    product_id: product_id,
                    quantity: quantity,
                    product_attributes: null,
                    _token: '{{ csrf_token() }}'
                },
                success: function (data) {
                    CustomSweetAlertTwo.success(data.msg)
                    if (data.quantity_msg) {
                        CustomSweetAlertTwo.warning(data.quantity_msg)
                    }
                    refreshShippingDropdown();
                },
                erorr: function (err) {
                    CustomSweetAlertTwo.error('{{ __("Something went wrong") }}')
                }
            });
        });


        // open modal with product quick view
        $(document).on("click",".product-quick-view-ajax",function (){
            let action_route = $(this).data('action-route');
            // let product_id = $(this).data('id');

            // get_campaign_product_end_date_show_timer(product_id);

            let icon = $(this).find("i");
            let oldIconClass = icon.attr("class");
            icon.attr("class","las la-spinner icon la-spin");

            $.ajax({
                url: action_route,
                type: 'GET',
                success: function (data) {
                    icon.attr("class",oldIconClass);

                    $("#product_quick_view").html(data);
                    $("#product_quick_view").fadeIn();


                    $("html body").addClass("stop-scroll")


                    $('.global-timer').syotimer({
                        year: year,
                        month: month,
                        day: day,
                    });
                },
                erorr: function (err) {
                    CustomSweetAlertTwo.error('{{ __("Something went wrong") }}')

                }
            });
        });

        // close quick view details model and make empty
        $(document).on("click","#product_quick_view .quick-view-close-btn",function (){
            $("#product_quick_view").fadeOut();

            setTimeout(function (){
                $("#product_quick_view").empty();
            },200);
        });

        $(document).on("click","#quick_view .quick-view-close-btn",function (){
            $("#quick_view").fadeOut();
            $("#quick_view").removeClass('show');
            $(".modal-backdrop").fadeOut();
        });

        $(document).on('click','.quick-view', function (e) {
            e.preventDefault();

            //todo: work on showing campaign date countdown


            let data = $(this).data();
            let rating = $(this).data('rating');
            let stock_msg = "{{ __('Item is not available in stock') }}";
            let stock_msg_type = "text-danger";
            let quick_view = $('#quick_view');
            quick_view.find('.flash-countdown-wrapper').hide();
            if(data.iscampaign){
                quick_view.find('.flash-countdown-title').text(data.campaigntitle);
                quick_view.find('.flash-countdown-product-2').attr('data-date',data.campaigndate);
                let coundClass = quick_view.find('.flash-countdown-product-2');
                let oldId = quick_view.find('.flash-countdown-product-2').attr('id');
                coundClass.removeClass(oldId);
                oldId = oldId.substr(35);

                let newClassGen = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                coundClass.addClass(oldId+newClassGen);
                coundClass.attr('id',oldId+newClassGen);

                loopcounter(quick_view.find('.flash-countdown-product-2').attr('id'));
                quick_view.find('.flash-countdown-wrapper').show();
            }


            quick_view.find('a.add-to-cart').data('id', data['id']);

            quick_view.find('.title').text(data['title']);
            quick_view.find('.info').text(data['summary']);
            quick_view.find('.del_price').text(data['price']);
            quick_view.find('.sale_price').text(data['salePrice']);
            quick_view.find('.product_category').text(data['category']);
            quick_view.find('.product_category').attr('href', data['categoryUrl']);
            quick_view.find('.product-img img').attr('src', data['image']);
            quick_view.find('.sku_wrapper .sku').text(data['inventory']);
            quick_view.find('.badge-tag').text(data['badge']);
            if(data['campaignPercentage']){
                quick_view.find('.discount-tag').text(data['campaignPercentage']);
            }else{
                quick_view.find('.discount-tag').text('');
            }

            quick_view.find('#unit').text(data['unit']);
            quick_view.find('#uom').text(data['uom']);

            // inventory
            if (data['inStock']) {
                stock_msg = "In stock " + data['inStock'];
                stock_msg_type = "text-success";
            }

            quick_view.find('.is_available').text(stock_msg);
            quick_view.find('.is_available').addClass(stock_msg_type);

            if (data['inventory'] && data['inventory'].length) {
                quick_view.find('.sku_wrapper').show();
            }

            // subcategory
            let subcategory_html = '';
            let subcategory = data['subcategory'];

            for (let i = 0; i < subcategory.length; i++) {
                let comma = '';
                if (i < subcategory.length - 1) {
                    comma += ', ';
                }
                subcategory_html += '<a href="' + subcategory[i]['url'] + '" class="tag-btn" rel="tag">' + subcategory[i]['name'] + '</a>' + comma;
            }

            quick_view.find('.subcategory_container').html(subcategory_html);

            if (!subcategory_html.length) {
                quick_view.find('.product-details-tag-and-social-link').hide();
            } else {
                quick_view.find('.product-details-tag-and-social-link').show();
            }

            if (subcategory_html.length <= 0) {
                $('.productview_subcategory').hide();
            } else {
                $('.productview_subcategory').show()
            }

            // rating
            let rating_html = '';
            for (let i = 0; i < Number(rating); i++) {
                rating_html += '<i class="las la-star icon"></i>';
            }

            for (let i = Math.ceil(Number(rating)); i < 5; i++) {
                rating_html += '<i class="lar la-star icon"></i>';
            }

            quick_view.find('.ratings').html(rating_html);

            if (Number(rating)) {
                quick_view.find('.ratings').show();
            } else {
                quick_view.find('.ratings').hide();
            }

            // quick_view.modal('show');
            $("#quick_view").fadeIn();
            $("#quick_view").addClass('show');
            $(".modal-backdrop").fadeIn();
        });

        $(document).ready(function () {
            refreshShippingDropdown();

            $('.add_to_cart_ajax_with_quantity').on('click', function (e) {
                e.preventDefault();
                let product_id = $(this).data('id');
                let quantity = $(this).closest('.product_card').find('.hover-content .qty_').val();
                $.ajax({
                    url: '{{ route("tenant.shop.product.add.to.cart.ajax") }}',
                    type: 'POST',
                    data: {
                        product_id: product_id,
                        quantity: quantity,
                        product_attributes: null,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function (data) {
                        if(data.type == 'danger'){
                            CustomSweetAlertTwo.error(data.msg);
                        }else{
                            CustomSweetAlertTwo.success(data.msg);
                        }

                        if (data.quantity_msg) {
                            CustomSweetAlertTwo.warning(data.quantity_msg);
                        }
                        refreshShippingDropdown();
                    },
                    erorr: function (err) {
                        CustomSweetAlertTwo.error('{{ __("Something went wrong") }}');
                    }
                });
            });

            $('.attribute input[type=radio]').on('click', function () {
                let attribute_img_el = $('.attribute_img');
                let total_extra = 0;
                let main_price = Number($('#price').data('mainPrice'));
                let all_checked = $('.attribute input[type=radio]:checked');

                // image
                if ($(this).data('attrImage')) {
                    attribute_img_el.attr('src', $(this).data('attrImage')).show();
                    attribute_img_el.closest('.single-main-image').find('.magnific').attr('href', $(this).data('attrImage'));
                    attribute_img_el.prev().hide();
                } else {
                    attribute_img_el.hide();
                    attribute_img_el.prev().show();
                }

                //price
                for (let i = 0; i < all_checked.length; i++) {
                    total_extra += Number($(all_checked[i]).siblings('span').data('extra'));
                }
                let new_price = main_price + total_extra;
                $('#price').text(site_currency_symbol + parseFloat(new_price).toFixed(2));
            });

            $('.add_to_wishlist_ajax').on('click', function (e) {
                e.preventDefault();
                let product_id = $(this).data('id');
                $.ajax({
                    url: '{{ route("tenant.shop.product.add.to.wishlist.ajax") }}',
                    type: 'POST',
                    data: {
                        product_id: product_id,
                        quantity: 1,
                        pid_id: null,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function (data) {
                        CustomSweetAlertTwo.success(data.msg)
                    },
                    erorr: function (err) {
                        CustomSweetAlertTwo.error('{{ __("Something went wrong") }}')
                    }
                });
            });

            $('.nav_search_btn').on('click', function (e) {
                e.preventDefault();
                if ($('.search_bar .form-group .form-control').val().length) {
                    $('#product_search_form').trigger('submit');
                } else {
                    $('.search_bar .form-group').toggle('fast', 'swing');
                }
            });

            // view data with



            $('.add_to_compare_ajax').on('click', function (e) {
                e.preventDefault();
                let product_id = $(this).data('id');
                $.ajax({
                    url: '{{ route("tenant.shop.compare.product") }}',
                    type: 'POST',
                    data: {
                        product_id: product_id,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function (data) {
                        if (data) {
                            CustomSweetAlertTwo.success('{{ __("Item added to compare") }}')
                        }
                    },
                    erorr: function (err) {
                        CustomSweetAlertTwo.error('{{ __("Something went wrong") }}')
                    }
                });
            });

            $('body').on('click','.add_to_compare_ajax_single_page_quick_view', function (e) {
                e.preventDefault();
                let product_id = $(this).data('id');
                $.ajax({
                    url: '{{ route("tenant.shop.compare.product") }}',
                    type: 'POST',
                    data: {
                        product_id: product_id,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function (data) {
                        if (data) {
                            CustomSweetAlertTwo.success('{{ __("Item added to compare") }}')
                        }
                    },
                    erorr: function (err) {
                        CustomSweetAlertTwo.error('{{ __("Something went wrong") }}')
                    }
                });
            });

            $(document).on('click', '.quick-view', function (e) {
                e.preventDefault();
                loadProductAttributeHtml($(this).data('slug'));
            });

            $(document).on('click', '#close_search_dropdown', function (e) {
                $('.category-searchbar').hide();
            });

            $(document).on('focus', '#search_form_input', function (e) {
                if ($('#search_result_categories').html().length && $('#search_result_products').html().length) {
                    $('.category-searchbar').show();
                }
            });

            /* Nice Scroll */
            $(".category-searchbar").niceScroll({});
        });


        function refreshShippingDropdown() {
            {{--$.ajax({--}}
            {{--    url: '{{ route("tenant.products.cart.info.ajax") }}',--}}
            {{--    type: 'GET',--}}
            {{--    success: function (data) {--}}
            {{--        $('#cart_badge').text(data.item_total);--}}
            {{--        $('#top_minicart_container').html(data.cart);--}}
            {{--    },--}}
            {{--    erorr: function (err) {--}}
            {{--        toastr.error('{{ __("Something went wrong") }}');--}}
            {{--    }--}}
            {{--});--}}
        }

        function loadFilterData(url) {
            $('.lds-ellipsis').show();
            $.ajax({
                url: url,
                type: 'GET',
                success: function (data) {
                    if (data) {
                        $('#product_filter_section').html(data);
                        $('.lds-ellipsis').hide();
                    }
                },
                erorr: function (err) {
                    CustomSweetAlertTwo.error('{{ __("Something went wrong") }}')
                    $('.lds-ellipsis').hide();
                }
            });
        }
    })(jQuery)

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
            CustomSweetAlertTwo.error('{{ __("Attribute not available") }}')
        }

        return '';
    }

    function send_ajax_response_get_response(type,url){
        $.ajax({
            url: url,
            type: type,
            data: {
                style: "two",
                limit: $(".product-filter-two-wrapper").data("item-limit")
            },
            headers: {
                'X-CSRF-TOKEN': "{{ csrf_token() }}",
            },
            beforeSend:function (){
                $(".product-filter-two-wrapper").attr("style","height:912px");
                $(".filter-style-block-preloader.lds-ellipsis").show();
            },
            success: function (data) {
                $(".filter-style-block-preloader.lds-ellipsis").hide(300);
                $(".product-filter-two-wrapper").removeAttr("style");
                $(".product-filter-two-wrapper").html(data).removeAttr("style");

                if(data.success == false){
                    CustomSweetAlertTwo.warning('There something is wrong please try again')
                }
            },
            erorr: function (err) {
                $(".product-filter-two-wrapper").removeAttr("style");
                $(".filter-style-block-preloader.lds-ellipsis").hide(300);
                CustomSweetAlertTwo.error('{{ __("An error occurred") }}')
            }
        });
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
</script>
