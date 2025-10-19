import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaMigration1760901391556 implements MigrationInterface {
    name = 'NomeDaMigration1760901391556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."comment" RENAME COLUMN "createdAt" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."comment" RENAME COLUMN "created_at" TO "createdAt"`);
    }

}
