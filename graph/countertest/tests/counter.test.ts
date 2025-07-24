import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CountDecremented } from "../generated/schema"
import { CountDecremented as CountDecrementedEvent } from "../generated/Counter/Counter"
import { handleCountDecremented } from "../src/counter"
import { createCountDecrementedEvent } from "./counter-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let newCount = BigInt.fromI32(234)
    let decrementedBy = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCountDecrementedEvent = createCountDecrementedEvent(
      newCount,
      decrementedBy
    )
    handleCountDecremented(newCountDecrementedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("CountDecremented created and stored", () => {
    assert.entityCount("CountDecremented", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CountDecremented",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newCount",
      "234"
    )
    assert.fieldEquals(
      "CountDecremented",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "decrementedBy",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
