package com.PhanLam.backend.service;

import com.PhanLam.backend.controller.DTO.ClassSessionRequest;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.ClassSessionRepository;
import com.PhanLam.backend.model.*;
import com.PhanLam.backend.service.common.Constant;
import com.PhanLam.backend.service.common.SearchCriteria;
import com.PhanLam.backend.service.common.SearchSpecification;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class ClassSessionService {
    private CourseTypeService courseTypeService;
    private CourseService courseService;
    private SpareTimeRegisterService spareTimeRegisterService;
    private SlotService slotService;
    private UserService userService;
    private JPAQueryFactory queryFactory;
    private ClassSessionRepository classSessionRepository;

    public ClassSessionService(ClassSessionRepository classSessionRepository,
                               CourseTypeService courseTypeService,
                               SlotService slotService,
                               EntityManager entityManager,
                               @Lazy SpareTimeRegisterService spareTimeRegisterService,
                               CourseService courseService,
                               UserService userService
    ) {
        this.classSessionRepository = classSessionRepository;
        this.courseTypeService = courseTypeService;
        this.slotService = slotService;
        this.spareTimeRegisterService = spareTimeRegisterService;
        this.courseService = courseService;
        this.userService = userService;
        queryFactory = new JPAQueryFactory(entityManager);
    }

    public void createClassSession(ClassSessionRequest classSessionRequest) {
        ClassSession classSession = new ClassSession();
        SpareTimeRegister spareTimeRegister = spareTimeRegisterService.getById(classSessionRequest.getSpareTimeRegisterID());
        Course course = courseService.getByCourseId(classSessionRequest.getCourseID());
        Slot slot = slotService.getById(classSessionRequest.getSlotID());
        User user = spareTimeRegister.getUserID();

        //validate request
        boolean isContainSlotInSpareRegister = spareTimeRegister.getSlotList()
                .stream()
                .anyMatch(s -> s.getSlotID() == classSessionRequest.getSlotID());
        if (!isContainSlotInSpareRegister) {
            throw new InvalidRequestArgumentException("Slot not in spare time register of teacher");
        }
        boolean isContainCourseTypeInSpareRegister = spareTimeRegister.getCourseTypeList().stream()
                .anyMatch(courseType -> courseType.getTypeID() == course.getCourseType().getTypeID());
        if (!isContainCourseTypeInSpareRegister) {
            throw new InvalidRequestArgumentException("CourseType not in spare time register of teacher");
        }

        //check if teacher also is student
        boolean isStudent = userService.isUserHaveInCourse(course.getCourseID(),user.getUserID());
        if(isStudent){
            throw new InvalidRequestArgumentException("The teacher also is student of this course");
        }

        //check student already have class in slot or not
        List<User> users = userService.getAllStudentsOfCourseAlreadyHaveClassInSlot(slot.getSlotID(),course.getCourseID());
        if(users.size() != 0){
            throw new InvalidRequestArgumentException("User "+users+" already have class in slot "+slot.getSlotName());
        }

        // check teacher
        ClassSession classByTeacherAndSlot = getClassSessionByTeacherAndSlot(user.getUserID(),slot.getSlotID());
        if(classByTeacherAndSlot !=null){
            throw new InvalidRequestArgumentException("Teacher " + user.getUserName() + " already has class at slot " + slot.getSlotName());
        }


        //set information for classSession
        classSession.setCourseID(course);
        classSession.setSlot(slot);
        classSession.setTeacherID(spareTimeRegister.getUserID());
        List<User> userList = new ArrayList<>();
        course.getUserList().stream().forEach(u ->userList.add(u));
        classSession.setUserList(userList);
        classSession.setStatus(Constant.STATUS_ACTIVE_CLASS);
        classSession.setLastModified(new Date());
        classSession.setSpareTimeRegisterID(spareTimeRegister.getSpareTimeID());
        save(classSession);

        //change status register
        spareTimeRegister.setStatus(Constant.STATUS_APPROVED);
        spareTimeRegisterService.save(spareTimeRegister);
    }

    public void deleteClassById(int classId) {
        ClassSession classSession = getById(classId);
        SpareTimeRegister spareTimeRegister = spareTimeRegisterService.getById(classSession.getSpareTimeRegisterID());

        //remove relate spareTimeRegister
        spareTimeRegister.setStatus(Constant.STATUS_PENDING);
        spareTimeRegisterService.save(spareTimeRegister);
        remove(classSession);
    }

    public void remove(ClassSession classSession) {
        classSessionRepository.delete(classSession);
    }

    public void save(ClassSession classSession) {
        classSessionRepository.save(classSession);
    }

    public ClassSession getById(int id) {
        Optional<ClassSession> nullableClassSession = classSessionRepository.findById(id);
        if (!nullableClassSession.isPresent()) {
            throw new NotFoundException("ClassSession");
        }
        return nullableClassSession.get();
    }

    @Transactional (readOnly = true)
    public DataPage<ClassSession> getAllClassSession(int pageNumber, int pageSize, Integer userID, String role,String searchParam) {
        Sort.TypedSort<ClassSession> classSessionSort;
        Sort sortInformation;
        PageRequest pagingInformation;
        Page<ClassSession> classSessionPage;
        long totalRowCount;
        List<ClassSession> classSessionList;
        DataPage<ClassSession> classSessionDataPage = null;
        User user = null;

        //handle abnormal case
        if (userID != null) {
            user = userService.getById(userID);
            if (role.equals(Constant.ROLE_STUDENT)) {
                boolean isStudent = user.getRoleList().stream().anyMatch(i -> i.getRoleName().equals(Constant.ROLE_STUDENT));
                if (!isStudent) {
                    throw new InvalidRequestArgumentException("You don't have permission");
                }
            }
            if (role.equals(Constant.ROLE_TEACHER)) {
                boolean isTeacher = user.getRoleList().stream().anyMatch(i -> i.getRoleName().equals(Constant.ROLE_TEACHER));
                if (!isTeacher) {
                    throw new InvalidRequestArgumentException("You don't have permission");
                }
            }
        }

        if ((pageNumber < 0) || (pageSize <= 0)) {
            throw new InvalidRequestArgumentException(
                    "The page index number and page size number parameters "
                            + "cannot be less than zero." + System.lineSeparator()
                            + "Parameter name: pageIndex, pageSize"
            );
        }

        //for search
        SearchSpecification spec =
                new SearchSpecification(new SearchCriteria("courseID.courseName", "like", searchParam));

        // handle list for admin
        classSessionSort = Sort.sort(ClassSession.class);
        sortInformation
                = classSessionSort
                .by(ClassSession::getStatus).descending().and(classSessionSort
                        .by(ClassSession::getLastModified).descending());
        pagingInformation = PageRequest.of(
                pageNumber
                , pageSize
                , sortInformation
        );
        if (userID == null) {
            classSessionPage = classSessionRepository.findAll( Specification.where(spec),pagingInformation);

            totalRowCount = classSessionPage.getTotalElements();
            classSessionList = classSessionPage.getContent();
            classSessionDataPage = new DataPage(totalRowCount, classSessionList);
        }

        // handle list for teacher
        else if (userID != null && role.equals(Constant.ROLE_TEACHER)) {
            SearchSpecification specTeacher =
                    new SearchSpecification(new SearchCriteria("teacherID.userID", "equal", userID));
            classSessionPage = classSessionRepository.findAll(Specification.where(spec).and(specTeacher),pagingInformation);

            totalRowCount = classSessionPage.getTotalElements();
            classSessionList = classSessionPage.getContent();
            classSessionDataPage = new DataPage(totalRowCount, classSessionList);
        }

        //handle list for student
        else if (userID != null && role.equals(Constant.ROLE_STUDENT)) {
            QueryResults<ClassSession> classSessionQueryResults;
            QUser student = new QUser("user");
            QClassSession classSession = new QClassSession("classSession");
            List<ClassSession> classSessionHolder;

            classSessionQueryResults = queryFactory
                    .selectFrom(classSession)
                    .innerJoin(classSession.userList, student)
                    .where(
                            student.userID.eq(user.getUserID()).and(classSession.courseID.courseName.like("%"+searchParam+"%"))
                    )
                    .orderBy(classSession.status.asc())
                    .limit(pageSize)
                    .offset(pageSize * pageNumber)
                    .fetchResults();
            totalRowCount = classSessionQueryResults.getTotal();
            classSessionHolder = classSessionQueryResults.getResults();
            classSessionDataPage = new DataPage<>(totalRowCount, classSessionHolder);
        } else {
            throw  new InvalidRequestArgumentException("Bad Request");
        }
        return classSessionDataPage;
    }

    public void cancelClassSession(int classSessionId){
        ClassSession classSession = getById(classSessionId);
        if(classSession.getStatus() != Constant.STATUS_ACTIVE_CLASS){
            throw new InvalidRequestArgumentException("Only cancel active class");
        }
        classSession.setStatus(Constant.STATUS_INACTIVE_CLASS);
        save(classSession);
    }

    public ClassSession getClassSessionByTeacherAndSlot(int teacherId, int slotId) {
        User user = userService.getById(teacherId);
        Slot slot = slotService.getById(slotId);
        return classSessionRepository.findByTeacherIDAndSlot(user,slot);
    }


}
