/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.Lesson;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author This MC
 */
public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    
    @Override
    public Page<Lesson> findAll (Pageable pagingInformation);
    
    public boolean existsByLessonName (String lessonName);
    
    public Page<Lesson> findByCourseID_CourseID(Integer courseID, Pageable pagingInformation);
    
    @Override
    public Lesson save (Lesson lesson);

    @Override
    public Optional<Lesson> findById (Integer lessonID);

    @Override
    public void delete (Lesson lesson);
}
