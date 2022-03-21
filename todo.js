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

  const checkBox = ((todo, index) => {
    console.log(todo, index)
    if (todo.isCompleted) {
      return (
        <input id={`cbx${index}`} type="checkbox" checked onClick={cboxClick}></input>
      );
    } else {
      return (
        <input id={`cbx${index}`} type="checkbox" onClick={cboxClick}></input>
      );
    }
  });
  return (
    <div className="todo">
      <label className="checkbox">
        {checkBox(todo, index)}
        <span></span>
      </label>
      <label id={`lbl${index}`} className={`label lbl${todo.priority}`} onClick={lblClick}>{todo.text}</label>
      <button type="button" className="btn btn-dark btn-sm" onClick={btnClick}>
        <span className="glyphicon glyphicon-trash"></span>
      </button>
    </div>
  )    
}
