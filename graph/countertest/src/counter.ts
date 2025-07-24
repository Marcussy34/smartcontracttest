import {
  CountDecremented as CountDecrementedEvent,
  CountIncremented as CountIncrementedEvent,
  CountReset as CountResetEvent
} from "../generated/Counter/Counter"
import {
  CountDecremented,
  CountIncremented,
  CountReset
} from "../generated/schema"

export function handleCountDecremented(event: CountDecrementedEvent): void {
  let entity = new CountDecremented(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newCount = event.params.newCount
  entity.decrementedBy = event.params.decrementedBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCountIncremented(event: CountIncrementedEvent): void {
  let entity = new CountIncremented(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newCount = event.params.newCount
  entity.incrementedBy = event.params.incrementedBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCountReset(event: CountResetEvent): void {
  let entity = new CountReset(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.resetBy = event.params.resetBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
