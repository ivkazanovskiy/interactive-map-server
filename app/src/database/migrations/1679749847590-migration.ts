import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1679749847590 implements MigrationInterface {
  name = 'migration1679749847590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_to_session"
            ADD CONSTRAINT "ONE_USER_PER_SESSION" UNIQUE ("user_id", "session_id")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_to_session" DROP CONSTRAINT "ONE_USER_PER_SESSION"
        `);
  }
}
