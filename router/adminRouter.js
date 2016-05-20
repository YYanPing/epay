var adminRouter = express.Router();

adminRouter.all("/index",adminIndexControl.index);
//resetfull
//管理员
adminRouter.get("/admin",adminIndexControl.adminList);//列表
adminRouter.post("/admin",adminIndexControl.adminAdd);//增加
adminRouter.delete("/admin/:id",adminIndexControl.adminDel);//删除
//商品分类
adminRouter.get("/producttype",productTypeControl.typeList);//列表
adminRouter.get("/producttype/:pid",productTypeControl.typeList);//列表
adminRouter.post("/producttype",productTypeControl.typeAdd);//增加
adminRouter.delete("/producttype/:id",productTypeControl.typeDel);//删除

//商品
adminRouter.get("/product",productControl.proList);//列表
adminRouter.post("/product",upload.single('upfile'),productControl.proAdd);//增加
adminRouter.delete("/product/:pid",productControl.proDel);//删除

//新闻
adminRouter.get("/new",newControl.newList);//列表
adminRouter.get("/new/:nid",newControl.preview);//删除
adminRouter.post("/new",newControl.newAdd);//增加
adminRouter.delete("/new/:nid",newControl.newDel);//删除

module.exports = adminRouter;