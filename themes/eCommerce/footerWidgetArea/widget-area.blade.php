<footer>
    <div class="footerWrapper sectionBg1">
        <div class="footer-area footer-padding">
            <div class="container">
                <div class="row justify-content-between">
                    {!! render_frontend_sidebar('footer_eCommerce',['column'=> true]) !!}
                </div>
            </div>
        </div>

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
    </div>
</footer>
