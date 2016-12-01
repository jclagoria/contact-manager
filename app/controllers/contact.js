/**
 * Created by jclagoria on 11/27/16.
 */
'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Contact = mongoose.Types.ObjectId;

module.exports.create = createContact;
module.exports.findById = findContactById;
module.exports.getOne = getOneContact;
module.exports.getAll = getAllContacts;
module.exports.update = updateContact;
module.exports.remove = removeContact;

function createContact(req, res, next){
    Contact.create(req.body, (err, contact) => {
        if (err) {
            return next(err);
        }

        res.status(201).json(contact);
    });
}

function findContactById(req, res, next, id){
    if(!Object.isValid(id)){
        res.status(404).send({message: 'Not found.'})
    }

    Contact.findById(id , (err, contact) =>{
        if (err) {
            next(err);
        } else if (contact) {
            req.contact = contact;
            next();
        } else {
            next(new Error('failed to fint contact'));
        }
    });
}

function getOneContact(req, res, next){
    if (!req.contact) {
        return next(err);
    }

    res.json(req.contact);
}

function updateContact(req, res, next){
    let contact = req.contact;
    _.assing(contact, req.body);

    contact.save((err, updateContact) => {
        if (err) {
            return next(err);
        }

        res.json(updateContact);
    });
}

function getAllContacts(req, res, next){
    var limit = +req.query.limit || MAX_LIMIT;
    const skip = +req.query.offset || 0;
    const query = {};

    if(limit > MAX_LIMIT){
        limit = MAX_LIMIT;
    }

    Contact.find(query).skip(skip)
        .limit(limit).sort({createdAt: 'desc'})
        .exec((err, contacts) => {
            if(err){
                return next(err);
            }

            res.json(contacts);
        });
}

function removeContact(req, res, next) {
    req.contact.remove((err) => {
        if (err) {
            return next(err);
        }

        res.status(204).json();
    });
}