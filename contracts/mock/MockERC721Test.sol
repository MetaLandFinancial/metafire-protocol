// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.4;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockERC721Test
 * @dev ERC721 mock contract with 0.01 ether mint price
 */
contract MockERC721Test is ERC721Enumerable, Ownable {
  string public baseURI;
  mapping(address => uint256) public mintCounts;
  uint256 private _totalSupply;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    baseURI = "https://MintableERC721/";
  }

  /**
   * @dev Function to mint tokens
   * @return A boolean that indicates if the operation was successful.
   */
  function mint() external payable returns (bool) {
    require(msg.value == 0.01 ether, "mint price mismatch");

    mintCounts[_msgSender()] += 1;
    require(mintCounts[_msgSender()] <= 10, "exceed mint limit");

    _mint(_msgSender(), _totalSupply);
    _totalSupply ++;
    return true;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function setBaseURI(string memory baseURI_) external onlyOwner {
    baseURI = baseURI_;
  }

  function withdraw(uint256 value) external onlyOwner {
    require(address(this).balance >= value, "not enough fund");
    (bool sent,) = owner().call{value: value}("");
    require(sent, "failed to send Ether");
  }
}
