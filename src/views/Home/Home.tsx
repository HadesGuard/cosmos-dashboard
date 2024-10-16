import Header from "../../components/Header";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer";
import WrapperTable from "./WrapperTable";
import { getChainConfig } from "../../apis/chains";
import { CHAIN_CONFIG_QUERY_KEY } from "../../constants/keys";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { IChainConfig } from "../../constants/type";

export function Home() {
  const { isLoading, data: chainConfigData } = useQuery<IChainConfig[]>({
    queryKey: [CHAIN_CONFIG_QUERY_KEY],
    queryFn: getChainConfig,
    initialData: [],
  });

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {isLoading && <Loading />}
      <Header />
      <Hero chainConfigData={chainConfigData} />

      <WrapperTable chainConfigData={chainConfigData} isLoading={isLoading} />
      <hr />
      <Footer />

      <div className="container">
        <hr className="my-2 text-body-emphasis opacity-10" />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-back-to-top rounded-circle justify-content-center align-items-center p-2 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-arrow-up-short"
          viewBox="0 0 16 16"
        >
          {" "}
          <path
            fillRule="evenodd"
            d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
          />{" "}
        </svg>
      </button>
    </div>
  );
}
