export type BlogLanguage = "en" | "ja";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatBlogDate(
  year: string,
  month: string,
  day: string,
  lang: BlogLanguage,
): string {
  if (lang === "ja") {
    return `${year}年${month}月${day}日`;
  } else if (lang === "en") {
    return `${day} ${monthNames[Number(month) - 1]} ${year}`;
  } else {
    return `${day} ${monthNames[Number(month) - 1]} ${year}`;
  }
}

export function formatBlogMonth(
  year: string,
  month: string,
  lang: BlogLanguage,
): string {
  if (lang === "ja") {
    return `${year}年${month}月`;
  } else if (lang === "en") {
    return `${monthNames[Number(month) - 1]} ${year}`;
  } else {
    return `${monthNames[Number(month) - 1]} ${year}`;
  }
}

export function blogMonthName(month: string): string {
  return monthNames[Number(month) - 1];
}

export function formatBlogYear(year: string, lang: BlogLanguage): string {
  if (lang === "ja") {
    return `${year}年`;
  } else if (lang === "en") {
    return `${year}`;
  } else {
    return `${year}`;
  }
}

export function formatDateObject(date: Date, lang: BlogLanguage): string {
  if (lang === "ja") {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  } else if (lang === "en") {
    return (
      date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      ", " +
      date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  } else {
    return (
      date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      ", " +
      date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  }
}
