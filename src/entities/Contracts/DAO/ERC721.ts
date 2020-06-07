import BN from "bn.js";
import { Address } from "web3x/address";
import { EventLog, TransactionReceipt } from "web3x/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x/contract";
import { Eth } from "web3x/eth";
import abi from "./ERC721Abi";
export type TransferEvent = {
  from: Address;
  to: Address;
  tokenId: string;
};
export type ApprovalEvent = {
  owner: Address;
  approved: Address;
  tokenId: string;
};
export type ApprovalForAllEvent = {
  owner: Address;
  operator: Address;
  approved: boolean;
};
export interface TransferEventLog extends EventLog<TransferEvent, "Transfer"> {
}
export interface ApprovalEventLog extends EventLog<ApprovalEvent, "Approval"> {
}
export interface ApprovalForAllEventLog extends EventLog<ApprovalForAllEvent, "ApprovalForAll"> {
}
interface ERC721Events {
  Transfer: EventSubscriptionFactory<TransferEventLog>;
  Approval: EventSubscriptionFactory<ApprovalEventLog>;
  ApprovalForAll: EventSubscriptionFactory<ApprovalForAllEventLog>;
}
interface ERC721EventLogs {
  Transfer: TransferEventLog;
  Approval: ApprovalEventLog;
  ApprovalForAll: ApprovalForAllEventLog;
}
interface ERC721TxEventLogs {
  Transfer: TransferEventLog[];
  Approval: ApprovalEventLog[];
  ApprovalForAll: ApprovalForAllEventLog[];
}
export interface ERC721TransactionReceipt extends TransactionReceipt<ERC721TxEventLogs> {
}
interface ERC721Methods {
  supportsInterface(interfaceId: string): TxCall<boolean>;
  name(): TxCall<string>;
  getApproved(tokenId: number | string | BN): TxCall<Address>;
  approve(to: Address, tokenId: number | string | BN): TxSend<ERC721TransactionReceipt>;
  totalSupply(): TxCall<string>;
  transferFrom(from: Address, to: Address, tokenId: number | string | BN): TxSend<ERC721TransactionReceipt>;
  tokenOfOwnerByIndex(owner: Address, index: number | string | BN): TxCall<string>;
  safeTransferFrom(from: Address, to: Address, tokenId: number | string | BN): TxSend<ERC721TransactionReceipt>;
  tokenByIndex(index: number | string | BN): TxCall<string>;
  ownerOf(tokenId: number | string | BN): TxCall<Address>;
  balanceOf(owner: Address): TxCall<string>;
  symbol(): TxCall<string>;
  setApprovalForAll(to: Address, approved: boolean): TxSend<ERC721TransactionReceipt>;
  safeTransferFrom(from: Address, to: Address, tokenId: number | string | BN, _data: string): TxSend<ERC721TransactionReceipt>;
  tokenURI(tokenId: number | string | BN): TxCall<string>;
  isApprovedForAll(owner: Address, operator: Address): TxCall<boolean>;
}
export interface ERC721Definition {
  methods: ERC721Methods;
  events: ERC721Events;
  eventLogs: ERC721EventLogs;
}
export class ERC721 extends Contract<ERC721Definition> {
  constructor(eth: Eth, address?: Address, options?: ContractOptions) {
    super(eth, abi, address, options);
  }
  deploy(name: string, symbol: string): TxSend<ERC721TransactionReceipt> {
    return super.deployBytecode("0x60806040523480156200001157600080fd5b506040516200232b3803806200232b833981018060405260408110156200003757600080fd5b8101908080516401000000008111156200005057600080fd5b828101905060208101848111156200006757600080fd5b81518560018202830111640100000000821117156200008557600080fd5b50509291906020018051640100000000811115620000a257600080fd5b82810190506020810184811115620000b957600080fd5b8151856001820283011164010000000082111715620000d757600080fd5b50509291905050508181620000f96301ffc9a760e01b6200017d60201b60201c565b620001116380ac58cd60e01b6200017d60201b60201c565b6200012963780e9d6360e01b6200017d60201b60201c565b81600990805190602001906200014192919062000286565b5080600a90805190602001906200015a92919062000286565b5062000173635b5e139f60e01b6200017d60201b60201c565b5050505062000335565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614156200021a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433136353a20696e76616c696420696e746572666163652069640000000081525060200191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002c957805160ff1916838001178555620002fa565b82800160010185558215620002fa579182015b82811115620002f9578251825591602001919060010190620002dc565b5b5090506200030991906200030d565b5090565b6200033291905b808211156200032e57600081600090555060010162000314565b5090565b90565b611fe680620003456000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80634f6ccce711610097578063a22cb46511610066578063a22cb46514610590578063b88d4fde146105e0578063c87b56dd146106e5578063e985e9c51461078c57610100565b80634f6ccce7146104055780636352211e1461044757806370a08231146104b557806395d89b411461050d57610100565b806318160ddd116100d357806318160ddd146102a957806323b872dd146102c75780632f745c591461033557806342842e0e1461039757610100565b806301ffc9a71461010557806306fdde031461016a578063081812fc146101ed578063095ea7b31461025b575b600080fd5b6101506004803603602081101561011b57600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610808565b604051808215151515815260200191505060405180910390f35b61017261086f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101b2578082015181840152602081019050610197565b50505050905090810190601f1680156101df5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102196004803603602081101561020357600080fd5b8101908080359060200190929190505050610911565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102a76004803603604081101561027157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109ac565b005b6102b1610b85565b6040518082815260200191505060405180910390f35b610333600480360360608110156102dd57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b92565b005b6103816004803603604081101561034b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c01565b6040518082815260200191505060405180910390f35b610403600480360360608110156103ad57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610cc0565b005b6104316004803603602081101561041b57600080fd5b8101908080359060200190929190505050610ce0565b6040518082815260200191505060405180910390f35b6104736004803603602081101561045d57600080fd5b8101908080359060200190929190505050610d60565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104f7600480360360208110156104cb57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e28565b6040518082815260200191505060405180910390f35b610515610efd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561055557808201518184015260208101905061053a565b50505050905090810190601f1680156105825780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105de600480360360408110156105a657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050610f9f565b005b6106e3600480360360808110156105f657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561065d57600080fd5b82018360208201111561066f57600080fd5b8035906020019184600183028401116401000000008311171561069157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611142565b005b610711600480360360208110156106fb57600080fd5b81019080803590602001909291905050506111b4565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610751578082015181840152602081019050610736565b50505050905090810190601f16801561077e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6107ee600480360360408110156107a257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506112c7565b604051808215151515815260200191505060405180910390f35b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b606060098054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109075780601f106108dc57610100808354040283529160200191610907565b820191906000526020600020905b8154815290600101906020018083116108ea57829003601f168201915b5050505050905090565b600061091c8261135b565b610971576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180611eb9602c913960400191505060405180910390fd5b6002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006109b782610d60565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610a3e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180611f3d6021913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610a7e5750610a7d81336112c7565b5b610ad3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526038815260200180611e2e6038913960400191505060405180910390fd5b826002600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a4505050565b6000600780549050905090565b610b9c33826113cd565b610bf1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526031815260200180611f5e6031913960400191505060405180910390fd5b610bfc8383836114c1565b505050565b6000610c0c83610e28565b8210610c63576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180611d81602b913960400191505060405180910390fd5b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110610cad57fe5b9060005260206000200154905092915050565b610cdb83838360405180602001604052806000815250611142565b505050565b6000610cea610b85565b8210610d41576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180611f8f602c913960400191505060405180910390fd5b60078281548110610d4e57fe5b90600052602060002001549050919050565b6000806001600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610e1f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180611e906029913960400191505060405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610eaf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180611e66602a913960400191505060405180910390fd5b610ef6600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206114e5565b9050919050565b6060600a8054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f955780601f10610f6a57610100808354040283529160200191610f95565b820191906000526020600020905b815481529060010190602001808311610f7857829003601f168201915b5050505050905090565b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611041576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4552433732313a20617070726f766520746f2063616c6c65720000000000000081525060200191505060405180910390fd5b80600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051808215151515815260200191505060405180910390a35050565b61114d848484610b92565b611159848484846114f3565b6111ae576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526032815260200180611dac6032913960400191505060405180910390fd5b50505050565b60606111bf8261135b565b611214576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f815260200180611f0e602f913960400191505060405180910390fd5b600b60008381526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112bb5780601f10611290576101008083540402835291602001916112bb565b820191906000526020600020905b81548152906001019060200180831161129e57829003601f168201915b50505050509050919050565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000806001600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415915050919050565b60006113d88261135b565b61142d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180611e02602c913960400191505060405180910390fd5b600061143883610d60565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806114a757508373ffffffffffffffffffffffffffffffffffffffff1661148f84610911565b73ffffffffffffffffffffffffffffffffffffffff16145b806114b857506114b781856112c7565b5b91505092915050565b6114cc8383836116dc565b6114d68382611937565b6114e08282611ad5565b505050565b600081600001549050919050565b60006115148473ffffffffffffffffffffffffffffffffffffffff16611b9c565b61152157600190506116d4565b60008473ffffffffffffffffffffffffffffffffffffffff1663150b7a02338887876040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156115fc5780820151818401526020810190506115e1565b50505050905090810190601f1680156116295780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561164b57600080fd5b505af115801561165f573d6000803e3d6000fd5b505050506040513d602081101561167557600080fd5b8101908080519060200190929190505050905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150505b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff166116fc82610d60565b73ffffffffffffffffffffffffffffffffffffffff1614611768576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180611ee56029913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156117ee576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180611dde6024913960400191505060405180910390fd5b6117f781611baf565b61183e600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611c6d565b611885600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611c90565b816001600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b600061198f6001600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050611ca690919063ffffffff16565b9050600060066000848152602001908152602001600020549050818114611a7c576000600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002083815481106119fc57fe5b9060005260206000200154905080600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208381548110611a5457fe5b9060005260206000200181905550816006600083815260200190815260200160002081905550505b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480919060019003611ace9190611d2f565b5050505050565b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490506006600083815260200190815260200160002081905550600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150509060018203906000526020600020016000909192909190915055505050565b600080823b905060008111915050919050565b600073ffffffffffffffffffffffffffffffffffffffff166002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611c6a5760006002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b611c8560018260000154611ca690919063ffffffff16565b816000018190555050565b6001816000016000828254019250508190555050565b600082821115611d1e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525060200191505060405180910390fd5b600082840390508091505092915050565b815481835581811115611d5657818360005260206000209182019101611d559190611d5b565b5b505050565b611d7d91905b80821115611d79576000816000905550600101611d61565b5090565b9056fe455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314d657461646174613a2055524920717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243373231456e756d657261626c653a20676c6f62616c20696e646578206f7574206f6620626f756e6473a165627a7a723058204371caee475544d036348484a9307026f75f0c3e6868e4963af689817b4a01820029", name, symbol) as any;
  }
}
export var ERC721Abi = abi;