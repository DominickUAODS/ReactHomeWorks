// import DBdata from "./models/goods.json";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import AddItem from "./components/AddItem";
import Modal from "./components/Modal";
import "./App.css";


function App() {
	// adding useEffect
	const url = "http://localhost:3000/products";

	const [DBdata, setDBdata] = useState([]);
	// const [open, setOpen] = useState(false);
	// const closeModal = () => setOpen(!open);

	useEffect(() => {
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error("Network error: " + response.status);
				}
				return response.json();
			})
			.then(data => {
				setDBdata(data);
			})
			.catch(() => {
				console.log("Error occured")
			})
	}, []
	);

	const addItem = (imgSrc, altName, name, originalPrice) => {
		const newItem = {
			id: DBdata.length + 1,
			imgSrc,
			altName,
			name,
			originalPrice,
			discountedPrice: 0,
			link: "",
		};

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newItem),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Network error: " + response.status);
				}
				return response.json();
			})
			.then(() => {
				setDBdata([...DBdata, newItem]);
			})
			.catch(() => {
				console.log("Error adding item");
			});
	};

	return (
		<>
			<div>
				<AddItem onAddItem={addItem} />
			</div>


			<div className="cards">
				{DBdata.length === 0 ? (
					<p>No products available</p>
				) : (
					DBdata.map(item => (
						<Card key={item.id} {...item} />
					))
				)}
			</div>
		</>
	);
}

export default App;
