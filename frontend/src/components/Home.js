import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';

function Searchbar(props) {
  const handleSearchChange = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter keyword"
        onChange={handleSearchChange}
      />
    </div>
  );
}

function Home() {
  const getEmail=localStorage.getItem("emailData");
  const [user, setUser] = useState([]);
 
	//const [email, setEmail] = useState("");

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL_2}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
      //setEmail(user.email);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);



  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const [items, setItems] = useState([]);

  /*
  //fetch records
  const getProducts = async () => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };*/

  useEffect(() => {
    //fetch records with shuffling products
    const getProducts = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_API_URL);
        const shuffledProducts = data.data.sort(() => Math.random() - 0.5); // Shuffle the array
        setProducts(shuffledProducts);
      } catch (error) {
        console.log(error);
      }
    };



    getProducts();
  }, []);

  const handleCheckBoxChange = (e) => {
    const checked = e.target.checked;
    const categoryName = e.target.value;

    if (checked) {
      setCheckedBoxes([...checkedBoxes, categoryName]);
    } else {
      const newCheckedBoxes = checkedBoxes.filter((cb) => cb !== categoryName);
      setCheckedBoxes(newCheckedBoxes);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      if (checkedBoxes.length === 0) {
        return true;
      }
      return checkedBoxes.includes(product.category);
    })
    .filter((product) => {
      if (search.length === 0) {
        return true;
      }
      return product.itemName.toLowerCase().includes(search.toLowerCase());
    });

    function sendData(itemNo) {
      /*var success = true;
      for (var i = 0; i < items.length; i++) {
        //alert(itemNo + ': ' + items[i].itemNo);
        //alert(items.length);
  
        if (itemNo === items[i].itemNo) {
          alert('This item is already added to the cart');
          success = false;
        }
      }*/
  
      //if (success == true) {
        const newItem = {
          email: user.email || getEmail,
          itemNo,
        }
  
        if(newItem.email){
  
        axios
          .post('http://localhost:8070/cart/add', newItem)
          .then(() => {
            alert('Item added to cart');
            console.log("added");
  
          })
          .catch((err) => {
            alert(err);
          });
        }
        else{
          navigate("./userprofile");
        }
      }

  

  return (
    <div className="home-section">
      <div class="row">
        <div className="sticky">
        <hr />
        <div className="d-flex justify-content-between">
        <div className="col-md-6">
          <h3>Sort Products By Category</h3>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              value="Office Room"
              onChange={handleCheckBoxChange}
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Office Room
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              value="Living Room"
              onChange={handleCheckBoxChange}
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Living Room
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              value="Bed Room"
              onChange={handleCheckBoxChange}
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Bed Room
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              value="Dining Room"
              onChange={handleCheckBoxChange}
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Dining Room
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              value="Other Appliances"
              onChange={handleCheckBoxChange}
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Other Appliances
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <h3>Search Products</h3>
          <Searchbar setSearch={setSearch} />
        </div>
        </div>

        <hr /></div>

        {filteredProducts.map((post) => (
          <div class="col-md-4 mt-2">
            <div class="card product-card" key={post._id}>
              <div class="card-body">
                <div class="card-img-actions">
                  <img
                    src={post.image}
                    alt="img"
                    class="card-img img-fluid"
                    width="90"
                    height="100"
                  />
                </div>
              </div>

              <div class="card-body bg-light text-center">
                <div class="mb-2">
                  <h6 class="font-weight-semibold mb-2">
                    <a href="#" class="text-default mb-2" data-abc="true">
                      {post.itemName}
                    </a>
                  </h6>

                  <a href="#" class="text-muted" data-abc="true">
                    - {post.category} -
                  </a>
                  <br />
                  <a href="#" class="text-muted" data-abc="true">
                    / {post.timberType} /
                  </a>
                </div>

                <h3 class="mb-0 font-weight-semibold">Rs.{post.price}</h3>

                <button
                  type="button"
                  class="btn bg-cart green-background"
                  onClick={() => {
                    sendData(post.itemNo);
                    //window.location.reload();
                  }}
                >
                  <i class="fa fa-cart-plus mr-2"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
