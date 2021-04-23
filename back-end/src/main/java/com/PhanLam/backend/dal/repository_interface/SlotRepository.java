package com.PhanLam.backend.dal.repository_interface;

import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlotRepository extends JpaRepository<Slot, Integer> {
}
