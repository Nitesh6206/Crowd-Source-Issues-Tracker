package NKS.crowdsourced_issue_tracker.controller;

import NKS.crowdsourced_issue_tracker.dto.LoginRequest;
import NKS.crowdsourced_issue_tracker.dto.LoginResponse;
import NKS.crowdsourced_issue_tracker.dto.UserDTO;
import NKS.crowdsourced_issue_tracker.model.User;
import NKS.crowdsourced_issue_tracker.config.JwtService;
import NKS.crowdsourced_issue_tracker.repository.UserRepository;
import NKS.crowdsourced_issue_tracker.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private  final UserRepository userRepository;

    public AuthController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDTO userDTO) {
        User user = userService.registerUser(userDTO);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtService.generateToken(userDetails);

        Optional<User> userOpt = userRepository.findByUsername(userDetails.getUsername());

        LoginResponse response = new LoginResponse();
        response.setToken(jwt);
        response.setUsername(userDetails.getUsername());

        // Safely set city if user exists
        response.setCity(userOpt.map(User::getCity).orElse(null));

        // Extract role (removes "ROLE_" prefix if present)
        response.setRole(userDetails.getAuthorities().stream()
                .findFirst()
                .map(auth -> auth.getAuthority().replace("ROLE_", ""))
                .orElse(""));
        System.out.println(response);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/user-details")
    public ResponseEntity<Optional<UserDTO>> getUserDetails(){
       String  username= SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UserDTO> userDetails=userService.getUserDetails(username);

        return new ResponseEntity<>(userDetails, HttpStatus.OK);
    }
    @PutMapping("/update-user-details")
    public  ResponseEntity<UserDTO> updateUserDetails(@RequestBody UserDTO userDTO){
        System.out.println(userDTO);
        UserDTO userDTO1=userService.UpdateUserDetails(userDTO);

        return new ResponseEntity<>(userDTO1,HttpStatus.ACCEPTED);
    }
}