// document.getElementById('myForm').addEventListener("submit", SubmitFunction);

function SubmitCallback(result) {
    document.getElementById('myTable').innerHTML = result;
}

function SubmitFunction(crudFunc) {
    let payload = { dbcrud: crudFunc,
        id: document.getElementById('id').value,
        naam: document.getElementById('naam').value,
        leeftijd: document.getElementById('leeftijd').value
    }
    console.log(payload);
    ajax_module.post('php_includes/main.php', {}, SubmitCallback, payload, 0);
}

const Onload = (function() {
    payload = { dbcrud: read}
    ajax_module.post('php_includes/main.php', {}, SubmitCallback, payload, 0);
})();




//addEventListener
document.getElementById('create').addEventListener("click", function() {
    SubmitFunction('create')
});

document.getElementById('read').addEventListener("click", function() {
    SubmitFunction('read')
});

document.getElementById('update').addEventListener("click", function() {
    SubmitFunction('update')
});

document.getElementById('delete').addEventListener("click", function() {
    SubmitFunction('delete')
});
