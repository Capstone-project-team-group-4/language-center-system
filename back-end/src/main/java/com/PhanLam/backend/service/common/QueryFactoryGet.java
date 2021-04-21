/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service.common;

// Import package members section:
import com.querydsl.jpa.impl.JPAQueryFactory;
import javax.persistence.EntityManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.SUPPORTS)
public class QueryFactoryGet {
    
    // Variables declaration:
    private EntityManager entityManager;

    public QueryFactoryGet (EntityManager entityManager){
        this.entityManager = entityManager;
    }
    
    public JPAQueryFactory getQueryFactory (){
        JPAQueryFactory queryFactory;
        
        queryFactory = new JPAQueryFactory (entityManager);
        return queryFactory;
    } 
}
