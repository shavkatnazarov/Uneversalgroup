package uneversalgroup.uneversal.entity;

import lombok.*;
import uneversalgroup.uneversal.entity.template.AbsNameEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Course extends AbsNameEntity {

    @Column(nullable = false)
    private double price; // kurs narxii

    @Column(nullable = false)
    private Integer expireDate;// kurs necha oy bulishi

    @Column(nullable = false)
    private String description; // kurs haqida malumot

    private UUID photoId; // kurs fotosi;
}
