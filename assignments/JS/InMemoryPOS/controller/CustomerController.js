getAllCustomers();



$("#btnsaveCust").click(function () {
    if (checkAll()){
        saveCustomer();
    }else{
        alert("Error");
    }

});


$("#btnGetAllCust").click(function (){
    getAllCustomers();
});


function bindTrEvents(){
    $('#btnsaveCust>tr').click(function (){

        let id=$(this).children.eq(0).text();
        let name=$(this).children.eq(1).text();
        let address=$(this).children.eq(2).text();
        let number=$(this).children.eq(3).text();


        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerNumber').val(number);

    })
}

$("#btnDltCust").click(function (){
    let id=$("#txtCustomerID").val();

    let consent=confirm("Do you want to delete?");

    if (consent){
        let response=deleteCustomer(id);

    if (response){
        alert(" Customer Deleted");

        getAllCustomers();

    }else{
        alert("Customer Not Removed!")

        }
    }
})

$("#btnUpdtCust").click(function (){
    let id=$("#txtCustomerID").val();
    updateCustomer();

});


function saveCustomer(){
    let customerId=$("#txtCustomerID").val();

    if(searchCustomer(customerId.trim()) == undefined){


        let customerName=$("#txtCustomerName").val();
        let customerAddress=$("#txtCustomerAddress").val();
        let customerNumber=$("#txtCustomerNumber").val();


        let newCustomer=Object.assign({},customer);

        newCustomer.id=customerId;
        newCustomer.id=customerName;
        newCustomer.id=customerAddress;
        newCustomer.id=customerNumber;

        customerDB.push(newCustomer);
        // clearCustomerInputFields();
    }

}

function getAllCustomers() {

    $("#tblCustomer").empty();

    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let num = customerDB[i].contact;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${address}</td>
                     <td>${num}</td>
                    </tr>`;

        $("#tblCustomer").append(row);


        bindTrEvents();
    }
}
function deleteCustomer (id) {
    for (let i=0; i<customerDB.length; i++){

        if (customerDB[i].id == id){
            customerDB.splice(i,1);
            return true;
        }

    }
            return  false;
}

function searchCustomer(id){
    return customerDB.find(function (customer){
        return customer.id == id;

    });
}

function updateCustomer(id){
    if (searchCustomer(id) == undefined){
        alert("No such customer.Please check the Id.");
    }else{
        let  consent=confirm("Do you really want to update this customer?");

        if (consent){
            let customer=searchCustomer(id);

            let customerName=$("#txtCustomerName").val();
            let customerAdress=$("#txtCustomerAddress").val();
            let customerNumber=$("#txtCustomerNumber").val();

            customer.name=customerName;
            customer.name=customerAdress;
            customer.name=customerNumber;

            getAllCustomers();

        }
    }

}