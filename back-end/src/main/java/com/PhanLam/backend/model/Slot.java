/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;
import java.util.List;

/**
 *
 * @author Phan Lam
 */
@Entity

public class Slot implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "SlotID", nullable = false)
    private Integer slotID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 5)
    @Column (name = "SlotName", nullable = false, length = 400)
    private String SlotName;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "slot"
            , fetch = FetchType.LAZY
    )
    private List<ClassSession> classSessionList;

    @JsonIgnore
    @ManyToMany (
            mappedBy = "slotList"
            , cascade = {
            CascadeType.PERSIST
            , CascadeType.MERGE
            , CascadeType.REFRESH
            , CascadeType.DETACH
    }
            , fetch = FetchType.LAZY
    )
    private List<SpareTimeRegister> spareTimeRegisterList;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getSlotID() {
        return slotID;
    }

    public void setSlotID(Integer slotID) {
        this.slotID = slotID;
    }

    public String getSlotName() {
        return SlotName;
    }

    public void setSlotName(String slotName) {
        SlotName = slotName;
    }

    @XmlTransient
    public List<SpareTimeRegister> getSpareTimeRegisterList() {
        return spareTimeRegisterList;
    }

    public void setSpareTimeRegisterList(List<SpareTimeRegister> spareTimeRegisterList) {
        this.spareTimeRegisterList = spareTimeRegisterList;
    }

    @XmlTransient
    public List<ClassSession> getClassSessionList() {
        return classSessionList;
    }

    public void setClassSessionList(List<ClassSession> classSessionList) {
        this.classSessionList = classSessionList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (slotID != null ? slotID.hashCode() : 0);
        return hash;
    }


    @Override
    public String toString() {
        return "com.PhanLam.backend.model.Role[ roleID=" + slotID + " ]";
    }
}
