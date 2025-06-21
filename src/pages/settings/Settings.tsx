import { SettingSidebar } from '@/components/sidebar/SettingSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

const Settings = () => {
    return (
        <div className='max-w-screen-2xl mx-auto -mt-20'>



            <SidebarProvider className='h-full min-h-[630px]'>


                <SettingSidebar />

                <SidebarInset className='max-w-screen-xl border h-full rounded-2xl overflow-hidden min-h-[630px]'>
                    <Outlet />
                </SidebarInset>

            </SidebarProvider>



        </div>
    )
}

export default Settings
