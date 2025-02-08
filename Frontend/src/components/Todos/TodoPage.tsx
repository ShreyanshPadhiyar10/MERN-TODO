import SearchBar from '../SearchBar/SearchBar'
import TodoCard from '../Card/TodoCard'

function TodoPage() {
  return (
    <>
      <div className='pt-24'>
        <div className='text-center'>
          <SearchBar />
        </div>
        <div>
          <TodoCard />
        </div>
      </div>
    </>
  )
}

export default TodoPage
