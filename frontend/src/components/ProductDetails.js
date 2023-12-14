import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import "./details.css"


function ProductDetails() {
  const[search,setSearch] = useState("");
    const navigate = useNavigate();  
    const [products, setProducts] = useState([])

    const getProducts = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_API_URL)
        setProducts(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getProducts();
    }, [])
  


    function deleteProduct(id){
      axios.delete(`http://localhost:8070/product/delete/${id}`)
      .then((result)=>{
          getProducts();
      })
      .catch(()=>{
          alert("Error ane");
      });
    }


    return (
      <div class="home-section">
          <div class="top">
          <Link id="add_btn"  to="/addProduct" className="btn btn-dark">New Product</Link>

   
        <form id="search" 
         onChange={(e) => setSearch(e.target.value)}>

            <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
         
        </form>
          </div>
          <div class="details">
            <h3><b>All Products</b></h3>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Item Number</th>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Timber Type</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Image</th>
                    
                    </tr>
                    </thead>

                    <tbody>
                    {products.filter((post)=> {
                    return search === ''
                    ? post
                    : post.itemNo.toLowerCase().includes(search) || post.itemNo.toUpperCase().includes(search) || post.itemNo.includes(search) ||
                    post.itemName.toLowerCase().includes(search) || post.itemName.toUpperCase().includes(search) || post.itemName.includes(search)||
                    post.category.toLowerCase().includes(search) || post.category.toUpperCase().includes(search) || post.category.includes(search)||
                    post.timberType.toLowerCase().includes(search) || post.timberType.toUpperCase().includes(search) || post.timberType.includes(search);
                 
                    })
                    
                    .map((post) => (
                    <tr key={post._id}>
                      <td>{post.itemNo}</td>
                      <td>{post.itemName}</td>
                      <td>{post.category}</td>
                      <td>{post.timberType}</td>
                      <td>{post.size}</td>
                      <td>{post.price}</td>
                      <td><img src={post.image} alt="img" className="itemImage" /></td>



                        <td><button onClick={()=>{
                            navigate("/updateProduct",
                            {
                                state: {
                                    id: `${post._id}`,
                                    itemNo: `${post.itemNo}`,
                                    itemName: `${post.itemName}`,
                                    category: `${post.category}`,
                                    timberType: `${post.timberType}`,
                                    size: `${post.size}`,
                                    price: `${post.price}`,
                                    image: `${post.image}`,
                                    
                                }
                            });
                        }}className="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                        <td><button onClick={()=>{
                            const confirmBox = window.confirm(
                                "Do you really want to delete"
                            )
                            if(confirmBox === true){
                                deleteProduct(post._id);
                            }
                        }} className="deleteBtn"  style={{fontSize:"14px"}}>Delete</button></td>

                    </tr>            
                    ))}

                    </tbody>
                </table>

            </div>
            </div>
         
  );
}

export default ProductDetails;