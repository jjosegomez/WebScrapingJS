console.log("sup webscraping started")

// importing cheerio and axios
const cheerio = require("cheerio")
const axios = require("axios")

async function performWebscraping(){
    // downloading the target web page by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://github.com/jjosegomez?tab=repositories",

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

    let projects = {}

    repositoryList = $(".position-relative").find("#user-repositories-list").each((index,element) => {
        project = [] // array[ name, description, language]
        const name = $(element).find("a").text()
        const description = []
        const language = []

        project.push(name)
        project.push(description)
        project.push(language)
        projects[index] = project
    })

    console.log(projects)
}
// Note that you can use await only in functions marked with async. 
// This is why you have to embed your JavaScript web scraping logic in the async performScraping() function.

performWebscraping()
