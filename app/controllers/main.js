exports.home = function(req, res){
    res.render('index');
};

exports.about = function(req, res){
    res.render('about');
};

exports.contact = function(req, res){
    res.render('contact');
};

exports.blog = function(req, res){
    res.render('blog');
};

exports.services = function(req, res){
    res.render('services');
};

exports.singlePage = function(req, res){
    res.render('singlepage');
};