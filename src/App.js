import logo from "./logo.svg";
import "./App.css";
import ToDoMain from "./Components/ToDoList/index.jsx";
import TodoTable from "./Components/ToDoList/table.jsx";
import Header from "./Components/ToDoList/Header/index.jsx";

function App() {
    return (
        <div className="App">
            {/* <Header /> */}
            <ToDoMain />
            <TodoTable />
        </div>
    );
}

export default App;
