import Elysia from "elysia"

const spokenOnce: string[] = []
const speakersList: {
  new: string[]
  returning: string[]
} = {
  new: ["John", "Jane", "Joe"],
  returning: ["Jill", "Jack", "Jenny"],
}
export type SpeakersList = typeof speakersList

export const speakers = new Elysia({
  prefix: "/speakers",
})
  .get("/", () => speakersList)
  .ws("/ws", {
    open(ws) {
      ws.subscribe("speakers")
      ws.send(speakersList)
    },
    message(ws, message) {
      console.log("Received message:", message)
      const parsed: SpeakerWebsocketMessage = message as any
      switch (parsed.action) {
        case "addSpeaker":
          if (
            speakersList.new.includes(parsed.name) ||
            speakersList.returning.includes(parsed.name)
          ) {
            break
          }
          if (spokenOnce.includes(parsed.name)) {
            speakersList.returning.push(parsed.name)
          } else {
            speakersList.new.push(parsed.name)
          }
          break
        case "removeSpeaker":
          speakersList.new = speakersList.new.filter((name) => name !== parsed.name)
          speakersList.returning = speakersList.returning.filter((name) => name !== parsed.name)
          break
        case "nextSpeaker":
          if (speakersList.new.length === 0) {
            speakersList.returning.shift()
            break
          }
          spokenOnce.push(speakersList.new[0])
          speakersList.new.shift()
          break
        case "resetSpeakersList":
          speakersList.new = []
          speakersList.returning = []
          spokenOnce.length = 0
          break
      }

      console.log("State of speakerslist before publishing", speakersList)
      ws.send(speakersList)
      ws.publish("speakers", speakersList)
    },
  })

export type SpeakerWebsocketMessage =
  | {
      action: "addSpeaker"
      name: string
    }
  | {
      action: "removeSpeaker"
      name: string
    }
  | {
      action: "nextSpeaker"
    }
  | {
      action: "resetSpeakersList"
    }
