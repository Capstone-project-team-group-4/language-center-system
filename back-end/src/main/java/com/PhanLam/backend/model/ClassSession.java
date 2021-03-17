/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table (name = "ClassSession", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries ({
    @NamedQuery (
            name = "ClassSession.findAll"
            , query = "SELECT c FROM ClassSession c"
    ),
    @NamedQuery (
            name = "ClassSession.findByClassID"
            , query = "SELECT c FROM ClassSession c WHERE c.classID = :classID"
    ),
    @NamedQuery (
            name = "ClassSession.findByStartTime"
            , query = "SELECT c FROM ClassSession c WHERE c.startTime = :startTime"
    ),
    @NamedQuery (
            name = "ClassSession.findByStatus"
            , query = "SELECT c FROM ClassSession c WHERE c.status = :status"
    )})
public class ClassSession implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "ClassID", nullable = false)
    private Integer classID;
    @Basic (optional = false)
    @NotNull
    @Column (name = "StartTime", nullable = false)
    @Temporal (TemporalType.TIMESTAMP)
    private Date startTime;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 500)
    @Column (name = "Status", nullable = false, length = 500)
    private String status;
    @JoinTable (name = "UserClass", joinColumns = {
        @JoinColumn (name = "ClassID", referencedColumnName = "ClassID", nullable = false)}, inverseJoinColumns = {
        @JoinColumn (name = "UserID", referencedColumnName = "UserID", nullable = false)})
    @ManyToMany (fetch = FetchType.LAZY)
    private List<User> userList;
    @OneToMany (cascade = CascadeType.ALL, mappedBy = "classID", fetch = FetchType.LAZY)
    private List<HomeWork> homeWorkList;
    @JoinColumn (name = "CourseID", referencedColumnName = "CourseID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private Course courseID;
    @JoinColumn (name = "TeacherID", referencedColumnName = "UserID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private User teacherID;

    public ClassSession (){
    }

    public ClassSession (Integer classID){
        this.classID = classID;
    }

    public ClassSession (Integer classID, Date startTime, String status){
        this.classID = classID;
        this.startTime = startTime;
        this.status = status;
    }

    public Integer getClassID (){
        return classID;
    }

    public void setClassID (Integer classID){
        this.classID = classID;
    }

    public Date getStartTime (){
        return startTime;
    }

    public void setStartTime (Date startTime){
        this.startTime = startTime;
    }

    public String getStatus (){
        return status;
    }

    public void setStatus (String status){
        this.status = status;
    }

    @XmlTransient
    public List<User> getUserList (){
        return userList;
    }

    public void setUserList (List<User> userList){
        this.userList = userList;
    }

    @XmlTransient
    public List<HomeWork> getHomeWorkList (){
        return homeWorkList;
    }

    public void setHomeWorkList (List<HomeWork> homeWorkList){
        this.homeWorkList = homeWorkList;
    }

    public Course getCourseID (){
        return courseID;
    }

    public void setCourseID (Course courseID){
        this.courseID = courseID;
    }

    public User getTeacherID (){
        return teacherID;
    }

    public void setTeacherID (User teacherID){
        this.teacherID = teacherID;
    }

    @Override
    public int hashCode (){
        int hash = 0;
        hash += (classID != null ? classID.hashCode () : 0);
        return hash;
    }

    @Override
    public boolean equals (Object object){
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ClassSession)){
            return false;
        }
        ClassSession other = (ClassSession) object;
        if ((this.classID == null && other.classID != null) || (this.classID != null && !this.classID.equals (other.classID))){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "com.PhanLam.backend.model.ClassSession[ classID=" + classID + " ]";
    }
    
}
