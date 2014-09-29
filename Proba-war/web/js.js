$(document).ready(function(){
    
    window.fh = new frontHandler();

});


function frontHandler (){
    
    this.init();
}

frontHandler.prototype.init = function(){
        
        var _this = this;
        _this.id = null;
        // _this.data = new Array();

        _this.baseURL = "/Proba-war/app/";              // a backend root URL-je
        _this.getCategories();

        var cat =  $('#category_select');
        cat.change(function(){                        //ha új kategóriát választott

           _this.getProductsByCategoryID( $('#category_select :selected').val() ); // ez a termékkategória id-je

         });

         $('#update_button').click(function(){

            _this.update();

        });

         $('.dismiss_button').click(function(){

             $("body").off('mousewheel');
             $.unblockUI();

        });

          $('#delete_button').click(function(){

            _this.delete();

        });

          $('#newproduct_button').click(function(){

            _this.newProduct();

        });


         $("#add_new_product_button").click(function(){

          _this.addNewProduct()

        });
}

frontHandler.prototype.getCategories = function(){   // lekéri a kategórialistát

    var _this = this;
    function callback (response){
             
         _this.buildCategories(response);

    };
    _this.ajax("category/", callback)
}

frontHandler.prototype.buildCategories = function(response){ 

/*
    megépíti a selectet az aktuális kategóriák alapján
*/

    var options = '<option value="0">All instruments</option>';
    for (i = 0; i<response.length;i++)   {

         options +='<option value="'+response[i].id+'">'+response[i].name+'</option>'

    }
     $('.category_select').html(options);             //minden ilyen osztályú selectbe beteszi
     $('.category_select').trigger('change');         //hogy az oldal betöltése után rögtön listázzon
}


frontHandler.prototype.delete = function(){            // törli a terméket az id alapján

   var _this = this;
   var id = _this.id.substr(2, _this.id.length-2);

   $.ajax({
            type: "DELETE",
            url: _this.baseURL+"product/"+id, 
            dataType: 'JSON',
            success:   function(){
                $("body").off('mousewheel');                        // visszakapcsoljuk a szkrollt
                $.growlUI('Product deleted!');                      // msg megjelenítése
               _this.ajax("product/",  _this.buildTable);         // összes termék listázása/táblázat frissítése
            }
    });
};

frontHandler.prototype.getProductsByCategoryID = function(id){    //termékek lekérése a kategóriaId alapján

      var _this = this;
      if (id=="0"){
        _this.ajax("product/",  _this.buildTable);         // összes termék listázása
      } 
      else
      {
        _this.ajax("category/"+id+"/product",  _this.buildTable);
      }

}

frontHandler.prototype.ajax = function (relURL, callback){

   var _this = this;
   $.ajax({
            type: "GET",
            url: _this.baseURL+relURL, 
            dataType: 'JSON',
            success:   callback
    });
 };


frontHandler.prototype.update = function(){             // product frissítése

   var _this = this;
   var id = _this.id.substr(2, _this.id.length-2);    // aktuális termék id-je
   var input=$('#product_table input');
   data = {};                                           //JSON felrakása
   data['id'] = id;
   data['name'] = input.eq(0).val();
   data['description'] = input.eq(1).val();
   data['price'] = input.eq(2).val();
   catId = $('#product_table select :selected').val();
   category = {id : catId};                               // kategóriaID elhelyezése
   data['category']=category;

   $.ajax({
          type: "PUT",
          url: _this.baseURL+"product",               
          dataType: 'JSON',
          data: JSON.stringify(data),
          contentType: "application/json",
          success:   function(){
     
            $("body").off('mousewheel');                        // visszakapcsoljuk a szkrollt
            $.growlUI('Product updated!');                      // msg megjelenítése
             _this.ajax("product/",  _this.buildTable);         // összes termék listázása/táblázat frissítése
          }
  });
}

frontHandler.prototype.buildTable = function (response){      //táblázat megépítése

   var _this = this;
   var res_div =   $("#results");
   var $table = $('#results_table');
   $('#results_table > tbody').html('');                    // kinullázzuk a táblázatot

   for (i = 0; i<response.length;i++)     {
     
          var $row = $('<tr id="P_'+response[i].id+'"></tr>');
          $row.click(function(){
           
            var id = $(this).attr('id');
            fh.id=id;                                             //osztályszinten tároljuk az aktuális product id-jét
            var data=new Array();
            for (j=0;j<=$(this).children().length;j++){            // végigiterálunk a td elemeken
                
                  data[j]=$(this).children().eq(j).text() 
             }
             fh.editProduct(id, data, $(this).children("td[id=category]").attr("catid") );
          });
                 $row.append('<td id="name">'+response[i].name+'</td><td id="description">'+response[i].description+
                              '</td><td id="price">'+response[i].price+'</td><td id="category" catid="'+response[i].category.id+'">'+response[i].category.name+'</td>');
                 $table.append($row);
           }
          res_div.show();
}

frontHandler.prototype.editProduct = function (id, data, catid){          // termék adatainak szerkesztése

  $("body").on('mousewheel', function(){
      return false;
  });

  var input=$('#product input');
  for (i=0;i<input.length;i++){                           // végigiterálunk az input elemeken, kategóriát kihagyjuk
        input.eq(i).val(data[i]);
    }

     $.blockUI({                                        //modális ablak megjelenítése
        message: $('#product'), 
        css: { top: '10%',
               height : "400px",
               width : '80%',
               margin : '0px',
               left : '10%'
           } 
    }); 


     $("#product select option").filter(function(){                   // AZ "all instruments" opció eltüntetése
          return $(this).val()=="0";
                                       }).remove()

    $("#product select option").eq(catid-1).attr('selected','selected');  // az eredeti kategória legyen kiválasztva
}
       
/*

  NEW PRODUCT

*/


frontHandler.prototype.newProduct = function(){     

  var _this = this;

  $("body").on('mousewheel', function(){
      return false;
  });

  $("#new_product_wrapper select option").filter(function(){          // AZ "all instruments" opció eltüntetése
    return $(this).val()=="0";
                                 }).remove()

 $.blockUI({                                    //modális ablak
              message: $('#new_product_div'), 
              css: { top: '10%',
                     height : "400px",
                     width : '80%',
                     margin : '0px',
                     left : '10%'
                 } 
          });

 $("#new_product_wrapper input").val("");
 $("#new_product_wrapper textarea").val("");
}

frontHandler.prototype.addNewProduct = function(){           // új product adatainak küldése

  var _this = this;
  var input=$('#new_product_wrapper input');
   data = {};
   data['name'] = input.eq(0).val();
   data['price'] = input.eq(1).val();
   catid= $("#new_product_wrapper select :selected").val();
   data['description'] = $('#new_product_wrapper textarea').val();
   cat = {id : catid};
   data['category'] = cat;

   $.ajax({
          type: "POST",
          url: _this.baseURL+"product",             
          dataType: 'JSON',
          data: JSON.stringify(data),
          contentType: "application/json",
          success:   function(){
            
            $("body").off('mousewheel');                          // visszakapcsoljuk a szkrollt
            $.growlUI('Product added!');                         // msg megjelenítése
             _this.ajax("product/",  _this.buildTable);         // összes termék listázása/táblázat frissítése

          }
  });
}