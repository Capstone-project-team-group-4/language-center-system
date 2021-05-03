package com.PhanLam.backend.service;

import com.PhanLam.backend.controller.DTO.SpareTimeRegisterRequest;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.SpareTimeRegisterRepository;
import com.PhanLam.backend.model.*;
import com.PhanLam.backend.service.common.Constant;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SpareTimeRegisterService {
    // Variables declaration:
    private SpareTimeRegisterRepository spareTimeRegisterRepository;
    private UserService userService;
    private CourseTypeService courseTypeService;
    private SlotService slotService;
    private JPAQueryFactory queryFactory;
    private ClassSessionService classSessionService;

    public SpareTimeRegisterService(SpareTimeRegisterRepository spareTimeRegisterRepository,
                                    UserService userService,
                                    CourseTypeService courseTypeService,
                                    SlotService slotService,
                                    ClassSessionService classSessionService,
                                    EntityManager entityManager) {
        this.spareTimeRegisterRepository = spareTimeRegisterRepository;
        this.userService = userService;
        this.courseTypeService = courseTypeService;
        this.slotService = slotService;
        this.classSessionService = classSessionService;
        queryFactory = new JPAQueryFactory(entityManager);
    }

    @Transactional(readOnly = true)
    public DataPage<SpareTimeRegister> getAllSpareTime(
            Integer teacherId
            , int pageIndex
            , int pageSize
    ) {
        User user = null;
        Sort.TypedSort<SpareTimeRegister> spareTimeSortInformation;
        Sort sortInformation;
        PageRequest pagingInformation;
        Page<SpareTimeRegister> spareTimePage;
        long totalRowCount;
        List<SpareTimeRegister> spareTimeHolder;
        DataPage<SpareTimeRegister> spareTimeDataPage;

        //handle abnormal case
        if (teacherId != null) {
            user = userService.getById(teacherId);
            boolean isTeacher = user.getRoleList().stream().anyMatch(i -> i.getRoleName().equals(Constant.ROLE_TEACHER));
            if (!isTeacher) {
                throw new InvalidRequestArgumentException("You don't have permission");
            }
        }

        if ((pageIndex < 0) || (pageSize <= 0)) {
            throw new InvalidRequestArgumentException(
                    "The page index number and page size number parameters "
                            + "cannot be less than zero." + System.lineSeparator()
                            + "Parameter name: pageIndex, pageSize"
            );
        }

        // handle list
        spareTimeSortInformation = Sort.sort(SpareTimeRegister.class);
        sortInformation
                = spareTimeSortInformation
                .by(SpareTimeRegister::getStatus).ascending().and(spareTimeSortInformation
                        .by(SpareTimeRegister::getLastModified).descending());
        pagingInformation = PageRequest.of(
                pageIndex
                , pageSize
                , sortInformation
        );
        spareTimePage = teacherId == null ? spareTimeRegisterRepository.findAll(pagingInformation) :
                spareTimeRegisterRepository.findAllByUserID(pagingInformation, user);

        totalRowCount = spareTimePage.getTotalElements();
        spareTimeHolder = spareTimePage.getContent();
        spareTimeDataPage = new DataPage(totalRowCount, spareTimeHolder);
        return spareTimeDataPage;

    }

    public void createSpareTimeRegister(SpareTimeRegisterRequest spareTimeRegisterRequest, Principal principal) {
        User teacher = userService.getByName(principal.getName());
        int courseTypeId = spareTimeRegisterRequest.getCourseTypeId();
        SpareTimeRegister spareTimeRegister = new SpareTimeRegister();
        spareTimeRegister.setUserID(teacher);
        spareTimeRegister.setLastModified(new Date());
        spareTimeRegister.setStatus(Constant.STATUS_PENDING);


        //validate request
        if (spareTimeRegisterRequest.getCourseTypeId() == null || spareTimeRegisterRequest.getListSlotId().size() == 0) {
            throw new InvalidRequestArgumentException("Must be choose at least 1 slot and 1 course type");
        }

        //check course type select
        if(getSpareRegisterByTeacherAndCourseType(teacher.getUserID(),courseTypeId).size() > 0 ){
            throw new InvalidRequestArgumentException("This teacher already register this type");
        }
        //set list course type
        List<CourseType> listCourseType = new ArrayList<>();
        listCourseType.add(courseTypeService.getCourseTypeById(spareTimeRegisterRequest.getCourseTypeId()));

        //set list slot
        List<Slot> listSlot = new ArrayList<>();
        for (int id : spareTimeRegisterRequest.getListSlotId()) {
            Slot slot = slotService.getById(id);

            //check teacher already have class in this slot or not
            ClassSession classSession = classSessionService.getClassSessionByTeacherAndSlot(teacher.getUserID(), id);
            if (classSession != null) {
                throw new InvalidRequestArgumentException("Teacher " + teacher.getUserName() + " already has class at slot " + slot.getSlotName());
            }
            listSlot.add(slot);
        }
        spareTimeRegister.setCourseTypeList(listCourseType);
        spareTimeRegister.setSlotList(listSlot);
        save(spareTimeRegister);
    }

    public void removeSpareTimeRegister(int spareTimeId) {
        Optional<SpareTimeRegister> spareTimeRegisterNullable = spareTimeRegisterRepository.findById(spareTimeId);
        if (!spareTimeRegisterNullable.isPresent()) {
            throw new NotFoundException("SpareTimeRegister");
        }
        SpareTimeRegister spareTimeRegister = spareTimeRegisterNullable.get();
        if (spareTimeRegister.getStatus() != Constant.STATUS_PENDING) {
            throw new InvalidRequestArgumentException("Only remove pending register");
        }
        remove(spareTimeRegister);

    }

    public void editSpareTimeRegister(SpareTimeRegisterRequest spareTimeRegisterRequest) {
        SpareTimeRegister spareTimeRegister = getById(spareTimeRegisterRequest.getSpareTimeRegisterId());
        int courseTypeId = spareTimeRegisterRequest.getCourseTypeId();
        spareTimeRegister.setLastModified(new Date());
        User teacher = spareTimeRegister.getUserID();

        //validate request
        if (spareTimeRegisterRequest.getCourseTypeId() == null || spareTimeRegisterRequest.getListSlotId().size() == 0) {
            throw new InvalidRequestArgumentException("Must be choose at least 1 slot and 1 course type");
        }

        //check course type select
        if(getSpareRegisterByTeacherAndCourseExcludeSpareTimeId(teacher.getUserID(),courseTypeId,spareTimeRegister.getSpareTimeID()).size() > 0 ){
            throw new InvalidRequestArgumentException("This teacher already register this type");
        }

        //set list course type
        List<CourseType> listCourseType = new ArrayList<>();
        listCourseType.add(courseTypeService.getCourseTypeById(spareTimeRegisterRequest.getCourseTypeId()));

        //set list slot
        List<Slot> listSlot = new ArrayList<>();
        for (int id : spareTimeRegisterRequest.getListSlotId()) {
            Slot slot = slotService.getById(id);

            //check teacher already have class in this slot or not
            ClassSession classSession = classSessionService.getClassSessionByTeacherAndSlot(teacher.getUserID(), id);
            if (classSession != null) {
                throw new InvalidRequestArgumentException("Teacher " + teacher.getUserName() + " already has class at slot " + slot.getSlotName());
            }
            listSlot.add(slot);
        }
        spareTimeRegister.setCourseTypeList(listCourseType);
        spareTimeRegister.setSlotList(listSlot);
        save(spareTimeRegister);
    }

    public void save(SpareTimeRegister spareTimeRegister) {
        spareTimeRegisterRepository.save(spareTimeRegister);
    }

    public void remove(SpareTimeRegister spareTimeRegister) {
        spareTimeRegisterRepository.delete(spareTimeRegister);
    }

    public void rejectSpareTimeById(int id) {
        SpareTimeRegister spareTimeRegister = getById(id);
        if (spareTimeRegister.getStatus() != Constant.STATUS_PENDING) {
            throw new InvalidRequestArgumentException("Only reject spare time which has status is PENDING");
        }
        spareTimeRegister.setStatus(Constant.STATUS_REJECTED);
        save(spareTimeRegister);
    }

    public SpareTimeRegister getById(int id) {
        Optional<SpareTimeRegister> nullableSpareTimeRegister = spareTimeRegisterRepository.findById(id);
        if (!nullableSpareTimeRegister.isPresent()) {
            throw new NotFoundException("SpareTimeRegister");
        }
        return nullableSpareTimeRegister.get();
    }

    private List<SpareTimeRegister> getSpareRegisterByTeacherAndCourseType(int teacherId, int courseTypeId) {
        QCourseType courseType;
        QSpareTimeRegister register;
        QueryResults<SpareTimeRegister> spareTimeRegister;
        courseType = new QCourseType("courseType");
        register = new QSpareTimeRegister("register");
        spareTimeRegister = queryFactory
                .selectFrom(register)
                .innerJoin(register.courseTypeList, courseType)
                .where(
                        courseType.typeID.eq(courseTypeId)
                                .and(register.userID.userID.eq(teacherId))
                                .and(register.status.ne(Constant.STATUS_REJECTED))

                ).fetchResults();
        return spareTimeRegister.getResults();
    }

    private List<SpareTimeRegister> getSpareRegisterByTeacherAndCourseExcludeSpareTimeId(int teacherId, int courseTypeId, int spareTimeId) {
        QCourseType courseType;
        QSpareTimeRegister register;
        QueryResults<SpareTimeRegister> spareTimeRegister;
        courseType = new QCourseType("courseType");
        register = new QSpareTimeRegister("register");
        spareTimeRegister = queryFactory
                .selectFrom(register)
                .innerJoin(register.courseTypeList, courseType)
                .where(
                        courseType.typeID.eq(courseTypeId)
                                .and(register.userID.userID.eq(teacherId))
                                .and(register.status.ne(Constant.STATUS_REJECTED))
                                .and(register.spareTimeID.ne(spareTimeId))

                ).fetchResults();
        return spareTimeRegister.getResults();
    }
}
