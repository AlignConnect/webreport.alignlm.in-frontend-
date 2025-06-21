import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom";
import { settingNavbar } from "@/routes/navbar";
import React from "react";


export function SettingSidebar() {

    const location = useLocation();









    // const items = [
    //     {
    //         "id": "1",
    //         "site": "example1.com",
    //         "leads": 120,
    //         "checkout": 30,
    //         "ratio": 25,
    //         "last": "2025-04-29T14:35:00Z"
    //     },
    //     {
    //         "id": "2",
    //         "site": "example2.net",
    //         "leads": 75,
    //         "checkout": 15,
    //         "ratio": 20,
    //         "last": "2025-04-30T10:12:00Z"
    //     },
    //     {
    //         "id": "3",
    //         "site": "mysite.org",
    //         "leads": 200,
    //         "checkout": 80,
    //         "ratio": 40,
    //         "last": "2025-04-28T08:55:00Z"
    //     },
    //     {
    //         "id": "4",
    //         "site": "testsite.com",
    //         "leads": 50,
    //         "checkout": 10,
    //         "ratio": 20,
    //         "last": "2025-04-27T16:20:00Z"
    //     },
    //     {
    //         "id": "5",
    //         "site": "newdomain.io",
    //         "leads": 90,
    //         "checkout": 45,
    //         "ratio": 50,
    //         "last": "2025-04-26T09:05:00Z"
    //     },
    //     {
    //         "id": "6",
    //         "site": "coolapp.co",
    //         "leads": 300,
    //         "checkout": 150,
    //         "ratio": 50,
    //         "last": "2025-04-25T13:40:00Z"
    //     },
    //     {
    //         "id": "7",
    //         "site": "webhub.ai",
    //         "leads": 180,
    //         "checkout": 36,
    //         "ratio": 20,
    //         "last": "2025-04-24T11:15:00Z"
    //     },
    //     {
    //         "id": "8",
    //         "site": "pagetest.dev",
    //         "leads": 210,
    //         "checkout": 105,
    //         "ratio": 50,
    //         "last": "2025-04-23T17:30:00Z"
    //     },
    //     {
    //         "id": "9",
    //         "site": "dataportal.com",
    //         "leads": 160,
    //         "checkout": 64,
    //         "ratio": 40,
    //         "last": "2025-04-22T19:45:00Z"
    //     },
    //     {
    //         "id": "10",
    //         "site": "conversiontrack.com",
    //         "leads": 130,
    //         "checkout": 26,
    //         "ratio": 20,
    //         "last": "2025-04-21T12:00:00Z"
    //     }
    // ]









    return (
        <Sidebar
            variant="floating"
            className="relative h-full"
        >
            <SidebarContent className="">

                <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>


                    <SidebarGroupContent>
                        <SidebarMenu>

                            {/* {
                                isLoading && Array.from({ length: 10 }, (_, i) => i + 1).map((e) => {
                                    return <div className="my-1">
                                        <Skeleton className="w-[100%] h-[50px] bg-gray-200" />
                                    </div>

                                })
                            } */}

                            {settingNavbar.map((item: { label: string, href: string, icon: React.ReactNode, path: string }, index: number) => {

                                return <SidebarMenuItem key={index} className="my-2">
                                    <SidebarMenuButton
                                        tooltip={item?.label}
                                        asChild
                                        isActive={location.pathname === item.path}
                                    >

                                        <div className="flex items-center justify-between  w-full">
                                            <Link to={item.href} className="flex items-center gap-5  w-full" >
                                                <div className="text-[16px]">{item.icon}</div>
                                                <div className="text-[16px]">{item?.label}</div>
                                            </Link>


                                        </div>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


            </SidebarContent>
        </Sidebar>
    )
}
