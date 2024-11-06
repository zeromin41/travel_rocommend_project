package com.travel.post.mapper;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.travel.post.domain.Post;

@Mapper
public interface PostMapper {
	
	//글 생성 mapper
	public void insertPost(
			@Param("userId") int userId, 
			@Param("userLoginId") String userLoginId,
			@Param("subject") String subject, 
			@Param("content") String content,
			@Param("startDate") String startDate,
			@Param("endDate") String endDate);
	
	//글 리스트 들고오는 mapper
	public List<Post> selectPostList(String userLoginId);

	//글 삭제 mapper
	public void deletePostByPostId(int id);
	
	//글 수정 mapper
	public void updatePostByPostId(
			@Param("postId") int postId, 
			@Param("subject") String subject, 
			@Param("content") String content,
			@Param("startDate") String startDate,
			@Param("endDate") String endDate);
}