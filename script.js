let cartIcon=document.querySelector("#cart-icon");
let cart=document.querySelector(".cart");
let closeCart=document.querySelector("#close-cart");

// open cart from icon

cartIcon.onclick = () => {
    cart.classList.add("active");
};

// close cart from icon

closeCart.onclick = () => {
    cart.classList.remove("active");
};


// cart working

if(document.readyState=='loading'){
    document.addEventListener("DOMContentLoaded",ready);
}
else{
    ready();
}

function ready(){
    var removeCartButton=document.getElementsByClassName("cart-remove");
    console.log(removeCartButton);
    for(var i=0; i<removeCartButton.length;i++){
        var button= removeCartButton[i];
        button.addEventListener("click", removeCartItem );
    }


  // update quantity

    var quantityInputs=document.getElementsByClassName("cart-quantity");
    for(var i=0; i<quantityInputs.length;i++){
        var input= quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }


    // add to cart

    var addCart=document.getElementsByClassName("kart");
    for(var i=0; i<addCart.length;i++){
        var button=addCart[i];
        button.addEventListener("click" , addCartClicked);
    }

    // buy button

document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);

function buyButtonClicked(){
    alert("Your order has been placed!");
    var cartContent=document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

}


function addCartClicked(event){
    var button=event.target;
    var shopProducts=button.parentElement;
    var title=shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price=shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg=shopProducts.getElementsByClassName("imgs")[0].src;
    addProductToCart(title,price,productImg);
    updateTotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox=document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems=document.getElementsByClassName("cart-content")[0];
    var cartItemsName=cartItems.getElementsByClassName("cart-product-title");
    for(var i=0; i<cartItemsName.length;i++){
        if(cartItemsName[i].innerHTML==title){
        alert("You have added this item to cart.");
        return;
        }
    }


var cartBoxContent = 
       `  <img src="${productImg}" alt="" class="cart-img">
          <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
          </div>
           <!-- remove cart -->
           <i class="fa-solid fa-trash cart-remove"></i>`;
cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click" ,removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change" ,quantityChanged);

}

function removeCartItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event){
    var input=event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateTotal();
}


// total

function updateTotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0];
    var cartBoxes= document.getElementsByClassName("cart-box");
    total=0;
    for(var i=0; i<cartBoxes.length;i++){
        var cartBox=cartBoxes[i];   
        var priceElement=cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
        var price=parseFloat(priceElement.innerText.replace("$",""));
        var quantity=quantityElement.value;
        total=total+price*quantity;
    }
        document.getElementsByClassName("total-price")[0].innerText="$"+total;
    
}







