//creeërt een array met linkjes om op te kunnen halen
var Ajaxbestanden = ["Jsonfiles/home.html", "Jsonfiles/CV.html", "Jsonfiles/aboutme.html", "Jsonfiles/bewijsstukken.html", "Jsonfiles/Projecten.html", "Jsonfiles/Experimenten.html", "Jsonfiles/school_projecten.html", "Jsonfiles/contact.html"]

//hier komen de html bestanden in
var websiteData = ["Home", "CV", "About_me","Bewijsstukken", "Mijn_projecten", "Experimenten", "School_Projecten", "Contact"]

//switched de menubalk aan en uit in de kleinste versie
function toggleMenu(navigate) {
	x = document.getElementById("nav");
	y = document.getElementById("logo");

	if (x.className === "navWidth" || navigate === 1) {
		x.className = "hideNav";
		navigate = 0
	} else {
		x.className = "navWidth";
	}
}

//Handelt de Ajax Request af
function loadPage(href) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.withCredentials = true;
	xmlhttp.open("GET", href, false);
	xmlhttp.send();
	return xmlhttp.responseText;
}

//haalt  de html bestanden op met behulp van de Ajaxbestanden array
function vularray() {
	for (i = 1; i < websiteData.length; i++) {
		websiteData[i] += " Pagina is nog niet geladen check of uw internet verbinding nog werkt. mocht dit probleem blijven bestaan laat het dan aub de webbeheerder weten"
	}
	websiteData[0] = document.getElementById("main").innerHTML

	for (i = 1; i < websiteData.length; i++) {
		websiteData[i] = loadPage(Ajaxbestanden[i])
	}
}

// zorgt dat alle benodigde functies gaan draaien bij het openen van een nieuwe pagina
function laadpagina (pagina) {
	document.getElementById("main").innerHTML = websiteData[pagina];
	toggleMenu(1);
}

// zorgt dat de video's op de project pagina werken
var videolink = []
	videolink[0] =	'<iframe id=video0 width="90%" height="300" src="https://www.youtube.com/embed/jrXPwE7ZlDI" frameborder="0" allowfullscreen></iframe>'

	videolink[1] = '<iframe id=video1 width="90%" height="300" src="https://www.youtube.com/embed/Y3E99ucqmlM" frameborder="0" allowfullscreen></iframe>'

	videolink[2] = '<iframe id=video2 width="90%" height="300" src="https://www.youtube.com/embed/K-RVrMCpes8" frameborder="0" allowfullscreen></iframe>'
var videobeschrijving = []

    videobeschrijving[0] = "Bij dit project heb ik onder andere een 2 dimensionale array gebruikt waar naar toe geschreven wordt om de data van alle stenen bij te kunnen houden. Hoewel hij nog niet af is vind ik het qua code het meest intresant bekijk hem live op op github. <br> <a href='eigen_projecten_showcase/draughts/checkers.html'>Draughts live</a> <-- --> <a href='https://github.com/Armand-4A6C/Damspel-International_Draughts'>Draughts github</a>";

    videobeschrijving[1] = "In dit project ben ik het meest trots op de computer opponent die ik er heb in geprogrammeerd deze zorgt ervoor dat je dus een tegen speler hebt om tegen te spelen als je alleen bent. <br> <a href='eigen_projecten_showcase/boter_kaas_en_eieren/butter_cheese_and_eggs.html'>boter_kaas_en_eieren live</a> <-- --> <a href='https://github.com/Armand-4A6C/butter_cheese_and_eggs'>boter_kaas_en_eieren github</a>";

    videobeschrijving[2] = "Dit is mijn eerste eigen project een aantal functionaliteiten die er in zitten welke intresant zijn vooral het opslag vermogen van deze rekenmachine. Hij kan hele lange reeksen van commandos terug halen met de c knop, Zolang er maar niet op de = knop gedrukt is <br> <a href='eigen_projecten_showcase/rekenmachine/rekenmachine.html'>Rekenmachine live</a> <-- --> <a href='https://github.com/Armand-4A6C/Math-machine'>Rekenmachine github</a>";

function video(Nr) {
	document.getElementById('videoPlayer').innerHTML = videolink[Nr]
    document.getElementById('videobeschrijving').innerHTML = videobeschrijving[Nr]
}

//vult een paar arrays met de informatie van de andere pagina's
vularray()
