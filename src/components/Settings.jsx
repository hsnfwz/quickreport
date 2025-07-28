import { useRef, useEffect } from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  RectangleVertical,
  RectangleHorizontal,
  Eye,
  EyeClosed,
  Check,
} from "lucide-react";

export default function Settings({ settings, setSettings, csv }) {
  const brandingRef = useRef();

  useEffect(() => {
    const _config = {};
    if (csv[0].length <= 4) {
      _config.fontSize = 10;
      _config.padding = 2;
    } else if (csv[0].length > 4 && csv[0].length <= 8) {
      _config.fontSize = 8;
      _config.padding = 2;
    } else if (csv[0].length > 8 && csv[0].length <= 12) {
      _config.fontSize = 6;
      _config.padding = 1;
    } else {
      _config.fontSize = 4;
      _config.padding = 1;
    }

    _config.width = `${100 / csv[0].length}%`;

    setSettings({ ...settings, config: _config });
  }, []);

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      <div className="overflow-y-scroll flex flex-col w-full gap-4 h-full app_scrollbar">
        <div className="flex flex-col gap-4">
          <h1 className=" text-white">Paper</h1>
          <div className="flex gap-2">
            <button
              className={`w-full hover:bg-neutral-500 ${settings.paper === "PAPER_A4" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, paper: "PAPER_A4" })}
            >
              A4
            </button>
            <button
              className={`w-full hover:bg-neutral-500 ${settings.paper === "PAPER_LETTER" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, paper: "PAPER_LETTER" })
              }
            >
              Letter
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className=" text-white">Orientation</h1>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.orientation === "ORIENTATION_PORTRAIT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({
                  ...settings,
                  orientation: "ORIENTATION_PORTRAIT",
                })
              }
            >
              <RectangleVertical />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.orientation === "ORIENTATION_LANDSCAPE" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({
                  ...settings,
                  orientation: "ORIENTATION_LANDSCAPE",
                })
              }
            >
              <RectangleHorizontal />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className=" text-white">Branding</h1>
          <button
            onClick={() => document.getElementById("file").click()}
            className=" text-white bg-emerald-500 p-4 rounded font-bold cursor-pointer hover:bg-emerald-700 transition-all focus:outline-0 focus:border-black"
          >
            Upload Image
          </button>
          <input
            id="file"
            ref={brandingRef}
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/webp"
            className="hidden"
            onInput={(event) => {
              const branding = document.getElementById("branding");

              const file = event.target.files[0];

              if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                  branding.src = e.target.result;
                  setSettings({ ...settings, branding: e.target.result });
                };

                reader.readAsDataURL(file);

                if (brandingRef.current) {
                  brandingRef.current.value = "";
                }
              } else {
                branding.src = "";
                if (brandingRef.current) {
                  brandingRef.current.value = "";
                }
              }
            }}
          />
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showBranding === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, showBranding: true })}
            >
              <Eye />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showBranding === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, showBranding: false })}
            >
              <EyeClosed />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.brandingSize === "BRANDING_SMALL" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 aspect-square w-[58px] cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, brandingSize: "BRANDING_SMALL" })
              }
            >
              S
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.brandingSize === "BRANDING_MEDIUM" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 aspect-square w-[58px] cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, brandingSize: "BRANDING_MEDIUM" })
              }
            >
              M
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.brandingSize === "BRANDING_LARGE" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 aspect-square w-[58px] cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, brandingSize: "BRANDING_LARGE" })
              }
            >
              L
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.brandingPosition === "BRANDING_LEFT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, brandingPosition: "BRANDING_LEFT" })
              }
            >
              <AlignLeft />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.brandingPosition === "BRANDING_CENTER" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({
                  ...settings,
                  brandingPosition: "BRANDING_CENTER",
                })
              }
            >
              <AlignCenter />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.brandingPosition === "BRANDING_RIGHT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, brandingPosition: "BRANDING_RIGHT" })
              }
            >
              <AlignRight />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showBrandingOnEveryPage === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showBrandingOnEveryPage: false })
              }
            >
              First Page
            </button>
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showBrandingOnEveryPage === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showBrandingOnEveryPage: true })
              }
            >
              Every Page
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className=" text-white">Heading</h1>
          <input
            type="text"
            autoComplete="off"
            onChange={(event) =>
              setSettings({ ...settings, title: event.target.value })
            }
            value={settings.title}
            className="w-full p-4 border-1 border-neutral-500 hover:bg-neutral-500 bg-neutral-600 rounded focus:bg-neutral-600 focus:outline-0 focus:border-black text-white"
            text-white
          />
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showTitle === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, showTitle: true })}
            >
              <Eye />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showTitle === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, showTitle: false })}
            >
              <EyeClosed />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.titleSize === "TITLE_SMALL" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 aspect-square w-[58px] cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, titleSize: "TITLE_SMALL" })
              }
            >
              S
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.titleSize === "TITLE_MEDIUM" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 aspect-square w-[58px] cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, titleSize: "TITLE_MEDIUM" })
              }
            >
              M
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.titleSize === "TITLE_LARGE" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 aspect-square w-[58px] cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, titleSize: "TITLE_LARGE" })
              }
            >
              L
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.titlePosition === "TITLE_LEFT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, titlePosition: "TITLE_LEFT" })
              }
            >
              <AlignLeft />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.titlePosition === "TITLE_CENTER" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({
                  ...settings,
                  titlePosition: "TITLE_CENTER",
                })
              }
            >
              <AlignCenter />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.titlePosition === "TITLE_RIGHT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, titlePosition: "TITLE_RIGHT" })
              }
            >
              <AlignRight />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showTitleOnEveryPage === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTitleOnEveryPage: false })
              }
            >
              First Page
            </button>
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showTitleOnEveryPage === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTitleOnEveryPage: true })
              }
            >
              Every Page
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className=" text-white">Subheading</h1>
          <input
            type="text"
            autoComplete="off"
            onChange={(event) =>
              setSettings({ ...settings, subtitle: event.target.value })
            }
            value={settings.subtitle}
            className="w-full p-4 border-1 border-neutral-500 hover:bg-neutral-500 bg-neutral-600 rounded focus:bg-neutral-600 focus:outline-0 focus:border-black text-white"
            text-white
          />
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showSubtitle === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, showSubtitle: true })}
            >
              <Eye />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showSubtitle === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, showSubtitle: false })}
            >
              <EyeClosed />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.subtitleSize === "SUBTITLE_SMALL" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 aspect-square w-[58px] cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, subtitleSize: "SUBTITLE_SMALL" })
              }
            >
              S
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.subtitleSize === "SUBTITLE_MEDIUM" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 aspect-square w-[58px] cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, subtitleSize: "SUBTITLE_MEDIUM" })
              }
            >
              M
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.subtitleSize === "SUBTITLE_LARGE" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 aspect-square w-[58px] cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, subtitleSize: "SUBTITLE_LARGE" })
              }
            >
              L
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.subtitlePosition === "SUBTITLE_LEFT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, subtitlePosition: "SUBTITLE_LEFT" })
              }
            >
              <AlignLeft />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.subtitlePosition === "SUBTITLE_CENTER" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({
                  ...settings,
                  subtitlePosition: "SUBTITLE_CENTER",
                })
              }
            >
              <AlignCenter />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.subtitlePosition === "SUBTITLE_RIGHT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, subtitlePosition: "SUBTITLE_RIGHT" })
              }
            >
              <AlignRight />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showSubtitleOnEveryPage === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showSubtitleOnEveryPage: false })
              }
            >
              First Page
            </button>
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showSubtitleOnEveryPage === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showSubtitleOnEveryPage: true })
              }
            >
              Every Page
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className=" text-white">Table Header</h1>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showTableHeader === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTableHeader: true })
              }
            >
              <Eye />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showTableHeader === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTableHeader: false })
              }
            >
              <EyeClosed />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showTableHeaderOnEveryPage === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTableHeaderOnEveryPage: false })
              }
            >
              First Page
            </button>
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showTableHeaderOnEveryPage === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTableHeaderOnEveryPage: true })
              }
            >
              Every Page
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className=" text-white">Table Footer</h1>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showTableFooter === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTableFooter: true })
              }
            >
              <Eye />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showTableFooter === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTableFooter: false })
              }
            >
              <EyeClosed />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showTableFooterOnEveryPage === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTableFooterOnEveryPage: false })
              }
            >
              Last Page
            </button>
            <button
              className={`w-full hover:bg-neutral-500 ${settings.showTableFooterOnEveryPage === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, showTableFooterOnEveryPage: true })
              }
            >
              Every Page
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className=" text-white">Page</h1>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showPage === true ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, showPage: true })}
            >
              <Eye />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.showPage === false ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, showPage: false })}
            >
              <EyeClosed />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`self-start hover:bg-neutral-500 ${settings.pagePosition === "PAGE_LEFT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, pagePosition: "PAGE_LEFT" })
              }
            >
              <AlignLeft />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.pagePosition === "PAGE_CENTER" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({
                  ...settings,
                  pagePosition: "PAGE_CENTER",
                })
              }
            >
              <AlignCenter />
            </button>
            <button
              className={`self-start hover:bg-neutral-500 ${settings.pagePosition === "PAGE_RIGHT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, pagePosition: "PAGE_RIGHT" })
              }
            >
              <AlignRight />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className=" text-white">Theme</h1>
          <div className="flex gap-2">
            <button
              className={`self-start hover:scale-90 w-[58px] aspect-square rounded p-4 cursor-pointer transition-all border-1 border-black focus:outline-0 focus:border-black bg-black`}
              onClick={() => setSettings({ ...settings, color: "COLOR_BLACK" })}
            >
              {settings.color === "COLOR_BLACK" && <Check color="white" />}
            </button>
            <button
              className={`self-start hover:scale-90 w-[58px] aspect-square rounded p-4 cursor-pointer transition-all border-1 border-rose-500 focus:outline-0 focus:border-black bg-rose-500`}
              onClick={() => setSettings({ ...settings, color: "COLOR_RED" })}
            >
              {settings.color === "COLOR_RED" && <Check color="white" />}
            </button>
            <button
              className={`self-start hover:scale-90 w-[58px] aspect-square rounded p-4 cursor-pointer transition-all border-1 border-emerald-500 focus:outline-0 focus:border-black bg-emerald-500`}
              onClick={() => setSettings({ ...settings, color: "COLOR_GREEN" })}
            >
              {settings.color === "COLOR_GREEN" && <Check color="white" />}
            </button>
            <button
              className={`self-start hover:scale-90 w-[58px] aspect-square rounded p-4 cursor-pointer transition-all border-1 border-sky-500 focus:outline-0 focus:border-black bg-sky-500`}
              onClick={() => setSettings({ ...settings, color: "COLOR_BLUE" })}
            >
              {settings.color === "COLOR_BLUE" && <Check color="white" />}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`w-full hover:bg-neutral-500 ${settings.theme === "THEME_DEFAULT" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() =>
                setSettings({ ...settings, theme: "THEME_DEFAULT" })
              }
            >
              Default
            </button>
            <button
              className={`w-full hover:bg-neutral-500 ${settings.theme === "THEME_ZEBRA" ? "bg-neutral-500" : "bg-neutral-600"} text-white border-1 border-neutral-500 rounded p-4 cursor-pointer transition-all focus:outline-0 focus:border-black`}
              onClick={() => setSettings({ ...settings, theme: "THEME_ZEBRA" })}
            >
              Zebra
            </button>
          </div>
        </div>

        {/* 
        <button
          className="self-start"
          onClick={() =>
            setSettings({ ...settings, titleWeight: "TITLE_LIGHT" })
          }
        >
          Light Title
        </button>
        <button
          className="self-start"
          onClick={() =>
            setSettings({ ...settings, titleWeight: "TITLE_NORMAL" })
          }
        >
          Normal Title
        </button>
        <button
          className="self-start"
          onClick={() =>
            setSettings({ ...settings, titleWeight: "TITLE_BOLD" })
          }
        >
          Bold Title
        </button>


        <button
          className="self-start"
          onClick={() =>
            setSettings({ ...settings, subtitleWeight: "SUBTITLE_LIGHT" })
          }
        >
          Light Subtitle
        </button>
        <button
          className="self-start"
          onClick={() =>
            setSettings({ ...settings, subtitleWeight: "SUBTITLE_NORMAL" })
          }
        >
          Normal Subtitle
        </button>
        <button
          className="self-start"
          onClick={() =>
            setSettings({ ...settings, subtitleWeight: "SUBTITLE_BOLD" })
          }
        >
          Bold Subtitle
        </button> */}

        {/* <input
            type="text"
            autoComplete="off"
            onChange={(event) => setRowsPerPage(+event.target.value)}
            value={rowsPerPage}
          /> */}
      </div>
    </div>
  );
}
