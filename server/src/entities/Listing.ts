import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Listing extends BaseEntity {
  @Property()
  title: string;

  @ManyToOne()
  tutor: User;

  @Property()
  description: string;
}
