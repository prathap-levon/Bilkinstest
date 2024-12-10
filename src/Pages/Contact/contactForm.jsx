import React from "react";
import ContactForm from "../../Components/Contact/contactForm";
import ContactCertificate from "../../Components/Contact/contactCertificate";
import ContactLocation from "../../Components/Contact/contactLocation";
import { ConatctBanner } from "../../Components/Contact/ConatctBanner";

const ContactPage = () => {
  return (
    <>
      <div className="container-xxl">
      <ConatctBanner />
      <ContactForm />
      <ContactLocation />
      <ContactCertificate />
      </div>
    </>
  );
};

export default ContactPage;