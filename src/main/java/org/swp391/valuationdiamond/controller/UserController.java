package org.swp391.valuationdiamond.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.UserDTO;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.service.UserServiceImp;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user_request")
public class UserController {
    @Autowired
    private UserServiceImp userServiceImp;

    //hàm đăng ký thông thường
    @PostMapping("/create")
    User createUser(@RequestBody @Valid UserDTO userDTO){

        return userServiceImp.createUser(userDTO);
    }
    //hàm đăng ký với google
//    @PostMapping("/signup-google")
//    User signupWithGoogle(@RequestBody OAuth2AuthenticationToken token) {
//        return token.getPrincipal().getAttributes();
//        return userServiceImp.signupWithGoogle(token);
//    }

//    @GetMapping("/login-google")
//    public User signupOrLoginWithGoogle(OAuth2AuthenticationToken token) {
//        return userServiceImp.signupOrLoginWithGoogle(token);
//    }

//    @GetMapping("/signup-google")
//    Map<String, Object> currentUser(OAuth2AuthenticationToken token){
//        return token.getPrincipal().getAttributes();
//    }



    //hàm login

//    @GetMapping("/login")
//    User login(@RequestParam String email, @RequestParam String password){
//        return userServiceImp.login(email, password);
//    }
    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> loginRequest) {
        String userId = loginRequest.get("userId");
        String password = loginRequest.get("password");
        return userServiceImp.login(userId, password);
    }

    @GetMapping("/getUser/{userId}")
    User getStaff(@PathVariable("userId") String userId){

        return userServiceImp.getStaff(userId);
    }

    @GetMapping("/getStaff")
    List<User> getStaffs(){

        return userServiceImp.getStaffs();
    }
    @GetMapping("/getAUser/{userId}")
        User getAUser(@PathVariable("userId") String userId ){

        return userServiceImp.getAUser(userId);
        }
    }


//}
