var express = require('express');
var router = express.Router();
var prodListing = require('../public/data/products/index.get.json');
var totalCounter = require('./constant');
var prodSelected = [];
var checkoutAmount = 0;

/* GET cart page. */
router.get('/', function (req, res, next) {
    res.render('cart',{productselect: prodSelected, checkoutAmount: checkoutAmount, totalCounter:totalCounter.total_item_count});
});

router.get('/addtocart/:id', function (req, res, next) { 
    // totalCounter.total_item_count=0;
    prodListing.forEach(element => {
        if (element.id === req.params.id) {
            if (element.count == undefined) {
                element.count = 1;
                element.totalprice = element.price * element.count;
                checkoutAmount = checkoutAmount + element.price;
                // element.price = element.price * element.count;
                prodSelected.push(element);
                console.log(totalCounter, 'if');  

            } else {
                element.count = element.count + 1;
                element.totalprice = element.price * element.count;
                checkoutAmount = checkoutAmount + element.price;
                console.log(totalCounter, 'else');  
            }
            totalCounter.total_item_count = totalCounter.total_item_count + element.count;
           // console.log(totalCount);        
        }        
    });



    res.end(JSON.stringify({ id: req.params.id, element: prodSelected, checkoutAmount: checkoutAmount, totalCounter:totalCounter.total_item_count}));
});

router.get('/changecartcount/:id/:task', function (req, res, next) {
    totalCounter.total_item_count = 0;
    if(req.params.task == "plus"){
        prodSelected.forEach(element => {
            if (element.id === req.params.id) {
                element.count = element.count + 1;
                element.totalprice = element.price * element.count;
                checkoutAmount = checkoutAmount + element.price;
            }
            totalCounter.total_item_count = totalCounter.total_item_count + element.count;
            //console.log(totalCount);
        });

        res.end(JSON.stringify({ id: req.params.id, element: prodSelected, checkoutAmount: checkoutAmount, totalCounter:totalCounter.total_item_count}));
    }
    else if(req.params.task == "minus"){
        prodSelected.forEach(element => {
            if (element.id === req.params.id) {
                element.count = element.count - 1;
                element.totalprice = element.price * element.count;
                checkoutAmount = checkoutAmount - element.price;         
            }
            totalCounter.total_item_count = totalCounter.total_item_count + element.count;
            // console.log(totalCount);      


        });
        res.end(JSON.stringify({ id: req.params.id, element: prodSelected, checkoutAmount: checkoutAmount, totalCounter:totalCounter.total_item_count}));
    }
});
module.exports = router;