@include('tenant.frontend.partials.topbar')

<header class="header-style-01">
    <!-- Menu area Starts -->
    <nav class="navbar wedding_nav navbar-area navbar-padding navbar-expand-lg">
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
                <div class="single-right-content">
                    <div class="navbar-right-btn">
                        <a href="{{ get_static_option('wedding_top_contact_button_'.get_user_lang().'_url') }}" class="wedding_cmn_btn btn_gradient_main btn_medium radius-30">
                            {{ get_static_option('wedding_top_contact_button_'.get_user_lang().'_text') ?? __('Contact') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!-- Menu area end -->
</header>
<div class="search-suggestion-overlay"></div>
