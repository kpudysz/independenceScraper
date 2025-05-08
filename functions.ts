import axios from 'axios'
import * as dotenv from 'dotenv'
import * as cheerio from 'cheerio'
import { getUnixTime } from 'date-fns'

dotenv.config()

export const scrapPlayersFromHighscores = async () => {
    const dayOfMonth = new Date().getDate()
    const token = dayOfMonth >= 1 && dayOfMonth <= 15 ? process.env.SCRAP_TOKEN : process.env.SCRAP_TOKENTWO
    const targetUrl = encodeURIComponent("https://rookgaard.live/highscores.php?type=7&vocation=all&page=1")
    const config = {
        'method': 'GET',
        'url': `https://api.scrape.do/?token=${token}&url=${targetUrl}&render=true`,
        'headers': {}
    };
    return axios(config)
        .then(response => {
            const $ = cheerio.load(response.data)
            const rows = $('.table tr').toArray()
            const currentUnix = getUnixTime(new Date())

            return rows.slice(1).map(row => {
                const name = $(row).find('a').first().text().trim()
                const experience = $(row).find('td').last().text().trim()

                return { name, experience: Number(experience), date: currentUnix }
            })
        })
        .catch(error => {
            console.log('Scrapping Failed', error)

            return []
        })
}

