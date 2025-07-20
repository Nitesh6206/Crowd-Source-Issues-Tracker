package NKS.crowdsourced_issue_tracker.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", ex.getMessage());
        response.put("statusCode", HttpStatus.BAD_REQUEST.value());
        response.put("status", HttpStatus.BAD_REQUEST.getReasonPhrase());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}