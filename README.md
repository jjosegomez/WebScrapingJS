# Objective: 
Make my first API using Express and WebScraping with axios, and cheerio.

# Expected output:

projects = [
    {
        name: "project name",
        description: "project description",
        languages: "languages used in the project"
        lastUpdate: "date",
    }
    {
        name: "project name",
        description: "project description",
        languages: "languages used in the project"
        lastUpdate: "date",
    }
    ...
]

where projects[0][data] should display the name of the name of the first project

blocker: I need to figure out how to iterate over the #repository-list element. I need to learn more about how cheerio works and the .each() function.