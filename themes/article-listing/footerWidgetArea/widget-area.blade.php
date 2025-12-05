<footer>
    <div class="footerWrapper white-footer sectionBg1">
        <div class="footer-area footer-padding">
            <div class="container">
                <div class="row justify-content-between">
                    {!! render_frontend_sidebar('footer_knowledgebase',['column'=> true]) !!}
                </div>
            </div>
        </div>
        <!-- footer-bottom area -->
        <div class="footer-bottom-area">
            <div class="container">
                <div class="footer-border">
                    <div class="row">
                        <div class="col-xl-12 ">
                            <div class="footer-copy-right text-center">
                                {!! get_footer_copyright_text_tenant(get_user_lang()) !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Shape 01-->
        <div class="shapeFooter shapeFooter1" data-animation="fadeInLeft" data-delay="0.8s">
            <img src="{{global_asset('assets/tenant/frontend/themes/img/icon/article-listing-footerShape1.svg')}}" alt="" class="bounce-animate">
        </div>
        <!-- Shape 02-->
        <div class="shapeFooter shapeFooter2 " data-animation="fadeInDown" data-delay="0.7s">
            <img src="{{global_asset('assets/tenant/frontend/themes/img/icon/article-listing-footerShape2.svg')}}" alt="" class=" rotateme">
        </div>
    </div>
</footer>
