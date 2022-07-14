import { useState, useEffect } from 'react'
//
import Station from './components/Station'

export default function App() {
  const [stations, setStations] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRadarStations = async () => {
      let response = await fetch('https://api.weather.gov/radar/stations')
      
      if (!response.ok) {
        throw new Error('Data could not be retrieved.')
      }

      return response.json()
    }

    fetchRadarStations()
      .then(response => {
        setStations(response.features)
        console.log(response.features)
      })
      .catch(error => setError(error.message))

    return () => setError(null)
  }, [])

  function getLatLong(coordinates) {
    return `${coordinates[1]},${coordinates[0]}`
  }

  function getGoogleMapsLink(coordinates) {
    const latLong = getLatLong(coordinates)

    return `https://maps.google.com/?q=${latLong}`
  }

  return (
    <div className='App text-slate-800'>
      <main className='container mx-auto py-10 px-5'>
        <h1 className='text-2xl font-medium'>Radar Stations</h1>
        <section className='py-4 md:grid md:grid-cols-4 md:gap-4'>
          <aside className='col-span-1 rounded bg-slate-100'></aside>
          <div className='col-span-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
            {stations.map((station, index) => <Station key={index} station={station} />)}
          </div>
        </section>
      </main>
    </div>
  )
}