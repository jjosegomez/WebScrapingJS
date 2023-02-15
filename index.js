console.log("sup webscraping started")

// importing cheerio and axios
const cheerio = require("cheerio")
const axios = require("axios")

async function performWebscraping(){
    // downloading the target web page by performing an HTTP GET request in Axios
    let websiteLink = "https://www.amazon.com/Valentines-Chocolate-Sandwich-Birthday-Corporate/dp/B07ZXQRKZY/ref=sr_1_7?crid=2QFR3OKTRJHVT&keywords=valentines+day+gifts&qid=1676473928&sprefix=%2Caps%2C215&sr=8-7"
    const axiosResponse = await axios.request({
        method: "GET",
        url: websiteLink,

    // By default, Axios will use the following User-Agent: axios <axios_version>
    // This is not what the User-Agent used by a browser looks like. So, anti-scraping technologies may detect and block your Node.js web scraper.
    // Set a valid User-Agent header in Axios by adding the following attribute to the object passed to request():
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
    }
    })

    // parsing the HTML source of the target web page with Cheerio
    const $ = cheerio.load(axiosResponse.data)

    //intialize the datastructure containing the information of the product.

    let product = {
        name: "default",
        price: "default",
        description: [],
    }
    // const productContainer = $("#centerCol")
    product.price = $(".a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay").find(".a-offscreen").text()
    product.name = $("#title").find("#productTitle").text()
    product.description = $(".a-unordered-list.a-vertical.a-spacing-mini").find(".a-list-item").text().split("  ")
    
    console.log("\nproduct name\n" + product.name)
    console.log("\nproduct price\n" + product.price)
    for(let i = 0; i < product.description.length - 1; i++){
        console.log(`\n${i+1}. ${product.description[i]}`)
    }

}
// Note that you can use await only in functions marked with async. 
// This is why you have to embed your JavaScript web scraping logic in the async performScraping() function.

performWebscraping()

