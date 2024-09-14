import { useEffect, useState } from "react";
import DBdata from "./models/goods.json";
import Card from "./components/cardItem/Card";
import AddItem from "./components/AddItem";
import "./App.css";

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(DBdata);
	}, []);

	const addItem = (imgSrc, altName, name, originalPrice) => {
		const newItem = {
			id: items.length + 1,
			imgSrc,
			altName,
			name,
			originalPrice,
			discountedPrice: 0,
			link: "",
		};
		setItems([...items, newItem]);
	};

	return (
		<>
			<div>
				<AddItem onAddItem={addItem} />
			</div>
			<div className="cards">
				{items.map((item) => (
					// <Card key={item.id} imgSrc={item.imgSrc} altName={item.altName} name={item.name} originalPrice={item.originalPrice} discountedPrice={item.discountedPrice} link="" />
					<Card key={item.id} {...item} />
				))}
			</div>
		</>
	);
}

export default App
