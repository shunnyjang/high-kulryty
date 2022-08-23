import { Migration } from '@mikro-orm/migrations';

export class Migration20220823180957 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "rank" varchar(255) not null default \'BASIC\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "rank";');
  }

}
