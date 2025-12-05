@include('tenant.frontend.partials.pages-portion.navbars.newspaper-partial.topbar')

@if(!empty(get_static_option('newspaper_top_leftbar')))
    @include('tenant.frontend.partials.pages-portion.navbars.newspaper-partial.sidebar')
@endif

<nav class="navbar newspaper_nav newspaper_border__bottom navbar-area navbar-padding navbar-expand-lg">
    <div class="container nav-container">
        <div class="responsive-mobile-menu">
            <div class="logo-wrapper d-lg-none">
                <a href="{{url('/')}}" class="logo">
                    {!! render_image_markup_by_attachment_id(get_static_option('site_logo'),'logo') !!}
                </a>
            </div>
            <a href="{{url('/')}}" class="click-nav-right-icon">
                <i class="las la-ellipsis-v"></i>
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
                    <a class="btn-right radius-5" href="{{ get_static_option('news_top_contact_button_'.get_user_lang().'_url')  }}" class="cmn-btn1">{{get_static_option('news_top_contact_button_'.get_user_lang().'_text') ?? __('Contact') }}</a>
                </div>
            </div>
        </div>
    </div>
</nav>

