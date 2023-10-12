package uneversalgroup.uneversal.projection;

import org.springframework.data.rest.core.config.Projection;
import uneversalgroup.uneversal.entity.Category;

@Projection(name = "customCategory", types = Category.class)
public interface CustomCategory {
    Integer getId();

    String getName();
}
