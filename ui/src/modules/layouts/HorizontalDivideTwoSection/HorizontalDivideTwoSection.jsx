// HorizontalDivideTwoSection.js
import React from "react";
import "./HorizontalDivideTwoSection.css";
import "../debug.css";

const HorizontalDivideTwoSection = ({
  outline = false,
  maxHeight = null,
  maxWidth = null,
  gap = "0",
  sectionHeight1, // leave undefined or null to auto-calculate
  sectionHeight2,
  centerHorzSection1 = true,
  centerVertSection1 = true,
  centerHorzSection2 = true,
  centerVertSection2 = true,
  sectionChildren1,
  sectionChildren2,
}) => {
  // Helper function to parse a string like "10%" into a number (10)
  const parseHeight = (height) => {
    if (typeof height === "string" && height.trim().endsWith("%")) {
      const num = parseFloat(height);
      return isNaN(num) ? null : num;
    }
    return null;
  };

  // Parse each height; if a height wasn't provided, it will be null
  const heights = [parseHeight(sectionHeight1), parseHeight(sectionHeight2)];

  // Count how many heights are missing and sum the provided heights
  const missingCount = heights.filter((h) => h === null).length;
  const providedSum = heights.reduce(
    (sum, h) => (h !== null ? sum + h : sum),
    0
  );

  // Compute the missing height(s) so that the total sums to 100%
  const computedHeight =
    missingCount > 0 ? (100 - providedSum) / missingCount : 0;
  const finalHeights = heights.map((h) => (h !== null ? h : computedHeight));

  return (
    <div
      className="horizontal-divide-two-section"
      style={{
        gap: gap,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
    >
      {/* Section 1 */}
      <div
        className={`horizontal-divide-two-section div-section ${outline && "outline"}`}
        style={{
          height: `${finalHeights[0]}%`,
          justifyContent: centerVertSection1 ? "center" : "flex-start",
          alignItems: centerHorzSection1 ? "center" : "flex-start",
        }}
      >
        {sectionChildren1}
      </div>

      {/* Section 2 */}
      <div
        className={`horizontal-divide-two-section div-section ${outline && "outline"}`}
        style={{
          height: `${finalHeights[1]}%`,
          justifyContent: centerVertSection2 ? "center" : "flex-start",
          alignItems: centerHorzSection2 ? "center" : "flex-start",
        }}
      >
        {sectionChildren2}
      </div>
    </div>
  );
};

export default HorizontalDivideTwoSection;
