/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.MultipleChoiceQuestion;
import com.PhanLam.backend.model.User;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Phan Lam
 */
public interface MultipleChoiceQuestionRepository 
        extends JpaRepository<MultipleChoiceQuestion, Integer> {
    
    public boolean existsByContent (String content);

    @Override
    public MultipleChoiceQuestion save (MultipleChoiceQuestion question);
    
    public Page<MultipleChoiceQuestion> findAllByCreator (
            User creator
            , Pageable pagingInformation
    );

    @Override
    public Optional<MultipleChoiceQuestion> findById (Integer questionID);

    @Override
    public void delete (MultipleChoiceQuestion question);
}
