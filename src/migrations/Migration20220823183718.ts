import { Migration } from '@mikro-orm/migrations';

export class Migration20220823183718 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "star_user" add column "type" varchar(255) not null default \'슈퍼유저\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "star_user" drop column "type";');
  }

}
