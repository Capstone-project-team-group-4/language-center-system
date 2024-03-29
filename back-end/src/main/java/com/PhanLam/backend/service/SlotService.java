package com.PhanLam.backend.service;

import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.SlotRepository;
import com.PhanLam.backend.model.*;
import com.PhanLam.backend.service.common.Constant;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class SlotService {
    private SlotRepository slotRepository;
    private JPAQueryFactory queryFactory;
    private SpareTimeRegisterService spareTimeRegisterService;

    public SlotService(SlotRepository slotRepository
            , EntityManager entityManager
            , @Lazy SpareTimeRegisterService spareTimeRegisterService) {
        this.slotRepository = slotRepository;
        this.spareTimeRegisterService = spareTimeRegisterService;
        queryFactory = new JPAQueryFactory (entityManager);
    }

    public Slot getById(int id) {
        Optional<Slot> slotNullAble = slotRepository.findById(id);
        if (!slotNullAble.isPresent()) {
            throw new NotFoundException("Slot");
        }
        return slotNullAble.get();
    }

    @Transactional (readOnly = true)
    public List<Slot> getAllSlotAvailableToCreateClass(int spareTimeId){

        //get teacher of spare time
        SpareTimeRegister spareTimeRegister = spareTimeRegisterService.getById(spareTimeId);
        User teacher = spareTimeRegister.getUserID();
        List<Integer> slotIds = spareTimeRegister.getSlotList()
                .stream()
                .map(Slot::getSlotID)
                .collect(Collectors.toList());

        //get list
        QClassSession classSession = new QClassSession("classSession");;
        QSlot slot = new QSlot("slot");
        QueryResults<Slot> slotQueryResults;

        slotQueryResults = queryFactory
                .selectFrom(slot)
                .leftJoin(slot.classSessionList, classSession)
                .where(classSession.isNull().or(classSession.status.eq(Constant.STATUS_INACTIVE_CLASS).or(classSession.teacherID.ne(teacher))).and(slot.slotID.in(slotIds)))
                .orderBy (slot.slotID.asc ())
                .fetchResults();
        return slotQueryResults.getResults();

    }
}
