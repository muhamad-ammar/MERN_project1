const mongoose = require(`mongoose`);
const bcrypt= require(`bcryptjs`);
const jwt=require(`jsonwebtoken`);
//Schema
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password1:{
        type: String,
        required: true
    },
    password2:{
        type: String,
        required: true
    },
    tokens:[
        {
            token:
            {
                type: String,
                required: true
            }   
        }]
})

// Hashing password
userSchema.pre('save',async function(next){
    // console.log('Hasing');
    if(this.isModified('password1'))
    {
        // console.log('passed if condition');
        this.password1=await bcrypt.hash(this.password1,12);
        this.password2=await bcrypt.hash(this.password2,12);
    }
    next();
});
// Generating JWT token
userSchema.methods.generateAuthToken = async function(){
    try
    {
        let jwttoken = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        // Adding to DBs 
        this.tokens =this.tokens.concat({token:jwttoken});
        await this.save();
        return jwttoken;
    }
    catch(err)
    {
        console.log(err);
    }

}
// Model creation
const User= mongoose.model('USER',userSchema);

module.exports=User;
