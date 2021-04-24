package com.PhanLam.backend.service;

import com.PhanLam.backend.controller.DTO.CommentRequest;
import com.PhanLam.backend.dal.repository_interface.CommentRepository;
import com.PhanLam.backend.model.ClassSession;
import com.PhanLam.backend.model.Comment;
import com.PhanLam.backend.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class CommentService {
    private UserService userService;
    private CommentRepository commentRepository;
    private ClassSessionService classSessionService;

    public CommentService(CommentRepository commentRepository, UserService userService, ClassSessionService classSessionService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.classSessionService = classSessionService;
    }
    public void createComment(CommentRequest commentRequest){
        ClassSession classSession = classSessionService.getById(commentRequest.getClassID());
        User user = userService.getById(commentRequest.getUserID());

        //find comment exist or not
        Comment comment = commentRepository.findAllByUserAndClassSession(user,classSession);
        if(comment == null){
            comment = new Comment();
        }
        comment.setUser(user);
        comment.setClassSession(classSession);
        comment.setContent(commentRequest.getContent());
        comment.setLastModified(new Date());
        save(comment);
    }


    public void save(Comment comment){
        commentRepository.save(comment);
    }
}
