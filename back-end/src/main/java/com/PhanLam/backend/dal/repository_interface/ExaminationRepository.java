/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.Course;
import com.PhanLam.backend.model.Examination;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Phan Lam
 */
public interface ExaminationRepository 
        extends JpaRepository<Examination, Integer> {

    @Override
    public Examination save (Examination exam);
    
    public Page<Examination> findAllByCourse (
            Course course
            , Pageable pagingInformation
    ); 

    @Override
    public boolean existsById (Integer examID);
    
    public boolean existsByCourseAndExamID (Course course, Integer examID);

    @Override
    public Optional<Examination> findById (Integer examID);
    
    @Override
    public void delete (Examination exam);

    @Override
    public Page<Examination> findAll (Pageable pagingInformation);
}
