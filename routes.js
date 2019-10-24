const routes = require('next-routes')();

//
// Because of awesome Next.js, You don't need to add routes for all pages.
// Every file on Pages folder basically has route as they named.
// (index.js => /, about.js => /about, ...etc.)
//
// If you want to change url (for SEO or put different path), please add your route below.
// for more info, please look at https://github.com/Sly777/ran/blob/master/docs/Routing.md
//
//
// Please add your route between of comments
//
// ------------ ROUTES ---------------
// @RANStartRoutes

routes.add('/', '/');

routes.add('OnBoarding/About', '/about');
routes.add('OnBoarding/SignUp', '/signup');
routes.add('OnBoarding/SignUp/SuccessForm', '/signup/success');
routes.add('OnBoarding/Login', '/login');
routes.add('OnBoarding/Forgot', '/forgot');
routes.add('OnBoarding/MFA', '/two-factor/:method');
routes.add('OnBoarding/MFA/MFAInfo', '/info/mfa');

routes.add('Footers/Support', '/support');
routes.add('Footers/Contact', '/contact');

routes.add('Profile/Home', '/home');
routes.add('Profile/Edit', '/profile');

routes.add('Order/Edit', '/order/:id?');
routes.add('Order/Review', '/order/review/:id');
routes.add('Order/Details', '/order/detail/:id');
routes.add('Order/Draft', '/order/draft/:id');
routes.add('Order/Download', '/order/download/:id');
routes.add('Order/Images/Edit', '/order/images/edit/:id/:token');
routes.add('Order/Images/FloorPlan', '/order/images/floorplan/:jobId/:imageId');

// @RANEndRoutes
// ------------ ROUTES ---------------
//
//

module.exports = routes;
