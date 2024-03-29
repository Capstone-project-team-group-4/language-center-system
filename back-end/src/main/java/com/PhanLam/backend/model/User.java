/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Objects;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table(name = "User", catalog = "LanguageCenterDB", schema = "dbo", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"UserName"})})
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "User.findAll", query = "SELECT u FROM User u"),
    @NamedQuery(name = "User.findByUserID", query = "SELECT u FROM User u WHERE u.userID = :userID"),
    @NamedQuery(name = "User.findByUserName", query = "SELECT u FROM User u WHERE u.userName = :userName"),
    @NamedQuery(name = "User.findByFirstName", query = "SELECT u FROM User u WHERE u.firstName = :firstName"),
    @NamedQuery(name = "User.findByMiddleName", query = "SELECT u FROM User u WHERE u.middleName = :middleName"),
    @NamedQuery(name = "User.findByLastName", query = "SELECT u FROM User u WHERE u.lastName = :lastName"),
    @NamedQuery(name = "User.findByEmail", query = "SELECT u FROM User u WHERE u.email = :email"),
    @NamedQuery(name = "User.findByDob", query = "SELECT u FROM User u WHERE u.dob = :dob"),
    @NamedQuery(name = "User.findByPhoneNumber", query = "SELECT u FROM User u WHERE u.phoneNumber = :phoneNumber"),
    @NamedQuery(name = "User.findByGender", query = "SELECT u FROM User u WHERE u.gender = :gender"),
    @NamedQuery(name = "User.findByJob", query = "SELECT u FROM User u WHERE u.job = :job"),
    @NamedQuery(name = "User.findByPhotoURI", query = "SELECT u FROM User u WHERE u.photoURI = :photoURI"),
    @NamedQuery(name = "User.findBySelfDescription", query = "SELECT u FROM User u WHERE u.selfDescription = :selfDescription"),
    @NamedQuery(name = "User.findByPassword", query = "SELECT u FROM User u WHERE u.password = :password"),
    @NamedQuery(name = "User.findByAccountStatus", query = "SELECT u FROM User u WHERE u.accountStatus = :accountStatus"),
    @NamedQuery(name = "User.findByDateCreated", query = "SELECT u FROM User u WHERE u.dateCreated = :dateCreated"),
    @NamedQuery(name = "User.findByLastLogin", query = "SELECT u FROM User u WHERE u.lastLogin = :lastLogin"),
    @NamedQuery(name = "User.findByLastModified", query = "SELECT u FROM User u WHERE u.lastModified = :lastModified")})
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "UserID", nullable = false)
    private Integer userID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 400)
    @Column (name = "UserName", nullable = false, length = 400)
    private String userName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "FirstName", nullable = false, length = 1000)
    private String firstName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "MiddleName", nullable = false, length = 1000)
    private String middleName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "LastName", nullable = false, length = 1000)
    private String lastName;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "Email", nullable = false, length = 1000)
    private String email;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DOB", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dob;
    @Basic(optional = false)
    @NotNull
    @Size (min = 1, max = 100)
    @Column (name = "PhoneNumber", nullable = false, length = 100)
    private String phoneNumber;
    @Basic(optional = false)
    @NotNull
    @Size (min = 0, max = 100)
    @Column (name = "Gender", nullable = false, length = 100)
    private String gender;
    @Size(max = 500)
    @Column(name = "Job", length = 500)
    private String job;
    @Size(max = 1000)
    @Column(name = "PhotoURI", length = 1000)
    private String photoURI;
    @Size(max = 2147483647)
    @Column(name = "SelfDescription", length = 2147483647)
    private String selfDescription;
    @JsonIgnore
    @Basic(optional = false)
    @NotNull
    @Size (min = 1, max = 1000)
    @Column (name = "Password", nullable = false, length = 1000)
    private String password;
    @Basic(optional = false)
    @NotNull
    @Size (min = 1, max = 100)
    @Column (name = "AccountStatus", nullable = false, length = 100)
    private String accountStatus;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DateCreated", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateCreated;
    @Column(name = "LastLogin")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLogin;
    @Column(name = "LastModified")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModified;

    @JsonIgnore
    @ManyToMany (
            mappedBy = "userList"
            , cascade = {
                CascadeType.PERSIST
                , CascadeType.MERGE
                , CascadeType.REFRESH
                , CascadeType.DETACH
            }
            , fetch = FetchType.LAZY
    )
    private List<Course> courseList;

    @JsonIgnore
    @ManyToMany (mappedBy = "userList", fetch = FetchType.LAZY)
    private List<ClassSession> classList;

    @JsonIgnore
    @JoinTable (name = "UserRole", joinColumns = {
        @JoinColumn (
                name = "UserID"
                , referencedColumnName = "UserID"
                , nullable = false
        )
    }, inverseJoinColumns = {
        @JoinColumn (
                name = "RoleID"
                , referencedColumnName = "RoleID"
                , nullable = false
        )
    })
    @ManyToMany (
            cascade = {
                CascadeType.MERGE
                , CascadeType.REFRESH
                , CascadeType.DETACH
            }
            , fetch = FetchType.LAZY
    )
    private List<Role> roleList;

    @JsonIgnore
    @OneToMany (cascade = CascadeType.ALL, mappedBy = "userID", fetch = FetchType.LAZY)
    private List<SpareTimeRegister> spareTimeRegisterList;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "user"
            , fetch = FetchType.LAZY
    )
    private List<StudentScore> studentScoreList;

    @JsonIgnore
    @OneToMany (cascade = CascadeType.ALL, mappedBy = "teacherID", fetch = FetchType.LAZY)
    private List<ClassSession> classList1;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userID", fetch = FetchType.LAZY)
    private List<Address> addressList;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "creator"
            , fetch = FetchType.LAZY
    )
    private List<MultipleChoiceQuestion> multipleChoiceQuestionList;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.LAZY)
    private List<Comment> commentList;

    @Transient
    private String commentOfClass;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "user"
            , fetch = FetchType.LAZY
    )
    private List<ExaminationAttempt> examinationAttemptList;

    public User (){
        multipleChoiceQuestionList = new ArrayList<> ();
//        examinationAttemptList = new ArrayList<> ();
    }

    public User (
            String userName
            , String firstName
            , String middleName
            , String lastName
            , String phoneNumber
            , String email
            , String password
            , Date dateCreated
    ){
        this.userName = userName;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.dob = new Date (0L);
        this.phoneNumber = phoneNumber;
        this.gender = "";
        this.password = password;
        this.accountStatus = "Active";
        this.dateCreated = dateCreated;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getUserName (){
        return userName;
    }

    public void setUserName (String userName){
        this.userName = userName;
    }

    public String getFirstName (){
        return firstName;
    }

    public void setFirstName (String firstName){
        this.firstName = firstName;
    }

    public String getMiddleName (){
        return middleName;
    }

    public void setMiddleName (String middleName){
        this.middleName = middleName;
    }

    public String getLastName (){
        return lastName;
    }

    public void setLastName (String lastName){
        this.lastName = lastName;
    }

    public String getEmail (){
        return email;
    }

    public void setEmail (String email){
        this.email = email;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPhoneNumber (){
        return phoneNumber;
    }

    public void setPhoneNumber (String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public String getGender (){
        return gender;
    }

    public void setGender (String gender){
        this.gender = gender;
    }

    public String getJob (){
        return job;
    }

    public void setJob (String job){
        this.job = job;
    }

    public String getPhotoURI (){
        return photoURI;
    }

    public void setPhotoURI (String photoURI){
        this.photoURI = photoURI;
    }

    public String getSelfDescription (){
        return selfDescription;
    }

    public void setSelfDescription (String selfDescription){
        this.selfDescription = selfDescription;
    }

    public String getPassword (){
        return password;
    }

    public void setPassword (String password){
        this.password = password;
    }

    public String getAccountStatus (){
        return accountStatus;
    }

    public void setAccountStatus (String accountStatus){
        this.accountStatus = accountStatus;
    }

    public Date getDateCreated (){
        return dateCreated;
    }

    public void setDateCreated (Date dateCreated){
        this.dateCreated = dateCreated;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Date getLastModified (){
        return lastModified;
    }

    public void setLastModified (Date lastModified){
        this.lastModified = lastModified;
    }

    @XmlTransient
    public List<Course> getCourseList (){
        return courseList;
    }

    public void setCourseList (List<Course> courseList){
        this.courseList = courseList;
    }

    @XmlTransient
    public List<ClassSession> getClassList (){
        return classList;
    }

    public void setClassList (List<ClassSession> classList){
        this.classList = classList;
    }

    @XmlTransient
    public List<Role> getRoleList (){
        return roleList;
    }

    public void setRoleList (List<Role> roleList){
        this.roleList = roleList;
    }

    @XmlTransient
    public List<SpareTimeRegister> getSpareTimeRegisterList (){
        return spareTimeRegisterList;
    }

    public void setSpareTimeRegisterList (List<SpareTimeRegister> spareTimeRegisterList){
        this.spareTimeRegisterList = spareTimeRegisterList;
    }

    @XmlTransient
    public List<StudentScore> getStudentScoreList (){
        return studentScoreList;
    }

    public void setStudentScoreList (List<StudentScore> studentScoreList){
        this.studentScoreList = studentScoreList;
    }

    @XmlTransient
    public List<ClassSession> getClassList1 (){
        return classList1;
    }

    public void setClassList1 (List<ClassSession> classList1){
        this.classList1 = classList1;
    }

    @XmlTransient
    public List<Address> getAddressList() {
        return addressList;
    }

    public void setAddressList(List<Address> addressList) {
        this.addressList = addressList;
    }

    public List<MultipleChoiceQuestion> getMultipleChoiceQuestionList (){
        return multipleChoiceQuestionList;
    }

    public void setMultipleChoiceQuestionList (
            List<MultipleChoiceQuestion> multipleChoiceQuestionList
    ){
        this.multipleChoiceQuestionList = multipleChoiceQuestionList;
    }

    @XmlTransient
    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    public String getCommentOfClass() {
        return commentOfClass;
    }

    public void setCommentOfClass(String commentOfClass) {
        this.commentOfClass = commentOfClass;
    }

    public List<ExaminationAttempt> getExaminationAttemptList (){
        return examinationAttemptList;
    }

    public void setExaminationAttemptList (
            List<ExaminationAttempt> examinationAttemptList
    ){
        this.examinationAttemptList = examinationAttemptList;
    }

    @Override
    public int hashCode (){
        int hash = 7;
        hash = 13 * hash + Objects.hashCode (this.userID);
        hash = 13 * hash + Objects.hashCode (this.userName);
        hash = 13 * hash + Objects.hashCode (this.firstName);
        hash = 13 * hash + Objects.hashCode (this.middleName);
        hash = 13 * hash + Objects.hashCode (this.lastName);
        hash = 13 * hash + Objects.hashCode (this.email);
        hash = 13 * hash + Objects.hashCode (this.dob);
        hash = 13 * hash + Objects.hashCode (this.phoneNumber);
        hash = 13 * hash + Objects.hashCode (this.gender);
        hash = 13 * hash + Objects.hashCode (this.job);
        hash = 13 * hash + Objects.hashCode (this.photoURI);
        hash = 13 * hash + Objects.hashCode (this.selfDescription);
        hash = 13 * hash + Objects.hashCode (this.password);
        hash = 13 * hash + Objects.hashCode (this.accountStatus);
        hash = 13 * hash + Objects.hashCode (this.dateCreated);
        hash = 13 * hash + Objects.hashCode (this.lastLogin);
        hash = 13 * hash + Objects.hashCode (this.lastModified);
        hash = 13 * hash + Objects.hashCode (this.courseList);
        hash = 13 * hash + Objects.hashCode (this.classList);
        hash = 13 * hash + Objects.hashCode (this.roleList);
        hash = 13 * hash + Objects.hashCode (this.spareTimeRegisterList);
        hash = 13 * hash + Objects.hashCode (this.studentScoreList);
        hash = 13 * hash + Objects.hashCode (this.classList1);
        hash = 13 * hash + Objects.hashCode (this.addressList);
        hash = 13 * hash + Objects.hashCode (this.multipleChoiceQuestionList);
        hash = 13 * hash + Objects.hashCode (this.examinationAttemptList);
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
        final User other = (User) obj;
        if (!Objects.equals (this.userName, other.userName)){
            return false;
        }
        if (!Objects.equals (this.firstName, other.firstName)){
            return false;
        }
        if (!Objects.equals (this.middleName, other.middleName)){
            return false;
        }
        if (!Objects.equals (this.lastName, other.lastName)){
            return false;
        }
        if (!Objects.equals (this.email, other.email)){
            return false;
        }
        if (!Objects.equals (this.phoneNumber, other.phoneNumber)){
            return false;
        }
        if (!Objects.equals (this.gender, other.gender)){
            return false;
        }
        if (!Objects.equals (this.job, other.job)){
            return false;
        }
        if (!Objects.equals (this.photoURI, other.photoURI)){
            return false;
        }
        if (!Objects.equals (this.selfDescription, other.selfDescription)){
            return false;
        }
        if (!Objects.equals (this.password, other.password)){
            return false;
        }
        if (!Objects.equals (this.accountStatus, other.accountStatus)){
            return false;
        }
        if (!Objects.equals (this.userID, other.userID)){
            return false;
        }
        if (!Objects.equals (this.dob, other.dob)){
            return false;
        }
        if (!Objects.equals (this.dateCreated, other.dateCreated)){
            return false;
        }
        if (!Objects.equals (this.lastLogin, other.lastLogin)){
            return false;
        }
        if (!Objects.equals (this.lastModified, other.lastModified)){
            return false;
        }
        if (!Objects.equals (this.courseList, other.courseList)){
            return false;
        }
        if (!Objects.equals (this.classList, other.classList)){
            return false;
        }
        if (!Objects.equals (this.roleList, other.roleList)){
            return false;
        }
        if (!Objects.equals (this.spareTimeRegisterList, other.spareTimeRegisterList)){
            return false;
        }
        if (!Objects.equals (this.studentScoreList, other.studentScoreList)){
            return false;
        }
        if (!Objects.equals (this.classList1, other.classList1)){
            return false;
        }
        if (!Objects.equals (this.addressList, other.addressList)){
            return false;
        }
        if (!Objects.equals (this.multipleChoiceQuestionList, other.multipleChoiceQuestionList)){
            return false;
        }
        if (!Objects.equals (this.examinationAttemptList, other.examinationAttemptList)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "User {"
                + "userID=" + userID
                + ", userName=" + userName
                + ", firstName=" + firstName
                + ", middleName=" + middleName
                + ", lastName=" + lastName
                + ", email=" + email
                + ", dob=" + dob
                + ", phoneNumber=" + phoneNumber
                + ", gender=" + gender
                + ", job=" + job
                + ", photoURI=" + photoURI
                + ", selfDescription=" + selfDescription
                + ", password=[protected]"
                + ", accountStatus=" + accountStatus
                + ", dateCreated=" + dateCreated
                + ", lastLogin=" + lastLogin
                + ", lastModified=" + lastModified
                + ", courseList=" + courseList
                + ", classList=" + classList
                + ", roleList=" + roleList
                + ", spareTimeRegisterList=" + spareTimeRegisterList
                + ", studentScoreList=" + studentScoreList
                + ", classList1=" + classList1
                + ", addressList=" + addressList
                + ", multipleChoiceQuestionList=" + multipleChoiceQuestionList
                + ", examinationAttemptList=" + examinationAttemptList
        + '}';
    }
}
