import axios from "axios";
import React, { useEffect, useState } from "react";
import InformationInput from "../../styledComponents/inputs/InformationInput";

import { GOOGLE_FONT_API_KEY } from "../../../const/google.const";
import SelectInput, {
  optionType,
} from "../../styledComponents/inputs/SelectInput";

type fontType = {
  fontFamily: string;
  files: { style: string; url: string }[];
};

type FontPanelProps = {
  onFontUrlChange: (fontUrl: string) => void;
};

function FontPanel(props: FontPanelProps) {
  const [content, setContent] = useState<string>("Hello world");

  const [fonts, setFonts] = useState<fontType[]>([] as fontType[]);
  const [fontFamilies, setFontFamilies] = useState<optionType[]>(
    [] as optionType[]
  );
  const [fontStyle, setFontStyle] = useState<optionType[]>([] as optionType[]);

  const [selectedFontFamilyIndex, setSelectedFontFamilyIndex] =
    useState<number>();
  const [selectedFontStyleIndex, setSelectedFontStyleIndex] =
    useState<number>();

  useEffect(() => {
    axios.get(GOOGLE_FONT_API_KEY).then((response) => {
      const items = response.data.items.map(
        (x: { files: any; family: any }) => {
          return {
            fontFamily: x.family,
            files: Object.entries(x.files).map(([style, url]) => ({
              style,
              url,
            })),
          } as fontType;
        }
      );
      setFonts(items);
      const ff = items.map((x: { fontFamily: any }) => {
        return { name: x.fontFamily, value: x.fontFamily };
      });

      const defaultFontFamilyIndex = ff.findIndex(
        (x: { name: string }) => x.name === "Roboto"
      );

      setSelectedFontFamilyIndex(defaultFontFamilyIndex); // set default font
      setFontFamilies(ff);
    });
  }, []);

  function handleFontFamilyChange(index: number) {
    const fs = fonts[index].files.map((x) => {
      return { name: x.style, value: x.url };
    });
    setSelectedFontFamilyIndex(index);
    setFontStyle(fs);

    // when select font family the default font style will be index=0
    setSelectedFontStyleIndex(0);
    const url = fonts[index].files[0].url;
    props.onFontUrlChange(url);
  }

  function handleFontStyleChange(index: number) {
    const url = fonts[selectedFontFamilyIndex ?? 0].files[index].url;
    props.onFontUrlChange(url);
  }

  return (
    <div>
      <InformationInput
        value={content}
        title="content"
        type="text"
        onChange={(e: { target: { value: any } }) => {
          setContent(e.target.value ?? "");
        }}
      />

      {fontFamilies.length > 0 && (
        <SelectInput
          title="font-family"
          options={fontFamilies}
          onChange={handleFontFamilyChange}
          valueIndex={selectedFontFamilyIndex}
        />
      )}
      {fontStyle.length > 0 && (
        <SelectInput
          title="font-style"
          options={fontStyle}
          onChange={handleFontStyleChange}
          valueIndex={selectedFontStyleIndex}
        />
      )}
    </div>
  );
}
export default FontPanel;
