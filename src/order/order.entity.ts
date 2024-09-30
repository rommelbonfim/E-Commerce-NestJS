import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from './enum/orderstatus.enum';
import { UserEntity } from '../user/user.entity';
import { OrderItemEntity } from './orderitem.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'valor_total', nullable: false })
  totalPrice: number;

  @Column({ name: 'status', enum: OrderStatus, nullable: false })
  status: OrderStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => UserEntity, (usuario) => usuario.pedidos)
  usuario: UserEntity

  @OneToMany(() => OrderItemEntity, (itemPedido) => itemPedido.order, {
    cascade: true,
  })
  orderitems: OrderItemEntity[];

}
