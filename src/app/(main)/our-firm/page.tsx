import Container from "@/app/components/common/container";
import React from "react";

const OurFirm = () => {
   return (
      <div className="w-full h-auto team flex flex-col">
         <div className="slider w-full flex max-h-[500px] h-full">
            <div className="firm-item w-screen max-h-[500px] lg:h-[500px] md:h-[250px] h-[200px] relative">
               <div className="absolute left-0 top-0 bg-[#0000007a] w-full h-full z-[20]"></div>
               <div className="hero-bigger-container h-full w-full">
                  <Container>
                     <div className="hero-container w-full flex relative z-[200] lg:h-[500px] md:h-[250px] h-[200px] text-white items-end justify-center">
                        <h5 className="lg:text-6xl lg:font-extrabold font-bold lg:mb-12 text-2xl mb-4">
                           OUR FIRM
                        </h5>
                     </div>
                  </Container>
               </div>
            </div>
         </div>
         <div className="firm-inside w-full lg:mt-24 mt-12 lg:mb-24 mb-12">
            <Container>
               <div className="firm-inside-container">
                  <div className="title-container w-full">
                     <h5 className="lg:text-4xl text-2xl font-bold">
                        Strategic Financial Solutions for Sustainable Growth
                     </h5>
                  </div>
                  <div className="paragraph-container mt-8">
                     <p>
                        OMG Capital Advisors is an investment banking firm with
                        over 20 years of experience in local and international
                        financial markets. The company offers comprehensive
                        strategic financial advisory services in areas such as
                        corporate finance, mergers and acquisitions, debt
                        restructuring, and capital raising. It develops tailored
                        solutions to help clients achieve their growth and value
                        creation goals. With a team of experts possessing
                        extensive industry knowledge and in-depth market
                        analysis, the firm provides significant added value to
                        its business partners. It aims to create sustainable and
                        successful financial strategies with a customer-focused
                        approach.
                     </p>
                  </div>
               </div>
            </Container>
         </div>
      </div>
   );
};

export default OurFirm;
