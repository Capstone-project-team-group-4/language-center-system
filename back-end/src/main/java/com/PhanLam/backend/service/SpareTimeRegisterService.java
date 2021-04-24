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

    public SpareTimeRegisterService(SpareTimeRegisterRepository spareTimeRegisterRepository,
                                    UserService userService,
                                    CourseTypeService courseTypeService,
                                    SlotService slotService,
                                    EntityManager entityManager) {
        this.spareTimeRegisterRepository = spareTimeRegisterRepository;
        this.userService = userService;
        this.courseTypeService = courseTypeService;
        this.slotService = slotService;
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
                .by(SpareTimeRegister::getSpareTimeID).ascending();
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
        SpareTimeRegister spareTimeRegister = new SpareTimeRegister();
        spareTimeRegister.setUserID(teacher);
        spareTimeRegister.setLastModified(new Date());
        spareTimeRegister.setStatus(Constant.STATUS_PENDING);

        //validate request
        if (spareTimeRegisterRequest.getListCourseTypeId().size() == 0 || spareTimeRegisterRequest.getListSlotId().size() == 0) {
            throw new InvalidRequestArgumentException("Must be choose at least 1 slot and 1 course type");
        }

        //set list course type
        List<CourseType> listCourseType = new ArrayList<>();
        for (int id : spareTimeRegisterRequest.getListCourseTypeId()) {
            listCourseType.add(courseTypeService.getCourseTypeById(id));
        }

        //set list slot
        List<Slot> listSlot = new ArrayList<>();
        for (int id : spareTimeRegisterRequest.getListSlotId()) {
            Slot slot = slotService.getById(id);

            //check teacher already register this slot or not
            List<SpareTimeRegister> spareTimeRegisters = getSpareRegisterByTeacherAndSlot(teacher.getUserID(), slot.getSlotID());
            if (spareTimeRegisters.size() > 0) {
                throw new InvalidRequestArgumentException("Teacher " + teacher.getUserName() + " has already register slot " + slot.getSlotID());
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
        spareTimeRegister.setLastModified(new Date());
        User teacher = spareTimeRegister.getUserID();

        //validate request
        if (spareTimeRegisterRequest.getListCourseTypeId().size() == 0 || spareTimeRegisterRequest.getListSlotId().size() == 0) {
            throw new InvalidRequestArgumentException("Must be choose at least 1 slot and 1 course type");
        }

        //set list course type
        List<CourseType> listCourseType = new ArrayList<>();
        for (int id : spareTimeRegisterRequest.getListCourseTypeId()) {
            listCourseType.add(courseTypeService.getCourseTypeById(id));
        }

        //set list slot
        List<Slot> listSlot = new ArrayList<>();
        for (int id : spareTimeRegisterRequest.getListSlotId()) {
            Slot slot = slotService.getById(id);

            //check teacher already register this slot or not
            List<SpareTimeRegister> spareTimeRegisters = getSpareRegisterByTeacherAndSlotExcludeSpareTimeId(teacher.getUserID(), slot.getSlotID(), spareTimeRegister.getSpareTimeID());
            if (spareTimeRegisters.size() > 0) {
                throw new InvalidRequestArgumentException("Teacher " + teacher.getUserName() + " has already register slot " + slot.getSlotID());
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

    private List<SpareTimeRegister> getSpareRegisterByTeacherAndSlot(int teacherId, int slotId) {
        QSlot slot;
        QSpareTimeRegister register;
        QueryResults<SpareTimeRegister> spareTimeRegister;
        slot = new QSlot("slot");
        register = new QSpareTimeRegister("register");
        spareTimeRegister = queryFactory
                .selectFrom(register)
                .innerJoin(register.slotList, slot)
                .where(
                        slot.slotID.eq(slotId)
                                .and(register.userID.userID.eq(teacherId))
                                .and(register.status.ne(Constant.STATUS_REJECTED))

                ).fetchResults();
        return spareTimeRegister.getResults();
    }

    private List<SpareTimeRegister> getSpareRegisterByTeacherAndSlotExcludeSpareTimeId(int teacherId, int slotId, int spareTimeId) {
        QSlot slot;
        QSpareTimeRegister register;
        QueryResults<SpareTimeRegister> spareTimeRegister;
        slot = new QSlot("slot");
        register = new QSpareTimeRegister("register");
        spareTimeRegister = queryFactory
                .selectFrom(register)
                .innerJoin(register.slotList, slot)
                .where(
                        slot.slotID.eq(slotId)
                                .and(register.userID.userID.eq(teacherId))
                                .and(register.status.ne(Constant.STATUS_REJECTED))
                                .and(register.spareTimeID.ne(spareTimeId))

                ).fetchResults();
        return spareTimeRegister.getResults();
    }
}
