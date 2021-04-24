/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author roboc
 */
@Entity
@Table(name = "Lesson", catalog = "LanguageCenterDB", schema = "dbo", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"LessonName"})})
@XmlRootElement
@NamedQueries({
    @NamedQuery (name = "Lesson.findAll", query = "SELECT l FROM Lesson l"),
    @NamedQuery (name = "Lesson.findByLessonID", query = "SELECT l FROM Lesson l WHERE l.lessonID = :lessonID"),
    @NamedQuery (name = "Lesson.findByLessonName", query = "SELECT l FROM Lesson l WHERE l.lessonName = :lessonName"),
    @NamedQuery (name = "Lesson.findByDescription", query = "SELECT l FROM Lesson l WHERE l.description = :description"),
    @NamedQuery (name = "Lesson.findByContentURI", query = "SELECT l FROM Lesson l WHERE l.contentURI = :contentURI"),
    @NamedQuery (name = "Lesson.findByType", query = "SELECT l FROM Lesson l WHERE l.type = :type"),
    @NamedQuery (name = "Lesson.findByDuration", query = "SELECT l FROM Lesson l WHERE l.duration = :duration"),
    @NamedQuery (name = "Lesson.findByDateCreated", query = "SELECT l FROM Lesson l WHERE l.dateCreated = :dateCreated")})
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
    @Column (name = "LastModified")
    @Temporal (TemporalType.TIMESTAMP)
    private Date lastModified;
    @OneToMany (mappedBy = "lessonID", fetch = FetchType.LAZY)
    private List<Document> documentList;
    @JoinColumn (name = "CourseID", referencedColumnName = "CourseID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
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

    @XmlTransient
    public List<Document> getDocumentList (){
        return documentList;
    }

    public Course getCourseID() {
        return courseID;
    }

    public void setCourseID(Course courseID) {
        this.courseID = courseID;
    }

    @Override
    public int hashCode (){
        int hash = 3;
        hash = 97 * hash + Objects.hashCode (this.lessonID);
        hash = 97 * hash + Objects.hashCode (this.lessonName);
        hash = 97 * hash + Objects.hashCode (this.description);
        hash = 97 * hash + Objects.hashCode (this.contentURI);
        hash = 97 * hash + Objects.hashCode (this.type);
        hash = 97 * hash + this.duration;
        hash = 97 * hash + Objects.hashCode (this.dateCreated);
        hash = 97 * hash + Objects.hashCode (this.lastModified);
        hash = 97 * hash + Objects.hashCode (this.courseID);
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
        final Lesson other = (Lesson) obj;
        if (this.duration != other.duration){
            return false;
        }
        if (!Objects.equals (this.lessonName, other.lessonName)){
            return false;
        }
        if (!Objects.equals (this.description, other.description)){
            return false;
        }
        if (!Objects.equals (this.contentURI, other.contentURI)){
            return false;
        }
        if (!Objects.equals (this.type, other.type)){
            return false;
        }
        if (!Objects.equals (this.lessonID, other.lessonID)){
            return false;
        }
        if (!Objects.equals (this.dateCreated, other.dateCreated)){
            return false;
        }
        if (!Objects.equals (this.lastModified, other.lastModified)){
            return false;
        }
        if (!Objects.equals (this.courseID, other.courseID)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "Lesson {" 
                + "lessonID=" + lessonID 
                + ", lessonName=" + lessonName 
                + ", description=" + description 
                + ", contentURI=" + contentURI 
                + ", type=" + type 
                + ", duration=" + duration 
                + ", dateCreated=" + dateCreated 
                + ", lastModified=" + lastModified 
                + ", courseID=" + courseID 
        + '}';
    }
}
