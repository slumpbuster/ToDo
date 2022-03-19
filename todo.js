function Todo({todo,index,remove,complete}){
  function handle(){
    remove(index);
  }
  function handle2(){
    complete(index);
  }
  if (todo.isCompleted) {
    return (
      <div className="todo">
      <input type="checkbox" onClick={handle2}></input>
        <label className="lblTodo-strike">{todo.text}</label>
        <button type="button" className="btn btn-default btn-sm" onClick={handle}>
          <span className="glyphicon glyphicon-trash"></span>
        </button>
    </div>
    )
  } else {
    return (
      <div className="todo">
        <input type="checkbox" onClick={handle2}></input>
        <label className="lblTodo">{todo.text}</label>
        <button type="button" className="btn btn-default btn-sm" onClick={handle}>
          <span className="glyphicon glyphicon-trash"></span>
        </button>
      </div>
    )    
  }
}
