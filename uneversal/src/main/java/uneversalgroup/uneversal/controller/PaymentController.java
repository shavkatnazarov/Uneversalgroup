package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uneversalgroup.uneversal.impl.controller.PaymentControllerImpl;
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
public class PaymentController implements PaymentControllerImpl {

    private final PaymentService paymentService;
    private final PaymentRepository paymentRepository;

    @Override
    @GetMapping
    public HttpEntity<?> getAll() {
            List<Payment> all = paymentRepository.findAll();
            return ResponseEntity.ok(all);
        }

    @Override
    @GetMapping("/{id}")
    public HttpEntity<?> getPayment(UUID id) {
            List<PaymentDto> payment = paymentService.getPayment(id);
            return ResponseEntity.ok(payment);
        }

    @Override
   @PostMapping
    public HttpEntity<?> addPayment(PaymentDto paymentDto) {
        return null;
//        ApiResponse<?> apiResponse = paymentService.addPayment(paymentDto);
//        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    }

