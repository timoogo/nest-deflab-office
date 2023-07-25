import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Event } from "./entities/event.entity";
import { Organization } from "./entities/organization.entity";
import { Tag } from "./entities/tag.entity";



export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  synchronize: false,
  migrations: ["../migration/**/*.ts"],
  migrationsRun: true,
  entities: [User, Event, Organization, Tag],
});