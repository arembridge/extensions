import { Action, ActionPanel } from "@raycast/api";

interface RewrapActionsProps {
  onSubmit: (values: any) => void;
  rewrappedText?: string;
}

export function RewrapActions({ onSubmit, rewrappedText }: RewrapActionsProps) {
  return (
    <ActionPanel>
      <Action.SubmitForm title="Rewrap Text" onSubmit={onSubmit} />
      {rewrappedText && (
        <Action.CopyToClipboard
          title="Copy Rewrapped Text"
          content={rewrappedText}
          shortcut={{ modifiers: ["cmd"], key: "c" }}
        />
      )}
    </ActionPanel>
  );
}
