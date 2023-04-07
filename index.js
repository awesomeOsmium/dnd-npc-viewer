function setShadowHedgeHogs(idPrefix, lastIndex){
    let ids = {
        "art-4":"absolutumShadow",
        "art-7":"abbyShadow",
        "art-8":"coilbaynShadow",
        "art-9":"huongShadow",

        "art-12":"parliamentShadow", // Moon Goat
        "art-14":"parliamentShadow", // Quorum
        "art-23":"parliamentShadow", // Gail
        "art-24":"parliamentShadow", // Bridehead
        "art-25":"parliamentShadow", // Axewolf
        "art-26":"parliamentShadow", // Tomogui
        "art-27":"parliamentShadow", // JP Mortal
        "art-28":"parliamentShadow", // Win
        "art-29":"parliamentShadow", // Slimegrond
        "art-30":"parliamentShadow", // Handless Joe
        "art-46":"parliamentShadow", // Zelnogg Leadtooth

        "art-39":"chembsShadow",
        "art-47":"beetusShadow",
        "art-49":"chembsShadow",
        "art-85":"chembsShadow",

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

function removeClass(elementIds, idPrefix, theClass){
    for (let i=0; i < elementIds.length; i++){
        var id = idPrefix + elementIds[i];
        var curr = document.getElementById(id);
        try {
            curr.classList.remove(theClass);
        } catch (error) {
            console.log("Error removing class \"" + theClass + "\" from element with id \"" + id + "\"");
        }
    }
}

function toggleClass(elementIds, idPrefix, theClass){
    for (let i=0; i < elementIds.length; i++){
        var id = idPrefix + elementIds[i];
        var curr = document.getElementById(id);
        try {
            curr.classList.toggle(theClass);
        } catch (error) {
            console.log("Error toggling class \"" + theClass + "\" on element with id \"" + id + "\"");
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

function toggleDupes(btn){
    const idPrefix = "art-";
    const hide = "Hide Duplicates";
    const show = "Show Duplicates";
    const dupes = [42, 45, 49, 63, 83, 85];
    // toggleClass(dupes, idPrefix, "hidden");
    try {
        if (btn.innerHTML === hide){
            btn.innerHTML = show;
            addClass(dupes, idPrefix, "hidden");
        }
        else{
            removeClass(dupes, idPrefix, "hidden");
            btn.innerHTML = hide;
        }
    } catch (error) {
        console.log(error);
    }
}

function toggleDead(btn){
    const idPrefix = "art-";
    const hide = "Hide Dead";
    const show = "Show Dead";
    const dead = [2, 6, 18, 27, 34, 38, 42, 44, 45, 47, 48, 64,
                  79, 80, 81, 82, 90];
    toggleClass(dead, idPrefix, "hidden");
    try {
        if (btn.innerHTML === hide){
            btn.innerHTML = show;
            addClass(dead, idPrefix, "hidden");
        }
        else{
            btn.innerHTML = hide;
            removeClass(dead, idPrefix, "hidden");
        }
    } catch (error) {
        console.log(error);
    }
}

function art2(){
    return [2, 4, 14, 16, 23, 24, 25, 26, 27, 28, 29, 30,
            35, 39, 47, 54, 55, 59, 66, 69, 77, 78, 84];
}

function art3(){
    return [7, 15];
}

function art4(){
    return [9];
}

function hidden(){
    return [];
}

function dead(){
    return [2, 6, 18, 27, 34, 38, 42, 44, 45, 47, 48, 64,
            79, 80, 81, 82, 90];
}

function toggleSizing(element){
    const smol = "Small Sizing";
    const def = "Default Sizing";
    if (element.innerHTML === smol){
        constantSizing(97, "art-");
        element.innerHTML = def;
    }
    else if (element.innerHTML === def){
        defaultSizing(97, "art-");
        element.innerHTML = smol;
    }
}

function constantSizing(lastIndex, idPrefix){
    let ids = [];
    for (let i = 1; i < lastIndex; i++){
        ids.push(i);
    }
    removeClass(ids, idPrefix, "art-4");
    removeClass(ids, idPrefix, "art-3");
    removeClass(ids, idPrefix, "art-2");
    addClass(ids, idPrefix, "art-1");
}

function defaultSizing(lastIndex, idPrefix){
    // Arrays of character IDs
    let dubs = art2();
    let trips = art3();
    let quads = art4();

    var arrays = [art2, art3, art4];
    let singles = [];
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
            singles.push(i);
        }
    }

    addClass(quads, idPrefix, "art-4");
    addClass(trips, idPrefix, "art-3");
    addClass(dubs, idPrefix, "art-2");
    addClass(singles, idPrefix, "art-1");
}

window.onload = function() {
    const lastIndex = 97;
    const idPrefix = "art-";

    defaultSizing(lastIndex, idPrefix);

    let hiddenChars = hidden();
    let deadChars = dead();
    addClass(hiddenChars, idPrefix, "hidden"); // Hide some elements
    addClass(deadChars, idPrefix, "dead");
    setShadowHedgeHogs(idPrefix, lastIndex);
}