import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotificationsTable1761429650403 implements MigrationInterface {
  name = 'NotificationsTable1761429650403';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notifications"."notification" ("id" uuid NOT NULL, "title" character varying NOT NULL, "body" character varying, "userId" character varying NOT NULL, "taskId" character varying NOT NULL, "read" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notifications"."notification"`);
  }
}
