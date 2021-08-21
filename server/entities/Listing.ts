import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { User } from ".";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Listing extends BaseEntity {
  @Property()
  title: string;

  @ManyToOne()
  tutor: User;

  @Property()
  description: string;

  constructor(title: string, tutor: User, description: string) {
    super();
    this.title = title;
    this.tutor = tutor;
    this.description = description;
  }
}
