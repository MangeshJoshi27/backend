const express = require('express');
const router = express.Router();
const { ObjectId } = require("mongodb");
const service_master = require("../../models/service_master");
const logger = require('../../config/logger');
const {fileUploadViaBase64}= require('../../services/s3')
const auth = require('./../../middlewares/auth').isValidToken;

/* add service_master*/ 
router.post('/', auth, async(req, res, next) => {
    try 
    {   
        let get = await service_master.findOne({title:{'$regex':"^"+(req.body.title).toString()+"$", '$options' : 'i'}});
        if(!get)
        {
            if(req.body.icon){
                icon_path = "service_icon/" + req.body.title +".jpg";
                await fileUploadViaBase64(icon_path, req.body.icon);
                req.body.icon = process.env.S3_BUCKET_URL + icon_path;
            }
            let create = await service_master.insertOne(req.body);
            if(create.title){
                res.status(200).send({status: true, statusCode: 200, message: "service added successfully..."})
            }
            else{
                res.status(400).send({status: false, statusCode: 400, err:create })
            }
        }
        else
        {
            res.status(200).send({status: true, statusCode: 400, message: "service already exist..."});
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}) 
    }
});

/* get service_master*/
router.get('/', auth, async(req, res, next) => {
    try 
    {
        let get = await service_master.find();
        res.status(200).send({status: true, statusCode: 200, data:get})
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}) 
    }
});

/*get service_master_by_id*/
router.get('/service_master_by_id', auth, async(req, res, next) => {
    try 
    {
        let get = await service_master.findOne({_id:req.query._id});
        res.status(200).send({status: true, statusCode: 200, data:get})
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}) 
    }
});



router.patch('/', auth, async(req, res, next) => {
    try 
    {
        if(req.body.icon){
            icon_path = "service_icon/" + req.body.title +".jpg";
            await fileUploadViaBase64(icon_path, req.body.icon);
            req.body.icon = process.env.S3_BUCKET_URL + icon_path;
        }
        let get = await service_master.updateOne({_id:ObjectId(req.body._id)},req.body);
        if(get.acknowledged){
            res.status(200).send({status: true, statusCode: 200, message:"service updated successfully."})
        }
        else{
            res.status(400).send({status: false, statusCode: 400, data:get})
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}) 
    }
});

router.delete('/', auth, async(req, res, next) => {
    try 
    {
        let get = await service_master.updateOne({_id:ObjectId(req.query._id)},req.query);

        if(get.acknowledged){
            res.status(200).send({status: true, statusCode: 200, message:"service deactivated successfully."})
        }
        else{
            res.status(400).send({status: false, statusCode: 400, data:get})
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}) 
    }
});

/* get sitter_for_allocation_by_service_master_id for Pet Grooming */
router.get('/sitters_for_allocation', auth, async(req, res, next) => {
    try 
    {
        req.query.date = new Date(req.query.date);
        let get = await service_master.sitters_for_allocation_by_service_for_grooming(req.query);
        
        if (get.length===0) {
            res.status(200).send({ status: true, statusCode: 200, message: 'No data available..!', data: get });
        } else {
            res.status(200).send({ status: true, statusCode: 200, message: 'Data found..!', data: get });
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({ status: false, statusCode: 400, message: err.message}); 
    }
});

/* get sitter_for_allocation_by_service_master_id for Dog Training */
router.get('/sitters_for_training_allocation', auth, async(req, res, next) => {
    try 
    {
        req.query.date = new Date(req.query.date);
        let get = await service_master.sitters_for_allocation_by_service_for_training(req.query);
        
        if (get.length===0) {
            res.status(200).send({ status: true, statusCode: 200, message: 'No data available..!', data: get });
        } else {
            res.status(200).send({ status: true, statusCode: 200, message: 'Data found..!', data: get });
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({ status: false, statusCode: 400, message: err.message}); 
    }
});


module.exports = router;