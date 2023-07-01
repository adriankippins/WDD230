document.querySelector('form').addEventListener('submit', function(event) {
    var timestamp = new Date();
    document.querySelector('input[name="timestamp"]').value = timestamp;
});