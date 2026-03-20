import React from "react";
import Hero from "../../Component/HeroSection/Hero";
import Platforms from "../../Component/Platform/Platforms";
// import TrendingAccounts from "../../Component/TrendingAccounts/TrendingAccounts";
import HowItWorks from "../../Component/HowItWork/HowItWork";
import Testimonials from "../../Component/Testimonials/Testimonials";
import SellAccountCTA from "../../Component/SellAccountCTA";
import FAQSection from "../../Component/FAQSection/FAQSection";
import GrowthServices from "../../Component/GrowthService/GrowthService";
import { ToastContainer } from "react-toastify";
import TrendingAccounts from "./../../Component/accounts/TrendingAccounts";

const Home = () => {
  return (
    <div>
      {/* <h1>This is home</h1> */}
      <Hero></Hero>
      <Platforms></Platforms>
      <TrendingAccounts></TrendingAccounts>
      {/* <GrowthServices></GrowthServices> */}
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      {/* <SellAccountCTA></SellAccountCTA> */}
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
