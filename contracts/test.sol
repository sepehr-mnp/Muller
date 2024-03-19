// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "./Muller.sol";

contract getMulRateContract{
    function getMul(uint256 up, uint256 down) public pure returns(uint256){
        return Muller.getMulRate(up, down);
    }
    
    function muli(uint256 reg, uint256 rate) public pure returns(uint256){
        return Muller.mul(reg, rate);
    }
    
}