<div class="breadcrumb-area breadcrumb-padding breadcrumb-border
    @if((in_array(request()->route()->getName(),['tenant.frontend.homepage','tenant.dynamic.page']) && !empty($page_post) && $page_post->breadcrumb == 0 ))
        d-none
    @endif
">
    <section class="sliderAreaInner sectionBg1">
        <div class="heroPadding2">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="innerHeroContent text-center">
                            <h2 class="tittle wow fadeInUp" data-wow-delay="0s">@yield('page-title')</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
