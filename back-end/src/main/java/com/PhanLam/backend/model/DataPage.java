/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

// Import package members section:
import java.util.ArrayList;

/**
 *
 * @author Phan Lam
 * @param <T>
 */
public class DataPage<T> {
    
    // Variables declaration:
    private int totalPageCount;
    private ArrayList<T> pageDataHolder;

    public DataPage (){
    }
    
    public DataPage (int totalPageCount, ArrayList<T> pageDataHolder){
        this.totalPageCount = totalPageCount;
        this.pageDataHolder = pageDataHolder;
    }

    public int getTotalPageCount (){
        return totalPageCount;
    }

    public ArrayList<T> getPageDataHolder (){
        return pageDataHolder;
    }
}
