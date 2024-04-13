export function formatDate(isoDate, locale = "en-US") {
   const date = new Date(isoDate);
   const options = {
      month: "short",
      day: "numeric",
      weekday: "long",
      year: "numeric",
   };
   return date.toLocaleDateString(locale, options);
}
