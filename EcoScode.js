

let products = [
    
    { 
        id: 50,
        productName: "Jobba",
        price: 50,
        hours: 40,
    },
    {
        id: 42,
        productName:"Annat",
        price: 45,
        hours: 145
    }

]


let customers =[

    { 
        id: 1,
        name: "Testkund",
        kontakt: "Åkeri",
        adress: "Gatan 1"
    },
    {
        id: 2,
        name: "testkund 2",
        kontakt: "Åkeri 2",
        adress: "Gatan 2"
    }

]



function populateCustomerList(){
    
    for (customer of customers){

        document.querySelector(".customerList").insertAdjacentHTML("beforeend", `<option value="${customer.id}" >${customer.id}: ${customer.name}</option>`)

    }
}

function populateProductList(){

    let productList = document.querySelector(".productList");

    for (product of products){
        productList.insertAdjacentHTML("beforeend",`<option>${product.productName}</option>`)
    }

}

function setProductDetails(){

    let focusProductList = document.querySelector(".productList");

    focusProductList.addEventListener("change", function (){



    })
}


function addRow(){

    let btn = document.querySelectorAll(".plus");

    for (let b of btn ){

        b.addEventListener("click",function(){
        b.nextElementSibling.insertAdjacentHTML("afterend",`
        <br><select name="productList" id="productList" class="productList">
                <option class="productOption" value="Välj produkt">Välj Produkt</option>
            </select>
            <input type="text" name="productName" class="productName" id="pID" placeholder="Produktnamn">
            <input type="text" name="antal" class="amount" placeholder="Antal">
            <input type="text" name="hours" class="hours" placeholder="Timmar">
            <input type="text" name="price" class="price" placeholder="Pris" >
            <input type="text" name="total" class="vat" placeholder="Moms">
            <input type="text" name="total" class="sum" placeholder="Total">
            <a class="plus">+</a>
            <a class="minus">-</a>
        `)
    })
    }
}






// Chose from the list and generate the right details
function getCustomerDetails(){

    let customerList = document.querySelector(".customerList");

    customerList.addEventListener("change", function (){
        
        console.log(customerList.value)

        for (let customer of customers){

            if ( customerList.value == customer.id ){
                let detailField = document.querySelector("#customerDetails");
                let cInfo = document.querySelector(".customerInfo")

                if (cInfo != null){ cInfo.remove() }
                detailField.insertAdjacentHTML("afterend", `<div class="customerInfo"><h2>${customer.name}</h2>
                
                <p>Name: ${customer.kontakt}</p>
                <p>Adress: ${customer.adress}</p>
                </div>`)
            }
        }
    })
}




populateCustomerList();
getCustomerDetails();
populateProductList();
setProductDetails();
addRow();