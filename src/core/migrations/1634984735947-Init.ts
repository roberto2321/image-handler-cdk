import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1634984735947 implements MigrationInterface {
    name = 'Init1634984735947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_result" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Message" character varying NOT NULL, "ImageAnalysisRevision" character varying NOT NULL, "ProcessingDuration" integer NOT NULL, "Kind" TIMESTAMP NOT NULL, "TestType" character varying NOT NULL, "ErrorCode" integer NOT NULL, "GroupId" character varying NOT NULL, "ProviderResult" jsonb NOT NULL, "ImageLocation" character varying NOT NULL, "ProcessedAt" TIMESTAMP NOT NULL, "RawResult" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL, "SupportCode" character varying NOT NULL, "Result" jsonb array NOT NULL, "PreviewImageLocation" character varying NOT NULL, "GroupSort" TIMESTAMP NOT NULL, "DeviceInformation" jsonb NOT NULL, "State" character varying NOT NULL, "Bucket" character varying NOT NULL, "CassetteType" character varying NOT NULL, "Location" jsonb NOT NULL, "InventoryID" character varying NOT NULL, CONSTRAINT "PK_c1c1d82dffb451ed418454f6a29" PRIMARY KEY ("ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test_result"`);
    }

}
