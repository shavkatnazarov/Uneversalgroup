package uneversalgroup.uneversal.impl.service;

import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.PaymentDto;

import java.util.List;
import java.util.UUID;

public interface PaymentServiceImpl {
    List<PaymentDto> getPayment(UUID userId);
    ApiResponse<?> addPayment(PaymentDto paymentDto);
}
