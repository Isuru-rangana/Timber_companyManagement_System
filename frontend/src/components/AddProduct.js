import React, { useState } from "react";
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import ImageInput from "./ImageInput";
import "./details.css"



const AddProduct = () => {

	const navigate = useNavigate(); 

	const [data, setData] = useState({
		itemNo: "",
		itemName: "",
		category: "",
		timberType: "",
		size: "",
		price: "",
		image: ""
	});

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const url = process.env.REACT_APP_API_URL
			const { data : res } = await axios.post(url, data);
			console.log(res);
			alert("Product added");
			navigate("/getProducts")
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<div class="home-section">
            <h2 class="form_head">Enter Product Details</h2>
			<form className="formContent"   onSubmit={handleSubmit} >
		
			<div className="mb-3">
				<label className="form-label">Item Number</label><br/>
                <input
					type="text"
					className="formInput"
					placeholder="Item Number"
					name="itemNo"
					onChange={handleChange}
					value={data.itemNo}
					required maxLength="4"
           			pattern="[P]{1}[0-9]{3}" title="Enter a valid Item number (eg: P123)"
				/>	
			</div>

			<div className="mb-3">
				<label className="form-label">Item Name</label><br/>
				<input
					type="text"
					className="formInput"
					placeholder="Item Name"
					name="itemName"
					onChange={handleChange}
					value={data.itemName}
					required
				/>
			</div>


			<div className="mb-3">
				<label className="form-label">Image</label><br/>
				<ImageInput
					name="image"
					handleInputState={handleInputState}
					type="image"
					value={data.image}
				/>
			</div>


			<div className="mb-3">
				<label className="form-label">Category</label><br/>
				<select className="formInput" name="category" value={data.category} onChange={handleChange}>
                    <option value="Living Room" selected>Living Room</option>
                    <option value="Bed Room">Bed Room</option>
					<option value="Dinning Room">Dinning Room</option>
					<option value="Office">Office</option>
					<option value="Other Appliances">Other Appliances</option>
                </select>
			</div>

			<div className="mb-3">
				<label className="form-label">Timber Type</label><br/>
				<select className="formInput" name="timberType" value={data.timberType} onChange={handleChange}>
                    <option value="Teak" selected>Teak</option>
                    <option value="Jack">Jack</option>
					<option value="Ebony">Ebony</option>
					<option value="Mahogany">Mahogany</option>
					<option value="Satin">Satin</option>
                </select>
			</div>


			<div className="mb-3">
				<label className="form-label">Size</label><br/>
				<input
					type="text"
					className="formInput"
					placeholder="Size"
					name="size"
					onChange={handleChange}
					value={data.size}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label">Price</label><br/>
				<input
					type="text"
					className="formInput"
					placeholder="Price"
					name="price"
					onChange={handleChange}
					value={data.price}
					title="Enter a valid price"
					required
					pattern="[0-9]+([.][0-9]+)?"
				/>
			</div>
				<Link to="/getProducts" className="backBtn">
                    Back
                </Link>
				<button type="submit" className="updateBtn">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddProduct;