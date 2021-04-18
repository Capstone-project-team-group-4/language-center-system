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

public class CourseType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "TypeID", nullable = false)
    private Integer typeID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 400)
    @Column (name = "TypeName", nullable = false, length = 400)
    private String typeName;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "courseType"
            , fetch = FetchType.LAZY
    )
    private List<Course> courseList;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "courseType"
            , fetch = FetchType.LAZY
    )
    private List<CourseLevel> courseLevelList;

    @JsonIgnore
    @ManyToMany (
            mappedBy = "courseTypeList"
            , cascade = {
            CascadeType.PERSIST
            , CascadeType.MERGE
            , CascadeType.REFRESH
            , CascadeType.DETACH
    }
            , fetch = FetchType.LAZY
    )
    private List<SpareTimeRegister> spareTimeRegisterList;

    public CourseType (){
    }

    public CourseType (Integer typeID){
        this.typeID = typeID;
    }

    public CourseType (Integer typeID, String typeName){
        this.typeID = typeID;
        this.typeName = typeName;
    }

    public Integer getTypeID (){
        return typeID;
    }

    public void setTypeID (Integer typeID){
        this.typeID = typeID;
    }

    public String getTypeName (){
        return typeName;
    }

    public void setTypeName (String typeName){
        this.typeName = typeName;
    }

    @XmlTransient
    public List<Course> getCourseList (){
        return courseList;
    }

    public void setCourseList (List<Course> courseList){
        this.courseList = courseList;
    }

    @XmlTransient
    public List<CourseLevel> getCourseLevelList (){
        return courseLevelList;
    }

    public void setCourseLevelList (List<CourseLevel> courseLevelList){
        this.courseLevelList = courseLevelList;
    }

    @XmlTransient
    public List<SpareTimeRegister> getSpareTimeRegisterList() {
        return spareTimeRegisterList;
    }

    public void setSpareTimeRegisterList(List<SpareTimeRegister> spareTimeRegisterList) {
        this.spareTimeRegisterList = spareTimeRegisterList;
    }

    @Override
    public int hashCode (){
        int hash = 0;
        hash += (typeID != null ? typeID.hashCode () : 0);
        return hash;
    }

    @Override
    public boolean equals (Object object){
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CourseType)){
            return false;
        }
        CourseType other = (CourseType) object;
        if ((this.typeID == null && other.typeID != null) || (this.typeID != null && !this.typeID.equals (other.typeID))){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "com.PhanLam.backend.model.CourseType[ typeID=" + typeID + " ]";
    }

}
