import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotificationsTable1761429650403 implements MigrationInterface {
  name = 'NotificationsTable1761429650402';
  public readonly transaction = false;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SCHEMA IF NOT EXISTS notifications AUTHORIZATION postgres; `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS notifications CASCADE"`);
  }
}
