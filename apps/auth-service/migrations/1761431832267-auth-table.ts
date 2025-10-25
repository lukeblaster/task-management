import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthTable1761431832267 implements MigrationInterface {
    name = 'AuthTable1761431832267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth"."users" ("id" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" text NOT NULL, "hashedRt" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth"."users"`);
    }

}
