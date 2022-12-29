import React, {Fragment, useState} from 'react'
import ReactDOM from 'react-dom'

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
	text: string
	complete: boolean
}

export default function App(): JSX.Element {

	{/*const sum = (a:number, b:number):number => a + b*/}

	const [value, setValue] = useState<string>('')
	const [todos, setTodos] = useState<ITodo[]>([])

	const handleSubmit = (e:FormElem):void => {
		e.preventDefault()
		addTodo(value)
		setValue('')
	}

	{/*debugger*/}

	const addTodo = (text: string):void => {
		const newTodos: ITodo[] = [...todos, {text, complete: false}]
		setTodos(newTodos)
	}

	const completeTodo = (index: number):void => {
		const newTodos: ITodo[] = [...todos]
		newTodos[index].complete = !newTodos[index].complete
		setTodos(newTodos)
	}

	const removeTodo = (index: number):void => {
		const newTodos: ITodo[] = [...todos]
		newTodos.splice(index, 1) // [0, 1, 2, 3].splice(2,1)
		setTodos(newTodos)
	}

	{/* arr = [0, 1, 2, 3]; arr.splice(2, 1); arr = [0, 1, 3] */}

	{/*console.log(todos)*/}
	return(
		<Fragment>
			{/*Hello!!!! {sum(19,19)}*/}
			<h1>Todo List</h1>
			<form onSubmit={handleSubmit}>
			 <input
			  type='text'
			  value={value}
			  onChange={e => setValue(e.target.value)} 
			  required 
			 />
			 <button type='submit'> Add Todo </button>
			</form>
			<section>
				{todos.map((todo:ITodo, index:number) => (
					<Fragment key={index}>
						<div style={{ textDecoration: todo.complete ? 'line-through' : ''}}
						>
							{todo.text}
						</div>
						<button type='button' onClick={():void => completeTodo(index)}> 
							{' '}
							{todo.complete ? 'Icomplete': 'complete'}{' '}
						</button>
						<button type='button' onClick={():void => removeTodo(index)}>&times;</button>
					</Fragment>
				))}
			</section>

		</Fragment>
	)
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)