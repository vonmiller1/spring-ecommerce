package com.lucode.be_ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.lucode.be_ecommerce.entity.Category;
import com.lucode.be_ecommerce.entity.Product;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {

    private final EntityManager entityManager;

    public RestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

     // Override method to configure repository REST settings
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        // Call the parent method
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        // Define the HTTP methods that are not supported (disabled)
        HttpMethod[] unsupportedAction = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // Disable for Product API
        config.getExposureConfiguration()
            .forDomainType(Product.class)
            .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedAction))
            .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedAction));

        // Disable for Category API
        config.getExposureConfiguration()
            .forDomainType(Category.class)
            .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedAction))
            .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedAction));


        cors.addMapping("/api/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods(HttpMethod.GET.name(), HttpMethod.OPTIONS.name())
            .allowedHeaders("*");

        exposeIds(config);
    }

    // Method to expose the IDs of entities in the API responses
    private void exposeIds(RepositoryRestConfiguration config){

        // Get all entities managed by the EntityManager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // Create a list to hold the entity classes
        List<Class<?>> entityClasses = new ArrayList<>();

        for (EntityType<?> entityType : entities) {
            entityClasses.add(entityType.getJavaType());
        }

        Class<?>[] domainTypes = entityClasses.toArray(Class[]::new);

        // Expose the IDs for the specified domain types
        config.exposeIdsFor(domainTypes);
    }

    

}
