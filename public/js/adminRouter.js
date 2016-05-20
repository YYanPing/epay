$(function() {
	var router = new Router({
		container: '#container'
	});
	var adminList = {
		url: '/adminList',
		className: "adminList",
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/admin',
				type: "get"
			}).done(function(data) {
				that.data = data;
			});
		},
		render: function() {
			return ejs.render($("#adminList").html(),{admins: this.data});
		}
	}
	var adminAdd = {
		url: '/adminAdd',
		render: function() {
			return $("#adminAdd").html();
		},
		bind: function() {
			var t = $(this);
			t.find("#sub").click(function() {
				var aname=t.find("#aname").val();
				var email=t.find("#email").val();
				var password=t.find("#password").val();

				if ($.validate.isEmpty(aname) == false) {
					return t.find(".alert").alterMes({
						message: "用户名不能为空"
					});
				}
				if ($.validate.isEmpty(email) == false) {
					return t.find(".alert").alterMes({
						message: "邮箱不能为空"
					});
				}
				if ($.validate.isEmpty(password) == false) {
					return t.find(".alert").alterMes({
						message: "密码不能为空"
					});
				}
				if ($.validate.isEmail(email) == false) {
					return t.find(".alert").alterMes({
						message: "email格式不正确"
					});
				}
				//提交ajax
				$._ajax({
					url: '/admin/admin',
					data: {
						"aname": aname,
						"email": email,
						"password": password
					}
				}).done(function(obj) {
					//如果增加成功就返回列表
					if (obj.code) {
						location.href = "/admin/index#/adminList";
					} else {
						t.find(".alert").alertMes({
							type: "danger",
							message: obj.msg
						});
					}
				});
			});
		}
	}  
    var adminDel={
    	url:"/adminDel/:id",
    	ajaxData:function(){
    		var t = this;
			$._ajax({
				url: "/admin/admin/"+t.params.id,
				type: "delete"
			}).done(function(data) {
				location.href = "/admin/index#/adminList";
			});
			return false;
    	}		
    }
    
    var typeList = {
		url: '/typeList',
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/producttype',
				type: "get"
			}).done(function(data) {
				that.data = data;
			});
		},
		render: function() {
			return ejs.render($("#typeList").html(),{types: this.data});
		}
	}
	var typeAdd = {
		url: '/typeAdd',
		render: function() {
			return ejs.render($("#typeAdd").html(),{types: this.data});
		},
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/producttype',
				type: "get"
			}).done(function(data) {
				that.data = data;
			});
		},
		bind: function() {
			var t = $(this);
			t.find("#sub").click(function() {
				var tname=t.find("#tname").val();
				var typeinfo=t.find("#typeinfo").val();
				var pid=t.find("#pid").val();

				if ($.validate.isEmpty(tname) == false) {
					return t.find(".alert").alterMes({
						message: "用户名不能为空"
					});
				}
				if ($.validate.isEmpty(typeinfo) == false) {
					return t.find(".alert").alterMes({
						message: "邮箱不能为空"
					});
				}
				
				//提交ajax
				$._ajax({
					url: '/admin/producttype',
					data: {
						"tname": tname,
						"typeinfo": typeinfo,
						"pid": pid
					}
				}).done(function(obj) {
					//如果增加成功就返回列表
					if (obj.code) {
						location.href = "/admin/index#/typeList";
					} else {
						t.find(".alert").alertMes({
							type: "danger",
							message: obj.msg
						});
					}
				});
			});			
		}
	}   
    var typeDel={
    	url:"/typeDel/:id",
    	ajaxData:function(){
    		var t = this;
			$._ajax({
				url: "/admin/producttype/"+t.params.id,
				type: "delete"
			}).done(function(data) {
				location.href = "/admin/index#/typeList";
			});
			return false;
    	}		
    }
    
    var proList = {
		url: '/proList',
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/product',
				type: "get"
			}).done(function(data) {
				that.data = data;
			});
		},
		render: function() {
			return ejs.render($("#proList").html(),{products: this.data});
		}
	}
	var proAdd = {
		url: '/proAdd',
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/producttype',
				type: "get"
			}).done(function(data) {
				that.data = data;
			});
		},
		render: function() {
			return ejs.render($("#proAdd").html(),{types: this.data});
		},
		bind: function() {
			var t = $(this);
			t.find("#sub").click(function() {
				var pname=t.find("#pname").val();
				var price=t.find("#price").val();
				var stock=t.find("#stock").val();
				
				var type=t.find("#type").val();
				
				var data =new FormData();
				data.append("pname",pname);
				data.append("price",price);
				data.append("stock",stock);
				data.append("type",type);
				data.append("upfile",t.find("#imgpath").get(0).files[0]);

				//提交ajax
				$._ajax({
					url: '/admin/product',
					data:data,
					cache:false,
					processData:false,
					contentType:false
//					data: {
//						"pname": pname,
//						"price": price,
//						"stock": stock,
//						"imgpath": imgpath,
//						"type": type
//					}
				}).done(function(obj) {
					//如果增加成功就返回列表
					if (obj.code) {
						location.href = "/admin/index#/proList";
					} else {
						t.find(".alert").alertMes({
							type: "danger",
							message: obj.msg
						});
					}
				});
			});
			t.find("#imgpath").change(function () {
				var file=this.files[0];
				if (file.type.indexOf("image") ==-1){
					$(this).val("");
					t.find(".alert").alertMes({type:"danger",message:"只能上传图片"});
					return false;
				}
				if (file.size>(1024*512)) {
					$(this).val("");
					t.find(".alert").alertMes({type: "danger",message: "图片 大小不能超过512kb"});
					return false;
				}
				var fr=new FileReader();
				fr.readAsDataURL(file);
				fr.onload=function () {
					$("#showimg").attr("src",fr.result);
				}
			})
		}
	}    
    var proDel={
    	url:"/proDel/:pid",
    	ajaxData:function(){
    		var t = this;
			$._ajax({
				url: "/admin/product/"+ t.params.pid,
				type: "delete"
			}).done(function(data) {
				location.href = "/admin/index#/proList";
			});
			return false;
    	}		
    }
    var newList = {
		url: '/newList',
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/new',
				type: "get"
			}).done(function(data) {
				that.data = data;
			});
		},
		render: function() {
			return ejs.render($("#newList").html(),{news: this.data});
		}
	}
	var newAdd = {
		url: '/newAdd',
		ajaxData: function() {
			var that = this;
			return $._ajax({
				url: '/admin/admin',
				type: "get"
			}).done(function(data) {
				that.data = data;
			});
		},
		render: function() {
			return $("#newAdd").html();
		},
		bind: function() {
			var t = $(this);
			t.find("#editor").wysiwyg()
			t.find("#sub").click(function() {
				var ntitle=t.find("#ntitle").val();
				var content=t.find("#editor").html();
				//提交ajax
				$._ajax({
					url: '/admin/new',
					data: {
						"ntitle": ntitle,
						"content": content
					}
				}).done(function(obj) {
					//如果增加成功就返回列表
					if (obj.code) {
						location.href = "/admin/index#/newList";
					} else {
						t.find(".alert").alertMes({
							type: "danger",
							message: obj.msg
						});
					}
				});
			});
		}
	}  
    var newDel={
    	url:"/newDel/:nid",
    	ajaxData:function(){
    		var t = this;
			$._ajax({
				url: "/admin/new/"+t.params.nid,
				type: "delete"
			}).done(function(data) {
				location.href = "/admin/index#/newList";
			});
			return false;
    	}		
    }
    
    var preview={
    	url:"/preview/:nid",
    	ajaxData:function(){
    		var that = this;
			return $._ajax({
				url: "/admin/new/"+that.params.nid,
				type: "get"
			}).done(function(data) {
				that.data=data;
			});
    	},
		render: function() {
			return ejs.render($("#preview").html(),{n: this.data[0]});
		}		
    }
    
	var home = {
		url: '/',
		render: function() {
			return '<h1>欢迎进入后台管理</h1>';
		}
	}
	router.push(adminList)
		  .push(adminAdd)
		  .push(adminDel)
		  .push(typeList)
		  .push(typeAdd)
		  .push(typeDel)
		  .push(proList)
		  .push(proAdd)
		  .push(proDel)
		  .push(newList)
		  .push(newAdd)
		  .push(newDel)
		  .push(preview)
		  .push(home)
		  .setDefault('/').init();
});