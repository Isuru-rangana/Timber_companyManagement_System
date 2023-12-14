import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './details.css';
import './header.css';
import CustomerHeader from './CustomerHeader';
import jsPdf from 'jspdf';
import 'jspdf-autotable';
import logo from '../images/logo_itp.png';

function ShoppingCart(userDetails) {
  const user = userDetails.user;
  const getEmail = localStorage.getItem('emailData');

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [ordernumber, setOrdernumber] = useState(null);

  const [itemDetails, setItemDetails] = useState([]); // new state variable
  const [cus, setCus] = useState([]);

  async function fetchItems() {
    const emailParam = getEmail || (user ? user.email : null);

    const response = await fetch(`http://localhost:8070/cart/${emailParam}`);
    const itemsData = await response.json();
    setItems(itemsData);
    console.log(itemsData);
  }

  useEffect(() => {
    fetchItems();
  }, [getEmail, user]);

  useEffect(() => {
    async function fetchItemNames() {
      const itemData = await Promise.all(
        items.map(async (post) => {
          const response = await axios.get(
            `http://localhost:8070/product/${post.itemNo}`
          );
          const data = response.data;
          return {
            itemName: data.itemName,
            price: data.price,
            image: data.image,
            subTotal: post.quantity * data.price, // calculate subTotal value
          };
        })
      );
      setItemDetails(itemData);
      console.log(itemData);
    }
    fetchItemNames();
  }, [items]);

  //delete record by id
  function deleteItem(id) {
    axios
      .delete(`http://localhost:8070/cart/delete/${id}`)
      .then((result) => {
        alert('Item removed successfully');
        fetchItems();
      })
      .catch(() => {
        alert('Error occurred while removing item');
      });
  }

  //delete all records
  function deleteAll() {
    const emailParam = getEmail || (user ? user.email : null);
    axios
      .delete(`http://localhost:8070/cart/clear/${emailParam}`)
      .then((result) => {
        alert('All items removed');
        window.location.reload();
      })
      .catch(() => {
        alert('Error occurred while clearing the cart');
      });
  }

  async function getCus() {
    const emailParam = getEmail || (user ? user.email : null);

    const response = await fetch(
      `http://localhost:8070/customer/profile/${emailParam}`
    );
    const Data = await response.json();
    setCus(Data);
    console.log(Data);
  }
  useEffect(() => {
    getCus();
  }, []);

  const [count, setCount] = useState([]);

  function getCount() {
    axios
      .get('http://localhost:8070/counter/get/6452657b898f69c60a9346d0')
      .then((res) => {
        setCount(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    getCount();
  }, []);

  console.log(count);

  function sendData() {
    const num = count.counter.count + 1;
    setOrdernumber(num);
    const newSale = {
      CustomerID: cus.CustomerID,
      Saleprice: itemDetails.reduce((acc, item) => acc + item.subTotal, 0),
    };

    for (let i = 0; i < items.length; i++) {
      const newItem = {
        OrderNo: count.counter.count + 1,
        ItemNo: items[i].itemNo,
        Quantity: items[i].quantity,
      };
      console.log(newItem.OrderNo);
      console.log(newItem.ItemNo);
      console.log(newItem.Quantity);

      axios
        .post('http://localhost:8070/orderItem/add', newItem)
        .then(() => {})
        .catch((err) => {
          alert('Error occurred while placing the order');
        });
    }

    axios
      .post('http://localhost:8070/sales/cus/add', newSale)
      .then(() => {
        alert('You Placed the Order Successfully under Order No : ' + num);
      })
      .catch((err) => {
        alert(err);
      });

      setIsGeneratingPdf(true);
  }

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  //generate pdf after 2 seconds of implement the sendData function
  useEffect(() => {
    if (isGeneratingPdf) {
      const timeoutId = setTimeout(() => {
        generatePdf();
        setIsGeneratingPdf(false);
      }, 2000); // wait for 3 seconds before generating the PDF
      
      return () => clearTimeout(timeoutId);
    }
  }, [isGeneratingPdf]);

  //generate pdf
  function generatePdf() {
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'portrait';

    const marginLeft = 40;
    const doc = new jsPdf(orientation, unit, size);

    const imageData = logo;

    doc.setDrawColor(0); // set border color to black
    doc.setLineWidth(2); // set border width
    doc.roundedRect(
      20,
      20,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 40,
      10,
      10,
      'D'
    ); // add border with rounded corners

    doc.setFontSize(15);

    const title = '_.MY ORDERS._';

    const headers = [['Item Name', 'Unit Price', 'Quantity', 'SubTotal Price']];

    const data = items.map((post, index) => [
      itemDetails[index] ? itemDetails[index].itemName : 'Loading...',

      'Rs.' +
        (itemDetails[index] ? itemDetails[index].price : 'Loading...') +
        '.00',
      post.quantity,
      'Rs.' +
        (itemDetails[index] ? itemDetails[index].subTotal : 'Loading...') +
        '.00',
    ]);

    let content = {
      startY: 150, // move the table down to make room for the image
      head: headers,
      body: data,
    };

    const totalp =
      'Order price : Rs.' +
      itemDetails.reduce((acc, item) => acc + item.subTotal, 0) +
      '.00';

    const Ordn = `Order No : ${ordernumber}`;
    const pay = 'Payment type : Cash on delivery';
    const time = 'Order placed date and time : ' + new Date().toLocaleString();
    const text1 =
      '/*Our Sales division will contact you soon. Stay connected with us*/';
    const end =
      '[This is system generated document. All rights reserved by woodmasters(pvt)ltd]';

    const imageWidth = 200;
    const imageHeight = 50;
    const imageX = (doc.internal.pageSize.width - imageWidth) / 2; // center the image horizontally
    const imageY = 30; // position the image at the top

    doc.addImage(imageData, 'JPEG', imageX, imageY, imageWidth, imageHeight);
    doc.text(title, marginLeft, 120, { underline: true }); // move the title down to make room for the image
    doc.autoTable(content);
    doc.text(Ordn, marginLeft, 470);
    doc.text(pay, marginLeft, 570);
    doc.text(text1, marginLeft, 770);
    doc.text(end, marginLeft, 810);
    doc.text(totalp, marginLeft, 520);
    doc.text(time, marginLeft, 620, 300);
    doc.save('MY ORDERS.pdf');
    //toast("Item Report Download");
  }

  return (
    <div class="home-section">
      <div class="top">
        <button
          onClick={() => {
            const confirmBox = window.confirm(
              'Do you really want to clear the cart'
            );
            if (confirmBox === true) {
              deleteAll();
            }
          }}
          id="add_btn"
          style={{ fontSize: '16px' }}
        >
          Clear Cart
        </button>
      </div>

      <div class="details">
        <h3>
          <b>- Shopping Cart -</b>
        </h3>
        <table class="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Image</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th></th>
              <th>SubTotal Price</th>
              <td></td>
            </tr>
          </thead>

          <tbody>
            {items.map((post, index) => (
              <tr key={post._id}>
                <td>
                  {itemDetails[index]
                    ? itemDetails[index].itemName
                    : 'Loading...'}
                </td>
                <td>
                  <img
                    src={
                      itemDetails[index]
                        ? itemDetails[index].image
                        : 'Loading...'
                    }
                    className="itemImage"
                  />
                </td>
                <td>
                  Rs.
                  {itemDetails[index] ? itemDetails[index].price : 'Loading...'}
                  .00
                </td>
                <td>
                  <input
                    type="number"
                    min={1}
                    style={{ width: '50px' }}
                    value={post.quantity}
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[index].quantity = e.target.value;
                      setItems(updatedItems);
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={async () => {
                      try {
                        await axios.put(
                          `http://localhost:8070/cart/update/${post.id}`,
                          {
                            quantity: post.quantity,
                          }
                        );
                        alert('Quantity saved successfully!');
                      } catch (error) {
                        console.error(error);
                        alert('Failed to save quantity!');
                      }
                    }}
                    className="updateBtn"
                    style={{ fontSize: '12px' }}
                  >
                    Save quantity
                  </button>
                </td>
                <td>
                  Rs.
                  {itemDetails[index]
                    ? itemDetails[index].subTotal
                    : 'Loading...'}
                  .00
                </td>

                <td>
                  <button
                    onClick={() => {
                      const confirmBox = window.confirm(
                        'Do you really want to remove item'
                      );
                      if (confirmBox === true) {
                        deleteItem(post.id);
                      }
                    }}
                    className="deleteBtn"
                    style={{ fontSize: '14px' }}
                  >
                    Remove item
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div class="bottom">
        <div class="Tot">
          <p>
            Total Quantity ={' '}
            <b>
              {items.reduce((acc, item) => acc + parseInt(item.quantity), 0)}
            </b>
            {'  ,  '}
            Total Price ={' '}
            <b>
              Rs.{itemDetails.reduce((acc, item) => acc + item.subTotal, 0)}.00
            </b>
            <br />
            <br />
            Payment Type = <b>Cash on delivery</b>
          </p>
        </div>
        <button
          onClick={() => {
            const confirmBox = window.confirm(
              'Do you really want to place the order?'
            );
            if (confirmBox === true) {
              sendData();
            }
          }}
          id="place_btn"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
