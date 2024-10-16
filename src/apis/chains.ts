import { ACCESS_TOKENS_KEY } from "../constants/keys";
import { EAPITypes, IAddressStaking, IChainConfig } from "../constants/type";
import { BASE_URL, ENDPOINT_APIS } from "../constants/urls";
import apiCaller from "../utils/apiCaller";
import { getLocalStorage } from "../utils/localStorage";

function mergeChainConfigWithInfoResponse(
  chainConfig: IChainConfig[],
  infoResponse: IAddressStaking[]
): IAddressStaking[] {
  return infoResponse.map((info) => {
    // Find the matching chain config by chainId
    const matchingChainConfig = chainConfig.find(
      (config) => config.chainId === info.chainId
    );

    // If matching config is found, add the decimal to info
    if (matchingChainConfig) {
      return {
        ...info,
        decimal: matchingChainConfig.decimal, // Add the decimal field
      };
    }

    // If no matching chain config is found, return the info as is
    return info;
  });
}

export const getChainConfig = async () => {
  const url = BASE_URL + ENDPOINT_APIS.CHAIN_CONFIG;

  return await apiCaller({ method: EAPITypes.GET, url });
};

export const getUserStakingInfo = async (chainConfigData: IChainConfig[]) => {
  const url = BASE_URL + ENDPOINT_APIS.STAKING_INFO;
  const token = getLocalStorage(ACCESS_TOKENS_KEY);
  const responseAPi = await apiCaller({
    method: EAPITypes.GET,
    url,
    token,
  });
  return mergeChainConfigWithInfoResponse(chainConfigData, responseAPi);
};

export const updateUserStakingInfo = async (
  address: string,
  chainId: string
) => {
  const url = BASE_URL + ENDPOINT_APIS.UPDATE_ADDRESS;
  const token = getLocalStorage(ACCESS_TOKENS_KEY);
  const payload = {
    address,
    chainId,
  };
  return await apiCaller({ method: EAPITypes.POST, url, token, payload });
};

export const unSubscribeUserStakingInfo = async (address: string) => {
  const url = BASE_URL + ENDPOINT_APIS.DELETE_ADDRESS + "/" + address;
  const token = getLocalStorage(ACCESS_TOKENS_KEY);

  return await apiCaller({ method: EAPITypes.DELETE, url, token });
};
