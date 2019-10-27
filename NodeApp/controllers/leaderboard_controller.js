exports.get_leaderboard = function(req, res){
    console.log('User is',req.user);
    res.render('leaderboard',{user:req.user})
}
