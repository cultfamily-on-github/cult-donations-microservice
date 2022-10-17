import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { Parser } from "./parser.ts"

const classUnderTest = Parser.getInstance()


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



