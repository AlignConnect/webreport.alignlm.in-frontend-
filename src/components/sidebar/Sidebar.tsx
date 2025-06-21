import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNewWebsite } from "@/features/websites/hooks/use-new-webites";
import { DataTable } from "../data-table";
import { columns } from "../websites/Column";
import { useGetReport } from "@/features/report/api/use-get-report";
import { useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { useDateSelectWebsite } from "@/features/websites/hooks/use-dateselect-websites";
// import { endOfDay, startOfDay } from "date-fns";
import { useEffect } from "react";
import { toast } from "sonner";
import { usePermissionQuery } from "@/utils/IPChecker";
import { CREATE_WEBSITES } from "@/utils/permission";
import ViewProduct from "@/features/websites/components/View-product";

const SidebarAppContent = () => {
  const { onOpen } = useNewWebsite();

  const { data: permission } = usePermissionQuery();

  const { id } = useParams();

  const { date } = useDateSelectWebsite();
  const {
    data: report,
    isSuccess,
    isFetching,
    isLoading,
  } = useGetReport(id!, {
    from: date.from!,
    to: date.to!,
  });

  console.log(report?.data?.products);

  useEffect(() => {
    let toastId: string | number;

    if (isFetching && !isLoading) {
      toastId = toast.loading("Loading...");
    }
    return () => {
      toast.dismiss(toastId);
    };
  }, [isFetching]);

  if (isLoading) {
    return (
      <Card className="border-none drop-shadow-s">
        <CardHeader className="gap-y-2 flex items-center justify-between">
          <CardTitle className="text-xl line-clamp-6">
            <Skeleton className="w-[200px] h-[50px]" />
          </CardTitle>

          <Skeleton className="w-[200px] h-[50px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[550px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {isSuccess && (
        <Card className="border-none drop-shadow-s">
          <CardHeader className="gap-y-2 flex items-center justify-between">
            <CardTitle className="text-xl line-clamp-6 sm:block hidden">
              Websites Page{" "}
            </CardTitle>
            <div className="flex items-center  space-x-3">
              {<ViewProduct data={report?.data?.products} />}

              {permission?.includes(CREATE_WEBSITES) && (
                <Button
                  className="flex justify-center items-center cursor-pointer bg-gradient-to-r from-violet-500 to-blue-500 btn-animation"
                  onClick={onOpen}
                >
                  <Plus className="size-4 mr-2" />
                  Add New
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={report?.data?.response}
              filterKey="Search websites..."
              onDelete={() => {}}
              disabled={true}
            />
          </CardContent>
        </Card>
      )}
    </div>

    // </div>
  );
};

export default SidebarAppContent;
