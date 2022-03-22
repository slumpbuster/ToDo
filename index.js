function App(){
  const [todos, setTodos] = React.useState([]);
  /*const [todos, setTodos] = React.useState([{
      text: 'learn react',
      isCompleted: false,
      priority: 3
    },
    {
      text: 'meet friend for lunch',
      isCompleted: false,
      priority: 1
    },
    {
      text: 'build todo app',
      isCompleted: false,
      priority: 2
    }
  ]);*/
  const todoJson = document.getElementById('todoJson');

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
                setTodos(temp);
              }
            }
          }
        }
      }
      rawFile.send(null);  
    }
  }

  const addTodo = text => {
    let temp = [...todos, {text, isCompleted: false, priority: 1}];
    setTodos(temp);
  }
  const removeTodo = index => {
    let temp = [...todos];    
    temp.splice(index, 1);
    setTodos(temp);
  }
  const completeTodo = index => {
    document.getElementById(`cbx${index}`).checked = false;
    let temp = [...todos];
    temp[index].isCompleted = !temp[index].isCompleted;
    if (temp[index].isCompleted) {
      temp[index].priority = 0;
    } else {
      temp[index].priority = 1;
    }
    setTodos(temp);
  }
  const changePriotiy = index => {
    let temp = [...todos];
    if (!temp[index].isCompleted) {
      temp[index].priority = temp[index].priority + 1;
      if (temp[index].priority > 3) temp[index].priority = 1;
    }
    setTodos(temp);
  }
  todos.sort((a, b) => b.priority - a.priority);
  if (todoJson != null) todoJson.value = JSON.stringify(todos);

  return(
    <>
      <div className="nav">
        <h1>ToDo List</h1>
        <div className="navbutton">
          <button id="btnImport" type="button" className="btn-square" onClick={fileImport}>Import</button>
          <br/>
          <a download="todo.txt" id="downloadlink"><button id="btnExport" type="button" className="btn-square" onClick={fileExport}>Export</button></a>
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
