const admins = require('./admins/admins')
const banners = require('./banners/banners')
const service_master = require('./service_master/service_master');
const coupons = require('./coupons/coupons');
const users = require('./users/users');
const sitter = require('./sitter/sitter');
const blogs = require('./blogs/blogs');
const others = require('./others/others');
const faq = require('./faq/faq');
const sublesson = require('./sublesson/sublesson');
const lessons = require('./lessons/lessons');
const cancellation = require('./cancellation/cancellation');
const contact_us = require('./contact_us/contact_us');

module.exports = {
    admins,
    banners,
    service_master,
    coupons,
    users,
    sitter,
    blogs,
    others,
    faq,
    sublesson,
    lessons,
    cancellation,
    contact_us
}