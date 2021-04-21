/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
import java.util.Date;
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
        int hash = 7;
        hash = 79 * hash + Objects.hashCode (this.classID);
        hash = 79 * hash + Objects.hashCode (this.startTime);
        hash = 79 * hash + Objects.hashCode (this.status);
        hash = 79 * hash + Objects.hashCode (this.userList);
        hash = 79 * hash + Objects.hashCode (this.homeWorkList);
        hash = 79 * hash + Objects.hashCode (this.courseID);
        hash = 79 * hash + Objects.hashCode (this.teacherID);
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
        final ClassSession other = (ClassSession) obj;
        if (!Objects.equals (this.status, other.status)){
            return false;
        }
        if (!Objects.equals (this.classID, other.classID)){
            return false;
        }
        if (!Objects.equals (this.startTime, other.startTime)){
            return false;
        }
        if (!Objects.equals (this.userList, other.userList)){
            return false;
        }
        if (!Objects.equals (this.homeWorkList, other.homeWorkList)){
            return false;
        }
        if (!Objects.equals (this.courseID, other.courseID)){
            return false;
        }
        if (!Objects.equals (this.teacherID, other.teacherID)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "ClassSession {" 
                + "classID=" + classID 
                + ", startTime=" + startTime 
                + ", status=" + status 
                + ", userList=" + userList 
                + ", homeWorkList=" + homeWorkList 
                + ", courseID=" + courseID 
                + ", teacherID=" + teacherID 
        + '}';
    }
}
