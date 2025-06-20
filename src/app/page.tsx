import ReportTable from "@/components/ReportTable";
import { data } from "@/data/sample";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl m-auto mt-12">        
        <div className="space-y-6">
          <ReportTable data={data} />
        </div>
        {/* By Mustafa */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Mustafa Azad. All rights reserved.</p>
          <p>Built with ❤️ using Next.js and Radix UI</p>
        </footer>
      </div>
    </div>
  );
}
