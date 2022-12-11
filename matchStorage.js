//code for search qr popup
var modal = document.getElementById("myModal");
var btn = document.getElementById("searchBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x) or clicks anywhere outside of the modal, close the modal
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//search function for localStorage
document.getElementById("searchBtn").addEventListener("click", ()=>{
    searchStorage(document.getElementById("initSearchForm").value)
})

//localStorage console commands
function clearStorage() {
    console.log("CLEARING DATA");
    localStorage.clear()
}

function getStorage() {
    console.log("GETTING DATA")
    let allData = "";
    for(var i in localStorage) {
        if (typeof localStorage[i] == "string") {
            allData += localStorage[i] + "\n"
        }
    }
    console.log(allData)
    return allData;
}

function searchStorage(searchTerm) {
    value = localStorage.getItem(searchTerm)
    if (value == null || searchTerm == null || searchTerm == '') {
        document.getElementById('qrOutput').innerHTML = "";
        console.log("No data found")
    }
    console.log("Search term: " + searchTerm)
    console.log("Data: " + value)

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(value);
    qr.make();
    /*
    var mod = qr.getModuleCount();
    var length = 8 + 2 * mod
    document.getElementById('qrOutput').style.width = length;
    document.getElementById('qrOutput').style.height = length;
    */

    document.getElementById('qrOutput').innerHTML = qr.createImgTag();
    console.log("Data found for match " + searchTerm + ": ");
    console.log(value);

    modal.style.display = "block";
}
    