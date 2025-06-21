import { Checkbox } from "@/components/ui/checkbox";
import { useGetallPermission } from "../api/use-getall-permission";
import { useSelectUser } from "../hooks/useSelectUser";
import { useGetPermission } from "../api/use-get-permission";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUpdatePermission } from "../api/use-update-permission";
import { Loader2 } from "lucide-react";

const PermissionContent = () => {
  const { user, onClose } = useSelectUser();

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const { data: allPermissions } = useGetallPermission();
  console.log('allPermissions: ', allPermissions);
  const { data: userPermissions, isLoading: isUserPermissionLoading } =
    useGetPermission(user!);
  const { mutate: updatePermissions, isPending } = useUpdatePermission();

  useEffect(() => {
    if (userPermissions?.data) {
      setSelectedPermissions(userPermissions.data);
    }
  }, [userPermissions]);

  const handlecheckboxChange = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleUpdate = () => {
    if (user) {
      updatePermissions({
        userId: user,
        permission: selectedPermissions,
      });
    }
  };

  return (
    user && (
      <div className="text-center mx-auto p-5">
        <div className="grid grid-cols-4 space-y-7">
          {allPermissions?.data?.map((permission: string) => {
            return (
              <div key={permission} className="flex  space-x-2 ">
                {isUserPermissionLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Checkbox
                    id={permission}
                    checked={selectedPermissions.includes(permission)}
                    onCheckedChange={() => handlecheckboxChange(permission)}
                  />
                )}

                <label
                  htmlFor={permission}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {permission}
                </label>
              </div>
            );
          })}
        </div>

        <div className="text-end me-20 space-x-2 flex items-center justify-end">
          <Button
            className="btn-animation bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:text-white cursor-pointer min-w-[80px]"
            variant={"ghost"}
            onClick={handleUpdate}
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin " />
            ) : (
              "Update"
            )}
          </Button>

          <Button
            className="btn-animation bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white hover:text-white cursor-pointer "
            variant={"ghost"}
            onClick={onClose}
          >
            Reset
          </Button>
        </div>
      </div>
    )
  );
};

export default PermissionContent;
