export async function fetchRadarStations() {
    let response = await fetch('https://api.weather.gov/radar/stations?')
    
    if (!response.ok) {
      throw new Error('Data could not be retrieved.')
    }

    return response.json()
}