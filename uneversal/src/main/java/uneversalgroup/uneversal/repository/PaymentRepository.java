package uneversalgroup.uneversal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uneversalgroup.uneversal.entity.Payment;

import java.util.UUID;

public  interface PaymentRepository  extends JpaRepository<Payment,UUID> {
}
