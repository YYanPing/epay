var loginModule=function () {};

loginModule.prototype.login=function (ep,data) {
	ep.on("conn",function (conn) {  //连接成功
		var sql="select * from admin where email=? and password=?";
		conn.query(sql,data,ep.done("success"));
		conn.release();//关闭
	});
}
module.exports=function () {
	return new loginModule();
}