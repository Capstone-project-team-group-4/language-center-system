/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.dal.repository_interface.CourseRepository;
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.*;
import com.PhanLam.backend.service.common.QueryFactoryGet;
import com.PhanLam.backend.service.common.SearchCriteria;
import com.PhanLam.backend.service.common.SearchSpecification;
import com.querydsl.core.QueryModifiers;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.data.jpa.domain.Specification;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

/**
 *
 * @author Phan Lam
 */
//@ExtendWith (MockitoExtension.class)
//public class UserServiceTests {
//
//    // Variables declaration:
//    @Mock
//    private UserRepository userRepository;
//    @Mock
//    private CourseRepository courseRepository;
//    @Mock
//    private Principal principal;
//    @Mock
//    private QueryFactoryGet queryFactoryGetter;
//    @InjectMocks
//    private UserService userService;
//
//    @Test
//    public void getLoggedInUserTest (){
//        String loggedInUserName;
//        Role role;
//        List<Role> roleHolder;
//        User user;
//        Optional<User> nullableUser;
//        LoggedInUser expectedOutput;
//        LoggedInUser output;
//
//        // Given
//        loggedInUserName = "Phan Lam";
//        when (principal.getName ()).thenReturn (loggedInUserName);
//        role = new Role ();
//        role.setRoleName ("ROLE_ADMIN");
//        roleHolder = new ArrayList<> ();
//        roleHolder.add (role);
//        user = new User ();
//        user.setUserName (loggedInUserName);
//        user.setRoleList (roleHolder);
//        nullableUser = Optional.ofNullable (user);
//        when (
//                userRepository.findByUserName (loggedInUserName)
//        ).thenReturn (nullableUser);
//        expectedOutput = new LoggedInUser (
//                loggedInUserName
//                , roleHolder
//                , user.getUserID()
//        );
//
//        // When
//        output = userService.getLoggedInUser (principal);
//
//        // Then
//        Assertions
//                .assertThat (expectedOutput)
//                .usingRecursiveComparison ()
//                .withStrictTypeChecking ()
//                .isEqualTo (output);
//    }
//
//    @Test
//    public void getAllUserWithUserNameIsNotTest (){
//        String userName;
//        int pageIndex;
//        int pageSize;
//        long totalRowCount;
//        User user;
//        List<User> userHolder;
//        TypedSort<User> userSortInformation;
//        Sort sortInformation;
//        PageRequest pagingInformation;
//        Page<User> userPage;
//        DataPage<User> expectedOutput;
//        DataPage<User> output;
//        String searchParam = "";
//
//        // Given
//        userName = "Phan Lam";
//
//        when (principal.getName ()).thenReturn (userName);
//        pageIndex = 0;
//        pageSize = 5;
//        totalRowCount = 20L;
//        user = new User ();
//        user.setUserName ("Tri");
//        userHolder = new ArrayList<> ();
//        userHolder.add (user);
//        userSortInformation = Sort.sort (User.class);
//            sortInformation
//                = userSortInformation.by (User::getFirstName).ascending ()
//                    .and (userSortInformation.by (User::getLastName)
//                            .ascending ()
//                    );
//        pagingInformation = PageRequest.of (
//                pageIndex
//                , pageSize
//                , sortInformation
//        );
//        SearchSpecification spec =
//                new SearchSpecification(new SearchCriteria("middleName", "forName", searchParam));
//
//        userPage = new PageImpl<> (
//                userHolder
//                , pagingInformation
//                , totalRowCount
//        );
//        when (
//                userRepository.findAllByUserNameIsNot (
//                        userName
//                        , Specification.where(spec)
//                        , pagingInformation
//                )
//        ).thenReturn (userPage);
//        expectedOutput = new DataPage<> (totalRowCount, userHolder);
//
//
//        // When
//        output = userService.getAllUserWithUserNameIsNot (
//                principal
//                , pageIndex
//                , pageSize
//                , searchParam
//        );
//
//        // Then
//        Assertions
//                .assertThat (expectedOutput)
//                .usingRecursiveComparison ()
//                .withStrictTypeChecking ()
//                .isEqualTo (output);
//    }
//
//    @Test
//    public void getAllStudentWithCourseIDIsNotTest (){
//        int courseID;
//        int pageIndex;
//        int pageSize;
//        long totalRowCount;
//        QueryResults<User> studentPage;
//        List<User> studentHolder;
//        User student;
//        DataPage<User> expectedOutput;
//        DataPage<User> output;
//        QueryModifiers queryModifiers;
//        JPAQueryFactory queryFactory;
//        QUser qStudent;
//        QRole qRole;
//        QCourse qCourse;
//        JPAQuery<User> query;
//
//        // Given
//        courseID = 1;
//        pageIndex = 0;
//        pageSize = 5;
//        totalRowCount = 20L;
//        when (courseRepository.existsById (courseID)).thenReturn (true);
//        student = new User ();
//        student.setUserName ("Son");
//        studentHolder = new ArrayList<> ();
//        studentHolder.add (student);
//        queryModifiers = new QueryModifiers (
//                Long.valueOf (pageSize)
//                , Long.valueOf (pageSize * pageIndex)
//        );
//        studentPage = new QueryResults<> (
//                studentHolder
//                , queryModifiers
//                , totalRowCount
//        );
//        queryFactory = Mockito.mock (JPAQueryFactory.class, "queryFactory");
//        when (queryFactoryGetter.getQueryFactory ()).thenReturn (queryFactory);
//        qStudent = new QUser ("student");
//        qRole = QRole.role;
//        qCourse = QCourse.course;
//        query = Mockito.mock (JPAQuery.class);
//        when (queryFactory.selectFrom (qStudent)).thenReturn (query);
//        when (query.distinct ()).thenReturn (query);
//        when (query.leftJoin (qStudent.roleList, qRole)).thenReturn (query);
//        when (query.leftJoin (qStudent.courseList, qCourse)).thenReturn (query);
//        when (
//                query.where (
//                        qRole.roleName.eq ("ROLE_STUDENT")
//                        .and (
//                                qCourse.courseID.ne (courseID)
//                                .or (qCourse.courseID.isNull ())
//                        )
//                )
//        ).thenReturn (query);
//        when (
//                query.orderBy (
//                        qStudent.firstName.asc ()
//                        , qStudent.lastName.asc ()
//                )
//        ).thenReturn (query);
//        when (query.limit (pageSize)).thenReturn (query);
//        when (query.offset (pageSize * pageIndex)).thenReturn (query);
//        when (query.fetchResults ()).thenReturn (studentPage);
//        expectedOutput = new DataPage<> (totalRowCount, studentHolder);
//
//        // When
//        output = userService.getAllStudentWithCourseIDIsNot (
//                courseID
//                , pageIndex
//                , pageSize
//        );
//
//        // Then
//        Assertions
//                .assertThat (expectedOutput)
//                .usingRecursiveComparison ()
//                .withStrictTypeChecking ()
//                .isEqualTo (output);
//    }
//}
