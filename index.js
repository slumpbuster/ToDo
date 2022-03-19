function App(){
  const [todos, setTodos] = React.useState([
    {
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
  ]);

  const addTodo = text => {
    const newTodos = [...todos, {text, isCompleted: false, priority: 1}];
    setTodos(newTodos);
  }
  const removeTodo = index => {
    let temp = [...todos];    
    temp.splice(index, 1);
    setTodos(temp);
  }
  const completeTodo = index => {
    let temp = [...todos];
    temp[index].isCompleted = !temp[index].isCompleted;
    setTodos(temp);
  }
  const changePriotiy = index => {
    let temp = [...todos];
    temp[index].priority = temp[index].priority + 1;
    if (temp[index].priority > 3) temp[index].priority = 1;
    console.log(temp[index])
    setTodos(temp);
  }

  return(
    <div className="app">
      <div className="todo-list" >
        {todos.map((todo, i) => (
          <Todo key={i} index={i} todo={todo} remove={removeTodo} complete={completeTodo} priority={changePriotiy}/>
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
