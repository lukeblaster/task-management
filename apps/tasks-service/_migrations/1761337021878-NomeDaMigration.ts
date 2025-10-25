import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaMigration1761337021878 implements MigrationInterface {
    name = 'NomeDaMigration1761337021878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks"."comment" ("id" uuid NOT NULL, "content" character varying NOT NULL, "task_id" character varying NOT NULL, "authorName" character varying NOT NULL, "authorId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks"."audit_log" ("id" character varying NOT NULL, "message" character varying NOT NULL, "task_id" character varying NOT NULL, "authorId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_07fefa57f7f5ab8fc3f52b3ed0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks"."tasks" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "deadline" date NOT NULL, "priority" character varying NOT NULL DEFAULT 'LOW', "status" character varying NOT NULL DEFAULT 'TODO', "responsibles" text array NOT NULL, "authorId" character varying NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks"."comment" ADD CONSTRAINT "FK_91256732111f039be6b212d96cd" FOREIGN KEY ("task_id") REFERENCES "tasks"."tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks"."audit_log" ADD CONSTRAINT "FK_c1767e7d007c92632fad62c1e21" FOREIGN KEY ("task_id") REFERENCES "tasks"."tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."audit_log" DROP CONSTRAINT "FK_c1767e7d007c92632fad62c1e21"`);
        await queryRunner.query(`ALTER TABLE "tasks"."comment" DROP CONSTRAINT "FK_91256732111f039be6b212d96cd"`);
        await queryRunner.query(`DROP TABLE "tasks"."tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"."audit_log"`);
        await queryRunner.query(`DROP TABLE "tasks"."comment"`);
    }

}
