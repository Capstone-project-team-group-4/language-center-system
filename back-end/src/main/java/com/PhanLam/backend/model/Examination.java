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
 * @author roboc
 */
@Entity
@Table(name = "Examination", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Examination.findAll", query = "SELECT e FROM Examination e"),
    @NamedQuery(name = "Examination.findByExamID", query = "SELECT e FROM Examination e WHERE e.examID = :examID"),
    @NamedQuery(name = "Examination.findByStartTime", query = "SELECT e FROM Examination e WHERE e.startTime = :startTime"),
    @NamedQuery(name = "Examination.findByType", query = "SELECT e FROM Examination e WHERE e.type = :type"),
    @NamedQuery(name = "Examination.findByDuration", query = "SELECT e FROM Examination e WHERE e.duration = :duration")})
public class Examination implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ExamID", nullable = false)
    private Integer examID;
    @Basic(optional = false)
    @NotNull
    @Column(name = "StartTime", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "Type", nullable = false, length = 500)
    private String type;
    @Basic(optional = false)
    @NotNull
    @Column(name = "Duration", nullable = false)
    private int duration;
    @Basic (optional = false)
    @NotNull
    @Column (name = "MaxNumberOfAttempt", nullable = false)
    private int maxNumberOfAttempt;
    @Basic (optional = false)
    @NotNull
    @Column (name = "DateCreated", nullable = false)
    @Temporal (TemporalType.TIMESTAMP)
    private Date dateCreated;
    @Column (name = "LastModified")
    @Temporal (TemporalType.TIMESTAMP)
    private Date lastModified;
    
    @JsonIgnore
    @JoinTable (name = "ExaminationQuestion", joinColumns = {
        @JoinColumn (
                name = "ExamID"
                , referencedColumnName = "ExamID"
                , nullable = false
        )
    }, inverseJoinColumns = {
        @JoinColumn (
                name = "QuestionID"
                , referencedColumnName = "QuestionID"
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
    private List<MultipleChoiceQuestion> multipleChoiceQuestionList;
    
    @OneToMany (mappedBy = "examID", fetch = FetchType.LAZY)
    private List<StudentScore> studentScoreList;
    
    @JoinColumn (
            name = "CourseID"
            , referencedColumnName = "CourseID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private Course course;

    public Examination() {
    }

    public Examination(Integer examID) {
        this.examID = examID;
    }

    public Examination (
            Date startTime
            , String type
            , int duration
            , int maxNumberOfAttempt
            , Date dateCreated
            , Course course
    ){
        this.startTime = startTime;
        this.type = type;
        this.duration = duration;
        this.maxNumberOfAttempt = maxNumberOfAttempt;
        this.dateCreated = dateCreated;
        this.course = course;
    }
    
    public Integer getExamID (){
        return examID;
    }

    public void setExamID(Integer examID) {
        this.examID = examID;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
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

    public int getMaxNumberOfAttempt (){
        return maxNumberOfAttempt;
    }

    public void setMaxNumberOfAttempt (int maxNumberOfAttempt){
        this.maxNumberOfAttempt = maxNumberOfAttempt;
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
    
    @XmlTransient
    public List<MultipleChoiceQuestion> getMultipleChoiceQuestionList() {
        return multipleChoiceQuestionList;
    }

    public void setMultipleChoiceQuestionList(List<MultipleChoiceQuestion> multipleChoiceQuestionList) {
        this.multipleChoiceQuestionList = multipleChoiceQuestionList;
    }

    @XmlTransient
    public List<StudentScore> getStudentScoreList() {
        return studentScoreList;
    }

    public void setStudentScoreList(List<StudentScore> studentScoreList) {
        this.studentScoreList = studentScoreList;
    }

    public Course getCourse (){
        return course;
    }

    public void setCourse (Course course){
        this.course = course;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (examID != null ? examID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Examination)) {
            return false;
        }
        Examination other = (Examination) object;
        if ((this.examID == null && other.examID != null) || (this.examID != null && !this.examID.equals(other.examID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.PhanLam.backend.model.Examination[ examID=" + examID + " ]";
    }
    
}
