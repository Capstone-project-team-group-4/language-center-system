/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table (name = "SpareTimeRegister", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries ({
    @NamedQuery (name = "SpareTimeRegister.findAll", query = "SELECT s FROM SpareTimeRegister s"),
    @NamedQuery (name = "SpareTimeRegister.findBySpareTimeID", query = "SELECT s FROM SpareTimeRegister s WHERE s.spareTimeID = :spareTimeID")
})
public class SpareTimeRegister implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "SpareTimeID", nullable = false)
    private Integer spareTimeID;

    @JoinColumn (name = "UserID", referencedColumnName = "UserID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private User userID;
    @Column(name = "LastModified")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModified;
    @Column (name = "Status", nullable = false)
    private Integer status;


    @JoinTable(name = "SpareTimeCourseType", joinColumns = {
            @JoinColumn (
                    name = "SpareTimeID"
                    , referencedColumnName = "SpareTimeID"
                    , nullable = false
            )
    }, inverseJoinColumns = {
            @JoinColumn (
                    name = "TypeID"
                    , referencedColumnName = "TypeID"
                    , nullable = false
            )
    })
    @ManyToMany (
            cascade = {
                    CascadeType.MERGE
                    , CascadeType.REFRESH
                    , CascadeType.DETACH
            }
            , fetch = FetchType.LAZY
    )
    private List<CourseType> courseTypeList;


    @JoinTable(name = "SpareTimeSlot", joinColumns = {
            @JoinColumn (
                    name = "SpareTimeID"
                    , referencedColumnName = "SpareTimeID"
                    , nullable = false
            )
    }, inverseJoinColumns = {
            @JoinColumn (
                    name = "SlotID"
                    , referencedColumnName = "SlotID"
                    , nullable = false
            )
    })
    @ManyToMany (
            cascade = {
                    CascadeType.MERGE
                    , CascadeType.REFRESH
                    , CascadeType.DETACH
            }
            , fetch = FetchType.LAZY
    )
    private List<Slot> slotList;

    public SpareTimeRegister (){
    }

    public SpareTimeRegister (Integer spareTimeID){
        this.spareTimeID = spareTimeID;
    }



    public Integer getSpareTimeID (){
        return spareTimeID;
    }

    public void setSpareTimeID (Integer spareTimeID){
        this.spareTimeID = spareTimeID;
    }


    public User getUserID (){
        return userID;
    }

    public void setUserID (User userID){
        this.userID = userID;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @XmlTransient
    public List<CourseType> getCourseTypeList() {
        return courseTypeList;
    }

    public void setCourseTypeList(List<CourseType> courseTypeList) {
        this.courseTypeList = courseTypeList;
    }

    @XmlTransient
    public List<Slot> getSlotList() {
        return slotList;
    }

    public void setSlotList(List<Slot> slotList) {
        this.slotList = slotList;
    }

    @Override
    public int hashCode (){
        int hash = 5;
        hash = 67 * hash + Objects.hashCode (this.spareTimeID);
        hash = 67 * hash + Objects.hashCode (this.spareTime);
        hash = 67 * hash + Objects.hashCode (this.userID);
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
        final SpareTimeRegister other = (SpareTimeRegister) obj;
        if (!Objects.equals (this.spareTimeID, other.spareTimeID)){
            return false;
        }
        if (!Objects.equals (this.spareTime, other.spareTime)){
            return false;
        }
        if (!Objects.equals (this.userID, other.userID)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "SpareTimeRegister{" + "spareTimeID=" + spareTimeID + ", spareTime=" + spareTime + ", userID=" + userID + '}';
    }
}
