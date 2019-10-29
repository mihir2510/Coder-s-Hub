
exports.get_aboutus = function(req, res) {
    res.render('aboutus',{user:req.user});
};
