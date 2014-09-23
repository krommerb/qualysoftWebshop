package hu.rest.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author krommerb
 */
//@Entity(name = "products")  // ekkor a products táblára mappeli az entityt (ez van az adatbázisban)
@Entity
@Table(name = "products")  // így viszont csak azt mondom meg neki, h. így hívjék a táblát
@NamedQueries  (
        {
           @NamedQuery(name = Product.QUERY_FIND_BY_CATEGORY_ID,
           query="SELECT p FROM Product p WHERE p.category.id = :categoryId")  // most a products táblanevet kell használni, mert arra van rámappelve
        })



public class Product implements Serializable {
    private static final long serialVersionUID = 1L;
    public static final String QUERY_FIND_BY_CATEGORY_ID = "product.queryByCategory";
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    
    private String description;
    
    
    @Column
    private int price;

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    
    @ManyToOne
    
    private Category category; // ezt miért nem lehet megváltoztatni pl cat-re? 

    // honnan tudja, hogy CATEGORY_ID oszlopot keressen a prod táblában?
//
//    public Category getCat() {
//        return cat;
//    }
//
//    public void setCat(Category cat) {
//        this.cat = cat;
//    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

 
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    
    
    @Override
    public String toString(){
      
        
        String back = this.id+this.name+this.description+this.price;
        
        return back;
        
    }
 }
