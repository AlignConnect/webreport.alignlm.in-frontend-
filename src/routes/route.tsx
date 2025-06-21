import SidebarAppContent from "@/components/sidebar/Sidebar";
import Protected from "@/layout/Protected";
import CloudeCache from "@/pages/cloude-cache/CloudeCache";
import Cloudflair from "@/pages/cloudflair/Cloudflair";
import Conversion from "@/pages/conversion/Conversion";
import Invitations from "@/pages/invitations/Invitations";
import Ip from "@/pages/ip/Ip";
import Permission from "@/pages/permissions/Permission";
import Settings from "@/pages/settings/Settings";
import Shopify from "@/pages/shopify/Shopify";
import ARAyurvedaReport from "@/pages/ar-report/ArReport";
import SignUp from "@/pages/signup/SignUp";
import Users from "@/pages/users/Users";
import Loader from "@/utils/Loader";
import SelectPage from "@/utils/SelectPage";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("@/pages/login/Login"));
const Dashbaord = lazy(() => import("@/pages/dashboard/Dashbaord"));
const Website = lazy(() => import("@/pages/website/Website"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loader />}>
        <SignUp />
      </Suspense>
    ),
  },

  {
    path: "/",
    element: <Protected />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Dashbaord />
          </Suspense>
        ),
      },
      // {
      //     path: "over-view",
      //     element: <Suspense fallback={<Loader />}>
      //         <Dashbaord />
      //     </Suspense>,
      // },
      {
        path: "/websites",
        element: (
          <Suspense fallback={<Loader />}>
            <Website />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <SelectPage />,
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Loader />}>
                <SidebarAppContent />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "/cloudeflair",
        element: (
          <Suspense fallback={<Loader />}>
            <Cloudflair />
          </Suspense>
        ),
      },
      {
        path: "/shopify",
        element: (
          <Suspense fallback={<Loader />}>
            <Shopify />
          </Suspense>
        ),
      },
      {
        path: "/ar-report",
        element: (
          <Suspense fallback={<Loader />}>
            <ARAyurvedaReport />
          </Suspense>
        ),
      },
      {
        path: "/cache",
        element: (
          <Suspense fallback={<Loader />}>
            <CloudeCache />
          </Suspense>
        ),
      },
      {
        path: "/conversion",
        element: (
          <Suspense fallback={<Loader />}>
            <Conversion />
          </Suspense>
        ),
      },

      {
        path: "/settings",
        element: (
          <Suspense fallback={<Loader />}>
            <Settings />
          </Suspense>
        ),
        children: [
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "invitations",
            element: <Invitations />,
          },
          {
            path: "permissions",
            element: <Permission />,
          },
          {
            path: "ip",
            element: <Ip />,
          },
        ],
      },
    ],
  },
]);

// Then use <RouterProvider router={router} /> in your app entry point
