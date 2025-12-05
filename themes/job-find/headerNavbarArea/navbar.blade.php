
<header class="header-style-01 header-transparent">
    <!-- header-top -->
    @include('tenant.frontend.partials.topbar')
    <!-- Header Bottom -->
    <nav class="navbar navbar-area  navbar-expand-lg">
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
                @php
                    $job_page_route = route('tenant.dynamic.page',get_dynamic_page_name_by_id(get_static_option('job_page')));
                    $user_dynamic_route = get_static_option('job_top_job_button_'.get_user_lang().'_url');
                    $condition = !empty($user_dynamic_route) ? $user_dynamic_route : $job_page_route;
                @endphp
                <div class="btn-wrapper">
                    <a href="{{ $condition }}" class="cmn-btn1">{{get_static_option('job_top_job_button_'.get_user_lang().'_text') ?? __('Jobs') }}</a>
                </div>
            </div>
        </div>
    </nav>
</header>
