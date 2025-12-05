<header class="header-style-01 headerBg1">
    <style>
        .user-account {
            margin-right: 10px;
            margin-bottom: 11px;
        }
    </style>
    <!-- header-top -->
    @include('tenant.frontend.partials.topbar')
    <!-- Header Bottom -->
    <nav class="navbar navbar-area  navbar-expand-lg ">
        <div class="container container-two nav-container">
            <div class="responsive-mobile-menu">
                <div class="logo-wrapper">
                    <a href="{{url('/')}}" class="logo">
                        {!! render_image_markup_by_attachment_id(get_static_option('site_logo'),'logo') !!}
                    </a>
                </div>
                <!-- Click Menu Mobile right menu -->
                <a href="#0" class="click_show_icon"><i class="las fa-ellipsis-v"></i> </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bizcoxx_main_menu" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="NavWrapper">
                <!-- Main Menu -->
                <div class="collapse navbar-collapse" id="bizcoxx_main_menu">
                    <ul class="navbar-nav">
                        {!! render_frontend_menu($primary_menu) !!}
                    </ul>
                </div>
            </div>

            <!-- Menu Right -->
            <div class="nav-right-content">
                <ul class="header-cart2">
                    <li class="listItem BadgeNumber openWishList" id="track-icon-wishlist">
                        <!-- View WishList -->
                        <a href="#!" class="items"><i class="flaticon-like icon"></i></a>
                        <span class="cart-badge icon-notification">{{\Gloudemans\Shoppingcart\Facades\Cart::instance("wishlist")->content()->count()}}</span>
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
    </nav>
</header>

<!-- View Wishlist && View Cart-->
<div class="close-overlay"></div>

<div class="track-icon-list">
    @include('tenant.frontend.partials.pages-portion.navbars.ecommerce-product-partial.wishlist')
    @include('tenant.frontend.partials.pages-portion.navbars.ecommerce-product-partial.cart')
</div>




