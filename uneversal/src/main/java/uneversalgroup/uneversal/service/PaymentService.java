package uneversalgroup.uneversal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uneversalgroup.uneversal.entity.Payment;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.exception.ResourceNotFoundException;
import uneversalgroup.uneversal.impl.service.PaymentServiceImpl;
import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.PaymentDto;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.CourseRepository;
import uneversalgroup.uneversal.repository.PaymentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class PaymentService  implements PaymentServiceImpl {

    private final PaymentRepository paymentRepository;
    private final AuthRepository authRepository;
    private final CourseRepository courseRepository;
//    private final GroupRepository groupRepository;
   @Override
    public List<PaymentDto> getPayment(UUID userId) {
        User user = authRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException(404,"getUser","user",userId));
        List<PaymentDto> paymentDtos = new ArrayList<>();
        for (Payment payment : user.getPayment()) {
            PaymentDto build = PaymentDto.builder()
                    .payTypes(payment.getPayType())
                    .sum(payment.getSum())
                    .date(payment.getDate())
                    .build();
            paymentDtos.add(build);
        }
        return paymentDtos;
    }

    @Override
    public ApiResponse<?> addPayment(PaymentDto paymentDto) {
        return null;
    }

//    public ApiResponse<?> addPayment(PaymentDto paymentDto) {
//        try {
//
//            Group group = groupRepository.findById(paymentDto.getGroupId()).orElseThrow(() -> new ResourceNotFoundException(404, "getGroup","group",paymentDto.getGroupId()));
//            User user = authRepository.findById(paymentDto.getUserId()).orElseThrow(() -> new ResourceNotFoundException(404, "getUser","user",paymentDto.getUserId()));
//            for (User user1 : group.getPupil()) {
//                if (user1 == user) {
//                    Payment build = Payment.builder()
//                            .student(paymentDto.getStudent())
//                            .sum(paymentDto.getSum())
//                            .payType(paymentDto.getPayTypes())
//                            .sum(paymentDto.getSum())
//                            .date(paymentDto.getDate())
//                            .build();
//                    paymentRepository.save(build);
//                    if (LocalDate.now().toString().substring(5, 7).equals(paymentDto.getDate().substring(5, 7))) {
//                        IncomeStatistic statistic = incomeStatisticRepository.findIncomeStatisticByNowDate(LocalDate.now()).orElseThrow(() -> new ResourceNotFoundException(404, "income", "id", 1));
//                        statistic.setMonthly(statistic.getMonthly() + paymentDto.getSum());
//                        statistic.setAllS(statistic.getAllS() + paymentDto.getSum());
//                        incomeStatisticRepository.save(statistic);
//                        new ApiResponse<>("Tolandi", true);
//                    } else {
//                        IncomeStatistic build1 = IncomeStatistic.builder()
//                                .monthly(paymentDto.getSum())
//                                .allS(paymentDto.getSum())
//                                .nowDate(LocalDate.parse(paymentDto.getDate()))
//                                .build();
//                        incomeStatisticRepository.save(build1);
//                        new ApiResponse<>("Tolandi", true);
//                    }
//                }
//            }
//            return new ApiResponse<>(" Xatolik", false);
//        } catch (Exception e) {
//            return new ApiResponse<>("xatolik", false);
//        }
//    }




}
