import { useState, useEffect } from 'react'
//
import { fetchRadarStations } from './services'
import StationsGrid from './components/StationsGrid'
import Sidebar from './components/Sidebar'

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
  
      setFilteredStations([...updatedFilteredStations])
    } else {
      // no filters selected
      setFilteredStations([...allStations])
    }

    setFiltering(true)
  }

  return (
    <div className='App container mx-auto h-screen h-min-screen py-10 px-4 md:grid md:grid-cols-4 md:gap-4 md:auto-rows-min'>
      <header className='md:col-span-4 py-4'>
        <h1 className='text-2xl font-medium'>
          Weather API | Front-End Coding Challenge
        </h1>
      </header>
      <aside className='mb-4 md:mb-0 md:col-span-1'>
        <Sidebar 
          stations={allStations}
          filterStations={filterStations}  
        />
      </aside>
      <main className='md:col-span-3'>
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