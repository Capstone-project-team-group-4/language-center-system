/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author Phan Lam
 */
@Entity

public class ExaminationAttempt implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "AttemptID", nullable = false)
    private Integer attemptID;
    @Basic (optional = false)
    @NotNull
    @Column (name = "NumberOfAttemptTaken", nullable = false)
    private int numberOfAttemptTaken;

    @JoinColumn (
            name = "UserID"
            , referencedColumnName = "UserID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private User user;

    @JoinColumn (
            name = "ExamID"
            , referencedColumnName = "ExamID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private Examination examination;

    public ExaminationAttempt (){
    }

    public ExaminationAttempt (Integer attemptID){
        this.attemptID = attemptID;
    }

    public ExaminationAttempt (
            int numberOfAttemptTaken
            , User user
            , Examination examination
    ){
        this.numberOfAttemptTaken = numberOfAttemptTaken;
        this.user = user;
        this.examination = examination;
    }

    public Integer getAttemptID (){
        return attemptID;
    }

    public void setAttemptID (Integer attemptID){
        this.attemptID = attemptID;
    }

    public int getNumberOfAttemptTaken (){
        return numberOfAttemptTaken;
    }

    public void setNumberOfAttemptTaken (int numberOfAttemptTaken){
        this.numberOfAttemptTaken = numberOfAttemptTaken;
    }

    public User getUser (){
        return user;
    }

    public void setUser (User user){
        this.user = user;
    }

    public Examination getExamination (){
        return examination;
    }

    public void setExamination (Examination examination){
        this.examination = examination;
    }

    @Override
    public int hashCode (){
        int hash = 5;
        hash = 59 * hash + Objects.hashCode (this.attemptID);
        hash = 59 * hash + this.numberOfAttemptTaken;
        hash = 59 * hash + Objects.hashCode (this.user);
        hash = 59 * hash + Objects.hashCode (this.examination);
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
        final ExaminationAttempt other = (ExaminationAttempt) obj;
        if (this.numberOfAttemptTaken != other.numberOfAttemptTaken){
            return false;
        }
        if (!Objects.equals (this.attemptID, other.attemptID)){
            return false;
        }
        if (!Objects.equals (this.user, other.user)){
            return false;
        }
        if (!Objects.equals (this.examination, other.examination)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "ExaminationAttempt {"
                + "attemptID=" + attemptID
                + ", numberOfAttemptTaken=" + numberOfAttemptTaken
                + ", user=" + user
                + ", examination=" + examination
        + '}';
    }
}
