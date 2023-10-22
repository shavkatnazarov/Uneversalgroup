package uneversalgroup.uneversal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uneversalgroup.uneversal.entity.PupilAttendanceMonth;

import java.util.UUID;

public interface PupilAttendanceMonthRepository extends JpaRepository<PupilAttendanceMonth, UUID> {
}
