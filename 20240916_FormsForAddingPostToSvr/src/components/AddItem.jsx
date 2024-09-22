import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddItem = ({ onAddItem }) => {
	const [name, setName] = useState("");
	const [originalPrice, setOriginalPrice] = useState("");
	const [altName, setAltName] = useState("");
	const [imgSrc, setImgSrc] = useState(null);
	const [error, setError] = useState("");

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImgSrc(URL.createObjectURL(file));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		if (!name || !originalPrice || !altName || !imgSrc) {
			setError("Please fill in all fields and upload an image.");
			return;
		}

		if (originalPrice <= 0) {
			setError("Price must be greater than 0.");
			return;
		}

		onAddItem(imgSrc, altName, name, originalPrice);
		setName("");
		setOriginalPrice("");
		setAltName("");
		setImgSrc(null);
	};

	return (

		<div className="border rounded p-4 shadow-sm form-container d-flex flex-column justify-content-center align-items-center">
			<h2 className="text-center mb-4">Adding New Items</h2>
			<form onSubmit={handleSubmit} className="w-75 p-3 d-flex flex-column gap-3">
				{error && <div className="alert alert-danger">{error}</div>}
				<div className="d-flex flex-column">
					<label className="form-label mb-1">Item Name</label>
					<input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
				</div>
				<div className="d-flex flex-column">
					<label className="form-label mb-1">Item Price</label>
					<input type="number" placeholder="Price" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="form-control" min="0" step="0.01" />
				</div>
				<div className="d-flex flex-column">
					<label className="form-label mb-1">Item Image Alt Name</label>
					<input type="text" placeholder="Image alt name" value={altName} onChange={(e) => setAltName(e.target.value)} className="form-control" />
				</div>
				<div className="d-flex flex-column ">
					<label className="form-label mb-1">Image For Upload</label>
					<div className="d-flex flex-row align-items-center">
						<input type="file" className="form-control me-2" id="inputGroupFile02" onChange={handleFileChange} />
						<label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
					</div>

				</div>
				<button type="submit" className="btn btn-primary">Add Item</button>
			</form>
		</div>
	);
};

export default AddItem;
