/** 
* abHTTP LIBRARY
* Library for making HTTTP Request
*
* @version 1.0
* @author ENGR ABi
* @licence MIT
*
**/

// INITIALIZING THE FUNCTION
function abHTTP () {
    this.xhttp = new XMLHttpRequest()
}

// ADDING GET PROTOTYPE
abHTTP.prototype.get = function(url, callback) {

    this.xhttp.open("GET", url, true);
    let self = this;
    
    this.xhttp.onload = function () {
        if ( self.xhttp.status === 200 ) {
            callback(null, JSON.parse(self.xhttp.responseText));
        }
        else {
            callback('Error: Something went wrong ' + self.xhttp.status);
        }
    }

    this.xhttp.send();
}
// ADDING POST PROTOTYOE
abHTTP.prototype.post = function (url, data, callback) {

    this.xhttp.open("POST", url, true);
    this.xhttp.setRequestHeader('Content-type', 'application/json');
    let self = this;

    this.xhttp.onload = function () {
        
        callback(null, JSON.parse(self.xhttp.responseText));
        
    }

    this.xhttp.send(JSON.stringify(data));
}

// PROTOTYPE FOR UPDATING

abHTTP.prototype.put = function (url, data, callback) {
    this.xhttp.open("PUT", url, true);
    this.xhttp.setRequestHeader('Content-type', 'application/json');
    let self = this;
    
    this.xhttp.onload = function () {
        callback(null, JSON.parse(self.xhttp.responseText));
    }

    this.xhttp.send(JSON.stringify(data));
}

// PROTOTYPE FOR DELETING

abHTTP.prototype.delete = function (url, callback) {
    this.xhttp.open("DELETE", url, true);
    this.xhttp.setRequestHeader('Content-type', 'application/json');
    
    this.xhttp.onload = function () {
        callback(null, "Data has been deleted successfully");
    }

    this.xhttp.send();
}