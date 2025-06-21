import OverviewContent from "@/features/overview/components/overview-content"
import OverviewHeader from "@/features/overview/components/overview-header"

const Overview = () => {


    return (
        <div className="max-w-screen-xl mx-auto -mt-36 space-y-5">
            <OverviewHeader />
            <OverviewContent />
        </div>
    )
}

export default Overview
