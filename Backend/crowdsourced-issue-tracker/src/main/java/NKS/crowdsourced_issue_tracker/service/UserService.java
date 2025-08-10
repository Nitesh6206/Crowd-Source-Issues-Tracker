package NKS.crowdsourced_issue_tracker.service;

import NKS.crowdsourced_issue_tracker.dto.UserDTO;
import NKS.crowdsourced_issue_tracker.model.User;
import NKS.crowdsourced_issue_tracker.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setCity(userDTO.getCity());
        user.setEnabled(true);
        return userRepository.save(user);
    }

    public Optional<UserDTO> getUserDetails(String username) {
        Optional<User> userDetails = userRepository.findByUsername(username);
        UserDTO userInfo = new UserDTO();
        if (!userDetails.isEmpty()) {
            User user = userDetails.get();
            userInfo.setUsername(user.getUsername());
            userInfo.setRole(user.getRole());
            userInfo.setEmail(user.getEmail());
            userInfo.setCity(user.getCity());
            userInfo.setBio(user.getBio());
            userInfo.setNumber(user.getNumber());
        }

        return Optional.of(userInfo);
    }

    public UserDTO UpdateUserDetails(UserDTO userDTO) {
        String username = userDTO.getUsername();
        System.out.println(username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with this username"));

        // Update fields
        user.setEmail(userDTO.getEmail());
        user.setBio(userDTO.getBio());
        user.setNumber(userDTO.getNumber());
        user.setCity(userDTO.getCity());

        // Save updated user
        userRepository.save(user);

        return userDTO;
    }
}