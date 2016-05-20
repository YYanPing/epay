var newControl = function() {};
//商品分类
newControl.prototype.newList = function(req, res, next) {
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.newList(ep);
	ep.on("success", function(data) {
		if (req.query.callback) { //检测当前请求是json还是jsonp
			res.jsonp(data).end();	
		}else {
			res.json(data).end();
		}

	})
}
newControl.prototype.newAdd = function(req, res, next) {
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.newAdd(ep, [req.body.ntitle, req.body.content, req.session.admin.aid]);
	ep.on("success", function(data) {
		if (data.insertId) {
			res.json(config.info.suc).end();
		} else {
			res.json(config.error.newsAddErr).end();
		}
	})
}
newControl.prototype.newDel = function(req, res, next) {
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.newDel(ep, [req.params.nid]);
	ep.on("success", function(data) {
		res.json(config.info.suc).end();
	}).fail(function(err) {
		next(err);
	});
}
newControl.prototype.preview = function(req, res, next) {
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.preview(ep, [req.params.nid]);
	ep.on("success", function(data) {
		if (req.query.callback) { //检测当前请求是json还是jsonp
			res.jsonp(data).end();
		} else {
			res.json(data).end();
		}
	}).fail(function(err) {
		next(err);
	});
}
module.exports = function() {
	return new newControl();
}