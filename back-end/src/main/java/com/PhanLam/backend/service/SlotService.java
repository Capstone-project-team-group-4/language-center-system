package com.PhanLam.backend.service;

import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.CourseTypeRepository;
import com.PhanLam.backend.dal.repository_interface.SlotRepository;
import com.PhanLam.backend.model.CourseType;
import com.PhanLam.backend.model.Slot;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class SlotService {
    private SlotRepository slotRepository;

    public SlotService (SlotRepository slotRepository){
        this.slotRepository = slotRepository;
    }

    public Slot getSlotById(int id){
        Optional<Slot> slotNullAble = slotRepository.findById(id);
        if (!slotNullAble.isPresent()) {
            throw new NotFoundException("CourseType");
        }
        return slotNullAble.get();
    }
}
