
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: String,
    aMark: String,
    mMark: String,
    fMark: String
}, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

StudentSchema.virtual('url')
    .get(function () {
        return '/student/' + this._id;
    });

export default mongoose.model('Student', StudentSchema);