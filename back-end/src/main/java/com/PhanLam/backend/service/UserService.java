/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.CourseRepository;
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.LoggedInUser;
import com.PhanLam.backend.model.QCourse;
import com.PhanLam.backend.model.QRole;
import com.PhanLam.backend.model.QUser;
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.model.User;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.security.Principal;
import java.util.Optional;
import javax.persistence.EntityManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author roboc
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class UserService {
    
    // Variables declaration:
    private UserRepository userRepository;
    private CourseRepository courseRepository;
    private JPAQueryFactory queryFactory; 

    public UserService (
            UserRepository userRepository
            , CourseRepository courseRepository
            , EntityManager entityManager
    ){
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        queryFactory = new JPAQueryFactory (entityManager);
    }

    @Transactional (readOnly = true)
    public LoggedInUser getLoggedInUser (Principal principal){
        LoggedInUser loggedInUser;
        String userName;
        Optional<User> nullableUser;
        User user;
        List<Role> roleHolder;

        userName = principal.getName ();
        nullableUser = userRepository.findByUserName (userName);
        user = nullableUser.get ();
        roleHolder = user.getRoleList ();
        loggedInUser = new LoggedInUser (userName, roleHolder);
        return loggedInUser;
    }
    
    @Transactional (readOnly = true)
    public List<User> getAllUserWithUserNameIsNot (
            Principal principal
            ,int pageNumber
            , int pageSize
    ){
        String userName;
        TypedSort<User> userSortInformation;
        Sort sortInformation;
        PageRequest pagingInformation;
        List<User> userHolder;
        
        if ((pageNumber >= 0) && (pageSize >= 0)){
            userName = principal.getName ();
            userSortInformation = Sort.sort (User.class);
            sortInformation 
                = userSortInformation.by (User::getFirstName).ascending ()
                .and (userSortInformation.by (User::getLastName)
                        .ascending ()
                );
            pagingInformation = PageRequest.of (
                    pageNumber
                    , pageSize
                    , sortInformation
            );
            userHolder = userRepository.findAllByUserNameIsNot (
                    userName
                    , pagingInformation
            );
            return userHolder;
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The page number and page size number parameters "
                    + "cannot be less than zero." + System.lineSeparator () 
                    + "Parameter name: pageNumber, pageSize"
            );
        }
    }
    
    @Transactional (readOnly = true)
    public DataPage<User> getAllStudentWithCourseIDIsNot (
            int courseID
            , int pageIndex
            , int pageSize
    ){
        boolean courseExists;
        List<User> studentHolder;
        QUser student;
        QRole role;
        QCourse course;
        QueryResults<User> studentPage;
        DataPage<User> studentDataPage;
        long totalRowCount;
        
        courseExists = courseRepository.existsById (courseID);
        if (courseExists == false){
            throw new NotFoundException ("Course ID");
        }
        else {
            if ((pageIndex >= 0) && (pageSize > 0)){
                student = new QUser ("student");
                role = QRole.role;
                course = QCourse.course;
                studentPage = queryFactory
                        .selectFrom (student).distinct ()
                            .leftJoin (student.roleList, role)
                            .leftJoin (student.courseList, course)
                        .where (
                                role.roleName.eq ("ROLE_STUDENT")
                                .and (course.courseID.ne (courseID))
                        )
                        .orderBy (
                                student.firstName.asc ()
                                , student.lastName.asc ()
                        )
                        .limit (pageSize)
                        .offset (pageSize * pageIndex)
                        .fetchResults ();
                totalRowCount = studentPage.getTotal ();
                studentHolder = studentPage.getResults ();
                studentDataPage = new DataPage<> (totalRowCount, studentHolder);
                return studentDataPage;
            }
            else {
                throw new InvalidRequestArgumentException (
                        "The page number and page size number parameters "
                        + "cannot be less than zero." + System.lineSeparator () 
                        + "Parameter name: pageNumber, pageSize"
                );
            }
        }
    }
    
    @Transactional (readOnly = true)
    public DataPage<User> getAllStudentByCourseID (
            int courseID
            , int pageIndex
            , int pageSize
    ){
        boolean courseExists;
        List<User> studentHolder;
        QUser student;
        QRole role;
        QCourse course;
        QueryResults<User> studentPage;
        DataPage<User> studentDataPage;
        long totalRowCount;
        
        courseExists = courseRepository.existsById (courseID);
        if (courseExists == false){
            throw new NotFoundException ("Course ID");
        }
        else {
            if ((pageIndex >= 0) && (pageSize > 0)){
                student = new QUser ("student");
                role = QRole.role;
                course = QCourse.course;
                studentPage = queryFactory
                        .selectFrom (student).distinct ()
                            .leftJoin (student.roleList, role)
                            .leftJoin (student.courseList, course)
                        .where (
                                role.roleName.eq ("ROLE_STUDENT")
                                .and (course.courseID.eq (courseID))
                        )
                        .orderBy (
                                student.firstName.asc ()
                                , student.lastName.asc ()
                        )
                        .limit (pageSize)
                        .offset (pageSize * pageIndex)
                        .fetchResults ();
                totalRowCount = studentPage.getTotal ();
                studentHolder = studentPage.getResults ();
                studentDataPage = new DataPage<> (totalRowCount, studentHolder);
                return studentDataPage;
            }
            else {
                throw new InvalidRequestArgumentException (
                        "The page number and page size number parameters "
                        + "cannot be less than zero." + System.lineSeparator () 
                        + "Parameter name: pageNumber, pageSize"
                );
            }
        }
    }
    
    public void disableUserByID (int userID, Principal principal){
        Optional <User> nullableUser;
        User user;
        String userName;
        
        nullableUser = userRepository.findById (userID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("User ID");
        }
        else {
            userName = principal.getName ();
            user = nullableUser.get ();
            if (user.getUserName ().equals (userName)){
                throw new InvalidRequestArgumentException (
                        "Disable current logged in user is not allowed !"
                );
            }
            else {
                user.setAccountStatus ("Disabled");
            }
        }
    }
    
    public void enableUserByID (int userID){
        Optional <User> nullableUser;
        User user;
        
        nullableUser = userRepository.findById (userID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("User ID");
        }
        else {
            user = nullableUser.get ();
            user.setAccountStatus ("Active");
        }
    }
    
    public void deleteUserByID (int userID, Principal principal){
        Optional <User> nullableUser;
        User user;
        String userName;
        
        nullableUser = userRepository.findById (userID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("User ID");
        }
        else {
            userName = principal.getName ();
            user = nullableUser.get ();
            if (user.getUserName ().equals (userName)){
                throw new InvalidRequestArgumentException (
                        "Delete current logged in user is not allowed !"
                );
            }
            else {
                userRepository.delete (user);
            }
        }
    }
    
    public List<User> getAll() {
        return userRepository.findAll();
    }
    
    public User updateStudent(User user, int userID) {
        User updatedUser = new User();
        updatedUser.setUserID(userID);
        updatedUser.setUserName(user.getUserName());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setDob(user.getDob());
        updatedUser.setPhoneNumber(user.getPhoneNumber());
        updatedUser.setGender(user.getGender());
        updatedUser.setJob(user.getJob());
        updatedUser.setPhotoURI(user.getPhotoURI());
        updatedUser.setSelfDescription(user.getSelfDescription());
        updatedUser.setPassword(user.getPassword());
        updatedUser.setAccountStatus(user.getAccountStatus());
        updatedUser.setDateCreated(user.getDateCreated());
        return userRepository.save(updatedUser);
    }
    
    public User getById(int userID){
        return userRepository.findById(userID).orElseThrow();
    }
    
    public Optional<User> showInfo(User user, int userID) {
        User showUser = new User();
        showUser.getUserID();
        showUser.getUserName();
        showUser.getFirstName();
        showUser.getLastName();
        showUser.getEmail();
        showUser.getDob();
        showUser.getPhoneNumber();
        showUser.getGender();
        showUser.getJob();
        showUser.getPhotoURI();
        showUser.getSelfDescription();
        showUser.getPassword();
        showUser.getAccountStatus();
        return userRepository.findById(userID);
    }

