export interface SerializedMDX {
  type: "mdx";
  content: {
    code: string;
    frontmatter: unknown;
  };
}
