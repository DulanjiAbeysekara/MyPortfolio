var btnSave=$("#saveitem");
var btnRemove=$("#deleteitem");
var btnGetAll=$("#getitem");
var btnUpdate=$("#updateitem");


getAll();

$("#itemIdText","#itemNameText","#itemQtyText","#itemPriceText").keydown(function (e){
    if (e.key=="Tab"){
        e.preventDefault();
    }
});

$("#itemIdText").keyup(function (e){
    if(regexItemCode.test($("#itemIdText").val())){
        $("#itemIdText").css("border-color",  "transparent");
    }else{
        $("#itemIdText").css("border-color",  "red");
    }
});

$("#itemIdText").keydown(function (e){
    if(e.keyCode == 13 && regexItemCode.test($("#itemIdText").val())) {
        $("#itemNameText").focus();
    }
});



$("#itemNameText").keyup(function (e){
    if(regexItemName.test($("#itemNameText").val())){
        $("#itemNameText").css("border-color",  "transparent");
    }else{
        $("#itemNameText").css("border-color",  "red");
    }
});

$("#itemQtyText").keyup(function (e){
    if(regexItemQty.test($("#itemQtyText").val())){
        $("#itemQtyText").css("border-color",  "transparent");
    }else{
        $("#itemQtyText").css("border-color",  "red");
    }
});

$("#itemQtyText").keydown(function (e){
    if(e.keyCode == 13 && regexItemQty.test($("#itemQtyText").val())){
        save();
    }
});


$("#itemPriceText").keyup(function (e){
    if(regexItemUnitePrice.test($("#itemPriceText").val())){
        $("#itemPriceText").css("border-color",  "transparent");
    }else{
        $("#itemPriceText").css("border-color",  "red");
    }
});

$("#itemPriceText").keydown(function (e){
    if(e.keyCode == 13 && regexItemUnitePrice.test($("#itemPriceText").val())){
        $("#itemPriceText").focus();
    }
});




function save(){

    if(regexItemCode.test($("#itemIdText").val()) && regexItemName.test($("#itemNameText").val()) && regexItemQty.test($("#itemQtyText").val()) && regexItemUnitePrice.test($("#itemPriceText").val())){
        var is = false;

        for(let i = 0; i < ItemDetails.length; i++){
            if(ItemDetails[i].cid == $("#itemIdText").val()){
                is = true;
            }
        }

        if(is == false){

            var tblBody = $("#tblBodyItem");

            var id = $("#itemIdText").val();
            var name = $("#itemNameText").val();
            var qty = $("#itemQtyText").val();
            var price = $("#itemPriceText").val();

            item = {
                itemId : id,
                itemName : name,
                qty : qty,
                price : price
            }

            ItemDetails.push(item);

            let tr=$('<tr> <td>'+ItemDetails[ItemDetails.length-1].itemId+'</td> <td>'+ItemDetails[ItemDetails.length-1].itemName+'</td> <td>'+ItemDetails[ItemDetails.length-1].qty+'</td> <td>'+ItemDetails[ItemDetails.length-1].price+'</td></tr>');
            $("#tblBodyItem").append(tr);

        }else{
            alert("item ID Already Used")
        }
    }


    $("#tblBodyItem>tr").click(function (e){

        $("#itemIdText").val($(this).children().eq(0).text());
        $("#itemNameText").val($(this).children().eq(1).text());
        $("#itemQtyText").val($(this).children().eq(2).text());
        $("#itemPriceText").val($(this).children().eq(3).text());

    });

}

btnSave.click(function(){

    save();
    clearFields();
    getAll();

});


function getAll(){

    $('#tblBodyItem').empty();

    for(var i = 0; i < ItemDetails.length; i++){

        var id = ItemDetails[i].itemId;
        var name = ItemDetails[i].itemName;
        var qty = ItemDetails[i].qty;
        var price = ItemDetails[i].price;

        let row = `<tr><td>${id}</td><td>${name}</td><td>${qty}</td><td>${price}</td></tr>`

        $('#tblBodyItem').append(row);

    }
    bindEvents();
}


btnGetAll.click(function (){

    getAll();

});


btnRemove.click(function(event){

    var id = $("#itemIdText").val();

    for(var i = 0; i <ItemDetails.length; i++){

        if(ItemDetails[i].itemId == id){
            ItemDetails.splice(i, 1);
            console.log(ItemDetails.length);
            getAll();
            clearFields();
            break;
        }

    }

});


btnUpdate.click(function(){

    var id = $("#itemIdText").val();
    var name = $("#itemNameText").val();
    var qty = $("#itemQtyText").val();
    var price = $("#itemPriceText").val();

    for(var i = 0; i < ItemDetails.length; i++){

        if(ItemDetails[i].itemId == id){

            ItemDetails[i].itemId = id;
            ItemDetails[i].itemName = name;
            ItemDetails[i].qty = qty;
            ItemDetails[i].price = price;


            getAll();
            clearFields();

            break;

        }

        if(i == ItemDetails.length - 1){
            alert("No")
        }

    }

    getAll();

});


function clearFields(){
    $("#itemIdText").val("");
    $("#itemNameText").val("");
    $("#itemQtyText").val("");
    $("#itemPriceText").val("");

    $("#itemIdText").focus();
}

bindEvents();


function bindEvents(){
    $('#tblBodyItem>tr').click(function () {
        // console.log(this);//tr -> this will return tr html element
        // console.log($(this));//jquery ob //if we want to access jQuery method we have to convert it to a jquery object
        // console.log($(this).text()); // now here it will return all the text of tr

        let id = $(this).children(':nth-child(1)').text();
        let name = $(this).children(':nth-child(2)').text();
        let qty = $(this).children(':nth-child(3)').text();
        let price = $(this).children(':nth-child(4)').text();

        setTextFieldValues(id,name,qty,price);
    });
}


function setTextFieldValues(id, name, qty, price) {
    $("#itemIdText").val(id);
    $("#itemNameText").val(name);
    $("#itemQtyText").val(qty);
    $("#itemPriceText").val(price);
}
