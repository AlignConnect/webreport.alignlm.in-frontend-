import CreateCacheSheet from "@/features/cloud-cache/components/create-cloude-sheet";
import UpdateCacheSheet from "@/features/cloud-cache/components/update-cloude-sheet";
import SearchImageDialog from "@/features/cloudflair/components/search-image-dialog";
import NewConversionSheet from "@/features/conversion/components/new-conversion.sheet";
import UpdateConversionSheet from "@/features/conversion/components/update-conversion-sheet";
import NewInvitationSheet from "@/features/invitations/components/create-invitation-sheet";
import NewIPSheet from "@/features/ip/components/create-ip-sheet";
import UpdateIpSheet from "@/features/ip/components/update-ip-sheet";
import NewShopifySheet from "@/features/shopify/components/create-shopify-sheet";
import UpdateShopifySheet from "@/features/shopify/components/update-shopify-sheet";
import NewWebsiteSheet from "@/features/websites/components/New-website-sheet"
import UpdateWebsiteSheet from "@/features/websites/components/Update-website-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {

    const mount = useMountedState();

    if (!mount) {
        return null
    }


    return (
        <>
            {/* // websites Dialogs */}
            <NewWebsiteSheet />
            <UpdateWebsiteSheet />

            {/* //cloudeflaie Dialogs */}
            {/* <NewImageDialog /> */}
            <SearchImageDialog />




            {/* // cloude cache dialog */}
            <CreateCacheSheet />
            <UpdateCacheSheet />


            {/* // shopify dialog */}

            <NewShopifySheet />
            <UpdateShopifySheet />


            {/* conversion dialog */}

            <NewConversionSheet />
            <UpdateConversionSheet />


            {/* invitation dialog */}
            <NewInvitationSheet />

            {/* ip dialog */}

            <NewIPSheet />
            <UpdateIpSheet />


        </>
    )


}