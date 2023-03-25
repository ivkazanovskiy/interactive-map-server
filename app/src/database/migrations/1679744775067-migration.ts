import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1679744775067 implements MigrationInterface {
  name = 'migration1679744775067';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_to_session" (
                "id" SERIAL NOT NULL,
                "isAccepted" boolean NOT NULL DEFAULT 'false',
                "user_id" integer,
                "session_id" integer,
                CONSTRAINT "PK_5e39b13ae7fb841e3bb51631292" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user_to_session"
            ADD CONSTRAINT "FK_0c80a40b14a26b24350d9f8298c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_to_session"
            ADD CONSTRAINT "FK_5cf7df3039a53d0473b14e43cff" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_to_session" DROP CONSTRAINT "FK_5cf7df3039a53d0473b14e43cff"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_to_session" DROP CONSTRAINT "FK_0c80a40b14a26b24350d9f8298c"
        `);
    await queryRunner.query(`
            DROP TABLE "user_to_session"
        `);
  }
}
