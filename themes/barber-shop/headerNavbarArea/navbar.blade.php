@include('tenant.frontend.partials.topbar')

<header class="header_one">
    <!-- Menu area Starts -->
    <nav class="navbar barberShop_nav navbar-area navbar-padding navbar-expand-lg">
        <div class="container nav-container">
            <div class="responsive-mobile-menu">
                <div class="logo-wrapper">
                    <a href="{{url('/')}}" class="logo">
                        {!! render_image_markup_by_attachment_id(get_static_option('site_logo'),'logo') !!}
                    </a>
                </div>
                <a href="javascript:void(0)" class="click-nav-right-icon">
                    <i class="fa-solid fa-ellipsis-v"></i>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#book_point_menu">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="book_point_menu">
                <ul class="navbar-nav">
                    {!! render_frontend_menu($primary_menu) !!}
                </ul>
            </div>

            <div class="navbar-right-content show-nav-content">
                <div class="single-right-content nav-right-content">
                    <div class="navbar-right-btn">
                        <a href="{{ get_static_option('barber_shop_top_contact_button_'.get_user_lang().'_url') }}" class="barberShop_cmn_btn btn_bg_1 btn_small ">
                            {{ get_static_option('barber_shop_top_contact_button_'.get_user_lang().'_text') ?? __('Contact') }}
                        </a>
                    </div>
                    <ul class="header-cart2">
                        <li class="listItem BadgeNumber openWishList" id="track-icon-wishlist">
                            <!-- View WishList -->
                            <a href="#!" class="items"><i class="flaticon-like icon"></i></a>
                            <span class="cart-badge icon-notification">{{ \Gloudemans\Shoppingcart\Facades\Cart::instance("wishlist")->content()->count() }}</span>
                            <!-- End WishList -->
                        </li>
                        <li class="listItem BadgeNumber openCart" id="track-icon-list">
                            <!-- Start cart -->
                            <a href="#!" class="items"><i class="flaticon-shopping-cart"></i></a>
                            <span class="cart-badge icon-notification ">{{\Gloudemans\Shoppingcart\Facades\Cart::instance("default")->content()->count()}}</span>
                            <!-- End cart -->
                        </li>
                        <li class="listItem BadgeNumber" id="compare_li">
                            <!-- Start compare -->
                            <a href="{{route('tenant.shop.compare.product.page')}}" class="items"><i class="flaticon-compare"></i></a>
                            <span class="cart-badge">{{\Gloudemans\Shoppingcart\Facades\Cart::instance("compare")->content()->count()}}</span>
                            <!-- End compare -->
                        </li>
                    </ul>
                </div>
            </div>




        </div>
    </nav>
    <!-- Menu area end -->
</header>

<div class="close-overlay"></div>

<div class="track-icon-list">
    @include('tenant.frontend.partials.pages-portion.navbars.barber-shop-product-partial.wishlist')
    @include('tenant.frontend.partials.pages-portion.navbars.barber-shop-product-partial.cart')
</div>
