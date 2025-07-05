import { promises as fs } from "fs";
import path from "path";
import handlebars from "handlebars";

export const loadTemplate = async (templateName: string): Promise<string> => {
  const filePath = path.join(__dirname, `${templateName}.html`);
  return await fs.readFile(filePath, "utf-8");
};

export const compileTemplate = (
  html: string,
  data: Record<string, any>
): string => {
  const template = handlebars.compile(html);
  return template(data);
};

export const getOtpHtmlTemplate = async (otp: string, firstName: string) => {
  const filePath = path.join(__dirname, "templates", "otp-template.html");
  let template = await fs.readFile(filePath, "utf-8");

  template = template
    .replace("{{otp}}", otp)
    .replace("{{firstName}}", firstName)
    .replace("{{year}}", new Date().getFullYear().toString());

  return template;
};
