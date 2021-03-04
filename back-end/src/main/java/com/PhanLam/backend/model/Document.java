/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author roboc
 */
@Entity
@Table(name = "Document", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Document.findAll", query = "SELECT d FROM Document d"),
    @NamedQuery(name = "Document.findByDocumentID", query = "SELECT d FROM Document d WHERE d.documentID = :documentID"),
    @NamedQuery(name = "Document.findByDescription", query = "SELECT d FROM Document d WHERE d.description = :description"),
    @NamedQuery(name = "Document.findByUri", query = "SELECT d FROM Document d WHERE d.uri = :uri"),
    @NamedQuery(name = "Document.findByPostTime", query = "SELECT d FROM Document d WHERE d.postTime = :postTime")})
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "DocumentID", nullable = false)
    private Integer documentID;
    @Size(max = 1000)
    @Column(name = "Description", length = 1000)
    private String description;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "URI", nullable = false, length = 1000)
    private String uri;
    @Basic(optional = false)
    @NotNull
    @Column(name = "PostTime", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date postTime;
    @JoinColumn(name = "RequirementID", referencedColumnName = "HomeWorkID")
    @ManyToOne(fetch = FetchType.LAZY)
    private HomeWork requirementID;
    @JoinColumn(name = "SolutionID", referencedColumnName = "HomeWorkID")
    @ManyToOne(fetch = FetchType.LAZY)
    private HomeWork solutionID;
    @JoinColumn(name = "LessonID", referencedColumnName = "LessonID")
    @ManyToOne(fetch = FetchType.LAZY)
    private Lesson lessonID;

    public Document() {
    }

    public Document(Integer documentID) {
        this.documentID = documentID;
    }

    public Document(Integer documentID, String uri, Date postTime) {
        this.documentID = documentID;
        this.uri = uri;
        this.postTime = postTime;
    }

    public Integer getDocumentID() {
        return documentID;
    }

    public void setDocumentID(Integer documentID) {
        this.documentID = documentID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public Date getPostTime() {
        return postTime;
    }

    public void setPostTime(Date postTime) {
        this.postTime = postTime;
    }

    public HomeWork getRequirementID() {
        return requirementID;
    }

    public void setRequirementID(HomeWork requirementID) {
        this.requirementID = requirementID;
    }

    public HomeWork getSolutionID() {
        return solutionID;
    }

    public void setSolutionID(HomeWork solutionID) {
        this.solutionID = solutionID;
    }

    public Lesson getLessonID() {
        return lessonID;
    }

    public void setLessonID(Lesson lessonID) {
        this.lessonID = lessonID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (documentID != null ? documentID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Document)) {
            return false;
        }
        Document other = (Document) object;
        if ((this.documentID == null && other.documentID != null) || (this.documentID != null && !this.documentID.equals(other.documentID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.PhanLam.backend.model.Document[ documentID=" + documentID + " ]";
    }
    
}
