// functions
function loadVideoAndInfo(para) {
    document.querySelector("#video-beschrijving").innerHTML = videoInfoStorage[para]["beschrijving"];
    document.querySelector("#video").setAttribute("src", videoInfoStorage[para]["videoLink"]);
}


// active script
document.querySelector('#boter_kaas_en_eieren').addEventListener('click', function(){loadVideoAndInfo(0) });
document.querySelector('#draughts').addEventListener('click', function(){loadVideoAndInfo(1)});
document.querySelector('#math_machines').addEventListener('click', function(){loadVideoAndInfo(2)});
loadVideoAndInfo(1);
