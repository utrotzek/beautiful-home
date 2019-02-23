<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <title>Beautiful home</title>
    <link href=" {{ mix('css/app.css') }}" rel="stylesheet">
</head>

<body id="page-top" class="sidebar-toggled">
    <div id="app">
        <app></app>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="{{ mix('js/bootstrap.js') }}"></script>
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
