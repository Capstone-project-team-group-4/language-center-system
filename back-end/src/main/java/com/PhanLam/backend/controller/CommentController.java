package com.PhanLam.backend.controller;

import com.PhanLam.backend.controller.DTO.CommentRequest;
import com.PhanLam.backend.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public void createComment(@RequestBody @Valid CommentRequest commentRequest
    ) {
        commentService.createComment(commentRequest);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public void viewCommentOfStudent(CommentRequest commentRequest
    ) {
        commentService.createComment(commentRequest);
    }
}
