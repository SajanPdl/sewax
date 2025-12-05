<div class="breadcrumb-area breadcrumb-padding breadcrumb-border
    @if((in_array(request()->route()->getName(),['tenant.frontend.homepage','tenant.dynamic.page']) && !empty($page_post) && $page_post->breadcrumb == 0 ))
        d-none
    @endif
">
    <div class="sliderAreaInner sectionBg1">
        <div class="heroPadding2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 col-md-8 col-sm-10">
                        <div class="innerHeroContent">
                            <!-- Bread Crumb S t a r t -->
                            <nav aria-label="breadcrumb ">
                                <ul class="breadcrumb wow fadeInLeft" data-wow-delay="0.0s">
                                    <li class="breadcrumb-item"><a href="#!">{{__('Home')}}</a></li>
                                    @if(Route::currentRouteName() === 'tenant.dynamic.page')
                                        <li class="breadcrumb-item">
                                            <a href="#">{{ $page_post->getTranslation('title',$user_lang) ?? '' }}</a>
                                        </li>
                                    @else
                                        <li class="breadcrumb-item">@yield('page-title')</li>
                                    @endif
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
