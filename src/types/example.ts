export interface QTest {
    question: string
    answer01: string
    answer02: string
    answer03: string
    ansewr04: string
    answer05: string
}


export const LocationToNumber: Map<string, string> = new Map([
    ["강남구", "11680"],
    ["강동구", "11740"],
    ["강북구", "11305"],
    ["강서구", "11500"],
    ["관악구", "11620"],
    ["광진구", "11215"],
    ["구로구", "11530"],
    ["금천구", "11545"],
    ["노원구", "11350"],
]);