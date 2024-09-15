import DBdata from "./models/goods.json";
import Card from "./components/Card";
import './App.css'


function App() {

	return (
		<>
			<div className="cards">
				{DBdata.map(item => (
					<Card key={item.id} {...item} />
				))}
			</div>
		</>
	)
}

export default App
