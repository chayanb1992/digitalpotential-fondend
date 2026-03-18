import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";
import BuyAccounts from "../pages/BuyAccount/BuyAccount";
import SellAccount from "../pages/SellAccount/SellAccount";
import Services from "../pages/Services/Services";
import Support from "../pages/Support/Support";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Dashboard from "./../Component/Dashboard/Dahsboard";
import SellAccounts from "../Component/SellYourAccount/SellYourAccount";
import GrowthServices from "../Component/GrowthService/GrowthService";
import GrowthServicesAll from "./../Component/GrowthService/GrowthServiceAll";
// import AllAccounts from "./../Component/TrendingAccounts/AllAccounts";
import AddFund from "../pages/AddFunds/AddFund";
import WalletDashboard from "./../pages/AddFunds/Wallat";
// import AddFund from "./../pages/AddFunds/AddFund";
import Withdraw from "./../pages/Withdraw/Withdraw";
import MyOrdersPage from "./../pages/MyOrder/MyOrder";
import MyServices from "./../Component/MyServices/MyServices";
import VerifyEmail from "./../pages/VarifyEmail/VarifyEmail";
import AllAccounts from "./../Component/accounts/AllAccounts";
import Categories from "./../pages/Catalog/Catalog";
import Profile from "./../pages/Profile/Profile";
import CreateStore from "./../pages/Store/CreateStore";
import SellerStore from "./../pages/Store/SellerStore";
import AddProduct from "../pages/Product/AddProduct";
import EditProductAccounts from "./../pages/Store/EditProductAccounts";
import AccountInfoCard from "./../Component/accounts/AccountInfoCard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/buyaccount",
        element: <BuyAccounts></BuyAccounts>,
      },
      // {
      //   path: "/sellaccount",
      //   element: <SellAccount></SellAccount>,
      // },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/support",
        element: <Support></Support>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/sell-account",
        element: <SellAccounts></SellAccounts>,
      },
      {
        path: "/growthServices",
        element: <GrowthServicesAll></GrowthServicesAll>,
      },
      {
        path: "/allAccounts",
        element: <AllAccounts></AllAccounts>,
      },
      {
        path: "/wallet",
        element: <WalletDashboard></WalletDashboard>,
      },
      {
        path: "/profile/add-fund",
        element: <AddFund></AddFund>,
      },
      {
        path: "/wallet/withdraw",
        element: <Withdraw></Withdraw>,
      },
      {
        path: "/orders",
        element: <MyOrdersPage></MyOrdersPage>,
      },
      {
        path: "/my-services",
        element: <MyServices></MyServices>,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail></VerifyEmail>,
      },
      {
        path: "/catalog",
        element: <Categories></Categories>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/create-store",
        element: <CreateStore></CreateStore>,
      },
      {
        path: "/seller-store",
        element: <SellerStore></SellerStore>,
      },
      {
        path: "/add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/edit-product/:cardId",
        element: <EditProductAccounts></EditProductAccounts>,
      },
      {
        path: "/accounts/:id",
        element: <AccountInfoCard></AccountInfoCard>,
      },
    ],
  },
]);
