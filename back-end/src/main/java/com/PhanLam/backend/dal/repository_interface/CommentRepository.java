package com.PhanLam.backend.dal.repository_interface;

import com.PhanLam.backend.model.ClassSession;
import com.PhanLam.backend.model.Comment;
import com.PhanLam.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Comment findAllByUserAndClassSession(User user, ClassSession classSession) ;

}
