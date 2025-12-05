

<header class="header-style-01 header_absolute">
    @include('tenant.frontend.partials.topbar')
    <!-- Menu area Starts -->
    @php
        $theme = get_static_option('tenant_default_theme');
        $condition_for_portfolio_inner = $theme == 'portfolio' && !request()->is('/') ? 'portfolio_inner_navbar' : '';
    @endphp
    <nav class="navbar portfolio_nav navbar-area white_nav navbar-padding navbar-expand-lg {{$condition_for_portfolio_inner}}">
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
                        <a href="{{ get_static_option('portfolio_top_contact_button_'.get_user_lang().'_url') }}" class="portfolio_cmn_btn btn_bg_1 btn_medium radius-30 ">
                            {{ get_static_option('portfolio_top_contact_button_'.get_user_lang().'_text') ?? __('Contact') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!-- Menu area end -->
</header>
<div class="search-suggestion-overlay"></div>
