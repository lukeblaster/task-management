import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaMigration1760924905394 implements MigrationInterface {
    name = 'NomeDaMigration1760924905394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "responsibles"`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "responsibles" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "responsibles"`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "responsibles" text NOT NULL`);
    }

}
