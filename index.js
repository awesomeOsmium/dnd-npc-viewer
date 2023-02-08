function setDeadCharacters(){
    idPrefix = "art-"
    ids = [
        "02",
        "06",
        "18",
        "34",
        "42",
        "44",
        "45",
        "47",
        "48"
    ];
    for (let i = 0; i < ids.length; i++){
        var curr = document.getElementById(idPrefix + ids[i]);
        console.log(ids[i]);
        console.log(curr);
        curr.classList.add("dead");
    }
}

window.onload = function() {
    console.log("window.onload");
    setDeadCharacters();
}