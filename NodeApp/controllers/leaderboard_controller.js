var Account = require('../models/account');

exports.get_leaderboard = async function(req, res){
    console.log('User is',req.user);
    let users_list = await get_users();
    console.log('Users are',users_list);
    res.render('leaderboard',{user:req.user, users_list: users_list})
}

const get_users = async function(){
    let arr = [];
    await Account.find({},(err,res)=>{
        // console.log(res);
        arr = res;
    });
    return arr;
}
