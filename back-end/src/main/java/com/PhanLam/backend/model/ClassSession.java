/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;
import java.util.List;

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
    @Column (name = "Status", nullable = false)
    private int status;

    @JsonIgnore
    @JoinTable (name = "UserClass", joinColumns = {
        @JoinColumn (name = "ClassID", referencedColumnName = "ClassID", nullable = false)}, inverseJoinColumns = {
        @JoinColumn (name = "UserID", referencedColumnName = "UserID", nullable = false)})
    @ManyToMany (fetch = FetchType.LAZY)
    private List<User> userList;
    @OneToMany (cascade = CascadeType.ALL, mappedBy = "classID", fetch = FetchType.LAZY)
    private List<HomeWork> homeWorkList;
    @JoinColumn (name = "CourseID", referencedColumnName = "CourseID", nullable = false)
    @OneToOne (optional = false, fetch = FetchType.LAZY)
    private Course courseID;
    @JoinColumn (name = "TeacherID", referencedColumnName = "UserID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private User teacherID;
    @Basic (optional = false)
    @Column (name = "SpareTimeRegisterID", nullable = false)
    private Integer SpareTimeRegisterID;
    @JoinColumn (
            name = "SlotID"
            , referencedColumnName = "SlotID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private Slot slot;

    public ClassSession (){
    }

    public ClassSession (Integer classID){
        this.classID = classID;
    }

    public ClassSession (Integer classID, int status){
        this.classID = classID;
        this.status = status;
    }

    public Slot getSlot() {
        return slot;
    }

    public void setSlot(Slot slot) {
        this.slot = slot;
    }

    public Integer getClassID (){
        return classID;
    }

    public void setClassID (Integer classID){
        this.classID = classID;
    }

    public int getStatus (){
        return status;
    }

    public void setStatus (int status){
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

    public Integer getSpareTimeRegisterID() {
        return SpareTimeRegisterID;
    }

    public void setSpareTimeRegisterID(Integer spareTimeRegisterID) {
        SpareTimeRegisterID = spareTimeRegisterID;
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
