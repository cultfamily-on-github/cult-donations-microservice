import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { InviteService } from "./invite-service.ts"

const classUnderTest = InviteService.getInstance()

Deno.test("test getPublicWalletAddressFromSignature", async () => {

    const signature = "0x34c5488e7dfe6ea131a55d179aa8c0d45283d1bd800383301983dc43695116374afed24faecd135f9ecfbde8f110e06a5ce0df45711d5e91117aa55ce39c853b1c"

    const publicWalletAddress = await classUnderTest.getPublicWalletAddressFromSignature(signature)

    assertEquals(publicWalletAddress, "0x9E972a43B3B8D68cD70930697E16429E47E88151")
})
