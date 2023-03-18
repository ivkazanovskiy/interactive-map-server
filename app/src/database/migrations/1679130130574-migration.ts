import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1679130130574 implements MigrationInterface {
  name = 'migration1679130130574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "session" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "campaign_id" integer,
                CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "refresh_token" (
                "id" SERIAL NOT NULL,
                "token" character varying NOT NULL,
                "user_id" integer,
                CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying,
                "google_id" character varying,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "campaign" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "user_id" integer,
                CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "map" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT FALSE,
                "width" integer NOT NULL DEFAULT '20',
                "height" integer NOT NULL DEFAULT '20',
                "campaign_id" integer,
                CONSTRAINT "PK_3b08de72489b3d4471b74516819" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "session"
            ADD CONSTRAINT "FK_e08a12c27bb64d120af9f8e3a68" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "campaign"
            ADD CONSTRAINT "FK_9fe77978fc1aff6b180cfce5e77" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "map"
            ADD CONSTRAINT "FK_ca377ec6f2198cc3d1faba6c859" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "map" DROP CONSTRAINT "FK_ca377ec6f2198cc3d1faba6c859"
        `);
    await queryRunner.query(`
            ALTER TABLE "campaign" DROP CONSTRAINT "FK_9fe77978fc1aff6b180cfce5e77"
        `);
    await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"
        `);
    await queryRunner.query(`
            ALTER TABLE "session" DROP CONSTRAINT "FK_e08a12c27bb64d120af9f8e3a68"
        `);
    await queryRunner.query(`
            DROP TABLE "map"
        `);
    await queryRunner.query(`
            DROP TABLE "campaign"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "refresh_token"
        `);
    await queryRunner.query(`
            DROP TABLE "session"
        `);
  }
}
