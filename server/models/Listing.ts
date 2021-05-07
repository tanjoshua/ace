import { model, Schema, Document, Types, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

enum Level {
  Preschool = "PRESCHOOL",
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
  JC = "JC",
  Tertiary = "TERTIARY",
  Other = "OTHER",
}

export interface IListing extends Document {
  title: string;
  description: Text;
  tutor: string;
  level: Level[];
  subject: string[];
}

interface ListingModel<T extends Document> extends PaginateModel<T> {}

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tutor: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  level: [String],
  subject: [String],
});

ListingSchema.plugin(mongoosePaginate);

const Listing: ListingModel<IListing> = model("Listing", ListingSchema);
export default Listing;
