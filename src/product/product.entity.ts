import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany, ManyToMany, JoinTable
} from "typeorm";
import { ProductImageEntity } from './product-image.entity';
import { CategoryEntity } from './category.entity';
import { CategoryDTO } from "./dto/CreateProduct.dto";
import { OrderItemEntity } from "../order/orderitem.entity";

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'avaliable', nullable: false })
  avaliable: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => ProductImageEntity,
    (produtoImagemEntity) => produtoImagemEntity.product,
    { cascade: true, eager: true },
  )
  images: ProductImageEntity[];

  @ManyToMany(
    () => CategoryEntity,
    (categoryEntity) => categoryEntity.products,
    { cascade: true, eager: true },
  )
  @JoinTable()  // Isso cria a tabela de junção para o relacionamento ManyToMany
  categories: CategoryDTO[];

  @OneToMany(() => OrderItemEntity, (itemPedido) => itemPedido.product)
  orderitems: OrderItemEntity[];

}
