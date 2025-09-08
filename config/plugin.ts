//plugin.ts
import { IApi } from "umi";
export default (api: IApi) => {
  api.modifyHTML(($) => {
    $("script").attr("src", (index, src) => {
      if (src.includes("umi")) {
        $("script").eq(index).attr("defer", "true");
      }
      return src;
    });
    return $;
  });
};