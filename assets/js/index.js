let product = [
  {
    id: 111,
    name: "Plain",
    price: 40,
    qty: 1,
    image: "https://www.tutorjoes.in/public/js_program/12_cart/images/97.jpg",
  },
  {
    id: 112,
    name: "Paper Roast",
    price: 65,
    qty: 1,
    image: "https://www.tutorjoes.in/public/js_program/12_cart/images/98.jpg",
  },
  {
    id: 113,
    name: "Onion Roast",
    price: 80,
    qty: 1,
    image: "https://www.tutorjoes.in/public/js_program/12_cart/images/99.jpg",
  },
  {
    id: 114,
    name: "Egg Parotta",
    price: 55,
    qty: 1,
    image: "https://www.tutorjoes.in/public/js_program/12_cart/images/100.jpg",
  },
  {
    id: 115,
    name: "Plain Omelette",
    price: 25,
    qty: 1,
    image: "https://www.tutorjoes.in/public/js_program/12_cart/images/101.jpg",
  },
  {
    id: 116,
    name: "Kadai Fry",
    price: 150,
    qty: 1,
    image: "https://www.tutorjoes.in/public/js_program/12_cart/images/102.jpg",
  },
  {
    id: 117,
    name: "Egg Veechu",
    price: 65,
    qty: 1,
    image: "https://www.tutorjoes.in/public/js_program/12_cart/images/103.jpg",
  },
  {
    id: 118,
    name: "Egg Roast",
    price: 65,
    qty: 1,
    image: "https://www.tutorjoes.in/public/js_program/12_cart/images/104.jpg",
  },
];

const viewProduct = () => {
  let tbl = "";
  product.map((val) => {
    return (tbl += `
                <div class="food-box">
                    <div class="pic">
                        <img src="${val.image}" class="food-img">
                    </div>
                    <h2 class="food-title">${val.name}</h2>
                    <span class="food-price">Rs.${val.price}</span>
                    <button onclick="addcart(${val.id})" class="btn add-cart" type="submit"><i class="fa-solid fa-cart-shopping"></i></button>
                </div>
            `);
  });
  document.getElementById("product").innerHTML = tbl;
};
viewProduct();

let cart = [];
const addcart = (id) => {
  //for alredy exist
  let allcart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")): [];
  let repcart = allcart.find((item) => {
    return item.id == id;
  });
  if (repcart) {
    alert("record already exist");
    return false;
  }
  if (
    localStorage.getItem("cart") === null || localStorage.getItem("cart") === undefined) {
    product.map((item) => {
      if (item.id == id) {
        cart.push(item);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    let oldcart = JSON.parse(localStorage.getItem("cart"));
    product.map((item) => {
      if (item.id == id) {
        oldcart.push(item);
      }
    });
    localStorage.setItem("cart", JSON.stringify(oldcart));
  }
  alert("Item addded to cart!");
  viewProduct();
  viewcart();
};

// Cart Items
const viewcart = () => {
  let allcart = JSON.parse(localStorage.getItem("cart"));
  let tbl = "";
  let sum = 0;
  allcart.map((item) => {
    sum = sum + item.price * item.qty;
    return (tbl += `
                <div class="cart-box d-flex">
                  <div class="col-3">
                    <div class="pic">
                      <img src="${
                        item.image
                      }" class="food-img" style="width: 100px; height: 100px;">
                    </div>
                  </div>
                  <div class="col-6 d-flex">
                    <div class="ms-4">
                      <h2 class="food-title">${item.name}</h2>
                      <span class="food-price">Rs.${item.price}</span><br>
                      <span style="line-height: 30px;"><input type="number" id="qty_${item.id}" 
                      value="${item.qty}" onchange="editcart(${item.id})" style="width: 46px;height: 28px;"></span>
                    </div>
                  </div>
                  <div class="col-3 align-self-center">
                    <div class="d-flex align-items-center" style="margin:auto;">
                      <span>Rs.${item.price * item.qty}</span>
                      <button onclick="deletcart(${
                        item.id
                      })" class="btn text-danger" type="submit">
                      <i class="fa-regular fa-trash-can"></i></button>
                    </div>
                  </div>
                </div><br>
            `);
  });
  document.getElementById("cart").innerHTML = tbl;
  document.getElementById("totalamount").innerText = `final total :- ${sum}`;
};
viewcart();

//for edit cart
const editcart = (id) => {
  let qty = document.getElementById(`qty_${id}`).value;
  let allcart = JSON.parse(localStorage.getItem("cart"));
  allcart.map((item) => {
    if (item.id == id) {
      item.qty = qty;
    }
  });
  localStorage.setItem("cart", JSON.stringify(allcart));
  viewcart();
};

//for delet cart
const deletcart = (id) => {
  let allcart = JSON.parse(localStorage.getItem("cart"));
  let del = allcart.filter((item) => {
    return item.id != id;
  });
  localStorage.setItem("cart", JSON.stringify(del));
  alert("record deleted");
  viewcart();
};

// //for alredy exist
// let allcart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
// let repcart = allcart.find((item)=>{
//   return item.id == id;
// });
// if(repcart){
//   alert("record already exist");
//   return false;
// }
