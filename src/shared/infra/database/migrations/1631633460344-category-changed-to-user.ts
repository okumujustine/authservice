import {MigrationInterface, QueryRunner} from "typeorm";

export class categoryChangedToUser1631633460344 implements MigrationInterface {
    name = 'categoryChangedToUser1631633460344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tokens" DROP CONSTRAINT "FK_75b4131a67ff4991db94fbac394"`);
        await queryRunner.query(`ALTER TABLE "public"."tokens" RENAME COLUMN "categoryId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`ALTER TABLE "public"."tokens" RENAME COLUMN "userId" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "public"."tokens" ADD CONSTRAINT "FK_75b4131a67ff4991db94fbac394" FOREIGN KEY ("categoryId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
