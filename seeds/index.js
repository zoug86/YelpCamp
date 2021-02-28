const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Databse connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20 + 10);
        const c = new Campground({
            // Tim user ID
            author: '6014d40f1534c942d4ba7347',
            title: `${sample(places)} ${sample(descriptors)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur modi asperiores doloribus temporibus dolore magnam enim illo quo odio. Id recusandae sequi atque tempore dolorum unde odio natus nostrum excepturi!",
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwuo25yqj/image/upload/v1613022573/YelpCamp/ood762zunxrod1y5h4bu.jpg',
                    filename: 'YelpCamp/ood762zunxrod1y5h4bu'
                },
                {
                    url: 'https://res.cloudinary.com/dwuo25yqj/image/upload/v1613022574/YelpCamp/z2smqejtcqwghnzlte9m.jpg',
                    filename: 'YelpCamp/z2smqejtcqwghnzlte9m'
                }
            ]
        });
        await c.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
});