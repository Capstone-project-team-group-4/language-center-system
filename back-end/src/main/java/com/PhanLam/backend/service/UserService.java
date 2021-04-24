/*
 * UserService.java
 *
 * All Rights Reserved
 * Copyright (c) 2021 FPT University
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.CourseRepository;
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.*;
import com.PhanLam.backend.service.common.Constant;
import com.PhanLam.backend.service.common.QueryFactoryGet;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Lazy;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

/**
 * UserService class <br>
 * 
 * <pre>
 * Service class for managing User objects
 * </pre>
 * 
 * @author roboc
 * @author Phan Lam
 * @version 1.0
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class UserService {
     
    /**
     * Variables declaration:
     * - userRepository
     * - courseRepository
     * - queryFactory
     */
    private UserRepository userRepository;
    private CourseRepository courseRepository;
    private JPAQueryFactory queryFactory;
    private CourseService courseService;
    private ClassSessionService classSessionService;
    private QueryFactoryGet queryFactoryGetter;
    
    /**
     * Constructor<br>
     * 
     * <pre>
     * This constructs a UserService with a specified 
     * userRepository, courseRepository and entityManager
     * </pre>
     * 
     * @param userRepository UserRepository
     * @param courseRepository CourseRepository
     * @param entityManager  EntityManager
     */
    public UserService (
            UserRepository userRepository
            , CourseRepository courseRepository
            , @Lazy ClassSessionService classSessionService
            , @Lazy CourseService courseService
            , QueryFactoryGet queryFactoryGetter
    ){
        this.userRepository = userRepository;
        this.classSessionService = classSessionService;
        this.courseRepository = courseRepository;
        this.queryFactoryGetter = queryFactoryGetter;
        this.courseService = courseService;
    }
    
    /**
     * getLoggedInUser<br>
     * 
     * <pre>
     * Method will get currently logged in user:
     * </pre>
     * 
     * @param principal
     * @return loggedInUser
     */
    public LoggedInUser getLoggedInUser (Principal principal){
        LoggedInUser loggedInUser;
        String userName;
        Optional<User> nullableUser;
        User user;
        List<Role> roleHolder;
        Date lastLogin;

        userName = principal.getName ();
        nullableUser = userRepository.findByUserName (userName);
        user = nullableUser.get ();
        lastLogin = new Date ();
        user.setLastLogin (lastLogin);
        roleHolder = user.getRoleList ();
        loggedInUser = new LoggedInUser (userName, roleHolder);
        return loggedInUser;
    }
    
    /**
     * getAllUserWithUserNameIsNot<br>
     * 
     * <pre>
     * Method will get all users with username
     * </pre>
     * 
     * @param principal 
     * @param pageIndex
     * @param pageSize
     * @return userDataPage
     * @throws InvalidRequestArgumentException
     */
    @Transactional (readOnly = true)
    public DataPage<User> getAllUserWithUserNameIsNot (
            Principal principal
            , int pageIndex
            , int pageSize
    ){
        String userName;
        TypedSort<User> userSortInformation;
        Sort sortInformation;
        PageRequest pagingInformation;
        List<User> userHolder;
        Page<User> userPage;
        long totalRowCount;
        DataPage<User> userDataPage;
        
        if ((pageIndex >= 0) && (pageSize >= 0)){
            userName = principal.getName ();
            userSortInformation = Sort.sort (User.class);
            sortInformation
                = userSortInformation.by (User::getFirstName).ascending ()
                    .and (userSortInformation.by (User::getLastName)
                            .ascending ()
                    );
            pagingInformation = PageRequest.of (
                    pageIndex
                    , pageSize
                    , sortInformation
            );
            userPage = userRepository.findAllByUserNameIsNot (
                    userName
                    , pagingInformation
            );
            totalRowCount = userPage.getTotalElements ();
            userHolder = userPage.getContent ();
            userDataPage = new DataPage<> (totalRowCount, userHolder);
            return userDataPage;
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The page index number and page size number parameters "
                    + "cannot be less than zero." + System.lineSeparator ()
                    + "Parameter name: pageIndex, pageSize"
            );
        }
    }
    
    /**
     * getAllStudentWithCourseIDIsNot<br>
     * 
     * <pre>
     * Method will get all students with 
     * </pre>
     * 
     * @param courseID
     * @param pageIndex
     * @param pageSize
     * @return studentDataPage
     * @throws InvalidRequestArgumentException
     */
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
            throw new NotFoundException ("Course");
        }
        else {
            if ((pageIndex >= 0) && (pageSize > 0)){
                student = new QUser ("student");
                role = QRole.role;
                course = QCourse.course;
                queryFactory = queryFactoryGetter.getQueryFactory ();
                studentPage = queryFactory
                        .selectFrom (student).distinct ()
                            .leftJoin (student.roleList, role)
                            .leftJoin (student.courseList, course)
                        .where (
                                role.roleName.eq ("ROLE_STUDENT")
                                .and (
                                        course.courseID.ne (courseID)
                                        .or (course.courseID.isNull ())
                                )
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
                        "The page index number and page size number parameters "
                        + "cannot be less than zero." + System.lineSeparator ()
                        + "Parameter name: pageIndex, pageSize"
                );
            }
        }
    }
    
    /**
     * getAllStudentByCourseID<br>
     * 
     * <pre>
     * Method will get all students by course id
     * </pre>
     * 
     * @param courseID
     * @param pageIndex
     * @param pageSize
     * @return studentDataPage
     * @throws InvalidRequestArgumentException
     */
    @Transactional (readOnly = true)
    public DataPage<User> getAllStudents (         
            int pageIndex
            , int pageSize
    ){
        List<User> studentHolder;
        QUser student;
        QRole role;
        QueryResults<User> studentPage;
        DataPage<User> studentDataPage;
        long totalRowCount;
        
        if ((pageIndex >= 0) && (pageSize > 0)){
                student = new QUser ("student");
                role = QRole.role;
                queryFactory = queryFactoryGetter.getQueryFactory ();
                studentPage = queryFactory
                        .selectFrom (student)
                            .leftJoin (student.roleList, role)                          
                        .where (
                                role.roleName.eq ("ROLE_STUDENT")                            
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
                        "The page index number and page size number parameters "
                        + "cannot be less than zero." + System.lineSeparator () 
                        + "Parameter name: pageIndex, pageSize"
                );
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
            throw new NotFoundException ("Course");
        }
        else {
            if ((pageIndex >= 0) && (pageSize > 0)){
                student = new QUser ("student");
                role = QRole.role;
                course = QCourse.course;
                queryFactory = queryFactoryGetter.getQueryFactory ();
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
                        "The page index number and page size number parameters "
                        + "cannot be less than zero." + System.lineSeparator ()
                        + "Parameter name: pageIndex, pageSize"
                );
            }
        }
    }
    
    /**
     * disableUserByID<br>
     * 
     * <pre>
     * Method will disable user by user id
     * </pre>
     * 
     * @param userID
     * @param principal 
     * @throws NotFoundException
     * @throws InvalidRequestArgumentException
     */
    public void disableUserByID (int userID, Principal principal){
        Optional <User> nullableUser;
        User user;
        String userName;

        nullableUser = userRepository.findById (userID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("User");
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
    
    /**
     * enableUserByID<br>
     * 
     * <pre>
     * Method will enable user by user id
     * </pre>
     * 
     * @param userID 
     */
    public void enableUserByID (int userID){
        Optional <User> nullableUser;
        User user;

        nullableUser = userRepository.findById (userID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("User");
        }
        else {
            user = nullableUser.get ();
            user.setAccountStatus ("Active");
        }
    }
    
    /**
     * deletaUserByID<br>
     * 
     * <pre>
     * Method will delete user by user id
     * </pre>
     * 
     * @param userID
     * @param principal 
     */
    public void deleteUserByID (int userID, Principal principal){
        Optional <User> nullableUser;
        User user;
        String userName;

        nullableUser = userRepository.findById (userID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("User");
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
    
    /**
     * updateStudent<br>
     * 
     * <pre>
     * Method will update infor of user
     * </pre>
     * 
     * @param user
     * @param userID
     * @return user
     */
    public User updateStudent(User user, int userID) {
        User updatedUser = new User();
        updatedUser.setUserID(userID);
        updatedUser.setUserName(user.getUserName());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setMiddleName(user.getMiddleName());
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

    /**
     * getById<br>
     * 
     * <pre>
     * Method will 
     * </pre>
     * 
     * @param userID
     * @return user
     */
    public User getById(int userID){
        return userRepository.findById(userID).orElseThrow();
    }

    public User getByName(String userName){
        return userRepository.findByUserName(userName).orElseThrow();
    }

    /**
     * showInfo<br>
     * 
     * <pre>
     * Method will get information of user by id
     * </pre>
     * 
     * @param user
     * @param userID
     * @return user
     */
    public User showInfo(User user, int userID) {
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
        return userRepository.findById(userID).orElseThrow();
    }
    
    /**
     * getProfileByUserName<br>
     * 
     * <pre>
     * Method will get information of user data by username
     * </pre>
     * 
     * @param userName
     * @return user
     */
    public User getProfileByUserName(String userName){
        return userRepository.findByUserName(userName).orElseThrow();
    }
    
    public User updateProfile(User user, String userName) {
        User updatedUser = userRepository.findByUserName(userName).orElseThrow();
        updatedUser.setUserID(user.getUserID());
        updatedUser.setUserName(user.getUserName());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setMiddleName(user.getMiddleName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setDob(user.getDob());
        updatedUser.setPhoneNumber(user.getPhoneNumber());
        updatedUser.setGender(user.getGender());
        updatedUser.setJob(user.getJob());
        updatedUser.setPhotoURI(user.getPhotoURI());
        updatedUser.setSelfDescription(user.getSelfDescription());
        updatedUser.setAccountStatus(user.getAccountStatus());
        updatedUser.setDateCreated(user.getDateCreated());
        return userRepository.save(updatedUser);
    }

    public List<User> getAllStudentsOfCourseAlreadyHaveClassInSlot(int slotId,int courseId){
        QCourse course;
        QClassSession classSession;
        QUser user;
        QueryResults<User> studentResults;

        course = new QCourse("course");
        classSession = new QClassSession("classSession");
        user = new QUser("user");
        queryFactory = queryFactoryGetter.getQueryFactory ();
        studentResults = queryFactory
                .selectFrom(user)
                .innerJoin(user.courseList, course)
                .innerJoin(course.classSession, classSession)
                .where(classSession.slot.slotID.eq(slotId).and(course.courseID.eq(courseId)).and(classSession.status.ne(Constant.STATUS_ACTIVE_CLASS)))
                .fetchResults();
        return studentResults.getResults();
    }

    @Transactional (readOnly = true)
    public DataPage<User> getAllStudentByClassId (
            int classId
            , int pageIndex
            , int pageSize
    ){
        List<User> studentHolder;
        QUser student;
        QRole qRole;
        QClassSession qClassSession;
        QueryResults<User> studentPage;
        DataPage<User> studentDataPage;
        long totalRowCount;

        //validate request
        if ((pageIndex < 0) || (pageSize <= 0)) {
            throw new InvalidRequestArgumentException(
                    "The page index number and page size number parameters "
                            + "cannot be less than zero." + System.lineSeparator()
                            + "Parameter name: pageIndex, pageSize"
            );
        }

        //get list
        student = new QUser("student");
        qRole = QRole.role;
        qClassSession = QClassSession.classSession;
        queryFactory = queryFactoryGetter.getQueryFactory ();
        studentPage = queryFactory
                        .selectFrom(student).distinct()
                        .leftJoin(student.roleList, qRole)
                        .leftJoin(student.classList, qClassSession)
                        .where(
                                qRole.roleName.eq("ROLE_STUDENT")
                                        .and(qClassSession.classID.eq(classId))
                        )
                        .orderBy(
                                student.firstName.asc()
                                , student.lastName.asc()
                        )
                        .limit(pageSize)
                        .offset(pageSize * pageIndex)
                        .fetchResults();
        totalRowCount = studentPage.getTotal();
        studentHolder = studentPage.getResults();
        studentDataPage = new DataPage<>(totalRowCount, studentHolder);
        return studentDataPage;
    }

    public boolean isUserHaveInCourse(int courseId,int userId){
        Course course = courseService.getByCourseId(courseId);
        User user = getById(userId);
        if(course.getUserList().stream().anyMatch(u -> u.getUserID() == user.getUserID())){
            return true;
        }
        return false;
    }
}
