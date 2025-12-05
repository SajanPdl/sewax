@php
    $extra_padding_condition = request()->is('/') ? 'footer_extraPadding' : '';
@endphp

<footer class="softwareFirm_footer_area {{$extra_padding_condition}} softwareFirm-section-bg">
    <div class="softwareFirm_footer__middler padding-top-70 padding-bottom-70">
        <div class="container">
            <div class="row g-4 justify-content-between">
                {!! render_frontend_sidebar('software_business_footer',['column'=> true]) !!}
            </div>
        </div>
    </div>
    <div class="softwareFirm_copyright_area copyright-border">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="copyright-contents center-text">
                        {!! get_footer_copyright_text_tenant(get_user_lang()) !!}
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

<div class="progressParent">
    <svg class="backCircle svg-inner" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
    </svg>
</div>

