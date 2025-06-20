import React from "react";
import { Tooltip } from "./Tooltip";

export function TitleWithTooltip({ title, tooltip }) {
    return (
        <div className="panel-title-bar">
            <span>{title}</span>
            <Tooltip content={tooltip} />
        </div>
    );
}
