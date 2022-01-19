import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Listing extends BaseEntity {
  @Property()
  title: string;

  @Property()
  name: string;

  @Property()
  image: { url: string; id: string };

  @ManyToOne()
  tutor: User;

  @Enum()
  level: Level[];

  @Property()
  subject: string[];

  @Property()
  pricing: { rate: number; details: string };

  @Property()
  description: string;

  @Property()
  schedule: string[];

  @Property()
  contactInfo: string;
}

export enum Level {
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
  IP = "IP",
  JC = "JC",
  OTHER = "Other",
}

export const subjects = [
  "Mathematics",
  "English",
  "Chinese",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Economics",
];
