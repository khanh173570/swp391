package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.service.OrderServiceImp;

import java.util.List;

@RestController
@RequestMapping("/order_request")
public class OrderController {
    @Autowired
    private OrderServiceImp orderServiceImp;
//    @PostMapping("/orders")
//    Order createOrder(@RequestBody OrderDTO orderDTO){
//        return orderServiceImp.createOrder(orderDTO);
//    }

    @PostMapping("/create")
    Order createOrder(@RequestBody OrderDTO orderDTO){
        return orderServiceImp.saveOrder(orderDTO);
    }

    @GetMapping("/getOrderByStatusInProgress")
    List<Order> getOrderByStatusInProgress(){
        return orderServiceImp.getOrders();
    }

    @GetMapping("/getOrder/{orderId}")
    Order getOrder(@PathVariable("orderId") String orderId){

        return orderServiceImp.getOrder(orderId);
    }

    @GetMapping("/getOrders")
    List<Order> getOrders(){
        return orderServiceImp.getAllOrders();
    }

    @PutMapping("/updateStatus/{orderId}")
    public Order updateOrderStatus(@PathVariable("orderId") String orderId, @RequestBody OrderDTO orderDTO) {
        return orderServiceImp.updateOrderStatus(orderId, orderDTO);
    }
}
