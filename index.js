function App(){
  const [todos, setTodos] = React.useState([]);
  const todoJson = document.getElementById('todoJson');
  let btnCompleted = false;

  const IsJsonString = (str) => {
    try {
        const obj = JSON.parse(str);
        if (obj && typeof obj ==="object") {
          return obj;
        } else {
          return false;
        }
    } catch (e) {
        return false;
    }
    return false;
  }
  
  const fileExport = () => {
    const btnExport = document.getElementById('btnExport'),
    link = document.getElementById('downloadlink');
    let textFile = null;

    const makeTextFile = function (text) {
      var data = new Blob([text], {type: 'text/plain'});

      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }
      textFile = window.URL.createObjectURL(data);

      return textFile;
    };

    link.href = makeTextFile(todoJson.value);
    link.style.display = 'block';
  }

  const fileImport = () => {
    const link = document.getElementById('downloadlink');
    if (link != null) {
      var file = link.download;
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function ()
      {
        if(rawFile.readyState === 4)
        {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
            var allText = rawFile.responseText;
            todoJson.value = allText;
            let jsonIn = IsJsonString(allText);
            if (jsonIn != false) {
              if (Array.isArray(jsonIn)) {
                let temp = [...jsonIn];
                updateState(temp);
              }
            }
          }
        }
      }
      rawFile.send(null);  
    }
  }

  const buildElement = () => {
    const element = document.getElementById('completed');
    return {target:{checked:element.checked}};
  }
  const updateState = tempArray => {
    tempArray.sort((a, b) => b.priority - a.priority);
    if (todoJson != null) todoJson.value = JSON.stringify(tempArray);
    let temp = [...tempArray];
    temp = filterHidden(buildElement());
  }
  const addTodo = text => {
    let unfilteredTodos = IsJsonString(todoJson.value);
    let temp = [...unfilteredTodos, {text, isCompleted: false, priority: 1}];
    updateState(temp);
  }
  const removeTodo = index => {
    let unfilteredTodos = IsJsonString(todoJson.value);
    let temp = [...unfilteredTodos];    
    temp.splice(index, 1);
    updateState(temp);
  }
  const completeTodo = (e, index) => {
    document.getElementById(`cbx${index}`).checked = false;
    let unfilteredTodos = IsJsonString(todoJson.value);
    let temp = [...unfilteredTodos];
    temp[index].isCompleted = !temp[index].isCompleted;
    if (temp[index].isCompleted) {
      temp[index].priority = 0;
    } else {
      temp[index].priority = 1;
    }
    updateState(temp);
  }
  const changePriotiy = index => {
    let unfilteredTodos = IsJsonString(todoJson.value);
    let temp = [...unfilteredTodos];
    if (!temp[index].isCompleted) {
      temp[index].priority = temp[index].priority + 1;
      if (temp[index].priority > 3) temp[index].priority = 1;
    }
    updateState(temp);
  }
  const filterHidden = (e) => {
    const filterItems = (tempArray, completed) =>
    {
      if (!completed) {
        return tempArray.filter(todo => todo.isCompleted === false);
      } else {
        return tempArray;
      }
    }
    let unfilteredTodos = IsJsonString(todoJson.value);
    let tempArray = [...unfilteredTodos];
    btnCompleted = e.target.checked;
    tempArray = filterItems(tempArray, btnCompleted);
    setTodos(tempArray);
  }
  
  return(
    <>
      <div className="nav">
        <h1>ToDo List</h1>
        <div className="navbutton">
          <button id="btnImport" type="button" className="btn-square" onClick={fileImport}>Import</button>
          <br/>
          <a download="todo.txt" id="downloadlink"><button id="btnExport" type="button" className="btn-square" onClick={fileExport}>Export</button></a>
        </div>
        <div className="navslider">
          <label style={{marginTop: 10}}>Completed</label>
          <br/>
          <label className="switch">
            <input id={'completed'} type="checkbox" onChange={(event, todos)=>{filterHidden(event)}}/>
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="app">
        <div className="todo-list" >
          {todos.map((todo, i) => (
            <Todo key={i} index={i} todo={todo} remove={removeTodo} complete={completeTodo} priority={changePriotiy}/>
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
    </>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);