package com.PhanLam.backend.service.common;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

public class SearchSpecification<T> implements Specification<T> {

    private SearchCriteria criteria;

    public SearchSpecification(SearchCriteria criteria){
        this.criteria =criteria;
    }


    @Override
    public javax.persistence.criteria.Predicate toPredicate(Root<T> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {

        if (criteria.getOperation().equalsIgnoreCase("like")) {
            if (root.get(criteria.getColumn()).getJavaType() == String.class) {
                return criteriaBuilder.like(
                        root.get(criteria.getColumn()), "%" + criteria.getValue() + "%");
            }
        }
        if (criteria.getOperation().equalsIgnoreCase("notlike")) {
            if (root.get(criteria.getColumn()).getJavaType() == String.class) {
                return criteriaBuilder.notLike(
                        root.get(criteria.getColumn()), "%" + criteria.getValue() + "%");
            }
        }
        return null;
    }
}
