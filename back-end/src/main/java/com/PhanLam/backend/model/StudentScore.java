/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
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
    @JoinColumn (name = "ExamID", referencedColumnName = "ExamID")
    @ManyToOne (fetch = FetchType.LAZY)
    private Examination examID;
    @JoinColumn (name = "HomeWorkID", referencedColumnName = "HomeWorkID")
    @ManyToOne (fetch = FetchType.LAZY)
    private HomeWork homeWorkID;
    @JoinColumn (name = "UserID", referencedColumnName = "UserID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private User userID;

    public StudentScore (){
    }

    public StudentScore (Integer scoreID){
        this.scoreID = scoreID;
    }

    public StudentScore (Integer scoreID, double score, String status){
        this.scoreID = scoreID;
        this.score = score;
        this.status = status;
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

    public Examination getExamID (){
        return examID;
    }

    public void setExamID (Examination examID){
        this.examID = examID;
    }

    public HomeWork getHomeWorkID (){
        return homeWorkID;
    }

    public void setHomeWorkID (HomeWork homeWorkID){
        this.homeWorkID = homeWorkID;
    }

    public User getUserID (){
        return userID;
    }

    public void setUserID (User userID){
        this.userID = userID;
    }

    @Override
    public int hashCode (){
        int hash = 0;
        hash += (scoreID != null ? scoreID.hashCode () : 0);
        return hash;
    }

    @Override
    public boolean equals (Object object){
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof StudentScore)){
            return false;
        }
        StudentScore other = (StudentScore) object;
        if ((this.scoreID == null && other.scoreID != null) || (this.scoreID != null && !this.scoreID.equals (other.scoreID))){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "com.PhanLam.backend.model.StudentScore[ scoreID=" + scoreID + " ]";
    }
    
}
