var Account = require('../models/account');


exports.get_leaderboard = async function(req, res){
    console.log('User is',req.user);
    let users_list = await get_users();
    users_list.sort((item1, item2) => ((item1.rating) ? item1.rating : 0)-((item2.rating) ? item2.rating : 0));
    users_list.reverse();
    // console.log('Users are',users_list);
    res.render('leaderboard',{user:req.user, users_list: users_list})
}


exports.get_leaderboard_json = async function(req, res){
    console.log('User is',req.user);
    let users_list = await get_users();
    users_list.sort((item1, item2) => ((item1.rating) ? item1.rating : 0)-((item2.rating) ? item2.rating : 0));
    users_list.reverse();
    // console.log('Users are',users_list);
    res.json({ root: {
            version: "https://jsonfeed.org/version/1",
            title: "Leaderboard",
            home_page_url: "https://a575211fe47d.ngrok.io",
            feed_url: "https://a575211fe47d.ngrok.io/leaderboard/api",
            items: users_list.map((obj) => {
                return {
                    username: obj.username,
                    rating: obj.rating
                }
            })
    }})
    // res.render('leaderboard',{user:req.user, users_list: users_list})
}

const get_users = async function(){
    let arr = [];
    await Account.find({},(err,res)=>{
        // console.log(res);
        arr = res;
    });
    return arr;
}
