import { Fragment } from "react";

const styles = Object.freeze({
  PAGE_LEFT: "text-left",
  PAGE_CENTER: "text-center",
  PAGE_RIGHT: "text-right",

  TITLE_SMALL: "text-[12px]",
  TITLE_MEDIUM: "text-[16px]",
  TITLE_LARGE: "text-[20px]",

  TITLE_LEFT: "text-left",
  TITLE_CENTER: "text-center",
  TITLE_RIGHT: "text-right",

  SUBTITLE_SMALL: "text-[10px]",
  SUBTITLE_MEDIUM: "text-[14px]",
  SUBTITLE_LARGE: "text-[18px]",

  SUBTITLE_LEFT: "text-left",
  SUBTITLE_CENTER: "text-center",
  SUBTITLE_RIGHT: "text-right",

  BRANDING_SMALL: "w-[64px]",
  BRANDING_MEDIUM: "w-[128px]",
  BRANDING_LARGE: "w-[256px]",

  BRANDING_LEFT: "flex self-start",
  BRANDING_CENTER: "flex self-center",
  BRANDING_RIGHT: "flex self-end",

  COLOR_BLACK: "bg-black",
  COLOR_RED: "bg-rose-500",
  COLOR_GREEN: "bg-emerald-500",
  COLOR_BLUE: "bg-sky-500",

  THEME_DEFAULT: "bg-white text-black",
  THEME_ZEBRA_COLOR_BLACK: "even:bg-neutral-200 even:text-black",
  THEME_ZEBRA_COLOR_RED: "even:bg-rose-200 even:text-black",
  THEME_ZEBRA_COLOR_GREEN: "even:bg-emerald-200 even:text-black",
  THEME_ZEBRA_COLOR_BLUE: "even:bg-sky-200 even:text-black",

  PAPER_A4_ORIENTATION_PORTRAIT: "w-[595px] h-[842px]",
  PAPER_A4_ORIENTATION_LANDSCAPE: "h-[595px] w-[842px]",
  PAPER_LETTER_ORIENTATION_PORTRAIT: "w-[612px] h-[792px]",
  PAPER_LETTER_ORIENTATION_LANDSCAPE: "h-[612px] w-[792px]",
});

export default function Preview({ settings, csv, pages, page }) {
  return (
    <div
      className={`font-roboto ${styles[`${settings.paper}_${settings.orientation}`]} leading-[1.4] p-[40px] box-border overflow-hidden shadow-lg bg-white scale-[0.75] origin-top-center`}
      style={{ fontSize: `${settings.config.fontSize}px` }}
    >
      <div className="w-full h-full overflow-hidden box-border bg-white flex flex-col gap-4">
        {((page === 1 &&
          settings.showBranding &&
          !settings.showBrandingOnEveryPage) ||
          (settings.showBranding && settings.showBrandingOnEveryPage)) && (
          <img
            id="branding"
            src={settings.branding}
            className={`${styles[settings.brandingSize]} ${styles[settings.brandingPosition]}`}
          />
        )}

        {((page === 1 &&
          settings.showTitle &&
          !settings.showTitleOnEveryPage) ||
          (settings.showTitle && settings.showTitleOnEveryPage)) && (
          <h1
            className={`${styles[settings.titleSize]} ${styles[settings.titlePosition]} font-bold`}
          >
            {settings.title}
          </h1>
        )}

        {((page === 1 &&
          settings.showSubtitle &&
          !settings.showSubtitleOnEveryPage) ||
          (settings.showSubtitle && settings.showSubtitleOnEveryPage)) && (
          <h2
            className={`${styles[settings.subtitleSize]} ${styles[settings.subtitlePosition]}`}
          >
            {settings.subtitle}
          </h2>
        )}

        <div className={`w-full`}>
          {((page === 1 &&
            settings.showTableHeader &&
            !settings.showTableHeaderOnEveryPage) ||
            (settings.showTableHeader &&
              settings.showTableHeaderOnEveryPage)) && (
            <div className={`flex w-full`}>
              {csv[0].map((header, index) => (
                <div
                  style={{
                    width: settings.config.width,
                    padding: `${settings.config.padding}px`,
                  }}
                  className={`text-white font-bold truncate ${styles[settings.color]} self-center text-left`}
                  key={index}
                >
                  {header}
                </div>
              ))}
            </div>
          )}
          {pages[page - 1].map((row, rowIndex) => (
            <Fragment key={rowIndex}>
              {(page - 1 !== pages.length - 1 ||
                (page - 1 === pages.length - 1 &&
                  rowIndex !== pages[page - 1].length - 1) ||
                (page - 1 === pages.length - 1 &&
                  rowIndex === pages[page - 1].length - 1 &&
                  !settings.showTableFooter)) && (
                <div
                  className={`flex ${styles[`${settings.theme}_${settings.color}`]}`}
                  key={rowIndex}
                >
                  {Object.values(row).map((value, valueIndex) => (
                    <div
                      style={{
                        width: settings.config.width,
                        padding: `${settings.config.padding}px`,
                      }}
                      className={`break-all self-center`}
                      key={valueIndex}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
          {((page === pages.length &&
            settings.showTableFooter &&
            !settings.showTableFooterOnEveryPage) ||
            (settings.showTableFooter &&
              settings.showTableFooterOnEveryPage)) && (
            <div className="flex w-full">
              {Object.values(csv[1].at(-1)).map((value, index) => (
                <div
                  style={{ width: settings.config.width }}
                  className={`text-white font-bold break-all p-[2px] ${styles[settings.color]} self-center text-left`}
                  key={index}
                >
                  {value}
                </div>
              ))}
            </div>
          )}
        </div>
        {settings.showPage && (
          <p className={`mt-auto text-xs ${styles[settings.pagePosition]}`}>
            {page}
          </p>
        )}
      </div>
    </div>
  );
}
