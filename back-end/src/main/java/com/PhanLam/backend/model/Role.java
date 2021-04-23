/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
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
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table(name = "Role", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Role.findAll", query = "SELECT r FROM Role r"),
    @NamedQuery(name = "Role.findByRoleID", query = "SELECT r FROM Role r WHERE r.roleID = :roleID"),
    @NamedQuery(name = "Role.findByRoleName", query = "SELECT r FROM Role r WHERE r.roleName = :roleName")})
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "RoleID", nullable = false)
    private Integer roleID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 400)
    @Column (name = "RoleName", nullable = false, length = 400)
    private String roleName;
    
    @JsonIgnore
    @ManyToMany (
            mappedBy = "roleList"
            , cascade = {
                CascadeType.PERSIST
                , CascadeType.MERGE
                , CascadeType.REFRESH
                , CascadeType.DETACH
            } 
            , fetch = FetchType.LAZY
    )
    private List<User> userList;

    public Role() {
    }

    public Role(Integer roleID) {
        this.roleID = roleID;
    }

    public Role(Integer roleID, String roleName) {
        this.roleID = roleID;
        this.roleName = roleName;
    }

    public Integer getRoleID() {
        return roleID;
    }

    public void setRoleID(Integer roleID) {
        this.roleID = roleID;
    }
    
    public String getRoleName (){
        return roleName;
    }

    public void setRoleName (String roleName){
        this.roleName = roleName;
    }

    @XmlTransient
    public List<User> getUserList (){
        return userList;
    }

    public void setUserList (List<User> userList){
        this.userList = userList;
    }

    @Override
    public int hashCode (){
        int hash = 7;
        hash = 13 * hash + Objects.hashCode (this.roleID);
        hash = 13 * hash + Objects.hashCode (this.roleName);
        hash = 13 * hash + Objects.hashCode (this.userList);
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
        final Role other = (Role) obj;
        if (!Objects.equals (this.roleName, other.roleName)){
            return false;
        }
        if (!Objects.equals (this.roleID, other.roleID)){
            return false;
        }
        if (!Objects.equals (this.userList, other.userList)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "Role {" 
                + "roleID=" + roleID 
                + ", roleName=" + roleName 
                + ", userList=" + userList 
        + '}';
    }
}