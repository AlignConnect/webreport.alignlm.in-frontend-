import ArReportPage from '@/features/ar-report/components/shopify-order'
import Dateselect from '@/components/header/Dateselect';


export default function ArReport() {
  return (
    <div>
      <div className="max-w-screen-lg mx-auto -mt-24">

            <div className="mb-4">
                <Dateselect />
            </div>
        <ArReportPage/>

      </div>
    </div>
  );
}
