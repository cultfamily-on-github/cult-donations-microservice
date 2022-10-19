import { assertEquals, fail } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { Parser } from "./parser.ts"

const classUnderTest = Parser.getInstance()

Deno.test("test hasInvitedHowMany", async () => {

    const root = {
        host: 'Michael',
        signature: "",
        invitees: [
            { host: 'Marvena', signature: "", invitees: [] },
            { host: 'Kateryna', signature: "", invitees: [] }
        ]
    }

    assertEquals(0, classUnderTest.hasInvitedHowMany("Marvena", root))
    assertEquals(0, classUnderTest.hasInvitedHowMany("Kateryna", root))
    assertEquals(2, classUnderTest.hasInvitedHowMany("Michael", root))

})


Deno.test("test addChildTo", async () => {
    const root = {
        host: 'Michael',
        signature: "",
        invitees: [
            { host: 'Marvena', signature: "", invitees: [] },
            { host: 'Kateryna', signature: "", invitees: [] }
        ]
    }

    let child = { host: 'Enyo', signature: "", invitees: [] }
    let enrichedRoot = classUnderTest.addChildTo("Marvena", root, "", child)
    child = { host: 'Becky', signature: "", invitees: [] }
    enrichedRoot = classUnderTest.addChildTo("Marvena", enrichedRoot, "", child)
    let childByName = classUnderTest.getChildByName("Becky", enrichedRoot)
    assertEquals(childByName, { host: 'Becky', signature: "", invitees: [] })
    child = { host: 'Puppy Fan', signature: "", invitees: [] }
    enrichedRoot = classUnderTest.addChildTo("Becky", enrichedRoot, "", child)
    childByName = classUnderTest.getChildByName("Puppy Fan", enrichedRoot)
    assertEquals(childByName, { host: 'Puppy Fan', signature: "", invitees: [] })
    child = { host: 'Cash', signature: "", invitees: [] }
    enrichedRoot = classUnderTest.addChildTo("Michael", root, "", child)
    assertEquals(classUnderTest.getChildren(enrichedRoot).length, 3)
})

Deno.test("test addChildTo handles duplicates properly", async () => {
    const root = {
        host: 'Michael',
        signature: "",
        invitees: [
            { host: 'Marvena', signature: "", invitees: [] },
            { host: 'Kateryna', signature: "", invitees: [] }
        ]
    }

    let enrichedRoot
    let child = { host: 'Marvena', signature: "", invitees: [] }
    try {
        enrichedRoot = classUnderTest.addChildTo("Marvena", root, "", child)
        fail("an error should have be thrown")
    } catch (error) {
        assertEquals("Marvena is already present", error.message)
    }
    child = { host: 'Kateryna', signature: "", invitees: [] }
    try {
        enrichedRoot = classUnderTest.addChildTo("Marvena", root, "", child)
        fail("an error should have be thrown")
    } catch (error) {
        assertEquals("Kateryna is already present", error.message)
    }
    console.log(JSON.stringify(enrichedRoot))
    child = { host: 'Kateryna', signature: "", invitees: [] }
    try {
        enrichedRoot = classUnderTest.addChildTo("Kateryna", root, "", child)
        fail("an error should have be thrown")
    } catch (error) {
        assertEquals("Kateryna is already present", error.message)
    }
})

