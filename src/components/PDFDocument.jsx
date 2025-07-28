import {
  Page,
  Text,
  View,
  Document,
  Font,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "/Roboto-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  PAGE_LEFT: {
    textAlign: "left",
  },
  PAGE_CENTER: {
    textAlign: "center",
  },
  PAGE_RIGHT: {
    textAlign: "right",
  },

  TITLE_SMALL: {
    fontSize: 12,
  },
  TITLE_MEDIUM: {
    fontSize: 16,
  },
  TITLE_LARGE: {
    fontSize: 20,
  },

  TITLE_LEFT: {
    textAlign: "left",
  },
  TITLE_CENTER: {
    textAlign: "center",
  },
  TITLE_RIGHT: {
    textAlign: "right",
  },

  SUBTITLE_SMALL: {
    fontSize: 10,
  },
  SUBTITLE_MEDIUM: {
    fontSize: 14,
  },
  SUBTITLE_LARGE: {
    fontSize: 18,
  },

  SUBTITLE_LEFT: {
    textAlign: "left",
  },
  SUBTITLE_CENTER: {
    textAlign: "center",
  },
  SUBTITLE_RIGHT: {
    textAlign: "right",
  },

  BRANDING_SMALL: {
    width: 64,
  },
  BRANDING_MEDIUM: {
    width: 128,
  },
  BRANDING_LARGE: {
    width: 256,
  },

  BRANDING_LEFT: {
    display: "flex",
    alignSelf: "start",
  },
  BRANDING_CENTER: {
    display: "flex",
    alignSelf: "center",
  },
  BRANDING_RIGHT: {
    display: "flex",
    alignSelf: "end",
  },

  COLOR_BLACK: { backgroundColor: "black" },
  COLOR_RED: { backgroundColor: "#f43f5e" },
  COLOR_GREEN: { backgroundColor: "#10b981" },
  COLOR_BLUE: { backgroundColor: "#0ea5e9" },

  THEME_DEFAULT: {
    backgroundColor: "white",
    color: "black",
  },
  THEME_ZEBRA_COLOR_BLACK: {
    backgroundColor: "#e5e5e5",
  },
  THEME_ZEBRA_COLOR_RED: {
    backgroundColor: "#fecdd3",
  },
  THEME_ZEBRA_COLOR_GREEN: {
    backgroundColor: "#a7f3d0",
  },
  THEME_ZEBRA_COLOR_BLUE: {
    backgroundColor: "#bae6fd",
  },
});

export default function PDFDocument({ settings, pages, csv }) {
  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page
          key={pageIndex}
          size={settings.paper === "PAPER_A4" ? "A4" : "LETTER"}
          orientation={
            settings.orientation === "ORIENTATION_PORTRAIT"
              ? "portrait"
              : "landscape"
          }
          style={{
            height: "100%",
            flexDirection: "column",
            fontFamily: "Roboto",
            lineHeight: 1.4,
            backgroundColor: "white",
            padding: 40,
            fontSize: `${settings.config.fontSize}`,
          }}
        >
          <View style={{ flexGrow: 1 }}>
            {((pageIndex === 0 &&
              settings.showBranding &&
              !settings.showBrandingOnEveryPage) ||
              (settings.showBranding && settings.showBrandingOnEveryPage)) && (
              <View style={{ marginBottom: 16 }}>
                <Image
                  src={settings.branding}
                  style={{
                    ...styles[settings.brandingSize],
                    ...styles[settings.brandingPosition],
                  }}
                />
              </View>
            )}
            {((pageIndex === 0 &&
              settings.showTitle &&
              !settings.showTitleOnEveryPage) ||
              (settings.showTitle && settings.showTitleOnEveryPage)) && (
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    ...styles[settings.titleSize],
                    ...styles[settings.titlePosition],
                    fontWeight: "bold",
                  }}
                >
                  {settings.title}
                </Text>
              </View>
            )}
            {((pageIndex === 0 &&
              settings.showSubtitle &&
              !settings.showSubtitleOnEveryPage) ||
              (settings.showSubtitle && settings.showSubtitleOnEveryPage)) && (
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    ...styles[settings.subtitleSize],
                    ...styles[settings.subtitlePosition],
                  }}
                >
                  {settings.subtitle}
                </Text>
              </View>
            )}
            <View style={{ width: "100%" }}>
              {((pageIndex === 0 &&
                settings.showTableHeader &&
                !settings.showTableHeaderOnEveryPage) ||
                (settings.showTableHeader &&
                  settings.showTableHeaderOnEveryPage)) && (
                <View style={{ width: "100%", flexDirection: "row" }}>
                  {csv[0].map((header, index) => (
                    <Text
                      style={{
                        width: settings.config.width,
                        padding: settings.config.padding,
                        color: "white",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        verticalAlign: "middle",
                        ...styles[settings.color],
                      }}
                      key={index}
                    >
                      {header}
                    </Text>
                  ))}
                </View>
              )}
              <View style={{ width: "100%" }}>
                {pageData.map((row, rowIndex) => (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      backgroundColor:
                        settings.theme !== "THEME_DEFAULT"
                          ? rowIndex % 2 === 1
                            ? styles[`${settings.theme}_${settings.color}`]
                                .backgroundColor
                            : "white"
                          : "white",
                      color: "black",
                    }}
                    key={rowIndex}
                  >
                    {(pageIndex !== pages.length - 1 ||
                      (pageIndex === pages.length - 1 &&
                        rowIndex !== pageData.length - 1) ||
                      (pageIndex === pages.length - 1 &&
                        rowIndex === pageData.length - 1 &&
                        !settings.showTableFooter)) && (
                      <>
                        {Object.values(row).map((value, rowIndex) => (
                          <Text
                            style={{
                              width: settings.config.width,
                              padding: settings.config.padding,
                              alignSelf: "center",
                              wordBreak: "break-all",
                            }}
                            key={rowIndex}
                          >
                            {value}
                          </Text>
                        ))}
                      </>
                    )}
                  </View>
                ))}
              </View>
              {((pageIndex === pages.length - 1 &&
                settings.showTableFooter &&
                !settings.showTableFooterOnEveryPage) ||
                (settings.showTableFooter &&
                  settings.showTableFooterOnEveryPage)) && (
                <View style={{ width: "100%", flexDirection: "row" }}>
                  {Object.values(csv[1].at(-1)).map((value, valueIndex) => (
                    <Text
                      style={{
                        width: settings.config.width,
                        padding: settings.config.padding,
                        color: "white",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        verticalAlign: "middle",
                        ...styles[settings.color],
                      }}
                      key={valueIndex}
                    >
                      {value}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
          {settings.showPage && (
            <View>
              <Text
                style={{
                  ...styles[settings.pagePosition],
                  marginTop: "auto",
                  fontSize: 12,
                }}
              >
                {pageIndex + 1}
              </Text>
            </View>
          )}
        </Page>
      ))}
    </Document>
  );
}
