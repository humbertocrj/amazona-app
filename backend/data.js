import bcrypt from "bcryptjs";

const data = {
    users:[
        {
            name: 'John',
            email: 'john@example.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin:true,

        },
        {
            name: 'Kate',
            email: 'kate@example.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin:false,

        },

    ],
    products:[
        {
            name:'Nike Slim Shirt',
            category:'Shirts',
            image:'./images/p1.jpg',
            price:46,
            countInStock:10,
            brand:'Nike',
            rating:3.6,
            numReviews:10,
            description:'High quality product', 
        },
        {
            name:'Adidas Slim Shirt',
            category:'Shirts',
            image:'./images/p2.jpg',
            price:33,
            countInStock:20,
            brand:'Adidas',
            rating:2.4,
            numReviews:10,
            description:'High quality product',
        },
        {
            name:'Lacoste Slim Shirt',
            category:'Shirts',
            image:'./images/p3.jpg',
            price:40,
            countInStock:0,
            brand:'Lacoste',
            rating:4.6,
            numReviews:10,
            description:'High quality product',
        },
        {
            name:'Nike Slim Pants',
            category:'Pants',
            image:'./images/p4.jpg',
            price:55,
            countInStock:5,
            brand:'Nike',
            rating:3.888,
            numReviews:10,
            description:'High quality product',
        },
        {
            name:'Adidas Slim Pants',
            category:'Pants',
            image:'./images/p5.jpg',
            price:87,
            countInStock:30,
            brand:'Adidas',
            rating:4,
            numReviews:10,
            description:'High quality product',
        },
        {
            name:'Lacoste Slim Pants',
            category:'Pants',
            image:'./images/p6.jpg',
            price:70,
            countInStock:12,
            brand:'Lacoste',
            rating:1.6,
            numReviews:10,
            description:'High quality product',
        },
    ]
}

export default data;