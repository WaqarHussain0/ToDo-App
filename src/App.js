import "./App.css";
import Row from "./components/common/Row";
import AddToDoItem from "./components/AddToDoItem";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <div className=" lg:flex lg:flex-row h-[100vh] items-start justify-between px-2 md:px-10 pt-4 bg-slate-300">
      <AddToDoItem />
      <ToDoList />
    </div>
  );
}

export default App;
