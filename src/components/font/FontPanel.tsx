import axios from "axios";
import React, { useEffect, useState } from "react";
import { googleFont_API } from "../../const/google.const";
import SelectInput, {
  optionType,
} from "../styledComponents/inputs/SelectInput";

type fontType = {
  fontFamily: string;
  files: { style: string; url: string }[];
};

type FontPanelProps = {
  onFontUrlChange: (fontUrl: string) => void;
};
function FontPanel(props: FontPanelProps) {
  const [fonts, setFonts] = useState<fontType[]>([] as fontType[]);
  const [fontFamilies, setFontFamilies] = useState<optionType[]>(
    [] as optionType[]
  );
  const [fontStyle, setFontStyle] = useState<optionType[]>([] as optionType[]);

  const [selectedFontFamilyIndex, setSelectedFontFamilyIndex] =
    useState<number>();

  useEffect(() => {
    axios.get(googleFont_API).then((response) => {
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
      setFontFamilies(ff);
    });
  }, []);

  function handleFontFamilyChange(index: number) {
    const fs = fonts[index].files.map((x) => {
      return { name: x.style, value: x.url };
    });
    setSelectedFontFamilyIndex(index);
    setFontStyle(fs);
    if (fonts[index].files.length === 1) {
      const url = fonts[index].files[0].url;
      props.onFontUrlChange(url);
    }
  }
  function handleFontStyleChange(index: number) {
    const url = fonts[selectedFontFamilyIndex ?? 0].files[index].url;
    props.onFontUrlChange(url);
  }

  return (
    <div className="flex flex-row relative">
      <SelectInput
        title="font-family"
        placeHolder="placeHolder"
        options={fontFamilies}
        onChange={handleFontFamilyChange}
      />
      <SelectInput
        title="font-style"
        placeHolder="placeHolder"
        options={fontStyle}
        onChange={handleFontStyleChange}
      />
    </div>
  );
}
export default FontPanel;
