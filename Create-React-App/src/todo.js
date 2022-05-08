function Todo({todo,index,remove,complete,priority}){
  function btnClick(){
    remove(index);
  }
  function cboxClick(event){
    complete(event, index);
  }
  function lblClick(){
    priority(index);
  }

  return (
    <div key={`todo${index}`} id={`todo${index}`} className="todo">
      <label className="checkbox">
        <input id={`cbx${index}`} type="checkbox" checked={todo.isCompleted} onChange={(event)=>{cboxClick(event)}}></input>
        <span></span>
      </label>
      <label id={`lbl${index}`} className={`label lbl${todo.priority}`} onClick={lblClick}>{todo.text}</label>
      <button id={`btn${index}`} type="button" className="btn btn-round btn-sm" onClick={btnClick}>
        <span className="glyphicon glyphicon-trash"></span>
      </button>
    </div>
  )    
}

export default Todo