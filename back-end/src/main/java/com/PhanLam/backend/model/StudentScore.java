/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
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
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table (name = "StudentScore", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries ({
    @NamedQuery (name = "StudentScore.findAll", query = "SELECT s FROM StudentScore s"),
    @NamedQuery (name = "StudentScore.findByScoreID", query = "SELECT s FROM StudentScore s WHERE s.scoreID = :scoreID"),
    @NamedQuery (name = "StudentScore.findByScore", query = "SELECT s FROM StudentScore s WHERE s.score = :score"),
    @NamedQuery (name = "StudentScore.findByStatus", query = "SELECT s FROM StudentScore s WHERE s.status = :status")})
public class StudentScore implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "ScoreID", nullable = false)
    private Integer scoreID;
    @Basic (optional = false)
    @NotNull
    @Column (name = "Score", nullable = false)
    private double score;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 500)
    @Column (name = "Status", nullable = false, length = 500)
    private String status;
    
    @JoinColumn (
            name = "ExamID"
            , referencedColumnName = "ExamID"
            , nullable = true
    )
    @ManyToOne (fetch = FetchType.EAGER)
    private Examination exam;
    
    @JoinColumn (
            name = "HomeWorkID"
            , referencedColumnName = "HomeWorkID"
            , nullable = true
    )
    @ManyToOne (fetch = FetchType.EAGER)
    private HomeWork homeWork;
    
    @JoinColumn (
            name = "UserID"
            , referencedColumnName = "UserID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private User user;

    public StudentScore (){
    }

    public StudentScore (Integer scoreID){
        this.scoreID = scoreID;
    }

    public StudentScore (
            double score
            , String status
            , Examination exam
            , HomeWork homeWork
            , User user
    ){
        this.score = score;
        this.status = status;
        this.exam = exam;
        this.homeWork = homeWork;
        this.user = user;
    }
    
    public Integer getScoreID (){
        return scoreID;
    }

    public void setScoreID (Integer scoreID){
        this.scoreID = scoreID;
    }

    public double getScore (){
        return score;
    }

    public void setScore (double score){
        this.score = score;
    }

    public String getStatus (){
        return status;
    }

    public void setStatus (String status){
        this.status = status;
    }

    public Examination getExam (){
        return exam;
    }

    public void setExam (Examination exam){
        this.exam = exam;
    }

    public HomeWork getHomeWork (){
        return homeWork;
    }

    public void setHomeWork (HomeWork homeWork){
        this.homeWork = homeWork;
    }

    public User getUser (){
        return user;
    }

    public void setUser (User user){
        this.user = user;
    }

    @Override
    public int hashCode (){
        int hash = 5;
        hash = 67 * hash + Objects.hashCode (this.scoreID);
        hash = 67 * hash + (int) (Double.doubleToLongBits (this.score) ^ (Double.doubleToLongBits (this.score) >>> 32));
        hash = 67 * hash + Objects.hashCode (this.status);
        hash = 67 * hash + Objects.hashCode (this.exam);
        hash = 67 * hash + Objects.hashCode (this.homeWork);
        hash = 67 * hash + Objects.hashCode (this.user);
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
        final StudentScore other = (StudentScore) obj;
        if (Double.doubleToLongBits (this.score) != Double.doubleToLongBits (other.score)){
            return false;
        }
        if (!Objects.equals (this.status, other.status)){
            return false;
        }
        if (!Objects.equals (this.scoreID, other.scoreID)){
            return false;
        }
        if (!Objects.equals (this.exam, other.exam)){
            return false;
        }
        if (!Objects.equals (this.homeWork, other.homeWork)){
            return false;
        }
        if (!Objects.equals (this.user, other.user)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "StudentScore {" 
                + "scoreID=" + scoreID 
                + ", score=" + score 
                + ", status=" + status 
                + ", examID=" + exam 
                + ", homeWorkID=" + homeWork 
                + ", userID=" + user 
        + '}';
    }
}