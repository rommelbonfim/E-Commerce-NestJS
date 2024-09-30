import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListProductDto } from './dto/ListProduct.dto';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { PutProductDto } from './dto/PutProduct.dto';
import { CreateProductDto } from './dto/CreateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly produtoRepository: Repository<ProductEntity>,
  ) {}

  async criaProduto(dadosProduto: CreateProductDto) {
    const produtoEntity = new ProductEntity();

    produtoEntity.name = dadosProduto.name;
    produtoEntity.price = dadosProduto.price;
    produtoEntity.avaliable = dadosProduto.avaliable;
    produtoEntity.description = dadosProduto.description;
    produtoEntity.categories = dadosProduto.categories;
    produtoEntity.images = dadosProduto.images;

    return this.produtoRepository.save(produtoEntity);
  }

  async listProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        images: true,
        categories: true,
      },
    });
    const produtosLista = produtosSalvos.map(
      (produto) =>
        new ListProductDto(
          produto.id,
          produto.name,
          produto.categories,
          produto.images,
        ),
    );
    return produtosLista;
  }

  async atualizaProduto(id: string, novosDados: PutProductDto) {
    const entityName = await this.produtoRepository.findOneBy({ id });
    Object.assign(entityName, novosDados);
    return this.produtoRepository.save(entityName);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
