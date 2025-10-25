import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaMigration1760917565679 implements MigrationInterface {
    name = 'NomeDaMigration1760917565679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "authorId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "authorId"`);
    }

}
