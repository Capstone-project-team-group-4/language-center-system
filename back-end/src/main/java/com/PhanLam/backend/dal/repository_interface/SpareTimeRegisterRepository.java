package com.PhanLam.backend.dal.repository_interface;

import com.PhanLam.backend.model.QSpareTimeRegister;
import com.PhanLam.backend.model.RegisterForm;
import com.PhanLam.backend.model.SpareTimeRegister;
import com.PhanLam.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpareTimeRegisterRepository extends JpaRepository<SpareTimeRegister, Integer> {
    Page<SpareTimeRegister> findAllByUserID (Pageable pagingInformation, User userId);

    Page<SpareTimeRegister> findAll (Pageable pagingInformation);

    SpareTimeRegister save (SpareTimeRegister spareTimeRegister);

}
