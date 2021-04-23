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
import com.PhanLam.backend.model.*;
import com.PhanLam.backend.service.common.Constant;
import com.PhanLam.backend.service.common.QueryFactoryGet;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

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
    private CourseService courseService;
    private ClassSessionService classSessionService;
    private QueryFactoryGet queryFactoryGetter;

    public UserService (
            UserRepository userRepository
            , CourseRepository courseRepository
            , EntityManager entityManager
            , @Lazy ClassSessionService classSessionService
            , @Lazy CourseService courseService
            , QueryFactoryGet queryFactoryGetter
    ){
        this.userRepository = userRepository;
        this.classSessionService = classSessionService;
        this.courseRepository = courseRepository;
        this.queryFactoryGetter = queryFactoryGetter;
        this.courseService = courseService;
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

    public User getById(int userID){
        return userRepository.findById(userID).orElseThrow();
    }


    public User getByName(String userName){
        return userRepository.findByUserName(userName).orElseThrow();
    }

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
    public List<User> getAllStudentsOfCourseAlreadyHaveClassInSlot(int slotId,int courseId){
        QCourse course;
        QClassSession classSession;
        QUser user;
        QueryResults<User> studentResults;

        course = new QCourse("course");
        classSession = new QClassSession("classSession");
        user = new QUser("user");
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
        ClassSession classSession = classSessionService.getById (classId);
        student = new QUser("student");
        qRole = QRole.role;
        qClassSession = QClassSession.classSession;
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
