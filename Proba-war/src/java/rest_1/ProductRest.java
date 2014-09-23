package rest_1;

import hu.rest.daoservice.ProductHandlerLocal;
import hu.rest.entity.Category;
import hu.rest.entity.Product;
import java.util.ArrayList;
import java.util.List;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("")
@RequestScoped 
public class ProductRest{

    
    @Inject 
    ProductHandlerLocal ph;
    
    public ProductRest() {
    }   
 
    @GET
    @Produces("application/json; charset=UTF-8")
    @Path("product/{id}")
    
    /*
    
    pl: http://localhost:16203/Proba-war/app/product/1
    */
    public List<Product> getProductById (@PathParam("id") String id) {
        
        
     
       if (id == null) return getAllProducts();
      
       try {
           Long l = Long.parseLong(id);
       }
       catch(NumberFormatException e){
           
           return null;
       }
      
       
       Product p = ph.getProductById(id);
       
       
       if (p != null){
           
           ArrayList a = new ArrayList();
           a.add(p);
           return a;
                   
       }
       else return null;
    }
   
   @GET
   @Path("/product")
    
   /*
   
   http://localhost:16203/Proba-war/app/product
   */

   public List<Product> getAllProducts() {
      
         return ph.getProducts();
    }
   
   @GET
   @Path("category/{id}/product")
   @Produces("application/json; charset=UTF-8")

   
   /*
   
   pl: http://localhost:16203/Proba-war/app/category/1/product
   
   */
   public List<Product> getProductsByCategory(@PathParam ("id") int id){
                  return ph.getProductsByCategory(id);

   }

//   @POST
//   @Path("/product/form")
//   @Consumes("application/x-www-form-urlencoded")
//
//   public void addNewProduct(MultivaluedMap<String, String> params){
//       System.out.println("POSTBAN");
//      Map<String,String> parameters = new HashMap<>();
//
//   Iterator<String> it = params.keySet().iterator();
//
//
//         while(it.hasNext()){
//           String key = (String)it.next();
//           parameters.put(key,params.getFirst(key) );
//       
//             System.out.println("Key:" + key+ "  Value:"+parameters.get(key) );
//         }
//       
//       
//   }
   
   
 @POST
 @Path("/product")
 public void addNewProduct(@FormParam("categories") String cat,
                           @FormParam("description") String des,
                           @FormParam("name") String name) {
     
     System.out.println("POST" );
     System.out.println("name :"+ name);
     System.out.println("category :"+ cat);
     System.out.println("description :"+ des);
     /*
        validálás és adatbázisba feltöltés
     */

     
     // És aztán mi történik? Nem tölt újra az oldal, hogyan adok  visszajelzést a sikeres feltöltésről?
     
 
 
 
 }
 
//  @PUT
// @Consumes("application/json; charset=UTF-8")
//  @Path("product/{id}/{name}/{description}/{price}")
//  public void updateProduct(@PathParam("id") Integer id,
//                            @PathParam("name") String name,
//                            @PathParam("description") String description,
//                            @PathParam("price") String price){
//
//        System.out.println("PUT"+id+name+description+price );
//      
//     //     ph.updateProduct(id, name);
//  }
   
  
@PUT
@Consumes(MediaType.APPLICATION_JSON)
@Path("product/{id}")  // igazából fölösleges az id path, mert a JSON-nal együtt jön
public void updateProduct (Product product){
      
      ph.updateProduct(product);
  
  }
}