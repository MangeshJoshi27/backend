var mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
var Schema = mongoose.Schema;

const service_master_Schema = new mongoose.Schema(
  {
    title:{
        type: String,
        required: true
    },
	description:{
        type: String
    },
    admin_notes:{
        type: String
    },
    icon:{
        type: String,
        required: true
    },
    status:{
        type: String
    }
  }
);

let service_master = mongoose.model("service_master", service_master_Schema);

insertOne = async (query) => {
    try {
        const create = await new service_master(query).save();
        return create
    } 
    catch (err) {
        return err
    }
  }

find = async (query) => {
    try{
        const get = await service_master.find(query);
        return get
    }catch (err) {
        return err
    }
  }
  
  findOne = async (query) => {
    try{
        const get = await service_master.findOne(query);
        return get
    }catch (err) {
        return err
    }
  }
  
  updateOne = async (match, query) => {
    try{
        const set = await service_master.updateOne(match, query);
        return set
    }
    catch (err) {
        return err
    }
  }

  sitters_for_allocation_by_service_for_grooming = async (query) => {
    try{
        const get = await service_master.aggregate([
            {
              '$match': {
                '_id': new ObjectId(query._id)
              }
            }, {
              '$lookup': {
                'from': 'sitters', 
                'localField': '_id', 
                'foreignField': 'services', 
                'as': 'sitters'
              }
            }, {
              '$unwind': {
                'path': '$sitters'
              }
            }, {
              '$lookup': {
                'from': 'leaves', 
                'localField': 'sitters._id', 
                'foreignField': 'sitter_id', 
                'as': 'leaves'
              }
            }, {
              '$match': {
                'leaves.date': {
                  '$ne': new Date(query.date)
                }
              }
            },
            {
              '$lookup': {
                'from': 'service_masters', 
                'localField': 'sitters.services', 
                'foreignField': '_id', 
                'as': 'service_masters'
              }
            }, {
              '$lookup': {
                'from': 'grooming_sessions', 
                'localField': 'sitters._id', 
                'foreignField': 'sitter_id', 
                'as': 'sessions'
              }
            }, {
              '$project': {
                'sitters._id': 1, 
                'sitters.name': 1, 
                'sitters.email': 1, 
                'sitters.phone': 1, 
                'sitters.address': 1, 
                'sitters.subarea': 1, 
                'sitters.pincode': 1, 
                'sitters.services': 1, 
                'service_masters': 1, 
                'leaves': 1, 
                'sessions': {
                  '$filter': {
                    'input': '$sessions', 
                    'as': 'session', 
                    'cond': {
                      '$eq': [
                        '$$session.date', new Date(query.date)
                      ]
                    }
                  }
                }
              }
            }
          ]);
        return get
    }catch (err) {
        return err
    }
  }

  // used until 13-01-2023
  // sitters_for_allocation_by_service_for_training = async (query) => {
  //   try{
  //       const get = await service_master.aggregate([
  //           {
  //             '$match': {
  //               '_id': new ObjectId(query._id)
  //             }
  //           }, {
  //             '$lookup': {
  //               'from': 'sitters', 
  //               'localField': '_id', 
  //               'foreignField': 'services', 
  //               'as': 'sitters'
  //             }
  //           }, {
  //             '$unwind': {
  //               'path': '$sitters'
  //             }
  //           }, {
  //             '$lookup': {
  //               'from': 'leaves', 
  //               'localField': 'sitters._id', 
  //               'foreignField': 'sitter_id', 
  //               'as': 'leaves'
  //             }
  //           }, {
  //             '$match': {
  //               'leaves.date': {
  //                 '$ne': new Date(query.date)
  //               }
  //             }
  //           },
  //           {
  //             '$lookup': {
  //               'from': 'service_masters', 
  //               'localField': 'sitters.services', 
  //               'foreignField': '_id', 
  //               'as': 'service_masters'
  //             }
  //           }, {
  //             '$lookup': {
  //               'from': 'training_sessions', 
  //               'localField': 'sitters._id', 
  //               'foreignField': 'sitter_id', 
  //               'as': 'sessions'
  //             }
  //           }, {
  //             '$project': {
  //               'sitters._id': 1, 
  //               'sitters.name': 1, 
  //               'sitters.email': 1, 
  //               'sitters.phone': 1, 
  //               'sitters.address': 1, 
  //               'sitters.subarea': 1, 
  //               'sitters.pincode': 1, 
  //               'sitters.services': 1, 
  //               'service_masters': 1,
  //               'leaves': 1, 
  //               'sessions': {
  //                 '$filter': {
  //                   'input': '$sessions', 
  //                   'as': 'session', 
  //                   'cond': {
  //                     '$eq': [
  //                       '$$session.date', new Date(query.date)
  //                     ]
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         ]);
  //       return get
  //   }catch (err) {
  //       return err
  //   }
  // }

  sitters_for_allocation_by_service_for_training = async (query) => {
    try{
        const get = await service_master.aggregate([
          {
            $match: {
              _id: new ObjectId(query._id),
            },
          },
          {
            $lookup: {
              from: "sitters",
              localField: "_id",
              foreignField: "services",
              as: "sitters",
            },
          },
          {
            $unwind: {
              path: "$sitters",
            },
          },
          {
            $lookup: {
              from: "leaves",
              localField: "sitters._id",
              foreignField: "sitter_id",
              as: "leaves",
            },
          },
          {
            $match: {
              "leaves.date": {
                $ne: new Date(query.date),
              },
            },
          },
          {
            $lookup: {
              from: "service_masters",
              localField: "sitters.services",
              foreignField: "_id",
              as: "service_masters",
            },
          },
          {
            $lookup: {
              from: "training_book_services",
              localField: "sitters._id",
              foreignField: "sitter_id",
              as: "sessions",
            },
          },
          {
            $project: {
              "sitters._id": 1,
              "sitters.name": 1,
              "sitters.email": 1,
              "sitters.phone": 1,
              "sitters.address": 1,
              "sitters.subarea": 1,
              "sitters.pincode": 1,
              "sitters.services": 1,
              service_masters: 1,
              leaves: 1,
              sessions: {
                $filter: {
                  input: "$sessions",
                  as: "session",
                  cond: {
                    $eq: [
                      "$$session.start_date",
                      new Date(query.date),
                    ],
                  },
                },
              },
            },
          },
        ]);
        return get
    }catch (err) {
        return err
    }
  }

  module.exports = {
    insertOne,
    find,
    findOne,
    updateOne,
    sitters_for_allocation_by_service_for_grooming,
    sitters_for_allocation_by_service_for_training
  }