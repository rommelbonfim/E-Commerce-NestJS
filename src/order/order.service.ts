import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { UpdateOrderDto } from './dto/UpdateOrder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderStatus } from './enum/orderstatus.enum';
import { OrderItemEntity } from './orderitem.entity';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createOrder(userId: string, orderData: CreateOrderDTO) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const productIds = orderData.OrderItems.map((orderItem) => orderItem.productId);

    const relatedProducts = await this.productRepository.findBy({ id: In(productIds) });
    const orderEntity = new OrderEntity();

    orderEntity.status = OrderStatus.IN_PROCESS;
    orderEntity.usuario = user;

    const orderItemEntities = orderData.OrderItems.map((orderItem) => {
      const relatedProduct = relatedProducts.find((product) => product.id === orderItem.productId);
      const orderItemEntity = new OrderItemEntity();
      orderItemEntity.product = relatedProduct;
      orderItemEntity.salePrice = relatedProduct.price;
      orderItemEntity.quantity = orderItem.quantity;
      orderItemEntity.product.avaliable -= orderItem.quantity;
      return orderItemEntity;
    });

    const totalPrice = orderItemEntities.reduce((total, item) => {
      return total + item.salePrice * item.quantity;
    }, 0);

    orderEntity.orderitems = orderItemEntities;
    orderEntity.totalPrice = totalPrice;

    const createdOrder = await this.orderRepository.save(orderEntity);
    return createdOrder;
  }

  async getUserOrders(userId: string) {
    return this.orderRepository.find({
      where: {
        usuario: { id: userId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  async updateOrder(id: string, dto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });

    Object.assign(order, dto);

    return this.orderRepository.save(order);
  }
}