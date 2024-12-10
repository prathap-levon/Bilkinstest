import React from "react";
import SearchService from "../../Components/Service/SearchService";
import { ClienteleNew } from "../../Components/Home/clienteleNew";
import ServiceFAQs from "../../Components/Service/ServiceFAQs"
import ServiceBanner from "../../Components/Service/serviceBanner";


const Service = () => {
    return (
        <>
            <ServiceBanner />
            <SearchService />
            <ClienteleNew />
            <ServiceFAQs />
        </>
    );
};
export default Service;