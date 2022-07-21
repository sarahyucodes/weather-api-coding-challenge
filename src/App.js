import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
//
import { fetchRadarStations } from './services'
import StationsGrid from './components/StationsGrid'
import Filters from './components/Filters'
import Search from './components/Search'

export default function App() {
  const [allStations, setAllStations] = useState([])
  const [error, setError] = useState(null)
  
  const [filteredStations, setFilteredStations] = useState(allStations)
  const [filtering, setFiltering] = useState(false)

  const [searching, setSearching] = useState(false)
  const [searchedStations, setSearchedStations] = useState([])

  const fuse = new Fuse(filteredStations, {
    // includeScore: true,
    threshold: 0.3, // % match
    keys: [
      'name'
    ]
  })

  useEffect(() => {
    fetchRadarStations()
      .then(response => {
        setAllStations(response)
        setFilteredStations(response)
      })
      .catch(error => setError(error.message))
  }, [])

  const filterStations = filters => {    
    setFiltering(true)
    
    if (filters.length) {
      const updatedFilteredStations = allStations.filter(station => filters.includes(station.timeZone))
  
      setFilteredStations(updatedFilteredStations)
    } else {
      // no filters selected
      setFilteredStations(allStations)
    }
  }

  const searchStations = keyword => {    
    if (keyword) {
      setSearching(true)
    
      const results = fuse.search(keyword)
      const updatedStations = results.map(result => result.item)

      setFilteredStations(updatedStations)
      console.log(updatedStations)
    } else {
      setSearching(false)
      setFilteredStations(allStations)
    }
  }

  return (
    <div className='App container mx-auto min-h-screen py-10 px-4 grid grid-cols-4 gap-4 auto-rows-min'>
      <header className='col-span-full py-4'>
        <h1 className='text-2xl font-medium'>
          Weather API | Front-End Coding Challenge
        </h1>
      </header>
      <aside className='col-span-full md:col-span-1'>
        <Search searchStations={searchStations} />
        <Filters 
          stations={allStations}
          filterStations={filterStations}  
        />
      </aside>
      <main className='col-span-full md:col-span-3'>
        <StationsGrid
          filtering={filtering}
          setFiltering={setFiltering}
          stations={filteredStations}
          error={error}
        />
      </main>
    </div>
  )
}