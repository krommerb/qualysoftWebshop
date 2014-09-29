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
    
    Product getProductById(Long id);
    List<Product> getProducts();
    List<Product> getProductsByCategory(Long id);
    void updateProduct(Product p);
    void deleteProduct(Long id);
    void addNewProduct(Product product);
}
