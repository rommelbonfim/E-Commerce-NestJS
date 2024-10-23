import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelas1729605821819 implements MigrationInterface {
    name = 'CriaTabelas1729605821819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product-image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "productId" uuid, CONSTRAINT "PK_c6db6eaddc596c5b041b89c3a2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "price" integer NOT NULL, "avaliable" integer NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "sale_price" integer NOT NULL, "orderId" uuid, "productId" uuid, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valor_total" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "usuarioId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_categories_category" ("productsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_c8a2d1a94d8aee029af4c6be5c7" PRIMARY KEY ("productsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472c77dfe20a4c6d4258dc8379" ON "products_categories_category" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_62254eefb150c9a51119fe1a61" ON "products_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "product-image" ADD CONSTRAINT "FK_e0d3aac975dac94ca36615b6ab3" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_cdb99c05982d5191ac8465ac010" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_4c031d2198d28f09c6e75836d37" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" ADD CONSTRAINT "FK_472c77dfe20a4c6d4258dc8379f" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" ADD CONSTRAINT "FK_62254eefb150c9a51119fe1a613" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_categories_category" DROP CONSTRAINT "FK_62254eefb150c9a51119fe1a613"`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" DROP CONSTRAINT "FK_472c77dfe20a4c6d4258dc8379f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_4c031d2198d28f09c6e75836d37"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_cdb99c05982d5191ac8465ac010"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`ALTER TABLE "product-image" DROP CONSTRAINT "FK_e0d3aac975dac94ca36615b6ab3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62254eefb150c9a51119fe1a61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472c77dfe20a4c6d4258dc8379"`);
        await queryRunner.query(`DROP TABLE "products_categories_category"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product-image"`);
    }

}
