export function rewrapText(text: string, maxWidth: number): string {
  if (!text || maxWidth <= 0) return text;

  const lines = text.split("\n");
  const wrappedLines: string[] = [];

  for (const line of lines) {
    // Handle empty lines
    if (line.trim() === "") {
      wrappedLines.push("");
      continue;
    }

    const words = line.split(/\s+/);
    let currentLine = "";

    for (const word of words) {
      // If word itself is longer than maxWidth, add it on its own line
      if (word.length > maxWidth) {
        if (currentLine) {
          wrappedLines.push(currentLine.trim());
          currentLine = "";
        }
        wrappedLines.push(word);
        continue;
      }

      // Check if adding this word would exceed the width
      const testLine = currentLine ? `${currentLine} ${word}` : word;

      if (testLine.length <= maxWidth) {
        currentLine = testLine;
      } else {
        // Start a new line
        wrappedLines.push(currentLine.trim());
        currentLine = word;
      }
    }

    // Add remaining text
    if (currentLine) {
      wrappedLines.push(currentLine.trim());
    }
  }

  return wrappedLines.join("\n");
}
