import { assertEquals, fail } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { Parser } from "./parser.ts"

const classUnderTest = Parser.getInstance()

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

})


Deno.test("test addChild", async () => {
    const root = {
        host: 'Michael',
        signature: "",
        invitees: [
            { host: 'Kateryna', signature: "", invitees: [] }
        ]
    }

    let child = { host: 'Marvena', signature: "", invitees: [{ host: 'Enyo', signature: "", invitees: [] }, { host: 'Becky', signature: "", invitees: [] }] }
    let enrichedRoot = classUnderTest.addChild(root, "", child)
    let children = classUnderTest.getChildren(enrichedRoot)

    assertEquals(children, [{ host: "Kateryna", signature: "", invitees: [] }, { host: "Marvena", signature: "", invitees: [{ host: 'Enyo', signature: "", invitees: [] }, { host: 'Becky', signature: "", invitees: [] }] }])
    let childByName = classUnderTest.getChildByName("Marvena", enrichedRoot)
    assertEquals(childByName, { host: "Marvena", signature: "", invitees: [{ host: 'Enyo', signature: "", invitees: [] }, { host: 'Becky', signature: "", invitees: [] }] })
    childByName = classUnderTest.getChildByName("Enyo", enrichedRoot)
    assertEquals(childByName, { host: 'Enyo', signature: "", invitees: [] })
    childByName = classUnderTest.getChildByName("Becky", enrichedRoot)
    assertEquals(childByName, { host: 'Becky', signature: "", invitees: [] })
    childByName = classUnderTest.getChildByName("Kateryna", enrichedRoot)
    assertEquals(childByName, { host: 'Kateryna', signature: "", invitees: [] })
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
    console.log(JSON.stringify(enrichedRoot))
    // assertEquals(childByName, { host: 'Becky', signature: "", invitees: [] })
})

