import type { User } from "@prisma/client"

export class SpeakersList {
  new: User[]
  returning: User[]
  private spokenOnce: User[]

  constructor() {
    this.new = []
    this.returning = []
    this.spokenOnce = []
  }

  add(user: User) {
    if (this.new.find((x) => x.id === user.id) || this.returning.find((x) => x.id === user.id))
      return

    if (this.spokenOnce.find((x) => x.id === user.id) && this.new.length !== 0) {
      this.returning.push(user)
    } else {
      this.new.push(user)
    }
  }

  remove(user: User) {
    this.new = this.new.filter((x) => x.id !== user.id)
    this.returning = this.returning.filter((x) => x.id !== user.id)
    if (this.new.length === 0 && this.returning[0]) {
      this.new.push(this.returning[0])
      this.returning.shift()
    }
  }

  next() {
    /*if (this.new.length === 0 && this.returning[0]) {
      this.new.push(this.returning[0])
      this.returning.shift()
    } else*/
    if (this.new.length === 1 && this.returning[0]) {
      this.new.push(this.returning[0])
      this.returning.shift()
    }
    this.spokenOnce.push(this.new[0])
    this.new.shift()
  }

  reset() {
    this.new = []
    this.returning = []
    this.spokenOnce = []
  }
}
