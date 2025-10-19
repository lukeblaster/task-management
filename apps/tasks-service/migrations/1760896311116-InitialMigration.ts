import { MigrationInterface, QueryRunner } from 'typeorm';

export class NomeDaMigration1760896311116 implements MigrationInterface {
  name = 'NomeDaMigration1760896311116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS tasks
    AUTHORIZATION postgres;`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS tasks.comment
(
    id uuid NOT NULL,
    content character varying COLLATE pg_catalog."default" NOT NULL,
    task_id character varying COLLATE pg_catalog."default" NOT NULL,
    "authorId" character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id),
    CONSTRAINT "FK_91256732111f039be6b212d96cd" FOREIGN KEY (task_id)
        REFERENCES tasks.tasks (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS tasks.comment
    OWNER to postgres;`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS tasks.tasks
  (
    id character varying COLLATE pg_catalog."default" NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    deadline date NOT NULL,
    priority character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'LOW'::character varying,
    status character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'TO DO'::character varying,
    responsibles text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id)
  )

  TABLESPACE pg_default;

  ALTER TABLE IF EXISTS tasks.tasks
    OWNER to postgres;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS tasks
    AUTHORIZATION postgres;`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS tasks.comment
  (
    id uuid NOT NULL,
    content character varying COLLATE pg_catalog."default" NOT NULL,
    task_id character varying COLLATE pg_catalog."default" NOT NULL,
    "authorId" character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id),
    CONSTRAINT "FK_91256732111f039be6b212d96cd" FOREIGN KEY (task_id)
        REFERENCES tasks.tasks (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
  )

  TABLESPACE pg_default;

  ALTER TABLE IF EXISTS tasks.comment
    OWNER to postgres;`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS tasks.tasks
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    deadline date NOT NULL,
    priority character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'LOW'::character varying,
    status character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'TO DO'::character varying,
    responsibles text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS tasks.tasks
    OWNER to postgres;`);
  }
}
