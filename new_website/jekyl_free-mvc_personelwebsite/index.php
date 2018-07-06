<!DOCTYPE html>
<html>
    <head lang="nl">
        <meta charset="utf-8">

        <title>Home</title>
        <meta name="description" content="hoi">
        <meta name="keywords" content="this is a website">
        <link rel="stylesheet" href="view/assets/css/main.css">

        <?php include "view/assets/partials/ad.tpl" ?>
    </head>

<body>

<!--nav -->
<?php include "view/assets/partials/header.tpl" ?>

<!--main -->
<main class="row">
    <div class="hid-no-desk"></div>
    <div class="col-10 col-m-12 main">
        <div class="row title-wrap">
            <div class="title-head col-12 col-m-12">
                <h1>Home</h1>
                <p>Welkom op de intro pagina</p>
            </div>
        </div>

        <div>
            <div class="col-6 col-m-6 third-layer-wrap">
                <section id="home" class="third-layer">

                    <h2>Welkom op mijn website.</h2>
                    <p>
                        Deze webpagina heb ik gebouwd om te kunnen presenteren wat mijn skillsets zijn als webdeveloper op dit moment. Mocht u tips voor mij hebben laat het mij dan weten via de contactpagina.
                        <br><br>

                        Vriendelijke groeten,
                        <br><br>
                        Armand van Alphen.
                    </p>
                </section>
            </div>

            <div class="col-6 col-m-6 third-layer-wrap">
                <section class="third-layer">
                    <img src="view/assets/images/pagina/home_pasfoto.png" width="150em"/>
                </section>
            </div>
        </div>

    </div>
    <div class="hid-no-desk"></div>
</main>

<?php include "view/assets/partials/footer.tpl"?>


</body>
</html>
