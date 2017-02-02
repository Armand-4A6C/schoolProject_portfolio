function toggleMenu(x,y) {
	x = document.getElementById("nav");
	y = document.getElementById("logo");
		
	if (x.className === "") {
		x.className = "hideNav";
		y.className = "logo hideNavSup";
	} else {
		x.className = "";
		y.className = "logo";
	}
}