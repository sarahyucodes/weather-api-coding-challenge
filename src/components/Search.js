import { useState } from 'react'

export default function Search({
    searchStations
}) {
    const [value, setValue] = useState('')

    const handleChange = event => {
        setValue(event.target.value)

        if (!event.target.value) {
            searchStations()
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        searchStations(value)
    }

    return (
        <div className='pb-4'>
            <h2 className='pb-4 text-base font-medium md:text-lg lg:text-xl'>
                Search
            </h2>
            <form className='text-xs w-full' onSubmit={handleSubmit}>
                <label htmlFor='search' hidden>Search</label>
                <input
                    value={value}
                    onChange={handleChange}
                    id='search'
                    name='search'
                    type='text'
                    className='border rounded py-2 px-4 mb-2 w-full'
                />
                <button type='submit' className='text-white bg-slate-700 rounded py-1 px-3'>Search</button>
            </form>
        </div>
    )
}