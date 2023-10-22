package uneversalgroup.uneversal.component;

import java.util.Date;

public class Main {
    public static void main(String[] args) {
        Date date = new Date(2023 - 1900, 10 - 1, 1);
        System.out.println(date.getDay());
        System.out.println(date);
//        System.out.println(date.getMonth() + 1);
//        System.out.println(date.getDate());
        System.out.println(date.getYear());

    }
}
