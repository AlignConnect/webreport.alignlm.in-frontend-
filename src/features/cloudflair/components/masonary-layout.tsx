import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleX, Copy, Trash2 } from "lucide-react";
import Masonry from "react-masonry-css";

type masonery = {
  handleDelete: (id: string) => void;
  handleCopyClick: (variant: string) => void;
  masonery: any[];
  DeleteCloudeFlairArray: string[];
};

const MasoneryLayout = ({
  DeleteCloudeFlairArray,
  handleCopyClick,
  handleDelete,
  masonery,
}: masonery) => {
  return (
    <Masonry
      breakpointCols={{
        default: window.innerWidth > 400 ? 8 : 2,
      }}
      className="flex w-auto gap-5"
      columnClassName="bg-clip-padding"
    >
      {masonery?.map((item, key: number) => (
        <div
          className={cn(
            "relative group flex justify-center items-center  shadow-[0px_0px_5px_2px_#0000001a] my-2 min-h-[70px] rounded-2xl overflow-hidden",
            DeleteCloudeFlairArray.includes(item.id) &&
              "border-2 border-red-500"
          )}
        >
          <div
            key={item.id}
            className={cn(
              "z-10 group-hover:blur-[5px] relative before:absolute before:inset-0 ",
              DeleteCloudeFlairArray.includes(item.id) &&
                "blur-[5px] before:bg-white/20 before:z-40"
            )}
          >
            <img src={item.variants[0]} alt={`${key}`} className="w-full" />
          </div>
          <div className="z-20 flex absolute group-hover:translate-y-0 translate-y-7 invisible group-hover:visible transition-all ">
            <Button
              variant={"ghost"}
              className="cursor-pointer hover:bg-black/20"
              onClick={() => handleCopyClick(item.variants[0])}
            >
              <Copy />
            </Button>
            {!DeleteCloudeFlairArray.includes(item.id) ? (
              <Button
                variant={"ghost"}
                className="cursor-pointer hover:bg-black/20"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 />
              </Button>
            ) : (
              <Button
                variant={"ghost"}
                className="cursor-pointer hover:bg-black/20"
                onClick={() => handleDelete(item.id)}
              >
                <CircleX />
              </Button>
            )}
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default MasoneryLayout;
