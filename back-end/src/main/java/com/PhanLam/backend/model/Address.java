/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 *
 * @author Phan Lam
 */
@Entity

public class Address implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AddressID", nullable = false)
    private Integer addressID;
    @JoinColumn(name = "UserID", referencedColumnName = "UserID", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private User userID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 500)
    @Column (name = "City", nullable = false, length = 500)
    private String city;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 500)
    @Column (name = "District", nullable = false, length = 500)
    private String district;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 500)
    @Column (name = "Ward", nullable = false, length = 500)
    private String ward;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 500)
    @Column (name = "Street", nullable = false, length = 500)
    private String street;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 500)
    @Column (name = "ApartmentNumber", nullable = false, length = 500)
    private String apartmentNumber;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 500)
    @Column (name = "Country", nullable = false, length = 500)
    private String country;

    public Address() {
    }

    public Address(Integer addressID) {
        this.addressID = addressID;
    }

    public Integer getAddressID() {
        return addressID;
    }

    public void setAddressID(Integer addressID) {
        this.addressID = addressID;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (addressID != null ? addressID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Address)) {
            return false;
        }
        Address other = (Address) object;
        if ((this.addressID == null && other.addressID != null) || (this.addressID != null && !this.addressID.equals(other.addressID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.PhanLam.backend.model.Address[ addressID=" + addressID + " ]";
    }

    public String getCity (){
        return city;
    }

    public void setCity (String city){
        this.city = city;
    }

    public String getDistrict (){
        return district;
    }

    public void setDistrict (String district){
        this.district = district;
    }

    public String getWard (){
        return ward;
    }

    public void setWard (String ward){
        this.ward = ward;
    }

    public String getStreet (){
        return street;
    }

    public void setStreet (String street){
        this.street = street;
    }

    public String getApartmentNumber (){
        return apartmentNumber;
    }

    public void setApartmentNumber (String apartmentNumber){
        this.apartmentNumber = apartmentNumber;
    }

    public String getCountry (){
        return country;
    }

    public void setCountry (String country){
        this.country = country;
    }

}
