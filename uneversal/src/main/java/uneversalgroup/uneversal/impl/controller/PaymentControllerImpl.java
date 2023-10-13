package uneversalgroup.uneversal.impl.controller;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.PathVariable;
import uneversalgroup.uneversal.payload.PaymentDto;

import java.util.UUID;

public interface PaymentControllerImpl {
    HttpEntity<?> getAll();
    HttpEntity<?> getPayment(@PathVariable UUID id);
    HttpEntity<?> addPayment(PaymentDto paymentDto);
}
