/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table(name = "Address", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Address.findAll", query = "SELECT a FROM Address a"),
    @NamedQuery(name = "Address.findByAddressID", query = "SELECT a FROM Address a WHERE a.addressID = :addressID"),
    @NamedQuery(name = "Address.findByCity", query = "SELECT a FROM Address a WHERE a.city = :city")})
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

    @Override
    public int hashCode (){
        int hash = 3;
        hash = 67 * hash + Objects.hashCode (this.addressID);
        hash = 67 * hash + Objects.hashCode (this.userID);
        hash = 67 * hash + Objects.hashCode (this.city);
        hash = 67 * hash + Objects.hashCode (this.district);
        hash = 67 * hash + Objects.hashCode (this.ward);
        hash = 67 * hash + Objects.hashCode (this.street);
        hash = 67 * hash + Objects.hashCode (this.apartmentNumber);
        hash = 67 * hash + Objects.hashCode (this.country);
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
        final Address other = (Address) obj;
        if (!Objects.equals (this.city, other.city)){
            return false;
        }
        if (!Objects.equals (this.district, other.district)){
            return false;
        }
        if (!Objects.equals (this.ward, other.ward)){
            return false;
        }
        if (!Objects.equals (this.street, other.street)){
            return false;
        }
        if (!Objects.equals (this.apartmentNumber, other.apartmentNumber)){
            return false;
        }
        if (!Objects.equals (this.country, other.country)){
            return false;
        }
        if (!Objects.equals (this.addressID, other.addressID)){
            return false;
        }
        if (!Objects.equals (this.userID, other.userID)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "Address {" 
                + "addressID=" + addressID 
                + ", userID=" + userID 
                + ", city=" + city 
                + ", district=" + district 
                + ", ward=" + ward 
                + ", street=" + street 
                + ", apartmentNumber=" + apartmentNumber 
                + ", country=" + country 
        + '}';
    }
    
}
