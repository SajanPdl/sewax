@php $user_select_lang_slug = \App\Facades\GlobalLanguage::user_lang_slug(); @endphp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{{get_static_option('site_meta_'.$user_select_lang_slug.'_description')}}">
    <meta name="tags" content="{{get_static_option('site_meta_'.$user_select_lang_slug.'_tags')}}">

    <title>{{get_static_option('site_'.$user_select_lang_slug.'_title')}} - {{get_static_option('site_'.$user_select_lang_slug.'_tag_line')}}</title>

    <link href="https://fonts.googleapis.com/css?family=Montserrat:500" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Titillium+Web:700,900" rel="stylesheet">
    {!! render_favicon_by_id(get_static_option('site_favicon')) !!}
    @if(!empty(get_static_option('custom_css_area')))
        <link rel="stylesheet" href="{{asset('assets/frontend/css/dynamic-style.css')}}">
    @endif
    <link rel="stylesheet" href="{{asset('assets/frontend/css/jquery.ihavecookies.css')}}">
    <style>
     :root {
            --main-color-one: rgb(235, 97, 73);
            --main-color-two: 82, 78, 183;
            --main-color-three: #599A8D;
            --main-color-four: #1E88E5;
            --secondary-color: rgb(247, 163, 169);
            --secondary-color-two: #ffdcd2;
            --section-bg-1: #FFFBFB;
            --section-bg-2: #FFF6EE;
            --section-bg-3: #F4F8FB;
            --section-bg-4: #F2F3FB;
            --section-bg-5: #F9F5F2;
            --section-bg-6: #E5EFF8;
            --heading-color: rgb(51, 51, 51);
            --body-color: #666666;
            --light-color: #666666;
            --extra-light-color: #888888;
            --review-color: #FABE50;
            --new-color: #5AB27E;

            --heading-font: "Manrope",sans-serif;
            --body-font:"Open Sans",sans-serif;
        }
    </style>
    <style>
        * {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        body {
            padding: 0;
            margin: 0;
        }

        #notfound {
            position: relative;
            height: 100vh;
        }

        #notfound .notfound {
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        .notfound {
            max-width: 767px;
            width: 100%;
            line-height: 1.4;
            padding: 0px 15px;
        }

        .notfound .notfound-404 {
            position: relative;
            height: 150px;
            line-height: 150px;
            margin-bottom: 25px;
        }

        .notfound .notfound-404 h1 {
            font-family: 'Titillium Web', sans-serif;
            font-size: 186px;
            font-weight: 900;
            margin: 0px;
            text-transform: uppercase;
            color: var(--main-color-one);
        }

        .notfound h2 {
            font-family: 'Titillium Web', sans-serif;
            font-size: 26px;
            font-weight: 700;
            margin: 0;
            color: var(--heading-color);
        }

        .notfound p {
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 0px;
            color: var(--paragraph-color);
        }

        .notfound a {
            font-family: 'Titillium Web', sans-serif;
            display: inline-block;
            text-transform: uppercase;
            color: #fff;
            text-decoration: none;
            border: none;
            background-color: var(--main-color-three);
            padding: 10px 40px;
            font-size: 14px;
            font-weight: 700;
            border-radius: 1px;
            margin-top: 15px;
            -webkit-transition: 0.2s all;
            transition: 0.2s all;
        }

        .notfound a:hover {
            opacity: 0.8;
        }

        @media only screen and (max-width: 767px) {
            .notfound .notfound-404 {
                height: 110px;
                line-height: 110px;
            }
            .notfound .notfound-404 h1 {
                font-size: 120px;
            }
        }
    </style>
</head>
    <body>
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>{{get_static_option('error_404_page_'.$user_select_lang_slug.'_title',"404")}}</h1>
                </div>
                <h2>{{get_static_option('error_404_page_'.$user_select_lang_slug.'_subtitle')}}</h2>
                <p>{{get_static_option('error_404_page_'.$user_select_lang_slug.'_paragraph',__("Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable"))}}</p>
                <a href="{{url('/')}}">{{get_static_option('error_404_page_'.$user_select_lang_slug.'_button_text',__("Back To Home"))}}</a>
            </div>
        </div>
    </body>
</html>
