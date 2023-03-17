function setShadowHedgeHogs(idPrefix, lastIndex){
    let ids = {
        "art-4":"absolutumShadow",
        "art-7":"abbyShadow",
        "art-8":"coilbaynShadow",
        "art-9":"huongShadow",

        "art-14":"parliamentShadow",
        "art-23":"parliamentShadow",
        "art-24":"parliamentShadow",
        "art-25":"parliamentShadow",
        "art-26":"parliamentShadow",
        "art-27":"parliamentShadow",
        "art-28":"parliamentShadow",
        "art-29":"parliamentShadow",
        "art-30":"parliamentShadow",

        "art-39":"chembsShadow",
        "art-47":"beetusShadow",
        "art-49":"chembsShadow",

        "art-83":"eozzurShadow",
        "art-84":"eozzurShadow"
    };
    for (let i = 1; i < lastIndex; i++){
        // Set up current id
        var currId = idPrefix + i;

        // Add shadowHedgehog or other shadow class to current element
        var curr = document.getElementById(currId);
        // First check if the element has a unique shadow. If so, use it
        var currClass = ids[currId];
        if (currClass !== undefined){
            curr.classList.add(currClass);
        }
        // If there is no unique shadow for the element, it becomes a shadowHedgehog
        else{
            curr.classList.add("shadowHedgehog");
        }
    }
    const today = new Date();
    let month = today.getMonth();
    let day = today.getDate();
    if (month === 3 && day === 1){
        aprfls([4, 9, 47], idPrefix, "./assets/doge.jpg")
    }
}

function d(sides){
    return Math.floor(Math.random() * sides);
}

function randomize(list){
    let index = list.length, randomIndex;
    while (index !== 0){
        randomIndex = Math.floor(Math.random() * index);
        index--;
        [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
    }
    return list;
}

function isIn(item, list){
    for (let i = 0; i < list.length; i++){
        if (item === list[i]){
            return true;
        }
    }
    return false;
}

function clickDeath(event, num){
    const lastIndex = 200;
    if ((d(num) + 1) === 1){
        console.log("Killing...");
        let idPrefix = "art-";
        let skipping = [idPrefix + 9,
                        idPrefix + 15,
                        idPrefix + 21
                       ];
        var ids = [];
        for (let i = 1; i < lastIndex; i++){
            var curr = idPrefix + i;
            ids.push(curr);
        }
        ids = ids.filter(id => !isIn(id, skipping));
        ids = randomize(ids);
        for (let i = 0; i < lastIndex; i++) {
            try {
                var curr = document.getElementById(ids[i]);
                curr.classList.add("dead");
            } catch (error) {
                console.log("Error while killing " + ids[i] + ": " + error);
            }
        }
    }
}

function addClass(elementIds, idPrefix, theClass){
    for (let i=0; i < elementIds.length; i++){
        var id = idPrefix + elementIds[i];
        var curr = document.getElementById(id);
        try {
            curr.classList.add(theClass);
        } catch (error) {
            console.log("Error adding class \"" + theClass + "\" to element with id \"" + id + "\"");
        }
    }
}

function toggleBio(){
    var toggler = document.getElementById("toggleBio");
    var bios = document.getElementById("bios-main");
    var art = document.getElementById("art");
    try {
        if (toggler.innerHTML === "Show bios"){
            console.log("Showing bios...");
            bios.style.display = "flex";
            art.style.maxHeight = "66vh";
            toggler.innerHTML = "Hide bios";
            console.log("Shown bios!");
        }
        else if (toggler.innerHTML === "Hide bios"){
            console.log("Hiding bios...");
            bios.style.display = "none";
            art.style.maxHeight = "100%";
            toggler.innerHTML = "Show bios";
            console.log("Hidden bios!");
        }
    } catch (error) {
        console.log(error);
        return;
    }
}

function aprfls(elementIds, idPrefix, jokeimg){
    for (let i=0; i < elementIds.length; i++){
        var id = idPrefix + elementIds[i];
        var curr = document.getElementById(id);
        try {
            curr.style.backgroundImage = "url(" + jokeimg + ")";
        } catch (error) {
            console.log("Error adding class \"" + theClass + "\" to element with id \"" + id + "\"");
        }
    }
}

window.onload = function() {
    const lastIndex = 85;
    const idPrefix = "art-";

    // Arrays of character IDs
    const art2 = [2, 4, 14, 16, 23, 24, 25, 26, 27, 28, 29, 30, 35, 39
        , 47, 54, 55, 59, 69, 77, 78, 84];
    const art3 = [7, 15];
    const art4 = [9];
    const hidden = [];
    const dead = [2, 6, 18, 34, 42, 44, 45, 47, 48, 64, 79, 80, 81, 82];

    var arrays = [art2, art3, art4];
    let art1 = [];
    for (let i = 1; i < lastIndex; i++){
        var found = false;
        for (let j = 0; j < arrays.length && !found; j++){
            for (let k = 0; k < arrays[j].length && !found; k++){
                if (i === arrays[j][k]){
                    found = true;
                }
            }
        }
        if (!found){
            art1.push(i);
        }
    }

    addClass(hidden, idPrefix, "hidden"); // Hide some elements
    addClass(dead, idPrefix, "dead")
    setShadowHedgeHogs(idPrefix, lastIndex);
    
    addClass(art4, idPrefix, "art-4");
    addClass(art3, idPrefix, "art-3");
    addClass(art2, idPrefix, "art-2");
    addClass(art1, idPrefix, "art-1");
}