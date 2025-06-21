import Dateselect from "@/components/header/Dateselect";
import Timeselect from "@/components/header/Timeselect";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
// import StartEndTimePicker from "@/components/header/StartEndTimePicker";

const Website = () => {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 -mt-28">
      {/* Date Selector */}
      <div className="my-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <Dateselect />
        <Timeselect />
        {/* <StartEndTimePicker /> */}
      </div>

      {/* Sidebar and Main Content */}
      <SidebarProvider className="h-full min-h-[630px]">
        <AppSidebar />

        <SidebarInset className="max-w-screen-xl border h-full rounded-2xl overflow-hidden min-h-[630px] bg-white shadow-sm">
          <div className="sm:hidden block">
            <SidebarTrigger></SidebarTrigger>
          </div>

          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Website;
