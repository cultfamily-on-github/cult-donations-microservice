import { assertEquals, fail } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { Parser } from "./parser.ts"

const classUnderTest = Parser.getInstance(5)

Deno.test("test hasInvitedHowMany", async () => {

    const root = {
        host: 'Michael',
        inviteValidatedViaSignature: "",
        invitees: [
            { host: 'Marvena', inviteValidatedViaSignature: "", invitees: [] },
            { host: 'Kateryna', inviteValidatedViaSignature: "", invitees: [] }
        ]
    }

    assertEquals(0, classUnderTest.hasInvitedHowMany("Marvena", root))
    assertEquals(0, classUnderTest.hasInvitedHowMany("Kateryna", root))
    assertEquals(2, classUnderTest.hasInvitedHowMany("Michael", root))

})


Deno.test("test addChildTo", async () => {
    const root = {
        host: 'Michael',
        inviteValidatedViaSignature: "",
        invitees: [
            { host: 'Marvena', inviteValidatedViaSignature: "", invitees: [] },
            { host: 'Kateryna', inviteValidatedViaSignature: "", invitees: [] }
        ]
    }

    let child = { host: 'Enyo', inviteValidatedViaSignature: "", invitees: [] }
    let enrichedRoot = classUnderTest.addChildTo("Marvena", root, "", child)
    child = { host: 'Becky', inviteValidatedViaSignature: "", invitees: [] }
    enrichedRoot = classUnderTest.addChildTo("Marvena", enrichedRoot, "", child)
    let childByName = classUnderTest.getChildByName("Becky", enrichedRoot)
    assertEquals(childByName, { host: 'Becky', inviteValidatedViaSignature: "", invitees: [] })
    child = { host: 'Puppy Fan', inviteValidatedViaSignature: "", invitees: [] }
    enrichedRoot = classUnderTest.addChildTo("Becky", enrichedRoot, "", child)
    childByName = classUnderTest.getChildByName("Puppy Fan", enrichedRoot)
    assertEquals(childByName, { host: 'Puppy Fan', inviteValidatedViaSignature: "", invitees: [] })
    child = { host: 'Cash', inviteValidatedViaSignature: "", invitees: [] }
    enrichedRoot = classUnderTest.addChildTo("Michael", root, "", child)
    assertEquals(classUnderTest.getChildren(enrichedRoot).length, 3)
})

Deno.test("test addChildTo handles duplicates properly", async () => {
    const root = {
        host: 'Michael',
        inviteValidatedViaSignature: "",
        invitees: [
            { host: 'Marvena', inviteValidatedViaSignature: "", invitees: [] },
            { host: 'Kateryna', inviteValidatedViaSignature: "", invitees: [] }
        ]
    }

    let enrichedRoot
    let child = { host: 'Marvena', inviteValidatedViaSignature: "", invitees: [] }
    try {
        enrichedRoot = classUnderTest.addChildTo("Marvena", root, "", child)
        fail("an error should have be thrown")
    } catch (error) {
        assertEquals("Marvena is already present", error.message)
    }
    child = { host: 'Kateryna', inviteValidatedViaSignature: "", invitees: [] }
    try {
        enrichedRoot = classUnderTest.addChildTo("Marvena", root, "", child)
        fail("an error should have be thrown")
    } catch (error) {
        assertEquals("Kateryna is already present", error.message)
    }
    console.log(JSON.stringify(enrichedRoot))
    child = { host: 'Kateryna', inviteValidatedViaSignature: "", invitees: [] }
    try {
        enrichedRoot = classUnderTest.addChildTo("Kateryna", root, "", child)
        fail("an error should have be thrown")
    } catch (error) {
        assertEquals("Kateryna is already present", error.message)
    }
})

