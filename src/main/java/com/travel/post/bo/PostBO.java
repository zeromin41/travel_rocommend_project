package com.travel.post.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travel.post.mapper.PostMapper;

@Service
public class PostBO {
	
	@Autowired
	private PostMapper postMapper;
	
	//글 추가 메소드
	public void addPost(int userId, String userLoginId, String subject, String content) {
		postMapper.insertPost(userId, userLoginId, subject, content);
	}
}