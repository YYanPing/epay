var productControl=function(){};
//商品分类
productControl.prototype.proList=function (req,res,next) {
	var ep=new EventProxy();
	dataSource.getConn(ep);
	adminModule.proList(ep);
	ep.on("success",function (data) {
		res.json(data);
	})	
}
productControl.prototype.proAdd=function (req,res,next) {
	var ep=new EventProxy();
	ep.all('fileup','conn',function (filename,conn) {
		var url="/upfile/"+filename;
		adminModule.proAdd(ep,conn,[req.body.pname,req.body.price,req.body.stock,url,req.body.type]);		
	});
	util.upfile(ep,req.file);
	
	dataSource.getConn(ep);
	ep.on("success",function (data) {
		if (data.insertId) {
			res.json(config.info.suc).end();
		}else{
			res.json(config.error.proAddErr).end();
		}
	})	
}
productControl.prototype.proDel=function (req,res,next) {
	var ep=new EventProxy();
	dataSource.getConn(ep);
	adminModule.proDel(ep,[req.params.pid]);
	ep.on("success",function (data) {
		res.json(config.info.suc).end();
	}).fail(function(err){
		next(err);
	});	
}
module.exports=function () {
	return new productControl();
}