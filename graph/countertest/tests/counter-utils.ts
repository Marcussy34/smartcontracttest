import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CountDecremented,
  CountIncremented,
  CountReset
} from "../generated/Counter/Counter"

export function createCountDecrementedEvent(
  newCount: BigInt,
  decrementedBy: Address
): CountDecremented {
  let countDecrementedEvent = changetype<CountDecremented>(newMockEvent())

  countDecrementedEvent.parameters = new Array()

  countDecrementedEvent.parameters.push(
    new ethereum.EventParam(
      "newCount",
      ethereum.Value.fromSignedBigInt(newCount)
    )
  )
  countDecrementedEvent.parameters.push(
    new ethereum.EventParam(
      "decrementedBy",
      ethereum.Value.fromAddress(decrementedBy)
    )
  )

  return countDecrementedEvent
}

export function createCountIncrementedEvent(
  newCount: BigInt,
  incrementedBy: Address
): CountIncremented {
  let countIncrementedEvent = changetype<CountIncremented>(newMockEvent())

  countIncrementedEvent.parameters = new Array()

  countIncrementedEvent.parameters.push(
    new ethereum.EventParam(
      "newCount",
      ethereum.Value.fromSignedBigInt(newCount)
    )
  )
  countIncrementedEvent.parameters.push(
    new ethereum.EventParam(
      "incrementedBy",
      ethereum.Value.fromAddress(incrementedBy)
    )
  )

  return countIncrementedEvent
}

export function createCountResetEvent(resetBy: Address): CountReset {
  let countResetEvent = changetype<CountReset>(newMockEvent())

  countResetEvent.parameters = new Array()

  countResetEvent.parameters.push(
    new ethereum.EventParam("resetBy", ethereum.Value.fromAddress(resetBy))
  )

  return countResetEvent
}
