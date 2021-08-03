const mongoose = require("mongoose");
const Product = require("./models/product");

const products = [
  {
    name: "Iphone6s",
    img: "https://images.unsplash.com/photo-1605546960121-24e957eb8c15?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
    price: 75000,
    desc: "iPhone 12 Mini on its box set on a marble coffee table with a blue rug in the background.",
  },
  {
    name: "Iphone11",
    img: "https://images.unsplash.com/photo-1586463842855-319cefee28bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1233&q=80",
    price: 60000,
    desc: "iphone 11 Red.",
  },
  {
    name: "macbook pro",
    img: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1057&q=80",
    price: 112000,
    desc: "Macbook Pro With M1 Chipset.",
  },
  {
    name: "macbook air",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1226&q=80",
    price: 90000,
    desc: "Nacbook Air With M1 Chipset.",
  },
  {
    name: "Beats",
    img: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    price: 2500,
    desc: "Beats Headphone That Styles Your Match Everwhere Anytime.",
  },
  {
    name: "Puma",
    img: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: 1200,
    desc: "Puma To Syle You Where Ever You Go.",
  },
  {
    name: "Nike",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: 6000,
    desc: "A Good Match Need Good Brand.",
  },
  {
    name: "Mechanical Keyboard",
    img: "https://images.unsplash.com/photo-1617900906639-cab7adceb499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    price: 2500,
    desc: "Mechanical tkl Keyboard With Blue Switches.",
  },
  {
    name: 'Razer Blade 15.6" ',
    img: "https://images.unsplash.com/photo-1605134513573-384dcf99a44c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    price: 120000,
    desc: "Razer Blade 15.6 inch Gaming Laptop.",
  },
  {
    name: "Logitech g102 Wireless",
    img: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80",
    price: 3000,
    desc: "Logitech Gear g102 Wireless Mouse.",
  },
  {
    name: "Some Old Computer",
    img: "https://images.unsplash.com/photo-1526994108783-48cefc4b9615?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
    price: 30000,
    desc: "save nature take some old og's stuff.",
  },
  {
    name: "Logitech HyperFury g502",
    img: "https://images.unsplash.com/photo-1604171253006-20f7b199b5bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    price: 5000,
    desc: "Upgrading Your gaming With Hyperfury g502 Logitech.",
  },
  {
    name: "Asus Rog Phone 3",
    img: "https://images.unsplash.com/photo-1590653956132-7124afce5a9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
    price: 65000,
    desc: "Unleash Your Gaming With Asus Rog Phone 3.",
  },
  {
    name: "Asus ZenBook",
    img: "https://images.unsplash.com/photo-1620570623737-efc0ec4ab486?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    price: 55000,
    desc: "Asus laptop on black table at night.",
  },
  {
    name: "Xbox One S",
    img: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1178&q=80",
    price: 47000,
    desc: "Xbox One S All-Digital console.",
  },
  {
    name: "Dell XPS",
    img: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: 107000,
    desc: "Dell XPS 13.3 inch 11Gen Intel Core i7 Laptop With Full Features.",
  },
];

const seedDB = async () => {
  await Product.insertMany(products);
  console.log("DB Seeded!!");
};

module.exports = seedDB;
