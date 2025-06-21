import { LayoutTemplate, List, Loader2, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useDeleteCloudeFlairImage from "../hooks/use-delete-hook";
import { useDeleteCloudeImage } from "../api/use-delete-cloudeflair-image";
import { useConfirm } from "@/hooks/use-confirm";
import { useCreateCloudeImage } from "../hooks/use-create-cloude-image-hook";
import NewImageDialog from "./new-image-dialog";
import { useSearchImage } from "../hooks/use-search-image-hook";
import { ImageButton } from "./image-button";
import { useImageStyle } from "../hooks/use-image-style-hook";
import { usePermissionQuery } from "@/utils/IPChecker";
import { CLOUDE_IMAGE, CREATE_CLOUDE_IMAGE } from "@/utils/permission";
const ImageHeader = () => {
  const { DeleteCloudeFlairArray, onResetImage } = useDeleteCloudeFlairImage();
  const deleteMutate = useDeleteCloudeImage();

  const { data } = usePermissionQuery();

  const { onOpen } = useCreateCloudeImage();
  const { imageStyle, onImageStyleChange } = useImageStyle();
  const { onOpen: onSearchOpen } = useSearchImage();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "You are about to perform to bluk delete"
  );

  return (
    <div className="">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          <CardTitle className="text-lg sm:text-xl">Cloud image</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Deploy your images here.
          </CardDescription>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center sm:justify-end">
          {DeleteCloudeFlairArray.length > 0 && (
            <Button
              variant={"outline"}
              className="cursor-pointer min-w-[100px] w-full sm:w-auto"
              onClick={async () => {
                const ok = await confirm();
                if (ok) {
                  deleteMutate.mutate(DeleteCloudeFlairArray, {
                    onSuccess: () => {
                      onResetImage();
                    },
                  });
                }
              }}
            >
              {deleteMutate.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                `Delete (${DeleteCloudeFlairArray.length})`
              )}
            </Button>
          )}

          {data?.includes(CLOUDE_IMAGE) && (
            <ImageButton
              clickEvent={onImageStyleChange}
              icon={
                imageStyle ? (
                  <List className="size-5" />
                ) : (
                  <LayoutTemplate className="size-5" />
                )
              }
            />
          )}

          {data?.includes(CLOUDE_IMAGE) && (
            <ImageButton
              clickEvent={onSearchOpen}
              icon={<Search />}
              label="Search"
            />
          )}

          {data?.includes(CREATE_CLOUDE_IMAGE) && (
            <ImageButton clickEvent={onOpen} icon={<Upload />} label="Upload" />
          )}
        </div>
      </CardHeader>

      {/* Dialogs */}

      <ConfirmDialog />
      <NewImageDialog />
    </div>
  );
};

export default ImageHeader;
