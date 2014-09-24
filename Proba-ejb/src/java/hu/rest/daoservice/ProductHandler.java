package hu.rest.daoservice;

import hu.rest.entity.Category;
import hu.rest.entity.Product;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author krommerb
 */

@Stateless
public class ProductHandler implements ProductHandlerLocal {

    
    
     
//    @Inject
//    CategoryHandlerLocal ch;
    
    @PersistenceContext
    EntityManager em;
        public ProductHandler() {
    }
    
    
    @Override
    public Product getProductById(String id) {
        return em.find(Product.class, Long.parseLong(id));
    }

//    @RolesAllowed("admin")
    @Override
    public List<Product> getProducts() {
        return em.createQuery("SELECT p FROM Product p", Product.class).getResultList(); // az entityben megadott @Table(name = "products")
    }

    @Override
    public List<Product> getProductsByCategory(int id) {
        return em.createNamedQuery(Product.QUERY_FIND_BY_CATEGORY_ID, Product.class)
                .setParameter("categoryId", id)
                .getResultList();
    }

    @Override
    public void updateProduct(Product product) {
        
        
        System.out.println("update: "+product);
        
        em.createQuery("UPDATE Product p SET p.name = :name, "
                + "p.description = :description, " 
                + "p.price = :price "
                + "WHERE p.id = :id", Product.class).
                setParameter("id", product.getId()).setParameter("name", product.getName()).
                setParameter("description", product.getDescription()).setParameter("price", product.getPrice())
                .executeUpdate();
      
     }
    
    
    @Override
    public void deleteProduct(Integer id){
        
        em.createQuery("DELETE FROM Product p WHERE p.id = :id", Product.class).
                setParameter("id", id).executeUpdate();
        
    }
    
    @Override
   public void addNewProduct(Product product,Integer catid){

        System.out.println(product+""+catid);
//           Category cat =  ch.getCategoryById(catid.longValue());
//           product.setCategory(cat);
//           em.persist(product);
   }
   
}
