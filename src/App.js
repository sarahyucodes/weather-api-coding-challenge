import { useState, useEffect } from 'react'
//
import StationsGrid from './components/StationsGrid'
import Pagination from './components/Pagination'

export default function App() {
  const [allStations, setAllStations] = useState([])
  const [error, setError] = useState(null)

  const [currentStations, setCurrentStations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 9
  const totalPages = Math.ceil(allStations.length / 9)

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
        const stations = response.features
        setAllStations(stations)
        return stations
      })
      .then(response => {
        const sliceStart = (currentPage - 1) * itemsPerPage
        const sliceEnd = currentPage * itemsPerPage

        setCurrentStations(response.slice(sliceStart, sliceEnd))

        console.log(`
        ***
          PAGE: ${currentPage}
          START: ${sliceStart}
          END: ${sliceEnd}
        ***
        `);
      })
      .catch(error => setError(error.message))

    return () => setError(null)
  }, [currentPage])

  const updateCurrentPage = next => {
    if (next) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className='App text-slate-800'>
      <main className='container mx-auto py-10 px-5'>
        <h1 className='text-2xl font-medium'>Weather API | Front-End Coding Challenge</h1>
        <div className='pt-8 md:pt-12 md:grid md:grid-cols-4 md:gap-4'>
          <aside className='col-span-1'>
            <h2 className='text-lg font-medium pb-4 md:text-xl'>Filter by Time Zone</h2>
          </aside>
          <StationsGrid 
            currentStations={currentStations}
            error={error} />
        </div>
        {
          allStations.length ? 
          <Pagination
            currentPage={currentPage}
            updateCurrentPage={updateCurrentPage}
            totalPages={totalPages}
          /> : null
        }
      </main>
    </div>
  )
}