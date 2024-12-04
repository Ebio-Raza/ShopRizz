const express = require('express');
const mongodb = require('mongodb');

const app = express();
const cors = require('cors');
require('./db/config');
const Product = require('./db/products');
const User = require('./db/users');
const Seller = require('./db/sellers');
const Category = require('./db/categories');
const Cart = require('./db/carts');
const Order = require('./db/orders');
const multer = require('multer');
const path = require('path');
app.use(express.json());
app.use(cors());


// <======  User Register  start =========>

app.post('/user-register',async (req,resp)=>{
    // const data = req.body;
    // const result = await User.insertMany(data);
    const check = await User.find({email:req.body.email});
    if(check.length>0){
        resp.send({result:"Already Registered"})
    }
    else{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
    }
});

// <======  User Register  end =========>

// <======  Seller Register  start =========>

app.post('/seller-register',async (req,resp)=>{
    // const data = req.body;
    // const result = await User.insertMany(data);
    const check = await Seller.find({email:req.body.email});
    if(check.length>0){
        console.log(check);
        resp.send({result:"Already Registered"})
    }
    else{
    let seller = new Seller(req.body);
    let result = await seller.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
    }
});

// <======  Seller Register  end =========>

// < ======== User Login Start =============>

app.post('/user-login', async (req,resp)=>{
    if(req.body.email && req.body.password){
        const result = await User.findOne(req.body).select("-password");
        if(result){
            resp.send(result);
        }
        else{
            resp.send({result:"Not Found"});
        }
    }
    else{
         resp.send({result:"Enter Correct Info"});
    }
});

// < ======== User Login End =============>

// < ======== Seller Login Start =============>

app.post('/seller-login', async (req,resp)=>{
    if(req.body.email && req.body.password){
        const result = await Seller.findOne(req.body).select("-password");
        if(result){
            resp.send(result);
        }
        else{
            resp.send({result:"Not Found"});
        }
    }
    else{
         resp.send({result:"Enter Correct Info"});
    }
});

// < ======== Seller Login End =============>

// < ======== Add Product Start =============>

app.use("/Images", express.static(path.join(__dirname, "public/Images")));

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./public/Images",)
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({storage});

app.post('/add-product/:id', upload.array('photos',8),async (req,resp)=>{
    let photoPaths = req.files.map(file => file.path);
    let ID = req.params.id;
    let arg = req.body.category.toLowerCase();
    let check = await Category.findOne({name:arg});
    let data;
    if(check){
        data = check._id;
    }
    else{
        let categories = new Category({name:arg});
        let res = await categories.save();
        data = res._id;
    }
    let obj={title:req.body.title,highlights:req.body.highlights,
        photos:photoPaths,
        category:req.body.category,
        category_id:data,
        seller_id:ID,
        rating:req.body.rating,
        price:req.body.price,
        discount_price:req.body.discount_price,
        TotalQty:req.body.TotalQty,
        SoldQty:0,
        Status:'Available',
        SellerStatus:'Active',
        deliveryDays:req.body.deliveryDays,
        deliveryCharges:req.body.deliveryCharges,
        PaymentMethod:'Cash On Delivery'
    }
    let products = new Product(obj);
    let result = await products.save();
    resp.send(result);
});

// < ======== Add Product End =============>

// < ========== Edit Product Start =========== >


app.put('/edit-product/:id/:ProductID', upload.array('photos',8),async (req,resp)=>{
    let photoPaths = req.files.map(file => file.path);
    let ID = req.params.id;
    let ProductID = req.params.ProductID;
    let arg = req.body.category.toLowerCase();
    let check = await Category.findOne({name:arg});
    let data;
    if(check){
        data = check._id;
    }
    else{
        let categories = new Category({name:arg});
        let res = await categories.save();
        data = res._id;
    }
    let obj={title:req.body.title,highlights:req.body.highlights,
        photos:photoPaths,
        category:req.body.category,
        category_id:data,
        seller_id:ID,
        rating:req.body.rating,
        price:req.body.price,
        discount_price:req.body.discount_price,
        TotalQty:req.body.TotalQty,
        SoldQty:0,
        Status:'Active',
        deliveryDays:req.body.deliveryDays,
        deliveryCharges:req.body.deliveryCharges,
        PaymentMethod:'Cash On Delivery'
    }
    let result = await Product.updateOne(
        { _id: ProductID, seller_id: ID }, 
        { $set: obj }
      );
    if(result){
        resp.send(result);
    }
});

// < ========== Edit Product End =========== >
// < ========= Add Category Start ===========>

app.post('/add-category',async (req,resp)=>{
    let name = req.body;
    let obj= {name:name};
    let categories = new Category(obj);
    let result = await categories.save();
    resp.send(result);
});

// < ========= Add Category End ===========>

// < ========= Add Cart Start ===========>

app.post('/add-cart/:id/:product_id/:qty',async (req,resp)=>{
    let check = await Cart.findOne({customerID:req.params.id});
    if(check){
        let array = check.product_IDs;
        let Status = false;
        for ( let i=0; i<array.length;i++){
            if(array[i].product == req.params.product_id){
                Status = true;
                array[i].quantity += Number(req.params.qty);
            }
        }
        if(!Status){
            array.push({product:req.params.product_id,quantity:req.params.qty})
        }
        let result = await Cart.updateOne({_id :check._id},{$set:{product_IDs:array}})
        if(result){
            console.log("Updated Cart Successfully");
        }   
        resp.send(result);
    }
    else{
        let product_array=[];
        product_array.push({product:req.params.product_id,quantity:req.params.qty});
        let obj = {customerID:req.params.id,product_IDs:product_array};
        let store = new Cart(obj);
        let result = await store.save();
        if(result){
            console.log("Added to Cart Successfully");
        }
        resp.send(result);
    }
});

