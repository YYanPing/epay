var APIRouter=express.Router();

APIRouter.get("/news",newControl.newList);
APIRouter.get("/news/:nid",newControl.preview);

APIRouter.get("/login",loginControl.login);
module.exports=APIRouter;
