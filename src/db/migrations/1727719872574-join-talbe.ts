import { MigrationInterface, QueryRunner } from "typeorm";

export class JoinTalbe1727719872574 implements MigrationInterface {
    name = 'JoinTalbe1727719872574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_5f4035564515762e47d19334f23"`);
        await queryRunner.query(`CREATE TABLE "products_categories_category" ("productsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_c8a2d1a94d8aee029af4c6be5c7" PRIMARY KEY ("productsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472c77dfe20a4c6d4258dc8379" ON "products_categories_category" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_62254eefb150c9a51119fe1a61" ON "products_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" ADD CONSTRAINT "FK_472c77dfe20a4c6d4258dc8379f" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" ADD CONSTRAINT "FK_62254eefb150c9a51119fe1a613" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_categories_category" DROP CONSTRAINT "FK_62254eefb150c9a51119fe1a613"`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" DROP CONSTRAINT "FK_472c77dfe20a4c6d4258dc8379f"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "productId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62254eefb150c9a51119fe1a61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472c77dfe20a4c6d4258dc8379"`);
        await queryRunner.query(`DROP TABLE "products_categories_category"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_5f4035564515762e47d19334f23" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
