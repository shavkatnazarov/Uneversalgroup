package uneversalgroup.uneversal.entity;

import lombok.*;
import uneversalgroup.uneversal.entity.enums.PayTypeName;
import uneversalgroup.uneversal.entity.template.AbsEntity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "pay_type")
public class PayType extends AbsEntity {
    @Enumerated(value = EnumType.STRING)
    private PayTypeName payTypeName;
}
