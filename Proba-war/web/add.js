$(document).ready(function(){
    
    window.fh = new frontHandler();

});

function frontHandler (){
    this.init();
}

frontHandler.prototype.init = function(){
        
        var _this = this;
        _this.baseURL = "/Proba-war/app/product/";              // ezen a REST POST  URL-je
        
        
        $("input[name=add]").click(function(){
           
         var name = $('input[name=name]').val();
         var cat = $('select[name=categories] :selected').val();
         var desc = $('textarea[name=description]').val();
         
         if (name == "" || desc ==""){
             
             alert("You have to fill all fields!");
             return false;
         }
         
         if (cat != "cy" && cat !="hp" && cat !="dk"){
             
             alert("Please provide a valid category!");
             return false;
         }

        console.log(name, cat, desc);
        
        
        var newProduct = {'name': name ,
                          'categories' : cat,
                          'description' : desc};
                      
       // _this.ajax(newProduct);
        
        });
        
     
        
//        $("form > input[type=text]").keypress(function(e){
//            if( e.keyCode == 13) {
//                   e.preventDefault();
//                   $("#send").trigger("click");
//            }
//        });
        
}

frontHandler.prototype.ajax = function (data){

   var _this = this;
   $.ajax({
            type: "POST",
            url: _this.baseURL,
            data : data,
            dataType: 'JSON',
            success: function(response){ 
               console.log("post succeded"+response);
            }
    });
 };