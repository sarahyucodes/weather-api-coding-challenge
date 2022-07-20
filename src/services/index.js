async function extractData(data) {
  const stationsData = data[0].features
  const timeZonesData = data[1]

  return stationsData.map(station => {
    return {
      name: station.properties.name,
      id: station.properties.id,
      coords: {
        lat: station.geometry.coordinates[1],
        lng: station.geometry.coordinates[0]
      },
      altitude: station.properties.elevation.value,
      timeZone: timeZonesData.filter(item => item.id === station.properties.id)[0].timeZone
    }
  })
}

export async function fetchRadarStations() {
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