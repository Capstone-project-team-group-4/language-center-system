package com.PhanLam.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "Comment", catalog = "LanguageCenterDB", schema = "dbo")
public class Comment {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "CommentId", nullable = false)
    private Integer CommentId;
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private User user;
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private ClassSession classSession;
    @Basic (optional = false)
    @NotNull
    @Column (name = "Content", nullable = false)
    private String content;
    @Column (name = "LastModified")
    @Temporal (TemporalType.TIMESTAMP)
    private Date lastModified;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getCommentId() {
        return CommentId;
    }

    public void setCommentId(Integer commentId) {
        CommentId = commentId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ClassSession getClassSession() {
        return classSession;
    }

    public void setClassSession(ClassSession classSession) {
        this.classSession = classSession;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }
}
