const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 3; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63d7d0ff825839d260e415bf",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [-113.1331, 47.0202],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      image: [
        {
          url: "https://res.cloudinary.com/dh9omlcmh/image/upload/v1675679482/YelpCamp/gwpkz2kdub2c17htvmfk.jpg",
          filename: "YelpCamp/gwpkz2kdub2c17htvmfk",
        },
        {
          url: "https://res.cloudinary.com/dh9omlcmh/image/upload/v1676904687/YelpCamp/j6fatnffwleyruvwpeti.jpg",
          filename: "YelpCamp/j6fatnffwleyruvwpeti",
        },
      ],
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta sunt sint officia non porro distinctio quam, provident aperiam debitis suscipit vero praesentium, quas veritatis tenetur officiis magni aspernatur iusto asperiores.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
