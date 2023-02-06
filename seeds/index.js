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
  for (let i = 0; i < 5; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63d7d0ff825839d260e415bf",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: [
        {
          url: "https://res.cloudinary.com/dh9omlcmh/image/upload/v1675679470/YelpCamp/t9pkuk0plh3yykcbiymz.jpg",
          filename: "YelpCamp/t9pkuk0plh3yykcbiymz",
        },
        {
          url: "https://res.cloudinary.com/dh9omlcmh/image/upload/v1675679473/YelpCamp/lnaxnaw7m12jnjx6y1s2.jpg",
          filename: "YelpCamp/lnaxnaw7m12jnjx6y1s2",
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
