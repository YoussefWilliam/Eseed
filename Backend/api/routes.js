/*
          -------------------------------ADMIN SYSTEM ROUTES ARE DOWN BELOW----------------------------------------------
 */


var express = require('express');
var router = express.Router();

//Schema Controllers

var Eseed = require('./controllers/eseed');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/authtest',Authorization.Verify("1000"),(req,res)=>{
    return res.status(200).json({
        err: null,
        msg: 'ok',
        data: null
      });
});





////////////////////////////////////ESEEED/////////////////////////////////////////////////////////////////////////////
router.get('/viewEmployees',Eseed.getEmployees);
router.post('/editEmployees/:name',Eseed.EditEmployee);
router.post('/deleteEmployee/:name',Eseed.DeleteEmployee);
router.post('/addEmployee',Eseed.addEmployee);
router.post('/login',Eseed.login);
router.post('/attendance/:employee',Eseed.attendance);





module.exports = router;











//exporting routes to the project












//////////////////////////////////////////////////// ADMIN ROUTES ////////////////////////////////////////////////////




////////////////////////////////////////////////// MyCinemas ROUTES //////////////////////////////////////////////////
//As an Admin i can add cinema 

router.get('/adminsearch/:searchKeyword', Search.searchByKeyword);
router.get('/adminviewCinemas',Cinema.ViewCinemas);
router.post('/addCinema', AddCinema.addCinema);
router.patch('/Cinemas/editCinema/:location/:name',(req,res,next)=>{console.log("hiii");next()}, editCinema.editCinema); 

// ------------- As an Admin I can Delete a Cinema ----------------
router.get('/mycinemas/delete/:cinema/:owner',editCinema.deleteCinemaForAdmin);





