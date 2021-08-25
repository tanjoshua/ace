import { Entity, ManyToOne, Property } from "@mikro-orm/core";

@Entity()
export class PasswordReset {
  @Property()
  token: string;

  @Property()
  userId: string;

  @Property()
  expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3); // 3 days
}
