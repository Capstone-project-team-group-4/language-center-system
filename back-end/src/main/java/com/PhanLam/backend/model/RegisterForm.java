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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author roboc
 */
@Entity
@Table(name = "RegisterForm", catalog = "LanguageCenterDB", schema = "dbo", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"UserName"})})
@XmlRootElement
@NamedQueries({
    @NamedQuery (name = "RegisterForm.findAll", query = "SELECT r FROM RegisterForm r"),
    @NamedQuery (name = "RegisterForm.findByFormID", query = "SELECT r FROM RegisterForm r WHERE r.formID = :formID"),
    @NamedQuery (name = "RegisterForm.findByUserName", query = "SELECT r FROM RegisterForm r WHERE r.userName = :userName"),
    @NamedQuery (name = "RegisterForm.findByMiddleName", query = "SELECT r FROM RegisterForm r WHERE r.middleName = :middleName"),
    @NamedQuery (name = "RegisterForm.findByFirstName", query = "SELECT r FROM RegisterForm r WHERE r.firstName = :firstName"),
    @NamedQuery (name = "RegisterForm.findByLastName", query = "SELECT r FROM RegisterForm r WHERE r.lastName = :lastName"),
    @NamedQuery (name = "RegisterForm.findByPhoneNumber", query = "SELECT r FROM RegisterForm r WHERE r.phoneNumber = :phoneNumber"),
    @NamedQuery (name = "RegisterForm.findByEmail", query = "SELECT r FROM RegisterForm r WHERE r.email = :email"),
    @NamedQuery (name = "RegisterForm.findByPassword", query = "SELECT r FROM RegisterForm r WHERE r.password = :password")})
public class RegisterForm implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "FormID", nullable = false)
    private Integer formID;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 400)
    @Column(name = "UserName", nullable = false, length = 400)
    private String userName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "MiddleName", nullable = false, length = 1000)
    private String middleName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "FirstName", nullable = false, length = 1000)
    private String firstName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "LastName", nullable = false, length = 1000)
    private String lastName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "PhoneNumber", nullable = false, length = 100)
    private String phoneNumber;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "Email", nullable = false, length = 1000)
    private String email;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "Password", nullable = false, length = 1000)
    private String password;

    public RegisterForm() {
    }

    public RegisterForm(Integer formID) {
        this.formID = formID;
    }

    public RegisterForm(Integer formID, String userName, String middleName, String firstName, String lastName, String phoneNumber, String email, String password) {
        this.formID = formID;
        this.userName = userName;
        this.middleName = middleName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }

    public Integer getFormID() {
        return formID;
    }

    public void setFormID(Integer formID) {
        this.formID = formID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (formID != null ? formID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof RegisterForm)) {
            return false;
        }
        RegisterForm other = (RegisterForm) object;
        if ((this.formID == null && other.formID != null) || (this.formID != null && !this.formID.equals(other.formID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.PhanLam.backend.model.RegisterForm[ formID=" + formID + " ]";
    }
    
}
