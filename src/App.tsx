

function App() {

  return (
    <>
      <div>
        <div className='toolbar'>
          <input type="text" aria-label="Name"/>
          <button type="button">Добавить слайд</button>
          <button type="button">Удалить слайд</button>
        </div>
        <div className='slideColection'></div>
        <div className='workshop'></div>
      </div>
    </>
  )
}

export default App
