console.log("sup webscraping started")


class Project {
    constructor(name, description, language, lastUpdate) {
      this.name = name;
      this.description = description;
      this.language = language;
      this.lastUpdate = lastUpdate;
    }
  }

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
    let projectNumber = $("div").find("a.UnderlineNav-item.js-responsive-underlinenav-item.js-selected-navigation-item.selected > span").text()
    console.log(`there are a total of ${projectNumber} projects in juan's repository`)

   
    let projectList = []
    repositoryList = $("#user-profile-frame").find("#user-repositories-list").each((index,element) => {
        const name = $(element).find("h3 > a").text().trim().split("\n")
        const description = $(element).find("div:nth-child(2) > p").text().split("\n")
        const language = $(element).find("div.f6.color-fg-muted.mt-2 > span").text().split("\n")
        const lastUpdate = $(element).find().text().split("\n")
        // parsing the input.
        // for(let i = 0)
        project = new Project(name,description,language,lastUpdate)
        projectList.push(project)
    })
    console.log(projectList)
}
// Note that you can use await only in functions marked with async. 
// This is why you have to embed your JavaScript web scraping logic in the async performScraping() function.

performWebscraping()
