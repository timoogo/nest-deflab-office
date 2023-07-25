import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Initialize1690290327247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'user',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                  default: "'user'",
                },
                {
                  name: 'email',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                  isUnique: true,
                  default: "'user@user.fr'",
                },
                {
                  name: 'phone',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                  isUnique: true,
                  default: "'0606060606'",
                },
                {
                  name: 'password',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                  default: "'user'",
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'CURRENT_TIMESTAMP',
                },
                {
                  name: 'isAdmin',
                  type: 'boolean',
                  isNullable: false,
                  default: false,
                },
              ],
            }),
            true,
          );
      
          await queryRunner.createTable(
            new Table({
              name: 'event',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                },
                {
                  name: 'participantsId',
                  type: 'int',
                  isNullable: false,
                },
              ],
              foreignKeys: [
                {
                  columnNames: ['participantsId'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'user',
                  onDelete: 'CASCADE',
                },
              ],
              indices: [
                {
                  columnNames: ['participantsId'],
                },
              ],
            }),
            true,
          );
      
          await queryRunner.createTable(
            new Table({
              name: 'organization',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                },
              ],
            }),
            true,
          );
          await queryRunner.createTable(
            new Table({
              name: 'organizations',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: 'email',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: 'phone',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  isNullable: false,
                },
                {
                  name: 'image',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'CURRENT_TIMESTAMP',
                },
                {
                  name: 'updatedAt',
                  type: 'timestamp',
                  default: 'CURRENT_TIMESTAMP',
                },
              ],
            }),
            true,
          );
      
          await queryRunner.createTable(
            new Table({
              name: 'organization_users_user',
              columns: [
                {
                  name: 'organizationId',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'userId',
                  type: 'int',
                  isNullable: false,
                },
              ],
              foreignKeys: [
                {
                  columnNames: ['organizationId'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'organizations',
                  onDelete: 'CASCADE',
                },
                {
                  columnNames: ['userId'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'users',
                  onDelete: 'CASCADE',
                },
              ],
            }),
            true,
          );
              
          await queryRunner.createTable(
            new Table({
              name: 'organization_users_user',
              columns: [
                {
                  name: 'organizationId',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'userId',
                  type: 'int',
                  isNullable: false,
                },
              ],
              foreignKeys: [
                {
                  columnNames: ['organizationId'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'organization',
                  onDelete: 'CASCADE',
                },
                {
                  columnNames: ['userId'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'user',
                  onDelete: 'CASCADE',
                },
              ],
              indices: [
                {
                  columnNames: ['organizationId'],
                },
                {
                  columnNames: ['userId'],
                },
              ],
            }),
            true,
          );

          await queryRunner.createTable(
            new Table({
              name: 'tag',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                  default: "'tag'",
                },
                {
                  name: 'tagCategory',
                  type: 'enum',
                  enum: ["SPECIFIQUE", "GLOBAL"],
                  default: `SPECIFIC`,
                },
                {
                  name: 'tagType',
                  type: 'enum',
                  enum: ["online", "offline", "both", "unset"],
                  isNullable: false,
                },
              ],
            }),
            true,
          );
      
          await queryRunner.createTable(
            new Table({
              name: 'event',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                },
              ],
            }),
            true,
          );
      
          await queryRunner.createTable(
            new Table({
              name: 'event_tags_tag',
              columns: [
                {
                  name: 'eventId',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'tagId',
                  type: 'int',
                  isNullable: false,
                },
              ],
              foreignKeys: [
                {
                  columnNames: ['eventId'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'event',
                  onDelete: 'CASCADE',
                },
                {
                  columnNames: ['tagId'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'tag',
                  onDelete: 'CASCADE',
                },
              ],
              indices: [
                {
                  columnNames: ['eventId'],
                },
                {
                  columnNames: ['tagId'],
                },
              ],
            }),
            true,
          );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
