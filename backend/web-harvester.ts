export class WebHarvester {

    public async getEmbedURL(url: string): Promise<string> {

        const pathToWriteTextFile = `${Deno.cwd()}/backend/temp.txt`

        const response = await fetch(url)

        const htmlAtURL = await response.text()
        
        const embedURL = htmlAtURL.split(`"embedUrl":"`)[1].split('"')[0]

        return embedURL

    }
}