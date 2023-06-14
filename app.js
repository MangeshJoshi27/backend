const express = require('express');
const app = express();
require('dotenv').config();
require('./config/db');
var cors = require('cors');

app.use(express.json({limit: '5mb'}));
app.use(cors());

/* src */
const { admins, banners, service_master, coupons, users, sitter, blogs, others, faq, sublesson, lessons, cancellation, contact_us } = require('./src/');

/* Pet Grooming */
const { 
    grooming_add_ons,
    grooming_book_services,
    grooming_offerings,
    grooming_packages,
    grooming_sessions,
    grooming_time_slot,
    grooming_reschedule } = require('./src/pet_grooming');

/* Dog Training */    
const { 
    training_packages,
    training_time_slot,
    training_lessons,
    training_sublessons,
    training_book_services,
    training_sessions,
    training_reschedule } = require('./src/dog_training');

/* Dog Walking */    
const { 
    walking_packages,
    walking_time_slot,
    walking_offerings } = require('./src/dog_walking');

/* src */    
app.use(admins);
app.use('/banners', banners);
app.use('/service_master',service_master);
app.use('/coupons', coupons);
app.use('/users', users);
app.use('/sitter', sitter);
app.use('/blogs', blogs);
app.use('/others', others);
app.use('/faq', faq);
app.use('/sublesson', sublesson);
app.use('/lessons', lessons);
app.use('/cancellation', cancellation);
app.use('/contact_us', contact_us);

/* Pet Grooming */
app.use('/grooming_packages',grooming_packages);
app.use('/grooming_offerings',grooming_offerings);
app.use('/grooming_add_ons',grooming_add_ons);
app.use('/grooming_time_slot', grooming_time_slot);
app.use('/grooming_book_services', grooming_book_services);
app.use('/grooming_sessions', grooming_sessions);
app.use('/grooming_reschedule', grooming_reschedule);

/* Dog Training */
app.use('/training_packages', training_packages);
app.use('/training_time_slot', training_time_slot);
app.use('/training_lessons', training_lessons);
app.use('/training_sublessons', training_sublessons);
app.use('/training_book_services', training_book_services);
app.use('/training_sessions', training_sessions);
app.use('/training_reschedule', training_reschedule);

/* Dog Walking */
app.use('/walking_packages', walking_packages);
app.use('/walking_time_slot', walking_time_slot);
app.use('/walking_offerings', walking_offerings);


app.use((req, res, next) => {
    res.status(404).json({
        message: 'Ohh you are lost, read the API documentation to find your way back home :)'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server running on PORT ${process.env.PORT}`);
})