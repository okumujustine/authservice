import {MigrationInterface, QueryRunner} from "typeorm";

export class removedTokenExpiryFromUser1631635092783 implements MigrationInterface {
    name = 'removedTokenExpiryFromUser1631635092783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tokens" DROP COLUMN "expiry"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tokens" ADD "expiry" character varying NOT NULL`);
    }

}
