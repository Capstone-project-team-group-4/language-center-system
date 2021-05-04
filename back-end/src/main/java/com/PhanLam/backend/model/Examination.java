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

public class Examination implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "ExamID", nullable = false)
    private Integer examID;
    @Basic (optional = false)
    @NotNull
    @Column (name = "StartTime", nullable = false)
    @Temporal (TemporalType.TIMESTAMP)
    private Date startTime;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 500)
    @Column (name = "Type", nullable = false, length = 500)
    private String type;
    @Basic (optional = false)
    @NotNull
    @Column (name = "Duration", nullable = false)
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
    @Transient
    private int totalNumberOfQuiz;

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

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "exam"
            , fetch = FetchType.LAZY
    )
    private List<StudentScore> studentScoreList;

    @JoinColumn (
            name = "CourseID"
            , referencedColumnName = "CourseID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private Course course;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "examination"
            , fetch = FetchType.LAZY
    )
    private List<ExaminationAttempt> examinationAttemptList;

    public Examination (){
    }

    public Examination (Integer examID){
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

    public void setExamID (Integer examID){
        this.examID = examID;
    }

    public Date getStartTime (){
        return startTime;
    }

    public void setStartTime (Date startTime){
        this.startTime = startTime;
    }

    public String getType (){
        return type;
    }

    public void setType (String type){
        this.type = type;
    }

    public int getDuration (){
        return duration;
    }

    public void setDuration (int duration){
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

    public int getTotalNumberOfQuiz (){
        return totalNumberOfQuiz;
    }

    public void setTotalNumberOfQuiz (int totalNumberOfQuiz){
        this.totalNumberOfQuiz = totalNumberOfQuiz;
    }

    @XmlTransient
    public List<MultipleChoiceQuestion> getMultipleChoiceQuestionList (){
        return multipleChoiceQuestionList;
    }

    public void setMultipleChoiceQuestionList (List<MultipleChoiceQuestion> multipleChoiceQuestionList){
        this.multipleChoiceQuestionList = multipleChoiceQuestionList;
    }

    @XmlTransient
    public List<StudentScore> getStudentScoreList (){
        return studentScoreList;
    }

    public void setStudentScoreList (List<StudentScore> studentScoreList){
        this.studentScoreList = studentScoreList;
    }

    public Course getCourse (){
        return course;
    }

    public void setCourse (Course course){
        this.course = course;
    }

    public List<ExaminationAttempt> getExaminationAttemptList (){
        return examinationAttemptList;
    }

    public void setExaminationAttemptList (List<ExaminationAttempt> examinationAttemptList){
        this.examinationAttemptList = examinationAttemptList;
    }

    @Override
    public int hashCode (){
        int hash = 7;
        hash = 19 * hash + Objects.hashCode (this.examID);
        hash = 19 * hash + Objects.hashCode (this.startTime);
        hash = 19 * hash + Objects.hashCode (this.type);
        hash = 19 * hash + this.duration;
        hash = 19 * hash + this.maxNumberOfAttempt;
        hash = 19 * hash + Objects.hashCode (this.dateCreated);
        hash = 19 * hash + Objects.hashCode (this.lastModified);
        hash = 19 * hash + Objects.hashCode (this.multipleChoiceQuestionList);
        hash = 19 * hash + Objects.hashCode (this.studentScoreList);
        hash = 19 * hash + Objects.hashCode (this.course);
        hash = 19 * hash + Objects.hashCode (this.examinationAttemptList);
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
        final Examination other = (Examination) obj;
        if (this.duration != other.duration){
            return false;
        }
        if (this.maxNumberOfAttempt != other.maxNumberOfAttempt){
            return false;
        }
        if (!Objects.equals (this.type, other.type)){
            return false;
        }
        if (!Objects.equals (this.examID, other.examID)){
            return false;
        }
        if (!Objects.equals (this.startTime, other.startTime)){
            return false;
        }
        if (!Objects.equals (this.dateCreated, other.dateCreated)){
            return false;
        }
        if (!Objects.equals (this.lastModified, other.lastModified)){
            return false;
        }
        if (!Objects.equals (this.multipleChoiceQuestionList, other.multipleChoiceQuestionList)){
            return false;
        }
        if (!Objects.equals (this.studentScoreList, other.studentScoreList)){
            return false;
        }
        if (!Objects.equals (this.course, other.course)){
            return false;
        }
        if (!Objects.equals (this.examinationAttemptList, other.examinationAttemptList)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "Examination {"
                + "examID=" + examID
                + ", startTime=" + startTime
                + ", type=" + type
                + ", duration=" + duration
                + ", maxNumberOfAttempt=" + maxNumberOfAttempt
                + ", dateCreated=" + dateCreated
                + ", lastModified=" + lastModified
                + ", multipleChoiceQuestionList=" + multipleChoiceQuestionList
                + ", studentScoreList=" + studentScoreList
                + ", course=" + course
                + ", course=" + examinationAttemptList
        + '}';
    }
}
