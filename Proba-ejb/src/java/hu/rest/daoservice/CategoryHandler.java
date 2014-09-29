package hu.rest.daoservice;

import hu.rest.entity.Category;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author krommerb
 */


@Stateless
public class CategoryHandler implements CategoryHandlerLocal {
    
    @PersistenceContext
    EntityManager em;
    
    @Override
    //@RolesAllowed("admin")
    public List<Category> getCategories() {
        return em.createQuery("SELECT c FROM categories c", Category.class).getResultList();
    }

    @Override
    public Category getCategoryById(Long id) {
        return em.find(Category.class, id);
     }
}