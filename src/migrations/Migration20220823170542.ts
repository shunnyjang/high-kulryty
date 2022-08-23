import { Migration } from '@mikro-orm/migrations';

export class Migration20220823170542 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" serial primary key, "name" varchar(255) not null, "category" varchar(255) not null, "price" int not null, "thumbnail" varchar(255) null, "description" varchar(255) not null);');

    this.addSql('create table "tag" ("name" varchar(255) not null, constraint "tag_pkey" primary key ("name"));');

    this.addSql('create table "user" ("id" varchar(255) not null, "password" varchar(255) not null, "name" varchar(255) not null, "profile" varchar(255) not null, "token" varchar(255) null, "date_joined" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "star_user" ("id" serial, "user_id" varchar(255) not null, "title" varchar(255) not null, "created_at" timestamptz(0) not null, constraint "star_user_pkey" primary key ("id"));');

    this.addSql('create table "basket" ("id" serial primary key, "user_id" varchar(255) not null, "thumbnail" varchar(255) not null, "created_at" timestamptz(0) not null);');

    this.addSql('create table "favor" ("user_id" varchar(255) not null, "basekt_id" int not null, "creatd_at" timestamptz(0) not null, constraint "favor_pkey" primary key ("user_id", "basekt_id"));');

    this.addSql('create table "basket_tags" ("basket_id" int not null, "tag_name" varchar(255) not null, constraint "basket_tags_pkey" primary key ("basket_id", "tag_name"));');

    this.addSql('create table "basket_products" ("basket_id" int not null, "product_id" int not null, constraint "basket_products_pkey" primary key ("basket_id", "product_id"));');

    this.addSql('create table "user_following" ("user_1_id" varchar(255) not null, "user_2_id" varchar(255) not null, constraint "user_following_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('alter table "star_user" add constraint "star_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "basket" add constraint "basket_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "favor" add constraint "favor_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "favor" add constraint "favor_basekt_id_foreign" foreign key ("basekt_id") references "basket" ("id") on update cascade;');

    this.addSql('alter table "basket_tags" add constraint "basket_tags_basket_id_foreign" foreign key ("basket_id") references "basket" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "basket_tags" add constraint "basket_tags_tag_name_foreign" foreign key ("tag_name") references "tag" ("name") on update cascade on delete cascade;');

    this.addSql('alter table "basket_products" add constraint "basket_products_basket_id_foreign" foreign key ("basket_id") references "basket" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "basket_products" add constraint "basket_products_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_following" add constraint "user_following_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_following" add constraint "user_following_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');
  }

}
