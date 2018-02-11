const alerter = function(res) {
    alert(res);
}

ajax_module.get("php/main.php", "", alerter)
