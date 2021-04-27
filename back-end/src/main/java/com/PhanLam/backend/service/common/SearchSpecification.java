package com.PhanLam.backend.service.common;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;

public class SearchSpecification<T> implements Specification<T> {

    private SearchCriteria criteria;

    public SearchSpecification(SearchCriteria criteria){
        this.criteria =criteria;
    }


    @Override
    public javax.persistence.criteria.Predicate toPredicate(Root<T> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        Path path = getPath(root,criteria.getColumn());
        if (criteria.getOperation().equalsIgnoreCase("like")) {
                return criteriaBuilder.like(
                        path, "%" + criteria.getValue() + "%");
        }
        if (criteria.getOperation().equalsIgnoreCase("notlike")) {
                return criteriaBuilder.notLike(
                        path, "%" + criteria.getValue() + "%");

        }
        if (criteria.getOperation().equalsIgnoreCase("notEqual")) {
                return criteriaBuilder.notEqual(
                        path, Integer.parseInt(criteria.getValue().toString()));

        }
        if (criteria.getOperation().equalsIgnoreCase("forName")) {
            if (root.get(criteria.getColumn()).getJavaType() == String.class) {
                Expression<String> exp1 = criteriaBuilder.concat(root.<String>get("firstName"), " ");
                exp1 = criteriaBuilder.concat(exp1, root.<String>get("middleName"));
                exp1 = criteriaBuilder.concat(exp1, " ");
                exp1 = criteriaBuilder.concat(exp1, root.<String>get("lastName"));
                return  criteriaBuilder.or(criteriaBuilder.like(exp1, "%"+ criteria.getValue() +"%"));
            }
        }
        return null;
    }
    protected Path<Comparable> getPath(Root<T> root, String key) {
        Path<Comparable> path;
        if (key.contains(".")) {
            String[] split = key.split("\\.");
            int keyPosition = 0;
            path = root.get(split[keyPosition]);
            for (String criteriaKeys : split) {
                if (keyPosition > 0) {
                    path = path.get(criteriaKeys);
                }
                keyPosition++;
            }
        } else {
            path = root.get(key);
        }
        return path;
    }
}
