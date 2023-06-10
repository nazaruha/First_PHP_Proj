const rootDirectory = window.location.protocol + '//' + window.location.host + '/';
function selectImage() {
    let img = document.getElementById("select-image");
    let file = document.getElementById("file").files[0];
    let reader = new FileReader();

    reader.onloadend = function() {
        img.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file)
    }
}