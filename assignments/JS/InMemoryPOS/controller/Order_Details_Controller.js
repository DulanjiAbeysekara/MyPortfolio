$('#customerIdTxtOrderPage').val(CustomerDetails[0].cid);
$('#customerNameTxtOrderPage').val(CustomerDetails[0].cname);
$('#customerAddressTxtOrderPage').val(CustomerDetails[0].caddress);
$('#customerSalaryTxtOrderPage').val(CustomerDetails[0].csalary);
$('#itemCodeTxtOrderPage').val(ItemDetails[0].itemId);
$('#itemNameTxtOrderPage').val(ItemDetails[0].itemName);
$('#unitePriceTxtOrderPage').val(ItemDetails[0].price);
$('#itemQtyTxtOrderPage').val(ItemDetails[0].qty);


let totalFinal = 0;


function loadCusIds() {
    var optionCus = '';
    for (var i = 0; i < CustomerDetails.length; i++) {
        optionCus += '<option value="' + CustomerDetails[i].cid + '">' + CustomerDetails[i].cid + '</option>';
    }
    $('#customerIdOrder').append(optionCus);
}

function loadItemIds() {
    var optionItem = '';
    for (var i = 0; i < ItemDetails.length; i++) {
        optionItem += '<option value="' + ItemDetails[i].itemId + '">' + ItemDetails[i].itemId + '</option>';
    }
    $('#itemOrder').append(optionItem);
}

// function balance() {
//     if(orderTotal.value <= cashTxtOrderPage.value){
//         alert("same")
//     }else{
//         alert("enough money")
//     }
// }

function generateOrderId(){
    if(orderDetails.length == 0){
        $('#orderIDTxtOrderPage').val(1);
    }else{
        $('#orderIDTxtOrderPage').val(orderDetails.length + 2);
    }
}

$('#customerIdOrder').change(function(){

    for (let i=0; i < CustomerDetails.length; i++){
        if ($(this).val() == CustomerDetails[i].cid){
            $('#customerIdTxtOrderPage').val(CustomerDetails[i].cid);
            $('#customerNameTxtOrderPage').val(CustomerDetails[i].cname);
            $('#customerAddressTxtOrderPage').val(CustomerDetails[i].caddress);
            $('#customerSalaryTxtOrderPage').val(CustomerDetails[i].csalary);
            break;
        }
    }
});

$('#itemOrder').change(function(){

    for (let i=0; i < ItemDetails.length; i++){
        if ($(this).val() == ItemDetails[i].itemId){
            $('#itemCodeTxtOrderPage').val(ItemDetails[i].itemId);
            $('#itemNameTxtOrderPage').val(ItemDetails[i].itemName);
            $('#unitePriceTxtOrderPage').val(ItemDetails[i].price);
            $('#itemQtyTxtOrderPage').val(ItemDetails[i].qty);
            break;
        }
    }
});

$('#btnAddItemOrder').click(function (){
    var code = $('#itemOrder').val();
    var name = $('#itemNameTxtOrderPage').val();
    var qty = $('#itemOrderQtyOrderTxtOrderPage').val();
    var total = parseInt($('#itemOrderQtyOrderTxtOrderPage').val()) * parseInt($('#unitePriceTxtOrderPage').val());


    let tr=$('<tr> <td>'+code+'</td> <td>'+name+'</td> <td>'+qty+'</td> <td>'+total+'</td></tr>');
    $("#tblItemBodyOrderPage").append(tr);

    totalFinal = totalFinal + total;

    $('#orderTotal').text(totalFinal);

    for(let i = 0; i < ItemDetails.length; i++){
        if(itemDetails[i].itemId == code){
            itemDetails[i].qty = parseInt(ItemDetails[i].qty) - parseInt(qty);
            $('#itemQtyTxtOrderPage').val(ItemDetails[i].qty);
            break;
        }
    }

    $('#itemOrderQtyOrderTxtOrderPage').val("");

});

$("#discountTxtOrderPage").keydown(function (e){
    if(e.keyCode == 13) {
        $('#orderSubTotal').text(totalFinal - parseInt($("#discountTxtOrderPage").val()));
    }
});


$("#cashTxtOrderPage").keydown(function (e){
    if(e.keyCode == 13) {
        $('#balanceTxtOrderPage').val(parseInt($("#cashTxtOrderPage").val()) - parseInt($('#orderSubTotal').text()));
    }
});

$('#btnPlaceOrder').click(function (){

    let totl =parseFloat( $('#orderTotal').text());
    let cash =parseFloat( $('#cashTxtOrderPage').val());
    console.log(totl,cash);
    let result = cash-totl;
    console.log(result);
    $('#balanceTxtOrderPage').val(result);

    var orderId = $('#orderIDTxtOrderPage').val();
    var customerId = $('#customerIdOrder').val();
    var total = $('#orderSubTotal').text();
    var date = $('#dateTxtOrderPage').val();

    totl = 0;


    order = {
        orderId : orderId,
        customerId : customerId,
        total : total,
        date : date
    }

    orderDetails.push(order);

    $('#tblItemBodyOrderPage tr').remove();

    /* $('#orderTotal').text("0");
     $('#orderSubTotal').text("0");
     $('#cashTxtOrderPage').val("");
     $('#discountTxtOrderPage').val("");
     $('#balanceTxtOrderPage').val("");*/



});