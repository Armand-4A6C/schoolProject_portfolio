var Ajaxbestanden = ["Jsonfiles/home.html", "Jsonfiles/CV.html", "Jsonfiles/aboutme.html", "Jsonfiles/bewijsstukken.html", "Jsonfiles/Projecten.html", "Jsonfiles/Experimenten.html", "Jsonfiles/school_projecten.html", "Jsonfiles/contact.html"]

var websiteData = ["Home", "CV", "About_me","Bewijsstukken", "Mijn_projecten", "Experimenten", "School_Projecten", "Contact"]

function toggleMenu(navigate) {
	x = document.getElementById("nav");
	y = document.getElementById("logo");
		
	if (x.className === "" || navigate === 1) {
		x.className = "hideNav";
		y.className = "logo hideNavSup";
		navigate = 0
	} else {
		x.className = "";
		y.className = "logo";
	}
}

function loadPage(href) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.withCredentials = true;
	xmlhttp.open("GET", href, false);
	xmlhttp.send();
	return xmlhttp.responseText;
}
function vularray() {
	for (i = 1; i < websiteData.length; i++) {
		websiteData[i] += " Pagina is nog niet geladen check of uw internet verbinding nog werkt. mocht dit probleem blijven bestaan laat het dan aub de webbeheerder weten"
	}
	websiteData[0] = document.getElementById("main").innerHTML
	
	for (i = 1; i < websiteData.length; i++) {
		websiteData[i] = loadPage(Ajaxbestanden[i])
	}
}
function laadpagina (pagina) {
	document.getElementById("main").innerHTML = websiteData[pagina];
	toggleMenu(1);
}

//vult een paar arrays met de informatie van de andere pagina's
vularray()

//laad de content van de homepage in