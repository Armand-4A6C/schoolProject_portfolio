const alerter = function(res) {
    alert(res);
}

ajax_module.get("php/main.php", {mode:"readDir", url:"programming2018/ass000"}, alerter)
