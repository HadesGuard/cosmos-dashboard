export enum EAPITypes {
  "GET" = "GET",
  "POST" = "POST",
  "PUT" = "PUT",
  "DELETE" = "DELETE",
}

export interface UserAuth {
  email: string;
  userId: string;
  iat: number;
  exp: number;
}

export interface IAddressStaking {
  chainId: string;
  chainName: string;
  address: string;
  stakingInfo: IStakingInfo[];
  decimal?: number;
}

export interface IAmount {
  amount: string;
  denom: string;
}

export interface IStakingInfo {
  address: string;
  staked: IAmount;
  rewards: IAmount;
  commission: number;
  validator: string;
  validatorAddress: string;
  uptime: number;
  jailed: boolean;
  governanceParticipation: string;
  isSubscribed: boolean;
  avatar: string;
}

export interface IChainConfig {
  _id: string;
  chainName: string;
  rpcUrl: string;
  apiUrl: string;
  chainId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  minSignedPerWindow: number;
  signedBlocksWindow: number;
  decimal: number;
  logoUrl: string;
}
