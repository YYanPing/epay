var adminModule = function() {};

adminModule.prototype.adminList = function(ep,next) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "select * from admin";
		conn.query(sql, ep.done("success"));
		conn.release();
	});
	ep.fail(function (err) {
		next(err);
	});
}
adminModule.prototype.adminAdd = function(ep,data,next) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "insert into admin values(default,?,?,?,now(),1)";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	}).fail(function (err) {
		next(err);
	});
}
adminModule.prototype.adminDel = function(ep,data,next) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "delete from admin where aid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	}).fail(function (err) {
		next(err);
	});
}

adminModule.prototype.typeList = function(ep,data,next) {
	ep.on("conn", function(conn) { //连接成功
		if (data) {
			var sql = "select * from producttype where pid=?";
			conn.query(sql,data,ep.done("success"));
		}else{
			var sql = "select p1.*,p2.tname as pname from producttype p1 left join producttype p2 on p1.pid=p2.tid order by p1.pid";
			conn.query(sql,ep.done("success"));
		}
		conn.release();
	});
	ep.fail(function (err) {
		next(err);
	});
}
adminModule.prototype.typeAdd = function(ep,data,next) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "insert into producttype values(default,?,?,?)";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	}).fail(function (err) {
		next(err);
	});
}
adminModule.prototype.typeDel = function(ep,data,next) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "delete from producttype where tid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	}).fail(function (err) {
		next(err);
	});
}

//product
adminModule.prototype.proList = function(ep) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "select p.*,t.tname from product p left join producttype t on p.type=t.tid";
		conn.query(sql,ep.done("success"));
		conn.release();
	}).fail(function (err) {
		next(err);
	});
}
adminModule.prototype.proAdd = function(ep,conn,data,next) {
		var sql = "insert into product values(default,?,?,?,?,?)";
		conn.query(sql,data,ep.done("success"));
		conn.release();
}
adminModule.prototype.proDel = function(ep,data,next) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "delete from product where pid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	}).fail(function (err) {
		next(err);
	});
}
//news
adminModule.prototype.newList = function(ep) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "select nid,ntitle,pubtime,a.aname from news n left join admin a on n.author=a.aid";
		conn.query(sql,ep.done("success"));
		conn.release();
	}).fail(function (err) {
		next(err);
	});
}
adminModule.prototype.newAdd = function(ep,data) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "insert into news values(default,?,?,now(),?)";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}
adminModule.prototype.newDel = function(ep,data) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "delete from news where nid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}
adminModule.prototype.preview = function(ep,data) {
	ep.on("conn", function(conn) { //连接成功
		var sql = "select n.*,a.aname from news n left join admin a on n.author=a.aid where nid=?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}
module.exports = function() {
	return new adminModule();
}