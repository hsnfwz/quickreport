import { useState } from "react";
import Papa from "papaparse";
import Settings from "./components/Settings";
import Preview from "./components/Preview";
import PDFDocument from "./components/PDFDocument";
import { pdf } from "@react-pdf/renderer";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function App() {
  const [settings, setSettings] = useState({
    paper: "PAPER_A4",
    orientation: "ORIENTATION_PORTRAIT",
    title: "Heading",
    titleSize: "TITLE_MEDIUM",
    titlePosition: "TITLE_CENTER",
    showTitle: false,
    showTitleOnEveryPage: true,
    subtitle: "Subheading",
    subtitleSize: "SUBTITLE_MEDIUM",
    subtitlePosition: "SUBTITLE_CENTER",
    showSubtitle: false,
    showSubtitleOnEveryPage: true,
    showPage: false,
    pagePosition: "PAGE_CENTER",
    branding:
      "https://placehold.co/128x128/E5E5E5/000?font=roboto&text=Branding",
    brandingSize: "BRANDING_MEDIUM",
    brandingPosition: "BRANDING_CENTER",
    showBranding: false,
    showBrandingOnEveryPage: true,
    theme: "THEME_DEFAULT",
    color: "COLOR_BLACK",
    showTableHeader: true,
    showTableHeaderOnEveryPage: true,
    showTableFooter: false,
    showTableFooterOnEveryPage: false,
    config: {
      fontSize: "",
      padding: "",
      width: "",
    },
  });

  const [page, setPage] = useState(1);
  const [csv, setCsv] = useState([]);
  const [pages, setPages] = useState([]);

  const chunkData = (data, chunkSize) => {
    const result = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      result.push(data.slice(i, i + chunkSize));
    }
    return result;
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields;
        const rows = results.data;
        setCsv([headers, rows]);

        console.log("CSV", [headers, rows]);

        const pages = chunkData(rows, 10);

        console.log("PAGES", pages);
        setPages(pages);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      },
    });
  };

  return (
    <>
      {pages.length > 0 && (
        <div className="w-full flex">
          <div className="w-full flex flex-col gap-4 max-w-[400px] z-10 p-4 h-screen bg-neutral-700">
            <button
              className="w-full p-4 bg-sky-500 cursor-pointer hover:bg-sky-700 transition-all border-1 border-transparent focus:outline-0 focus:border-black text-white font-bold rounded text-center"
              onClick={async () => {
                const blob = await pdf(
                  <PDFDocument settings={settings} csv={csv} pages={pages} />,
                ).toBlob();

                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = "quick_report.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download PDF
            </button>
            <div className="w-full min-h-[1px] bg-neutral-600 rounded-full"></div>
            <div className="flex justify-between w-full items-center">
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  className={`disabled:opacity-50 disabled:pointer-events-none self-start bg-neutral-600 hover:bg-neutral-500  border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
                  onClick={() => {
                    setPage(1);
                  }}
                >
                  <ChevronsLeft color="white" />
                </button>
                <button
                  disabled={page === 1}
                  className={`disabled:opacity-50 disabled:pointer-events-none self-start bg-neutral-600 hover:bg-neutral-500  border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  <ChevronLeft color="white" />
                </button>
              </div>
              <span className="text-white">
                {page} / {pages.length}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === pages.length}
                  className={`disabled:opacity-50 disabled:pointer-events-none self-start bg-neutral-600 hover:bg-neutral-500  border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight color="white" />
                </button>
                <button
                  disabled={page === pages.length}
                  className={`disabled:opacity-50 disabled:pointer-events-none self-start bg-neutral-600 hover:bg-neutral-500  border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
                  onClick={() => setPage(pages.length)}
                >
                  <ChevronsRight color="white" />
                </button>
              </div>
            </div>
            <div className="w-full min-h-[1px] bg-neutral-600 rounded-full"></div>
            <Settings settings={settings} setSettings={setSettings} csv={csv} />
          </div>
          <div className="m-auto z-20 p-8 flex w-full h-screen items-center justify-center bg-neutral-800">
            <Preview settings={settings} csv={csv} pages={pages} page={page} />
          </div>
        </div>
      )}

      {pages.length === 0 && (
        <div className="w-full h-screen flex items-center justify-center flex-col gap-8 p-4">
          <h1 className="text-center font-bold text-2xl">QuickReport</h1>
          <h2 className="text-center">
            Quickly convert CSV files to beautiful, branded PDF reports!
          </h2>
          <button
            onClick={() => document.getElementById("file").click()}
            className="border-1 border-transparent font-bold bg-emerald-500 p-4 rounded text-white cursor-pointer hover:bg-emerald-700 transition-all focus:outline-0 focus:border-black"
          >
            Upload CSV
          </button>
          <input
            id="file"
            type="file"
            accept=".csv"
            onInput={handleFile}
            className="hidden"
          />
        </div>
      )}
    </>
  );
}

// TODO: fix mobile screen shrinking PDF dimensions
// TODO: save settings localstorage
// TODO: custom PDF margin
// TODO: filter, sort, #cols, #rows
