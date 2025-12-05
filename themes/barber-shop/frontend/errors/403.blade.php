@php $user_select_lang_slug = \App\Facades\GlobalLanguage::user_lang_slug(); @endphp

    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{get_static_option('site_'.$user_select_lang_slug.'_title')}} - {{get_static_option('site_'.$user_select_lang_slug.'_tag_line')}}</title>
    <link rel="preconnect" href="https://fonts.gstatic.com"> <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Playfair+Display:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
    {!! render_favicon_by_id(get_static_option('site_favicon')) !!}
    <link rel="stylesheet" href="{{global_asset('landlord/frontend/css/helpers.css')}}">
    <link rel="stylesheet" href="{{global_asset('landlord/frontend/css/errors.css')}}">
    <link rel="stylesheet" href="{{asset('assets/landlord/frontend/css/landing.css')}}">


    <style>

        .error-area-wrapper {
            padding: 110px 0;
        }
        .error-area-wrapper .img-box {
            text-align: center;
        }
        .error-area-wrapper .img-box .title {
            margin-bottom: 30px;
            font-size: 32px;
            line-height: 36px;
            font-weight: 700;
        }
        .error-area-wrapper .content {
            margin-top: 40px;
            text-align: center;
        }
        .error-area-wrapper .btn-default {
            display: inline-block;
            background-color: #f9d371;
            border: none;
            padding: 10px 30px;
            color: #333;
            transition: all 300ms;
            text-decoration: none;
        }

        .error-area-wrapper  .btn-default:hover {
            background-color: #333;
            color: #fff;
        }

        @media screen and (max-width: 991px) {
            .error-area-wrapper {
                padding: 70px 0;
            }
        }

        .main_heading{
            font-size: 90px;
        }

    </style>

</head>

<body>@php $user_select_lang_slug = \App\Facades\GlobalLanguage::user_lang_slug(); @endphp

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{get_static_option('site_'.$user_select_lang_slug.'_title')}} - {{get_static_option('site_'.$user_select_lang_slug.'_tag_line')}}</title>
    <link rel="preconnect" href="https://fonts.gstatic.com"> <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Playfair+Display:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
    {!! render_favicon_by_id(get_static_option('site_favicon')) !!}
    <link rel="stylesheet" href="{{global_asset('landlord/frontend/css/helpers.css')}}">
    <link rel="stylesheet" href="{{global_asset('landlord/frontend/css/errors.css')}}">
    <link rel="stylesheet" href="{{asset('assets/landlord/frontend/css/landing.css')}}">


    <style>

        .error-area-wrapper {
            padding: 110px 0;
        }
        .error-area-wrapper .img-box {
            text-align: center;
        }
        .error-area-wrapper .img-box .title {
            margin-bottom: 30px;
            font-size: 32px;
            line-height: 36px;
            font-weight: 700;
        }
        .error-area-wrapper .content {
            margin-top: 40px;
            text-align: center;
        }
        .error-area-wrapper .btn-default {
            display: inline-block;
            background-color: #f9d371;
            border: none;
            padding: 10px 30px;
            color: #333;
            transition: all 300ms;
            text-decoration: none;
        }

        .error-area-wrapper  .btn-default:hover {
            background-color: #333;
            color: #fff;
        }

        @media screen and (max-width: 991px) {
            .error-area-wrapper {
                padding: 70px 0;
            }
        }

    </style>

</head>

<body>
<div class="error-area-wrapper" data-padding-top="100" data-padding-bottom="100">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 ">
                <div class="notfound-404">

                    @if(isset($message))
                        <div class="content justify-content-center">

                            <h1 class="main_heading">{{__('403')}}</h1>
                            <h2 class="text-center">{{$message}}</h2>

                                <div class="content">
                                    <div class="btn-wrapper">
                                        <a href="{{url('/')}}" class="btn-default">{{get_static_option('error_404_page_'.$user_select_lang_slug.'_button_text',__('Back to home'))}}</a>
                                    </div>
                                </div>
                        </div>
                    @else

                        @php
                            $route_sufix = tenant() ? 'dashboard' : 'home';
                        @endphp

                        <div class="content">
                            <h1 class="main_heading">{{__('403')}}</h1>
                            <h2>{{__('Permission Denied !')}}</h2>
                                <p>{{__('Does not have permission to access this page')}}</p>

                                <div class="content">
                                    <div class="btn-wrapper">
                                        <a href="{{route(route_prefix().'admin.'.$route_sufix)}}" class="btn-default">{{get_static_option('error_404_page_'.$user_select_lang_slug.'_button_text',__('Back to home'))}}</a>
                                    </div>
                                </div>
                        </div>
                    @endif
                </div>

            </div>
        </div>
    </div>
</div>

</body>
</html>


