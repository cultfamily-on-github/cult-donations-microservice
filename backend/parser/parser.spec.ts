import { assertEquals, fail } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { Parser } from "./parser.ts"

const classUnderTest = Parser.getInstance()

Deno.test("test addChildTo", async () => {
    const root = {
        host: 'Michael',
        invitees: [
            { host: 'Marvena', invitees: [] },
            { host: 'Kateryna', invitees: [] }
        ]
    }

    let child = { host: 'Enyo', invitees: [] }
    let enrichedRoot = classUnderTest.addChildTo("Marvena", root, child)
    child = { host: 'Becky', invitees: [] }
    enrichedRoot = classUnderTest.addChildTo("Marvena", enrichedRoot, child)
    let childByName = classUnderTest.getChildByName("Becky", enrichedRoot)
    assertEquals(childByName, { host: 'Becky', invitees: [] })
    child = { host: 'Puppy Fan', invitees: [] }
    enrichedRoot = classUnderTest.addChildTo("Becky", enrichedRoot, child)
    childByName = classUnderTest.getChildByName("Puppy Fan", enrichedRoot)
    assertEquals(childByName, { host: 'Puppy Fan', invitees: [] })

})


Deno.test("test addChild", async () => {
    const root = {
        host: 'Michael',
        invitees: [
            { host: 'Kateryna', invitees: [] }
        ]
    }

    let child = { host: 'Marvena', invitees: [{ host: 'Enyo', invitees: [] }, { host: 'Becky', invitees: [] }] }
    let enrichedRoot = classUnderTest.addChild(root, child)
    let children = classUnderTest.getChildren(enrichedRoot)

    assertEquals(children, [{ host: "Kateryna", invitees: [] }, { host: "Marvena", invitees: [{ host: 'Enyo', invitees: [] }, { host: 'Becky', invitees: [] }] }])
    let childByName = classUnderTest.getChildByName("Marvena", enrichedRoot)
    assertEquals(childByName, { host: "Marvena", invitees: [{ host: 'Enyo', invitees: [] }, { host: 'Becky', invitees: [] }] })
    childByName = classUnderTest.getChildByName("Enyo", enrichedRoot)
    assertEquals(childByName, { host: 'Enyo', invitees: [] })
    childByName = classUnderTest.getChildByName("Becky", enrichedRoot)
    assertEquals(childByName, { host: 'Becky', invitees: [] })
    childByName = classUnderTest.getChildByName("Kateryna", enrichedRoot)
    assertEquals(childByName, { host: 'Kateryna', invitees: [] })
})

Deno.test("test addChildTo handles duplicates properly", async () => {
    const root = {
        host: 'Michael',
        invitees: [
            { host: 'Marvena', invitees: [] },
            { host: 'Kateryna', invitees: [] }
        ]
    }

    let enrichedRoot
    let child = { host: 'Marvena', invitees: [] }
    try {
        enrichedRoot = classUnderTest.addChildTo("Marvena", root, child)
        fail("an error should have be thrown")
    } catch (error) {
        assertEquals("Marvena is already present", error.message)
    }
    child = { host: 'Kateryna', invitees: [] }
    try {
        enrichedRoot = classUnderTest.addChildTo("Marvena", root, child)
        fail("an error should have be thrown")
    } catch (error) {
        assertEquals("Kateryna is already present", error.message)
    }
    console.log(JSON.stringify(enrichedRoot))
    child = { host: 'Kateryna', invitees: [] }
    try {
        enrichedRoot = classUnderTest.addChildTo("Kateryna", root, child)
        fail("an error should have be thrown")
    } catch (error) {
        assertEquals("Kateryna is already present", error.message)
    }
    console.log(JSON.stringify(enrichedRoot))
    // assertEquals(childByName, { host: 'Becky', invitees: [] })
})

