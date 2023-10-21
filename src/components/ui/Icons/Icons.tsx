import React from "react";
import Bin from "../../../../public/assets/icons/bin.svg";
import Undo from "../../../../public/assets/icons/undo.svg";
import Redo from "../../../../public/assets/icons/redo.svg";
import Pen from "../../../../public/assets/icons/pen.svg";
import Brush from "../../../../public/assets/icons/brush.svg";
import Eraser from "../../../../public/assets/icons/eraser.svg";

type SvgIcon = (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;

export const Icons = {
  Bin: Bin as SvgIcon,
  Undo: Undo as SvgIcon,
  Redo: Redo as SvgIcon,
  Pen: Pen as SvgIcon,
  Brush: Brush as SvgIcon,
  Eraser: Eraser as SvgIcon,
} as const;
