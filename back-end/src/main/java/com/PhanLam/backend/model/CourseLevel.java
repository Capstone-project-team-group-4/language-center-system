/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table (name = "CourseLevel", catalog = "LanguageCenterDB", schema = "dbo", uniqueConstraints = {
    @UniqueConstraint (columnNames = {"LevelName"})})
@XmlRootElement
@NamedQueries ({
    @NamedQuery (name = "CourseLevel.findAll", query = "SELECT c FROM CourseLevel c"),
    @NamedQuery (name = "CourseLevel.findByLevelID", query = "SELECT c FROM CourseLevel c WHERE c.levelID = :levelID"),
    @NamedQuery (name = "CourseLevel.findByLevelName", query = "SELECT c FROM CourseLevel c WHERE c.levelName = :levelName")})
public class CourseLevel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "LevelID", nullable = false)
    private Integer levelID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 400)
    @Column (name = "LevelName", nullable = false, length = 400)
    private String levelName;
    
    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "courseLevel"
            , fetch = FetchType.LAZY
    )
    private List<Course> courseList;
    
    @JoinColumn (
            name = "TypeID"
            , referencedColumnName = "TypeID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private CourseType courseType;

    public CourseLevel (){
    }

    public CourseLevel (Integer levelID){
        this.levelID = levelID;
    }

    public CourseLevel (String levelName, CourseType courseType){
        this.levelName = levelName;
        this.courseType = courseType;
    }

    public Integer getLevelID (){
        return levelID;
    }

    public void setLevelID (Integer levelID){
        this.levelID = levelID;
    }

    public String getLevelName (){
        return levelName;
    }

    public void setLevelName (String levelName){
        this.levelName = levelName;
    }

    @XmlTransient
    public List<Course> getCourseList (){
        return courseList;
    }

    public void setCourseList (List<Course> courseList){
        this.courseList = courseList;
    }

    public CourseType getCourseType (){
        return courseType;
    }

    public void setCourseType (CourseType courseType){
        this.courseType = courseType;
    }

    @Override
    public int hashCode (){
        int hash = 7;
        hash = 23 * hash + Objects.hashCode (this.levelID);
        hash = 23 * hash + Objects.hashCode (this.levelName);
        hash = 23 * hash + Objects.hashCode (this.courseList);
        hash = 23 * hash + Objects.hashCode (this.courseType);
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
        final CourseLevel other = (CourseLevel) obj;
        if (!Objects.equals (this.levelName, other.levelName)){
            return false;
        }
        if (!Objects.equals (this.levelID, other.levelID)){
            return false;
        }
        if (!Objects.equals (this.courseList, other.courseList)){
            return false;
        }
        if (!Objects.equals (this.courseType, other.courseType)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "CourseLevel {" 
                + "levelID=" + levelID 
                + ", levelName=" + levelName 
                + ", courseList=" + courseList 
                + ", courseType=" + courseType 
        + '}';
    }
}