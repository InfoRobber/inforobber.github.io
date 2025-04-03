var infoLabel = document.getElementById("infoLabel")

async function GetIp() {
    try {
        var ipv4
        const response = await fetch("https://api.ipify.org?format=json")
        ipv4 = await response.json()
        return ipv4
    } catch(error) {
        console.log("Failed to retrieve IP address: ", error)
    }
}
function GetGeoLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const info = [
            pos.coords.latitude,
            pos.coords.longitude,
            pos.coords.accuracy
          ];
          resolve(info); // Resolve the promise with the location data
        },
        (error) => {
          console.log("Failed to get location!", error);
          reject(error); // Reject the promise with the error
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }
function GetLanguage() {
    return navigator.language
}
var locationString = ``
if (navigator.geolocation) {
  await GetGeoLocation().then((info) => locationString = `
    Latitude: ${info[0]}<br>
    Longitude: ${info[1]}<br>
    Accuracy: ${info[2]}
  `)
}
var Ip
await GetIp().then((ipv4) => Ip = ipv4.ip)

infoLabel.innerHTML = `
IPv4: ${Ip}<br>
Browser Language: ${GetLanguage()}<br>
${locationString}
`