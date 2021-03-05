/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
import java.util.List;
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
 * @author This MC
 */
@Entity
@Table(name = "CourseLevel", catalog = "LanguageCenterDB", schema = "dbo", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"LevelName"})})
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CourseLevel.findAll", query = "SELECT c FROM CourseLevel c"),
    @NamedQuery(name = "CourseLevel.findByLevelID", query = "SELECT c FROM CourseLevel c WHERE c.levelID = :levelID"),
    @NamedQuery(name = "CourseLevel.findByLevelName", query = "SELECT c FROM CourseLevel c WHERE c.levelName = :levelName")})
public class CourseLevel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "LevelID", nullable = false)
    private Integer levelID;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 400)
    @Column(name = "LevelName", nullable = false, length = 400)
    private String levelName;
    @JoinColumn(name = "TypeID", referencedColumnName = "TypeID", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private CourseType typeID;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "levelID", fetch = FetchType.LAZY)
    private List<Course> courseList;

    public CourseLevel() {
    }

    public CourseLevel(Integer levelID) {
        this.levelID = levelID;
    }

    public CourseLevel(Integer levelID, String levelName) {
        this.levelID = levelID;
        this.levelName = levelName;
    }

    public Integer getLevelID() {
        return levelID;
    }

    public void setLevelID(Integer levelID) {
        this.levelID = levelID;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public CourseType getTypeID() {
        return typeID;
    }

    public void setTypeID(CourseType typeID) {
        this.typeID = typeID;
    }

    @XmlTransient
    public List<Course> getCourseList() {
        return courseList;
    }

    public void setCourseList(List<Course> courseList) {
        this.courseList = courseList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (levelID != null ? levelID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CourseLevel)) {
            return false;
        }
        CourseLevel other = (CourseLevel) object;
        if ((this.levelID == null && other.levelID != null) || (this.levelID != null && !this.levelID.equals(other.levelID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.PhanLam.backend.model.CourseLevel[ levelID=" + levelID + " ]";
    }
    
}
