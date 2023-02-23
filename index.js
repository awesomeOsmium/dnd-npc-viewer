function setDeadCharacters(){
    let idPrefix = "art-";
    let ids = [
        "2",
        "6",
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
    // let basic = "4px 4px 4px black, -4px 4px 4px black, 4px -4px 4px black, -4px -4px 4px black";
    let idPrefix = "art-";
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
    };
    for (let i = 1; i < lastIndex; i++){
        // Set up current id
        var currId = idPrefix + "";
        // if (i < 10){
        //     currId = currId + "0";
        // }
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
    const lastIndex = 64;
    // if (true){
    if ((d(num) + 1) === 1){
        console.log("Killing...");
        let idPrefix = "art-";
        let skipping = [idPrefix + "9",
                        idPrefix + "15",
                        idPrefix + "21"
                       ];
        var ids = [];
        for (let i = 1; i < lastIndex; i++){
            var curr = idPrefix + "";
            // if (i < 10){
            //     curr = curr + "0";
            // }
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

function addClass(elementIds, idPrefix, theClass){
    for (let i=0; i < elementIds.length; i++){
        var id = idPrefix;
        // if (elementIds[i] < 10){ // TODO: fix how the ids are generated so I don't have to do this fucking shit every damn time
        //     id = id + "0";
        // }
        id = id + elementIds[i];
        var curr = document.getElementById(id);
        try {
            curr.classList.add(theClass);
        } catch (error) {
            console.log("Error adding class \"" + theClass + "\" to element with id \"" + id + "\"");
        }
    }
}

window.onload = function() {
    const lastIndex = 64;
    const idPrefix = "art-";

    // Arrays of character IDs
    const art2 = [2, 4, 14, 16, 23, 24, 25, 26, 27, 28, 29,
         30, 35, 39, 47, 54, 55, 59, 60];
    const art3 = [7, 15];
    const art4 = [9];
    const hidden = [59, 60];
    const dead = [2, 6, 18, 34, 42, 44, 45, 47, 48];

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

    addClass(art1, idPrefix, "art-1");
    addClass(art2, idPrefix, "art-2");
    addClass(art3, idPrefix, "art-3");
    addClass(art4, idPrefix, "art-4");
    addClass(hidden, idPrefix, "hidden"); // Hide some elements
    addClass(dead, idPrefix, "dead")
    // setDeadCharacters();
    setShadowHedgeHogs(lastIndex);
}