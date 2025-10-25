import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthTable1761431832266 implements MigrationInterface {
  name = 'AuthTable1761431832266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SCHEMA IF NOT EXISTS auth AUTHORIZATION postgres;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS auth CASCADE"`);
  }
}
