import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Listing } from ".";

@Entity()
export class User extends BaseEntity {
  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  @Property({ unique: true })
  password: string;

  @OneToMany(() => Listing, (listing) => listing.tutor, {
    cascade: [Cascade.ALL],
  })
  listings = new Collection<Listing>(this);
}
