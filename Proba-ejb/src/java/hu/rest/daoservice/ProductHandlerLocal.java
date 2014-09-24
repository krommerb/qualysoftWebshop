package hu.rest.daoservice;

import hu.rest.entity.Product;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author krommerb
 */


@Local
public interface ProductHandlerLocal {
    
    Product getProductById(String id);
    
    List<Product> getProducts();
    
    List<Product> getProductsByCategory(int id);
        
    void updateProduct(Product p);
    void deleteProduct(Integer id);
    void addNewProduct(Product product,Integer catid);


}
