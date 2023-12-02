import { expect, test } from "bun:test"
import { SpeakersList } from "./SpeakersList"
import { User } from "@prisma/client"

const user1: User = {
  firstName: "1",
  nickName: "1",
  lastName: "1",
  id: "AAAAAA",
  isMember: true,
  onlyAttendedMaster: false,
  yearAdmitted: 2000,
}

const user2: User = {
  firstName: "2",
  nickName: "2",
  lastName: "2",
  id: "BBBBBB",
  isMember: true,
  onlyAttendedMaster: false,
  yearAdmitted: 2000,
}

test("Speakers list starts empty", () => {
  const sl = new SpeakersList()

  expect(sl.new).toEqual([])
  expect(sl.returning).toEqual([])
})

test("Next removes from new", () => {
  const sl = new SpeakersList()

  sl.add(user1)
  expect(sl.new).toEqual([user1])
  sl.next()
  expect(sl.new).toEqual([])
})

test("Adding returning speaker when new list is empty instantly pushes to new list", () => {
  const sl = new SpeakersList()

  sl.add(user1)
  sl.next()
  sl.add(user1)
  expect(sl.new).toEqual([user1])
  expect(sl.returning).toEqual([])
  sl.next()
  expect(sl.new).toEqual([])
  expect(sl.returning).toEqual([])
})

test("Adding same user twice only adds one", () => {
  const sl = new SpeakersList()

  sl.add(user1)
  sl.add(user1)
  expect(sl.new).toEqual([user1])
})

test("Add and remove user from both lists", () => {
  const sl = new SpeakersList()

  sl.add(user1)
  expect(sl.new).toEqual([user1])
  sl.remove(user1)
  expect(sl.new).toEqual([])
  sl.remove(user1)
  expect(sl.new).toEqual([])

  sl.add(user1)
  sl.next()
  sl.add(user2)
  sl.add(user1)
  expect(sl.returning).toEqual([user1])
  sl.remove(user1)
  expect(sl.new).toEqual([user2])
  expect(sl.returning).toEqual([])
})

test("Removing from new with returing waiting should put waiting first in new", () => {
  const sl = new SpeakersList()

  sl.add(user1)
  sl.next()
  sl.add(user2)
  sl.add(user1)
  sl.remove(user2)
  expect(sl.new).toEqual([user1])
  expect(sl.returning).toEqual([])
})

test("Adding two users, and testing returning list", () => {
  const sl = new SpeakersList()

  sl.add(user1)
  sl.add(user2)
  expect(sl.new).toEqual([user1, user2])
  expect(sl.returning).toEqual([])
  sl.next()
  expect(sl.new).toEqual([user2])
  sl.add(user1)
  expect(sl.new).toEqual([user2])
  expect(sl.returning).toEqual([user1])
  sl.next()
  expect(sl.new).toEqual([user1])
  expect(sl.returning).toEqual([])
})
