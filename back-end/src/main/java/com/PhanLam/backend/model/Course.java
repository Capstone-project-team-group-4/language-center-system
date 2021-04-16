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
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table (name = "Course", catalog = "LanguageCenterDB", schema = "dbo", uniqueConstraints = {
    @UniqueConstraint (columnNames = {"CourseName"})})
@XmlRootElement
@NamedQueries ({
    @NamedQuery (name = "Course.findAll", query = "SELECT c FROM Course c"),
    @NamedQuery (name = "Course.findByCourseID", query = "SELECT c FROM Course c WHERE c.courseID = :courseID"),
    @NamedQuery (name = "Course.findByCourseName", query = "SELECT c FROM Course c WHERE c.courseName = :courseName"),
    @NamedQuery (name = "Course.findByDescription", query = "SELECT c FROM Course c WHERE c.description = :description"),
    @NamedQuery (name = "Course.findByCourseType", query = "SELECT c FROM Course c WHERE c.courseType = :courseType"),
    @NamedQuery (name = "Course.findByCourseLevel", query = "SELECT c FROM Course c WHERE c.courseLevel = :courseLevel"),
    @NamedQuery (name = "Course.findByTuitionFee", query = "SELECT c FROM Course c WHERE c.tuitionFee = :tuitionFee"),
    @NamedQuery (name = "Course.findByDateCreated", query = "SELECT c FROM Course c WHERE c.dateCreated = :dateCreated"),
    @NamedQuery (name = "Course.findByLastModified", query = "SELECT c FROM Course c WHERE c.lastModified = :lastModified")})
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "CourseID", nullable = false)
    private Integer courseID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 400)
    @Column (name = "CourseName", nullable = false, length = 400)
    private String courseName;
    @Size (max = 1000)
    @Column (name = "Description", length = 1000)
    private String description;

    @JoinColumn (
            name = "TypeID"
            , referencedColumnName = "TypeID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private CourseType courseType;

    @JoinColumn (
            name = "LevelID"
            , referencedColumnName = "LevelID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private CourseLevel courseLevel;

    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic (optional = false)
    @NotNull
    @Column (name = "TuitionFee", nullable = false, precision = 19, scale = 4)
    private BigDecimal tuitionFee;
    @Basic (optional = false)
    @NotNull
    @Column (name = "DateCreated", nullable = false)
    @Temporal (TemporalType.TIMESTAMP)
    private Date dateCreated;
    @Column (name = "LastModified")
    @Temporal (TemporalType.TIMESTAMP)
    private Date lastModified;

    @JsonIgnore
    @JoinTable (name = "CourseUser", joinColumns = {
        @JoinColumn (
                name = "CourseID"
                , referencedColumnName = "CourseID"
                , nullable = false
        )
    }, inverseJoinColumns = {
        @JoinColumn (
                name = "UserID"
                , referencedColumnName = "UserID"
                , nullable = false
        )
    })
    @ManyToMany (
            cascade = {
                CascadeType.PERSIST
                , CascadeType.MERGE
                , CascadeType.REFRESH
                , CascadeType.DETACH
            }
            , fetch = FetchType.LAZY
    )
    private List<User> userList;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "courseID"
            , fetch = FetchType.LAZY
    )
    private List<Lesson> lessonList;

    @JsonIgnore
    @OneToOne(
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "courseID"
            , fetch = FetchType.LAZY
    )
    private ClassSession classSession;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "course"
            , fetch = FetchType.LAZY
    )
    private List<Examination> examinationList;

    public Course (){
        lessonList = new ArrayList<> ();
        examinationList = new ArrayList<> ();
    }

    public Course (Integer courseID){
        this.courseID = courseID;
    }

    public Course (
            String courseName
            , String description
            , CourseType courseType
            , CourseLevel courseLevel
            , BigDecimal tuitionFee
            , Date dateCreated
            , Date lastModified
    ){
        this.courseName = courseName;
        this.description = description;
        this.courseType = courseType;
        this.courseLevel = courseLevel;
        this.tuitionFee = tuitionFee;
        this.dateCreated = dateCreated;
        this.lastModified = lastModified;
    }

    public Integer getCourseID (){
        return courseID;
    }

    public void setCourseID (Integer courseID){
        this.courseID = courseID;
    }

    public String getCourseName (){
        return courseName;
    }

    public void setCourseName (String courseName){
        this.courseName = courseName;
    }

    public String getDescription (){
        return description;
    }

    public void setDescription (String description){
        this.description = description;
    }

    public CourseType getCourseType (){
        return courseType;
    }

    public void setCourseType (CourseType courseType){
        this.courseType = courseType;
    }

    public CourseLevel getCourseLevel (){
        return courseLevel;
    }

    public void setCourseLevel (CourseLevel courseLevel){
        this.courseLevel = courseLevel;
    }

    public BigDecimal getTuitionFee (){
        return tuitionFee;
    }

    public void setTuitionFee (BigDecimal tuitionFee){
        this.tuitionFee = tuitionFee;
    }

    public Date getDateCreated (){
        return dateCreated;
    }

    public void setDateCreated (Date dateCreated){
        this.dateCreated = dateCreated;
    }

    public Date getLastModified (){
        return lastModified;
    }

    public void setLastModified (Date lastModified){
        this.lastModified = lastModified;
    }

    public List<User> getUserList (){
        return userList;
    }

    public void setUserList (List<User> userList){
        this.userList = userList;
    }

    public List<Lesson> getLessonList (){
        return lessonList;
    }

    public void setLessonList (List<Lesson> lessonList){
        this.lessonList = lessonList;
    }

    public ClassSession getClassSession (){
        return classSession;
    }

    public void setClassSession      (ClassSession classSession){
        this.classSession = classSession;
    }

    public List<Examination> getExaminationList (){
        return examinationList;
    }

    public void setExaminationList (List<Examination> examinationList){
        this.examinationList = examinationList;
    }

    @Override
    public int hashCode (){
        int hash = 0;
        hash += (courseID != null ? courseID.hashCode () : 0);
        return hash;
    }

    @Override
    public boolean equals (Object object){
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Course)){
            return false;
        }
        Course other = (Course) object;
        if ((this.courseID == null && other.courseID != null) || (this.courseID != null && !this.courseID.equals (other.courseID))){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "com.PhanLam.backend.model.Course[ courseID=" + courseID + " ]";
    }
}
