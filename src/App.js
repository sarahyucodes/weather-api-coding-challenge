import { useState, useEffect } from 'react'
//
import { fetchRadarStations } from './services'
import StationsGrid from './components/StationsGrid'
import Sidebar from './components/Sidebar'

export default function App() {
  const [allStations, setAllStations] = useState([])
  const [error, setError] = useState(null)
  
  const [filteredStations, setFilteredStations] = useState(allStations)

  useEffect(() => {
    fetchRadarStations()
      .then(response => {
        setAllStations(response)
        setFilteredStations(response)
      })
      .catch(error => setError(error.message))

    return () => setError(null)
  }, [])

  const filterStations = filters => {
    if (filters.length) {
      const updatedFilteredStations = allStations.filter(station => filters.includes(station.timeZone))
  
      setFilteredStations([...updatedFilteredStations])
    } else {
      // no filters selected
      setFilteredStations([...allStations])
    }
  }


  return (
    <div className='App text-slate-800'>
      <main className='container mx-auto py-10 px-5 h-screen min-h-screen'>
        <h1 className='text-2xl font-medium'>
          Weather API | Front-End Coding Challenge
        </h1>
        <div className='h-full py-8 md:py-12 md:grid md:grid-cols-4 md:gap-4'>
          <Sidebar 
            stations={allStations}
            filterStations={filterStations}  
          />
          <StationsGrid 
            filteredStations={filteredStations}
            error={error}
          />
        </div>
      </main>
    </div>
  )
}