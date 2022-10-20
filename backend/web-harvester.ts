export class WebHarvester {

    public async getEmbedURL(url: string): Promise<string> {

        console.log(`fetching html from: ${url}`)
        const response = await fetch(url)

        const htmlAtURL = await response.text()
        
        const embedURL = htmlAtURL.split(`"embedUrl":"`)[1].split('"')[0]

        return embedURL

    }

    public async getOGImageURL(url: string): Promise<string> {

        console.log(`fetching html from: ${url}`)
        const response = await fetch(url)

        const htmlAtURL = await response.text()
        
        const ogImageURL = htmlAtURL.split(` property="og:image" content="`)[1].split('"')[0]

        return ogImageURL

    }
}