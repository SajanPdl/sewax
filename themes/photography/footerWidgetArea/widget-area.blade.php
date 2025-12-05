
<footer class="photography_footer_area">
    <div class="photography_footer__middler footer_top_border padding-top-70 padding-bottom-70">
        <div class="photography_footer__shapes">
            <img src="{{global_asset('assets/tenant/frontend/themes/img/photography/photography_starShape.svg')}}" alt="starImg">
            <img src="{{global_asset('assets/tenant/frontend/themes/img/photography/photography_camera.png')}}" alt="cameraImg">
        </div>
        <div class="container">
            <div class="row g-4 justify-content-between">
                {!! render_frontend_sidebar('photography_footer',['column'=> true]) !!}
            </div>
        </div>
    </div>
    <div class="photography_copyright_area copyright_border">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="copyright__contents center-text">
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
