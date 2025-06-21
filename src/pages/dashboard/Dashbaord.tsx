import Chart from "@/features/dashboard/components/Chart";
import Datagrid from "@/features/dashboard/components/Datagrid";
import Dateselect from "@/features/dashboard/components/Dateselect";
import Orderpie from "@/features/dashboard/components/Orderpie";

const Dashboard = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Date Selector */}
        <div className="lg:col-span-1">
          <Dateselect />
        </div>

        {/* Data Cards */}
        <div className="lg:col-span-3">
          <Datagrid />
        </div>

        {/* Chart and Pie */}
        <div className="lg:col-span-2">
          <Chart />
        </div>

        <div className="lg:col-span-1">
          <Orderpie />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
