// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
    int256 public count;

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
    }

    function decrement() public {
        count -= 1;
    }

    function reset() public {
        count = 0;
    }

    function getCount() public view returns (int256) {
        return count;
    }

} 