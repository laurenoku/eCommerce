let products = [
    {
      name: "Blueberry Jam Tea",
      price: "$11.98",
      image:
        "https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dw6da19a13/productimages/10820DT01VAR0082483-10820US01VAR0062957-BI-1.jpg?sw=700&sh=700&sm=fit",
    },
    {
      name: "Buddha's Blend Tea",
      price: "$12.98",
      image:
        "https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dwd9c1b96f/productimages/10348DT01VAR0015204-10348US01VAR0017253-BI-1.jpg?sw=700&sh=700&sm=fit",
    },
    {
      name: "Breakfast Blend",
      price: "$8.98",
      image:
        "https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dwefe36d0a/productimages/10683DT01VAR0059148-10683US01VAR0046041-BI-1.jpg?sw=700&sh=700&sm=fit",
    },
    {
      name: "Serenity Now Tea",
      price: "$10.48",
      image:
        "https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dw2e61cb83/productimages/10494DT01VAR0027541-10494US01VAR0021558-BI-1.jpg?sw=700&sh=700&sm=fit",
    },
    {
      name: "Earl Grey Tea",
      price: "$8.98",
      image:
        "https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dw050f7514/productimages/10076DT01VAR003961-10076US01VAR0012981-BI-1.jpg?sw=700&sh=700&sm=fit",
    },
    {
      name: "Japanese Sencha Tea",
      price: "$9.98",
      image:
        "https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dwc5d03ef9/productimages/10057DT01VAR003948-10057US01VAR0012968-BI-1.jpg?sw=700&sh=700&sm=fit",
    },  {
      name: "Cinnamon Rooibos Chai",
      price: "$8.98",
      image:
        "https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dw39506e47/productimages/10063DT01VAR003951-10063US01VAR003951-BI-1.jpg?sw=700&sh=700&sm=fit",
    }
  ];

function createProduct(name, imageURL, price) {
  let productTemplate = `
  <div class="product">
      <h3 class="productname">${name}</h3>
      <img src="${imageURL}">
      <p class="price">${price}</p>
      <button class="addtocart">Add To Cart</button>
  </div>
`;
  return productTemplate;
}
let figureContainer = document.getElementsByClassName("figure-container");

for (let i = 0; i < products.length; i++) {
  let prod = createProduct(products[i]["name"], products[i].image, products[i]["price"], i);
  figureContainer[0].innerHTML+= prod;
}

/* get cart total from session on load */
updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
let btns = document.getElementsByClassName('addtocart');
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* ADD TO CART functions */

function addToCart(elem) {
    //init
    let sibs = [];
    let getprice;
    let getproductName;
    let cart = [];
     let stringCart;
    //cycles siblings for product info near the add button
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //create product object
    let product = {
        productname : getproductName,
        price : getprice
    };
    //convert product data to JSON for storage
    let stringProduct = JSON.stringify(product);
    /*send product data to session storage */
    
    if(!sessionStorage.getItem('cart')){
        //append product JSON object to cart array
        cart.push(stringProduct);
        //cart to JSON
        stringCart = JSON.stringify(cart);
        //create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        //get existing cart data from storage and convert back into array
       cart = JSON.parse(sessionStorage.getItem('cart'));
        //append new product JSON object
        cart.push(stringProduct);
        //cart back to JSON
        stringCart = JSON.stringify(cart);
        //overwrite cart data in sessionstorage 
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Calculate Cart Total */
function updateCartTotal(){
    //init
    let total = 0;
    let price = 0;
    let items = 0;
    let productname = "";
    let carttable = "";
    if(sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (let i = 0; i < items; i++){
            //convert each JSON product in array back into object
            let x = JSON.parse(cart[i]);
            //get property value of price
            price = parseFloat(x.price.split('$')[1]);
            productname = x.productname;
            //add price to total
            carttable += "<tr><td>" + productname + "</td><td>$" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    //update total on website HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback on successful add
function addedToCart(pname) {
  let message = pname + " was added to the cart";
  let alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}
/* User Manually empty cart */
function emptyCart() {
    //remove cart session storage object & refresh cart totals
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      //clear message and remove class style
      let alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}

// JavaScript to show/hide the dropdown content
const dropdownButton = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownButton.addEventListener("click", function() {
    dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
});