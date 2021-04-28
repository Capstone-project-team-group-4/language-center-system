/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;
import java.util.Date;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 *
 * @author Phan Lam
 */
@Entity


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
