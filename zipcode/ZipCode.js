var debug = false;
// run the php
function runphp() {
    // assemble the PHP filename
    z1 = document.getElementById("zipcode1").value;
    z2 = document.getElementById("zipcode2").value;
    if (z1 == "" || z2 == "") {
        cleandata();
        alert("Please fill both fields.");
        return;
    }
    if (z1 == z2) {
        cleandata();
        alert("Please enter different Zip Codes.");
        return;
    }
    filename = "ZipCode.php?zipcode1=" + z1 + "&zipcode2=" + z2;
    // DisplayResults will handle the Ajax response
    ajaxCallback = displayResults;
    // Send the Ajax request
    ajaxRequest(filename);
}

// Display search results
function displayResults() {
    //reset divs
    cleandata();

    //log response for debug
    console.log(ajaxreq.responseXML);

    //check for errors
    errors = ajaxreq.responseXML.getElementsByTagName("error");
    if (errors.length > 0) {
        //see if it found either zip
        zipsfound = ajaxreq.responseXML.getElementsByTagName("zipcode");
        if (zipsfound.length > 0) {
            //check what zip was found
            $foundzipinfo = "";
            $notfoundzip = "";
            if (zipsfound[0].firstChild.nodeValue == document.getElementById("zipcode1").value) {
                $foundzipinfo = "z1";
                $notfoundzip = "z2";
            } else {
                $foundzipinfo = "z2";
                $notfoundzip = "z1";
            }

            //display proper error messages and found zip info
            displayzipinfo(ajaxreq.responseXML, 0, document.getElementById($foundzipinfo + "div"));
            document.getElementById($notfoundzip).innerHTML = "Zip code " + $notfoundzip.substring(1, 2) + " not found.";
            alert("Zip code " + $notfoundzip.substring(1, 2) + " not found");
        } else {
            //display error message for both not found
            alert("Both Zip Codes not found.");
        }
    } else {
        //display info
        if (document.getElementById("zipcode1").value == ajaxreq.responseXML.getElementsByTagName("zipcode")[0].firstChild.nodeValue) {
            displayzipinfo(ajaxreq.responseXML, 0, document.getElementById("z1div"));
            displayzipinfo(ajaxreq.responseXML, 1, document.getElementById("z2div"));
            if (debug) displaydebug(ajaxreq.responseXML, 0);
        } else {
            displayzipinfo(ajaxreq.responseXML, 0, document.getElementById("z2div"));
            displayzipinfo(ajaxreq.responseXML, 1, document.getElementById("z1div"));
            if (debug) displaydebug(ajaxreq.responseXML, 1);
        }
        document.getElementById("distance").innerHTML = "Distance: " + ajaxreq.responseXML.getElementsByTagName("distance")[0].firstChild.nodeValue + " Miles";
    }
}

//display zip code information
//data - xml with data on zip
//index - which xml values to use
//element - where to output data
function displayzipinfo(data, index, element) {
    element.removeChild(element.lastChild);

    zip = document.createElement("p");
    zip.class = "zipinfo";
    zip.innerHTML = "Zip Code " + (element.id.substring(1, 2)) + ": " + data.getElementsByTagName("zipcode")[index].firstChild.nodeValue;
    element.appendChild(zip);

    city = document.createElement("p");
    city.class = "zipinfo";
    city.innerHTML = "City/Town: " + data.getElementsByTagName("city")[index].firstChild.nodeValue;
    element.appendChild(city);

    state = document.createElement("p");
    state.class = "zipinfo";
    state.innerHTML = "State: " + data.getElementsByTagName("state")[index].firstChild.nodeValue;
    element.appendChild(state);
}

