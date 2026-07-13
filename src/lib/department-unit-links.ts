import { generateSlug } from "@/lib/content-utils";

const UNIT_ID_DELIMITER = "--";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function getDepartmentUnitSegment(unitName: string, unitId: string) {
  const nameSlug = generateSlug(unitName) || "unit";

  return `${nameSlug}${UNIT_ID_DELIMITER}${unitId}`;
}

export function getDepartmentUnitHref(
  departmentSlug: string,
  unitName: string,
  unitId: string
) {
  return `/departments/${departmentSlug}/units/${getDepartmentUnitSegment(
    unitName,
    unitId
  )}`;
}

export function extractUnitIdFromSegment(unitSegment: string) {
  const delimiterIndex = unitSegment.lastIndexOf(UNIT_ID_DELIMITER);

  if (delimiterIndex === -1) {
    return null;
  }

  const possibleId = unitSegment.slice(
    delimiterIndex + UNIT_ID_DELIMITER.length
  );

  return UUID_PATTERN.test(possibleId) ? possibleId : null;
}
