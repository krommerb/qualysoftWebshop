package rest_1;

import hu.rest.daoservice.CategoryHandlerLocal;
import hu.rest.entity.Category;
import java.util.List;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author krommerb
 * 
 */

@Path("")
@RequestScoped 
public class CategoryRest {
    
    @Inject
    CategoryHandlerLocal ch;
    
    @GET
    @Path("/category")
    
    @Produces("application/json; charset=UTF-8")
    public List<Category> getCategories(){
        return ch.getCategories();
    }
    
    @GET
    @Path("/category/{id}")
    @Produces("application/json; charset=UTF-8")
    public Category getCategory(@PathParam ("id") Long id ){
         return ch.getCategoryById(id);
    }
}