// < ========= Add Cart end ===========>

// < ========= Get Product start ===========>

app.use(express.static(path.join(__dirname)));
app.get('/get-products', async(req,res)=>{
        const products = await Product.find();
        if(products){
            res.json(products);
        }
    });

// < ========= Get Product end ===========>

// < ========= Get Cart Products Start ===========>

app.get('/get-cartProduct/:id', async(req,resp)=>{
    let array =[];
    let result = await Cart.findOne({customerID:req.params.id});
    if(result){

        for(let i=0;i<result.product_IDs.length;i++){
            let data = await Product.findOne({_id:result.product_IDs[i].product}).select("-TotalQty").select("-SoldQty").select("category_id").select("seller_id");
            if(data){
                let temp ={_id:data._id,title:data.title,highlights:data.highlights,photos:data.photos,
                    rating:data.rating,price:data.price,discount_price:data.discount_price,Status:data.Status,Qty:result.product_IDs[i].quantity}
                array.push(temp);
            }
        }
        resp.send(array);
    }
    else{
        console.log("Not Got Products");
    }
});

// < ========= Get Cart Products End ===========>

// < ========= Get Single Product Start ===========>

app.get('/get-product/:product_ID', async(req,resp)=>{
    let result = await Product.findOne({_id:req.params.product_ID});
    if(result){
        resp.send(result);
    }
});

// < ========= Order Section Start ===========>

// < ========= Delete Product From Cart Start ===========>

app.delete('/delete-cartProduct/:id/:productID', async(req,resp)=>{
    let result = await Cart.findOne({customerID:req.params.id});
    if(result){
        let array = result.product_IDs;
        for(let i=0;i < array.length;i++){
            if(array[i].product == req.params.productID){
                array.splice(i,1);
                break;
            }
        }
        let check = await Cart.updateOne({customerID:req.params.id},{$set: {product_IDs:array}});
        if(check){
            resp.send(check);
        }
    }
});

// < ========= Delete Product From Cart End ===========>

app.post('/add-order/:id', async (req,resp)=>{
    let products_ID = req.body;
    for(let i =0;i<products_ID.length;i++){
        let check=await Product.updateOne(
            { _id: products_ID[i].product },
            [
                {
                    $set: {
                        SoldQty: { $sum: ["$SoldQty", products_ID[i].quantity] },
                        Status: {
                            $cond: {
                                if: { $eq: ["$TotalQty", { $sum: ["$SoldQty", products_ID[i].quantity] }] },
                                then: "Sold Out",
                                else: "$Status"
                            }
                        }
                    }
                }
            ]
        );
        if(check){
        let updatedProduct = await Product.findOne({_id:products_ID[i].product});
        let difference = Number(updatedProduct.TotalQty - updatedProduct.SoldQty);
        console.log(updatedProduct._id);
        if(difference >= 0){
            let product_check = await Cart.updateMany(
                { 
                    'product_IDs': {
                        $elemMatch: { 
                            $and: [
                                { 'quantity': { $gt: difference } },
                                { 'product': updatedProduct._id }
                            ]
                        } 
                    }
                }, 
                { 
                    $set: { 'product_IDs.$[elem].quantity': difference }
                },
                {
                    arrayFilters: [{ 'elem.quantity': { $gt: difference }, 'elem.product': updatedProduct._id }]
                }
            );                     
            if(product_check){
                console.log("Order Placed");
             }
        }
     }
   }
    let obj = {customerID:req.params.id,product_IDs:req.body};
        let store = new Order(obj);
        let result = await store.save();
        if(result){
            resp.send(result);
        }
});

// < ========= Order Section End ===========>

// < ========== Order Get Section Start ============= >
app.get('/get-Order/:id',async(req,resp)=>{
    let id = req.params.id;
    let result = await Order.findOne({_id:id});
    let array =[];
    if(result){
        for(let x=0;x<result.product_IDs.length;x++){
            let data = await Product.findOne({_id:result.product_IDs[x].product});
            if(data){
                let obj={photos:data.photos,title:data.title,price:data.discount_price,Qty:result.product_IDs[x].quantity,deliveryCharges:data.deliveryCharges};
                array.push(obj);
            }
        }
    }
    resp.send(array);
});

// < ========== Get Orders End ===========>
// < ========= Get Seller Products Start ===========>

app.get('/get-sellerProducts/:seller_id', async(req,resp)=>{
    let result = await Product.find({seller_id:req.params.seller_id});
    if(result){
       resp.send(result);
    }
});

// < ========= Get Seller Products End ===========>

// < ========= Change status (Active/Inactive) Start ===========>

app.put('/statusChange/:product_ID/:checkStatus', async (req,resp)=>{
    let changedStatus = req.params.checkStatus;
    let result = await Product.updateOne({_id:req.params.product_ID},{$set : {SellerStatus:changedStatus}});
    if(result){
        resp.send(result);
    }
});

// < ========= Change status (Active/Inactive) End ===========>

// < ========== Product Filter Implementation Start ===========>

app.get('/search/:key',async (req,resp)=>{
    let key = req.params.key;
    let result = await Product.find({
        "$or":[
           {"title": {$regex : key}},
           {"category": {$regex : key}}
        ]
    });
    resp.send(result);
});

// < ========== Product Filter Implementation End ===========>
app.listen(5000);