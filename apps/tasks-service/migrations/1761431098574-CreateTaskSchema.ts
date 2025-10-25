import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotificationsTable1761431098574 implements MigrationInterface {
  name = 'NotificationsTable1761431098574';
  public readonly transaction = false;
  public readonlytransaction = false;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SCHEMA IF NOT EXISTS tasks AUTHORIZATION postgres;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS tasks CASCADE`);
  }
}
