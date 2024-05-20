<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600;700&display=swap">

        <!-- FontAwesome -->
        <!-- Also modify: @/App.vue -->
        @fontawesome(['solid', 'brands'])

        <!-- Constants, see \App\Actions\Project\Constants -->
        @constants

        <!-- Vite -->
        @vite([
            'resources/css/app.pcss',
            'resources/js/app.ts',
            "resources/js/Pages/{$page['component']}.vue",
        ])
        @inertiaHead
        <script src="{{ config('services.fontawesome') }}" defer></script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
