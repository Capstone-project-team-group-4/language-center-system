/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

import com.PhanLam.backend.model.Lesson;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author roboc
 */
@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer>{
    @Override
    public List<Lesson> findAll();
    
    @Query("select l from Lesson l where l.courseID.courseID = ?1")
    public List<Lesson> findAllByCourseID(Integer courseID);
    
    @Query("select l from Lesson l where l.lessonID = ?1")
    public Lesson findByID(Integer lessonID);
}
