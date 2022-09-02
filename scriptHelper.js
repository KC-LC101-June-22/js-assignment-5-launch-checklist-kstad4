// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget")
    missionTarget.innerHTML = `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`



   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
};

function validateInput(testInput) {
    if (testInput === '') {
        return "Empty" 
    } else if (isNaN(testInput)) {
        return "Not a Number"
    } else {
        return "Is a Number"
    };
};

function formSubmission(document, pilot, copilot, fuelLevel, cargoLevel) {
    // let pilotNameInput = validateInput(pilot);
    // let copilotNameInput = validateInput(copilot);
    // let fuelLevelInput = validateInput(fuelLevel);
    // let cargoMassInput = validateInput(cargoLevel);

    let pilotStatus = document.getElementById("pilotStatus")
    let copilotStatus = document.getElementById("copilotStatus")
    let list = document.getElementById("faultyItems")
    let fuelStatus = document.getElementById("fuelStatus")
    let launchStatus = document.getElementById("launchStatus")
    let cargoStatus = document.getElementById("cargoStatus")

    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        window.alert("All fields required.") 
    };
    if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        window.alert('The pilot and co-pilot names should be strings and the fuel level and cargo mass should be numbers.')
    };
    
    pilotStatus.innerHTML = `Pilot, ${pilot}, Ready`;
    copilotStatus.innerHTML = `Co-pilot, ${copilot} Ready`;
    if (fuelLevel < 10000) {
        list.style.visibility = "visible";
        fuelStatus.innerHTML = "There is not enough fuel for the journey.";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    };
    if (cargoLevel > 10000) {
        list.style.visibility = "visible";
        cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    };
    if (fuelLevel > 10000 && cargoLevel < 10000) {
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
    }
    
           
};


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index]
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
