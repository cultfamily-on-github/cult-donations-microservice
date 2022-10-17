import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { Parser } from "./parser.ts"

const classUnderTest = Parser.getInstance()

Deno.test("test addChildTo", async () => {
    const root = { "host": "Michael", "invitees": [{ "host": "Marvena", "invitees": [{ "host": "Enyo", "invitees": [] }, { "host": "Becky", "invitees": [] }] }, { "host": "Kateryna", "invitees": [] }] }

    let childByName = classUnderTest.getChildByName("Enyo", root)
    assertEquals(childByName, { host: 'Enyo', invitees: [] })
    childByName = classUnderTest.getChildByName("Kateryna", root)
    assertEquals(childByName, { host: 'Kateryna', invitees: [] })
    childByName = classUnderTest.getChildByName("Becky", root)
    assertEquals(childByName, { host: 'Becky', invitees: [] })
    childByName = classUnderTest.getChildByName("Marvena", root)
    assertEquals(childByName, { host: "Marvena", invitees: [{ host: 'Enyo', invitees: [] }, { host: 'Becky', invitees: [] }] })

})

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
    console.log(JSON.stringify(enrichedRoot))
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

    // // add child
    // child = { host: 'Enyo', invitees: [] }
    // enrichedRoot = classUnderTest.addChildTo("Marvena", enrichedRoot, child)
    // children = classUnderTest.getChildren(enrichedRoot)
    // assertEquals(children, [ { host: "Kateryna", invitees: [] }, { host: "Marvena", invitees: [{ host: 'Enyo', invitees: [] }] } ])
})



