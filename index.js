function setDeadCharacters(){
    let idPrefix = "art-";
    let ids = [
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
        curr.classList.add("dead");
    }
}

function setShadowHedgeHogs(lastIndex){
    let basic = "4px 4px 4px black, -4px 4px 4px black, 4px -4px 4px black, -4px -4px 4px black";
    let idPrefix = "art-";
    let ids = {
        "art-04":"absolutumShadow",
        "art-07":"abbyShadow",
        "art-08":"coilbaynShadow",
        "art-09":"huongShadow",

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
    };
    for (let i = 1; i < lastIndex; i++){
        // Set up current id
        var currId = idPrefix + "";
        if (i < 10){
            currId = currId + "0";
        }
        currId = currId + i;

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
    let lastIndex = 56;
    // if (true){
    if ((d(num) + 1) === 1){
        console.log("Killing...");
        let idPrefix = "art-";
        let skipping = [idPrefix + "09",
                        idPrefix + "15",
                        idPrefix + "21"
                       ];
        var ids = [];
        for (let i = 1; i < lastIndex; i++){
            var curr = idPrefix + "";
            if (i < 10){
                curr = curr + "0";
            }
            curr = curr + i;
            ids.push(curr);
        }
        ids = ids.filter(id => !isIn(id, skipping));
        ids = randomize(ids);
        while (ids.length > 0){
            var i = d(ids.length);
            var curr = document.getElementById(ids[i]);
            curr.classList.add("dead");
            // console.log("Killed " + ids[i]);
            ids = ids.filter(id => id != ids[i]);
        }
    }
}

window.onload = function() {
    let lastIndex = 56;
    setDeadCharacters();
    setShadowHedgeHogs(56);
}