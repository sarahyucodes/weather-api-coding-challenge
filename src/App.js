import { useState, useEffect } from 'react'
//
import { fetchRadarStations } from './services'
import StationsGrid from './components/StationsGrid'
import Filters from './components/Filters'

export default function App() {
  const [allStations, setAllStations] = useState([])
  const [error, setError] = useState(null)
  
  const [filteredStations, setFilteredStations] = useState(allStations)
  const [filtering, setFiltering] = useState(false)

  useEffect(() => {
    fetchRadarStations()
      .then(response => {
        setAllStations(response)
        setFilteredStations(response)
      })
      .catch(error => setError(error.message))
  }, [])

  const filterStations = filters => {    
    if (filters.length) {
      const updatedFilteredStations = allStations.filter(station => filters.includes(station.timeZone))
  
      setFilteredStations(updatedFilteredStations)
    } else {
      // no filters selected
      setFilteredStations(allStations)
    }

    setFiltering(true)
  }

  return (
    <div className='App container mx-auto min-h-screen py-10 px-4 grid grid-cols-4 gap-4 auto-rows-min'>
      <header className='col-span-full py-4'>
        <h1 className='text-2xl font-medium'>
          Weather API | Front-End Coding Challenge
        </h1>
      </header>
      <aside className='col-span-full md:col-span-1'>
        <Filters 
          stations={allStations}
          filterStations={filterStations}  
        />
      </aside>
      <main className='col-span-full md:col-span-3'>
        <StationsGrid
          filtering={filtering}
          setFiltering={setFiltering}
          filteredStations={filteredStations}
          error={error}
        />
      </main>
    </div>
  )
}