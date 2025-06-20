// src/components/Tooltip.jsx
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";
import "../index.css";

export function Tooltip({ content }) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [alignRight, setAlignRight] = useState(false);
    const iconRef = useRef();

    const show = () => {
        const rect = iconRef.current.getBoundingClientRect();
        const tooltipWidth = 280; // Ortalama genişlik (CSS'teki min/max'e göre)
        const padding = 12;

        // Eğer ekranın sağına taşıyorsa, sola kaydır
        const willOverflowRight = rect.right + padding + tooltipWidth > window.innerWidth;

        setAlignRight(willOverflowRight);
        setPosition({
            top: rect.bottom + 8,
            left: willOverflowRight ? rect.left - tooltipWidth - 8 : rect.right + 8
        });

        setVisible(true);
    };

    const hide = () => setVisible(false);

    return (
        <>
      <span
          ref={iconRef}
          onMouseEnter={show}
          onMouseLeave={hide}
          style={{ marginLeft: "10px", cursor: "pointer" }}
      >
        <Info size={18} className="info-icon" />
      </span>

            {visible &&
                createPortal(
                    <div
                        className="tooltip-portal"
                        style={{
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                            position: "fixed"
                        }}
                    >
                        {content}
                    </div>,
                    document.body
                )}
        </>
    );
}
