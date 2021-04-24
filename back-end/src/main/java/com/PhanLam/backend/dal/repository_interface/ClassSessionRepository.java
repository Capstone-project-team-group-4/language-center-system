package com.PhanLam.backend.dal.repository_interface;

import com.PhanLam.backend.model.ClassSession;
import com.PhanLam.backend.model.Slot;
import com.PhanLam.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassSessionRepository extends JpaRepository<ClassSession, Integer> {
    Page<ClassSession> findAllByTeacherID(Pageable pagingInformation, User teacher);

    ClassSession findByTeacherIDAndSlot(User user, Slot slot);
}
