/* Skriv din kod här */

const URL = 'https://restcountries.eu/rest/v2/all';

fetch(URL).then( // Vi fetchar data
        function(response){
            if(response.status === 404){ // err hantering
                throw 'Not found';
            }
            else{
                return response.json();
            }
        }
    ).then(
        function(data){
            let countries = []; // här ligger våra instanser
            // vi loopar hämtar ett random land sen skapar instance med new Country
            for (let i = 0; i < 3; i++) {
                let rand = Math.floor(Math.random()* data.length); 
                console.log(data[rand]);
                countries.push(new Country(data[rand].name, data[rand].timezones[0], data[rand].flag));
            }

            // Vi hämtar ut alla element från HTML
            let img = document.querySelectorAll('img');
            let section = document.querySelectorAll('section');
            console.log(section);
            let h1 = document.querySelectorAll('h1');
            let time = document.querySelectorAll('h3');
            // loopar igenom alla länder och kör display på dom. Display renderar ut sen allt.
            for (let i = 0; i < 3; i++) {
                console.log(section[i]);
                countries[i].display(img[i], h1[i], time[i], section[i]);
            }
        }
    ).catch(
        function(error){ // err hantering
            if(error === 'Not found'){
                console.log('Det hittades inte');
            }      
        }
    )
// Country konstruktorn
function Country(_name, _timezone, _flag){
    this.name = _name;
    this.timezone = _timezone;
    this.flag = _flag;
}
// Vår prototype method som renderar allt
Country.prototype.display = function(img, h1, tidElem, section){
    h1.textContent = this.name;
    img.src = this.flag;
    // Formatera tid
    let tz = this.timezone;
    console.log(tz);
    let newT = tz.slice(3, 6);
    var date = new Date(`December 11, 2020, 11:00:00 GMT${newT}00`);
    let UTCHour = date.getUTCHours();
    let UTCMin = date.getUTCMinutes();
    let t = `${UTCHour}:${UTCMin}0`; // getUTCMinutes funkar ej ?? 

    tidElem.textContent = t;
    section.appendChild(img);
    section.appendChild(h1);
    section.appendChild(tidElem);
}
