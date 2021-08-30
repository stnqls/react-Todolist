import React,{Component} from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {
  id = 0
  state = {
    input: '',
    todos: []
  }
  handleChange = (e) => {
    this.setState({
      input: e.target.value //input의 다음 바뀔값
    });
  }
  handleCreate = () => {
    const {input, todos} = this.state;
    this.setState({
      input:'', //input비우고 concat을 사용해 배열에 추가
      todos:todos.concat({
        id:this.id++,
        text:input,
        checked:false
      })
    });
  }
  //push를 통해 데이터를 추가하면 배열의 값이 추가는 되지만 가르키는 배열은 똑같기 때문에 비교를 할 수 없다.
  //push를 사용하면 이전과 지금의 두 배열이 같아지기 때문에 비교할 수 없고, 최적화를 할 수 없다.

  handleKeyPress = (e) => {
    //눌러진 키가 enter면 handleCreate호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const {todos} = this.state;
    //파라미터로 받은 id를 가지고 몇번째 아이템인지 찾는다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; //선택한 객체
    const nextTodos = [...todos]; //배열 복사

    //기존의 값들을 복사하고, checked값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    this.setState(
      {todos: nextTodos}
    );

    // this.setState({
    //   todos: [
    //     ...todos.slice(0, index),
    //     {
    //       ...selected,
    //       checked: !selected.checked
    //     },
    //     ...todos.slice(index +1, todos.length)
    //   ]
    // });
  }

  //filter를 사용해 파라미터로 받아온id를 갖고있지 않은 배열을 새로 생성한다.
  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }
  render() {
    const {input, todos} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    }= this;

    return (
      <TodoListTemplate form={
        <Form 
        value={input}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        onCreate={handleCreate}
        />
      }>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;