export function convertToMaskedString(inputString: string) {
  if (inputString) {
    // Create asterisk string (*****)
    const maskedString = "*".repeat(5);

    // Cut the input string, remove the number of "ducciong" characters at the end and add an asterisk string at the beginning
    const result = maskedString + inputString.slice(5);
    return result;
  }
}
