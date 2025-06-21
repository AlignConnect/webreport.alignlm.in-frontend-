import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Earth, Edit, Home, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { useGetWebsites } from "@/features/websites/api/use-get-websites";
import { useUpdateWebsite } from "@/features/websites/hooks/use-update-webites";
import { UPDATE_WEBSITES, WEBSITES } from "@/utils/permission";
import { usePermissionQuery } from "@/utils/IPChecker";
import { Link as LinkReact } from "react-router-dom";
import { useNewWebsite } from "@/features/websites/hooks/use-new-webites";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
  const { id } = useParams();

  const { onOpen: updateOpen } = useUpdateWebsite();
  const { onOpen: creteOpen } = useNewWebsite();
  const { data, isLoading } = useGetWebsites();
  const { isMobile, setOpenMobile } = useSidebar();
  //   console.log("data dharam: ", data);

  const { data: permission } = usePermissionQuery();

  return (
    <Sidebar variant="floating" className="relative h-full">
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel>Website</SidebarGroupLabel>

          {permission?.includes(WEBSITES) && (
            <SidebarGroupAction
              className="cursor-pointer bg-blue-500 hover:bg-blue-500 p-1"
              asChild
            >
              {data?.data?.length > 0 ? (
                <LinkReact to={"/websites"}>
                  <Home className="text-white w-[30px] h-[30px] " />
                </LinkReact>
              ) : (
                <Plus
                  className="text-white w-[25px] h-[25px] hover:text-white"
                  onClick={() => creteOpen()}
                />
              )}
            </SidebarGroupAction>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading &&
                Array.from({ length: 10 }, (_, i) => i + 1).map(() => {
                  return (
                    <div className="my-1">
                      <Skeleton className="w-[100%] h-[50px] bg-gray-200" />
                    </div>
                  );

                  // })
                })}

              {data?.data?.map(
                (item: { alias: string; id: string }, index: number) => {
                  return (
                    <SidebarMenuItem key={index} className="my-2">
                      <SidebarMenuButton
                        tooltip={item?.alias}
                        asChild
                        isActive={id === item.id}
                      >
                        <div className="flex items-center justify-between  w-full">
                          <Link
                            to={item.id}
                            className="flex items-center gap-5  w-full"
                            onClick={() => isMobile && setOpenMobile(false)}
                          >
                            <div className="text-[16px]">
                              {
                                <Earth className="size-5 animate-spin duration-75" />
                              }
                            </div>
                            <div className="text-[16px]">{item?.alias}</div>
                          </Link>

                          {permission?.includes(UPDATE_WEBSITES) && (
                            <div onClick={() => updateOpen(item.id)}>
                              <Edit className="size-4 cursor-pointer" />
                            </div>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
