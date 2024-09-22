// import DBdata from "./models/goods.json";
import Card from "./components/Card";
import './App.css'
import { useEffect, useReducer, useState } from "react";
import { initialState, productReducer } from "./reducer/productReducer";


function App() {
	// adding useEffect
	const url = "http://localhost:3000/products";

	//const [DBdata, setDBdata] = useState([]);

	const [data, dispatch] = useReducer(productReducer, initialState); // via reducer

	useEffect(() => {
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error("Network error: " + response.status);
				}
				return response.json();
			})
			// .then(data => {
			// 	setDBdata(data);
			// })
			.then((data) => dispatch({ type: "ALL_PRODUCTS", payload: data })) // via reducer
			.catch(() => {
				console.log("Error occured")
			})
	}, [data.products.length]
	);

	return (
		<>
			<div className="cards">
				{data.products.map(item => (
					<Card key={item.id} {...item} />
				))}
			</div>
		</>
	)
}

export default App
