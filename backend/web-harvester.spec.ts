import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { Request } from 'https://deno.land/x/request@1.3.2/mod.ts'
import { WebHarvester } from "./web-harvester.ts"


const webHarvester = new WebHarvester()

Deno.test("get embedurl", async () => {
    
    const embedURL = await webHarvester.getEmbedURL("https://rumble.com/v1lf51r-cultdao-in-100-seconds-michael-saylor-talks-about-cult.html")

    assertEquals(embedURL, "https://rumble.com/embed/v1isz4j/")
})