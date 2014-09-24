$(document).ready(function(){
    
    window.fh = new frontHandler();



});


function frontHandler (){
    
    this.init();
}


frontHandler.prototype.getCategories = function(){

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
     $('.category_select').html(options);
     $('.category_select').trigger('change');         //hogy az oldal betöltése után rögtön listázzon


}



frontHandler.prototype.init = function(){
        
        var _this = this;

        _this.id = null;
        _this.data = new Array();

        _this.baseURL = "/Proba-war/app/";              // ezen a backend root URL-je
        _this.getCategories();

        var cat =  $('#category_select');
        cat.change(function(){                    //ha új kategóriát választott

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


       $("#add_new_product_button").click(function(){_this.addNewProduct()})




}

frontHandler.prototype.delete = function(){

   var _this = this;
 
   var id = _this.id.substr(2, _this.id.length-2);

   console.log("delete:" +_this.id);
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



frontHandler.prototype.getProductsByCategoryID = function(id){

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



frontHandler.prototype.update = function(){


  var _this = this;
 
   var id = _this.id.substr(2, _this.id.length-2);

  // console.log(JSON.stringify(_this.data))

  // data = _this.data;
  // console.log(data.category);
 


     var input=$('#product_table input');
     data = {};
     data['id'] = id;

     data['name'] = input.eq(0).val();
     data['description'] = input.eq(1).val();
     data['price'] = input.eq(2).val();


     $.ajax({
            type: "PUT",
            url: _this.baseURL+"product/"+id,  // az id-t is átküldjük a JSON-ban...
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

frontHandler.prototype.buildTable = function (response){

    var _this = this;
    if (response == null){

    //      // _this.results = response;                        // osztályszinten tároljuk az aktuális eredményeket a frissítéshez

    //             // alert("Wrong Id");
    //             // return false;

    //          return false; // ha    
    }

     var res_div =   $("#results");
     var $table = $('#results_table');
     $('#results_table > tbody').html('');        // kinullázzuk a sorokat

     for (i = 0; i<response.length;i++)     {
       
       var $row = $('<tr id="P_'+response[i].id+'"></tr>');


      $row.click(function(){

            var id = $(this).attr('id');
            fh.id=id;
            var data=new Array();
            // data[0]=$(this).attr('id');
       

             for (j=0;j<=$(this).children().length;j++){
                 // végigiterálunk a td elemeken
                  data[j]=$(this).children().eq(j).text() 
              }
            // var data1 = [];
            // var data2 = [];

            // var prod = {};               // json inicializálása

            // for (j=0;j<$(this).children().length;j++){
            //     index = $(this).children().eq(j).attr("id");
                
            //     prod[index] = $(this).children().eq(j).text();
            //     data2[j]=  prod[index] ;

            //   }

          //  data1.push(prod)

            // console.log(prod);
           // console.log(data);

            //  fh.data = prod; 

             editProduct(id, data);
      });
                 $row.append('<td id="name">'+response[i].name+'</td><td id="description">'+response[i].description+
                              '</td><td id="price">'+response[i].price+'</td><td id="category">'+response[i].category.name+'</td>');
                 $table.append($row);
             }
            res_div.show();
}


function editProduct(id, data){

        

  $("body").on('mousewheel', function(){
      return false;
  });



        var input=$('#product input');
        for (i=0;i<input.length;i++){             // végigiterálunk az input elemeken
              input.eq(i).attr("value", data[i]).val(data[i])
          }

        //  $('#update_button').data('productId', data[0]);  // belerakjuk az id-t

           $.blockUI({                                    //modális ablak
              message: $('#product'), 
              css: { top: '10%',
                     height : "400px",
                     width : '80%',
                     margin : '0px',
                     left : '10%'
                 } 
          }); 
}

       
/*

  NEW PRODUCT


*/



frontHandler.prototype.newProduct = function(){


  // console.log("new prod");
  var _this = this;


  $("body").on('mousewheel', function(){
      return false;
  });

 $.blockUI({                                    //modális ablak
              message: $('#new_product_div'), 
              css: { top: '10%',
                     height : "400px",
                     width : '80%',
                     margin : '0px',
                     left : '10%'
                 } 
          }); 

}

frontHandler.prototype.addNewProduct = function(){

  console.log("add")

    var _this = this;

    var input=$('#new_product_wrapper input');
     data = {};
     //data['id'] = id;

     data['name'] = input.eq(0).val();
     data['price'] = input.eq(1).val();
     catid= $("#new_product_wrapper select :selected").val();
     
     data['description'] = $('#new_product_wrapper textarea').val();

     //data['price'] = input.eq(2).val();

     console.log(data);


     $.ajax({
            type: "POST",
            url: _this.baseURL+"product/"+catid,          // az id-t is átküldjük a JSON-ban...
            dataType: 'JSON',
            data: JSON.stringify(data),
            contentType: "application/json",
            success:   function(){
              
              $("body").off('mousewheel');                        // visszakapcsoljuk a szkrollt
              $.growlUI('Product added!');                      // msg megjelenítése
               _this.ajax("product/",  _this.buildTable);         // összes termék listázása/táblázat frissítése

            }
    });
}