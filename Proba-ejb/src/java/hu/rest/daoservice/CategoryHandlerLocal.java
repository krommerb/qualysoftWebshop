package hu.rest.daoservice;

import hu.rest.entity.Category;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author krommerb
 */
@Local
public interface CategoryHandlerLocal {
    
    public List<Category> getCategories();
    public Category getCategoryById(Long id);

}
