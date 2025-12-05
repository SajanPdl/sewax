<footer class="barberShop_footer_area barberShop-bg-main">
    <div class="barberShop_footer__middler padding-top-70 padding-bottom-70">
        <div class="container">
            <div class="row g-4 justify-content-between">
                {!! render_frontend_sidebar('barber_shop_footer',['column'=> true]) !!}
            </div>
        </div>
    </div>
    <div class="barberShop_copyright_area copyright-border">
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
