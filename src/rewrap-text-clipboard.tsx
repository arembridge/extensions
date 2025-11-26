import { Form, Clipboard, showToast, Toast } from "@raycast/api";
import { useState } from "react";
import { rewrapText } from "./utils/rewrapText";
import { RewrapActions } from "./components/RewrapActions";

interface FormValues {
  text: string;
  width: string;
  copyResultToClipboard: boolean;
}

export default function Command() {
  const [rewrappedText, setRewrappedText] = useState<string>("");

  async function handleSubmit(values: FormValues) {
    const width = parseInt(values.width);

    if (isNaN(width) || width <= 0) {
      showToast({
        style: Toast.Style.Failure,
        title: "Invalid width",
        message: "Please enter a positive number",
      });
      return;
    }

    const clipboardContent = await Clipboard.readText();

    if (!clipboardContent) {
      await showToast({
        style: Toast.Style.Failure,
        title: "No text in clipboard",
        message: "Please copy some text first",
      });
      return;
    }

    const wrapped = rewrapText(clipboardContent, width);
    setRewrappedText(wrapped);

    if (values.copyResultToClipboard) {
      await Clipboard.copy(wrapped);
      showToast({
        style: Toast.Style.Success,
        title: "Text rewrapped and copied!",
        message: `Wrapped at ${width} characters`,
      });
    } else {
      showToast({
        style: Toast.Style.Success,
        title: "Text rewrapped!",
        message: `Wrapped at ${width} characters`,
      });
    }
  }

  return (
    <Form
      actions={
        <RewrapActions onSubmit={handleSubmit} rewrappedText={rewrappedText} />
      }
    >
      <Form.TextField id="width" title="Width" placeholder="80" defaultValue="80" />
      <Form.Checkbox id="copyResultToClipboard" label="Copy result to Clipboard?" defaultValue={true} />
      {rewrappedText && <Form.Description title="Rewrapped Text" text={rewrappedText} />}
    </Form>
  );
}
