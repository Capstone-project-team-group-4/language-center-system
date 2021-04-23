/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

// Import package members section:
import java.util.List;
import java.util.Objects;

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

    @Override
    public int hashCode (){
        int hash = 5;
        hash = 79 * hash + (int) (this.totalRowCount ^ (this.totalRowCount >>> 32));
        hash = 79 * hash + Objects.hashCode (this.pageDataHolder);
        return hash;
    }

    @Override
    public boolean equals (Object obj){
        if (this == obj){
            return true;
        }
        if (obj == null){
            return false;
        }
        if (getClass () != obj.getClass ()){
            return false;
        }
        final DataPage<?> other = (DataPage<?>) obj;
        if (this.totalRowCount != other.totalRowCount){
            return false;
        }
        if (!Objects.equals (this.pageDataHolder, other.pageDataHolder)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "DataPage {" 
                + "totalRowCount=" + totalRowCount 
                + ", pageDataHolder=" + pageDataHolder 
        + '}';
    }
}
