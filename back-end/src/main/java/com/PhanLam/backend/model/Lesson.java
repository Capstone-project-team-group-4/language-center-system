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
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author roboc
 */
@Entity
@Table(name = "Lesson", catalog = "LanguageCenterDB", schema = "dbo", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"LessonName"})})
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Lesson.findAll", query = "SELECT l FROM Lesson l"),
    @NamedQuery(name = "Lesson.findByLessonID", query = "SELECT l FROM Lesson l WHERE l.lessonID = :lessonID"),
    @NamedQuery(name = "Lesson.findByLessonName", query = "SELECT l FROM Lesson l WHERE l.lessonName = :lessonName"),
    @NamedQuery(name = "Lesson.findByDescription", query = "SELECT l FROM Lesson l WHERE l.description = :description"),
    @NamedQuery(name = "Lesson.findByContentURI", query = "SELECT l FROM Lesson l WHERE l.contentURI = :contentURI"),
    @NamedQuery(name = "Lesson.findByType", query = "SELECT l FROM Lesson l WHERE l.type = :type"),
    @NamedQuery(name = "Lesson.findByDuration", query = "SELECT l FROM Lesson l WHERE l.duration = :duration"),
    @NamedQuery(name = "Lesson.findByDateCreated", query = "SELECT l FROM Lesson l WHERE l.dateCreated = :dateCreated"),
    @NamedQuery(name = "Lesson.findByLastModified", query = "SELECT l FROM Lesson l WHERE l.lastModified = :lastModified")})
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "LessonID", nullable = false)
    private Integer lessonID;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 400)
    @Column(name = "LessonName", nullable = false, length = 400)
    private String lessonName;
    @Size(max = 1000)
    @Column(name = "Description", length = 1000)
    private String description;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "ContentURI", nullable = false, length = 1000)
    private String contentURI;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "Type", nullable = false, length = 500)
    private String type;
    @Basic(optional = false)
    @NotNull
    @Column(name = "Duration", nullable = false)
    private int duration;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DateCreated", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;
    @Column(name = "LastModified")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModified;
    @JoinColumn(name = "CourseID", referencedColumnName = "CourseID", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JsonIgnore
    private Course courseID;
    
    public Lesson() {
    }

    public Lesson(Integer lessonID) {
        this.lessonID = lessonID;
    }

    public Lesson(Integer lessonID, String lessonName, String contentURI, String type, int duration, Date dateCreated) {
        this.lessonID = lessonID;
        this.lessonName = lessonName;
        this.contentURI = contentURI;
        this.type = type;
        this.duration = duration;
        this.dateCreated = dateCreated;
    }

    public Lesson(Integer lessonID, String lessonName, String description, String contentURI, String type, int duration, Date dateCreated, Date lastModified, Course courseID) {
        this.lessonID = lessonID;
        this.lessonName = lessonName;
        this.description = description;
        this.contentURI = contentURI;
        this.type = type;
        this.duration = duration;
        this.dateCreated = dateCreated;
        this.lastModified = lastModified;
        this.courseID = courseID;
    }
    
    

    public Integer getLessonID() {
        return lessonID;
    }

    public void setLessonID(Integer lessonID) {
        this.lessonID = lessonID;
    }

    public String getLessonName() {
        return lessonName;
    }

    public void setLessonName(String lessonName) {
        this.lessonName = lessonName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContentURI() {
        return contentURI;
    }

    public void setContentURI(String contentURI) {
        this.contentURI = contentURI;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public Course getCourseID() {
        return courseID;
    }

    public void setCourseID(Course courseID) {
        this.courseID = courseID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (lessonID != null ? lessonID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lesson)) {
            return false;
        }
        Lesson other = (Lesson) object;
        if ((this.lessonID == null && other.lessonID != null) || (this.lessonID != null && !this.lessonID.equals(other.lessonID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.PhanLam.backend.model.Lesson[ lessonID=" + lessonID + " ]";
    }
    
}
