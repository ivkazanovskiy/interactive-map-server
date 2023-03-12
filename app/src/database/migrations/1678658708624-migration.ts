import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1678658708624 implements MigrationInterface {
  name = 'migration1678658708624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "map"
            ADD "width" integer;

            UPDATE "map" SET "width"=20;

            ALTER TABLE "map" ALTER COLUMN "width" SET NOT NULL;
        `);
    await queryRunner.query(`
            ALTER TABLE "map"
            ADD "height" integer;

            UPDATE "map" SET "height"=20;

            ALTER TABLE "map" ALTER COLUMN "height" SET NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "map" DROP COLUMN "height"
        `);
    await queryRunner.query(`
            ALTER TABLE "map" DROP COLUMN "width"
        `);
  }
}
