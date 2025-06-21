import {
  Card,
} from "@/components/ui/card"
import ImageContainer from "@/features/cloudflair/components/image-container"
import ImageFilter from "@/features/cloudflair/components/image-filter"
import ImageHeader from "@/features/cloudflair/components/image-header"


function Cloudflair() {

  

  return (
    <div className="max-w-screen  -mt-30 mx-auto  px-5">



      <div className="w-full">
        <ImageFilter />
      </div>


      <Card className="w-full">
        <ImageHeader />
        <ImageContainer />
      </Card>
    </div>
  )
}


export default Cloudflair