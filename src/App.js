import { useState, useEffect } from 'react'
//
import StationsGrid from './components/StationsGrid'

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

  return (
    <div className='App text-slate-800'>
      <main className='container mx-auto py-10 px-5'>
        <h1 className='text-2xl font-medium'>Weather API | Front-End Coding Challenge</h1>
        <div className='py-8 md:py-12 md:grid md:grid-cols-4 md:gap-4'>
          <aside className='col-span-1'>
            <h2 className='text-lg font-medium pb-4 md:text-xl'>Filter by Time Zone</h2>
          </aside>
          <StationsGrid stations={stations} error={error} />
        </div>
      </main>
    </div>
  )
}