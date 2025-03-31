import React from "react";
import "./VerticalDivideThreeSection.css";
import "../debug.css";

const VerticalDivideThreeSection = ({
  outline = false,
  maxHeight = null,
  maxWidth = null,
  gap = "0",
  sectionWidth1,
  sectionWidth2,
  sectionWidth3,
  centerHorzSection1 = true,
  centerVertSection1 = true,
  centerHorzSection2 = true,
  centerVertSection2 = true,
  centerHorzSection3 = true,
  centerVertSection3 = true,
  sectionChildren1,
  sectionChildren2,
  sectionChildren3,
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
  const widths = [
    parseWidth(sectionWidth1),
    parseWidth(sectionWidth2),
    parseWidth(sectionWidth3),
  ];

  // Count how many widths are missing and sum the provided widths
  const missingCount = widths.filter((w) => w === null).length;
  const providedSum = widths.reduce(
    (sum, w) => (w !== null ? sum + w : sum),
    0
  );

  // Compute the missing width(s) so that total sums to 100%
  const computedWidth =
    missingCount > 0 ? (100 - providedSum) / missingCount : 0;

  // Final widths: if provided, use it; otherwise, use the computed width
  const finalWidths = widths.map((w) => (w !== null ? w : computedWidth));

  return (
    <div
      className="vertical-divide-three-section"
      style={{
        gap: gap,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
    >
      {/* Section 1 */}
      <div
        className={`vertical-divide-three-section div-section ${
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
        className={`vertical-divide-three-section div-section ${
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

      {/* Section 3 */}
      <div
        className={`vertical-divide-three-section div-section ${
          outline && "outline"
        }`}
        style={{
          width: `${finalWidths[2]}%`,
          justifyContent: centerVertSection3 ? "center" : "flex-start",
          alignItems: centerHorzSection3 ? "center" : "flex-start",
        }}
      >
        {sectionChildren3}
      </div>
    </div>
  );
};

export default VerticalDivideThreeSection;
