let totals = []

let sendList = []

let additionalsList = []


function menuAdd(){

    let b = document.querySelector("body");

    b.insertAdjacentHTML("afterbegin",` <header class="flex-container"> <h1>EcoS - Fakturasystem</h1> <!--- <a href="/">Skapa Faktura</a><a href="/customers.html">Kunder</a><a href="/products.html">Produkter</a><a href="reports.html">Rapporter</a> ---></header> `)


}


function populateCustomerList(){
    
    for (customer of customers){

        document.querySelector(".customerList").insertAdjacentHTML("beforeend", `<option value="${customer.id}" >${customer.id}: ${customer.name}</option>`)

    }
}

// productlist-function for future release

function populateProductList(){

    let productList = document.querySelector(".productList");

    for (product of products){
        productList.insertAdjacentHTML("beforeend",`<option value="${product.id}" class="choices" >${product.productName}</option>`)
    }

}



// Not done. Product detail function, auto load
function setProductDetails(){

    let lists = document.querySelectorAll(".productList")
    let choices = document.querySelectorAll(".choices")


    for (let list of lists){

        list.addEventListener("change", ()=>{

            for (let choice of choices){

                console.log(choice.attributes.id)
        
            }

            let index = list.selectedIndex-1
            console.log(index)




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

function addRow(){

    let rows = document.querySelectorAll(".plusDiv")

        for (let row of rows){

            row.insertAdjacentHTML("beforeend",`
        
            <div class="plusDiv">
             <input type="text" name="productName" class="productName" id="pID" placeholder="Produktnamn">
             <input type="text" name="antal" class="amount" placeholder="Antal">
             <input type="text" name="hours" class="hours" placeholder="Timmar">
             <input type="text" name="price" class="price" placeholder="Pris" >
             <select>
                 <option value="VAT">Moms</option>
                 <option value="0.25">25%</option>
                 <option value="0.12">12%</option>
                 <option value="0.06">6%</option>
             </select>
              <input type="text" name="total" class="sum" placeholder="Total">
              <a class="plus">+</a>
              <a class="minus">-</a></div>

        `)
        break
    }
}



function deleteRow() {

    
    $(document).on("click",".minus", ()=>{

        let elem = $(event.target)
        elem.parent().remove()
    })


}



function clickFunctionality() {
    
    $(document).on('click',".plus", function(){
        addRow();
    })

    deleteRow()

}


function getProductDetails(){

    let allProducts = $(".plusDiv").toArray()

    
    for (let product of allProducts){

        let productId = product.children[0].value
        let amount = product.children[1].value
        let hours = product.children[2].value
        let price = product.children[3].value
        let VAT = product.children[4].value
        let sum = product.children[5].value

        let obj = { 
            productId: productId,
            amount: amount,
            hours: hours,
            price: price,
            VAT: VAT,
            sum: sum
         }

        sendList.push(obj)

    }
    
    let comment = $("#comments").val()
    let payDay = $("#payTime").val()

    let additional = { comment: comment, payDay: payDay }
    additionalsList.push(additional)

}



function getAllCustomerDetails() {

    let customerName = $("#customerName").val()
    let customerContact = $("#customerContactName").val()
    let customerAddress = $("#customerStreetAddress").val()
    let zipCode = $("#zip").val()
    let city = $("#customerCity").val()
    let customerId = $("#customerId").val()
    let betalningsvillkor = $("#payTime").val()

    customerDetails = {
        customerName: customerName,
        customerContact: customerContact,
        customerAddress: customerAddress,
        zip: zipCode,
        city: city,
        customerId: customerId,
        betalningsvillkor: betalningsvillkor
    }
    sendList.push(customerDetails)

}


function invoiceClick(){

    getAllCustomerDetails();
    getProductDetails();
    
    make_pdf()
    resetFields()

}



function resetFields() {

    /*
    // Reset fields
    $("#customerName").val("")
    $("#customerContactName").val("")
    $("#customerStreetAddress").val("")
    $("#zip").val("")
    $("#customerCity").val("")
    $("#customerId").val("")
    $(".productName").val("")
    $(".amount").val("")
    $(".hours").val("")
    $(".price").val("")
    $(".sum").val("")
    $("#comments").val("")
    $("#payTime").val("")
*/
    sendList = []

}

async function getOwnerData() {
    await fetch("/data").then(response => response.json()).then(data => companyDetails = data.owner)
    return companyDetails
}



menuAdd();
clickFunctionality();
getOwnerData();

// Grattis på 60-årsdagen pappa!