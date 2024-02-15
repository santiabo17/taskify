function TodoContainer({containerName, todos}){
    return (
        <div className="column h-[400px] bg-blue-900 w-80 basis-80">
          <h1 className='text-7xl font-bold mb-3'>{containerName}</h1>
          <button 
            className='bg-green-400 w-48 py-3 mb-8'
            // onClick={handleOpenTodoForm}
          >Create New Todo</button>
          {todos.map((todo, key) => (
          <div key={key} className='bg-blue-400/20 mb-2 text-start p-2 w-11/12 mx-auto'>
            <h2>Todo: {todo.todo}</h2>
            <h3>Status: {todo.status}</h3>
            <h3>Time: {todo.time}</h3>
          </div>
          ))}
        </div>
    )
}

export {TodoContainer}