

<section class="simpleContact simpleContact_Custom positioningSection wow fadeInUp" data-wow-delay="0.0s">
    <div class="container">
        <div class="row">
            <div class="col-xxl-12">
                <div class="ContactCap text-center">
                    <div class="row justify-content-center">
                        <div class="col-xl-6 col-lg-7 col-md-9 col-sm-11">
                            <h3 class="tittle wow fadeInUp" data-wow-delay="0.0s">{{ get_static_option('footer_contact_'.get_user_lang().'_title') }}</h3>
                            <p class="pera wow fadeInUp" data-wow-delay="0.1s" >{{ get_static_option('footer_contact_'.get_user_lang().'_title') }}</p>

                            <div class="btn-wrapper d-flex align-items-center justify-content-center flex-wrap">
                                <a href="{{ get_static_option('footer_contact_left_button_'.get_user_lang().'_url') }}" class="white-btnBorder mr-20 mb-10 wow fadeInLeft"
                                   data-wow-delay="0.4s">{{ get_static_option('footer_contact_left_button_'.get_user_lang().'_text') }}</a>

                                <a href="{{ get_static_option('footer_contact_right_button_'.get_user_lang().'_url') }}" class="white-btnFill mb-10 mr-20 wow fadeInRight"
                                   data-wow-delay="0.4s">{{ get_static_option('footer_contact_right_button_'.get_user_lang().'_text') }} <i class="fas fa-heart icon ZoomTwo"></i></a>
                            </div>

                        </div>
                    </div>

                    <!-- Shape 01-->
                    <div class="shapeContact shapeContact1" data-animation="fadeInLeft" data-delay="0.8s">
                        <img src="{{global_asset('assets/tenant/frontend/themes/img/gallery/donation-contactShape.png')}}" alt="" class="running">
                    </div>
                    <!-- Shape 02-->
                    <div class="shapeContact shapeContact2 " data-animation="fadeInDown" data-delay="0.7s">
                        <img src="{{global_asset('assets/tenant/frontend/themes/img/gallery/donation-contactShape2.png')}}" alt="" class=" routedOne">
                    </div>
                    <!-- Shape 03-->
                    <div class="shapeContact shapeContact3 " data-animation="fadeInDown" data-delay="0.7s">
                        <img src="{{global_asset('assets/tenant/frontend/themes/img/gallery/donation-contactShape3.png')}}" alt="" class="heartbeat2">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<footer>
    <div class="footerWrapper sectionImg-bg2" style="background-image: url({{global_asset('assets/tenant/frontend/themes/img/gallery/donation-footerBg.png')}});">
        <div class="footer-area footer-padding2" >
            <div class="container">
                <div class="row justify-content-between">
                    {!! render_frontend_sidebar('footer_donation',['column'=> true]) !!}
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