//remove all childs from divs and put back basic info ones
function cleandata() {
    document.getElementById("distance").innerHTML = "[Distance]";

    z1 = document.createElement("p");
    z1.innerHTML = "[Zip Code 1 Information]";
    z1.class = "zipinfo";
    z1.id = "z1";

    z2 = document.createElement("p");
    z2.innerHTML = "[Zip Code 2 Information]";
    z2.class = "zipinfo";
    z2.id = "z2";

    element = document.getElementById("z1div");
    while (element.lastChild) element.removeChild(element.lastChild);
    element.appendChild(z1);

    element = document.getElementById("z2div");
    while (element.lastChild) element.removeChild(element.lastChild);
    element.appendChild(z2);

    document.getElementById("debugreadfile").innerHTML = "";
    document.getElementById("debugzipinfo").innerHTML = "";
    document.getElementById("debugdistance").innerHTML = "";
}

//toggle debug info visibility and display
function toggledebug() {
    debug = !debug;
    if (!debug) document.getElementById("bigdiv2").style.display = "none";
    else document.getElementById("bigdiv2").style.display = "flex";
}

//display debug info, backwards - if the first zip code is lower than the second and found first
function displaydebug(data, backwards) {
    document.getElementById("debugreadfile").innerHTML = data.getElementsByTagName("debugreadfile")[0].firstChild.nodeValue;
    document.getElementById("debugzipinfo").innerHTML =
        "Zip Code 1 - " + data.getElementsByTagName("zipcode")[backwards % 2].firstChild.nodeValue +
        "<br>City - " + data.getElementsByTagName("city")[backwards % 2].firstChild.nodeValue +
        "<br>State - " + data.getElementsByTagName("state")[backwards % 2].firstChild.nodeValue +
        "<br>Area Code - " + data.getElementsByTagName("areacode")[backwards % 2].firstChild.nodeValue +
        "<br>Latitude -  " + data.getElementsByTagName("latitude")[backwards % 2].firstChild.nodeValue + 
        "<br>Longitude -  " + data.getElementsByTagName("longitude")[backwards % 2].firstChild.nodeValue +
        "<br><br>" +
        "Zip Code 2 - " + data.getElementsByTagName("zipcode")[(1 + backwards) % 2].firstChild.nodeValue +
        "<br>City - " + data.getElementsByTagName("city")[(1 + backwards) % 2].firstChild.nodeValue +
        "<br>State - " + data.getElementsByTagName("state")[(1 + backwards) % 2].firstChild.nodeValue +
        "<br>Area Code - " + data.getElementsByTagName("areacode")[(1 + backwards) % 2].firstChild.nodeValue +
        "<br>Latitude -  " + data.getElementsByTagName("latitude")[(1 + backwards) % 2].firstChild.nodeValue + 
        "<br>Longitude -  " + data.getElementsByTagName("longitude")[(1 + backwards) % 2].firstChild.nodeValue;

    document.getElementById("debugdistance").innerHTML = 
        "<br>Formula:<br> longitudedif = longitude2 - longitude1" +
        "<br>latitudedif = latitude2 - latitude1" +
        "<br>dist1 = (sin(latitudedif/2))^2 + cos(latitude1) * cos(latitude2) * (sin(longitudedif/2))^2" +
        "<br>dist2 = 2 * atan2( sqrt(dist1), sqrt(1-dist1) )" +
        "<br>distFinal = EarthRadius(3961 mi) * dist2" +
        "<br>Lats+longs in radians:" +
        "<br>latitude1: " + data.getElementsByTagName("debuglat")[backwards % 2].firstChild.nodeValue +
        "  longitude1: " + data.getElementsByTagName("debuglon")[backwards % 2].firstChild.nodeValue +
        "<br>latitude2: " + data.getElementsByTagName("debuglat")[(1 + backwards) % 2].firstChild.nodeValue + 
        "  longitude2: " + data.getElementsByTagName("debuglon")[(1 + backwards) % 2].firstChild.nodeValue +
        "<br>latitudedif: " + data.getElementsByTagName("debuglatdif")[0].firstChild.nodeValue + 
        "<br>longitudedif: " + data.getElementsByTagName("debuglondif")[0].firstChild.nodeValue +
        "<br>dist1: " + data.getElementsByTagName("debugstep1")[0].firstChild.nodeValue + 
        "<br>dist2: " + data.getElementsByTagName("debugstep2")[0].firstChild.nodeValue +
        "<br>distance: " + data.getElementsByTagName("distance")[0].firstChild.nodeValue;
}
