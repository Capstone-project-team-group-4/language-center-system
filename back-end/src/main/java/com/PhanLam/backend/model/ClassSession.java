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
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
    @Column(name = "LastModified")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModified;
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
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private Course courseID;
    @JoinColumn (name = "TeacherID", referencedColumnName = "UserID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private User teacherID;
    @Basic (optional = false)
    @Column (name = "SpareTimeRegisterID", nullable = false)
    private Integer spareTimeRegisterID;
    @JoinColumn (
            name = "SlotID"
            , referencedColumnName = "SlotID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private Slot slot;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "classSession", fetch = FetchType.LAZY)
    private List<Comment> commentList;

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
        return spareTimeRegisterID;
    }

    public void setSpareTimeRegisterID(Integer spareTimeRegisterID) {
        spareTimeRegisterID = spareTimeRegisterID;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    @XmlTransient
    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    @Override
    public int hashCode (){
        int hash = 7;
        hash = 79 * hash + Objects.hashCode (this.classID);
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
                + ", status=" + status
                + ", userList=" + userList
                + ", homeWorkList=" + homeWorkList
                + ", courseID=" + courseID
                + ", teacherID=" + teacherID
        + '}';
    }
}
