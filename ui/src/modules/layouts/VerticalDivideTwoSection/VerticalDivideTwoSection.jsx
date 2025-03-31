// VerticalDivideTwoSection.js
import React from "react";
import "./VerticalDivideTwoSection.css";
import "../debug.css";

const VerticalDivideTwoSection = ({
  outline = false,
  maxHeight = null,
  maxWidth = null,
  gap = "0",
  sectionWidth1, // leave undefined or null to auto-calculate
  sectionWidth2,
  centerHorzSection1 = true,
  centerVertSection1 = true,
  centerHorzSection2 = true,
  centerVertSection2 = true,
  sectionChildren1,
  sectionChildren2,
}) => {
  // Helper function to parse a string like "10%" into a number (10)
  const parseWidth = (width) => {
    if (typeof width === "string" && width.trim().endsWith("%")) {
      const num = parseFloat(width);
      return isNaN(num) ? null : num;
    }
    return null;
  };

  // Parse each width; if a width wasn't provided, it will be null
  const widths = [parseWidth(sectionWidth1), parseWidth(sectionWidth2)];

  // Count how many widths are missing and sum the provided widths
  const missingCount = widths.filter((w) => w === null).length;
  const providedSum = widths.reduce(
    (sum, w) => (w !== null ? sum + w : sum),
    0
  );

  // Compute the missing width(s) so that the total sums to 100%
  const computedWidth =
    missingCount > 0 ? (100 - providedSum) / missingCount : 0;
  const finalWidths = widths.map((w) => (w !== null ? w : computedWidth));

  return (
    <div
      className="vertical-divide-two-section"
      style={{
        gap: gap,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
    >
      {/* Section 1 */}
      <div
        className={`vertical-divide-two-section div-section ${
          outline && "outline"
        }`}
        style={{
          width: `${finalWidths[0]}%`,
          justifyContent: centerVertSection1 ? "center" : "flex-start",
          alignItems: centerHorzSection1 ? "center" : "flex-start",
        }}
      >
        {sectionChildren1}
      </div>

      {/* Section 2 */}
      <div
        className={`vertical-divide-two-section div-section ${
          outline && "outline"
        }`}
        style={{
          width: `${finalWidths[1]}%`,
          justifyContent: centerVertSection2 ? "center" : "flex-start",
          alignItems: centerHorzSection2 ? "center" : "flex-start",
        }}
      >
        {sectionChildren2}
      </div>
    </div>
  );
};

export default VerticalDivideTwoSection;
