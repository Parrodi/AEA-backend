import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1601925798479 implements MigrationInterface {
    name = 'migration1601925798479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "seen" boolean NOT NULL, "userId" uuid, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "hearing_name_enum" AS ENUM('Audiencia de Conciliación demanda y excepciones', 'Audiencia de Ofrecimiento y Admisión de pruebas', 'Audiencia incidental', 'Audiencia de Desahogo de Pruebas', 'Confesional de la parte actora', 'Interrogatorio Libre de la parte actora', 'Testimonial de la parte actora', 'Inspección de la parte actora', 'Pericial de parte actora', 'Ratificación de documentos de la parte actora', 'Pericial médica', 'Toma de muestras', 'Confesional de la parte demandada', 'Interrogatorio Libre de la parte demandada', 'Testimonial de la parte demandada', 'Inspección de la parte demandada', 'Pericial de la parte actora', 'Ratificación de documentos de la parte demandada')`);
        await queryRunner.query(`CREATE TABLE "hearing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "hearing_name_enum" NOT NULL DEFAULT 'Audiencia de Conciliación demanda y excepciones', "date" TIMESTAMP NOT NULL, "time" integer NOT NULL, "lawyerId" uuid, CONSTRAINT "PK_9a5ad1f15d540f0d70860aba349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_type_enum" AS ENUM('local', 'federal')`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'asigner', 'normal')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "type" "users_type_enum" NOT NULL DEFAULT 'local', "role" "users_role_enum" NOT NULL DEFAULT 'normal', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "process_type_enum" AS ENUM('local', 'federal')`);
        await queryRunner.query(`CREATE TABLE "process" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "number" integer NOT NULL, "actor" character varying NOT NULL, "defendant" character varying NOT NULL, "type" "process_type_enum" NOT NULL DEFAULT 'local', "currentUserId" uuid, "assignmentId" uuid, "hearingId" uuid, CONSTRAINT "REL_0436c47e4e8d4ce83eaae32ea0" UNIQUE ("hearingId"), CONSTRAINT "PK_d5e3ab0f6df55ee74ca24967952" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "assignment_user_role_enum" AS ENUM('admin', 'asigner', 'normal')`);
        await queryRunner.query(`CREATE TABLE "assignment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "time_limit" integer NOT NULL, "user_role" "assignment_user_role_enum" NOT NULL DEFAULT 'normal', "nextAssignmentId" uuid, CONSTRAINT "UQ_ca46f5aefa97a7f3322b347be3d" UNIQUE ("name"), CONSTRAINT "REL_eb57ac97913ffdb48b7c3e9254" UNIQUE ("nextAssignmentId"), CONSTRAINT "PK_43c2f5a3859f54cedafb270f37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hearing" ADD CONSTRAINT "FK_043567915ef5570ce2e9896ee22" FOREIGN KEY ("lawyerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_8ba5a001803e6af606163fe4008" FOREIGN KEY ("currentUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_7fba1cf729a29aa558885a7fdb8" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_0436c47e4e8d4ce83eaae32ea06" FOREIGN KEY ("hearingId") REFERENCES "hearing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignment" ADD CONSTRAINT "FK_eb57ac97913ffdb48b7c3e9254a" FOREIGN KEY ("nextAssignmentId") REFERENCES "assignment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignment" DROP CONSTRAINT "FK_eb57ac97913ffdb48b7c3e9254a"`);
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_0436c47e4e8d4ce83eaae32ea06"`);
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_7fba1cf729a29aa558885a7fdb8"`);
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_8ba5a001803e6af606163fe4008"`);
        await queryRunner.query(`ALTER TABLE "hearing" DROP CONSTRAINT "FK_043567915ef5570ce2e9896ee22"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`DROP TABLE "assignment"`);
        await queryRunner.query(`DROP TYPE "assignment_user_role_enum"`);
        await queryRunner.query(`DROP TABLE "process"`);
        await queryRunner.query(`DROP TYPE "process_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`DROP TYPE "users_type_enum"`);
        await queryRunner.query(`DROP TABLE "hearing"`);
        await queryRunner.query(`DROP TYPE "hearing_name_enum"`);
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
