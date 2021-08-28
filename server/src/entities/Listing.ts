import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Listing extends BaseEntity {
  @Property()
  title: string;

  @ManyToOne()
  tutor: User;

  @Enum()
  level: Level[];

  @Property()
  subject: string[];

  @Property()
  pricing: string;

  @Property()
  description: string;

  @Property()
  contactInfo: [string, string][];
}

export enum Level {
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
  IP = "IP",
  JC = "JC",
  OTHER = "Other",
}

export enum Subject {}
