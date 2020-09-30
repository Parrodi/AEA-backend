import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1601319734864 implements MigrationInterface {
    name = 'migration1601319734864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "user_id" integer NOT NULL, "seen" boolean NOT NULL, "userId" uuid, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "user_type_enum" AS ENUM('local', 'federal')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" "user_type_enum" NOT NULL DEFAULT 'local'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'asigner', 'normal')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "user_role_enum" NOT NULL DEFAULT 'normal'`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
