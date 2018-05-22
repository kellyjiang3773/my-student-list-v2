
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: String,
    aMark: String,
    mMark: String,
    fMark: String
});

export default mongoose.model('Student', StudentSchema);