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

function createProduct(name, imageURL, id, price) {
  let productTemplate = `<div class="product" id="${id}">
    <img src="${imageURL}">
    <p>${name}</p>
    <p> ${price}</p>
</div>
`;
  return productTemplate;
}

let figureContainer = document.getElementsByClassName("figure-container");

for (let i = 0; i < products.length; i++) {
  let prod = createProduct(products[i]["name"], products[i].image, products[i].price, i);
  figureContainer[0].innerHTML+= prod;
}
