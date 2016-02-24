<!doctype html>
<html>
  <head>

    <meta charset="utf-8">
    <meta name="csrf_token" content="{{ csrf_token() }}">
    <title>Flox - Collect Your Movie Watch List</title>

    <link href="{{ url('assets/favicon.ico') }}" rel="icon" type="image/x-icon">
    <link href="{{ url('assets/css/app.css') }}" rel="stylesheet">

  </head>
  <body>

    <div class="flox"></div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="{{ url('assets/js/config.js') }}"></script>
    <script src="{{ url('assets/js/app.js') }}"></script>

  </body>
</html>