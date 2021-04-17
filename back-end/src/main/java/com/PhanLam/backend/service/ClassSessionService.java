package com.PhanLam.backend.service;

import com.PhanLam.backend.controller.DTO.ClassSessionRequest;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.ClassSessionRepository;
import com.PhanLam.backend.model.*;
import com.PhanLam.backend.service.common.Constant;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
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
                               SpareTimeRegisterService spareTimeRegisterService,
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

        //set information for classSession
        classSession.setCourseID(course);
        classSession.setSlot(slot);
        classSession.setTeacherID(spareTimeRegister.getUserID());
        classSession.setUserList(course.getUserList());
        classSession.setStatus(Constant.STATUS_ACTIVE_CLASS);
        classSession.setSpareTimeRegisterID(spareTimeRegister.getSpareTimeID());
        save(classSession);

        //change status register
        spareTimeRegister.setStatus(Constant.STATUS_APPROVED);
        spareTimeRegisterService.save(spareTimeRegister);
    }

    public void deleteClassById(int classId) {
        ClassSession classSession =getById(classId);
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
    public DataPage<ClassSession> getAllClassSession(int pageNumber, int pageSize, Integer userID, String role){
        Sort.TypedSort<ClassSession> classSessionSort;
        Sort sortInformation;
        PageRequest pagingInformation;
        Page<ClassSession> classSessionPage;
        long totalRowCount;
        List<ClassSession> classSessionList;
        DataPage<ClassSession> classSessionDataPage;
        User user;


        //handle abnormal case
        if (userID != null) {
            user = userService.getById(userID);
            if(role.equals(Constant.ROLE_STUDENT)) {
                boolean isStudent = user.getRoleList().stream().anyMatch(i -> i.getRoleName().equals(Constant.ROLE_STUDENT));
                if (!isStudent) {
                    throw new InvalidRequestArgumentException("You don't have permission");
                }
            }
            if(role.equals(Constant.ROLE_TEACHER)) {
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

        // handle list for admin
        classSessionSort = Sort.sort(ClassSession.class);
        sortInformation
                = classSessionSort
                .by(ClassSession::getSlot).ascending();
        pagingInformation = PageRequest.of(
                pageNumber
                , pageSize
                , sortInformation
        );
        if(userID == null) {
            classSessionPage = classSessionRepository.findAll(pagingInformation);

            totalRowCount = classSessionPage.getTotalElements();
            classSessionList = classSessionPage.getContent();
            classSessionDataPage = new DataPage(totalRowCount, classSessionList);
        }

        return null;
    }
}
