import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [listToDo, setListToDo] = useState([]);

	const API_URL = "https://playground.4geeks.com/todo"
	const USER = "jcasib"

	// Función GET de la API
	const getList = async () => {
		const response = await fetch(`${API_URL}/users/${USER}`)
		if (!response.ok) {
			createUser()
			return
		}
		const data = await response.json()
		console.log(data.todos);
		// Actualizamos el array de listToDo con el array guardada en la API
		setListToDo(data.todos);
		console.log(listToDo);
	}

	// Función crear usuario en la API
	const createUser = async () => {
		const response = await fetch(`${API_URL}/users/${USER}`, {
			method: "POST"
		})
	}

	// Función añadir item a la lista
	const createItemList = async (item) => {
		const response = await fetch(`${API_URL}/todos/${USER}`, {
			method: "POST",
			body: JSON.stringify({
				"label": item,
				"is_done": false
			}),
			headers: {"Content-Type": "application/json"}
		})
		getList();
	}

	// Función eliminar item de la lista
	const deleteItemList = async (id) => {
		const response = await fetch(`${API_URL}/todos/${id}`, {
			method: "DELETE"
		})
		getList()
	}

	useEffect(() => {
		getList()
	}, [])




	const handleKeyUp = (e) => {
		if (e.key === "Enter") {
			if (e.target.value !== "") {
				//setListToDo([...listToDo, e.target.value])
				createItemList(e.target.value);
				e.target.value = "";
			}

		}
	}
	const deleteBtn = (deleteIndex) => {
		//setListToDo(listToDo.filter((item, index) => index !== deleteIndex));
		deleteItemList(deleteIndex);
	}

	return (
		<div className="text-center">
			<h1 className="my-5">ToDo List</h1>
			<div className="listPaper mx-auto text-start p-4">
				<input
					name="list"
					type="text"
					placeholder="What needs to be done?"
					className="input"
					onKeyUp={handleKeyUp}
				></input>
				{
					listToDo.map((listItem, index) => {
						return (
							<div key={index} className="pb-2 my-3 items d-flex justify-content-between">
								<div className=""><i className="fa-solid fa-circle-dot"></i> {listItem.label}</div>
								<button className="btn delete"
									onClick={() => deleteBtn(listItem.id)}
								>X</button>
							</div>
						);
					})
				}
				<p className="m-0 text-secondary counterItems">{listToDo.length} items</p>
			</div>
		</div>
	);
};

export default Home;