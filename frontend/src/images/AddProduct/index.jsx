import React, { useState } from "react";
import axios from 'axios';
import ImageInput from "../ImageInput";
import styles from "./styles.module.css";

const AddProduct = () => {
	const [data, setData] = useState({
		itemNo: "",
		timberType: "",
		image: "",
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
			const url = process.env.REACT_APP_API_URL + "/items"
			const { data : res } = await axios.post(url, data);
			console.log(res)
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit} >
				<h1 className={styles.heading}> Form</h1>
				<input
					type="text"
					className={styles.input}
					placeholder="Item No"
					name="itemNo"
					onChange={handleChange}
					value={data.itemNo}
				/>
				<input
					type="text"
					className={styles.input}
					placeholder="Timber Type"
					name="timberType"
					onChange={handleChange}
					value={data.timberType}
				/>
				
				<ImageInput
					name="image"
					label="Choose Image"
					handleInputState={handleInputState}
					type="image"
					value={data.image}
				/>
				
				<button type="submit" className={styles.submit_btn} >
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddProduct;