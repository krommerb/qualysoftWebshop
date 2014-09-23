 $(document).ready(function() { 
 
       

         $.blockUI({ 
            message: $('#tallContent'), 
            css: { top: '10%',
                   height : "500px",
                   width : '80%',
                   margin : '0px',
                   left : '10%'

               } 
        }); 
 

        $('#close').click(function(){

                $.unblockUI()

        })
       
  
 
    }); 