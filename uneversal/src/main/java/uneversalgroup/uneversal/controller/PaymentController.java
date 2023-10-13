package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uneversalgroup.uneversal.payload.PaymentDto;
import uneversalgroup.uneversal.repository.PaymentRepository;
import uneversalgroup.uneversal.service.PaymentService;
import uneversalgroup.uneversal.entity.Payment;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentRepository paymentRepository;

    @GetMapping()
    public HttpEntity<?> getAll(){
        List<Payment> all = paymentRepository.findAll();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/{id}")
    public HttpEntity<?> getPayment(@PathVariable UUID id) {
        List<PaymentDto> payment = paymentService.getPayment(id);
        return ResponseEntity.ok(payment);
    }

//    @PostMapping
//    public HttpEntity<?> addPayment(PaymentDto paymentDto) {
//        ApiResponse<?> apiResponse = paymentService.addPayment(paymentDto);
//        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
//    }
}

