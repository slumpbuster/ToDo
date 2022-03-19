function Todo({todo,index,remove,complete,priority}){
  function btnClick(){
    remove(index);
  }
  function cboxClick(){
    complete(index);
  }
  function lblClick(){
    priority(index);
  }

  return (
    <div className="todo">
      <input type="checkbox" onClick={cboxClick}></input>
      <label id={`lbl${index}`} className={`lbl${todo.priority}`} onClick={lblClick}>{todo.text}</label>
      <button type="button" className="btn btn-default btn-sm" onClick={btnClick}>
        <span className="glyphicon glyphicon-trash"></span>
      </button>
    </div>
  )    
}
