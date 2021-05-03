/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.MultipleChoiceQuestion;
import com.PhanLam.backend.model.QuestionOption;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Phan Lam
 */
public interface QuestionOptionRepository 
        extends JpaRepository<QuestionOption, Integer> {

    @Override
    public QuestionOption save (QuestionOption questionOption);

    @Override
    public Optional<QuestionOption> findById (Integer optionID);
    
    public int countByMultipleChoiceQuestionAndIsCorrectAnswer (
            MultipleChoiceQuestion question
            , boolean isCorrectAnswer
    );
}
