  import { useEffect, useState } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import './App.css'
  import { v4 as uuidv4 } from 'uuid';
  import Header from './components/Header';
  
  function App() {
    const [Todo, setTodo] = useState({todo:"",deadline:""})
    const [Todoarray, setTodoarray] = useState([])
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [rotationAngle, setrotationAngle] = useState(0);
    useEffect(() => {
      
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        try {
          const array = JSON.parse(storedTodos);
          setTodoarray(array);
        } catch (error) {
          console.error('Error parsing todos from localStorage:', error);
        }
      }
      
    }, []); 

    const handleadd =()=>{
      if(Todo.todo.length > 5)
     {   
      let updated = Todoarray;
      const id = uuidv4();
      updated = [...Todoarray,{id,Todo,isCompleted:false}]
      setTodo({ todo: "", deadline: "" })
      setTodoarray(updated)
      localStorage.setItem('todos',JSON.stringify(updated))
      }
      else{
        alert('ACTION NOT ALLOWEDS')
      }
      setrotationAngle(rotationAngle - 180);
    }
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      
      setTodo(prevTodo => ({...prevTodo,[name]: value}));
    };
    const handlesearch = (event) => {
      const lol = event.target.value.toLowerCase();
      if(!lol)
        {
              const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
          try {
            const array = JSON.parse(storedTodos);
            setTodoarray(array);
          } catch (error) {
            console.error('Error parsing todos from localStorage:', error);
          }
        }
        return;
        }
        const filteredTodos = Todoarray.filter(item => item.todo.toLowerCase().includes(lol));
        setTodoarray(filteredTodos);
    };
    const handleedit =(id)=>{
      const mezz =Todoarray.filter(item=>item.id===id)
      if(mezz)

      {
        setTodo(mezz[0].Todo);
      const ezz = Todoarray.filter(item=>item.id!=id)
      setTodoarray(ezz)
      localStorage.setItem('todos',JSON.stringify(ezz))
      }
    }
    const handledelete =(id)=>{
      const ezz = Todoarray.filter(item=>item.id!=id)
      setTodoarray(ezz)
      localStorage.setItem('todos',JSON.stringify(ezz))

    }
    const handlecheck =(id)=>{
      const index = Todoarray.findIndex(item=>item.id===id)
      const newtodos = [...Todoarray]
      newtodos[index].isCompleted=!newtodos[index].isCompleted
      setTodoarray(newtodos)
      localStorage.setItem('todos',JSON.stringify(newtodos))
    }
      
    
    

    return (
      <>
      <Header/>
      <div className="container">
        <div className="todoheader">TO-DO LIST</div>
        <div className="add">
          <div className="addheader">ADD YOUR TO-DO 👇</div>
          <div className="enter">
            <input onChange={handleInputChange} placeholder='Enter your todo' name="todo"   type="text"  value={Todo.todo} className="addtodo" />
            <input onChange={handleInputChange} placeholder='Enter Deadline ⏰' name="deadline"  type="text"  value={Todo.deadline} className="addtodo" />
            
            <button >
              <img className='button-clicked' style={{transform: `rotate(${rotationAngle}deg)`,transformOrigin: '50% 50%'}} onClick={()=>handleadd()} src="plus.png" width={25} height={20} alt="" />
            </button>

          </div>
        </div>
        <div className="displ">
          <div className="heads">YOUR LIST :</div>
          <div className="search">
            <input onChange={handlesearch} type="text" />
            <div className="searchsym"><img src="search.png" width={20} height={20} alt="" /></div>
          </div>
          
          
          <div className="todocontainer">
          {
          Todoarray && Todoarray.length ?
          
            Todoarray.map((item)=>(
              <div className='todo'>
                
                <div className='check'><input checked={item.isCompleted} type="checkbox" onClick={()=>handlecheck(item.id)} name="" id="" /></div>
                <div className='todotext'><div className={`itemtodo ${item.isCompleted?'checked':''}`}>{item.Todo.todo}</div>
                <div className={`itemtodo1 ${item.isCompleted?'checked':''}`}>{item.Todo.deadline}<img style={{display: item.isCompleted?'none':'block'}} src="deadline.png" width={15} height={15} alt="" /></div>
                </div>
                <div className="operations">
                <div className='todoedit'><div onClick={()=>handleedit(item.id)} className="edit"><img src="edit.png" width={27} height={27} alt="" /></div></div>
                <div className='tododelete'><div onClick={()=>handledelete(item.id)} className="delete"><img src="bin.png" width={27} height={27} alt="" /></div></div>
                </div>
              </div>
            ))
           : <div className="none">Nothing to show 😢</div>
        }
        </div>
        </div>
      </div>
      </>
    )
  }

  export default App