/*Teacher manager - begin*/
    public boolean checkUserIfTeacher(int teacherID) {
        Optional<User> nullableUser;
        User user;
        List<Role> roleHolder;
        int i;
        Role role;
        boolean thisUserIsTeacher;

        nullableUser = userRepository.findById (userID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("User ID");
        } else {
            user = nullableUser.get ();
            roleHolder = user.getRoleList ();
            thisUserIsTeacher = false;
            for (i = 0; i < roleHolder.size (); i++){
                role = roleHolder.get (i);
                if (role.getRoleName ().equals ("ROLE_TEACHER")){
                    thisUserIsTeacher = true;
                    break;
                }
            }
            if (thisUserIsTeacher == false){
                throw new InvalidRequestArgumentException (
                        "This user is not a teacher." + System.lineSeparator ()
                        + "Parameter name: userID"
                );
            }
        }
    }

    public void createTeacher (User user){
        String teacherName;
        boolean teacherAlreadyExist;
        Date dateCreated;
        teacherName = user.getUserName ();
        teacherAlreadyExist = userRepository.existsByTeacherName (teacherName);
        if (teacherAlreadyExist == true){
            throw new AlreadyExistException ("Teacher Name");
        }
        else {
            dateCreated = new Date ();
            user.setDateCreated (dateCreated);
            userRepository.save (user);
        }
    }

    @Transactional (readOnly = true)
    public DataPage<User> getAllTeacher (
            int pageIndex
            , int pageSize
            , User user
    ){
        int teacherID;
        boolean thisUserIsTeacher;
        List<User> userHolder;
        PageRequest pagingInformation;
        Page<User> userPage;
        TypedSort<User> userSortInformation;
        Sort sortInformation; 
        DataPage<User> userDataPage;
        long totalRowCount;
        
        teacherID = user.getUserID ();
        thisUserIsTeacher = userRepository.checkUserIfTeacher (teacherID);
        if ((pageIndex >= 0) && (pageSize > 0) && thisUserIsTeacher == true){
            userSortInformation = Sort.sort (User.class);
            sortInformation 
                = userSortInformation
                    .by (User::getUserName).ascending ();
            pagingInformation = PageRequest.of (
                    pageIndex
                    , pageSize
                    , sortInformation
            );
            userPage = userRepository.findAll (pagingInformation);
            totalRowCount = userPage.getTotalElements ();  
            userHolder = userPage.getContent ();
            userDataPage = new DataPage<> (totalRowCount, userHolder);
            return userDataPage;
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The page number and page size number parameters "
                    + "cannot be less than zero." + System.lineSeparator () 
                    + "Parameter name: pageNumber, pageSize"
            );
        }
    }
    
    public void updateTeacher (int teacherID, User updatedTeacher){
        Optional <User> nullableUser;
        User user;
        Date lastModified;
        
        nullableUser = userRepository.findById (teacherID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("Teacher ID");
        }
        else {
            user = nullableUser.get ();
            user.setUserName (updatedUser.getUserName ());
            user.setFirstName (updatedUser.getFirstName ());
            user.setMiddleName (updatedUser.getMiddleName ());
            user.setLastName (updatedUser.getLastName ());
            user.setEmail (updatedUser.getEmail ());
            user.setDob (updatedUser.getDob ());
            user.setPhoneNumber (updatedUser.getPhoneNumber ());
            user.setGender (updatedUser.getGender ());
            user.setJob (updatedUser.getJob ());
            user.setPhotoURI (updatedUser.getPhotoURI ());
            user.setSelfDescription (updatedUser.getSelfDescription ());
            user.setAccountStatus (updatedUser.getAccountStatus ());
            user.setDateCreated (updatedUser.getDateCreated ());
            user.setLastLogin (updatedUser.getLastLogin ());
            lastModified = new Date ();
            user.setLastModified (lastModified);
        }
    }
    
    public void deleteTeacherByID (int teacherID){
        Optional <User> nullableUser;
        User user;
        
        nullableUser = userRepository.findById (teacherID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("Teacher ID");
        }
        else {
            user = nullableUser.get ();
            userRepository.delete (user);
        }
    }

/*Teacher manager - end*/
}
