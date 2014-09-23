package hu.rest.daoservice;

import hu.rest.entity.Product;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author krommerb
 */

@Stateless
public class ProductHandler implements ProductHandlerLocal {

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
    
    
}
