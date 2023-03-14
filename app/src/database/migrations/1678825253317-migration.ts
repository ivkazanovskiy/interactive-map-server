import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1678825253317 implements MigrationInterface {
  name = 'migration1678825253317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "map"
            ALTER COLUMN "width"
            SET DEFAULT '20'
        `);
    await queryRunner.query(`
            ALTER TABLE "map"
            ALTER COLUMN "height"
            SET DEFAULT '20'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "map"
            ALTER COLUMN "height" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "map"
            ALTER COLUMN "width" DROP DEFAULT
        `);
  }
}
