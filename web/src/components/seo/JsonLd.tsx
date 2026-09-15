import React from "react";

interface JsonLdProps {
  schema: Record<string, any>;
}

export default function JsonLd({ schema }: JsonLdProps) {
  // To prevent XSS vulnerabilities, we securely stringify the JSON
  // and replace `<` with `\u003c` so it can't accidentally close the `<script>` tag
  // or inject other HTML elements.
  const jsonString = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
