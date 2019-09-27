// Javascript-dokument 

// .error ??? 

// läser infil
fetch ("stad.json")
// '.then' är ett promise som gör att JavaScript väntar tills 
// förra anropet är klart
.then (function(response) { 
    // 'respons.json()' är resultatet av fetch-läsningen             
    return response.json();                 
})
// 'data' innehåller resultatet av föregående '.then'
// function utan namn (triggas av en händelse, anropas aldrig utifrån)
.then(function(data) { 
    // går att använda variabeln 'data' direkt                    
    adressbok = data;   
    //SorteraData(adressbok); 
    BehandlaData(adressbok);                    
})
// '.catch' hanterar fel
.catch(function(data) {
    console.log("fel vid inläsning");
});

function SorteraData(data) {
     console.log("sortera-data");
     console.log(data);

    // Sortera efter ålder
    data.sort(function (tal1, tal2) {
        return tal1.age - tal2.age;
    });   
    console.log(data);
}

function BehandlaData(data) {
    console.log("behandla-data");
    console.log(data);

    var listrad = "";

    for (ind=0 ; ind < data.length ; ind++){      
        document.getElementById("land").innerHTML = data[ind].countryid;
        document.getElementById("stad").innerHTML = data[ind].stadname;
        document.getElementById("antal").innerHTML = data[ind].population;
        listrad += document.getElementById("stadrad").innerHTML;

        console.log("index = " + ind);
        console.log(listrad);
    }
    // data läggs ut till skärmen
    document.getElementById("stadrad").innerHTML = listrad;
}
