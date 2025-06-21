import { Card, CardContent } from "@/components/ui/card";
import OrderTable from "./OrderTable";
import LeadTable from "./LeadTable";

const OverviewContent = () => {
  return (
    <div>
      <Card className="border-none drop-shadow-sm bg-white">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OrderTable />
          <LeadTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewContent;
