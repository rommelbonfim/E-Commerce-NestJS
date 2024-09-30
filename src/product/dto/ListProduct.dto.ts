class ListaCaracteristicaProdutoDTO {
  name: string;
  description: string;
}

class ListaImagemProdutoDTO {
  url: string;
  description: string;
}

export class ListProductDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly category: ListaCaracteristicaProdutoDTO[],
    readonly images: ListaImagemProdutoDTO[],
  ) {}
}
