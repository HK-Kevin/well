let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/oil');
//定义数据库的模型骨架,不能直接操作数据库
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});
let ProgramSchema = new mongoose.Schema({
    programName:String,
    programFile:String,
    //类型  ObjectId 对象ID类型,ref辨识引用是哪个模型的主键
    user:{type:ObjectId,ref:'User'},
    createAt: {type: Date, default: Date.now}//发言时间默认为当前时间,
});
exports.User = mongoose.model('User',UserSchema);
exports.Program = mongoose.model('Program',ProgramSchema);