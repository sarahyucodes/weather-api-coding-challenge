export default function Checkbox({
    timeZone,
    checked,
    name,
    updateTimeZones
}) {
    const handleOnChange = () => {
        updateTimeZones(timeZone)
    }

    const handleOnKeyPress = event => {
        if (event.key === 'Enter') {
            handleOnChange()
        }
    }

    return (
        <label className='col-span-2 xs:col-span-1 md:col-span-2 text-xs mb-1 flex flex-wrap items-center last:mb-0'>
            <input 
                type='checkbox'
                name={name}
                value={timeZone}
                checked={checked}
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
            />
            <span className='ml-2'>{timeZone.split('_').join(' ')}</span>
        </label>
    )
}