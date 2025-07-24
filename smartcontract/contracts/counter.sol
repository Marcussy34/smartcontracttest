// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
    int256 public count;

    // Events for The Graph to index
    event CountIncremented(int256 newCount, address incrementedBy);
    event CountDecremented(int256 newCount, address decrementedBy);
    event CountReset(address resetBy);

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
        emit CountIncremented(count, msg.sender);
    }

    function decrement() public {
        count -= 1;
        emit CountDecremented(count, msg.sender);
    }

    function reset() public {
        count = 0;
        emit CountReset(msg.sender);
    }

    function getCount() public view returns (int256) {
        return count;
    }

} 