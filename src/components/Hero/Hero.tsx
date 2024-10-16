function Hero({ chainConfigData }: any) {
  const length: any = chainConfigData?.length || 0;

  return (
    <div style={{ marginTop: 100 }}>
      <div id="home" className="d-flex align-items-center position-relative">
        <div className="container">
          <div className="py-8 py-md-9 py-xl-11">
            <div className="row gy-5 align-items-center justify-content-between">
              <div
                className="col-12 col-xl-5"
                data-aos-delay="0"
                data-aos="fade"
                data-aos-duration="1000"
              >
                <div className="max-w-2xl mx-auto mx-xl-0 py-5 py-xl-0">
                  <span className="badge border text-body-emphasis d-inline-flex align-items-center justify-content-between gap-2 rounded-pill fw-medium bg-body-tertiary">
                    <svg
                      className="text-success"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                      fill="currentColor"
                      width="0.375rem"
                      height="0.375rem"
                    >
                      <circle cx="3" cy="3" r="3"></circle>
                    </svg>
                    {length} Networks Available
                  </span>

                  <h1
                    className="m-0 mt-4 text-body-emphasis fw-bold tracking-tight text-6xl"
                    data-aos-delay="0"
                    data-aos="fade"
                    data-aos-duration="1000"
                  >
                    Delegator Dashboard
                  </h1>
                  <span className="text-xs" style={{ color: "#7e7e7e" }}>
                    <i>powered by ValidatorVN</i>
                  </span>
                  <p
                    className="m-0 mt-4 text-lg leading-8 text-body-secondary"
                    data-aos-delay="100"
                    data-aos="fade"
                    data-aos-duration="1000"
                  >
                    The ultimate solution for delegators to track their
                    validators across multiple blockchain networks. Managing
                    your investments has never been easier or more secure.
                  </p>
                </div>
              </div>
              <div className="col-12 col-xl-6 text-center text-xl-start ">
                <div className="max-w-2xl mx-auto mx-xl-0 py-5 py-xl-0">
                  <h1
                    className="m-0 mt-4 text-body-emphasis fw-bold tracking-tight text-6xl"
                    data-aos-delay="0"
                    data-aos="fade"
                    data-aos-duration="1000"
                  >
                    Dashboard Usage
                  </h1>
                  <p
                    className="m-0 mt-4 text-lg leading-8 text-body-secondary"
                    data-aos-delay="100"
                    data-aos="fade"
                    data-aos-duration="1000"
                  >
                    Get real-time insights into validator performance. Track
                    uptime and monitor commission changes effortlessly. Stay
                    informed to protect your stake from risks. Avoid potential
                    slashes with advanced tracking from ValidatorVN.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
