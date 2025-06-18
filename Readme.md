# Independence Scraper

## Description
This project is a backend part of the independence calculator.

## Tools used
- NestJS
- MongoDB
- Axios
- Cheerio
- Mongoose
- Nodemailer
- Typescript

## Running Locally
To run this project locally you require few envs:
- MONGODB_URI - MongoDB connection string, you can get it from MongoDB Atlas
- SCRAP_TOKEN - Scrap token used for scraping data from the website and bypass the cloudflare protection. This token will be used during during first two weeks of the month. You can get it from [here](https://api.scrape.do)
- SCRAP_TOKENTWO - Second scrap token used for scraping data from the website and bypass the cloudflare protection. This token will be used during during last two weeks of the month.
- SMTP_USER - SMTP user used for sending emails
- SMTP_PASS - SMTP password used for sending emails
- SMTP_RECIPIENT - SMTP recipient used for sending emails

After you have all required envs run ```yarn build``` and ```yarn start```
to start the app.

## Endpoints
- GET /highscores
Gets highscores from the database, you can filter them by dateFrom and dateTo. This is used by Progress Monitor.

- POST /highscores/scrape
Scrapes highscores from the website and stores them in the database. The data is later fetched by Progress Monitor.

- GET /highscores/healthCheck
Health check endpoint, returns 'Ok' if the app is running. Used alongside with notifications to check if the app is running.

- POST /wiki/send-suggestion
Sends a suggestion from the wiki page to the email.

## Potential Improvements
1. One day database will be full since I used free plan. It will take roughly a decade to fill up. Another cronjob could be added along with additional endpoint to delete old data to free up some space.
