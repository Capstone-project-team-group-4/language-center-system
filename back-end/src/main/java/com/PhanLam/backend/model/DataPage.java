/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

// Import package members section:
import java.util.List;

/**
 *
 * @author Phan Lam
 * @param <T>
 */
public class DataPage<T> {
    
    // Variables declaration:
    private long totalRowCount;
    private List<T> pageDataHolder;

    public DataPage (){
    }

    public DataPage (long totalRowCount, List<T> pageDataHolder){
        this.totalRowCount = totalRowCount;
        this.pageDataHolder = pageDataHolder;
    }

    public long getTotalRowCount (){
        return totalRowCount;
    }

    public List<T> getPageDataHolder (){
        return pageDataHolder;
    }
}
