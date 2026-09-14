import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Prepares "users" for keyset pagination over ("createdAt", id).
 *
 * The column drops to millisecond precision because that is all a JS Date can
 * carry: at microsecond precision the value in a cursor is a rounded copy of
 * the stored one, and the boundary row comes back on the next page as well.
 *
 * The index matches the row-value comparison and the ORDER BY exactly, so the
 * planner can seek straight to the cursor position instead of scanning.
 */
export class AddUsersCreatedAtIdIndex1789000000000 implements MigrationInterface {
    name = 'AddUsersCreatedAtIdIndex1789000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "createdAt" TYPE TIMESTAMP(3) WITH TIME ZONE`,
        );
        await queryRunner.query(
            `ALTER TABLE "games" ALTER COLUMN "createdAt" TYPE TIMESTAMP(3) WITH TIME ZONE`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_users_createdAt_id" ON "users" ("createdAt", "id")`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_users_createdAt_id"`);
        await queryRunner.query(
            `ALTER TABLE "games" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE`,
        );
    }
}
