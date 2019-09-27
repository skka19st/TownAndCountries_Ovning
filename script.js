// Javascript-dokument 

fetch ("stad.json")
// '.then' är ett promise som gör att JavaScript väntar tills 
// förra anropet är klart
.then (function(svarStad) { 
    // 'svarStad.json()' är resultatet av fetch-läsningen 
    // return skickar resultatet vidare till nästa '.then' 
    // standardord för svarStad = response           
    return svarStad.json();                 
})
// 'dataStad' innehåller resultatet av föregående '.then'
// function utan namn (triggas av en händelse, anropas aldrig utifrån)
.then(function(dataStad) {  
    // stadfilen skickas med för att vara tillgänglig i nästa steg
    LaesInfilLand(dataStad);                         
})
// '.catch' hanterar fel
.catch(function(data) {
    console.log("fel vid inläsning av stad");
});

function LaesInfilLand(dataStad){
    fetch ("land.json")
    // '.then' är ett promise som gör att JavaScript väntar tills 
    // förra anropet är klart
    .then (function(svarLand) {            
        return svarLand.json();                 
    })
    // 'dataland' innehåller resultatet av föregående '.then'
    // function utan namn (triggas av en händelse, anropas aldrig utifrån)
    .then(function(dataLand) { 
        BehandlaData(dataLand, dataStad);                       
    })
    // '.catch' hanterar fel
    .catch(function(infilLand) {
        console.log("fel vid inläsning av land");
    });
}
function BehandlaData(landFil, stadFil) {
    // stadfilen sorteras efter antal innevånare
    SorteraStad(stadFil);

    // listraderna läggs ihop och skrivs i efterhand
    totListrad = "";
    for (landInd = 0 ; landInd < landFil.length ; landInd++) {
        var land = landFil[landInd].countryname;

        // ta enbart med de städer som hör till aktuellt land
        var stad, antal;
        for (stadInd = 0 ; stadInd < stadFil.length ; stadInd++) {
            if (stadFil[stadInd].countryid === landFil[landInd].id) {
                stad = stadFil[stadInd].stadname;
                antal = stadFil[stadInd].population;
                totListrad = SkrivUt(land, stad, antal, totListrad);
                land = "";  // land skrivs enbart ut för första raden
            }
        }
    }
    // data läggs ut till skärmen
    document.getElementById("listrad").innerHTML = totListrad;
}

function SorteraStad(data) {
    // sort-version med return behövs för att sortera sträng
    // Sortera efter landskod
    data.sort(function (x, y) {
       //return x.population - y.population;  // stigande sortering
       return y.population - x.population;   // fallande sortering  
    });   
}

function SkrivUt(land, stad, antal, listrad) {
    document.getElementById("land").innerHTML = land;
    document.getElementById("stad").innerHTML = stad;
    document.getElementById("antal").innerHTML = antal;
    var nyListrad = document.getElementById("listrad").innerHTML;
    listrad += nyListrad;
    return listrad;
}
