export default function Pagination({
   currentPage,
   updateCurrentPage,
   totalPages
}) {
   const renderPageToggle = (next, label) => {
      return (
         <button
            aria-label={label}
            className='w-8'
            onClick={() => updateCurrentPage(next)}
         >
            {next ? '>' : '<'}
         </button>
      )
   }

   const renderSpaceholder = () => {
      return <span className='inline-block w-8'></span>
   }

   return (
      <div className='text-right py-4 font-semibold text-sm'>
         {
            currentPage !== 1 ? 
            renderPageToggle(false, 'previous page')
            : renderSpaceholder()
         }
         <span>Page {currentPage} / {totalPages}</span>
         {
            currentPage < totalPages ? 
            renderPageToggle(true, 'next page')
            : renderSpaceholder()
         }
      </div>   )
}