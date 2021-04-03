/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table (name = "SpareTimeRegister", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries ({
    @NamedQuery (name = "SpareTimeRegister.findAll", query = "SELECT s FROM SpareTimeRegister s"),
    @NamedQuery (name = "SpareTimeRegister.findBySpareTimeID", query = "SELECT s FROM SpareTimeRegister s WHERE s.spareTimeID = :spareTimeID"),
    @NamedQuery (name = "SpareTimeRegister.findBySpareTime", query = "SELECT s FROM SpareTimeRegister s WHERE s.spareTime = :spareTime")})
public class SpareTimeRegister implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "SpareTimeID", nullable = false)
    private Integer spareTimeID;
    @Basic (optional = false)
    @NotNull
    @Column (name = "SpareTime", nullable = false)
    @Temporal (TemporalType.TIMESTAMP)
    private Date spareTime;
    @JoinColumn (name = "UserID", referencedColumnName = "UserID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    @JsonIgnore
    private User userID;

    public SpareTimeRegister (){
    }

    public SpareTimeRegister (Integer spareTimeID){
        this.spareTimeID = spareTimeID;
    }

    public SpareTimeRegister (Integer spareTimeID, Date spareTime){
        this.spareTimeID = spareTimeID;
        this.spareTime = spareTime;
    }

    public Integer getSpareTimeID (){
        return spareTimeID;
    }

    public void setSpareTimeID (Integer spareTimeID){
        this.spareTimeID = spareTimeID;
    }

    public Date getSpareTime (){
        return spareTime;
    }

    public void setSpareTime (Date spareTime){
        this.spareTime = spareTime;
    }

    public User getUserID (){
        return userID;
    }

    public void setUserID (User userID){
        this.userID = userID;
    }

    @Override
    public int hashCode (){
        int hash = 0;
        hash += (spareTimeID != null ? spareTimeID.hashCode () : 0);
        return hash;
    }

    @Override
    public boolean equals (Object object){
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SpareTimeRegister)){
            return false;
        }
        SpareTimeRegister other = (SpareTimeRegister) object;
        if ((this.spareTimeID == null && other.spareTimeID != null) || (this.spareTimeID != null && !this.spareTimeID.equals (other.spareTimeID))){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "com.PhanLam.backend.model.SpareTimeRegister[ spareTimeID=" + spareTimeID + " ]";
    }
    
}
