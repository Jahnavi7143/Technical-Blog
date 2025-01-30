import express, { query } from "express";
import bodyParser from "body-parser";
import fs, { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// var array = [];

var array = [
    { id: 1, title: "AI Revolution", URL: "/images/TechPhoto_1.jpg", Content: "The AI Revolution is transforming the world by integrating artificial intelligence into various industries and everyday life. AI, powered by technologies like machine learning, deep learning, and natural language processing, enables machines to learn, adapt, and make decisions. This revolution is driven by advancements in big data, cloud computing, edge AI, and 5G, allowing AI to process vast amounts of information in real-time.AI is already impacting industries such as healthcare, finance, education, retail, and autonomous vehicles. In healthcare, AI assists in medical diagnoses, robotic surgeries, and drug discovery. In finance, AI-powered fraud detection and algorithmic trading enhance security and efficiency. AI-driven recommendation systems personalize user experiences on platforms like Netflix, YouTube, and Spotify, while smart assistants like Alexa, Siri, and Google Assistant have become part of daily life." , fullName : "John Petter" , year : "2020"},
    { id: 2, title: "Blockchain Trends", URL: "/images/TechPhoto_2.jpg", Content: "Blockchain technology is evolving rapidly, transforming industries beyond just cryptocurrencies. Initially known as the foundation of Bitcoin, blockchain has now expanded into areas such as finance, supply chain management, healthcare, voting systems, and digital identity verification. The key advantage of blockchain is its decentralization, transparency, security, and immutability, making it a game-changer in various sectors.One of the biggest trends in blockchain is the rise of Decentralized Finance (DeFi), which enables financial transactions such as lending, borrowing, and trading without intermediaries like banks. Non-Fungible Tokens (NFTs) have also gained massive popularity, allowing digital assets such as art, music, and virtual real estate to be securely owned and traded on blockchain networks. Meanwhile, Central Bank Digital Currencies (CBDCs) are being explored by governments worldwide to provide a digital alternative to traditional currency." , fullName : "Harish" , year : "2021" },
    { id: 3, title: "Quantum Computing", URL: "/images/TechPhoto_3.jpg", Content: "Quantum computing is an emerging technology that leverages the principles of quantum mechanics to perform computations at unprecedented speeds. Unlike classical computers, which use bits (0s and 1s), quantum computers operate with qubits, which can exist in multiple states simultaneously due to superposition. Additionally, entanglement, another key quantum property, allows qubits to be interconnected, enabling faster and more efficient data processing.This revolutionary approach has the potential to solve complex problems that are beyond the capabilities of traditional computers. Fields such as cryptography, material science, artificial intelligence, drug discovery, and financial modeling stand to benefit significantly. Quantum computers could break traditional encryption methods, leading to the development of quantum-safe cryptography to secure digital communications. In healthcare, quantum simulations can accelerate drug development by modeling molecular interactions at an atomic level, potentially leading to faster breakthroughs in medicine." , fullName : "Anjali Gautham" , year : "2021"}
];


app.get("/",(req,res) => {
    res.render("index.ejs" , 
        { sendDetails : array}
    );
})

app.get("/about" , (req,res) => {
    res.render("about.ejs");
})

app.get("/contact" , (req,res) => {
    res.render("contact.ejs");
})

app.get("/create-card" , (req,res) => {
    res.render("create-card.ejs");
})



app.post("/submit" , (req,res) => {
    var details = req.body;
    var currentYear = new Date().getFullYear();
    var currentDate = new Date().getDate();
    
    if (details.title && details.URL) {

        details.id = array.length + 1;
        details.year = currentYear;
        details.date = currentDate;
        console.log(details);
        array.push(details);
    }
    else {
        var ran = Math.floor(Math.random()*5) + 1;

        details.URL = `/images/TechPhoto_${ran}.jpg`;
        details.year = currentYear;
        details.id = array.length + 1;
        console.log(details);
        array.push(details);
    }

    // saveCards();
    
    res.render("index.ejs" , 
        { sendDetails : array}
    );
})

app.get("/search" , (req,res) => {
    var req_search = req.query.query;

    var result = array.filter((item) => {
        return (
            item.title.toLowerCase().includes(req_search.toLowerCase()) ||
            item.Content.toLowerCase().includes(req_search.toLowerCase())
        );
    })

    res.render("search.ejs" ,
        { search_query : req_search ,
            search_result : result
        }
     );
})

app.get('/post/:id', (req, res) => {
    var postId = parseInt(req.params.id, 10);
    var post = array.find(p => p.id === postId);
    
    if (post) {
      res.render("blogPost.ejs", 
        {sendPost : post,
            sendArray : array 
        }
      );
    } else {
      res.status(404).send('Post not found');
    }
});

app.delete('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const postIndex = array.findIndex(p => p.id === postId);

    if (postIndex !== -1) {
        array.splice(postIndex, 1); 
        res.status(200).json({ message: 'Post deleted successfully' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});


app.listen(port , () => {
    console.log(`Server is running on ${port}`);
})