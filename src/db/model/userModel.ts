import mongoose, { model, Schema } from "mongoose";
import { User } from "../../types";


const userSchema = new Schema<User>({
    pin: {
        type: String,
        required: true,
        unique: true
    },
    expire: {
        type: Date,
        required: true,
    },
    emailRemaining: {
        type: Number,
        default: 2
    },
    timeExtRemaining: {
        type: Number,
        default: 2
    },
    files: [
        {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            ext: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
        ]
}, { timestamps: true });


userSchema.index( { "expire": 1 }, { expireAfterSeconds: 0 } );

const userModelFunction = () => {
    return mongoose.models && mongoose.models.User
      ? mongoose.models.User as mongoose.Model<User>
      : model<User>("User", userSchema);
  };

const userModel = userModelFunction();

export default userModel;