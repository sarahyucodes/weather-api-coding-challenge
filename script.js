const axios = require('axios')
const { find } = require('geo-tz')
const fs = require('fs')

function formatData(data) {
    return data.features.map(station => {
        return {
            id: station.properties.id,
            timeZone: find(station.geometry.coordinates[1], station.geometry.coordinates[0])[0]
        }
    })
 }

axios.get('https://api.weather.gov/radar/stations?')
    .then(response => formatData(response.data))
    .then(data => fs.writeFileSync('./public/data.json', JSON.stringify(data)))
    .catch(error => console.log(error))