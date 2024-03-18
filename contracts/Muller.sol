// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

library Muller {
    function mul(uint256 reg, uint256 rate) internal pure returns (uint256 returner) {
        uint256 up = rate/type(uint128).max;
        uint256 down = rate%type(uint128).max;
        returner = reg * up / down;
    }

    function getMulRate(uint256 up, uint256 down) internal pure returns (uint256 returner){
        returner = (up * type(uint128).max) + down;
    }

}

contract getMulRateContract{
    function getMul(uint256 up, uint256 down) public pure returns(uint256){
        return Muller.getMulRate(up, down);
    }
    
    function muli(uint256 reg, uint256 rate) public pure returns(uint256){
        return Muller.mul(reg, rate);
    }
    
}