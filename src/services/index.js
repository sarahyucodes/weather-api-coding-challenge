const haversine = require('haversine')

const getUserLatLng = () => {
  return new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const extractData = async(data) => {
  const stationsData = data[0].features
  const timeZonesData = data[1]

  const userPosition = await getUserLatLng()

  const userLatLng = {
    latitude: userPosition.coords.latitude,
    longitude: userPosition.coords.longitude
  }

  return stationsData.map(station => {
    const stationLatLng = {
      latitude: station.geometry.coordinates[1],
      longitude: station.geometry.coordinates[0]
    }
    
    return {
      name: station.properties.name,
      id: station.properties.id,
      coords: stationLatLng,
      altitude: station.properties.elevation.value,
      timeZone: timeZonesData.filter(item => item.id === station.properties.id)[0].timeZone,
      distance: haversine(userLatLng, stationLatLng, { unit: 'meter' })
    }
  })
  .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
}

export const fetchRadarStations = async() => {
    return Promise.all([
      fetch('https://api.weather.gov/radar/stations'),
      fetch('data.json')
    ])
      .then(responses => {
        return Promise.all(responses.map(response => response.json()))
      })
      .then(data => extractData(data))
      .catch(error => error)
}