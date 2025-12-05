
<!-- footer area start -->
<footer class="portfolio_footer_area">
    <div class="portfolio_footer__middler footer-top-border padding-top-70 padding-bottom-70">
        <div class="container">
            <div class="row g-4 justify-content-between">
                {!! render_frontend_sidebar('portfolio_footer',['column'=> true]) !!}
            </div>
        </div>
    </div>
    <div class="portfolio_copyright_area copyright-border">
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
<!-- footer area end -->
<!-- back to top area start -->
<div class="progressParent">
    <svg class="backCircle svg-inner" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
    </svg>
</div>
<!-- back to top area end -->
